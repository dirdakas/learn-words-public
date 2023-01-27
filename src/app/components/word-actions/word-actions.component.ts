import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { take, tap } from 'rxjs/operators';
import { ISelectedWordDetails } from './../../models/selected-word-details.model';
import { UserService } from './../../services/user.service';
import { WordDetailsComponent } from './../word-details/word-details.component';

@Component({
  selector: 'app-word-actions',
  templateUrl: './word-actions.component.html',
  styleUrls: ['./word-actions.component.scss'],
})
export class WordActionsComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public wordDetails: ISelectedWordDetails,
    private dialog: MatDialog,
    private dialogRef: MatBottomSheetRef<WordActionsComponent>,
    private userService: UserService
  ) {}

  showDetails(): void {
    this.dialog
      .open(WordDetailsComponent, {
        data: this.wordDetails,
      })
      .afterClosed()
      .pipe(
        take(1),
        tap((closeData) => {
          this.dialogRef.dismiss({
            isLoading: closeData ? closeData.isLoading : false,
          });
        })
      )
      .subscribe();
  }

  learnedWord(): void {
    this.userService
      .learnNewWord(this.wordDetails.word)
      .pipe(
        take(1),
        tap(() => (this.wordDetails.isWordLearned = true))
      )
      .subscribe();

    this.dialogRef.dismiss({
      isLoading: true,
    });
  }

  unLearnWord(): void {
    this.userService
      .unLearnNewWord(this.wordDetails.word)
      .pipe(
        take(1),
        tap(() => (this.wordDetails.isWordLearned = false))
      )
      .subscribe();

    this.dialogRef.dismiss({
      isLoading: true,
    });
  }

  removeFromProgress(): void {
    this.userService
      .removeWordFromProgress(this.wordDetails.word)
      .pipe(
        take(1),
        tap(() => (this.wordDetails.isWordLearned = false))
      )
      .subscribe();

    this.dialogRef.dismiss({
      isLoading: true,
    });
  }
}
