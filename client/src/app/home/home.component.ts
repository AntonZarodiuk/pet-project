import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  index: number = Math.floor(96*Math.random());
  articles: any;
  constructor(
    private infoService: InfoService
    ) { };

  ngOnInit(): void {
    this.infoService.getNews(this.news.bind(this))
    
  };

  public changeArticles() {
    this.index = Math.floor((this.articles.length - 4)*Math.random());
  }

  private news(articleArr: object[]) {
    this.articles = articleArr;
  }

}
