import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

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
    console.log(this.loginForm.valid);
  }
}
