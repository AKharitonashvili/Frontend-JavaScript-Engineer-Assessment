import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { APPOINTMENTS } from './stores/appointments/appointments.selectors';
import { appointmentsReducer } from './stores/appointments/appointments.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ appointments: appointmentsReducer }),
    provideState({
      name: APPOINTMENTS,
      reducer: appointmentsReducer,
    }),
    provideEffects(),
  ],
};
