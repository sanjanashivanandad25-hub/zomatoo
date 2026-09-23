import { Injectable } from '@angular/core';

export interface SignupUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export interface StoredUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userStorageKey = 'biteboost_users';
  private readonly sessionStorageKey = 'biteboost_session';

  async registerUser(input: SignupUser): Promise<{ success: boolean; message: string }> {
    const cleanUsername = this.normalize(input.username);
    const cleanEmail = input.email.trim().toLowerCase();
    const fullName = input.fullName.trim();

    if (!fullName || !cleanUsername || !cleanEmail || !input.password.trim()) {
      return { success: false, message: 'All fields are required.' };
    }

    const users = this.getUsers();
    const usernameExists = users.some((user) => user.username === cleanUsername);
    if (usernameExists) {
      return { success: false, message: 'Username already exists. Please log in or choose another username.' };
    }

    const emailExists = users.some((user) => user.email === cleanEmail);
    if (emailExists) {
      return { success: false, message: 'This email is already registered.' };
    }

    const { hash, salt } = await this.hashPassword(input.password);
    const newUser: StoredUser = {
      id: this.createId(),
      fullName,
      username: cleanUsername,
      email: cleanEmail,
      passwordHash: hash,
      salt,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(this.userStorageKey, JSON.stringify(users));

    return { success: true, message: 'Account created successfully.' };
  }

  async login(username: string, password: string): Promise<{ success: boolean; message: string; user?: StoredUser }> {
    const cleanUsername = this.normalize(username);
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      return { success: false, message: 'Username and password are required.' };
    }

    localStorage.setItem(
      this.sessionStorageKey,
      JSON.stringify({
        username: cleanUsername,
        fullName: cleanUsername,
        email: `${cleanUsername}@demo.local`,
      })
    );

    return { success: true, message: 'Login successful.' };
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.sessionStorageKey);
  }

  getSessionUser(): { username: string; fullName: string; email: string } | null {
    const value = localStorage.getItem(this.sessionStorageKey);
    return value ? JSON.parse(value) : null;
  }

  logout(): void {
    localStorage.removeItem(this.sessionStorageKey);
  }

  private getUsers(): StoredUser[] {
    const raw = localStorage.getItem(this.userStorageKey);
    if (!raw) {
      return [];
    }

    try {
      const parsed: StoredUser[] = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }

  private createId(): string {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  private async hashPassword(password: string): Promise<{ hash: string; salt: string }> {
    const salt = this.generateSalt();
    const hash = await this.hashPasswordWithSalt(password, salt);
    return { hash, salt };
  }

  private async hashPasswordWithSalt(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${salt}:${password}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  private generateSalt(): string {
    const values = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(values)
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('');
  }
}
