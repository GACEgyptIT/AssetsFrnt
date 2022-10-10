import { Component, OnInit } from '@angular/core';
import { AssettypeService } from '../assettype/services/assettype.service';
import { AssetTypeModel } from 'app/shared/models/AssetTypeModel';
import { CompanyModel } from 'app/shared/models/CompanyModel';
import { CompanyService } from '../company/services/company.service';
import { BranchsModel } from 'app/shared/models/BrachModel';
import { AssetModel } from 'app/shared/models/AssetModel';
import { BranchService } from '../branch/services/branch.service';

@Component({
  selector: 'app-codeguide',
  templateUrl: './codeguide.component.html',
  styleUrls: ['./codeguide.component.css']
})
export class CodeguideComponent implements OnInit {
  // public AssetCodes: any[] = [
  //   { Laptops: "100100",   },
  // ];
  public AssetTypes: AssetTypeModel[] = [];
  public Companies: CompanyModel[] = [];
  public Branchs: BranchsModel[] = [];
  

  constructor(
    private astTypSrv: AssettypeService,
    private comSrv: CompanyService,
    private brnSrv: BranchService
  ) { }

  ngOnInit(): void {
    this.astTypSrv.getAllAssetsTypes().subscribe((astTyps: AssetTypeModel[])  => {
      this.AssetTypes = astTyps;
    });
    this.comSrv.getAllCompanys().subscribe((coms: CompanyModel[])  => {
      this.Companies = coms;
    });
    this.brnSrv.getAllBranchs().subscribe((brns: BranchsModel[])  => {
      this.Branchs = brns;
    });
  }

}
