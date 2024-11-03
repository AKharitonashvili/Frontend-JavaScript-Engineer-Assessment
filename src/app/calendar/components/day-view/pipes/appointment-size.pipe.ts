import { Pipe, PipeTransform } from '@angular/core';
import { Appointments } from '../../../stores/appointments/appointments.interface';

@Pipe({
  name: 'appointmentSize',
  standalone: true,
})
export class AppointmentSizePipe implements PipeTransform {
  transform(
    appointment: Appointments,
    index: number
  ): {
    top: string;
    bottom: string;
    left: string;
  } {
    const { start, end } = appointment;
    const [startHour, startMinute] = start.split(':').map(Number);
    const [endHour, endMinute] = end.split(':').map(Number);

    const topPercentage = (startMinute / 60) * 100;
    const durationMinutes =
      (endHour - startHour) * 60 + (endMinute - startMinute);

    let bottomPercentage: number;
    const remainingMinutesInHour = 60 - startMinute;

    if (durationMinutes <= remainingMinutesInHour) {
      bottomPercentage = 100 - (durationMinutes / remainingMinutesInHour) * 100;
    } else {
      bottomPercentage =
        -((durationMinutes - remainingMinutesInHour) / 60) * 100;
    }

    return {
      top: `${topPercentage}%`,
      bottom: `${bottomPercentage}%`,
      left: `${index * 5}%`,
    };
  }
}
