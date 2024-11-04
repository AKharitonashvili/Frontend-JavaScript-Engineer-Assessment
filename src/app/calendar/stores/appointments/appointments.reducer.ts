import { createReducer, on } from '@ngrx/store';
import * as AppointmentsActions from './appointments.actions';
import { AppointmentsState } from './appointments.interface';

export const initialAppointmentsState: AppointmentsState = {
  appointments: {},
  loading: false,
  error: null,
};

export const appointmentsReducer = createReducer(
  initialAppointmentsState,
  on(AppointmentsActions.addAppointment, (state, { date, appointment }) => {
    const existingAppointments = state.appointments[date] || [];

    return {
      ...state,
      loading: false,
      appointments: {
        ...state.appointments,
        [date]: [...existingAppointments, appointment],
      },
    };
  }),
  on(AppointmentsActions.removeAppointment, (state, { date, id }) => {
    const existingAppointments = state.appointments[date] || [];

    return {
      ...state,
      loading: false,
      appointments: {
        ...state.appointments,
        [date]: existingAppointments.filter(a => a.id !== id),
      },
    };
  }),
  on(AppointmentsActions.updateAppointment, (state, { date, appointment }) => {
    const existingAppointments = state.appointments[date] || [];

    return {
      ...state,
      loading: false,
      appointments: {
        ...state.appointments,
        [date]: existingAppointments.map(a =>
          a.id !== appointment.id ? a : appointment
        ),
      },
    };
  }),
  on(AppointmentsActions.loadAppointments, state => ({
    ...state,
    loading: true,
  })),
  on(
    AppointmentsActions.loadAppointmentsSuccess,
    (state, { appointments }) => ({
      ...state,
      appointments,
      loading: false,
    })
  )
);
