import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Chart, registerables } from 'node_modules/chart.js';
import { HttpClient } from '@angular/common/http';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  myChart: any;
  chartName: string = '';
  chartData = new Map(
    Object.entries({
      '2021-01-01': { 'price': '145' } as object,
      '2021-01-02': { 'price': '147' } as object,
      '2021-01-03': { 'price': '149' } as object
    })
  )


  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelperService,
    private elementRef: ElementRef,
    private http: HttpClient
  ) { }

  user = JSON.parse(localStorage.getItem('user') as string)
  login = this.user.login

  ngOnInit(): void {
    this.getDataset();
  }

  async getDataset() {
    this.http.get('account/carlist/bmw-x5')
      .subscribe(async (response: any) => {
        this.chartData = new Map<string, object>(Object.entries(response.prices));
        this.chartName = await response.model;
        this.renderChart(this.chartData);
      });
  }

  renderChart(data: Map<string, object>) {
    let arr = Array.from(data.values());
    let minPrices: number[] = [];
    let maxPrices: number[] = [];
    let averagePrices: number[] = [];
    arr.forEach((item: any) => {
      minPrices.push(item.minPrice);
      maxPrices.push(item.maxPrice);
      averagePrices.push(item.averagePrice);
    })
  
    this.myChart = new Chart('chart', {
      type: 'line',
      data: {
        labels: Array.from(data.keys()),
        datasets: [{
          label: "Avarage price",
          data: averagePrices,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)'
        },
        {
          label: "Min price",
          data: minPrices,
          backgroundColor: 'rgba(255, 192, 203, 0.2)',
          borderColor: 'rgba(255, 192, 203, 1)'
        },
        {
          label: "Max price",
          data: maxPrices,
          backgroundColor: 'rgba(145, 61, 136, 0.2)',
          borderColor: 'rgba(145, 61, 136, 1)'
        }]
      },
      options: {
        scales: {
          yAxes: {
            ticks: {

              callback: function (value: any) {
                return '$' + value;
              }
            }
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `${this.chartName} prices`
          }
        }
      },
    });
  }

}
