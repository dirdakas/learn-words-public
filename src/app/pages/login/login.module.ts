import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// import {
//   RecaptchaFormsModule,
//   RecaptchaModule,
//   RECAPTCHA_LANGUAGE,
// } from "ng-recaptcha";
import { LoaderModule } from './../../components/loader/loader.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    // RecaptchaModule,
    // RecaptchaFormsModule,
    LoaderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  // providers: [
  //   {
  //     provide: RECAPTCHA_LANGUAGE,
  //     useValue: "lt",
  //   },
  // ],
})
export class LoginModule {}
