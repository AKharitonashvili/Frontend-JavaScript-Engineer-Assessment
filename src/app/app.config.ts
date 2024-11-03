import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { appointmentsReducer } from './calendar/stores/appointments/appointments.reducer';
import { APPOINTMENTS } from './calendar/stores/appointments/appointments.selectors';
import { selectedDayReducer } from './calendar/stores/selected-day/selected-day.reducer';
import { SELECTED_DAY } from './calendar/stores/selected-day/selected-day.selectors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      appointments: appointmentsReducer,
      selectedDay: selectedDayReducer,
    }),
    provideState({
      name: APPOINTMENTS,
      reducer: appointmentsReducer,
    }),
    provideState({ name: SELECTED_DAY, reducer: selectedDayReducer }),
    provideEffects(),
  ],
};
