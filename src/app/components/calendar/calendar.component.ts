import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrentDate } from '../../../types/date.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  @Output() public selectedDate: EventEmitter<CurrentDate> =
    new EventEmitter<CurrentDate>();
  public currentDate: Date = new Date();
  public daysInMonth: number[] = [];
  public daysFromPreviousMonth: number[] = [];
  public daysFromNextMonth: number[] = [];
  public calendarDays: number[] = [];
  public weekDays: string[] = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
  public currentMonth: string = '';
  public currentYear: number = 0;
  public currentWeekDay: number = 0;
  public currentDay: number = 0;
  public selectedDay: number = 0;
  public monthNumber: number = 0;
  public month: string = '';
  public year: number = 0;
  public monthName: string[] = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];
  private touchMoved: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  ngOnInit() {
    this.generateCalendar(this.currentDate);
    this.currentDay = this.currentDate.getDate();
    this.currentMonth = this.monthName[this.currentDate.getMonth()];
    this.currentYear = this.currentDate.getFullYear();
    this.selectedDay = this.currentDate.getDate();
  }

  public generateCalendar(date: Date): void {
    const year = date.getFullYear();
    this.monthNumber = date.getMonth();
    const weekday = date.getDay();

    const daysInCurrentMonth = new Date(year, this.monthNumber + 1, 0).getDate();
    this.daysInMonth = Array.from(
      { length: daysInCurrentMonth },
      (_, i) => i + 1
    );

    const firstDayOfMonth = new Date(year, this.monthNumber, 1).getDay();
    const daysInPreviousMonth = new Date(year, this.monthNumber, 0).getDate();
    this.daysFromPreviousMonth = Array.from(
      { length: firstDayOfMonth },
      (_, i) => daysInPreviousMonth - i
    ).reverse();

    const totalDays =
      this.daysFromPreviousMonth.length + this.daysInMonth.length;
    const remainingDays = 7 - (totalDays % 7);
    this.daysFromNextMonth = Array.from(
      { length: remainingDays },
      (_, i) => i + 1
    );

    this.calendarDays = [
      ...this.daysFromPreviousMonth,
      ...this.daysInMonth,
      ...this.daysFromNextMonth,
    ];

    this.month = this.monthName[this.monthNumber];
    this.year = year;
    this.currentWeekDay = weekday;
  }

  public setSelectedDate(day: number, i: number) {
    if (i < this.daysFromPreviousMonth.length) {
      this.changeMonth(-1);
      this.selectedDay = day;
      this.selectedDate.emit({
        day: this.selectedDay,
        month: this.month,
        year: this.year,
      });
      return;
    }

    if (i >= this.daysFromPreviousMonth.length + this.daysInMonth.length) {
      this.changeMonth(+1);
      this.selectedDay = day;
      this.selectedDate.emit({
        day: this.selectedDay,
        month: this.month,
        year: this.year,
      });
      return;
    }

    this.selectedDay = day;
    this.selectedDate.emit({
      day: this.selectedDay,
      month: this.month,
      year: this.year,
    });
  }

  public touchStart(event: TouchEvent): void {
    this.touchMoved = false;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  public touchMove(event: TouchEvent): void {
    if (!this.touchMoved) {
      this.touchMoved = true;

      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          // Direita
          this.changeMonth(-1);
        } else {
          // Esquerda
          this.changeMonth(+1);
        }
      }
    }
  }

  private changeMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.generateCalendar(this.currentDate);
  }
}
