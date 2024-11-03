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
    this.bookingForm = new FormGroup({
      startTime: new FormControl<string | null>('', [Validators.required]),
      endTime: new FormControl<string | null>('', [Validators.required]),
      label: new FormControl<string | null>('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  onSubmit() {
    console.log(this.bookingForm.controls.label);
    if (this.calculateDuration() < 30) {
      this.bookingForm.setErrors({ minDuration: true });
    } else {
      this.bookingForm.setErrors(null);
    }

    if (this.bookingForm.valid) {
      this.dialogRef.close(this.bookingForm.value);
    }
  }

  calculateDuration(): number {
    const { startTime, endTime } = this.bookingForm.value;
    if (!startTime || !endTime) return 0;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    return endTotalMinutes - startTotalMinutes;
  }
}
