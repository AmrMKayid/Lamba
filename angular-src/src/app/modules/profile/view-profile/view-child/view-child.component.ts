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

  @Input() child;
  isInitialized = false;
  constructor(private route: ActivatedRoute,
    private http: HttpClient) {
  }

  ngOnInit() {
  }

}
