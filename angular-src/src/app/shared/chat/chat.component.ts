import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msgToServer;

  serverMsg;
  reciever_id : string;
  sub; 
  constructor(private chat: ChatService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

   this.sub =  this.route.params.subscribe(params => {
        this.chat.initSocket();
        this.reciever_id =  params['id'];
        this.chat.onMessage().subscribe(msg => {
           var msgObj = JSON.parse(msg);
            if(msgObj.sender_id == this.reciever_id)
            {
              this.serverMsg = msg;
            }
        });
    });
  

    // this.sendMessage("Test Message");
  }

  sendMessage(msg) {
    this.chat.send(msg, this.reciever_id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}


//5ad5d1f704720812d763ca7b
