import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userData = localStorage.getItem('user');

  if (userData) {
    try {
      const user = JSON.parse(userData);
      const expectedRole = route.data?.['expectedRole'];

      if (user.role && (!expectedRole || user.role === expectedRole)) {
        return true;
      }
    } catch (error) {
      console.error("Erreur lors de l'analyse des données utilisateur :", error);
    }
  }

  router.navigate(['/NotAuthorized']);
  return false;
};
