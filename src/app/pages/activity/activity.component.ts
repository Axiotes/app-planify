import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ApiRequestsService } from '../../services/api-requests.service';
import { AlertComponent } from '../../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimePipe } from '../../pipes/time.pipe';
import { DatePipe } from '../../pipes/date.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule, TimePipe, DatePipe],
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
  public routeType!: 'edit' | 'new';

  public buttonLabel: string = 'Salvar atividade';
  public titlePage: string = 'Adicionar atividade:';

  private activityId!: string | null;

  constructor(
    private apiRequestService: ApiRequestsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const type: { [key: string]: () => void } = {
      new: () => {
        this.setDate();
      },
      edit: () => {
        this.getActivity();
        this.buttonLabel = 'Salvar alteração';
        this.titlePage = 'Atividade:';
      },
    };

    this.activatedRoute.data.subscribe((data) => {
      this.routeType = data['type'];
      const func = type[this.routeType];
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
    if (this.routeType === 'new') {
      this.saveNewActivity();
      return;
    }

    this.updateActivity();
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

  public navigate(route: string) {
    this.dialog
      .open(ModalComponent, {
        width: '400px',
        data: {
          description: 'Alterações não salvas serão perdidas',
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === 'delete') {
          this.router.navigateByUrl(route);
        }
      });
  }

  private setDate(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      let yearParam = params['year'];
      let monthParam = params['month'];
      let dayParam = params['day'];

      let dates = '';

      if (!yearParam && !monthParam && !dayParam) {
        const currentYear = new Date().getFullYear();
        const currentMonth = (new Date().getMonth() + 1)
          .toString()
          .padStart(2, '0');
        const currentDay = new Date().getDate().toString().padStart(2, '0');

        dates = `${currentDay}${currentMonth}${currentYear}`;
        const formatDate = this.datePipe.transform(dates);

        this.formActivity.controls['date'].setValue(formatDate);

        return;
      }

      if (dayParam.length === 1) {
        dayParam = `0${dayParam}`;
      }

      if (monthParam.length === 1) {
        monthParam = `0${monthParam}`;
      }

      dates = `${dayParam}${monthParam}${yearParam}`;
      const formatDate = this.datePipe.transform(dates);

      this.formActivity.controls['date'].setValue(formatDate);
    });
  }

  private getActivity(): void {
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id');

    if (!this.activityId) {
      this.router.navigateByUrl('/agenda');
      return;
    }

    this.apiRequestService.activity(this.activityId).subscribe({
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
        this.snackBarMessage(err.error.message);
      },
    });
  }

  private saveNewActivity(): void {
    if (!this.formActivity.valid) {
      this.snackBarMessage('Os campos de título e data são obrigatórios');
      return;
    }

    if (this.formActivity.controls['priority'].value === '') {
      this.formActivity.controls['priority'].setValue(2);
    }

    this.apiRequestService.newActivity(this.formActivity.value).subscribe({
      next: (res) => {
        this.snackBarMessage(res.message, '/agenda');
      },
      error: (err) => {
        this.snackBarMessage(err.error.message);
      },
    });
  }

  private updateActivity(): void {
    if (!this.formActivity.valid || !this.activityId) {
      this.snackBarMessage('Os campos de título e data são obrigatórios');
      return;
    }

    this.apiRequestService
      .updateActivity(this.formActivity.value, this.activityId)
      .subscribe({
        next: (res) => {
          this.snackBarMessage(res.message, '/agenda');
        },
        error: (err) => {
          this.snackBarMessage(err.error.message);
        },
      });
  }

  private snackBarMessage(message: string, navigate?: string): void {
    this.snackBar.openFromComponent(AlertComponent, {
      duration: 5000,
      data: {
        message: message,
      },
    });

    if (navigate) {
      this.router.navigateByUrl(navigate);
    }
  }
}
