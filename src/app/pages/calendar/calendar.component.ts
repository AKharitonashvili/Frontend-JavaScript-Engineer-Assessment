import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalendarSidebarComponent } from './calendar-sidebar/calendar-sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import { DayViewComponent } from './day-view/day-view.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CalendarSidebarComponent, MatButtonModule, DayViewComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {}
