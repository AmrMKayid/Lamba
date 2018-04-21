import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-delete-tags',
  templateUrl: './delete-tags.component.html',
  styleUrls: ['./delete-tags.component.scss']
})
export class DeleteTagsComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;
  
  public tags = [];

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder,
              private dialogRef: MatDialogRef<DeleteTagsComponent>) {
  }

  ngOnInit() {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.http.get(appConfig.apiUrl + '/tags', {headers: autorization})
      .subscribe((res: any) => {
        this.tags = res.data;

      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }

  close() {
    this.dialogRef.close();
  }

  deleteTag(tagId) {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.http.delete(appConfig.apiUrl + '/tags/' + tagId, {headers: autorization})
      .subscribe((res: any) => {
        this.ngOnInit();
      }, err => {
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

  }
}
