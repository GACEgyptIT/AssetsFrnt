import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
import * as Chartist from 'chartist';
import { Router } from '@angular/router';

export interface LegendItem {
  title: string;
  imageClass: string;
}

export enum ChartType {
  Pie,
  Line,
  Bar
}

export enum ChartBy {
  Months,
  Branchs
}

@Component({
  selector: 'lbd-chart',
  templateUrl: './lbd-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartComponent implements OnInit, OnChanges   {
  debugger;
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  @Input()
  public chartBy: ChartBy;

  @Input()
  public chartType: ChartType;

  @Input()
  public chartDataForMonths: any;

  @Input()
  public chartDataForBranchs: any;


  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItems: LegendItem[];

  @Input()
  public withHr: boolean;

  public chartId: string;

  constructor(  private router: Router) {
  }

  public ngOnInit(): void {
   // debugger;
    this.chartId = `lbd-chart-${LbdChartComponent.currentId++}`;
  //  this.chartBy = 1;
  }

  public ngAfterViewInit(): void {

    // if(this.chartBy == ChartBy.Months){
    //   new Chartist.Bar(`#${this.chartId}`, this.chartDataForMonths, this.chartOptions, this.chartResponsive);
     
    // } else if(this.chartBy == ChartBy.Branchs){
    //   new Chartist.Bar(`#${this.chartId}`, this.chartDataForBranchs, this.chartOptions, this.chartResponsive);
       
    // }
      //  new Chartist.Bar(`#${this.chartId}`, this.chartDataForBranchs, this.chartOptions, this.chartResponsive);
        new Chartist.Bar(`#${this.chartId}`, this.chartDataForMonths, this.chartOptions, this.chartResponsive);

     debugger;
   }

  ngOnChanges(changes: SimpleChanges) {
    new Chartist.Bar(`#${this.chartId}`, this.chartDataForMonths, this.chartOptions, this.chartResponsive );
   //  new Chartist.Bar(`#${this.chartId}`, this.chartDataForBranchs, this.chartOptions, this.chartResponsive);   
     
    // this.chartBy == ChartBy.Months;
    // this.chartBy == ChartBy.Branchs;
    // if(this.chartBy == ChartBy.Months){
    // debugger;
    //     new Chartist.Bar(`#${this.chartId}`, this.chartDataForMonths, this.chartOptions, this.chartResponsive );
      
    // } else if(this.chartBy == ChartBy.Branchs){
    //   debugger;
    //   new Chartist.Bar(`#${this.chartId}`, this.chartDataForBranchs, this.chartOptions, this.chartResponsive);   
    // }

 
  }
}
