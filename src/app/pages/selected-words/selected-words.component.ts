import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { forkJoin } from 'rxjs';
import { filter, finalize, take, tap } from 'rxjs/operators';
import { WordActionsComponent } from './../../components/word-actions/word-actions.component';
import { RoutesEnum } from './../../models/routes.enum';
import { ISelectedWordDetails } from './../../models/selected-word-details.model';
import { IUserProgression } from './../../models/user-progression.model';
import { UserService } from './../../services/user.service';
import { WordsService } from './../../services/words.service';

@Component({
  selector: 'app-selected-words',
  templateUrl: './selected-words.component.html',
  styleUrls: ['./selected-words.component.scss'],
})
export class SelectedWordsComponent implements OnInit {
  selectedWords: string[] = [];
  translationNeededWords: string[] = [];
  isLoading = false;
  routesEnum = RoutesEnum;

  constructor(
    private userService: UserService,
    private wordsService: WordsService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.loadData();
  }

  openBottomSheet(word: string): void {
    const wordDetails: ISelectedWordDetails = {
      word,
      hasRequestForMoreDetails: this.translationNeededWords.includes(word),
      isWordLearned: this.userService.isUserLearnedWord(word),
    };

    this._bottomSheet
      .open(WordActionsComponent, {
        data: wordDetails,
      })
      .afterDismissed()
      .pipe(
        take(1),
        filter((data) => !!data),
        tap((data) => {
          if (data.isLoading) {
            this.loadData();
          }
        })
      )
      .subscribe();
  }

  private loadData(): void {
    forkJoin({
      userProgression: this.userService.userProgression$.pipe(
        take(1),
        tap(
          (progression: IUserProgression) =>
            (this.selectedWords = progression.learningWords)
        )
      ),
      translationsNeeded: this.wordsService.getFullTranslationNeededWords(),
    })
      .pipe(
        take(1),
        tap((result) => {
          this.selectedWords = result.userProgression.learningWords;
          this.translationNeededWords = result.translationsNeeded;
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
