import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as AppointmentsActions from './appointments.actions';
import { AppointmentsApiService } from '../../services/appointments-api.service';
import { Store } from '@ngrx/store';
import { selectAllAppointmentsByDate } from './appointments.selectors';
import { of } from 'rxjs';
import { ErrorDialogComponent } from '../../components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class AppointmentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly appointmentsApi = inject(AppointmentsApiService);
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentsActions.loadAppointments),
      switchMap(() => this.appointmentsApi.getAppointments()),
      map(appointments => {
        return AppointmentsActions.loadAppointmentsSuccess({ appointments });
      }),
      catchError(err => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err?.message },
        });

        return of(
          AppointmentsActions.loadAppointmentsFailure({ error: err?.message })
        );
      })
    )
  );

  updateAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AppointmentsActions.addAppointment,
        AppointmentsActions.loadAppointments,
        AppointmentsActions.removeAppointment
      ),
      switchMap(() =>
        this.store
          .select(selectAllAppointmentsByDate)
          .pipe(
            switchMap(appointments =>
              this.appointmentsApi.saveAppointments(appointments)
            )
          )
      ),
      map(() => {
        return AppointmentsActions.saveAppointmentsSuccess();
      }),
      catchError(err => {
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err?.message },
        });

        return of(
          AppointmentsActions.saveAppointmentsFailure({ error: err?.message })
        );
      })
    )
  );
}
