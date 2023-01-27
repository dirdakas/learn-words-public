import { Component, Input, OnInit } from '@angular/core';
import { IDefinitions } from './../../models/definitions.model';
import { UtilsService } from './../../services/utils.service';
import { TypesEnum } from './/../../models/types';

@Component({
  selector: 'app-english-details',
  templateUrl: './english-details.component.html',
  styleUrls: ['./english-details.component.scss'],
})
export class EnglishDetailsComponent implements OnInit {
  @Input() definitions: IDefinitions;
  typesEnum = TypesEnum;

  constructor(public utilsService: UtilsService) {}

  ngOnInit(): void {
    console.log('definitions', this.definitions);
  }
}
