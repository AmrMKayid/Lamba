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

  /**
    * gets all the chats from the server and their corresponding messages
    */
  initChats()
  {
     
     this.chat.getAllChats().subscribe((res: any) => {
          if(res.err != null)
          {
            /*generate error*/
          }
          
          var chats = res.data;
          for(var i = 0; i < chats.length; i++)
          {
              this.appendChat(chats[i])
          }
        });
  }

  appendChat(chat)
  {
    var chat = chat;
    this.chat.getChat(chat._id).subscribe((res: any) => {
            if(res.err != null)
            {
              /*generate error*/
            }
            
            var chat = {
              chat: chat,
              messages: res.data
            };
            this.chats.push(chat);
      });

  }


  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}


//5ad5d1f704720812d763ca7b
