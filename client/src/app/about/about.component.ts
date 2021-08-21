import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoService } from '../info.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  url: string = 'https://api.github.com/users/'
  userName: string = 'AntonZarodiuk';
  response: any;

  constructor(
    private http: HttpClient,
    private infoService: InfoService
  ) { }

  search(url: string) {
    this.http.get(url).subscribe( res => {
      this.response = res;
    } )
  }

  ngOnInit(): void { 
    this.search(this.url + this.userName)
  }

}
