import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CalendarSidebarComponent } from './calendar-sidebar/calendar-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { DayViewComponent } from './day-view/day-view.component';
import { Appointments } from '../../shared/interfaces/apointments.interface';
import { Store } from '@ngrx/store';
import { selectAppointmentsByDate } from '../../stores/appointments/appointments.selectors';
import { addAppointment } from '../../stores/appointments/appointments.actions';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';

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

  appointments$ = this.store
    .select(selectAppointmentsByDate(this.getCurrentDate()))
    .pipe(tap(v => console.log(v)));

  updateAppointments(appointment: Appointments) {
    this.store.dispatch(
      addAppointment({
        date: this.getCurrentDate(),
        appointment,
      })
    );
  }

  getCurrentDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
