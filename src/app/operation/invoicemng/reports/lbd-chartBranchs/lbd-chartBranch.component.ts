import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
//import * as Chartist from 'app/operation/invoicemng/reports/lbd-chartMonths/node_modules/chartist';
import * as Chartist from 'chartist';
import { Router } from '@angular/router';
import { ChartType, LegendItem } from 'app/lbd/lbd-chart/lbd-chart.component';

export interface LegendItemBranch {
  title: string;
  imageClass: string;
}

export enum ChartTypeBranch {
  Pie,
  Line,
  Bar
}

// export enum ChartBy {
//   Months,
//   Branchs
// }

@Component({
  selector: 'lbd-chartBranch',
  templateUrl: './lbd-chartBranch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdChartBranchComponent implements OnInit, OnChanges   {
  ;
  static currentId = 1;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public chartClass: string;

  // @Input()
  // public chartBy: ChartBy;

  @Input()
  public chartTypeBranch: ChartTypeBranch;

  // @Input()
  // public chartDataForMonths: any;

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
  public legendItemsBranchs: LegendItemBranch[];

  @Input()
  public withHr: boolean;

  public chartId: string;

  constructor(  private router: Router) {
  }

  public ngOnInit(): void {
   // ;
   this.chartId = `lbd-chartBranch-${LbdChartBranchComponent.currentId++}`;

  }

  public ngAfterViewInit(): void {

       new Chartist.Bar(`#${this.chartId}`, this.chartDataForBranchs, this.chartOptions, this.chartResponsive);

        ;
   }

  ngOnChanges(changes: SimpleChanges) {
   
       new Chartist.Bar(`#${this.chartId}`, this.chartDataForBranchs, this.chartOptions, this.chartResponsive);   
      ; 

  }
}
