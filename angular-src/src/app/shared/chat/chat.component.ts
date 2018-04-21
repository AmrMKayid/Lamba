import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {ActivatedRoute} from '@angular/router';
import './js/jquery.emojipicker.js';
import './js/jquery.emojis.js';
import {AuthService} from "../../services/auth.service";
import {appConfig} from "../../app.config";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss',
    './css/jquery.emojipicker.css',
    './css/jquery.emojipicker.g.css']
})
export class ChatComponent implements OnInit {

  apiUrlHTML = appConfig.apiUrl;

  msgToServer;

  chats = [];
  currentChat;
  reciever_id: string;
  sub;

  constructor(private chat: ChatService,
              private route: ActivatedRoute,
              private auth: AuthService) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      this.initChats();
      this.chat.initSocket();
      if (params['id']) {
        this.chat.getUserInfo(params['id']).subscribe((res: any) => {
          if (res.error) {
            return;
          }
          var found = false;
          for (var i = 0; i < this.chats.length; i++) {
            if (this.chats[i].chat._id == res.data._id) {
              found = true;
              break;
            }
          }
          if (!found) {
            var chatObj = {
              chat: res.data,
              messages: []
            };
            this.chats.push(chatObj);
            this.currentChat = chatObj;
          }

        });
      }


      this.chat.onMessage().subscribe(msg => {
        var msgObj = JSON.parse(msg);
        var found = false;
        console.log(msgObj);
        for (var i = 0; i < this.chats.length; i++) {
          if (this.chats[i].chat._id == msgObj.from) {
            found = true;
            this.chats[i].messages.push(msgObj);
          }
        }

        if (!found) {

          this.chat.getUserInfo(msgObj.from).subscribe((res: any) => {

            if (res.error) {
              return;
            }

            var chatObj = {
              chat: res.data,
              messages: []
            };
            chatObj.messages.push(msgObj)
            this.chats.push(chatObj);
            if (!this.currentChat) {
              this.currentChat = chatObj;
            }
          });

        }
      });
    });


    // this.sendMessage("Test Message");
  }

  sendMessage(msg) {
    if (this.currentChat) {
      var message = {text: msg};
      this.currentChat.messages.push(message);
      this.chat.send(msg, this.currentChat.chat._id);
      this.msgToServer = "";
    }
  }

  /**
   * gets all the chats from the server and their corresponding messages
   */
  initChats() {

    return this.chat.getAllChats().subscribe((res: any) => {
      if (res.err != null) {
        /*generate error*/
      }

      var chats = res.data;
      for (var i = 0; i < chats.length; i++) {
        this.appendChat(chats[i])
      }
    });
  }

  appendChat(chat) {

    this.chat.getChat(chat._id).subscribe((res: any) => {
      if (res.err != null) {
        /*generate error*/
      }

      var chatObj = {
        chat: chat,
        messages: res.data
      };
      for (var i = 0; i < this.chats.length; i++) {
        if (this.chats[i].chat._id == chatObj.chat._id) {
          var index = this.chats.indexOf(this.chats[i]);
          if (index > -1) {
            this.chats.splice(index, 1);
          }
        }
      }
      this.chats.push(chatObj);
      console.log(this.chats);
      this.currentChat = this.chats[0];
    });
  }

  changeCurrentChat(chat) {
    this.currentChat = chat;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}


//5ad5d1f704720812d763ca7b
