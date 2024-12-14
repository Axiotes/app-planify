import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [LucideAngularModule, NgFor],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  public priority: number = 3;
  public stars: LucideIconData[] = [Star, Star, Star];
}
