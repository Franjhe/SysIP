import { Component, TemplateRef, ViewChild, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  displayedColumns: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
  dataSource = new MatTableDataSource<any>;
  defaultDataSource = new MatTableDataSource<any>;
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
    private _liveAnnouncer: LiveAnnouncer,
    private pdfGenerationService: PdfGenerationService,
  ) {
  }

  ngOnInit() {
    this.http.post(environment.apiUrl + '/api/v1/commissions/search-paymentRequests', '').subscribe((response: any) => {
      console.log(response);

      this.defaultDataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

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

  printPaymentRequest() {
		// Crear un objeto Date con la fecha original
		const fecha = new Date(this.paymentRequest.fsolicit);

		// Obtener los componentes de la fecha (día, mes, año)
		const dia = fecha.getDate();
		const mes = fecha.getMonth() + 1; // Nota: JavaScript cuenta los meses desde 0
		const anio = fecha.getFullYear();

		// Formatear la fecha en el formato "día mes año"
		const fsolicit = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${anio}`;

    var paymentRequest: PaymentRequest = {
      csolpag: this.paymentRequest.csolpag,
      xtransaccion: this.paymentRequest.xconcepto_1.trim(),
      xstatsol: this.paymentRequest.xstatsol.trim(),
      fsolicit: fsolicit,
      cid_ben: this.paymentRequest.cid_ben.trim(),
      cproductor: this.paymentRequest.cproductor,
      xbeneficiario: this.paymentRequest.xbeneficiario.trim(),
      xconcepto: this.paymentRequest.xconcepto_2.trim(),
      mmontototal: this.paymentRequest.mpagosol.toFixed(2),
      recibos: this.paymentRequest.recibos,
      cmoneda: this.paymentRequest.cmoneda.trim(),
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

    return this.dialog.closeAll();
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

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
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
export class AppModule { }
