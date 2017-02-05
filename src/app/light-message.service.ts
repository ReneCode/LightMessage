import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '../environments/environment'

import { LightMessage } from './light-message'

/*
export class LightMessage {
  _id: number,
  name: string
}
*/

@Injectable()
export class LightMessageService {

  private url = environment.api_server + '/lights';
  private headers: Headers;
  private currentUsername = "test-user";

  SIZE_X = 4
  SIZE_Y = 4


  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }


  loadLatest(callback) {
    let options = { headers: this.headers}
    let urlLatest = this.url + '/latest'
    this.http.get(urlLatest, options)
      .subscribe( 
        (res:Response) =>  {
          let msg: LightMessage = null;
          try {
            msg = LightMessage.createFromJson( res.json() );
            if (msg.isValid()) {
            }
            else {
              msg = null;
            }
          }
          catch (e) {
            msg = null;
          }
          if (!msg) {
            msg = new LightMessage(this.SIZE_X, this.SIZE_Y);
          }
          callback(msg)
        },
        (err) => this.handleError(err) );
  }
  

  load(callback) {
    let options = { headers: this.headers}
    this.http.get(this.url, options)
      .subscribe( 
        (res:Response) =>  {
          let result = res.json();
          callback(result)
        },
        (err) => this.handleError(err) );
  }

  save(message, callback) { 
    let options = { headers: this.headers}
    if (!message.username) {
      message.username = 'admin'
    }
    if (message._id) {
      // update existing message
      let urlPut = this.url + '/' + message._id; 
      this.http.put(urlPut, message, options) 
        .subscribe( 
          (res:Response) => {
            callback(message._id)
          }, 
          (err) => this.handleError(err) );  
      
    } else {
      // create new message
      this.http.post(this.url, message, options)
        .subscribe( 
          (res:Response) => {
            // extract the id (last part of the retuned created-url)
            let rx = /\w+\/(.*)/;
            let id = rx.exec(res.text());
            if (id.length >= 2) {
              callback(id[1])
            } else {
              callback()
            }
          }, 
          (err) => this.handleError(err) );
    }
    
  }

  handleError(err) {
    console.log(err) 
  }

}
