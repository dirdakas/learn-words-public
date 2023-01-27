import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NewWordsNavigationModule } from '../../components/new-words-navigation/new-words-navigation.module';
import { LoaderModule } from './../../components/loader/loader.module';
import { LearningGamesComponent } from './learning-games.component';

@NgModule({
  declarations: [LearningGamesComponent],
  imports: [CommonModule, NewWordsNavigationModule, LoaderModule],
})
export class LearningGamesModule {}
