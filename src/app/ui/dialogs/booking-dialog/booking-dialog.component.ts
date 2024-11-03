import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingForm } from './interfaces/booking-dialog.interfaces';
import { minDuration } from './validators/min-duration.validator';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDialogComponent {
  bookingForm: FormGroup<BookingForm>;

  constructor(private dialogRef: MatDialogRef<BookingDialogComponent>) {
    this.bookingForm = new FormGroup(
      {
        startTime: new FormControl<string | null>('', [Validators.required]),
        endTime: new FormControl<string | null>('', [Validators.required]),
        label: new FormControl<string | null>('Task', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      { validators: minDuration() }
    );
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.dialogRef.close(this.bookingForm.value);
    }
  }
}
