import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { take, tap, finalize } from 'rxjs/operators';
import { QuestionsService } from '../../../../services/questions.service';

@Component({
  selector: 'app-ask-a-question',
  templateUrl: './ask-a-question.component.html',
  styleUrls: ['./ask-a-question.component.scss']
})
export class AskAQuestionComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionsService,
    private dialogRef: MatDialogRef<AskAQuestionComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({ question: new FormControl('', [Validators.required]) });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.questionsService
        .askAQuestion(this.form.get('question').value)
        .pipe(
          take(1),
          tap(() => {
            this._snackBar.open('Question asked', null, {
              duration: 2000,
            });
            this.dialogRef.close();
          }),
          finalize(() => (this.isLoading = false))
        )
        .subscribe();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
