import { Pipe, PipeTransform } from '@angular/core';
import { Appointments } from '../../../../shared/interfaces/apointments.interface';

@Pipe({
  name: 'filterAppointments',
  standalone: true,
})
export class FilterAppointmentsPipe implements PipeTransform {
  transform(appointments: Appointments[], hour: number): Appointments[] {
    return appointments.filter(appointment => {
      const [startHour, startMinute] = appointment.start.split(':').map(Number);

      return startHour === hour && startMinute >= 0;
    });
  }
}
