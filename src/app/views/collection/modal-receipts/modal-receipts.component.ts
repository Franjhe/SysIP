import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
// import {MAT_DIALOG_DATA} from '@angular/material';
// import { Inject } from '@angular/core';

export interface PaymentRequest {
  csolpag: string
  xtransaccion: string;
  xstatsol: string;
  csucursal?: string;
  xsucursal?: string;
  fsolicit: string;
  cid_ben: string;
  cproductor: string;
  xbeneficiario: string;
  xconcepto: string;
  mpago: any;
  mpagoext: any;
  mmontototal: any;
  xobservaciones?: any;
  recibos: any;
  cmoneda: any;
  xmoneda: any;
}

@Component({
  selector: 'app-modal-receipts',
  templateUrl: './modal-receipts.component.html',
  styleUrls: ['./modal-receipts.component.scss']
})
export class ModalReceiptsComponent {
  // @ViewChild('allPaginator', { read: MatPaginator, static: true }) allPaginator!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns2: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  tableDetailReceipts = new MatTableDataSource<any>;
  defaultTableDetailReceipts = new MatTableDataSource<any>;

  // 
  listPaymentRequest: PaymentRequest[] = [];
  paymentRequest: any;
  total_movcom_pr = 0;
  total_movcomext_pr = 0;
  total_movcom_bo = 0;
  total_movcomext_bo = 0;

  constructor(
    public dialogRef: MatDialogRef<ModalReceiptsComponent>,
    private http: HttpClient,
    readonly dialog: MatDialog,
    // @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    // let csolpag 
    let data = {
      csolpag: localStorage.getItem('csolpag'),
    }

    this.http.post(environment.apiUrl + '/api/v1/commissions/detail-paymentRequest', data).subscribe((response: any) => {
      this.paymentRequest = response.returnData.search[0]
      // console.log(this.paymentRequest);

      this.defaultTableDetailReceipts = new MatTableDataSource(response.returnData.search[0].recibos);
      this.tableDetailReceipts = new MatTableDataSource(response.returnData.search[0].recibos);
      this.tableDetailReceipts.paginator = this.paginator;

      this.clearData()

      this.tableDetailReceipts.data.forEach(element => {
        if (element.imovcom == 'BO') {
          this.total_movcom_bo += element.mmovcom,
            this.total_movcomext_bo += element.mmovcomext
        } else {
          this.total_movcom_pr += element.mmovcom,
            this.total_movcomext_pr += element.mmovcomext
        }
      }

      );

      // return this.dialog.open(this.dialogPaymentRequest);
    });
  }
  // alert('oaiejfwa'),

  // var opened = this.dialog.afterOpened.pipe(
  //   Map ? (() => this.tableDetailReceipts.paginator = this.allPaginator)
  //   );
  // this.tableDetailReceipts.paginator = this.paginator2;
  // this.dialogDetailReceipts.afterOpened(() => {
  //   this.tableDetailReceipts.paginator = this.allPaginator;

  //});

  closeDialog() {
    return this.dialogRef.close();;
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDetailReceipts.filter = filterValue.trim().toLowerCase();
  }


  clearData() {
    this.total_movcom_pr = 0;
    this.total_movcomext_pr = 0;
    this.total_movcom_bo = 0;
    this.total_movcomext_bo = 0;
  }

  sortData2(sort: Sort) {
    const data = this.tableDetailReceipts.data.slice();
    if (!sort.active || sort.direction === '') {
      this.tableDetailReceipts.data = this.defaultTableDetailReceipts.data;
      return;
    }

    this.tableDetailReceipts.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case '0': return this.compare(a.cnpoliza, b.cnpoliza, isAsc);
        case '1': return this.compare(a.cnrecibo, b.cnrecibo, isAsc);
        case '2': return this.compare(a.imovcom, b.imovcom, isAsc);
        case '3': return this.compare(a.cmoneda, b.cmoneda, isAsc);
        case '4': return this.compare(a.canexo, b.canexo, isAsc);
        case '5': return this.compare(a.femision, b.femision, isAsc);
        case '6': return this.compare(a.mmontoapag, b.mmontoapag, isAsc);
        case '7': return this.compare(a.pcomision, b.pcomision, isAsc);
        case '8': return this.compare(a.mmovcom, b.mmovcom, isAsc);
        case '9': return this.compare(a.ptasamon, b.ptasamon, isAsc);
        case '10': return this.compare(a.mmovcomext, b.mmovcomext, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
