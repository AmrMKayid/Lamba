import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, Router } from '@angular/router';
import './js/jquery.emojipicker.js';
import './js/jquery.emojis.js';
import { AuthService } from "../../services/auth.service";
import { appConfig } from "../../app.config";

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
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {

      this.chat.OpenChats().subscribe(res => { });
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
  }

  sendMessage(msg) {
    if (this.currentChat) {
      if (!msg) {
        return false;
      }
      var message = { text: msg };
      this.currentChat.messages.push(message);
      this.chat.send(msg, this.currentChat.chat._id);
      this.msgToServer = "";
      this.chat.SeenChat(this.currentChat.chat._id).subscribe(res => { });
      for (var i = 0; i < this.currentChat.messages.length; i++) {
        this.currentChat.messages[i].seen_at = Date.now();
      }

    }
  }

  /**
   * gets all the chats from the server and their corresponding messages
   */
  initChats() {

    return this.chat.getAllChats().subscribe(
      (res: any) => {

        var chats = res.data;
        for (var i = 0; i < chats.length; i++) {
          this.appendChat(chats[i])
        }
      }
      , (err) => {
        new Noty({
          type: 'error',
          text: 'Something went wrong',
          timeout: 3000,
          progressBar: true
        }).show();
        this.router.navigate(['/']);
      }
    );
  }

  appendChat(chat) {

    this.chat.getChat(chat._id).subscribe(
      (res: any) => {

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
        this.currentChat = this.chats[0];
      },
      (err) => {
        new Noty({
          type: 'error',
          text: 'Something went wrong',
          timeout: 3000,
          progressBar: true
        }).show();
        this.router.navigate(['/']);
      });
  }

  changeCurrentChat(chat) {
    this.currentChat = chat;
    this.chat.SeenChat(chat.chat._id).subscribe(res => { });
    for (var i = 0; i < chat.messages.length; i++) {
      chat.messages[i].seen_at = Date.now();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
