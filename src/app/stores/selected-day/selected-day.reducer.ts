import { createReducer, on } from '@ngrx/store';
import { updateSelectedDay } from './selected-day.actions';
import { initialSelectedDayState } from './selected-day.state';

export const selectedDayReducer = createReducer(
  initialSelectedDayState,
  on(updateSelectedDay, (state, { selectedDay }) => ({
    ...state,
    selectedDay: parseSelectedDate(selectedDay),
  }))
);

function parseSelectedDate(selectedDate: Date): string {
  const date = new Date(selectedDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
