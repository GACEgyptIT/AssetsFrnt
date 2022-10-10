import {Component, Input, OnInit, AfterViewInit, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';
import * as Chartist from 'chartist';
import { Router } from '@angular/router';

export interface LegendItemMonth {
  title: string;
  imageClass: string;
}

export enum ChartTypeMonth {
  Pie,
  Line,
  Bar
}

@Component({
  selector: 'lbd-chartMonth',
  templateUrl: './lbd-chartMonth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LbdChartMonthComponent implements OnInit, OnChanges   {
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
  public chartTypeMonth: ChartTypeMonth;

  @Input()
  public chartDataForMonths: any;

  @Input()
  public chartOptions: any;

  @Input()
  public chartResponsive: any[];

  @Input()
  public footerIconClass: string;

  @Input()
  public footerText: string;

  @Input()
  public legendItemsMonths: LegendItemMonth[];

  @Input()
  public withHr: boolean;

  public chartId: string;

  constructor(  private router: Router) {
  }

  public ngOnInit(): void {
   
    this.chartId = `lbd-chartMonth-${LbdChartMonthComponent.currentId++}`;
    ;
  }

  public ngAfterViewInit(): void {

        new Chartist.Bar(`#${this.chartId}`, this.chartDataForMonths, this.chartOptions, this.chartResponsive);
        ;
   }

  ngOnChanges(changes: SimpleChanges) {

    new Chartist.Bar(`#${this.chartId}`, this.chartDataForMonths, this.chartOptions, this.chartResponsive );
    ;
  }
}
