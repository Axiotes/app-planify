import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LucideAngularModule, Minus } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { Activity } from '../../../types/activity.type';
import { ActivitiesComponent } from '../activities/activities.component';
import { CurrentDate } from '../../../types/date.type';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-activities-list',
  standalone: true,
  imports: [LucideAngularModule, ActivitiesComponent, NgIf],
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.scss',
})
export class ActivitiesListComponent implements OnInit, OnChanges {
  @Output() public changeHeight: EventEmitter<number> =
    new EventEmitter<number>();
  @Input() public activities!: Activity[];
  @Input() public date!: CurrentDate;
  public currentDay: number = new Date().getDate();
  public weekDay: number = 0;

  public minus: LucideIconData = Minus;
  public weekDays: string[] = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ];

  private touchMoved: boolean = false;
  private startX: number = 0;
  private startY: number = 0;

  ngOnInit(): void {
    if (this.date) {
      this.weekDay = new Date(
        this.date.year,
        this.date.monthNumber,
        this.date.day
      ).getDay();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['date']) {
      this.weekDay = new Date(
        this.date.year,
        this.date.monthNumber,
        this.date.day
      ).getDay();
    }
  }

  public touchStart(event: TouchEvent): void {
    this.touchMoved = false;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  public touchMove(event: TouchEvent): void {
    if (!this.touchMoved) {
      this.touchMoved = true;

      const currentX = event.touches[0].clientX;
      const currentY = event.touches[0].clientY;
      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaX > 0) {
          // Baixo
          this.changeHeight.emit(40);
        } else {
          // Cima
          this.changeHeight.emit(100);
        }
      }
    }
  }
}
