import { Component, Input } from '@angular/core';
import { RoutesEnum } from './../../models/routes.enum';

@Component({
  selector: 'app-new-words-navigation',
  templateUrl: './new-words-navigation.component.html',
  styleUrls: ['./new-words-navigation.component.scss'],
})
export class NewWordsNavigationComponent {
  @Input() navigateTo: string;
  routesEnum = RoutesEnum;
}
