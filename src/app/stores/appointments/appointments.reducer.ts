import { createReducer, on } from '@ngrx/store';
import * as AppointmentsActions from './appointments.actions';

import { AppointmentsState } from './appointments.interface';

export const initialAppointmentsState: AppointmentsState = {};

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
