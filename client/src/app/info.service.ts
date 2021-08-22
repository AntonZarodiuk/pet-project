import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {
  private articles: object[] =[]

  constructor(
    private http: HttpClient,
  ) { }

  public getNews(callback: any) {
    this.http.get('https://newsapi.org/v2/everything?q=BMW&pageSize=100&language=en&sortBy=relevancy&apiKey=bcb7617efecd4de4b50fb29be845499f')
    .subscribe( (response: any) => {
      this.articles = response.articles;
      callback(this.articles);
    } )
  } 
  
}
