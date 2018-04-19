import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {AddTagsComponent} from '../../admin/add-tags/add-tags.component';
import {AdminFormComponent} from '../../admin/admin-form/admin-form.component';
import {HttpClient} from '@angular/common/http';
import { Headers} from '@angular/http';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  constructor(public router: Router,private dialog: MatDialog,private httpClient: HttpClient) { }

  ngOnInit() {
  }
  openAddAdminDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    
      
    const dialogRef = this.dialog.open(AdminFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      val =>  console.log(val)
  );
}
}
