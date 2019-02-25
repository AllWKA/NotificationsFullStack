import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NewsServiceProvider {
API: any = 'http://localhost:40000/api/newss';
  constructor(public http: HttpClient) {
    console.log('Hello NewsServiceProvider Provider');
  }

  getNews() {
    return this.http.get(this.API);
  }

  PostNews(newNews: any) {
    return this.http.post(this.API + '/api/newss', newNews)

  }
}
