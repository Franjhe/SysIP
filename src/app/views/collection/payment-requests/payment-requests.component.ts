import { Component, TemplateRef, ViewChild, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { clear } from 'console';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface PaymentRequest {
  xtransaccion: string;
  csucursal?: string;
  xsucursal?: string;
  ffacturacion: string;
  cstatus: string;
  xstatus: string;
  cid: string;
  xbeneficiario: string;
  cconcepto: string;
  xconcepto: string;
  ccorredor: string;
  xcorredor: string;
  mmontototal: any;
  xobservaciones?: any;
  recibos: any;
  cmoneda: any;
}



@Component({
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.scss'],
})
export class PaymentRequestsComponent {
  groupReceiptsForm = this._formBuilder.group({
    agrupado: this._formBuilder.array([])
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Alerta1') Alerta1!: TemplateRef<any>;
  @ViewChild('dialogPaymentRequest') dialogPaymentRequest!: TemplateRef<any>;
  @ViewChild('observaciones') observaciones!: TemplateRef<any>;
  @ViewChild('detailReceipts') detailReceipts!: TemplateRef<any>;

  displayedColumns: string[] = ['0', '1', '2', '3', '4', '5', '6', '7'];
  dataSource = new MatTableDataSource<any>;
  displayedColumns2: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  tableDetailReceipts = new MatTableDataSource<any>;
  // selection = new SelectionModel<any>(true, []);
  // selection2 = new SelectionModel<any>(true, []);


  rowsABuscar: any = [];
  listPaymentReceipts: any = [];

  dataSourceindex: any;

  total_movcom = 0;
  total_impuesto = 0;
  total_comision = 0;

  listPaymentRequest: PaymentRequest[] = [];
  paymentRequest: any;

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer

  ) {
  }

  ngOnInit() {
    this.http.post(environment.apiUrl + '/api/v1/commissions/search-paymentRequests', '').subscribe((response: any) => {
      console.log(response);

      this.dataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  clearData() {
    this.total_movcom = 0;
    this.total_impuesto = 0;
    this.total_comision = 0;
  }


  showDetailPaymentRequest(csolpag: any, index: any) {
    // if (condition) {
      
    // }
    // this.paymentRequest.clear;
    // alert(csolpag);
    // console.log(this.dataSource.data[csolpag]);
    // this.paymentRequest = this.dataSource.data[csolpag];
    // alert(csolpag);
    let data = {
      csolpag: csolpag
    }
    this.http.post(environment.apiUrl + '/api/v1/commissions/detail-paymentRequest', data).subscribe((response: any) => {
      this.paymentRequest = response.returnData.search[0]
      console.log(this.paymentRequest);

      this.tableDetailReceipts = new MatTableDataSource(response.returnData.search[0].recibos);
      // this.tableDetailReceipts.paginator = this.paginator;
      // this.tableDetailReceipts.sort = this.sort;

      return this.dialog.open(this.dialogPaymentRequest);
    });

  }

  showDetailReceipts() {
    return this.dialog.open(this.detailReceipts);
  }

  closeDialog() {
    // this.detailReceipts.elementRef
    return this.dialog.closeAll();
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    // return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    //   this.selection.clear() :
    //   this.tableCommisionPorProductor.data.forEach(row => this.selection.select(row));
  }

  logSelection2() {
    // console.log(this.dataSource.data[0].mcomtot = this.total_comision);
    // this.selection2.selected.forEach(row => console.log(row.mmovcom));
    this.dialog.closeAll();
  }

  cancelPaymentRequests() {
    // this.paymentRequest.clear;
    return this.dialog.closeAll();
  }

  proccessPaymentRequests(csolpag: any) {
    let data = {
      csolpag: csolpag
    }
    this.http.post(environment.apiUrl + '/api/v1/commissions/pay-paymetRequests', data).subscribe((response: any) => {
      alert(response.returnData.result.message);
      location.reload();
    });

    return this.dialog.closeAll();
  }


  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  

}

@NgModule({
  imports: [
    MatSortModule
  ],
  // entryComponents: [PaymentRequestsComponent],
  // declarations: [PaymentRequestsComponent],
  bootstrap: [PaymentRequestsComponent],
  providers: []
})
export class AppModule {}
