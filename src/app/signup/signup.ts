import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class SignupComponent {
  signupForm: FormGroup;
  message = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signupForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );

    this.route.queryParams.subscribe((params) => {
      if (params['username']) {
        this.signupForm.patchValue({ username: params['username'] });
      }
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  async onSubmit(): Promise<void> {
    this.message = '';
    this.isError = false;

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const result = await this.authService.registerUser(this.signupForm.value);
    if (!result.success) {
      this.message = result.message;
      this.isError = true;
      return;
    }

    this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
  }
}
