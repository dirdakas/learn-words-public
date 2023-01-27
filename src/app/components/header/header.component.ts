import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoutesEnum } from './../../models/routes.enum';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() sideNavToggle = new EventEmitter<void>();

  isAuth$: Observable<boolean>;
  routesEnum = RoutesEnum;

  constructor(private authService: AuthService) {
    this.isAuth$ = this.authService.user$.pipe(map((user) => !!user.userId));
  }

  onToggleSideNav(): void {
    this.sideNavToggle.emit();
  }
}
