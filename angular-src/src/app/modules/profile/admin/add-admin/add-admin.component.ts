import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddTagsComponent} from '../../admin/add-tags/add-tags.component';
import {AdminFormComponent} from '../../admin/admin-form/admin-form.component';
import {HttpClient} from '@angular/common/http';
import {Headers} from '@angular/http';
import {routerTransition} from '../router.animations';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
  animations: [routerTransition()]
})
export class AddAdminComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  public admins = [];

  constructor(public router: Router, private dialog: MatDialog, private httpClient: HttpClient) {
  }

  ngOnInit() {
    let autorization = {Authorization: localStorage.getItem('authentication')};
    this.httpClient.get(appConfig.apiUrl + '/user/viewAdmins', {headers: autorization})
      .subscribe((res: any) => {
        this.admins = res.data;
      }, err => {
        new Noty({
          type: 'error',
          text: err.error ? err.error.msg : err.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });
  }

  openAddAdminDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(AdminFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => this.addAdmin(val)
    );
  }

  addAdmin(val) {
    if (val) {
      let autorization = {Authorization: localStorage.getItem('authentication')};
      let postedAdmin = {
        name: {
          firstName: val.firstname,
          lastName: val.lastname,
        },
        email: val.email,
        password: val.password,
        confirmPassword: val.confirmpassword
      }
      this.httpClient.post(appConfig.apiUrl + '/auth/admin', postedAdmin, {headers: autorization}).subscribe(
        (res: any) => {

          new Noty({
            type: 'success',
            text: res.msg,
            timeout: 3000,
            progressBar: true
          }).show();
          this.ngOnInit();
        },
        err => {
          new Noty({
            type: 'error',
            text: err.error ? err.error.msg : err.msg,
            timeout: 3000,
            progressBar: true
          }).show();
        });

    }

  }
}
