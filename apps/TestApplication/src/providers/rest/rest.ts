import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map, catchError } from 'rxjs/operators';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
  }

  private baseUrl = 'http://192.168.1.222:3000';

  public postUser(userID:number,aplicationID:number,deviceToken:string,newDeviceToken:string){
    var updatedUser = {
      "userID": userID,
      "aplicationID":aplicationID,
      "deviceToken": newDeviceToken
    };
    console.log(JSON.stringify(updatedUser));
    
    return this.http.put(this.baseUrl + '/userAplications/' + userID + "/" + aplicationID + 
    "/" + deviceToken,updatedUser);

  }

  private extractData(res: Response) {
    
    let body = res;
    return body || { };
  }
  
  private handleError (error: Response | any) {
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
