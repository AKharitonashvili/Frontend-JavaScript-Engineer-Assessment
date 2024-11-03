import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppointmentsState } from './appointments.interface';

export const APPOINTMENTS = 'appointments';

export const selectAppointmentsState =
  createFeatureSelector<AppointmentsState>(APPOINTMENTS);

export const selectAppointmentsByDate = (date: string) =>
  createSelector(selectAppointmentsState, state => state[date] || []);