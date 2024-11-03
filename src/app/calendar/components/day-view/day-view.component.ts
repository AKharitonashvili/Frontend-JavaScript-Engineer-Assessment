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
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [
    NgStyle,
    AsyncPipe,
    FilterAppointmentsPipe,
    AppointmentSizePipe,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayViewComponent {
  @Input({ required: true }) appointments!: Appointments[];
  @Output() editAppointmentClick = new EventEmitter<Appointments>();
  @Output() appointmentDragged = new EventEmitter<Appointments>();

  hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  editAppointmentHandler(appointment: Appointments) {
    this.editAppointmentClick.emit(appointment);
  }

  drop(event: CdkDragDrop<Appointments[]>) {
    const dropY = event.dropPoint.y;
    const timeSlotsContainer = event.container.element
      .nativeElement as HTMLElement;
    const containerTop = timeSlotsContainer.getBoundingClientRect().top;
    const containerHeight = timeSlotsContainer.offsetHeight;
    const relativeY = dropY - containerTop;
    const hourHeight = containerHeight / 24;
    const targetHour = Math.floor(relativeY / hourHeight);

    const draggedAppointment = event.item.data as Appointments;

    const [startHour, startMinute] = draggedAppointment.start
      .split(':')
      .map(Number);
    const [endHour, endMinute] = draggedAppointment.end.split(':').map(Number);

    const durationInMinutes =
      endHour * 60 + endMinute - (startHour * 60 + startMinute);

    const newStartHour = targetHour;
    const newStartMinute = startMinute;
    const newEndHour = newStartHour + Math.floor(durationInMinutes / 60);
    const newEndMinute = (startMinute + durationInMinutes) % 60;

    const newStartTime = `${newStartHour.toString().padStart(2, '0')}:${newStartMinute.toString().padStart(2, '0')}`;
    const newEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMinute.toString().padStart(2, '0')}`;

    const updatedAppointment = {
      ...draggedAppointment,
      start: newStartTime,
      end: newEndTime,
    };

    this.appointmentDragged.emit(updatedAppointment);
  }
}
