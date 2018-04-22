import {Component, OnInit, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {appConfig} from "../../../../app.config";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.scss']
})
export class ViewParentComponent implements OnInit {

  userID;
  @Input() user;

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
  }

  ngOnInit() {
  }

  

}
