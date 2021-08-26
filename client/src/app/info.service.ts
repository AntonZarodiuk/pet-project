import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private articles: object[] = []
  private source: string = "https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=t4B0ag4wWXyagqBUEnQJDzBXRb5ELldB";

  constructor(
    private http: HttpClient,
  ) { }

  public getNews(callback: any) {
    return new Promise((resolve, reject) => {
      this.http.get(this.source)
        .subscribe((response: any) => {
          this.articles = response.results;
          callback(this.articles);
          resolve(true);
        })
    })
  }

}
