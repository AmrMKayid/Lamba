import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable, Subject} from 'rxjs/Rx';
import * as socketIo from 'socket.io-client';


@Injectable()
export class ChatService {

  private socket;
  private SERVER_URL = "http://127.0.0.1:3000";

  // Our constructor calls our wsService connect method
  constructor() {
    

  }
public initSocket()
{
    this.socket = socketIo(this.SERVER_URL);
    this.socket.emit('authorize', localStorage.getItem('authentication'));
}

 public send(message, reciever_id): void {
      var msg = {
        reciever_id: reciever_id,
        data: message,
        authorization:  localStorage.getItem('authentication')
      };
      this.socket.emit('message', JSON.stringify(msg));
  }

 public onMessage(): Observable<string> {
      return new Observable<string>(observer => {
            this.socket.on('message', (data: string) => observer.next(data));
      });
  }

  public disconnect()
  {
    this.socket.disconnect();
  }

}
