import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  public back: LucideIconData = ArrowLeft;
  public user: LucideIconData = User;

  public formActivity: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    priority: new FormControl(''),
    alert: new FormControl(''),
  });

  public save(): void {
    console.log(this.formActivity.value);
  }
}
