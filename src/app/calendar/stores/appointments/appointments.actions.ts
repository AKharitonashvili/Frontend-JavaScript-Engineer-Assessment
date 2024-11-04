import { createAction, props } from '@ngrx/store';
import { Appointments } from './appointments.interface';

export const addAppointment = createAction(
  '[Appointments] Add Appointment',
  props<{ date: string; appointment: Appointments }>()
);

export const removeAppointment = createAction(
  '[Appointments] Remove Appointment',
  props<{ date: string; id: string }>()
);

export const updateAppointment = createAction(
  '[Appointments] Edit Appointment',
  props<{ date: string; appointment: Appointments }>()
);

export const loadAppointments = createAction(
  '[Appointments] Load Appointments'
);

export const loadAppointmentsSuccess = createAction(
  '[Appointments] Load Appointments Success',
  props<{ appointments: Record<string, Appointments[]> }>()
);

export const loadAppointmentsFailure = createAction(
  '[Appointments] Load Appointments Failure',
  props<{ error: string }>()
);

export const saveAppointmentsSuccess = createAction(
  '[Appointments] Save Appointments Success'
);

export const saveAppointmentsFailure = createAction(
  '[Appointments] Save Appointments Failure',
  props<{ error: string }>()
);
