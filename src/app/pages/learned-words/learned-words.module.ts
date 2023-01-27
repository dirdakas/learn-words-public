import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { LoaderModule } from '../../components/loader/loader.module';
import { NewWordsNavigationModule } from './../../components/new-words-navigation/new-words-navigation.module';
import { LearnedWordsComponent } from './learned-words.component';

@NgModule({
  declarations: [LearnedWordsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    LoaderModule,
    MatBottomSheetModule,
    NewWordsNavigationModule,
  ],
})
export class LearnedWordsModule {}
