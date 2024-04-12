import { Component, TemplateRef, ViewChild, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { PdfGenerationService } from '../../../_services/ServicePDF';
import { from, Observable } from 'rxjs';
// 
import { SelectionModel } from '@angular/cdk/collections';
import { clear } from 'console';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ModalReceiptsComponent } from '../modal-receipts/modal-receipts.component';

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
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.scss'],
})
export class PaymentRequestsComponent {
  groupReceiptsForm = this._formBuilder.group({
    agrupado: this._formBuilder.array([])
  });

  paymentRequestFormGroup = this._formBuilder.group({
    // xpago: [''],
    // femision: [''],
    // fdesde: ['', Validators.required],
    // fhasta: ['', Validators.required],
    // cmetodologiapago: ['', Validators.required],
    // ctipopago: [''],
    // cbanco: [''],
    // cbanco_destino: [''],
    // fcobro: [''],
    // xreferencia: [''],
    // mprima_pagada: [''],
    mpago: ['', Validators.required],
    mpagoext: ['', Validators.required],
    xmoneda: ['', Validators.required],
    // mprima_accesorio: [''],
    // irecibo: ['']
  });

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatPaginator) paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Alerta1') Alerta1!: TemplateRef<any>;
  @ViewChild('dialogPaymentRequest') dialogPaymentRequest!: TemplateRef<any>;
  @ViewChild('observaciones') observaciones!: TemplateRef<any>;
  @ViewChild('detailReceipts') detailReceipts!: TemplateRef<any>;
  // @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('allPaginator', { read: MatPaginator, static: true }) allPaginator!: MatPaginator;

  displayedColumns: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  dataSource = new MatTableDataSource<any>;
  defaultDataSource = new MatTableDataSource<any>;
  displayedColumns2: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  tableDetailReceipts = new MatTableDataSource<any>;
  defaultTableDetailReceipts = new MatTableDataSource<any>;
  // selection = new SelectionModel<any>(true, []);
  // selection2 = new SelectionModel<any>(true, []);


  rowsABuscar: any = [];
  listPaymentReceipts: any = [];

  dataSourceindex: any;

  total_movcom_pr = 0;
  total_movcomext_pr = 0;
  total_movcom_bo = 0;
  total_movcomext_bo = 0;

  mpagosol_bs = true;
  mpagosol_ext = false;
  mpagosol_mix = false;

  listPaymentRequest: PaymentRequest[] = [];
  paymentRequest: any;

  dialogDetailReceipts: any;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer,
    private pdfGenerationService: PdfGenerationService,
  ) {
  }

  ngOnInit() {
    this.http.post(environment.apiUrl + '/api/v1/commissions/search-paymentRequests', '').subscribe((response: any) => {
      console.log(response);

      this.defaultDataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource.paginator = this.allPaginator;
      // this.tableDetailReceipts.paginator = this.allPaginator

      // this.tableDetailReceipts = new MatTableDataSource(response.returnData.search);
      // this.tableDetailReceipts.paginator = this.allPaginator;
      // this.tableDetailReceipts.paginator = this.paginator2

      this.dataSource.sort = this.sort;
    });

  }

  // public syncPaginators(event: any): void {
  //   this.tableDetailReceipts.data.length = event.length;
  //   this.tableDetailReceipts.data.pageIndex = event.pageIndex;
  //   this.tableDetailReceipts.data.pageSize = event.pageSize;
  //   }
  // ngAfterViewInit() {
  //   this.tableDetailReceipts.paginator = this.allPaginator;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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


  showDetailPaymentRequest(csolpag: any, index: any) {
    localStorage.setItem('csolpag', csolpag);
    let data = {
      csolpag: csolpag
    }
    this.http.post(environment.apiUrl + '/api/v1/commissions/detail-paymentRequest', data).subscribe((response: any) => {
      this.paymentRequest = response.returnData.search[0]
      console.log(this.paymentRequest);

      this.defaultTableDetailReceipts = new MatTableDataSource(response.returnData.search[0].recibos);
      this.tableDetailReceipts = new MatTableDataSource(response.returnData.search[0].recibos);
      // this.tableDetailReceipts.paginator = this.allPaginator
      // this.tableDetailReceipts.paginator = this.allPaginator;
      // setTimeout(() => this.tableDetailReceipts.paginator = this.allPaginator);
      // this.tableDetailReceipts.data = response.returnData.search[0].recibos;
      // this.tableDetailReceipts.paginator = this.allPaginator;
      // this.tableDetailReceipts.paginator = this.paginator2;


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

      return this.dialog.open(this.dialogPaymentRequest);
    });

  }

  

  showDetailReceipts(): void {
    
    const dialogRef = this.dialog.open(ModalReceiptsComponent, {
      data: {
        csolpag: '14'
      }
    });
  }

  // showDetailReceipts() {
  //   this.dialogDetailReceipts = this.dialog.open(this.detailReceipts);

  //   const open$ = this.dialogDetailReceipts.afterOpened().subscribe( (result: any) => {
  //     console.log(result);
  //     alert('lalalala')
  //     this.tableDetailReceipts = new MatTableDataSource(this.defaultTableDetailReceipts.data),
  //     this.allPaginator;
  //     // setTimeout(() => this.tableDetailReceipts.paginator = this.allPaginator)
  //     this.tableDetailReceipts.paginator = this.allPaginator;
  //   }
  //     // alert('oaiejfwa'),
  //   );
  //   // var opened = this.dialog.afterOpened.pipe(
  //   //   Map ? (() => this.tableDetailReceipts.paginator = this.allPaginator)
  //   //   );
  //   // this.tableDetailReceipts.paginator = this.paginator2;
  //   // this.dialogDetailReceipts.afterOpened(() => {
  //   //   this.tableDetailReceipts.paginator = this.allPaginator;

  //   // });

  //   // return 

  // }
  // this.dialog.afterOpened()
  // ajaja() {
  //   alert('owaeifjoae');
  // }

  reset_moneda_pago() {
    this.mpagosol_bs = false;
    this.mpagosol_ext = false;
    this.mpagosol_mix = false;
  }

  changeMonedaPago() {

    this.reset_moneda_pago();
    let xmoneda = this.paymentRequestFormGroup.get('xmoneda')?.value;
    // let mmpago = (<HTMLInputElement>document.getElementById(`mmpago`)).value;
    console.log(xmoneda);
    // alert(xmoneda);
    // let mpago_bs = (<HTMLInputElement>document.getElementById(`mpago`)).value;
    if (xmoneda == 'Bs') {
      this.mpagosol_bs = true;
      this.paymentRequestFormGroup.get('mpago')?.setValue(this.paymentRequest.mpago);
    }
    if (xmoneda == '$') {
      this.paymentRequestFormGroup.get('mpagoext')?.setValue(this.paymentRequest.mpagoext);
      this.mpagosol_ext = true;
    }
    if (xmoneda == 'M') {
      this.paymentRequestFormGroup.get('mpago')?.setValue('0.00');
      this.paymentRequestFormGroup.get('mpagoext')?.setValue('0.00');
      this.mpagosol_mix = true;
    }
    // console.log(this.paymentRequestFormGroup.get('mpago')?.value);

  }

  // calcMixBs() {
  //   let mpago: any = this.paymentRequestFormGroup.get('mpago')?.value;
  //   let usd: any = (mpago / this.paymentRequest.ptasamon).toFixed(2);
  //   let mpagoext = (this.paymentRequest.mpagoext - usd).toFixed(2);
  //   this.paymentRequestFormGroup.get('mpagoext')?.setValue(mpagoext);
  //   console.log(mpagoext);
  // }
  // calcMixUsd() {
  //   let mpagoext: any = this.paymentRequestFormGroup.get('mpagoext')?.value;
  //   let bs: any = (mpagoext * this.paymentRequest.ptasamon).toFixed(2);
  //   let mpago = (this.paymentRequest.mpago - bs).toFixed(2);
  //   this.paymentRequestFormGroup.get('mpago')?.setValue(mpago);
  //   console.log(mpago);
  // }

  closeDialog() {
    return this.dialogDetailReceipts.close();
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
    if (window.confirm('¿Desea procesar la orden de pago?')) {
      let data = {
        csolpag: csolpag
      }
      this.http.post(environment.apiUrl + '/api/v1/commissions/pay-paymentRequests', data).subscribe((response: any) => {
        alert(response.returnData.result.message);
        location.reload();
      });

      return this.dialog.closeAll();
    }
  }

  printPaymentRequest() {
    // Crear un objeto Date con la fecha original
    const fecha = new Date(this.paymentRequest.fsolicit);

    // Obtener los componentes de la fecha (día, mes, año)
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1; // Nota: JavaScript cuenta los meses desde 0
    const anio = fecha.getFullYear();

    // Formatear la fecha en el formato "día mes año"
    const fsolicit = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${anio}`;
    let mmontototal = (this.paymentRequest.cmoneda.toLowerCase().trim() == 'bs') ? this.paymentRequest.mpago : this.paymentRequest.mpagoext
    let xmoneda = (this.paymentRequest.cmoneda.toLowerCase().trim() == 'bs') ? 'Bolívares' : 'Dólares';

    var paymentRequest: PaymentRequest = {
      csolpag: this.paymentRequest.csolpag,
      xtransaccion: this.paymentRequest.xconcepto_1.trim(),
      xstatsol: this.paymentRequest.xstatsol.trim(),
      fsolicit: fsolicit,
      cid_ben: this.paymentRequest.cid_ben.trim(),
      cproductor: this.paymentRequest.cproductor,
      xbeneficiario: this.paymentRequest.xbeneficiario.trim(),
      xconcepto: this.paymentRequest.xconcepto_2.trim(),
      mpago: this.paymentRequest.mpago.toFixed(2),
      mpagoext: this.paymentRequest.mpagoext.toFixed(2),
      mmontototal: mmontototal.toFixed(2),
      recibos: this.paymentRequest.recibos,
      cmoneda: this.paymentRequest.cmoneda.trim(),
      xmoneda: xmoneda.toUpperCase(),
      xobservaciones: this.paymentRequest.xobserva.trim(),
    }

    const observable = from(this.pdfGenerationService.CreatePaymentRequestPDF(paymentRequest));

    observable.subscribe(
      (data) => {
        // this.check = true;
        // this.loadingPdf = false
      },
      (error) => {
      }
    );

    // return this.dialog.closeAll();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.defaultDataSource.data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case '0': return this.compare(a.csolpag, b.csolpag, isAsc);
        case '1': return this.compare(a.xconcepto_1, b.xconcepto_1, isAsc);
        case '2': return this.compare(a.fmovim, b.fmovim, isAsc);
        case '3': return this.compare(a.xstatsol, b.xstatsol, isAsc);
        case '4': return this.compare(a.cid_ben, b.cid_ben, isAsc);
        case '5': return this.compare(a.cben, b.cben, isAsc);
        case '6': return this.compare(a.mpagosol, b.mpagosol, isAsc);
        case '7': return this.compare(a.xobserva, b.xobserva, isAsc);
        default: return 0;
      }
    });
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

// @NgModule({
//   imports: [
//     MatSortModule
//   ],
//   // entryComponents: [PaymentRequestsComponent],
//   // declarations: [PaymentRequestsComponent],
//   bootstrap: [PaymentRequestsComponent],
//   providers: []
// })
// export class AppModule { }

export class ComponentB {
  constructor(
    public dialogRef: MatDialogRef<ComponentB>
  ) { }

  onUpload(): void {
    // upload stuff

    this.dialogRef.close();
  }
}
