import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Appointments } from '../../../shared/interfaces/apointments.interface';

@Component({
  selector: 'app-calendar-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './calendar-sidebar.component.html',
  styleUrl: './calendar-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarSidebarComponent {
  @Input({ required: true }) appointments!: Appointments[];
  @Output() openDiallog = new EventEmitter<void>();
  @Output() selectedChange = new EventEmitter<Date>();
  selectedDate: Date = new Date();
}
