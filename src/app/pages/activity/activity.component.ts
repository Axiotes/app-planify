import { Component } from '@angular/core';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  public back: LucideIconData = ArrowLeft;
  public user: LucideIconData = User;
}
