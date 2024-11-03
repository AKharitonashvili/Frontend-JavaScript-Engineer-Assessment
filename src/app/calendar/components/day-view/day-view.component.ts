import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { AsyncPipe, NgStyle } from '@angular/common';
import { FilterAppointmentsPipe } from './pipes/filtered-appointments.pipe';
import { AppointmentSizePipe } from './pipes/appointment-size.pipe';
import { Appointments } from '../../stores/appointments/appointments.interface';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [NgStyle, AsyncPipe, FilterAppointmentsPipe, AppointmentSizePipe],
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayViewComponent {
  @Input({ required: true }) appointments!: Appointments[];
  @Output() editAppointmentClick = new EventEmitter<Appointments>();

  hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  editAppointmentHandler(appointment: Appointments) {
    this.editAppointmentClick.emit(appointment);
  }
}
