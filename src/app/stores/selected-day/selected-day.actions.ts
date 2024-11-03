import { createAction, props } from '@ngrx/store';

export const updateSelectedDay = createAction(
  '[Selected Day] Update Selected Day',
  props<{ selectedDay: Date }>()
);
