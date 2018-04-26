import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddTagsComponent} from '../../admin/add-tags/add-tags.component';
import {DeleteTagsComponent} from '../../admin/delete-tags/delete-tags.component';
import {HttpClient} from '@angular/common/http';
import {Headers} from '@angular/http';
import {appConfig} from "../../../../app.config";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  apiUrlHTML = appConfig.apiUrl;

  isActive: boolean = false;
  showMenu: string = '';
  pushRightClass: string = 'push-right';
  sidenavWidth = 4;
  isClick:boolean=false;

  constructor(public router: Router, private dialog: MatDialog, private httpClient: HttpClient) {

  }


  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  sidebarOnClick() {
    if(!this.isClick){
    this.sidenavWidth = 15;
    this.isClick=true;
    }else{
      this.sidenavWidth = 4;
      this.isClick=false;
    }

  }
increase(){
  this.sidenavWidth = 15;
}
  decrease() {
    this.sidenavWidth = 4;
  }

  openAddTagDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(AddTagsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => this.addTag(val)
    );
  }

  openDeleteTagDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;


    const dialogRef = this.dialog.open(DeleteTagsComponent, dialogConfig);

  }

  addTag(val) {
    if (val) {

      let autorization = {Authorization: localStorage.getItem('authentication')};
      let postedTag = {
        name: val.tag
      }
      this.httpClient.post(appConfig.apiUrl + '/tags', postedTag, {headers: autorization}).subscribe(
        (res: any) => {

          new Noty({
            type: 'success',
            text: res.msg,
            timeout: 3000,
            progressBar: true
          }).show();
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
