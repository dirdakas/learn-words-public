import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWordComponent } from './search-word.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SearchWordComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [SearchWordComponent]
})
export class SearchWordModule { }
