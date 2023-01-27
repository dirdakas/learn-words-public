import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutesEnum } from './../../models/routes.enum';
import { IUser } from './../../models/user.model';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();

  user$: Observable<IUser>;
  routesEnum = RoutesEnum;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  onNavigateTo(url: string): void {
    this.router.navigate(['/' + url]);
    this.sideNavToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.sideNavToggle.emit();
  }
}
