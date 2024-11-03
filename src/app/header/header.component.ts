import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() selectedDate!: Date;
  @Output() todayBtnClick = new EventEmitter<boolean>();
  @Output() nextBtnClick = new EventEmitter<Date>();
  @Output() prevBtnClick = new EventEmitter<Date>();

  todayBtnClickHandler() {
    this.todayBtnClick.emit();
  }

  nextBtnClickHandler() {
    this.nextBtnClick.emit(this.selectedDate);
  }

  prevBtnClickHandler() {
    this.prevBtnClick.emit(this.selectedDate);
  }
}
