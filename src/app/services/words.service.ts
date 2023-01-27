import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { from, Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { IWordDetails } from '../models/word-details.model';

const WORDS_KEY = 'translations';
const INDEX_KEY = 'count';
const FULL_TRANSLATE_KEY = 'full-translate';

@Injectable({
  providedIn: 'root',
})
export class WordsService {
  constructor(private fireStore: AngularFirestore) {}

  getWordDescription(fetchWord: string): Observable<IWordDetails> {
    return this.fireStore
      .collection(WORDS_KEY)
      .doc<IWordDetails>(fetchWord)
      .valueChanges()
      .pipe(take(1));
  }

  getIndex(): Observable<number> {
    return this.fireStore
      .collection(INDEX_KEY)
      .doc<any>('index')
      .valueChanges()
      .pipe(
        take(1),
        map((data) => data.index)
      );
  }

  getFullTranslationNeededWords(): Observable<string[]> {
    return this.fireStore
      .collection(FULL_TRANSLATE_KEY)
      .doc<any>('words')
      .valueChanges()
      .pipe(
        take(1),
        map((result) => result.words)
      );
  }

  updateIndex(newIndex: number): Observable<any> {
    return from(
      this.fireStore.collection(INDEX_KEY).doc<any>('index').set({
        index: newIndex,
      })
    );
  }

  addNewTranslationNeededToList(newWord: string): Observable<any> {
    return this.getFullTranslationNeededWords().pipe(
      take(1),
      switchMap((currentList: string[]) => {
        const newList: string[] = [...currentList, newWord];

        return this.updateTranslationsNeededList(newList);
      })
    );
  }

  removeFromTranslationNeededToList(removeWord: string): Observable<any> {
    return this.getFullTranslationNeededWords().pipe(
      take(1),
      switchMap((currentList: string[]) => {
        const newList: string[] = currentList.filter((word) => word !== removeWord);

        return this.updateTranslationsNeededList(newList);
      })
    );
  }

  removeManyFromTranslationNeededToList(removeWords: string[]): Observable<any> {
    return this.getFullTranslationNeededWords().pipe(
      take(1),
      switchMap((currentList: string[]) => {
        const newList: string[] = currentList.filter((word) => !removeWords.includes(word));

        return this.updateTranslationsNeededList(newList);
      })
    );
  }

  updateTranslationsNeededList(newList: string[]): Observable<any> {
    return from(
      this.fireStore.collection(FULL_TRANSLATE_KEY).doc<any>('words').set({
        words: newList,
      })
    ).pipe(take(1));
  }

  addWord(word: IWordDetails): Observable<any> {
    const id: string = word.id;
    delete word.id;

    return from(
      this.fireStore
        .collection(WORDS_KEY)
        .doc<IWordDetails>(id)
        .set({
          ...word,
        })
    );
  }
}
