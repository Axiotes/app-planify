import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ActivitiesListComponent } from '../../components/activities-list/activities-list.component';
import { NgStyle } from '@angular/common';
import { CurrentDate } from '../../../types/date.type';
import { ApiRequestsService } from '../../services/api-requests.service';
import { Activity } from '../../../types/activity.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CalendarComponent,
    LucideAngularModule,
    ActivitiesListComponent,
    NgStyle,
    RouterLink,
  ],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent implements OnInit {
  public user: LucideIconData = User;

  public activities: Activity[] = [];
  public date!: CurrentDate;
  public height: number = 40;

  constructor(private apiRequestsServices: ApiRequestsService) {}

  ngOnInit(): void {
    this.getActivities();
  }

  public selectedDate(date: CurrentDate): void {
    this.date = date;
    this.getActivities();
  }

  public doneActivity(done: { id?: number; value: boolean }): void {
    this.apiRequestsServices.doneActivity(done).subscribe();
  }

  private getActivities(): void {
    if (this.date) {
      const date =
        this.date.monthNumber < 10
          ? `${this.date.day}0${this.date.monthNumber}${this.date.year}`
          : `${this.date.day}${this.date.monthNumber}${this.date.year}`;

      this.apiRequestsServices.activities(date).subscribe({
        next: (res) => {
          this.activities = res.activities;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
