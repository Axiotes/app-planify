import { Component } from '@angular/core';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  public user: LucideIconData = User;
  public back: LucideIconData = ArrowLeft;
}
