import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response,Headers, RequestOptions}          from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Video } from '../../models/video';

@Injectable()
export class DataService {

  private dataUrl = "assets/raw/data.json"; 
  constructor (private http: Http) {}
  
  get(): Observable<Video[]> {
     return this.http.get(this.dataUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  add(video){
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let data = JSON.stringify(video);

    return this.http.post(this.dataUrl, data, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  remove(){

  }
  
  private extractData(res: Response) {
    let body = res.json();
    console.log(body); 
    return body.data || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}