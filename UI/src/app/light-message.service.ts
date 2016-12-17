import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'


export class LightMessage {

}


@Injectable()
export class LightMessageService {

  private url = 'http://localhost:3000/lights';
  private headers: Headers;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
   }

  save(lightGrid, callback) { 
    let options = { headers: this.headers}
    let data = {
      username: 'rene',
      sequence: lightGrid
    }
    this.http.post(this.url, data, options)
      .subscribe( 
        (res:Response) => console.log(res), 
        (err) => this.handleError(err) );

    
  }

  handleError(err) {
    console.log(err) 
  }

}
