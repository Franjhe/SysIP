import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { clear } from 'console';

export interface PaymentRequest {
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;
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
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent {

  groupReceiptsForm = this._formBuilder.group({
    agrupado: this._formBuilder.array([])
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Alerta1') Alerta1!: TemplateRef<any>;
  @ViewChild('dialogPaymentRequest') dialogPaymentRequest!: TemplateRef<any>;
  @ViewChild('observaciones') observaciones!: TemplateRef<any>;

  displayedColumns: string[] = ['select', 'cproductor', 'xnombre', 'mcomtot', 'mcomexttot', 'mcomtot2'];
  dataSource = new MatTableDataSource<any>;
  displayedColumns2: string[] = ['select', '0', '1', '2', '3', '4', '5', '6'];
  tableCommisionPorProductor = new MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  selection2 = new SelectionModel<any>(true, []);


  rowsABuscar: any = [];
  listPaymentReceipts: any = [];

  dataSourceindex: any;

  total_movcom = 0;
  total_impuesto = 0;
  total_comision = 0;
  total_cmoneda = '';

  listPaymentRequest: PaymentRequest[] = [];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) {
  }

  ngOnInit() {

    // fetch(environment.apiUrl +'/api/v1/commissions')
    // .then((response) => response.json())
    // .then(data => {
    //   // console.log(data);

    //   // this.bcv = data.monitors.usd.price
    // })

    this.http.post(environment.apiUrl + '/api/v1/commissions/search', '').subscribe((response: any) => {
      console.log(response);

      
      // let contador = 0;
      // response.returnData.search.forEach((element: any) => {
      //   // this.http.post(environment.apiUrl + '/api/v1/commissions/search', '').subscribe((response: any) => {
      //     let data = {
      //       'jfjfj': contador
      //     }
      //     // response.returnData.search[contador] += data;
      //     Object.assign(response.returnData.search[contador], data);
      //     contador += 1;
          
      //   // });
        
      // });
      // console.log(response.returnData.search);
      
      this.dataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.tableCommisionPorProductor.paginator = this.paginator;
      this.tableCommisionPorProductor.sort = this.sort;
      // // console.log(response);

      // for(let i = 0; i < response.data.bank.length; i++){
      //   this.bankInternational.push({
      //     id: response.data.bank[i].cbanco,
      //     value: response.data.bank[i].xbanco,
      //   })        
      // }
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
    this.total_cmoneda = '';
  }


  dataCorredor(ccorredor: any, cmoneda: any, index: any) {
    this.clearData();

    // console.log(index);
    this.dataSourceindex = index;
    let data = {
      "ccorredor": ccorredor,
      "cmoneda": cmoneda
    }
    this.http.post(environment.apiUrl + '/api/v1/commissions/search-insurerCommissions/', data).subscribe((response: any) => {
      // this.tableCommisionPorProductor = new MatTableDataSource<any>;
      this.tableCommisionPorProductor = new MatTableDataSource(response.returnData.search);
      this.showInsurerComissions();
    });
  }

  showInsurerComissions(config?: MatDialogConfig) {
    this.clearData();

    this.tableCommisionPorProductor.data.forEach(row => this.selection2.select(row));
    this.tableCommisionPorProductor.data.forEach(row => (

      
      this.total_movcom += row.mmovcom,
      this.total_comision = this.total_movcom - this.total_impuesto,
      this.total_cmoneda = row.cmoneda

    ));

    return this.dialog.open(this.InfoReceipt, config);
  }




  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.tableCommisionPorProductor.data.forEach(row => this.selection.select(row));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle2() {
    if (this.isAllSelected2()) {
      this.selection2.clear();
      // this.calculateMmovcom();

    } else {
      this.tableCommisionPorProductor.data.forEach(row => this.selection2.select(row));
      // this.calculateMmovcom();

    }
    this.calculateMmovcom();

  }

  calculateMmovcom() {
    var comision = 0;
    

    // this.total_movcom = 0;
    // this.total_comision = 0;
    this.clearData();
    console.log(this.selection2);
    
    
    this.selection2.selected.forEach(row => (
      console.log(row),
      

      comision += row.mmovcom

      // this.total_comision = this.total_comision - this.total_impuesto
      
    ));
    this.total_comision = comision;

  }

  logSelection2() {
    // console.log(this.dataSource.data[0].mcomtot = this.total_comision);
    // this.selection2.selected.forEach(row => console.log(row.mmovcom));
    this.dialog.closeAll();
  }

  calculatePaymentCommissions() {
    
    this.calculateMmovcom();
    this.dataSource.data[this.dataSourceindex].mcomtot = this.total_comision;
    console.log('↓');
    this.dataSource.data[this.dataSourceindex].recibos = [];
    // console.log();
    
    this.selection2.selected.forEach(element => {
      this.dataSource.data[this.dataSourceindex].recibos.push(element.crecibo);
    });

    console.log(this.dataSource.data);
    // ();
    
    this.selection2.clear();
    
    this.dialog.closeAll();
  }

  generatePaymentRequests() {
    this.rowsABuscar = [];
    
    this.selection.selected.forEach(row => (
      this.rowsABuscar.push(row)
      // this.listPaymentReceipts.push(element.crecibo)
    ));
    
    this.selection.clear();
    this.clearData();
    this.showDialogPaymentRequests();
  }

  showDialogPaymentRequests(config?: MatDialogConfig) {
    this.listPaymentRequest = [];
    this.listPaymentReceipts = [];
    // let observaciones = document.getElementsByClassName('.observaciones');
    
    

    this.rowsABuscar.forEach((element: any) => {
      // this.listPaymentReceipts.push(element.crecibo)
      console.log("--->>>>-----<<<<<<----");
      console.log(this.rowsABuscar);
      

      this.http.post(environment.apiUrl + '/api/v1/commissions/search-data/' + element.cproductor, '').subscribe((response: any) => {

        response.returnData.search.forEach((e: any) => {
          var paymentRequest: PaymentRequest = {
            xtransaccion: "Pago de Comisiones",
            ffacturacion: new Date().toLocaleDateString(),
            cstatus: '',
            xstatus: 'pendiente',
            cid: e.cid,
            xbeneficiario: element.xnombre,
            cconcepto: '',
            xconcepto: 'Cierre de Caja',
            ccorredor: e.cci_rif,
            xcorredor: e.xnombre,
            mmontototal: element.mcomtot,
            recibos: element.recibos,
            cmoneda: element.cmoneda,
            xobservaciones: ''
          }
          this.listPaymentRequest.push(paymentRequest);
        });
        
      });
      console.log(this.listPaymentRequest);
    });

    

    return this.dialog.open(this.dialogPaymentRequest, config);
  }

  cancelPaymentRequests(config?: MatDialogConfig) {
    this.listPaymentRequest = [];
    return this.dialog.closeAll();
  }

  proccessPaymentRequests(config?: MatDialogConfig) {

    for (let i = 0; i < this.listPaymentRequest.length; i++) {
      const element = this.listPaymentRequest[i];
      this.listPaymentRequest[i].xobservaciones = (<HTMLInputElement>document.getElementById(`observaciones${i}`)).value;
      
    }

    let data = {
      list: this.listPaymentRequest
    }

    // console.log(this.observaciones);
    // let observaciones = 
    // console.log(observaciones);
    
    // i = 0;
    this.http.post(environment.apiUrl + '/api/v1/commissions/create-paymetRequests', data).subscribe((response: any) => {
      alert(response.returnData.result.message);
      location.reload();
    });

    return this.dialog.closeAll();
  }

}
