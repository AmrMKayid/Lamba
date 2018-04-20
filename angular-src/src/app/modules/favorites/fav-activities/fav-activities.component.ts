import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-activities',
  templateUrl: './fav-activities.component.html',
  styleUrls: ['./fav-activities.component.scss']
})
export class FavActivitiesComponent implements OnInit {

  activities: any[];
  activitiesInitialized: boolean;
  IMG_URL = 'http://localhost:3000/api/uploads/articlesThumbnails/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  constructor(private http: HttpClient,
    private router: Router) {
  }

  ngOnInit() {
    this.activities = [];
    this.activitiesInitialized = false;
    this.http.get('http://localhost:3000/api//user/favorites/activities', this.httpOptions)
      .pipe().subscribe(
        (res: any) => {
          this.activities = res.data.reverse();
          this.activitiesInitialized = true;
        }, err => {
          this.router.navigate(['/']);
          new Noty({
            type: 'error',
            text: `Activities could not be retrieved: ${err.error.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        }
      );
  }

  removeByKey(array, params) {
    array.some(function (item, index) {
      if (array[index][params.key] === params.value) {
        array.splice(index, 1);
        return true;
      }
      return false;
    });
    return array;
  };

  remove(id) {
    this.http.delete('http://localhost:3000/api/user/favorites/activities/' + id, this.httpOptions)
      .pipe().subscribe(
        (res: any) => {
          this.activities = this.removeByKey(this.activities, { key: '_id', value: id });
        }, err => {
          this.router.navigate(['/']);
          new Noty({
            type: 'error',
            text: `Item couldn't be removed from favorites : ${err.error.msg}`,
            timeout: 3000,
            progressBar: true
          }).show();
        }
      );
  }
}
