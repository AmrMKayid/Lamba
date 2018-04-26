import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(private http: HttpClient,
              private notificationservice: NotificationService) {
  }

  notifications: Array<Object>;
  p: any;

  ngOnInit() {

    var test = {
      title: "My not title",
      description: "Reminder: You have an event coming up this weekend: Reminder: You have an event coming up this weekend: ",
      url: "fgasf/sadfs",
      recieving_user_id: "5ad872baea96344df83ab4f9"
    };
    this.notificationservice.CreateNotification(test);

    this.notificationservice.getMyNotifications().subscribe((res: any) => {
      if (res.err != null) {
        /*generate error*/
      }

  		this.notifications = res.data.reverse();
  	});

  }

}
