import { Component, OnInit } from '@angular/core';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ApiRequestsService } from '../../services/api-requests.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  public user: LucideIconData = User;
  public back: LucideIconData = ArrowLeft;

  public email: string = '';

  constructor(
    private apiRequestsService: ApiRequestsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiRequestsService.userInfo().subscribe({
      next: (res) => {
        this.email = res.email;
      },
      error: (err) => {
        this.snackBar.openFromComponent(AlertComponent, {
          duration: 5000,
          data: {
            message: err.error.message,
          },
        });

        this.router.navigateByUrl('/agenda');
      },
    });
  }
}
