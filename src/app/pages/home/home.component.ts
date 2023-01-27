import { Component, OnInit } from '@angular/core';
import { finalize, take, tap } from 'rxjs/operators';
import * as wordsJson from '../../../assets/words.json';
import { IUserProgression } from './../../models/user-progression.model';
import { UserService } from './../../services/user.service';
import { WordsService } from './../../services/words.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = true;

  wordsList: string[] = (wordsJson as any).default.data;
  progression: IUserProgression;

  view: number[] = [360, 420];
  single: any[];
  legendPosition = 'below';

  constructor(private userService: UserService, private wordsService: WordsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.isLoading = true;
    this.userService.userProgression$
      .pipe(
        take(1),
        tap((progression: IUserProgression) => {
          this.progression = progression;
          this.mapToChart();
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  }

  private mapToChart(): void {
    this.single = [
      {
        name: 'Learned',
        value: this.progression.learnedWords.length,
      },
      {
        name: 'Learning',
        value: this.progression.learningWords.length,
      },
      {
        name: 'Unknown',
        value:
          this.wordsList.length -
          (this.progression.learnedWords.length + this.progression.learningWords.length),
      },
    ];
  }
}
