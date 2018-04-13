import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../../../../app.config";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {

  userID;
  @Input() user;

  constructor(private route: ActivatedRoute,
    private http: HttpClient) {
  }



  ngOnInit() {

  }

}
