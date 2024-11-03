import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { BookingDialogComponent } from '../../../ui/dialogs/booking-dialog/booking-dialog.component';
import { Appointments } from '../../../shared/interfaces/apointments.interface';

@Component({
  selector: 'app-calendar-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar-sidebar.component.html',
  styleUrl: './calendar-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSidebarComponent {
  @Input({ required: true }) appointments!: Appointments[];
  @Output() updateAppointment = new EventEmitter<Appointments>();

  constructor(private dialog: MatDialog) {}

  openBookingDialog() {
    const dialogRef = this.dialog.open(BookingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAppointment(result.startTime, result.endTime);
      }
    });
  }

  addAppointment(start: string, end: string) {
    this.updateAppointment.emit({
      start,
      end,
      label: `Task `,
    });
  }
}
