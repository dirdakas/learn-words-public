import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { finalize, take, tap } from 'rxjs/operators';
import { IWordDetails } from '../../models/word-details.model';
import { WordsService } from '../../services/words.service';
import { ISelectedWordDetails } from './../../models/selected-word-details.model';

@Component({
  selector: 'app-word-details',
  templateUrl: './word-details.component.html',
  styleUrls: ['./word-details.component.scss'],
})
export class WordDetailsComponent implements OnInit {
  explanation: string;
  isLoading = true;
  wordDetails: IWordDetails;
  requestedForMoreDetails: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public word: ISelectedWordDetails,
    private dialRef: MatDialogRef<WordDetailsComponent>,
    private wordsService: WordsService
  ) {}

  ngOnInit(): void {
    this.wordsService
      .getWordDescription(this.word.word)
      .pipe(
        tap((wordDetails: IWordDetails) => (this.wordDetails = wordDetails)),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  askForTranslation(): void {
    this.isLoading = true;
    this.wordsService
      .addNewTranslationNeededToList(this.word.word)
      .pipe(
        take(1),
        tap(() => {
          this.requestedForMoreDetails = true;
          this.dialRef.close({
            isLoading: true,
          });
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }
}
