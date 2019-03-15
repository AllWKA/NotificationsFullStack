import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
  }

  private baseUrl = 'http://192.168.201.77:3000';

  public postUser(userID: number, aplicationID: number, deviceToken: string, newDeviceToken: string) {

    var updatedUser = {
      "deviceToken": newDeviceToken
    };

    return this.http.put(this.baseUrl + '/userAplications/' + userID + "/" + aplicationID +
      "/" + deviceToken, updatedUser);

  }

  private extractData(res: Response) {

    let body = res;
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
