import { createAction, props } from '@ngrx/store';
import { Appointments } from '../../shared/interfaces/apointments.interface';

export const addAppointment = createAction(
  '[Appointments] Add Appointment',
  props<{ date: string; appointment: Appointments }>()
);

export const removeAppointment = createAction(
  '[Appointments] Remove Appointment',
  props<{ date: string; index: number }>()
);

export const loadAppointments = createAction(
  '[Appointments] Load Appointments',
  props<{ appointments: Record<string, Appointments[]> }>()
);
