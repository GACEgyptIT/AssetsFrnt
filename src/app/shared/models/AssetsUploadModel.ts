export class AssetsUploadModel {
    astId:number;
    AssetCategoryName?: string;
    AssetTypeName?: string;
    AssetBrandName?: string;
    astBrandCode?: string;
    AssetCode?: string;
    Description?: string;
    SerialNumber?: string;
    PartNumber?: string;
  //  DialNumber?: string;
   // CircuitNumber?: string;
   // TypeCode?: string;
    EmpHRCode?: string;
    EmpName?: string;
    CompanyCode?: string;
    CompanyName?: string;
    BranchCode?: string;
    BranchName?: string;
    DepartmentName?: string;
    astPurchaseDate?: Date;
    IsExist?: boolean;

    checkbox?: boolean;
    duplicatCode?: boolean;
    duplicatSerialNumber?: boolean;
    duplicatDailNumber?: boolean;
    
    ByEmpId?: number;

  }

  // public int astId { get; set; }

  // public string Description { get; set; }
  // public string AssetCode { get; set; }
  // public string SerialNumber { get; set; }
  // public string PartNumber { get; set; }
  // public string DialNumber { get; set; }
  // public string CircuitNumber { get; set; }
  // public string TypeCode { get; set; }
  // public string TypeName { get; set; }
  // public string EmpHRCode { get; set; }
  // public string EmpName { get; set; }
  // public string CompanyCode { get; set; }
  // public string CompanyName { get; set; }
  // public string BranchCode { get; set; }
  // public string BranchName { get; set; }

  // public DateTime? astPurchaseDate { get; set; }
  // public Boolean? IsExist { get; set; }