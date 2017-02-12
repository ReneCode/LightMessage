import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { environment } from '../../environments/environment'

@Injectable()
export class ServerService {
  _cloudServer = undefined

  constructor(private _http: Http) { }

  getServer(): Observable<string> {
      if (environment.api_server) {
        return Observable.create( (observer) => {
          observer.next(environment.api_server)
        })
      }
      else {
        return this.getServerFromCloud()
      }
  }

  getServerFromCloud(): Observable<string> {
    // get URL from the cloud-server
    if (this._cloudServer) {
      // already queried
      return Observable.create( (observer) => {
        observer.next(this._cloudServer)
      })
    }

    // query the cloud-server
    let url = './api/env.php'
    return this._http.get(url)
      .map( res => this.extractData(res) )
      .catch(this.handleError)
  }

  private extractData(res: Response) : string {
    let server = undefined
    try {
      server = res.json().ApiServer
      this._cloudServer = server
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
