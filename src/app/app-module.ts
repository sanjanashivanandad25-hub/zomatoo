import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AboutComponent } from './about/about';
import { ContactUsComponent } from './contact-us/contact-us';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { Logic } from './logic/logic';
import { ServicesComponent } from './services/services';
import { SignupComponent } from './signup/signup';

@NgModule({
  declarations: [
    App,
    Logic,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    ContactUsComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
