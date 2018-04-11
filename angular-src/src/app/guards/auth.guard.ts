import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ToasterService} from "angular5-toaster/src/toaster.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toaster: ToasterService) {
  }
  //TODO: Role specific guards (and children)
  canActivate(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //TODO: Check expiration, reach out to server?
    if (localStorage.getItem('authentication')) {
      return true;
    }
    this.toaster.pop({
      type: 'error',
      title: 'Error!',
      body: 'You need to login first!',
      timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
  }
}
