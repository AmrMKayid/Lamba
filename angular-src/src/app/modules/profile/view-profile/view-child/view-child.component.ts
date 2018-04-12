import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { appConfig } from "../../../../app.config";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.scss']
})
export class ViewChildComponent implements OnInit {

  @Input() childID;
  child;
  isInitialized = false;
  constructor(private route: ActivatedRoute,
    private http: HttpClient) {
  }

  getChildByID(userID) {
    this.http.get(appConfig.apiUrl + '/user/getChild/' + userID)
      .subscribe((res: any) => {
        this.child = res.data;
        this.isInitialized = true;
      });
  }

  ngOnInit() {
    this.getChildByID(this.childID);
  }

}
