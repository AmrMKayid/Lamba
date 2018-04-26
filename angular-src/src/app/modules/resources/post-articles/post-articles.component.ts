import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {ArticlesService} from '../articles.service';
import {Router} from '@angular/router';

//////////////////////////////////////////////////////////////////////////
// This is used to add the 'img-fluid' class to uploaded images, no idea how it works  :D
import * as Quill from 'quill';
import * as Parchment from "parchment";
import {appConfig} from "../../../app.config";

const BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    return node;
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
    };
  }
}

var Image = Quill.import('formats/image');
Image.className = 'img-fluid';
Quill.register(Image, true);

//////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-post-articles',
  templateUrl: './post-articles.component.html',
  styleUrls: ['./post-articles.component.css']
})
export class PostArticlesComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  public title: String;
  public editorContent: String;
  tagsInitialized: boolean;
  allTags: { value: string, id: string }[];
  selectedTags: any[];
  picture_url: String;
  token: any;
  editor: any;
  public toolbarOptions = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{list: 'ordered'}, {list: 'bullet'}],
        [{script: 'sub'}, {script: 'super'}],
        [{indent: '-1'}, {indent: '+1'}],
        [{size: ['small', false, 'large', 'huge']}],
        [{header: [1, 2, 3, 4, 5, 6, false]}],
        [
          {color: [].slice()},
          {background: [].slice()}
        ],
        [{font: [].slice()}],
        [{align: [].slice()}],
        ['clean'],
        ['video', 'link', 'image']
      ],
      handlers: {
        'image': () => this.selectLocalImage()
      }

    }
  };


  public customStyle = {
    selectButton: {
      "color": "white",
    },
    layout: {
      "color": "red",
      "font-size": "10px",
    }
  };
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
    })
  };

  constructor(private http: HttpClient,
              private articlesService: ArticlesService,
              private router: Router) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('authentication');
    this.tagsInitialized = false;
    this.selectedTags = [];
    this.allTags = [];
    this.articlesService.getAllTags().subscribe(
      (res: any) => {
        res.data.forEach(element => {
          this.allTags.push({value: element.name, id: element._id})
        });
        this.tagsInitialized = true;
      }, err => {
        new Noty({
          type: 'error',
          text: `Something went wrong while retrieving the tags: ${err.error ? err.error.msg : err.msg}`,
          timeout: 3000,
          progressBar: true
        }).show();
      }
    );
  }

  onSubmit() {
    if (!this.title || !this.editorContent) {
      new Noty({
        type: 'warning',
        text: "Please fill in both the title and the content",
        timeout: 2500,
        progressBar: true
      }).show();
      return;
    }

    let article = {
      title: this.title,
      content: this.editorContent,
      tags: (this.selectedTags.map(tag => tag.id)),
      thumbnail_url: this.picture_url
    };

    this.http.post(appConfig.apiUrl + '/articles', article, this.httpOptions)
      .pipe().subscribe(res => {
      this.title = "";
      this.editorContent = "";
      this.router.navigate(['/resources']);
      new Noty({
        type: 'success',
        text: "Your post was successfully submitted, it will now await an admin's approval",
        timeout: 2500,
        progressBar: true
      }).show();
    }, err => {
      let msg = err.error.msg;
      new Noty({
        type: 'error',
        text: "Something went wrong while submitting your post: msg",
        timeout: 3000,
        progressBar: true
      }).show();
    });
  }

  onUploadFinished(event) {
    var response = JSON.parse(event.serverResponse._body);
    var status = event.serverResponse.status;

    if (status != 200) {
      new Noty({
        type: 'error',
        text: "Could not upload image",
        timeout: 2500,
        progressBar: true
      }).show();
      return;
    }

    this.picture_url = response.filename;
    new Noty({
      type: 'success',
      text: "Your image has been uploaded successfully!",
      timeout: 2500,
      progressBar: true
    }).show();
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  // Code to allow image insertions in the quill editor
  selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        this.saveToServer(file);
      } else {
        new Noty({
          type: 'warning',
          text: `You can only upload images`,
          timeout: 2000,
          progressBar: true
        }).show();
      }
    };
  }

  saveToServer(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', appConfig.apiUrl + '/articles/uploadArticleThumbnail', true);
    xhr.setRequestHeader('Authorization', this.token);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const url = JSON.parse(xhr.responseText).filename;
        this.insertToEditor(url);
      }
    };
    xhr.send(fd);
  }

  insertToEditor(url: string) {
    // push image url to rich editor.
    const range = this.editor.getSelection();
    this.editor.insertEmbed(range.index, 'image', appConfig.apiUrl + `/uploads/articlesThumbnails/${url}`);
  }

  //To be able to access the current editor's selection (index) while inserting images.
  editorCreated(quill) {
    this.editor = quill;
  }
}
