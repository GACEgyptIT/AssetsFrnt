import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ChartType, LegendItem } from '../invoicemng/reports/lbd-chart/lbd-chart.component';
import { InvoicemngService } from '../invoicemng/service/invoicemng.service';
import { InvoicesModel } from 'app/shared/models/InvoicesModel';
import { LbdChartComponent } from '../invoicemng/reports/lbd-chart/lbd-chart.component';

@Component({
  selector: 'app-invoicedashboard',
  templateUrl: './invoicedashboard.component.html',
  styleUrls: ['./invoicedashboard.component.css']
})
export class InvoicedashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(LbdChartComponent) childcomp: LbdChartComponent;
  
  public records: any[] = [[10,10,10,10,10,10,10,10,10,10,10,10]]; 

  Invoices: InvoicesModel[] = [];

  public activityChartType: ChartType;
  public activityChartData: any;
  public activityChartOptions: any;
  public activityChartResponsive: any[];
  public activityChartLegendItems: LegendItem[];
  //, private comChart: LbdChartComponent
  constructor(private invSrv: InvoicemngService ) {
  //  this.records = [[10,10,10,10,10,10,10,10,10,10,10,10]];      // [10,20,30,40,50,60,70,80,90,100,110,120];
   }

  ngOnInit(): void {
      debugger;
      this.activityChartType = ChartType.Bar;
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: this.records        // [this.loadSeries(this.records)]
      };
      this.activityChartOptions = {
        seriesBarDistance: 10,
        axisX: {
          showGrid: false
        },
        height: '245px'
      };
      this.activityChartResponsive = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      this.activityChartLegendItems = [
        { title: 'Tesla Model S', imageClass: 'fa fa-circle text-info' },
        { title: 'BMW 5 Series', imageClass: 'fa fa-circle text-danger' }
      ];
      
      
      debugger;
      this.activityChartData;
      debugger;


  }

  ngAfterViewInit(): void {


    //  this.childcomp.ngOnInit();
    //   this.childcomp.ngAfterViewInit();

    // debugger;
    // this.activityChartData;
    // debugger;
  
  }
  searchFilter(filters: InvoicesModel): void {
      debugger;
      this.records =  [[10,20,30,40,50,60,70,80,90,100,110,120]];
    //  this.records = [[10,20,30,40,50,60,70,80,90,100,110,120]];
   //   this.records = [[10,20,30,40,50,60,70,10,10,10,10,10]];
   //   this.activityChartData.series = [[10,20,30,40,50,60,70,80,90,100,110,120]];
      this.activityChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series:   this.records  /////// this.records 
      };
     this.ngOnInit();
     this.childcomp.ngOnInit();
     this.childcomp.ngAfterViewInit();
  
      debugger;
  }


}
