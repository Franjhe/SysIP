import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { clear } from 'console';

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
  mpago: any;
  mpagoext: any;
  mpagosol: any;
  mpagosolext: any;
  pislr: any;
  mislr: any;
  mislrext: any;
  xobservaciones?: any;
  recibos: any;
  cmoneda: any;
  cmonedaOrden: any;
  
}

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent {
  paymentRequestFormGroup = this._formBuilder.group({
    transfer : this._formBuilder.array([]),
    cmonedaOrden: ['', Validators.required],
  });

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild(MatSort) sort2!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Alerta1') Alerta1!: TemplateRef<any>;
  @ViewChild('dialogPaymentRequest') dialogPaymentRequest!: TemplateRef<any>;
  @ViewChild('observaciones') observaciones!: TemplateRef<any>;

  displayedColumns: string[] = ['select', 'cproductor', 'xnombre', 'mcomtot', 'mcomexttot', 'moneda', 'detail'];
  dataSource = new MatTableDataSource<any>;
  defaultDataSource = new MatTableDataSource<any>;

  tasaBcv :  any
  moneda :  any
  monto :  any
  montoext : any
  restante : any
  diferencia : any
  neto : any
  netoBs : any

  currentUser!: any
  usuario : any 



  displayedColumns2: string[] = ['select', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  // displayedColumns2: string[] = ['select', '0', '1', '2', '3', '4', '5', '6', '7', '9', '10', '11'];
  tableCommisionPorProductor = new MatTableDataSource<any>;
  defaultableCommisionPorProductor = new MatTableDataSource<any>;
  commisionPorProductorOriginal = new MatTableDataSource<any>;

  selection = new SelectionModel<any>(true, []);
  selection2 = new SelectionModel<any>(true, []);

  listMonedaOrden: any = [];

  rowsABuscar: any = [];
  listPaymentReceipts: any = [];

  dataSourceindex: any;

  total_comision = 0;
  total_impuesto = 0;
  total_comisionext = 0;
  total_cmoneda = '';
  paymentDetail = {}

  listPaymentRequest: PaymentRequest[] = [];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) {
  }

  get transfer() : FormArray {
    return this.paymentRequestFormGroup.get("transfer") as FormArray
  }

  ngOnInit() {

    let token : any = localStorage.getItem('user');

    this.currentUser = JSON.parse(token);
    this.usuario = this.currentUser.data.cusuario

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.tasaBcv = data.monitors.usd.price
    })

    this.http.post(environment.apiUrl + '/api/v1/commissions/search', '').subscribe((response: any) => {
      // ////console.log(response);


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
      // ////console.log(response.returnData.search);

      this.defaultDataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource = new MatTableDataSource(response.returnData.search);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // this.tableCommisionPorProductor.paginator = this.paginator;
      // this.tableCommisionPorProductor.sort = this.sort;
      // // ////console.log(response);

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

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    ////console.log(filterValue);
    if (filterValue) {
      this.tableCommisionPorProductor.filter = filterValue.trim().toLowerCase();
      this.defaultableCommisionPorProductor = new MatTableDataSource(this.tableCommisionPorProductor.filteredData);
      this.tableCommisionPorProductor = new MatTableDataSource(this.tableCommisionPorProductor.filteredData);
      // this.tableCommisionPorProductor.filteredData.forEach(row => this.selection2.select(row));
    } else {
      this.defaultableCommisionPorProductor = new MatTableDataSource(this.commisionPorProductorOriginal.data);
      this.tableCommisionPorProductor = new MatTableDataSource(this.commisionPorProductorOriginal.data);
      // this.tableCommisionPorProductor.data.forEach(row => this.selection2.select(row));
    }
    this.calculateTotalCommissions();

    this.selection2.clear();
    // ////console.log(this.selection2.selected);

  }

  clearData() {
    this.total_comision = 0;
    this.total_impuesto = 0;
    this.total_comisionext = 0;
    this.total_cmoneda = '';
  }


  dataCorredor(ccorredor: any, cmoneda: any, index: any) {
    this.clearData();

    // ////console.log(index);
    this.dataSourceindex = index;
    let data = {
      "ccorredor": ccorredor,
      "cmoneda": cmoneda
    }
    this.http.post(environment.apiUrl + '/api/v1/commissions/search-insurerCommissions/', data).subscribe((response: any) => {
      // this.tableCommisionPorProductor = new MatTableDataSource<any>;
      // ////console.log(response.returnData.search);
      this.commisionPorProductorOriginal = new MatTableDataSource(response.returnData.search);
      this.defaultableCommisionPorProductor = new MatTableDataSource(response.returnData.search);
      this.tableCommisionPorProductor = new MatTableDataSource(response.returnData.search);
      this.tableCommisionPorProductor.paginator = this.paginator2;
      this.tableCommisionPorProductor.sort = this.sort2;
      // ////console.log(this.tableCommisionPorProductor.data);
      this.showInsurerComissions();
    });
  }

  showInsurerComissions(config?: MatDialogConfig) {

    this.selection2.clear();
    this.clearData();

    this.tableCommisionPorProductor.data.forEach(row => this.selection2.select(row));

    this.calculateTotalCommissions();
    // this.tableCommisionPorProductor.data.forEach(row => (
    //   // this.total_impuesto =+ row.mmovcomext,

    //   ////console.log(row),

    //   // this.total_comision += this.total_impuesto,
    //   this.total_comision += row.mmovcom,
    //   this.total_comisionext += row.mmovcomext,
    //   this.total_cmoneda = row.cmoneda

    //   ));

    // this.total_comision = this.total_comisionext + this.total_impuesto;

    return this.dialog.open(this.InfoReceipt);
  }

  calculateTotalCommissions() {
    this.clearData();

    // ////console.log(this.selection2);
    this.selection2.selected.forEach(row => (
      this.total_comision += row.mmovcom,
      this.total_comisionext += row.mmovcomext,
      this.total_cmoneda = row.cmoneda
    ));
  }




  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // alert(numSelected);
    // alert(numRows);
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected2() {
    const numSelected = this.selection2.selected.length;
    const numRows = this.tableCommisionPorProductor.data.length;
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle2() {
    if (this.isAllSelected2()) {
      this.selection2.clear();
      // this.calculateTotalCommissions();

    } else {
      this.tableCommisionPorProductor.data.forEach(row => this.selection2.select(row));
      // this.calculateTotalCommissions();

    }
    this.calculateTotalCommissions();

  }



  logSelection2() {
    // ////console.log(this.dataSource.data[0].mcomtot = this.total_comisionext);
    // this.selection2.selected.forEach(row => ////console.log(row.mmovcom));
    this.dialog.closeAll();
  }

  calculatePaymentCommissions() {

    this.calculateTotalCommissions();
    // ////console.log(this.total_comision);

    this.dataSource.data[this.dataSourceindex].mmovcomtot = this.total_comision;
    // this.dataSource.data[this.dataSourceindex].mcomtot = this.total_comision;
    this.dataSource.data[this.dataSourceindex].mmovcomexttot = this.total_comisionext;
    ////console.log('↓');

    ////console.log(this.dataSource.data[this.dataSourceindex]);
    this.dataSource.data[this.dataSourceindex].recibos = [];
    // ////console.log();

    this.selection2.selected.forEach(element => {
      // ////console.log(element);

      this.dataSource.data[this.dataSourceindex].recibos.push(element);
    });

    // ////console.log(this.dataSource.data);
    // ();

    this.selection2.clear();

    this.dialog.closeAll();
  }

  changeMonedaPago(e: any) {
    ////console.log(e);
    
    // ////console.log(e.ariaLabel);
    
    this.listMonedaOrden[e.source.id] = e.value;
    this.moneda = e.value
    this.addPayment1(e.value)

  }

  generatePaymentRequests() {
    this.rowsABuscar = [];

    this.selection.selected.forEach(row => (
      this.rowsABuscar.push(row)
      // this.listPaymentReceipts.push(element.crecibo)
    ));

    this.selection.clear();
    this.clearData();

    // const trasnfer = this.paymentRequestFormGroup.get("transfer") as FormArray

    // while (trasnfer.length !== 0) {
    //   trasnfer.removeAt(0)
    // }

    // this.addPayment()

    this.showDialogPaymentRequests();
  }

  newPayment(): FormGroup {
    return this._formBuilder.group({
      cmoneda:'',
      mpago: ''
    })
  }

  newPayment1(e : any): FormGroup {
    return this._formBuilder.group({
      cmoneda:e ,
      mpago: ''
    })
  }
  
  addPayment() {
    const trasnfer = this.paymentRequestFormGroup.get("transfer") as FormArray

    if(trasnfer.length < 2){
      this.transfer.push(this.newPayment());
    }
    else if(trasnfer.length >= 2){
      this.toast.open('Solo puede registrar dos modalidades de pago', '', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['error-toast']
      }); 
    }


  }

  addPayment1(e : any) {
    const trasnfer = this.paymentRequestFormGroup.get("transfer") as FormArray

    if(trasnfer.length < 2){
      this.transfer.push(this.newPayment1(e));
    }
    else if(trasnfer.length >= 2){
      this.toast.open('Solo puede registrar dos modalidades de pago', '', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['error-toast']
      }); 
    }


  }

  removePayment(i:number) {
    this.transfer.removeAt(i);


  }

  showDialogPaymentRequests(config?: MatDialogConfig) {
    this.listPaymentRequest = [];
    this.listPaymentReceipts = [];
    // let observaciones = document.getElementsByClassName('.observaciones');



    this.rowsABuscar.forEach((element: any) => {
      // this.listPaymentReceipts.push(element.crecibo)
      ////console.log("--->>>>-----<<<<<<----");
    //console.log(element);
      let xmoneda = this.paymentRequestFormGroup.get('cmonedaOrden')?.value;
      // ////console.log(xmoneda);

      this.http.post(environment.apiUrl + '/api/v1/commissions/search-data/' + element.cproductor, '').subscribe((response: any) => {
        let data = response.returnData.search[0]
        ////console.log(data);
        
        let mislr = 0
        let mislrext = 0;
        let pislr = 0;

        if (element.mmovcomtot >= data.mminislr) {
          pislr = data.pislr;
          mislr = element.mmovcomtot * (data.pislr / 100);
          mislrext = element.mmovcomexttot * (data.pislr / 100);
        } 
                

        let mpagosol = element.mmovcomtot - mislr;
        let mpagosolext = element.mmovcomexttot - mislrext;
        this.montoext = mpagosolext
        this.monto = mpagosol
        this.neto = this.montoext
        this.netoBs = this.monto 

        // this.listPaymentRequest.length
        // paymentRequestFormGroup

        response.returnData.search.forEach((e: any) => {
          var paymentRequest: PaymentRequest = {
            xtransaccion: "Pago Comisión Agente",
            // xtransaccion: transaccion,
            ffacturacion: new Date().toLocaleDateString(),
            cstatus: '',
            xstatus: 'pendiente',
            cid: e.cid,
            xbeneficiario: element.xcliente.trim(),
            cconcepto: '',
            xconcepto: 'Pago Comisión Agente',
            ccorredor: e.cci_rif,
            xcorredor: e.xcliente.trim(),
            mpago: element.mmovcomtot.toFixed(2),
            mpagoext: element.mmovcomexttot.toFixed(2),
            pislr: pislr.toFixed(2),
            mislr: mislr.toFixed(2),
            mislrext: mislrext.toFixed(2),
            mpagosol: mpagosol.toFixed(2),
            mpagosolext: mpagosolext.toFixed(2),
            // mmontototal: element.mmovcomexttot,
            recibos: element.recibos,
            cmoneda: element.cmoneda,
            cmonedaOrden: xmoneda,
            xobservaciones: '',
          }
          this.listPaymentRequest.push(paymentRequest);
        });

      });
    });



    return this.dialog.open(this.dialogPaymentRequest, config);
  }

  bcvChange(tasa : any) {
    this.tasaBcv = tasa;
  }

  diferenceChange(mount : any) {
    this.diferencia = mount;
  }



  calculateMount(){
    const trasnfer = this.paymentRequestFormGroup.get("transfer") as FormArray

    this.tasaBcv      //tasa de calculo
    this.moneda       // moneda de pago
    this.monto        //monto en bolivares del pago
    this.montoext     //monto en dolares del pago
    this.neto         //neto (mmonto de calculo mas la diferencia)

    //36.59 'Bs' 2.71 2.71
    if(this.diferencia != null && this.moneda == '$'){
      this.neto = 0
      let mount = Number(this.montoext) + Number(this.diferencia)
      this.neto = mount


    }

    if(this.diferencia != null && this.moneda == 'Bs'){
      this.netoBs = 0
      let mount = Number(this.monto) + Number(this.diferencia)
      this.netoBs = mount
    }

    if(this.diferencia != null && this.moneda == '$'){
      let monto = this.neto.toFixed(2)
      this.restante = monto

    }

    if(this.diferencia != null && this.moneda == 'Bs'){
      let monto = this.netoBs.toFixed(2)
      this.restante = monto
    }

    for(let item of trasnfer.value){
      
      if(this.moneda == '$'){  //la moneda de pago
       
        if(item.cmoneda == '$'){  //la moneda de distribucion del pago
          let operation = this.restante - item.mpago

          this.restante = operation.toFixed(2)
        }
        else if(item.cmoneda == 'Bs'){  //la moneda de distribucion del pago
          let monto = item.mpago /  this.tasaBcv

          let operation = this.restante - monto

          this.restante = operation.toFixed(2)
        }

      }
      
      else if(this.moneda == 'Bs'){   //la moneda de pago
        
        if(item.cmoneda == '$'){  //la moneda de distribucion del pago
          let monto = item.mpago *  this.tasaBcv

          let operation = this.restante - monto

          this.restante = operation.toFixed(2)
        }
        else if(item.cmoneda == 'Bs'){  //la moneda de distribucion del pago

          let operation = this.restante - item.mpago

          this.restante = operation.toFixed(2)
        }

      }

    }

    console.log(this.restante)

  }

  createObject(){
    const trasnfer = this.paymentRequestFormGroup.get("transfer") as FormArray

    //el codigo mas forzado que mis ganas de seguir en vemezuela,pero funciona (arreglar con tiempo)
    for(let i = 0; i < trasnfer.value.length; i++ ){
      
        this.paymentDetail = {
          cmoneda_1 : trasnfer.value[0].cmoneda,
          mmonto_1 : trasnfer.value[0].mpago,
          cmoneda_2 : trasnfer.value[1]?.cmoneda,
          mmonto_2 : trasnfer.value[1]?.mpago
        }
      

    }

  }


  // changeMonedaPago() {

  //   this.reset_moneda_pago();
  //   let cmoneda = this.paymentRequestFormGroup.get('cmoneda')?.value;
  //   // let mmpago = (<HTMLInputElement>document.getElementById(`mmpago`)).value;
  //   ////console.log(xmoneda);
  //   // alert(xmoneda);
  //   // let mpago_bs = (<HTMLInputElement>document.getElementById(`mpago`)).value;
  //   if (xmoneda == 'Bs') {
  //     this.mpagosol_bs = true;
  //     this.paymentRequestFormGroup.get('mpago')?.setValue(this.paymentRequest.mpago);
  //   }
  //   if (xmoneda == '$') {
  //     this.paymentRequestFormGroup.get('mpagoext')?.setValue(this.paymentRequest.mpagoext);
  //     this.mpagosol_ext = true;
  //   }
  //   if (xmoneda == 'M') {
  //     this.paymentRequestFormGroup.get('mpago')?.setValue('0.00');
  //     this.paymentRequestFormGroup.get('mpagoext')?.setValue('0.00');
  //     this.mpagosol_mix = true;
  //   }
  //   // ////console.log(this.paymentRequestFormGroup.get('mpago')?.value);

  // }

  cancelPaymentRequests(config?: MatDialogConfig) {
    this.listPaymentRequest = [];
    return this.dialog.closeAll();
  }

  proccessPaymentRequests(config?: MatDialogConfig) {

    this.createObject()



    if (window.confirm('¿Desea generar las órdenes de pago?')) {

      for (let i = 0; i < this.listPaymentRequest.length; i++) {
        // const element = this.listPaymentRequest[i];

        this.listPaymentRequest[i].cmonedaOrden = this.listMonedaOrden[i]
        this.listPaymentRequest[i].xobservaciones = (<HTMLInputElement>document.getElementById(`observaciones${i}`)).value;
        
      }

      let data = {
        list: this.listPaymentRequest,
        pago : this.paymentDetail,
        diferencia : this.diferencia,
        cusuario : this.usuario
      }


      this.http.post(environment.apiUrl + '/api/v1/commissions/create-paymentRequests', data).subscribe((response: any) => {
        alert(response.returnData.result.message);
        location.reload();
      });

      return this.dialog.closeAll();
    }
  }



  closeDialog() {
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
        case '0': return this.compare(a.cproductor, b.cproductor, isAsc);
        case '1': return this.compare(a.xcliente, b.xcliente, isAsc);
        case '2': return this.compare(a.mmovcom, b.mmovcom, isAsc);
        case '3': return this.compare(a.mcomexttot, b.mcomexttot, isAsc);
        default: return 0;
      }
    });
  }

  sortData2(sort: Sort) {
    const data = this.tableCommisionPorProductor.data.slice();
    if (!sort.active || sort.direction === '') {
      this.tableCommisionPorProductor.data = this.defaultableCommisionPorProductor.data;
      return;
    }

    this.tableCommisionPorProductor.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case '0': return this.compare(a.cnpoliza, b.cnpoliza, isAsc);
        case '1': return this.compare(a.crecibo, b.crecibo, isAsc);
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
