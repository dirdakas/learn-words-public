import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RoutesEnum } from './../../models/routes.enum';
import { AskForFeatureComponent } from './components/ask-for-feature/ask-for-feature.component';
import { AskAQuestionComponent } from './components/ask-a-question/ask-a-question.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  askForNewFeature(): void {
    this.dialog.open(AskForFeatureComponent);
  }

  goToFeatureList(): void {
    this.router.navigate([RoutesEnum.featureList]);
  }

  askAQuestion(): void {
    this.dialog.open(AskAQuestionComponent);
  }

  goToQuestionList(): void {
    this.router.navigate([RoutesEnum.questionList]);
  }
}
