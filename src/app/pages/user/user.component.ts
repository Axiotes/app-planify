import { Component, OnInit } from '@angular/core';
import { ArrowLeft, LucideAngularModule, User } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ApiRequestsService } from '../../services/api-requests.service';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../components/alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
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
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService
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

  public logout(): void {
    this.localStorageService.logout();
    this.router.navigateByUrl('/login');
  }
}
