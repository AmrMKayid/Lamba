import {Component, OnInit, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss']
})
export class AddTagsComponent implements OnInit {

  tag = new FormControl('', [Validators.required]);
  form: FormGroup = this.fb.group({
    tag: this.tag
  });

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddTagsComponent>, @Inject(MAT_DIALOG_DATA) data: any) {


  }

  ngOnInit() {
  }

  save() {

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
