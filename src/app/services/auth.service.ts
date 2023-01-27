import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { IAuthData } from './../models/auth-data.model';
import { RoutesEnum } from './../models/routes.enum';
import { IUser } from './../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser> = new BehaviorSubject(undefined);
  user$: Observable<IUser> = this.userSubject.asObservable().pipe(filter(user=> !!user));

  constructor(private router: Router, private fireAuth: AngularFireAuth) {}

  login(authData: IAuthData): Observable<any> {
    return from(this.fireAuth.signInWithEmailAndPassword(authData.email, authData.password));
  }

  logout(): void {
    this.fireAuth.signOut();
    this.setCurrentUser();
  }

  setCurrentUser(user?: IUser): void {
    this.userSubject.next(user || {});
  }

  getCurrentUser(): IUser {
    return { ...this.userSubject.value };
  }

  initAuthListener(): Observable<any> {
    return this.fireAuth.authState.pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser({
            email: user.email,
            userId: user.uid,
          });
          this.router.navigate([RoutesEnum.home]);
        } else {
          this.setCurrentUser();
          this.router.navigate([RoutesEnum.login]);
        }
      })
    );
  }
}
