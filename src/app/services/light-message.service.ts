import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/concatMap'

import { environment } from '../../environments/environment'

import { LightMessage } from '../models/light-message'
import { ServerService } from './server.service'

/*
export class LightMessage {
  _id: number,
  name: string
}
*/

@Injectable()
export class LightMessageService {

  private headers: Headers;
  private _currentUsername = "test-user";

  SIZE_X = 4
  SIZE_Y = 4

  constructor(private http: Http, private _serverService: ServerService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }


/*
use concatMap() to build a observer pipiline
http://stackoverflow.com/questions/40468311/angular-2-rxjs-nested-observables
http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html?#instance-method-concatMap
*/
  loadLatest() : Observable<LightMessage> {
    return this._serverService.getServer()
      .concatMap( url => this.loadLatestLightMessage(url))
  }

  private loadLatestLightMessage(server: string) : Observable<LightMessage> {
    let options = { headers: this.headers}
    let url = server + '/lights/latest'
    return this.http.get(url, options)
      .map( this.extractLatest )
      .catch( this.handleError)
  }
  
  private extractLatest(res: Response)  {
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
    return msg
  }


  save(message: LightMessage): Observable<string> {
    return this._serverService.getServer()
      .concatMap( url => this.saveLightMessage(url, message))
  }

  private saveLightMessage(server: string, message: LightMessage): Observable<string> {
    let options = { headers: this.headers}
    if (!message.username) {
      message.username = this._currentUsername
    }
    if (message._id) {
      // update existing message
      let url = server + '/lights/' + message._id; 
      return this.http.put(url, message, options) 
        .map( (res:Response) => message._id )
        .catch(this.handleError);  
      
    } else {
      // create new message
      let url = server + '/lights'  
      return this.http.post(url, message, options)
        .map(this.extractSave)
        .catch(this.handleError)
    }
  }

  private extractSave(res: Response) {
    // res.text = "lights/3895cq984n5w9esuz"
    // 3895.. is the id that we want
    let rx = /\w+\/(.*)/;
    let id = rx.exec(res.text());
    if (id.length >= 2) {
      return id[1]
    } else {
      return undefined
    }
  }


  handleError(err) {
    console.log(err) 
    let msg = "Server Error"
    return Observable.throw(msg)
  }

}
