import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
// title;
public content = `<h3>I am Example content</h3>`;
// tags;
  constructor() { }

  ngOnInit() {
  	console.log(this.content);
  }
  logChange($event: any) {
    console.log($event.html);
    this.content = $event.html;
  }

  logSelection($event: any) {
    //console.log($event);
  }

}
