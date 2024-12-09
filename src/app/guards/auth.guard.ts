import { inject } from '@angular/core';
import {
  CanActivateFn,
  GuardResult,
  MaybeAsync,
  Router,
} from '@angular/router';
import { ApiRequestsService } from '../services/api-requests.service';
import { catchError, map } from 'rxjs';

export const authGuard = (): CanActivateFn => {
  return (): MaybeAsync<GuardResult> => {
    const apiRequestService = inject(ApiRequestsService);
    const router = inject(Router);

    return apiRequestService.verifyUser().pipe(
      catchError(() => {
        return router.navigateByUrl('/login');
      }),
      map(() => {
        return true;
      })
    );
  };
};
