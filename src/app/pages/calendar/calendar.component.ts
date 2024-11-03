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
import { AsyncPipe, DatePipe } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { BookingDialogComponent } from '../../ui/dialogs/booking-dialog/booking-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  selectParsedSelectedDay,
  selectSelectedDate,
} from '../../stores/selected-day/selected-day.selectors';
import { updateSelectedDay } from '../../stores/selected-day/selected-day.actions';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CalendarSidebarComponent,
    MatButtonModule,
    DayViewComponent,
    AsyncPipe,
    DatePipe,
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
    .select(selectParsedSelectedDay)
    .pipe(
      switchMap(selectedDay => {
        this.selectedDay.set(selectedDay);
        return this.store.select(selectAppointmentsByDate(selectedDay));
      })
    );

  selectedDate$: Observable<Date | undefined> =
    this.store.select(selectSelectedDate);

  selectedDateChange(selectedDate: Date) {
    this.store.dispatch(updateSelectedDay({ selectedDate }));
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
