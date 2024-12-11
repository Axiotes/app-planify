import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';
import { ApiRequestsService } from '../../services/api-requests.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../../components/alert/alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  public typeInput: string = 'password';
  public eyePassword: LucideIconData = EyeOff;

  constructor(
    private apiRequestService: ApiRequestsService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.apiRequestService.verifyUser().subscribe({
      next: () => {
        this.router.navigateByUrl('/agenda');
      },
    });
  }

  public changeTypeInput(): void {
    if (this.typeInput === 'password') {
      this.typeInput = 'text';
      this.eyePassword = Eye;

      return;
    }

    this.typeInput = 'password';
    this.eyePassword = EyeOff;
  }

  public register(): void {
    if (!this.registerForm.controls['email'].valid) {
      this.snackBar.openFromComponent(AlertComponent, {
        duration: 5000,
        data: {
          message: 'Email inválido',
        },
      });

      return;
    }

    if (
      this.registerForm.controls['password'].value !==
      this.registerForm.controls['confirmPassword'].value
    ) {
      this.snackBar.openFromComponent(AlertComponent, {
        duration: 5000,
        data: {
          message: 'As senhas estão diferentes',
        },
      });

      return;
    }

    this.apiRequestService.register(this.registerForm.value).subscribe({
      next: (res) => {
        if (res.token) {
          this.localStorageService.addItem(res.token);
          this.router.navigateByUrl('/agenda');
        }
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
}
