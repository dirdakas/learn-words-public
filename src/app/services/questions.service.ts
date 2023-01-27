import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export enum QuestionStatus {
  new = 'new',
  seen = 'seen',
  answered = 'answered'
}

export interface IQuestion {
  userId: string;
  question: string;
  status: QuestionStatus;
}

const QUESTION_KEY: string = 'questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {}

  askAQuestion(question: string): Observable<any> {
    return from(
      this.fireStore.collection(QUESTION_KEY).add({
        userId: this.authService.getCurrentUser().userId,
        question,
        status: QuestionStatus.new,
      })
    );
  }

  getAllQuestions(): Observable<IQuestion[]> {
    return this.fireStore
      .collection(QUESTION_KEY)
      .valueChanges()
      .pipe(
        map((data) => [...data] as IQuestion[])
      );
  }
}
