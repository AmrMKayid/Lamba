import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NonAuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('authentication')) {
      new Noty({
        type: 'warning',
        text: 'You cannot access this page!',
        timeout: 3000,
        progressBar: true
      }).show();
      this.router.navigate(['/']);
      return false;
    }
    else {
      return true;
    }
  }


  constructor(private router: Router) {

  }
}
