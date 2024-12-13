import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ActivitiesListComponent } from '../../components/activities-list/activities-list.component';
import { NgStyle } from '@angular/common';
import { CurrentDate } from '../../../types/date.type';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CalendarComponent,
    LucideAngularModule,
    ActivitiesListComponent,
    NgStyle,
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent {
  public user: LucideIconData = User;

  public date!: CurrentDate;
  public height: number = 40;

  public selectedDate(date: CurrentDate): void {
    this.date = date;
  }
}
