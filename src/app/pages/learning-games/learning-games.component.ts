import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { forkJoin } from 'rxjs';
import { finalize, take, tap } from 'rxjs/operators';
import { RoutesEnum } from './../../models/routes.enum';
import { IUserProgression } from './../../models/user-progression.model';
import { UserService } from './../../services/user.service';
import { WordsService } from './../../services/words.service';

@Component({
  selector: 'app-learning-games',
  templateUrl: './learning-games.component.html',
  styleUrls: ['./learning-games.component.scss'],
})
export class LearningGamesComponent implements OnInit {
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
        tap(
          (result: {
            userProgression: IUserProgression;
            translationsNeeded: string[];
          }) => {
            this.selectedWords = result.userProgression.learningWords;
            this.translationNeededWords = result.translationsNeeded;
          }
        ),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
