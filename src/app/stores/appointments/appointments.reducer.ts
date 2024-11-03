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
  on(AppointmentsActions.removeAppointment, (state, { date, id }) => {
    const existingAppointments = state[date] || [];
    return {
      ...state,
      [date]: existingAppointments.filter(a => a.id !== id),
    };
  }),
  on(AppointmentsActions.updateAppointment, (state, { date, appointment }) => {
    const existingAppointments = state[date] || [];

    return {
      ...state,
      [date]: existingAppointments.map(a =>
        a.id !== appointment.id ? a : appointment
      ),
    };
  }),
  on(AppointmentsActions.loadAppointments, (state, { appointments }) => ({
    ...appointments,
  }))
);
