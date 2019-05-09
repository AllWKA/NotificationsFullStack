import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ApiInventiaService {
  private urlApi = "192.168.1.125:3000";
  constructor(public http: HttpClient, private storage: Storage) { }

  public updateToken(token) {
    var result: any;
    this.http.get(this.urlApi + "/deviceTokens")
      .subscribe(res => {
        console.log("res---------->", res);
      });
    // this.storage.get('userID').then(id => {
    //   if (id == null) {
    //     this.http.post(this.urlApi + "/deviceTokens", { userIS: 12, applicationID: 1, token, active: 1, so: 'android' })
    //       .subscribe(res => {
    //         console.log("res---------->", res);
    //       });
    //   } else {

    //   }
    // })
    //   .catch(error => console.log(error))


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
