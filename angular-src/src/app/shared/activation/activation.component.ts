import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  renderType: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Intercept URL query string and render according to it.
  ngOnInit() {
    let ENUM = ['error', 'expired', 'user', 'invalid', 'success', 'already'];
    this.route.queryParams.subscribe(params => {
      this.renderType = params['mode'];
      if (!this.renderType || !ENUM.includes(this.renderType)) {
        new Noty({
          type: 'error',
          text: 'Something went wrong, please request a new actiavtion link by logging back in',
          progressBar: true,
          timeout: 3000
        }).show();
        this.router.navigate(['/']);
      }
    });

  }

}
