import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  pickXUniqRandomWords(allWords: string[], cantPickWords: string[], count: number): string[] {
    const result: string[] = [];

    for (let i = 0; i < count; i++) {
      const newWord: string = this.getUniqWord(allWords, cantPickWords);
      result.push(newWord);
    }

    return result;
  }

  pickOneWordFromList(list: string[]): string {
    return list[Math.floor(Math.random() * list.length)];
  }

  getKeys(obj: object): string[] {
    return Object.keys(obj);
  }

  private getUniqWord(allWords: string[], cantPickWords: string[]): string {
    const newWord: string = this.pickOneWordFromList(allWords);

    if (!cantPickWords.includes(newWord)) {
      return newWord;
    } else {
      return this.getUniqWord(allWords, cantPickWords);
    }
  }
}
