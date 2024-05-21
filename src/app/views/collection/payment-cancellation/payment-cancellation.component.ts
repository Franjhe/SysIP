import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-payment-cancellation',
  templateUrl: './payment-cancellation.component.html',
  styleUrls: ['./payment-cancellation.component.scss'],

})
export class PaymentCancellationComponent {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource = new MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Alerta1') Alerta1!: TemplateRef<any>;

  bcv : any
  viewData : boolean = false
  clienteData : any

  urlImg : any

  listCollected : any = []
  listReceipt: any = []

  dataSoport: any = [] //recibos notificados

  dataReport: any = [] //recibos notificados

  dataReportB: any = [] //recibos notificados

  tradesList : any = []
  coinList : any = []
  transferList : any = []

  bankInternational : any = []
  bankNational: any = []

  bankReceptorInternational : any = []
  bankReceptorNational : any = []
  bankReceptorPM : any = []
  bankReceptorCustodia : any = []


  usd : boolean = false
  pmovil : boolean = false
  depositoUSD : boolean = false
  trans: boolean = false

  totalPending : any
  totalNotificated : any
  totalNotificatedExt: any

  messajeError : any
  error : boolean = false
  revision : boolean = false
  cobradoSAF : boolean = false


  mount : any //monto de la suma de los recibos 
  mountIGTF : any //monto con el calculo igtf 
  mountBs : any //monto en bolivares multiplicado por bcv 
  mountP : any //monto del porcentaje del igtf 
  mountBsP : any //monto en bolivares del porcentaje igtf 
  mountBsExt : any //monto en bolivares del monto total en dolares con igtf


  ntransaccion : any //numero de transaccion de recibo notificado

  nrecibo : any //numero de recibo pendiente
  asegurado : any
  cliente : any
  telefono : any
  correo : any
  dataReceiptPending : any = []
  dataReceiptPendingB: any = []


  listPending: any = []
  listVencido : any = []
  listCollectedReport: any = []


  listReceiptClient : any = []
  lenghReceipt : boolean = false

  lisDiferenceClient: any 
  listDetalle: any
  listSoport : any = []
  diference : boolean = false

  boollistReceipts: boolean = false
  GroupReceiptsBool : boolean = false
  groupReceiptsForm = this._formBuilder.group({
    agrupado : this._formBuilder.array([])
  });

  currentUser!: any
  token: any
  usuario : any

  get agrupado() : FormArray {
    return this.groupReceiptsForm.get("agrupado") as FormArray
  }

  constructor( private _formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

    ) {
   }

  ngOnInit(){

    let token : any = localStorage.getItem('user');

    this.currentUser = JSON.parse(token);
    this.usuario = this.currentUser.data.cusuario

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
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

    fetch(environment.apiUrl + '/api/v1/valrep/coin')
    .then((response) => response.json())
    .then(coin => {

      this.coinList = []
      for(let i = 0; i < coin.data.coins.length; i++){
        this.coinList.push({
          id: coin.data.coins[i].cmoneda,
          value: coin.data.coins[i].xdescripcion_l,
        })
      }

    })


    //bancos nacionales transfertencias
    let bankNational = {
      ctipopago: 2
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', bankNational ).subscribe((response: any) => {
      for(let i = 0; i < response.data.targetBank.length; i++){
        this.bankReceptorNational.push({
          id: response.data.targetBank[i].cbanco_destino,
          value: response.data.targetBank[i].xbanco,
        })        
      }


    })

    //bancos internacionales
    let bankInternational = {
      ctipopago: 1
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', bankInternational ).subscribe((response: any) => {
      for(let i = 0; i < response.data.targetBank.length; i++){
        this.bankReceptorInternational.push({
          id: response.data.targetBank[i].cbanco_destino,
          value: response.data.targetBank[i].xbanco,
        })        
      }


    })

    //bancos pago movil
    let bankReceptorPM = {
      ctipopago: 3
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', bankReceptorPM ).subscribe((response: any) => {
      for(let i = 0; i < response.data.targetBank.length; i++){
        this.bankReceptorPM.push({
          id: response.data.targetBank[i].cbanco_destino,
          value: response.data.targetBank[i].xbanco,
        })        
      }


    })

    //bancos custodia

    let bankReceptorCustodia = {
      ctipopago: 7
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', bankReceptorCustodia ).subscribe((response: any) => {
      for(let i = 0; i < response.data.targetBank.length; i++){
        this.bankReceptorCustodia.push({
          id: response.data.targetBank[i].cbanco_destino,
          value: response.data.targetBank[i].xbanco,
        })        
      }


    })

    let extranjero = {
      itipo: 'e'
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/bank', extranjero).subscribe((response: any) => {
      for(let i = 0; i < response.data.bank.length; i++){
        this.bankInternational.push({
          id: response.data.bank[i].cbanco,
          value: response.data.bank[i].xbanco,
        })        
      }
    })

    let venezolano = {
      itipo: 'v'
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/bank', venezolano).subscribe((response: any) => {
      for(let i = 0; i < response.data.bank.length; i++){
        this.bankNational.push({
          id: response.data.bank[i].cbanco,
          value: response.data.bank[i].xbanco,
        })        
      }
    })


    fetch(environment.apiUrl + '/api/v1/collection/search-notification' )
    .then((response) => response.json())
    .then(data => {
        // Obtener la referencia al FormArray transactions
        const transactionsArray = this.groupReceiptsForm.get("agrupado") as FormArray
        
        data.searchPaymentReport.forEach((transaction: any) => {
          let dateNotification = new Date(transaction.freporte);
          let fechaISOHasta = dateNotification.toISOString().substring(0, 10);

          const transactionGroup = this._formBuilder.group({
            id: transaction.ctransaccion,
            ctransaccion: transaction.ctransaccion,
            iestadorec : '',
            xobservacion : '',
            mdiferencia : '',
            idiferencia : '',
            cmoneda : '',
            recibo: '',
            xcorreo:transaction.xcorreo,
            freporte:fechaISOHasta,
            casegurado: transaction.casegurado,
            xcliente: transaction.xcliente,
            iestado: transaction.iestado,
            iestado_tran: transaction.iestado_tran,
            cdoccob: transaction.cdoccob,
            monto_transaccion: transaction.monto_transaccion,
            monto_transaccion_ext: transaction.monto_transaccion_ext,
            diferencia_saldo:transaction.diferencia_saldo,
            msaldodif:transaction.msaldodif,
            tasa_saldo:transaction.tasa_saldo,
            cmoneda_dif:transaction.cmoneda_dif,   
            ptasamon: transaction.ptasamon,
            poliza: this._formBuilder.array([]),
            recibos: this._formBuilder.array([])
          });

          const polizaArray = transactionGroup.get('poliza') as FormArray;
          transaction.poliza.forEach((poliza:any) => {
            polizaArray.push(this._formBuilder.group({
              crecibo: poliza.crecibo,
              cnrecibo: poliza.cnrecibo,
              cpoliza: poliza.cpoliza,
              cnpoliza: poliza.cnpoliza,
              cuotas : poliza.cuotas,
              mmontorec: poliza.mmontorec,
              mmontorecext: poliza.mmontorecext,
              iestadorec: poliza.iestadorec,
              cramo: poliza.cramo, 
              xramo: poliza.xramo, 
              cplan: poliza.cplan,
              codigo_corredor : poliza.codigo_corredor,
              corredor : poliza.corredor,
              mdiferencia: poliza.mdiferencia,
              mdiferenciaext: poliza.mdiferenciaext,
              idiferencia: poliza.idiferencia,
              tasa_diferencia: poliza.tasa_diferencia,
              xobservacion: poliza.xobservacion,
              estado_diferencia: poliza.estado_diferencia,
              freport_pago: poliza.freport_pago,
              moneda_cobro_diferencia: poliza.moneda_cobro_diferencia, 

            }));
          });
      
          // Llenar la sección 'recibos' del formulario
          const recibosArray = transactionGroup.get('recibos') as FormArray;
          transaction.recibos.forEach((recibo:any) => {

            const imageUrl = recibo.xruta;
            const fullImageUrl = this.getImage(imageUrl);
            const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullImageUrl);

            recibosArray.push(this._formBuilder.group({
              ctransaccion: recibo.ctransaccion,
              cbanco_destino: recibo.cbanco_destino,
              cbanco_origen: recibo.cbanco_origen,
              npago: recibo.npago,
              cmoneda: recibo.cmoneda,
              ptasamon: recibo.ptasamon,
              monto_declarado: recibo.mpago,
              monto_declarado_ext: recibo.monto_declarado_ext, 
              mpagoigtf: recibo.mpagoigtf,
              mpagoigtfext : recibo.mpagoigtfext,
              xreferencia : recibo.xreferencia,
              xruta: safeImageUrl,
            }));

          });

          // Agregar el FormGroup principal al FormArray transactions
          transactionsArray.push(transactionGroup);


        });

        let sumaMpago = 0;
        let sumaMpagoExt = 0;

        // Iterar sobre cada objeto en el array
        data.searchPaymentReport.forEach((objeto:any) => {
            // Iterar sobre los recibos de cada objeto
            objeto.recibos.forEach((recibo:any) => {
                // Sumar el valor de mpago al total
                sumaMpago += recibo.mpago;
            });
        });

        data.searchPaymentReport.forEach((objeto:any) => {
          // Iterar sobre los recibos de cada objeto
          objeto.recibos.forEach((recibo:any) => {
              // Sumar el valor de mpago al total
              sumaMpagoExt += recibo.monto_declarado_ext;
          });
      });

      this.totalNotificated = sumaMpago.toFixed(2)
      this.totalNotificatedExt = sumaMpagoExt.toFixed(2)

    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();
  }

  getImage(imageUrl: string): string {
    return environment.apiUrl + '/api/get-document/' + imageUrl;
  }

  Alert(config?: MatDialogConfig) {
    return this.dialog.open(this.InfoReceipt, config);
  }


  async dataPendient(recibo : any,asegurado : any){
    this.nrecibo = recibo
    this.asegurado = asegurado
    fetch(environment.apiUrl + '/api/v1/collection/search-receipt-data/' + recibo)
    .then((response) => response.json())
    .then(data => {

      this.dataReceiptPending = []
      for(let i = 0; i < data.searchReceiptClientData.recibo.length; i++){

        let id = data.searchReceiptClientData.recibo[i].cramo
        let treatments = this.tradesList
        let filterdata = treatments.filter((data: { id: any; }) => data.id == id)
        const xramo = filterdata[0].value

        //fecha desde recibo
          let dateDReceip = new Date(data.searchReceiptClientData.recibo[i].fdesde );
          let fechaISODesde = dateDReceip.toISOString().substring(0, 10);


        //fecha hasta recibo
          let dateHReceip = new Date(data.searchReceiptClientData.recibo[i].fhasta );
          let fechaISOHasta = dateHReceip.toISOString().substring(0, 10);

        this.dataReceiptPending.push({
          cmoneda : data.searchReceiptClientData.recibo[i].cmoneda ,
          cnpoliza : data.searchReceiptClientData.recibo[i].cnpoliza ,
          cnrecibo : data.searchReceiptClientData.recibo[i].cnrecibo ,
          cpoliza : data.searchReceiptClientData.recibo[i].cpoliza ,
          cramo : data.searchReceiptClientData.recibo[i].cramo + ' - ' + xramo,
          crecibo : data.searchReceiptClientData.recibo[i].crecibo ,
          fanopol : data.searchReceiptClientData.recibo[i].fanopol ,
          fdesde : fechaISODesde ,
          fdesde_pol : data.searchReceiptClientData.recibo[i].fdesde_pol ,
          fhasta : fechaISOHasta ,
          fhasta_pol : data.searchReceiptClientData.recibo[i].fhasta_pol ,
          fmespol : data.searchReceiptClientData.recibo[i].fmespol ,
          mprimabruta : data.searchReceiptClientData.recibo[i].mprimabruta ,
          mprimabrutaext : data.searchReceiptClientData.recibo[i].mprimabrutaext ,
          qcuotas : data.searchReceiptClientData.recibo[i].qcuotas
        })

        this.dataReceiptPendingB.push({
          cmoneda : data.searchReceiptClientData.recibo[i].cmoneda ,
          cnpoliza : data.searchReceiptClientData.recibo[i].cnpoliza ,
          cnrecibo : data.searchReceiptClientData.recibo[i].cnrecibo ,
          cpoliza : data.searchReceiptClientData.recibo[i].cpoliza ,
          cramo : data.searchReceiptClientData.recibo[i].cramo,
          crecibo : data.searchReceiptClientData.recibo[i].crecibo ,
          fanopol : data.searchReceiptClientData.recibo[i].fanopol ,
          fdesde : fechaISODesde ,
          fdesde_pol : data.searchReceiptClientData.recibo[i].fdesde_pol ,
          fhasta : fechaISOHasta ,
          fhasta_pol : data.searchReceiptClientData.recibo[i].fhasta_pol ,
          fmespol : data.searchReceiptClientData.recibo[i].fmespol ,
          mprimabruta : data.searchReceiptClientData.recibo[i].mprimabruta ,
          mprimabrutaext : data.searchReceiptClientData.recibo[i].mprimabrutaext ,
          qcuotas : data.searchReceiptClientData.recibo[i].qcuotas
        })

      }

      fetch(environment.apiUrl + '/api/v1/collection/search-client/' + asegurado)
      .then((response) => response.json())
      .then(data => {
        for(let i = 0; i < data.searchClientData.cliente.length; i++){
          this.cliente = data.searchClientData.cliente[i].xcliente
          this.telefono = data.searchClientData.cliente[i].xtelefono
          this.correo = data.searchClientData.cliente[i].xemail

        }
  
  
      })

    })


    this.Alert()
  }

  async alerUpdateReceipt(config?: MatDialogConfig) {
    return this.dialog.open(this.Alerta1, config);
  }

  updateReceiptNotificated(i : any){

    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    if(creds.at(i).get('iestadorec')?.value == 'ER' ){

      let data = {}
      
      if(creds.at(i).get('cmoneda')?.value == 'BS'){
        let monto = creds.at(i).get('mdiferencia')?.value / this.bcv
        data = {
          transaccion : creds.at(i).get('id')?.value,
          xobservacion: creds.at(i).get('xobservacion')?.value,
          mdiferencia: creds.at(i).get('mdiferencia')?.value,
          mdiferenciaext: monto,
          iestadorec: creds.at(i).get('iestadorec')?.value,
          casegurado : creds.at(i).get('casegurado')?.value,
          cliente : creds.at(i).get('xcliente')?.value,
          recibo : creds.at(i).get('recibo')?.value,
          correo : creds.at(i).get('xcorreo')?.value,
          cmoneda : creds.at(i).get('cmoneda')?.value,
          idiferencia : creds.at(i).get('idiferencia')?.value,
          tasa : this.bcv,
          cusuario : this.usuario,
          fcobro : new Date(),



        }

      }else{
        let monto = creds.at(i).get('mdiferencia')?.value * this.bcv
        data = {
          transaccion : creds.at(i).get('id')?.value,
          xobservacion: creds.at(i).get('xobservacion')?.value,
          mdiferenciaext: creds.at(i).get('mdiferencia')?.value,
          mdiferencia: monto,
          correo : creds.at(i).get('xcorreo')?.value,
          iestadorec: creds.at(i).get('iestadorec')?.value,
          casegurado : creds.at(i).get('casegurado')?.value,
          cliente : creds.at(i).get('xcliente')?.value,
          recibo : creds.at(i).get('recibo')?.value,
          cmoneda : creds.at(i).get('cmoneda')?.value,
          idiferencia : creds.at(i).get('idiferencia')?.value,
          tasa : this.bcv,
          cusuario : this.usuario,
          fcobro : new Date(),


        }

      }

      this.http.post(environment.apiUrl + '/api/v1/collection/receipt-under-review/', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })

    }
    else if(creds.at(i).get('iestadorec')?.value == 'CS' ){
      let data = {
        transaccion : creds.at(i).get('id')?.value,
        iestadorec: 'C',
        fcobro : new Date(),
        casegurado : creds.at(i).get('casegurado')?.value,
        msaldodif: creds.at(i).get('mdiferencia')?.value,
        cmoneda_dif: creds.at(i).get('cmoneda')?.value,
        cliente : creds.at(i).get('xcliente')?.value,
        correo : creds.at(i).get('xcorreo')?.value,
        idiferencia : "H",
        detalle : creds.at(i).get('poliza')?.value,
        ptasamon : this.bcv,
        cusuario : this.usuario,

      }
      this.http.patch(environment.apiUrl + '/api/v1/collection/update-receipt-positive-balance', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })
    }
    else if(creds.at(i).get('iestadorec')?.value == 'C' ){
      const data = {
        transaccion : creds.at(i).get('id')?.value,
        iestadorec: creds.at(i).get('iestadorec')?.value,
        casegurado : creds.at(i).get('casegurado')?.value,
        correo : creds.at(i).get('xcorreo')?.value,
        cliente : creds.at(i).get('xcliente')?.value,
        fpago : creds.at(i).get('freporte')?.value,
        detalle : creds.at(i).get('poliza')?.value,
        cusuario : this.usuario,
        fcobro : new Date(),


      }
      this.http.patch(environment.apiUrl + '/api/v1/collection/update-receipt/', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })
    }

  }

  validateMov(i : any){

    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    if(creds.at(i).get('iestadorec')?.value == 'ER'){
      this.revision = true
      this.cobradoSAF = false
    }
    
    else if(creds.at(i).get('iestadorec')?.value == 'CS'){
      this.cobradoSAF = true
      this.revision = false    }
    else{
      this.revision = false

    }

  }


  changeError(){
    this.error = false 

  }


}
