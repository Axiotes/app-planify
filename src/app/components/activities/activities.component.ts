import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { TimePipe } from '../../pipes/time.pipe';
import { TrucatePipe } from '../../pipes/trucate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [LucideAngularModule, NgFor, TimePipe, TrucatePipe, RouterLink],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  @Input() public id?: number;
  @Input() public title!: string;
  @Input() public time!: string;
  @Input() public priority!: number;
  public stars: LucideIconData[] = [Star, Star, Star];
}
