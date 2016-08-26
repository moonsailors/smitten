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

  constructor(private http: Http) {}

  private getJson(response: Response) {
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
    return this.http.delete(`${path}`, {headers: this.headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  put(path: string, body): Observable<any> {
    return this.http.put(`${path}`, body);
  }
}
