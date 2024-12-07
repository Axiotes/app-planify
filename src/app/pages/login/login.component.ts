import { Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public typeInput: string = 'password';
  public eyePassword: LucideIconData = EyeOff;

  constructor(
    private apiRequestService: ApiRequestsService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public changeTypeInput(): void {
    if (this.typeInput === 'password') {
      this.typeInput = 'text';
      this.eyePassword = Eye;

      return;
    }

    this.typeInput = 'password';
    this.eyePassword = EyeOff;
  }

  public login(): void {
    if (!this.loginForm.valid) {
      console.log('Email ou senha inválido');
      return;
    }

    this.apiRequestService.login(this.loginForm.value).subscribe({
      next: (res) => {
        if (res.token) {
          this.localStorageService.addItem(res.token);
          this.router.navigateByUrl('/agenda');
        }
      },
      error: (err) => {
        console.log('Erro:', err.error.message);
      },
    });
  }
}
