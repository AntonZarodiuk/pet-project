import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { state, trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('hide => show', [
        animate('1s')
      ]),
      transition('show => hide', [
        animate('0.6s')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  index: number = Math.floor(16*Math.random());
  images: object[] = [];
  articles: any;
  constructor(
    private infoService: InfoService
    ) { };
    isShowed: boolean = false;

  ngOnInit(): void {
    (this.infoService.getNews(this.news.bind(this))).then(((isLoaded: any) => this.isShowed = isLoaded));
  };

  public changeArticles() {  
    this.isShowed = false;
    setTimeout(() => {
      this.index = Math.floor((this.articles.length - 4)*Math.random());
      this.isShowed = true;
    }, 700)
  }

  private news(articleArr: object[]) {
    this.articles = articleArr;
    articleArr.forEach( (element: any) => {
      this.images.push(element.media[0]?.["media-metadata"]?.[1].url)
    })
  }

}
