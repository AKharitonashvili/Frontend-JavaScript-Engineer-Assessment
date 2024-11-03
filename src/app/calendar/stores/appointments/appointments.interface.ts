export interface Appointments {
  start: string;
  end: string;
  label: string;
  id: string;
}

export type AppointmentsState = Record<string, Appointments[]>;
