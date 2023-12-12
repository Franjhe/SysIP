import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-payment-cancellation',
  templateUrl: './payment-cancellation.component.html',
  styleUrls: ['./payment-cancellation.component.scss']
})
export class PaymentCancellationComponent {

  dataSource1 = new MatTableDataSource<any>;
  dataSource2 = new MatTableDataSource<any>;

  @ViewChild('table1Paginator') paginator1!: MatPaginator;
  @ViewChild('table1Sort') sort1!: MatSort;

  @ViewChild('table2Paginator') paginator2!: MatPaginator;
  @ViewChild('table2Sort') sort2!: MatSort;

  displayedColumns1: string[] = ['cedula', 'fecha', 'tasa', 'mount' , 'mountBs'];
  displayedColumns2: string[] = ['poliza','recibo','cuota','ramo','asegurado', 'mount' , 'mountBs'];

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Pending') Pending!: TemplateRef<any>;
  
  bcv : any
  viewData : boolean = false
  cliente : any
  clienteData : any

  urlImg : any

  listCollected : any = []
  listReceipt: any = []

  dataReport: any = []
  dataSoport: any = []
  tradesList : any = []

  totalPending : any
  totalNotificated : any

  ntransaccion : any

  updateReceipt = this._formBuilder.group({
    iestadorec: [{ value: '', disabled: false }],
    itransaccion: [{ value: '', disabled: false }],
  });

  updateReceiptPending = this._formBuilder.group({
    itransaccion :'',
    cmoneda:'',
    cbanco:'',
    cbanco_destino: '',
    mpago: '',
    mpagoext: '',
    ptasamon: '',
    ptasaref: '',
    freporte: '',
    xreferencia: '',
    ximagen: '',
  });


  constructor( private _formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,

    ) {
   }


  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl( imageUrl);
}


  ngOnInit(){

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })

    fetch(environment.apiUrl + '/api/v1/collection/search-notification' )
    .then((response) => response.json())
    .then(data => {
      this.dataSource1 = new MatTableDataSource(data.searchPaymentReport.recibo);

      const listNotificate = data.searchPaymentReport.recibo

      const sumaTotal = listNotificate.reduce((acumulador: any, recibo: { mpagoext: any; }) => {
 
        acumulador += recibo.mpagoext;
        
        return acumulador;
      }, 0);

      this.totalNotificated = sumaTotal.toFixed(2)
    })

    fetch(environment.apiUrl + '/api/v1/collection/search-pending' )
    .then((response) => response.json())
    .then(data => {
      this.dataSource2 = new MatTableDataSource(data.searchPaymentPendingData.recibo);

      const listPending = data.searchPaymentPendingData.recibo

      const sumaTotal = listPending.reduce((acumulador: any, recibo: { mprimabrutaext: any; }) => {
 
        acumulador += recibo.mprimabrutaext;
        
        return acumulador;
      }, 0);

      this.totalPending = sumaTotal.toFixed(2)

    })

    fetch(environment.apiUrl + '/api/v1/collection/search-payments-collected' )
    .then((response) => response.json())
    .then(data => {
      this.listCollected = new MatTableDataSource(data.searchPaymentsCollected.recibo);
      
    })

    fetch(environment.apiUrl + '/api/v1/valrep/trade')
    .then((response) => response.json())
    .then(responde => {

      this.tradesList = []
      for(let i = 0; i < responde.data.trades.length; i++){
        this.tradesList.push({
          id: responde.data.trades[i].cramo,
          value: responde.data.trades[i].xdescripcion_l,
        })
      }

    })

  }

  async ngAfterViewInit(){
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;

    this.ngAfterViewInitP();
  }

  async ngAfterViewInitP(){
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;
  }

  ngAfterViewInitC(){

  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }

  Alert(config?: MatDialogConfig) {

    return this.dialog.open(this.InfoReceipt, config);

  }

  async dataNotification(transaccion : any){
    this.ntransaccion = transaccion
    fetch(environment.apiUrl + '/api/v1/collection/search-notification-data/' + transaccion)
    .then((response) => response.json())
    .then(data => {
       this.dataReport = []
       this.dataSoport = []

      for(let i = 0; i < data.searchPaymentReport.recibo.length; i++){
        const client = {
          cedula: data.searchPaymentReport.recibo[i].casegurado
        }

        this.http.post(environment.apiUrl + '/api/v1/collection/search', client).subscribe((response: any) => {

          let id = data.searchPaymentReport.recibo[i].cramo
          let treatments = this.tradesList
          let filterdata = treatments.filter((data: { id: any; }) => data.id == id)
          const xramo = filterdata[0].value


          this.dataReport.push({
            cpoliza : data.searchPaymentReport.recibo[i].cpoliza,
            crecibo : data.searchPaymentReport.recibo[i].crecibo,
            casegurado : response.searchReceipt.client[0].xcliente,
            cramo : data.searchPaymentReport.recibo[i].cramo +' - '+ xramo,
            mprimabrutaext : data.searchPaymentReport.recibo[i].mprimabrutaext,
            mprimabruta : data.searchPaymentReport.recibo[i].mprimabruta
          })
        });


      }
 
      for(let i = 0; i < data.searchPaymentReport.soporte.length; i++){

        fetch(environment.apiUrl + '/api/get-document/' + data.searchPaymentReport.soporte[i].xruta)
        .then((response) => response.blob())
        .then(image => {
          var url = URL.createObjectURL(image)
          var img = new Image();
          img.src = url;
          this.urlImg = url
         })

        this.dataSoport.push({
          cbanco:data.searchPaymentReport.soporte[i].cbanco,
          cbanco_destino:data.searchPaymentReport.soporte[i].cbanco_destino,
          cmoneda:data.searchPaymentReport.soporte[i].cmoneda,
          mpago:data.searchPaymentReport.soporte[i].mpago,
          mpagoext:data.searchPaymentReport.soporte[i].mpagoext,
          mpagoigtf:data.searchPaymentReport.soporte[i].mpagoigtf,
          mpagoigtfext:data.searchPaymentReport.soporte[i].mpagoigtfext,
          ptasamon:data.searchPaymentReport.soporte[i].ptasamon,
          ptasaref:data.searchPaymentReport.soporte[i].ptasaref,
          xreferencia:data.searchPaymentReport.soporte[i].xreferencia,
          ximagen: this.urlImg,

        })

      }

    })


    this.PendindAlert()
  }

  async dataPendient(transaccion : any){
    this.ntransaccion = transaccion
    fetch(environment.apiUrl + '/api/v1/collection/search-notification-data/' + transaccion)
    .then((response) => response.json())
    .then(data => {
       this.dataReport = []

      for(let i = 0; i < data.searchPaymentReport.recibo.length; i++){
        const client = {
          cedula: data.searchPaymentReport.recibo[i].casegurado
        }

        this.http.post(environment.apiUrl + '/api/v1/collection/search', client).subscribe((response: any) => {

          let id = data.searchPaymentReport.recibo[i].cramo
          let treatments = this.tradesList
          let filterdata = treatments.filter((data: { id: any; }) => data.id == id)
          const xramo = filterdata[0].value


          this.dataReport.push({
            cpoliza : data.searchPaymentReport.recibo[i].cpoliza,
            crecibo : data.searchPaymentReport.recibo[i].crecibo,
            casegurado : response.searchReceipt.client[0].xcliente,
            cramo : data.searchPaymentReport.recibo[i].cramo +' - '+ xramo,
            mprimabrutaext : data.searchPaymentReport.recibo[i].mprimabrutaext,
            mprimabruta : data.searchPaymentReport.recibo[i].mprimabruta
          })
        });


      }
 
      for(let i = 0; i < data.searchPaymentReport.soporte.length; i++){

        fetch(environment.apiUrl + '/api/get-document/' + data.searchPaymentReport.soporte[i].xruta)
        .then((response) => response.blob())
        .then(image => {
          var url = URL.createObjectURL(image)
          var img = new Image();
          img.src = url;
          this.urlImg = url
         })

        this.dataSoport.push({
          cbanco:data.searchPaymentReport.soporte[i].cbanco,
          cbanco_destino:data.searchPaymentReport.soporte[i].cbanco_destino,
          cmoneda:data.searchPaymentReport.soporte[i].cmoneda,
          mpago:data.searchPaymentReport.soporte[i].mpago,
          mpagoext:data.searchPaymentReport.soporte[i].mpagoext,
          mpagoigtf:data.searchPaymentReport.soporte[i].mpagoigtf,
          mpagoigtfext:data.searchPaymentReport.soporte[i].mpagoigtfext,
          ptasamon:data.searchPaymentReport.soporte[i].ptasamon,
          ptasaref:data.searchPaymentReport.soporte[i].ptasaref,
          xreferencia:data.searchPaymentReport.soporte[i].xreferencia,
          ximagen: this.urlImg,

        })

      }

    })


    this.Alert()
  }

  async PendindAlert(config?: MatDialogConfig) {
    return this.dialog.open(this.Pending, config);
  }

  updateReceiptNotificated(){
    const data = {
      receipt : this.dataReport,
      transacccion : this.ntransaccion,
      iestadorec: this.updateReceipt.get('iestadorec')?.value ,
      itransaccion: this.updateReceipt.get('itransaccion')?.value ,
    }
    this.http.patch(environment.apiUrl + '/api/v1/collection/update-receipt/', data ).subscribe((response: any) => {
      
      if(response.status){
        location.reload()
      }

    })

  }

}
