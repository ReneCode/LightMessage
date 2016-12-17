import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'


export class LightMessage {

}


@Injectable()
export class LightMessageService {

  private url = 'http://localhost:3000/lights';
  private headers: Headers;
  private currentUsername = "test-user";


  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
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

  save(lightGrid, callback) { 
    let options = { headers: this.headers}
    let data = {
      username: this.currentUsername,
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
