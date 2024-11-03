import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { Store } from '@ngrx/store';
import { selectSelectedDate } from './stores/selected-day/selected-day.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { updateSelectedDay } from './stores/selected-day/selected-day.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly store = inject(Store);

  selectedDay$: Observable<Date> = this.store.select(selectSelectedDate);

  ngOnInit(): void {
    this.selectToday();
  }

  todayBtnClickHandler(): void {
    this.selectToday();
  }

  selectToday() {
    this.store.dispatch(updateSelectedDay({ selectedDate: new Date() }));
  }

  selectNextDay(currentDate: Date) {
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    this.store.dispatch(updateSelectedDay({ selectedDate: nextDay }));
  }

  selectPrevDay(currentDate: Date) {
    const prevDay = new Date(currentDate);
    prevDay.setDate(currentDate.getDate() - 1);
    this.store.dispatch(updateSelectedDay({ selectedDate: prevDay }));
  }
}
