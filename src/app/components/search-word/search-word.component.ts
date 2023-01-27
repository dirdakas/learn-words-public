import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take, tap } from 'rxjs/operators';
import { IUserProgression } from '../../models/user-progression.model';
import { MAX_FOUND_WORDS } from '../../pages/new-words-selection/new-words-selection.component';
import { UserService } from '../../services/user.service';
import * as wordsJson from '../../../assets/words.json';

@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.scss']
})
export class SearchWordComponent implements OnInit {
  @Output() foundWords: EventEmitter<string[]> = new EventEmitter<string[]>();

  searchForm: FormGroup;

  private allWords: string[] = (wordsJson as any).default.data;
  private userWords: string[] = [];

  constructor(private fb: FormBuilder,
    private userService: UserService,) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      newWord: new FormControl('', Validators.required),
    });

    this.userService.userProgression$
      .pipe(
        take(1),
        tap((progression: IUserProgression) => {
          this.userWords = progression.learnedWords.concat(progression.learningWords);
        })
      )
      .subscribe();
  }

  onSubmit(): void {
    const newWordControl: AbstractControl = this.searchForm.get('newWord');

    if (this.searchForm.valid) {
      const foundWords = this.allWords.filter((word: string) => {
        const includes: boolean = word.includes(newWordControl.value.toLowerCase());
        if (includes) {
          const isInUserProgress = !!this.userWords.find(
            (userWord: string) => userWord === word
          );

          if (isInUserProgress) {
            // user already learning this word, no need to show it again
            return false;
          } else {
            return true;
          }
        } else {
          // word not in all word list - do now show it
          return false;
        }
      });

      if (foundWords.length > MAX_FOUND_WORDS) {
        newWordControl.setErrors({
          toMany: true,
        });
      } else if (foundWords.length === 0) {
        newWordControl.setErrors({
          notFound: true,
        });
      } else {
        // good to go
        this.foundWords.emit(foundWords);
      }
    }
  }
}
