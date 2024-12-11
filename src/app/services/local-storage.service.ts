import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getItem(): string | null {
    if (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined' &&
      typeof localStorage !== 'undefined'
    ) {
      const value = localStorage.getItem('token');
      return value ? (value as string) : null;
    }

    return null;
  }

  public addItem(token: string): void {
    localStorage.setItem('token', token);
  }

  public logout(): void {
    localStorage.clear();
  }
}
