import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  dataSource = new MatTableDataSource<any> ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Pending') Pending!: TemplateRef<any>;


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
  listDiference : any = []

  lisDiferenceClient: any 
  listDetalle: any
  listSoport : any = []


  diference : boolean = false

  listReceipts  : any = []
  boollistReceipts: boolean = false
  GroupReceiptsBool : boolean = false


  groupReceiptsForm = this._formBuilder.group({
    agrupado : this._formBuilder.array([])
  });

  get agrupado() : FormArray {
    return this.groupReceiptsForm.get("agrupado") as FormArray
  }

  updateReceipt = this._formBuilder.group({
    iestadorec: [{ value: '', disabled: false }],
    mdiferencia :[{ value: '', disabled: false }],
    iestado_tra : [{ value: '', disabled: false }],
    xobservacion: [{ value: '', disabled: false }],
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
    iestadorec: '',
  });


  constructor( private _formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,

    ) {
   }

  ngOnInit(){

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
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


    fetch(environment.apiUrl + '/api/v1/collection/search-pending' )
    .then((response) => response.json())
    .then(data => {
      this.listPending = data.searchPaymentPendingData.recibo
      this.dataSource = new MatTableDataSource(data.searchPaymentPendingData.recibo);

      const listPending = data.searchPaymentPendingData.recibo

      const sumaTotal = listPending.reduce((acumulador: any, recibo: { mprimabrutaext: any; }) => {
 
        acumulador += recibo.mprimabrutaext;
        
        return acumulador;
      }, 0);

      this.totalPending = sumaTotal.toFixed(2)

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    })


    fetch(environment.apiUrl + '/api/v1/collection/search-vencido' )
    .then((response) => response.json())
    .then(data => {
      this.listVencido = data.searchPaymentData.recibo
    })


    fetch(environment.apiUrl + '/api/v1/collection/search-collected' )
    .then((response) => response.json())
    .then(data => {

      this.listCollectedReport = data.searchPaymentCollected.recibo
      console.log(this.listCollectedReport.length)

    })


    fetch(environment.apiUrl + '/api/v1/collection/search-notification' )
    .then((response) => response.json())
    .then(data => {

      for(let i = 0; i < data.searchPaymentReport.searchDataNotifiqued.dataTransaction.length; i++){

        let dateNotification = new Date(data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.freporte);
        let fechaISOHasta = dateNotification.toISOString().substring(0, 10);

        this.listDetalle = []
        this.lisDiferenceClient= []
        this.listSoport = []


        for(let j = 0; j < data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle.length; j++){

          let idTrades = data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].cramo 
          let trades = this.tradesList
          let filterTRades = trades.filter((data: { id: any; }) => data.id == idTrades)
          const tradesValue = filterTRades[0].value

          this.listDetalle.push({
              crecibo: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].crecibo ,
              cpoliza: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].cpoliza ,
              cramo: tradesValue ,
              mprimabrutaext: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].mprimabrutaext ,
              mprimabruta: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].mprimabruta ,
              fhasta_rec: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].fhasta_rec ,
          })

          this.dataReportB.push({
            crecibo: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].crecibo ,
            cpoliza: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].cpoliza ,
            cramo: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].cramo,
            casegurado: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].casegurado,
            mprimabrutaext: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].mprimabrutaext ,
            mprimabruta: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].mprimabruta ,
            fhasta_rec: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].detalle[j].fhasta_rec ,
          })

        }
        
        for(let j = 0; j < data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte.length; j++){

          //banco destino
          let idBank = data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].cbanco_destino
          let bank = this.bankNational
          let filterBank = bank.filter((data: { id: any; }) => data.id == idBank)
          const bankValue = filterBank[0].value

          //banco emisor
          let idBankEmi = data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].cbanco
          let bankEmi = this.bankNational
          let filterBankEmi = bankEmi.filter((data: { id: any; }) => data.id == idBankEmi)
          const bankValueEmi = filterBankEmi[0].value

          const imageUrl = data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].xruta;
          const fullImageUrl = this.getImage(imageUrl);

          const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullImageUrl);


          this.listSoport.push({
            cbanco: bankValueEmi,
            cbanco_destino: bankValue ,
            cmoneda: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].cmoneda ,
            mpago: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].mpago ,
            mpagoext: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].mpagoext ,
            mpagoigtf: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].mpagoigtf ,
            mpagoigtfext: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].mpagoigtfext ,
            ptasamon: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].ptasamon ,
            ptasaref: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].ptasaref ,
            xreferencia: data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].soporte[j].xreferencia ,
            ximagen: safeImageUrl,
          })

        }

        if(data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].diference.length > 0){
          this.diference = true
          this.lisDiferenceClient = data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].diference
          
        }
        else{
          this.diference = false

        }

        this.agrupado.push(
          this._formBuilder.group({
            id :data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.id,
            casegurado :data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.casegurado,
            freporte :fechaISOHasta,
            iestado_tran :data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.iestado_tran,
            mpagoext :data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.mpagoext,
            mpago :data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.mpago,
            ptasamon :data.searchPaymentReport.searchDataNotifiqued.dataTransaction[i].transaccion.ptasamon,
            detalle : this.listDetalle,
            soporte : this.listSoport,
            diference : this.lisDiferenceClient,
            agrupador:false,
            iestadorec : '',
            xobservacion : '',
            mdiferencia : '',
            diferenceBool : this.diference
          })
        )


      }

      const listNotificate = data.searchPaymentReport.searchDataNotifiqued.dataTransaction


      const sumaMpagoext = listNotificate.reduce((total: any, item: any ) => total + item.transaccion.mpagoext, 0);


      this.totalNotificated = sumaMpagoext.toFixed(2)


    })



  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  async PendindAlert(config?: MatDialogConfig) {
    return this.dialog.open(this.Pending, config);
  }

  updateReceiptNotificated(i : any){

    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    if(creds.at(i).get('iestadorec')?.value == 'ER' ){
      const data = {
        transacccion : creds.at(i).get('id')?.value,
        xobservacion: creds.at(i).get('xobservacion')?.value,
        mdiferencia: creds.at(i).get('mdiferencia')?.value,
        iestadorec: creds.at(i).get('iestadorec')?.value,
        casegurado : creds.at(i).get('casegurado')?.value,
      }
      this.http.post(environment.apiUrl + '/api/v1/collection/receipt-under-review/', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })

    }else if(creds.at(i).get('iestadorec')?.value !== 'ER' ){
      const data = {
        receipt : this.dataReportB,
        transacccion : creds.at(i).get('id')?.value,
        iestadorec: creds.at(i).get('iestadorec')?.value,
      }
      this.http.patch(environment.apiUrl + '/api/v1/collection/update-receipt/', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })
    }


  }

  saveUpdateReceiptPending(){

    const fecha = new Date()
    const savePaymentTrans = {
      receipt : this.dataReceiptPendingB,
      casegurado: this.asegurado,
      mpago : this.mountBs,
      mpagoext : this.mountIGTF,
      ptasamon : this.bcv,
      freporte : fecha ,
      cprog : 'Cobranza web',
      cusuario : 13,
      iestadorec : 'C',
      iestado : 1,
      ifuente : 'Web_Sys',
    }

        //primero llenamos el recipo y la tabla de transacciones 
        this.http.post(environment.apiUrl + '/api/v1/collection/create-trans',savePaymentTrans).subscribe(async (response: any) => {

          const transaccion = response.ctransaccion.result
    
          //obtenemos el codigo de transaccion 
          if(transaccion){
  
              const formData = new FormData();
              formData.append('file', this.updateReceiptPending.get('ximagen')?.value!);
          
              //cargamos las imagenes con el codigo de transaccion
              this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((response: any) => {
                  const rutaimage  =  response.uploadedFile.filename //ruta de imagen por registro 
    
                  console.log(this.updateReceiptPending)
                  if(this.updateReceiptPending.get('cmoneda')?.value == "USD" ){
                    this.transferList.push({
                      cmoneda:  this.updateReceiptPending.get('cmoneda')?.value,
                      cbanco: this.updateReceiptPending.get('cbanco')?.value,
                      cbanco_destino:  this.updateReceiptPending.get('cbanco_destino')?.value,
                      mpago: this.mountBs,
                      mpagoext: this.mount,
                      mpagoigtf: this.mountBsP,
                      mpagoigtfext: this.mountP ,
                      mtotal: this.mountBsExt,
                      mtotalext: this.mountIGTF,
                      ptasamon: this.bcv,
                      ptasaref: 0,        
                      xreferencia:  this.updateReceiptPending.get('xreferencia')?.value!,
                      ximagen: rutaimage,
                    });
                  }
                  if(this.updateReceiptPending.get('cmoneda')?.value == "Bs"){
                    this.transferList.push({
                      cmoneda:  this.updateReceiptPending.get('cmoneda')?.value,
                      cbanco:this.updateReceiptPending.get('cbanco')?.value,
                      cbanco_destino: this.updateReceiptPending.get('cbanco_destino')?.value,
                      mpago: this.mountBs,
                      mpagoext: this.mount,
                      mpagoigtf: 0,
                      mpagoigtfext: 0 ,
                      mtotal:this.mountBs,
                      mtotalext: this.mount,
                      ptasamon: 0,
                      ptasaref: this.bcv,       
                      xreferencia: this.updateReceiptPending.get('xreferencia')?.value!,
                      ximagen: rutaimage,
                    });
                  }
    
                  const reporData = {
                    report : this.transferList,
                    ctransaccion : transaccion,
                    casegurado: this.asegurado,
    
                  }
                  if(response.status){
                    this.http.post(environment.apiUrl + '/api/v1/collection/create-report', reporData).subscribe((response: any) => {
    
                      this.toast.open(response.message, '', {
                        duration: 5000,
                        verticalPosition: 'top',
                        panelClass: ['success-toast']
                      });  
                      location.reload()
    
                    })
    
                  }
              
              })
    
            await this.toast 
          }
    
        })   
  }

  validationOperation(){
    this.usd = true
      this.updateReceiptPending.disable()
      this.updateReceiptPending.get('itransaccion')?.enable()
      this.updateReceiptPending.get('cmoneda')?.enable()
      this.updateReceiptPending.get('mpago')?.enable()
      this.updateReceiptPending.get('ximagen')?.enable()
      this.updateReceiptPending.get('iestadorec ')?.enable()

  }

  onFileSelect(event : any ){

    const file = event.target.files[0]

    this.updateReceiptPending.get('ximagen')?.setValue(file)


  }

  calculateMount(){

    this.mount = this.updateReceipt.get('mpago')?.value //suma de los dolares brutos

    const operation = this.mount * this.bcv
    this.mountBs = operation.toFixed(2)  //dolares brutos convertidos en bolivares 

    const mountIGTF = this.mount + ((3/100)*this.mount) 
    this.mountIGTF = mountIGTF.toFixed(2) //dolares netos

    const mountBs = this.mountIGTF*this.bcv
    this.mountBsExt = mountBs.toFixed(2) //bolivares netos

    const porcentajeBs = this.bcv * ((3/100)*this.mount) 
    this.mountBsP = porcentajeBs.toFixed(2) //porcentaje del igtf en bolivares 

    const porcentaje = (3/100)*this.mount
    this.mountP = porcentaje.toFixed(2) //porcentaje del igtf en dolares  

  }

  downloadExcel() {

    // Filtra y renombra los campos que deseas exportar
    const filteredData = this.listPending.map((item: 
      { cpoliza: any; crecibo: any; cramo: any; casegurado: any; mprimabruta: any; mprimabrutaext: any}) => ({
      'Poliza': item.cpoliza,
      'Recibo': item.crecibo,
      'Ramo': item.cramo,
      'Asegurado': item.casegurado,
      'Prima Bs': item.mprimabruta,
      'Prima USD': item.mprimabrutaext,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(excelData, `Reporte de recibos pendientes solicitados.xlsx`);
  }

  downloadExcelVencido() {

    // Filtra y renombra los campos que deseas exportar
    const filteredData = this.listVencido.map((item: 
      { cpoliza: any; crecibo: any; cramo: any; casegurado: any; mprimabruta: any; mprimabrutaext: any; fhasta: any}) => ({
      'Poliza': item.cpoliza,
      'Recibo': item.crecibo,
      'Ramo': item.cramo,
      'Asegurado': item.casegurado,
      'Prima Bs': item.mprimabruta,
      'Prima USD': item.mprimabrutaext,
      'Fecha hasta recibo': item.fhasta,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(excelData, `Reporte de recibos vencidos solicitados.xlsx`);
  }

  downloadExcelCollected() {
    // Filtra y renombra los campos que deseas exportar
    const filteredData = this.listCollectedReport.map((item: 
      { cpoliza: any; crecibo: any; cramo: any; casegurado: any; mprimabruta: any; mprimabrutaext: any; fhasta: any}) => ({
      'Poliza': item.cpoliza,
      'Recibo': item.crecibo,
      'Ramo': item.cramo,
      'Asegurado': item.casegurado,
      'Prima Bs': item.mprimabruta,
      'Prima USD': item.mprimabrutaext,
      'Fecha hasta recibo': item.fhasta,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(excelData, `Reporte de recibos cobrados solicitados.xlsx`);
  }

  GroupReceipt(){
    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    for(let i = 0; i < creds.length; i++){

      const controlesConAgrupadorTrue = creds.controls.filter(control => control.get('agrupador')?.value === true);

      const cantidadConAgrupadorTrue = controlesConAgrupadorTrue.length;

      if(cantidadConAgrupadorTrue >= 2){
        this.GroupReceiptsBool = true
      }else{
        this.GroupReceiptsBool = false

      }
      
    }

  }

  updateDifferenceNotification(){

    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    const listUpdateDiferenceReceipt: any[] = []

    for(let i = 0; i < creds.length; i++){

      const controlesConAgrupadorTrue = creds.controls.filter(control => control.get('agrupador')?.value === true);

      controlesConAgrupadorTrue.forEach(control => {
        const ctransaccionValue = control.get('ctransaccion')?.value;
        // const caseguradoValue = control.get('casegurado')?.value;
        // const agrupadorValue = control.get('agrupador')?.value;
    
        listUpdateDiferenceReceipt.push(ctransaccionValue)

    });

    }

    this.http.patch(environment.apiUrl + '/api/v1/collection/update-difference-of-notification', listUpdateDiferenceReceipt).subscribe((response: any) => {
    
      this.toast.open(response.message, '', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['success-toast']
      });  
      location.reload()

    })

  }


  changeStatusPm(){
    if(this.pmovil == false){
      this.pmovil = true
    }else{
      this.pmovil = false
    }

    if(this.usd == true){
      this.usd = false
    }
    if(this.depositoUSD == true){
      this.depositoUSD = false
    }
    if(this.trans == true){
      this.trans = false
    }

    this.updateReceiptPending.enable()

    
  }

  changeStatusTrans(){
    if(this.pmovil == true){
      this.pmovil = false
    }
    if(this.usd == true){
      this.usd = false
    }
    if(this.depositoUSD == true){
      this.depositoUSD = false
    }
    if(this.trans == false){
      this.trans = true
    }
    
    this.updateReceiptPending.enable()

  }

  changeStatusTransCustodia(){
    if(this.pmovil == true){
      this.pmovil = false
    }
    if(this.usd == true){
      this.usd = false
    }
    if(this.depositoUSD == false){
      this.depositoUSD = true
    }
    if(this.trans == true){
      this.trans = false
    }
    
    this.updateReceiptPending.enable()

  }

  changeStatusUSD(){
    if(this.usd == false){
      this.usd = true
    }else{
      this.usd = false
    }

    if(this.pmovil == true){
      this.pmovil = false
    }
    if(this.depositoUSD == true){
      this.depositoUSD = false
    }
    if(this.trans == true){
      this.trans = false
    }
    this.updateReceiptPending.enable()

  }


}
