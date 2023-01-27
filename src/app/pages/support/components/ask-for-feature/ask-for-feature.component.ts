import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { take, tap, finalize } from 'rxjs/operators';
import { FeaturesService } from './../../../../services/features.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ask-for-feature',
  templateUrl: './ask-for-feature.component.html',
  styleUrls: ['./ask-for-feature.component.scss'],
})
export class AskForFeatureComponent implements OnInit {
  form: FormGroup;
  isLoading: boolean;

  constructor(
    private fb: FormBuilder,
    private featuresService: FeaturesService,
    private dialogRef: MatDialogRef<AskForFeatureComponent>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({ feature: new FormControl('', [Validators.required]) });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      this.featuresService
        .askForNewFeature(this.form.get('feature').value)
        .pipe(
          take(1),
          tap(() => {
            this._snackBar.open('Feature request has been created', null, {
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
