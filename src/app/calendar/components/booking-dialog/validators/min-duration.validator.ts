import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

export function minDuration(minDuration = 30): ValidatorFn {
  return (control: AbstractControl) => {
    const form = control as FormGroup;
    const { startTime, endTime } = form.value;

    if (!startTime || !endTime) return null;

    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;
    const duration = endTotalMinutes - startTotalMinutes;

    return duration >= minDuration ? null : { minDuration: true };
  };
}
