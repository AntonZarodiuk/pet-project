import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

import { ViewChild } from '@angular/core';
import { Color, BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  chartData = new Map(
    Object.entries({
      '2021-01-01': { 'price': '145' } as object,
      '2021-01-02': { 'price': '147' } as object,
      '2021-01-03': { 'price': '149' } as object
    })
  )

  minPrices: number[] = [];
  maxPrices: number[] = [];
  averagePrices: number[] = [];
  labels: string[] = [];


  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartLabels: Label[] = [];
  public lineChartType: ChartType = 'line';

  public lineChartLegend = true;
  public lineChartData: ChartDataSets[] = [
    { data: this.minPrices, label: 'Min price' },
    { data: this.maxPrices, label: 'Max price' },
    { data: this.averagePrices, label: 'Avarage price' },
  ]

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective | undefined;

  constructor(
    private http: HttpClient
  ) { }

  user = JSON.parse(localStorage.getItem('user') as string)
  login = this.user.login

  ngOnInit(): void {
    this.getDataset();
  }

  dataHandler() {
    this.labels = Array.from(this.chartData.keys());
    let temp: any = Array.from(this.chartData.values());
    console.log("temp: ", temp);
    this.minPrices = temp.map( (item: any) => {return item.minPrice});
    this.maxPrices = temp.map( (item: any) => {return item.maxPrice});
    this.averagePrices = temp.map( (item: any) => {return item.averagePrice});
    console.log(this.labels);
    console.log(this.minPrices);
    console.log(this.maxPrices);
    console.log(this.averagePrices);
    this.lineChartData = [
      { data: this.minPrices, label: 'Min price' },
      { data: this.maxPrices, label: 'Max price' },
      { data: this.averagePrices, label: 'Avarage price' },
    ]
    this.lineChartLabels = this.labels;
    this.chart?.update();
  }

  getDataset() {
    this.http.get('account/carlist/bmw-x5')
      .subscribe((response: any) => {
        this.chartData = new Map<string, object>(Object.entries(response.prices));
        console.log(response);
        this.dataHandler();
      });
  }

}
