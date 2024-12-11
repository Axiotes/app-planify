import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
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

  ngOnInit() {
    this.generateCalendar(this.currentDate);
  }

  public generateCalendar(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    const weekday = date.getDay();
    const day = date.getDate() - 1;
    const monthName = [
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

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from(
      { length: daysInCurrentMonth },
      (_, i) => i + 1
    );

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInPreviousMonth = new Date(year, month, 0).getDate();
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

    this.currentMonth = monthName[month];
    this.currentYear = year;
    this.currentWeekDay = weekday;
    this.currentDay = day;
  }

  public changeMonth(offset: number): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + offset,
      1
    );
    this.generateCalendar(this.currentDate);
  }
}
