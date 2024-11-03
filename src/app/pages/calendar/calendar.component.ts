import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CalendarSidebarComponent } from './calendar-sidebar/calendar-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { DayViewComponent } from './day-view/day-view.component';
import { Appointments } from '../../shared/interfaces/apointments.interface';
import { Store } from '@ngrx/store';
import { selectAppointmentsByDate } from '../../stores/appointments/appointments.selectors';
import { addAppointment } from '../../stores/appointments/appointments.actions';
import { AsyncPipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { BookingDialogComponent } from '../../ui/dialogs/booking-dialog/booking-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { selectSelectedDay } from '../../stores/selected-day/selected-day.selectors';
import { updateSelectedDay } from '../../stores/selected-day/selected-day.actions';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarSidebarComponent,
    MatButtonModule,
    DayViewComponent,
    AsyncPipe,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  selectedDay = signal<string>('');

  appointments$: Observable<Appointments[]> = this.store
    .select(selectSelectedDay)
    .pipe(
      switchMap(selectedDay => {
        this.selectedDay.set(selectedDay);
        return this.store.select(selectAppointmentsByDate(selectedDay));
      })
    );

  selectedDateChange(selectedDay: Date) {
    this.store.dispatch(updateSelectedDay({ selectedDay }));
  }

  updateAppointments(appointment: Appointments) {
    this.store.dispatch(
      addAppointment({
        date: this.selectedDay(),
        appointment,
      })
    );
  }

  openBookingDialog() {
    const dialogRef = this.dialog.open(BookingDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAppointment(result.startTime, result.endTime, result.label);
      }
    });
  }

  addAppointment(start: string, end: string, label: string) {
    this.updateAppointments({
      start,
      end,
      label,
    });
  }
}
