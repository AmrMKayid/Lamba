import {Component, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {Router} from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  activitiesCount: number;
  limit: number; 
  curPage: number;
  lastPageNumber: number;


  activities: any[]; // Current activities
  pages: any[]; // Holds the numbers of the pages available to be picked


  constructor(private EventService: EventService,
              private router: Router) {
    this.limit = 20;
    this.curPage = 1;
    this.getActivityCount();
  }

  ngOnInit() {
  }

  getActivityCount() {
    console.log("Mayar...view.compoent.ts");
    this.EventService.activitiesCount().subscribe((data: any) => {
      this.activitiesCount = data.data;
      this.lastPageNumber = Math.ceil(this.activitiesCount / this.limit);
      this.loadPageBar(this.curPage);
    });
  }

  loadPage(page: number) {
    this.curPage = page;
    if (this.curPage == -1)
      this.curPage = this.lastPageNumber;
    this.loadPageBar(this.curPage);
    this.loadActivities();
  }

  loadPageBar(page: number) {
    // The number of the first page relative to current page
    let min: number = 1 > this.curPage - 3 ? 1 : this.curPage - 3;
    // The number of the last page relative to current page
    let max: number = this.lastPageNumber < this.curPage + 3 ? this.lastPageNumber : this.curPage + 3;


    this.pages = new Array<number>(max - min + 1);

    console.log(this.pages);
    console.log("min: " + min + " max: " + max);
    console.log("lastPageNumber: " + this.lastPageNumber + " curPage: " + this.curPage);

    for (let i = min, j: number = 0; i <= max; i++, j++) {
      this.pages[j] = i;
    }
    this.loadActivities();
  }


  loadActivities() {
    this.EventService.viewActivities(this.limit, this.curPage).subscribe((data: any) => {
      this.activities = data.data;
    });
  }

  goingActivities(activity) {
    this.EventService.goingActivities(activity).subscribe((data: any) => {
      for (var i = 0; i < this.activities.length; i++) {
        if (this.activities[i]._id == data._id) {
          this.activities[i].going_user_id = data.going_user_id;
        }
      }
    });
  }

  viewInfo(_id) {
    this.router.navigate(['/event/view/' + _id]);
  }
}