import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable, Subject} from 'rxjs/Rx';

@Injectable()
export class ChatService {

  messages: Subject<any>;

  // Our constructor calls our wsService connect method
  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      })
  }

  // Our simplified interface for sending
  // messages back to our socket.io server
  sendMsg(data) {
    var  msg  = {
    data:data,
    authorization: localStorage.getItem('authentication')
    }
    this.messages.next(msg);
  }

}
