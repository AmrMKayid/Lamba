import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-un-verified-articles',
  templateUrl: './un-verified-articles.component.html',
  styleUrls: ['./un-verified-articles.component.css']
})
export class UnVerifiedArticlesComponent implements OnInit {
  public unVerifiedArticleList = [];
  constructor() { }

  ngOnInit() {

  }

}
