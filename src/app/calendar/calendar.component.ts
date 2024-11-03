import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CalendarSidebarComponent } from './components/calendar-sidebar/calendar-sidebar.component';
import { DayViewComponent } from './components/day-view/day-view.component';
import {
  updateAppointment,
  addAppointment,
  removeAppointment,
} from './stores/appointments/appointments.actions';
import { Appointments } from './stores/appointments/appointments.interface';
import { selectAppointmentsByDate } from './stores/appointments/appointments.selectors';
import { updateSelectedDay } from './stores/selected-day/selected-day.actions';
import {
  selectParsedSelectedDay,
  selectSelectedDate,
} from './stores/selected-day/selected-day.selectors';
import { BookingDialogComponent } from './components/booking-dialog/booking-dialog.component';
import { BookinDialogStatus } from './components/booking-dialog/interfaces/booking-dialog.interfaces';

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
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  selectedDay = signal<string>('');

  vm$: Observable<{
    appointments: Appointments[];
    selectedDate: Date | undefined;
  }> = combineLatest([
    this.store.select(selectParsedSelectedDay).pipe(
      switchMap(selectedDay => {
        this.selectedDay.set(selectedDay);
        return this.store.select(selectAppointmentsByDate(selectedDay));
      })
    ),
    this.store.select(selectSelectedDate),
  ]).pipe(
    map(([appointments, selectedDate]) => ({ appointments, selectedDate }))
  );

  onSelectedDateChange(selectedDate: Date) {
    this.store.dispatch(updateSelectedDay({ selectedDate }));
  }

  openBookingDialog(appointment?: Appointments) {
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      data: { appointment },
    });

    dialogRef.afterClosed().subscribe(res => {
      if (!res?.status) return;

      const { status, result } = res;
      const appointmentData = {
        start: result?.startTime,
        end: result?.endTime,
        label: result?.label,
      };

      if (status === BookinDialogStatus.CONFIRM) {
        const id = appointment?.id || Date.now().toString();
        this.store.dispatch(
          appointment?.id
            ? updateAppointment({
                date: this.selectedDay(),
                appointment: { ...appointmentData, id },
              })
            : addAppointment({
                date: this.selectedDay(),
                appointment: { ...appointmentData, id },
              })
        );
      } else if (status === BookinDialogStatus.DELETE && appointment?.id) {
        this.store.dispatch(
          removeAppointment({
            date: this.selectedDay(),
            id: appointment.id,
          })
        );
      }
    });
  }
}
