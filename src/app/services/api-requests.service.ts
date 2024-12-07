import { Injectable } from '@angular/core';
import { LoginValue } from '../../types/login-value.type';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../types/login-response.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public login(loginValue: LoginValue): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/user/login`,
      loginValue
    );
  }
}
