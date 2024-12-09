import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ApiRequestsService } from '../../services/api-requests.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimePipe } from '../../pipes/time.pipe';
import { DatePipe } from '../../pipes/date.pipe';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    LucideAngularModule,
    RouterLink,
    ReactiveFormsModule,
    TimePipe,
    DatePipe,
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
})
export class ActivityComponent {
  public back: LucideIconData = ArrowLeft;
  public user: LucideIconData = User;

  public formActivity: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required, Validators.minLength(10)]),
    time: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl(''),
    alert: new FormControl(false),
  });

  constructor(
    private apiRequestService: ApiRequestsService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public get date(): string {
    return this.formActivity.controls['date'].value;
  }

  public get time(): string {
    return this.formActivity.controls['time'].value;
  }

  public save(): void {
    if (!this.formActivity.valid) {
      this.snackBar.openFromComponent(AlertComponent, {
        duration: 5000,
        data: {
          message: 'Os campos de título e data são obrigatórios',
        },
      });
      return;
    }

    this.apiRequestService.newActivity(this.formActivity.value).subscribe({
      next: (res) => {
        this.snackBar.openFromComponent(AlertComponent, {
          duration: 5000,
          data: {
            message: res.message,
          },
        });
        this.router.navigateByUrl('/agenda');
      },
      error: (err) => {
        this.snackBar.openFromComponent(AlertComponent, {
          duration: 5000,
          data: {
            message: err.error.message,
          },
        });
      },
    });
  }

  public formatHour(event: Event) {
    const input = event.target as HTMLInputElement;
    let time = input.value.replace(/\D/g, '');

    this.formActivity.controls['time'].setValue(time);
  }

  public formatDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let date = input.value.replace(/\D/g, '');

    this.formActivity.controls['date'].setValue(date);
  }
}
