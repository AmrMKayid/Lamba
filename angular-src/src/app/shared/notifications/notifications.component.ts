import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor( private http: HttpClient,
               private notificationservice: NotificationService) { }

	notifications : Array<Object>;
  ngOnInit() {
  
    var test = {
      title: "blbl",
      description: "blblbl",
      url: "fgasf/sadfs",
      recieving_user_id: "5ad5d13c04720812d763ca7a"
    };
    this.notificationservice.CreateNotification(test);
  	this.notificationservice.getMyNotifications().subscribe((res: any) => {
  		if(res.err != null)
  		{
  			/*generate error*/
  		}
  		
  		this.notifications = res.data;
 		console.log(this.notifications);
  	});
  
  }

}
