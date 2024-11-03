import { createReducer, on } from '@ngrx/store';
import { updateSelectedDay } from './selected-day.actions';

export interface SelectedDayState {
  selectedDate: Date;
  parsedSelectedDay: string;
}

export const initialSelectedDayState: SelectedDayState = {
  parsedSelectedDay: '',
  selectedDate: new Date(),
};

export const selectedDayReducer = createReducer(
  initialSelectedDayState,
  on(updateSelectedDay, (state, { selectedDate }) => ({
    ...state,
    parsedSelectedDay: parseSelectedDate(selectedDate),
    selectedDate,
  }))
);

function parseSelectedDate(selectedDate: Date): string {
  const date = new Date(selectedDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}
