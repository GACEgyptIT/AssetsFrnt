import { InvoicesModel } from './InvoicesModel';

export class SupplierModel {

  splId?: number;
  splName?: string;
  spOutstanding?: number;
  Invoices?: InvoicesModel[];

}