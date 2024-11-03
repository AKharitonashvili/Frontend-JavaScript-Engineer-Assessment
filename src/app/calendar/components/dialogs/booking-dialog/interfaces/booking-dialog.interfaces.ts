import { FormControl } from '@angular/forms';

export interface BookingForm {
  startTime: FormControl<string | null>;
  endTime: FormControl<string | null>;
  label: FormControl<string | null>;
}

export enum BookinDialogStatus {
  CONFIRM = 1,
  DELETE = 2,
}
