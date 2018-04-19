import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder ,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss']
})
export class AdminFormComponent implements OnInit {
  firstname =new FormControl('', [Validators.required]);
  lastname =new FormControl('', [Validators.required]);
  email=new FormControl('', [Validators.required]);
  password=new FormControl('', [Validators.required]);
  confirmpassword=new FormControl('', [Validators.required]);
  form: FormGroup = this.fb.group({
    firstname:this.firstname,
    lastname:this.lastname,
    email:this.email,
    password:this.password,
    confirmpassword:this.confirmpassword
   })
  constructor(private router: Router,private http: HttpClient, private fb: FormBuilder,
  private dialogRef: MatDialogRef<AdminFormComponent>,@Inject(MAT_DIALOG_DATA) data:any) { }

  ngOnInit() {
  }
  save() {
   
    this.dialogRef.close(this.form.value);
}
close() {
  this.dialogRef.close();
}

}
