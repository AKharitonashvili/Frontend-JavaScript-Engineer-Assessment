import { FormControl } from '@angular/forms';

export interface BookingForm {
  startTime: FormControl<string | null>;
  endTime: FormControl<string | null>;
  label: FormControl<string | null>;
}
