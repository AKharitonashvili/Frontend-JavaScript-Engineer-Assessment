import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { Appointments } from '../../../shared/interfaces/apointments.interface';
import { FilterAppointmentsPipe } from './pipes/filtered-appointments.pipe';
import { AppointmentSizePipe } from './pipes/appointment-size.pipe';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [NgStyle, AsyncPipe, FilterAppointmentsPipe, AppointmentSizePipe],
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayViewComponent {
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  @Input({ required: true }) appointments!: Appointments[];
}
