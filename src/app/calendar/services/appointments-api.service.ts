import { Injectable } from '@angular/core';
import { delay, Observable, of, tap } from 'rxjs';
import { Appointments } from '../stores/appointments/appointments.interface';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsApiService {
  getAppointments(): Observable<Record<string, Appointments[]>> {
    return of(JSON.parse(localStorage.getItem('appointments') ?? '{}')).pipe(
      delay(100)
    );
  }

  saveAppointments(
    appointments: Record<string, Appointments[]>
  ): Observable<{ message: string }> {
    return of({ message: 'Successfuly saved Appointments' }).pipe(
      delay(100),
      tap(() =>
        localStorage.setItem('appointments', JSON.stringify(appointments))
      )
    );
  }
}
