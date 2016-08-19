import {Http, Response, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });


  api_url: string = 'http://localhost:3000';

  constructor(private http: Http) {}

  private getJson(response: Response) {
    console.log('response is ', response);
    return response.json();
  }

  private checkForError(response: Response): Response {
    if (response.status >= 200  && response.status < 300) {
      return response;
    }else {
      var error = new Error(response.statusText);
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }

  // private handleError (error: any) {
  //   console.log('got an error');
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }

  // private extractData(res: Response) {
  //   let body = res.json();
  //   console.log("BODY", body.data);
  //   return body.data || { };
  // }

  post(path: string, body): Observable<any> {
    return this.http.post(`${path}`, JSON.stringify(body), {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(res => {
        return res;
       });
  }

  get(path: string): Observable<any> {
    return this.http.get(`${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(res => {
        return res;
      });

  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.api_url}${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  put(path: string, body): Observable<any> {
    return this.http.put(`${this.api_url}/${path}`, body);
  }
}
