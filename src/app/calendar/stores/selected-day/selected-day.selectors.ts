import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectedDayState } from './selected-day.reducer';

export const SELECTED_DAY = 'selectedDay';
export const selectSelectedDayState =
  createFeatureSelector<SelectedDayState>(SELECTED_DAY);

export const selectSelectedDate = createSelector(
  selectSelectedDayState,
  state => state.selectedDate
);

export const selectParsedSelectedDay = createSelector(
  selectSelectedDayState,
  state => state.parsedSelectedDay
);
