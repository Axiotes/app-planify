import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { LucideIconData } from 'lucide-angular/icons/types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
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
}
