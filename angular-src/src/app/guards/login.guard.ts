import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('authentication')) {
      return true;
    }
    new Noty({
      type: 'error',
      text: 'You need to login first!',
      timeout: 3000,
      progressBar: true
    }).show();
    this.router.navigate(['/login']);
    return false;
  }

}
