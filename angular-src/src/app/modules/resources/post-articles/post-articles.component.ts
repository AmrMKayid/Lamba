import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-post-articles',
  templateUrl: './post-articles.component.html',
  styleUrls: ['./post-articles.component.css']
})
export class PostArticlesComponent implements OnInit {

  public title: String;
  public editorContent: String;
  tagsInitialized: boolean;
  allTags: { value: string, id: string }[];
  selectedTags: any[];
  public toolbarOptions = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [
        { color: [].slice() },
        { background: [].slice() }
      ],
      [{ font: [].slice() }],
      [{ align: [].slice() }],
      ['clean'],
      ['video', 'link']
    ]
  };
  //TODO: Export it into a service.
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //GET THIS FROM POSTMAN'S LOGIN (won't work 3shan locally 3l database bta3ty)
      'Authorization': localStorage.getItem('authentication')
    })
  };
  constructor(private http: HttpClient, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.tagsInitialized = false;
    this.selectedTags = [];
    this.allTags = [];
    this.articlesService.getAllTags().subscribe(
      (res: any) => {
        res.data.forEach(element => {
          this.allTags.push({ value: element.name, id: element._id })
        });
        this.tagsInitialized = true;
      }, err => {
        alert(`Articles not retrieved: ${err.error.msg}`);
      }
    );
  }

  onSubmit() {
    //TODO: Beuatify these alerts! ,_,
    if (!this.title || !this.editorContent) {
      alert("Please fill in both the title and the content");
      return;
    }
    let article = {
      title: this.title,
      content: this.editorContent,
      tags: (this.selectedTags.map(tag => tag.id))
    };

    this.http.post('http://localhost:3000/api/articles', article, this.httpOptions)
      .pipe().subscribe(res => {
        this.title = "";
        this.editorContent = "";
        //TODO: Add a notification
      }, err => {
        let msg = err.error.msg;
        alert(`Article was not posted: ${msg}`);
      });
  }

}
