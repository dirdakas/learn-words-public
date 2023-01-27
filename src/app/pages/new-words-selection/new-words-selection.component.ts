import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as wordsJson from '../../../assets/words.json';
import { RoutesEnum } from './../../models/routes.enum';
import { IUserProgression } from './../../models/user-progression.model';
import { UserService } from './../../services/user.service';
import { UtilsService } from './../../services/utils.service';

export const MAX_FOUND_WORDS = 20;
const COUNT_DIFF_WORDS = 10;

@Component({
  selector: 'app-new-words-selection',
  templateUrl: './new-words-selection.component.html',
  styleUrls: ['./new-words-selection.component.scss'],
})
export class NewWordsSelectionComponent implements OnInit, OnDestroy {
  numberOfNewWords: number = COUNT_DIFF_WORDS;

  newWords: string[] = [];
  selectedWords: string[] = [];
  isLoading = false;

  searchForm: FormGroup;
  findMyWords: string[] = [];

  private allWords: string[] = (wordsJson as any).default.data;
  private userProgressSubscriber: Subscription;
  private userWords: string[] = [];

  constructor(
    private utilsService: UtilsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userProgressSubscriber = this.userService.userProgression$
      .pipe(
        tap((progression: IUserProgression) => {
          this.userWords = progression.learnedWords.concat(progression.learningWords);
        })
      )
      .subscribe();
    this.setNewRandomList();
  }

  ngOnDestroy(): void {
    if (this.userProgressSubscriber) {
      this.userProgressSubscriber.unsubscribe();
    }
  }

  selectWord(word: string): void {
    if (this.selectedWords.includes(word)) {
      this.selectedWords.splice(
        this.selectedWords.findIndex((curr) => curr === word),
        1
      );
    } else {
      this.selectedWords.push(word);
    }
  }

  isWordSelected(word: string): boolean {
    return this.selectedWords.includes(word);
  }

  setNewListForSelectedWords(): void {
    this.isLoading = true;
    this.userService
      .setWordsToLearn(this.selectedWords)
      .pipe(
        tap(() => {
          this._snackBar.open('New words had been selected', null, {
            duration: 2000,
          });
          this.router.navigate([RoutesEnum.selectedWords]);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  setNewRandomList(newSize?: number): void {
    this.newWords = this.utilsService.pickXUniqRandomWords(
      this.allWords,
      this.userWords,
      newSize || this.numberOfNewWords
    );
    this.selectedWords = [...this.newWords];
  }

  onSizeChange(change: MatSelectChange): void {
    this.numberOfNewWords = change.value;
    this.setNewRandomList(this.numberOfNewWords);
  }

  searchWords(values: string[]): void {
    this.findMyWords = values;
  }
}
