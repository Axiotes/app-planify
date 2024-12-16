import { Injectable } from '@angular/core';
import { LoginValue } from '../../types/login-value.type';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../types/api-response.type';
import { Observable } from 'rxjs';
import { RegisterValue } from '../../types/register-value.type';
import { Activity } from '../../types/activity.type';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestsService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public login(loginValue: LoginValue): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.baseUrl}/user/login`,
      loginValue
    );
  }

  public register(registerValue: RegisterValue): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.baseUrl}/user/register`,
      registerValue
    );
  }

  public userInfo(): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(`${this.baseUrl}/user/infos`);
  }

  public verifyUser(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/user/verify`);
  }

  public newActivity(newActivity: Activity): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.baseUrl}/activities/new`,
      newActivity
    );
  }

  public activity(
    id: string
  ): Observable<{ message: string; activity: Activity }> {
    return this.http.get<{ message: string; activity: Activity }>(
      `${this.baseUrl}/activities/${id}`
    );
  }

  public updateActivity(
    activity: Activity,
    id: string
  ): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(
      `${this.baseUrl}/activities/update/${id}`,
      activity
    );
  }

  public activities(
    date: string
  ): Observable<{ message: string; activities: Activity[] }> {
    return this.http.get<{ message: string; activities: Activity[] }>(
      `${this.baseUrl}/activities/date/${date}`
    );
  }

  public doneActivity(done: {
    id?: number;
    value: boolean;
  }): Observable<ApiResponse> {
    return this.http.patch<ApiResponse>(
      `${this.baseUrl}/activities/done/${done.id}`,
      { done: done.value }
    );
  }
}
