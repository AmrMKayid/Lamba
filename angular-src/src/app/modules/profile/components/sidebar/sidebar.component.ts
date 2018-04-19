import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddTagsComponent} from '../../admin/add-tags/add-tags.component';
import {DeleteTagsComponent} from '../../admin/delete-tags/delete-tags.component';
import {HttpClient} from '@angular/common/http';
import { Headers} from '@angular/http';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isActive: boolean = false;
  showMenu: string = '';
  pushRightClass: string = 'push-right';
  sidenavWidth = 4;


  constructor(private translate: TranslateService, public router: Router,private dialog: MatDialog,private httpClient: HttpClient,
    ) {
 
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

 

  increase() {
    this.sidenavWidth = 15;
    console.log("increase sidenav width");
  }

  decrease() {
    this.sidenavWidth = 4;
    console.log("decrease sidenav width");
  }
  openAddTagDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
      
    const dialogRef = this.dialog.open(AddTagsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val =>  this.addTag(val)
  );
}
openDeleteTagDialog() {

  const dialogConfig = new MatDialogConfig();

  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  
    
  const dialogRef = this.dialog.open(DeleteTagsComponent, dialogConfig);

}
 addTag(val){
   if(val){
   
   let autorization = {Authorization: localStorage.getItem('authentication')};
   let postedTag={
     name:val.tag
   }
   this.httpClient.post('http://localhost:3000/api/tags',postedTag,{headers: autorization} ).subscribe(
      (res: any) => {

        new Noty({
          type: 'success',
          text: res.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      },
      err=> {
        console.log(err)
        new Noty({
          type: 'error',
          text: err.error.msg,
          timeout: 3000,
          progressBar: true
        }).show();
      });

 }
 }
deleteTag(){

}
}
