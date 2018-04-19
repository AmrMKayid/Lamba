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

  chats = [];
  messages = [];
  serverMsg;
  reciever_id : string;
  sub; 
  constructor(private chat: ChatService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

   this.sub =  this.route.params.subscribe(params => {


      this.chat.getAllChats().subscribe((res: any) => {
          if(res.err != null)
          {
            /*generate error*/
          }
          
          this.chats = res.data;
        });
         this.chat.getChat(params['id']).subscribe((res: any) => {
          if(res.err != null)
          {
            /*generate error*/
          }
          
          this.messages = res.data;
        });

        this.chat.initSocket();
        this.reciever_id =  params['id'];
        this.chat.onMessage().subscribe(msg => {
           var msgObj = JSON.parse(msg);
            console.log(msgObj);
            if(msgObj.from == this.reciever_id)
            {
              this.serverMsg = msgObj.text;
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
