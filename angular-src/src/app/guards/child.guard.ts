import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ChildGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let currentUser = this.authService.getCurrentUser();
    if (!currentUser.role && currentUser.username) {
      new Noty({
        type: 'error',
        text: 'Your account cannot access this page!',
        timeout: 3000,
        progressBar: true
      }).show();
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
