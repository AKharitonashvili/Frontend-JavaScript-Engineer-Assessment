import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectedDayState } from './selected-day.state';

export const SELECTED_DAY = 'selectedDay';
export const selectSelectedDayState =
  createFeatureSelector<SelectedDayState>(SELECTED_DAY);

export const selectSelectedDay = createSelector(
  selectSelectedDayState,
  state => state.selectedDay
);
