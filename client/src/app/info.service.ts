import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private articles: object[] = []

  constructor(
    private http: HttpClient,
  ) { }

  public getNews(callback: any) {
    return new Promise((resolve, reject) => {
      this.http.get('http://api.mediastack.com/v1/news?access_key=b0276f8acb25c2c3e7f5b07fcf2c8134&languages=en&keywords=car&sort=popularity&limit=100')
        .subscribe((response: any) => {
          this.articles = response.data;
          callback(this.articles);
          resolve(true);
        })
    })
  }

}
