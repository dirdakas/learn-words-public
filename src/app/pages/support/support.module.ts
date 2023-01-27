import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoaderModule } from './../../components/loader/loader.module';
import { FeaturesService } from './../../services/features.service';
import { AskForFeatureComponent } from './components/ask-for-feature/ask-for-feature.component';
import { FeatureListComponent } from './components/feature-list/feature-list.component';
import { SupportComponent } from './support.component';
import { AskAQuestionComponent } from './components/ask-a-question/ask-a-question.component';
import { QuestionListComponent } from './components/question-list/question-list.component';

@NgModule({
  declarations: [
    SupportComponent,
    AskForFeatureComponent,
    FeatureListComponent,
    AskAQuestionComponent,
    QuestionListComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    LoaderModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  exports: [SupportComponent],
  providers: [FeaturesService],
})
export class SupportModule {}
