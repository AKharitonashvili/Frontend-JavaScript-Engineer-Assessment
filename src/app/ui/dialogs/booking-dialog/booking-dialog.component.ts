import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDialogComponent {
  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<BookingDialogComponent>
  ) {
    this.bookingForm = this.fb.group({
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.dialogRef.close(this.bookingForm.value);
    }
  }
}
