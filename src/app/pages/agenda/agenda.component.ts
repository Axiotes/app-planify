import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/calendar/calendar.component";

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent {

}
