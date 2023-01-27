import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { catchError, map, take, takeUntil, tap } from 'rxjs/operators';
import * as responseJson from '../assets/responseJson.json';
import * as wordsJson from '../assets/words.json';
import { IDefinition, IDefinitions } from './models/definitions.model';
import { ITranslations } from './models/translations.model';
import { IWordDetails } from './models/word-details.model';
import { AuthService } from './services/auth.service';
import { WordsService } from './services/words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private response: any[] = (responseJson as any).default.data;
  private wordsList: string[] = (wordsJson as any).default.data;

  private takeUntil$: Subject<void> = new Subject<void>();

  constructor(private wordsService: WordsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.extractToDB();

    this.findNext();

    this.authService.initAuthListener().pipe(takeUntil(this.takeUntil$)).subscribe();

    this.checkAskedTranslations();
  }

  findNext(curIndex?: number): void {
    this.wordsService
      .getIndex()
      .pipe(
        take(1),
        tap((index) => {
          console.log('currIndex:', index);

          console.log('wordsList total:', this.wordsList.length);
          console.log('left:', this.wordsList.length - index);
          console.log('next word:', this.wordsList[index]);

          this.wordsService
            .getWordDescription(this.wordsList[index])
            .pipe(
              take(1),
              tap((res) => {
                console.log('--------- res', res);
                if (!res) {
                  console.log('add new word');
                  // call API and store it
                } else {
                  console.log('increase');
                  // increase
                  if (this.wordsList.length > index) {
                    this.wordsService.updateIndex(index + 1);
                    this.findNext(curIndex + 1);
                  }
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  extractToDB(): void {
    if (this.response && this.response.length > 0) {
      this.response.forEach((item) => {
        const newWord: IWordDetails = {
          id: item[0][0][1],
          definitions: this.getDefinitions(item[12]),
          translations: this.getTranslations(item[1]),
        };

        console.log('newWord', newWord);

        this.wordsService
          .addWord(newWord)
          .pipe(
            take(1),
            tap((res) => {
              console.log(res);
            }),
            catchError((err) => {
              console.log('err', err);
              return err;
            })
          )
          .subscribe();
      });
    }
  }

  ngOnDestroy(): void {
    this.takeUntil$.next();
  }

  private getDefinitions(def: any): IDefinitions {
    return {
      pronoun: this.getENTranslation(def, 'pronoun'),
      adverb: this.getENTranslation(def, 'adverb'),
      verb: this.getENTranslation(def, 'verb'),
      adjective: this.getENTranslation(def, 'adjective'),
      article: this.getENTranslation(def, 'article'),
      noun: this.getENTranslation(def, 'noun'),
    };
  }

  private getTranslations(transl: any): ITranslations {
    return {
      pronoun: this.getLTTranslation(transl, 'pronoun'),
      adverb: this.getLTTranslation(transl, 'adverb'),
      verb: this.getLTTranslation(transl, 'verb'),
      adjective: this.getLTTranslation(transl, 'adjective'),
      article: this.getLTTranslation(transl, 'article'),
      noun: this.getLTTranslation(transl, 'noun'),
    };
  }

  private getLTTranslation(item, key: string): string[] {
    if (item) {
      const found = item.find((el) => el[0] === key);

      if (found) {
        return found[1];
      }
    }

    return [];
  }

  private getENTranslation(item, key: string): IDefinition[] {
    if (item) {
      const found = item.find((el) => el[0] === key);

      if (found) {
        const result: IDefinition[] = [];
        found[1].forEach((item) => {
          result.push({
            example: item[0] || '',
            explanation: item[2] || '',
          });
        });
        return result;
      }
    }

    return [];
  }

  private checkAskedTranslations(): void {
    this.wordsService
      .getFullTranslationNeededWords()
      .pipe(
        take(1),
        tap((words: string[]) => {
          const obs: Observable<any>[] = [];
          words.forEach((word) => {
            obs.push(
              this.wordsService.getWordDescription(word).pipe(
                take(1),
                map((details: IWordDetails) => (details ? word : null))
              )
            );
          });

          forkJoin(obs)
            .pipe(
              take(1),
              tap((result: string[]) => {
                this.wordsService
                  .removeManyFromTranslationNeededToList(result.filter((word) => !!word))
                  .pipe(take(1))
                  .subscribe();
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }
}
