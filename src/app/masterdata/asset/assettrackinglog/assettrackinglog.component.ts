import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetModel } from 'app/shared/models/AssetModel';
import { AssetService } from '../services/asset.service';
import { AssetTrackingModel } from 'app/shared/models/AssetTrackingModel';

@Component({
  selector: 'app-assettrackinglog',
  templateUrl: './assettrackinglog.component.html',
  styleUrls: ['./assettrackinglog.component.css']
})
export class AssettrackinglogComponent implements OnInit {

Asset: AssetModel;
AssetTrackingVMs: AssetTrackingModel[] = [];
pageIndex: number = 1;
pageSize: number = 10;

  constructor( 
    private route: ActivatedRoute,
    private astSrv: AssetService
    ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      debugger;
      this.Asset = params;
      this.getLogsByAssetCode(params.astCode) ;
     });
  }

  getLogsByAssetCode(id:string) {
   debugger;
      this.astSrv.getLogsByAssetCode(id).subscribe((res: AssetTrackingModel[]) => {
        debugger;
        this.AssetTrackingVMs  = res;
    });
  }

  onChangeRowsPerPage(event) {
    debugger;
    // console.log(event);
    // console.log(event.target.value);
    this.pageSize = event.target.value;
    this.pageIndex = 1;
  }

}
