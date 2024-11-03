import { createAction, props } from '@ngrx/store';
import { Appointments } from '../../shared/interfaces/apointments.interface';

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
  '[Appointments] Load Appointments',
  props<{ appointments: Record<string, Appointments[]> }>()
);
