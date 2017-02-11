import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { environment } from '../../environments/environment'

@Injectable()
export class ServerService {

  constructor(private _http: Http) { }

  getServer(): Observable<string> {
      // if (!environment.production) {
      //   return ''
      // }

      let url = './api/env.php'
      return this._http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
  }

  private extractData(res: Response) : string {
    let server = 'http://localhost:3000'
    try {
      server = res.json().ApiServer
    }
    catch (err) {
    }
    return server
  }

  private handleError(eror: Response | any) {
    let msg = "Server Error"
    return Observable.throw(msg)
  }
}
