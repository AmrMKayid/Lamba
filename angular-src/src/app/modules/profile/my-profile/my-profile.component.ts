import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  role: string;
  isChild: boolean = false;
  isParent: boolean = false;
  isTeacher: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.getCurrentUser().role) {
      this.isChild = true;
    } else {
      this.role = this.authService.getCurrentUser().role;
      if (this.role === 'Parent') {
        this.isParent = true;
      } else if (this.role === 'Teacher') {
        this.isTeacher = true;
      } else if (this.role === 'Admin') {
        this.router.navigate(['admin', 'dashboard']);
      }
    }
  }

}
