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
    let body = JSON.stringify(lightGrid);
    let options = { headers: this.headers}
    this.http.post(this.url, body, options)
      .subscribe( 
        (res:Response) => res.json(), 
        (err) => this.handleError(err) );

    
  }

  handleError(err) {
    console.log(err) 
  }

}
