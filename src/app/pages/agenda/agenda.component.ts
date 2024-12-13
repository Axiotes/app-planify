import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ActivitiesListComponent } from "../../components/activities-list/activities-list.component";

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CalendarComponent, LucideAngularModule, ActivitiesListComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss',
})
export class AgendaComponent {
  public user: LucideIconData = User;
}
