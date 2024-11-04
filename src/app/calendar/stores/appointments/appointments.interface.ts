export interface Appointments {
  start: string;
  end: string;
  label: string;
  id?: string;
}

export interface AppointmentsState {
  appointments: Record<string, Appointments[]>;
  loading?: boolean;
  error?: string | null;
}
