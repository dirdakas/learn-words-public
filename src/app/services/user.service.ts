import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { IUserProgression } from './../models/user-progression.model';
import { IUser } from './../models/user.model';
import { AuthService } from './auth.service';

const USER_LEARNING_KEY = 'user-learning';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userProgressionSubject: BehaviorSubject<IUserProgression> = new BehaviorSubject(
    {
      learnedWords: [],
      learningWords: [],
    }
  );
  userProgression$: Observable<
    IUserProgression
  > = this.userProgressionSubject.asObservable();

  constructor(private fireStore: AngularFirestore, private authService: AuthService) {
    this.authService.user$
      .pipe(
        filter((user: IUser) => !!user),
        tap((user: IUser) => this.setUserProgression(user))
      )
      .subscribe();
  }

  setWordsToLearn(words: string[]): Observable<any> {
    let newProgression: IUserProgression = { ...this.userProgressionSubject.getValue() };
    const newWordsToLearnList: string[] = [
      ...new Set(words.concat(newProgression.learningWords)),
    ].sort();

    newProgression = {
      ...newProgression,
      learningWords: newWordsToLearnList,
    };

    return this.updateUserLearningProgression(
      this.authService.getCurrentUser().userId,
      newProgression
    ).pipe(take(1));
  }

  updateUserLearningProgression(
    userId: string,
    progression: IUserProgression
  ): Observable<any> {
    return from(
      this.fireStore
        .collection(USER_LEARNING_KEY)
        .doc<any>(userId)
        .set({
          ...progression,
        })
    ).pipe(
      tap(() => {
        this.userProgressionSubject.next(progression);
      })
    );
  }

  getUserLearningProgression(userId): Observable<any> {
    return this.fireStore
      .collection(USER_LEARNING_KEY)
      .doc<any>(userId)
      .valueChanges()
      .pipe(take(1));
  }

  isUserLearnedWord(word: string): boolean {
    const userProgression: IUserProgression = this.userProgressionSubject.getValue();

    return !!userProgression.learnedWords.find((w) => w === word);
  }

  learnNewWord(word: string): Observable<any> {
    const userProgression: IUserProgression = this.userProgressionSubject.getValue();

    userProgression.learnedWords.push(word);
    userProgression.learningWords = userProgression.learningWords.filter(
      (w) => w !== word
    );

    userProgression.learnedWords = userProgression.learnedWords.sort();
    userProgression.learningWords = userProgression.learningWords.sort();

    const user: IUser = this.authService.getCurrentUser();

    return this.updateUserLearningProgression(user.userId, userProgression).pipe(take(1));
  }

  unLearnNewWord(word: string): Observable<any> {
    const userProgression: IUserProgression = this.userProgressionSubject.getValue();

    userProgression.learningWords.push(word);
    userProgression.learnedWords = userProgression.learnedWords.filter((w) => w !== word);

    userProgression.learningWords = userProgression.learningWords.sort();
    userProgression.learnedWords = userProgression.learnedWords.sort();

    const user: IUser = this.authService.getCurrentUser();

    return this.updateUserLearningProgression(user.userId, userProgression).pipe(take(1));
  }

  removeWordFromProgress(word: string): Observable<any> {
    const userProgression: IUserProgression = this.userProgressionSubject.getValue();

    userProgression.learnedWords = userProgression.learnedWords.filter((w) => w !== word);
    userProgression.learningWords = userProgression.learningWords.filter(
      (w) => w !== word
    );

    userProgression.learningWords = userProgression.learningWords.sort();
    userProgression.learnedWords = userProgression.learnedWords.sort();

    const user: IUser = this.authService.getCurrentUser();

    return this.updateUserLearningProgression(user.userId, userProgression).pipe(take(1));
  }

  private setUserProgression(user: IUser): void {
    if (user) {
      this.getUserLearningProgression(user.userId)
        .pipe(
          take(1),
          tap((progression: IUserProgression) => {
            if (progression) {
              // set progression on user
              this.userProgressionSubject.next(progression);
            } else {
              // set new empty progression for user
              const newUserProgression: IUserProgression = {
                learnedWords: [],
                learningWords: [],
              };

              this.updateUserLearningProgression(user.userId, newUserProgression)
                .pipe(take(1))
                .subscribe();
              this.setEmptyProgression();
            }
          })
        )
        .subscribe();
    } else {
      this.setEmptyProgression();
    }
  }

  private setEmptyProgression(): void {
    this.setWordsToLearn([]);
  }
}
