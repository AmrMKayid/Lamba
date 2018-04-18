import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  msgToServer;

  serverMsg;

  constructor(private chat: ChatService) {
  }

  ngOnInit() {

    this.chat.messages.subscribe(msg => {
      this.serverMsg = msg;
    });

    // this.sendMessage("Test Message");
  }

  sendMessage(msg) {
    this.chat.sendMsg(msg);
  }

}
