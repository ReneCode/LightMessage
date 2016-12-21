import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'

import { environment } from '../environments/environment'

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
          let result = null;
          try {
            result = res.json();
          }
          catch (e) {
            result = null;
          }
          callback(result)
        },
        (err) => this.handleError(err) );
  }
  

  load(callback) {
    let options = { headers: this.headers}
    this.http.get(this.url, options)
      .subscribe( 
        (res:Response) =>  {
          let result = res.json();
          console.log(result);
          callback(result)
        },
        (err) => this.handleError(err) );
  }

  save(lightMessage, callback) { 
    let options = { headers: this.headers}
    if (lightMessage._id) {
      // update existing message
      let urlPut = this.url + '/' + lightMessage._id; 
      this.http.put(urlPut, lightMessage, options) 
        .subscribe( 
          (res:Response) => {
            callback(lightMessage._id)
          }, 
          (err) => this.handleError(err) );  
      
    } else {
      // create new message
      this.http.post(this.url, lightMessage, options)
        .subscribe( 
          (res:Response) => {
            // extract the id (last part of the retuned created-url)
            let rx = /\w+\/(.*)/;
            let id = rx.exec(res.text());
            console.log(id);
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
