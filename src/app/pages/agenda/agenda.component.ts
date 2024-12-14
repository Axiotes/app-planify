import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ActivitiesListComponent } from '../../components/activities-list/activities-list.component';
import { NgStyle } from '@angular/common';
import { CurrentDate } from '../../../types/date.type';
import { ApiRequestsService } from '../../services/api-requests.service';
import { Activity } from '../../../types/activity.type';

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

  private getActivities(): void {
    if (this.date) {
      const date = `${this.date.day}${this.date.monthNumber}${this.date.year}`;

      this.apiRequestsServices.activities(date).subscribe({
        next: (res) => {
          console.log(res);
          this.activities = res.activities;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
