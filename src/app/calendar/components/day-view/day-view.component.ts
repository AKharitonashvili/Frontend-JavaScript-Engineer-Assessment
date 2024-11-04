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
  @Output() openBookingDialogOnHour = new EventEmitter<Appointments>();

  hours: number[] = Array.from({ length: 24 }, (_, i) => i);

  editAppointmentHandler(event: Event, appointment: Appointments) {
    event.stopPropagation();
    this.editAppointmentClick.emit(appointment);
  }

  openBookingDialogOnHourHandler(event: Event, hour: number) {
    event.stopPropagation();

    const formattedStartHour = hour.toString().padStart(2, '0');
    const formattedEndHour = (hour + 1).toString().padStart(2, '0');

    this.openBookingDialogOnHour.emit({
      start: `${formattedStartHour}:00`,
      end: `${formattedEndHour}:00`,
      label: 'Task',
    });
  }

  drop(event: CdkDragDrop<Appointments[]>) {
    const dropY = event.dropPoint.y;
    const container = event.container.element.nativeElement as HTMLElement;
    const containerTop = container.getBoundingClientRect().top;
    const relativeY = dropY - containerTop;
    const targetHour = Math.floor((relativeY / container.offsetHeight) * 24);

    const draggedAppointment = event.item.data as Appointments;
    const [startHour, startMinute] = draggedAppointment.start
      .split(':')
      .map(Number);

    if (startHour === targetHour && startMinute !== 0) {
      const durationInMinutes =
        parseInt(draggedAppointment.end.split(':')[0]) * 60 +
        parseInt(draggedAppointment.end.split(':')[1]) -
        (startHour * 60 + startMinute);

      this.emitUpdatedAppointment(
        draggedAppointment,
        targetHour,
        durationInMinutes,
        true
      );
      return;
    }

    if (startHour !== targetHour) {
      const [endHour, endMinute] = draggedAppointment.end
        .split(':')
        .map(Number);
      const durationInMinutes =
        endHour * 60 + endMinute - (startHour * 60 + startMinute);

      this.emitUpdatedAppointment(
        draggedAppointment,
        targetHour,
        durationInMinutes,
        false
      );
    }
  }

  private emitUpdatedAppointment(
    appointment: Appointments,
    targetHour: number,
    durationInMinutes: number,
    snapToTopOfHour: boolean
  ) {
    const newStartMinute = snapToTopOfHour
      ? 0
      : parseInt(appointment.start.split(':')[1]);
    const newStartTime = `${targetHour.toString().padStart(2, '0')}:${newStartMinute.toString().padStart(2, '0')}`;

    const totalEndMinutes =
      targetHour * 60 + newStartMinute + durationInMinutes;
    const newEndHour = Math.floor(totalEndMinutes / 60);
    const newEndMinute = totalEndMinutes % 60;
    const newEndTime = `${newEndHour.toString().padStart(2, '0')}:${newEndMinute.toString().padStart(2, '0')}`;

    const updatedAppointment = {
      ...appointment,
      start: newStartTime,
      end: newEndTime,
    };

    this.appointmentDragged.emit(updatedAppointment);
  }
}
