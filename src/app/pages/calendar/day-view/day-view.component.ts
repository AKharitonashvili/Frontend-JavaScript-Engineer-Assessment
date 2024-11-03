import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-day-view',
  standalone: true,
  imports: [],
  templateUrl: './day-view.component.html',
  styleUrl: './day-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayViewComponent {
  hours: number[] = Array.from({ length: 24 }, (_, i) => i);
}
