import {Injectable} from '@angular/core';
import {WebsocketService} from './websocket.service';
import {Observable, Subject} from 'rxjs/Rx';
import * as socketIo from 'socket.io-client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {appConfig} from "../app.config";

@Injectable()
export class ChatService {

  private socket;
  private SERVER_URL = appConfig.apiUrl ==='api'? "" : "http://127.0.0.1:3000";

  // Our constructor calls our wsService connect method
  constructor(private http: HttpClient) {


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

  public getAllChats()
  {
    var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
      })
    };

    return this.http.get(appConfig.apiUrl + '/chat', httpOptions);
  }
  public getChat(user_id)
  {
    var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
      })
    };

    return this.http.get(appConfig.apiUrl + '/chat/' + user_id, httpOptions);
  }


  public getUserInfo(user_id)
  {
      return this.http.get(appConfig.apiUrl + '/user/getUserInfo/' + user_id);
  }



  public getChatCount()
  {
    var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('authentication')
      })
    };
    return this.http.get(appConfig.apiUrl + '/chat/unopened/count', httpOptions);
  }
}
