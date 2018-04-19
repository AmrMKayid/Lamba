import {Component, OnInit} from '@angular/core';
import {NgxCarousel} from "ngx-carousel";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {

  interests: Array<string> = [];
  chosenRole;

  constructor(private router: Router,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.chosenRole = params['role'];
    });
  }

  public carouselTile: NgxCarousel;

  ngOnInit() {

    this.carouselTile = {
      grid: {xs: 2, sm: 3, md: 3, lg: 3, all: 0},
      slide: 2,
      speed: 400,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      easing: 'ease'
    }
  }

  public carouselTileLoad(evt: any) {
  }

  newInterest(interest) {
    this.interests.push(interest)
  }

  Interests() {
    this.interests = Array.from(new Set(this.interests.map((itemInArray) => itemInArray)))
    console.log(this.interests)
    this.router.navigate(['register'], {queryParams: {role: this.chosenRole, interests: this.interests}});
  }

}
