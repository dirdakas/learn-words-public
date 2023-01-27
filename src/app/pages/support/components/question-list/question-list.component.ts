import { Component, OnInit } from '@angular/core';
import { take, tap, finalize } from 'rxjs/operators';
import { IQuestion, QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  questions: IQuestion[] = [];
  isLoading = true;

  constructor(private questionsService: QuestionsService) {}

  ngOnInit(): void {
    this.questionsService
      .getAllQuestions()
      .pipe(
        take(1),
        tap((list) => (this.questions = list)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
