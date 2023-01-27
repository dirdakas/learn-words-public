import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, take } from 'rxjs/operators';
import { IAuthData } from './../../models/auth-data.model';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const authData: IAuthData = {
        email: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value,
      };

      this.authService
        .login(authData)
        .pipe(
          take(1),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
    }
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // reCaptcha: new FormControl(
      //   '',
      //   [ Validators.required ]
      // )
    });
  }
}
