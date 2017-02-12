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
      .map(this.extractData)
      .catch(this.handleError)
  }

  private extractData(res: Response) : string {
    let server = undefined
    try {
      console.log("a0", server)
      server = res.json().ApiServer
      console.log("a1", server)
      this._cloudServer = server
      console.log("a2", server)
    }
    catch (err) {
    }
    console.log("#### server:", server)
    console.log("#### this:", this)
    return server
  }

  private handleError(eror: Response | any) {
    let msg = "Server Error"
    return Observable.throw(msg)
  }
}
