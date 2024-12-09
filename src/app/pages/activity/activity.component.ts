import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  providers: [DatePipe],
})
export class ActivityComponent implements OnInit {
  public back: LucideIconData = ArrowLeft;
  public user: LucideIconData = User;

  public formActivity: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required, Validators.minLength(8)]),
    time: new FormControl(''),
    description: new FormControl(''),
    priority: new FormControl(''),
    alert: new FormControl(false),
  });

  constructor(
    private apiRequestService: ApiRequestsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const type: { [key: string]: () => void } = {
      new: () => {
        this.setDate();
        console.log('New');
      },
      edit: () => {
        this.getActivity();
        console.log('Edit');
      },
    };

    this.activatedRoute.data.subscribe((data) => {
      const routeType = data['type'];
      const func = type[routeType];
      func();
    });
  }

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

    if (this.formActivity.controls['priority'].value === '') {
      this.formActivity.controls['priority'].setValue(2);
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

  public formatHour(event: Event): void {
    const input = event.target as HTMLInputElement;
    let time = input.value.replace(/\D/g, '');

    this.formActivity.controls['time'].setValue(time);
  }

  public formatDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let date = input.value.replace(/\D/g, '');

    this.formActivity.controls['date'].setValue(date);
  }

  private setDate(): void {
    if (this.date === '') {
      const year = new Date().getFullYear();
      const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
      const day = new Date().getDate().toString().padStart(2, '0');

      const date = `${day}${month}${year}`;
      const formatDate = this.datePipe.transform(date);

      this.formActivity.controls['date'].setValue(formatDate);
    }
  }

  private getActivity(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigateByUrl('/agenda');
      return;
    }

    this.apiRequestService.activity(id).subscribe({
      next: (res) => {
        const activity = {
          title: res.activity.title,
          date: res.activity.date,
          time: res.activity.time,
          description: res.activity.description,
          priority: res.activity.priority,
          alert: res.activity.alert,
        };

        this.formActivity.setValue(activity);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
