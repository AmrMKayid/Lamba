import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  //TODO: Role specific guards (and children)
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //TODO: Check expiration, reach out to server?
    if (localStorage.getItem('authentication')) {
      let currentUser: any = this.authService.getCurrentUser();
      if (currentUser.role === 'Teacher') {
        if (currentUser.isVerified === true) {
          return true;
        } else {
          new Noty({
            type: 'error',
            text: 'You need be verified first to access the site!',
            timeout: 3000,
            progressBar: true
          }).show();
          this.router.navigate(['/']);
          return false;
        }
      } else {
        return true;
      }
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
