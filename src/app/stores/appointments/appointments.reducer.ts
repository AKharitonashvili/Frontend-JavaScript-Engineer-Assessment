import { createReducer, on } from '@ngrx/store';
import { initialAppointmentsState } from './appointments.state';
import * as AppointmentsActions from './appointments.actions';

export const appointmentsReducer = createReducer(
  initialAppointmentsState,
  on(AppointmentsActions.addAppointment, (state, { date, appointment }) => {
    const existingAppointments = state[date] || [];
    return {
      ...state,
      [date]: [...existingAppointments, appointment],
    };
  }),
  on(AppointmentsActions.removeAppointment, (state, { date, index }) => {
    const existingAppointments = state[date] || [];
    return {
      ...state,
      [date]: existingAppointments.filter((_, i) => i !== index),
    };
  }),
  on(AppointmentsActions.loadAppointments, (state, { appointments }) => ({
    ...appointments,
  }))
);
