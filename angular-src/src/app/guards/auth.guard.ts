import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }
  //TODO: Role specific guards (and children)
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //TODO: Check expiration, reach out to server?
    if (localStorage.getItem('authentication')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
