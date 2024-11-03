import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  BookingForm,
  BookinDialogStatus,
} from './interfaces/booking-dialog.interfaces';
import { minDuration } from './validators/min-duration.validator';
import { MatIconModule } from '@angular/material/icon';
import { Appointments } from '../../../stores/appointments/appointments.interface';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDialogComponent implements OnInit {
  readonly data = inject<{
    appointment: Appointments;
  }>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<BookingDialogComponent>);

  bookingForm!: FormGroup<BookingForm>;

  ngOnInit(): void {
    this.bookingForm = new FormGroup(
      {
        startTime: new FormControl(this.data?.appointment?.start, [
          Validators.required,
        ]),
        endTime: new FormControl(this.data?.appointment?.end, [
          Validators.required,
        ]),
        label: new FormControl(this.data?.appointment?.label ?? 'Task', [
          Validators.required,
          Validators.minLength(4),
        ]),
      },
      { validators: minDuration() }
    );
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.dialogRef.close({
        result: this.bookingForm.value,
        status: BookinDialogStatus.CONFIRM,
      });
    }
  }

  removeAppointment() {
    this.dialogRef.close({ status: BookinDialogStatus.DELETE });
  }
}
