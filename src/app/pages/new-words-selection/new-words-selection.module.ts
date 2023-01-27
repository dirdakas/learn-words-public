import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderModule } from './../../components/loader/loader.module';
import { SearchWordModule } from './../../components/search-word/search-word.module';
import { NewWordsSelectionComponent } from './new-words-selection.component';

@NgModule({
  declarations: [NewWordsSelectionComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    LoaderModule,
    MatSelectModule,
    SearchWordModule,
  ],
})
export class NewWordsSelectionModule {}
