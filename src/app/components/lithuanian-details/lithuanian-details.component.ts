import { Component, Input, OnInit } from '@angular/core';
import { ITranslations } from './../../models/translations.model';
import { TypesEnum } from './../../models/types';
import { UtilsService } from './../../services/utils.service';

@Component({
  selector: 'app-lithuanian-details',
  templateUrl: './lithuanian-details.component.html',
  styleUrls: ['./lithuanian-details.component.scss'],
})
export class LithuanianDetailsComponent implements OnInit {
  @Input() translations: ITranslations;
  typesEnum = TypesEnum;

  constructor(public utilsService: UtilsService) {}

  ngOnInit(): void {
    console.log('translations', this.translations);
  }
}
