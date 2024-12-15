import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LucideAngularModule, Star } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { TimePipe } from '../../pipes/time.pipe';
import { TrucatePipe } from '../../pipes/trucate.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [LucideAngularModule, NgFor, TimePipe, TrucatePipe, RouterLink, FormsModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss',
})
export class ActivitiesComponent {
  @Input() public id?: number;
  @Input() public title!: string;
  @Input() public time!: string;
  @Input() public priority!: number;
  @Input() public done!: boolean;
  public stars: LucideIconData[] = [Star, Star, Star];
}
