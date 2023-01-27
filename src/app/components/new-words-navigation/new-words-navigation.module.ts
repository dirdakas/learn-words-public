import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { NewWordsNavigationComponent } from './new-words-navigation.component';

@NgModule({
  declarations: [NewWordsNavigationComponent],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [NewWordsNavigationComponent],
})
export class NewWordsNavigationModule {}
