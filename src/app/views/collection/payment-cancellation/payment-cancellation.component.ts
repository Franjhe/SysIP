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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


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

  displayedColumns1: string[] = ['cedula', 'fecha', 'tasa', 'mount' , 'mountBs','validator'];
  displayedColumns2: string[] = ['poliza','recibo','cuota','ramo','asegurado', 'mount' , 'mountBs'];

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

  listDiference : any = []
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

      for(let i = 0; i < data.searchPaymentReport.searchPaymentReportN.recibo.length; i++){

                //fecha hasta recibo
        let dateNotification = new Date(data.searchPaymentReport.searchPaymentReportN.recibo[i].freporte );
        let fechaISOHasta = dateNotification.toISOString().substring(0, 10);


        this.agrupado.push(
          this._formBuilder.group({
          ctransaccion :data.searchPaymentReport.searchPaymentReportN.recibo[i].ctransaccion,
          casegurado :data.searchPaymentReport.searchPaymentReportN.recibo[i].casegurado,
          freporte :fechaISOHasta,
          mpago :data.searchPaymentReport.searchPaymentReportN.recibo[i].mpago,
          mpagoext :data.searchPaymentReport.searchPaymentReportN.recibo[i].mpagoext,
          ptasamon :data.searchPaymentReport.searchPaymentReportN.recibo[i].ptasamon,
          iestado_tran :data.searchPaymentReport.searchPaymentReportN.recibo[i].iestado_tran,
          qagrupado : data.searchPaymentReport.searchPaymentReportN.recibo[i].qagrupado,
          agrupador:false
          })
        )

      }

      
      for(let i = 0; i < data.searchPaymentReport.receipt.length; i++){

        for(let j = 0; j < data.searchPaymentReport.receipt[i].differenceOfNotification.length; i++){

          this.listDiference.push({
            crecibo : data.searchPaymentReport.receipt[i].differenceOfNotification[j].crecibo,
            mdiferencia : data.searchPaymentReport.receipt[i].differenceOfNotification[j].mdiferencia
          })      

        }

      }


      this.dataSource1 = new MatTableDataSource(this.agrupado.value);

      const listNotificate = data.searchPaymentReport.searchPaymentReportN.recibo

      const sumaTotal = listNotificate.reduce((acumulador: any, recibo: { mpagoext: any; }) => {
 
        acumulador += recibo.mpagoext;
        
        return acumulador;
      }, 0);

      this.totalNotificated = sumaTotal.toFixed(2)

    })

    fetch(environment.apiUrl + '/api/v1/collection/search-pending' )
    .then((response) => response.json())
    .then(data => {
      this.listPending = data.searchPaymentPendingData.recibo
      this.dataSource2 = new MatTableDataSource(data.searchPaymentPendingData.recibo);

      const listPending = data.searchPaymentPendingData.recibo

      const sumaTotal = listPending.reduce((acumulador: any, recibo: { mprimabrutaext: any; }) => {
 
        acumulador += recibo.mprimabrutaext;
        
        return acumulador;
      }, 0);

      this.totalPending = sumaTotal.toFixed(2)

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

    fetch(environment.apiUrl + '/api/v1/collection/search-vencido' )
    .then((response) => response.json())
    .then(data => {
      this.listVencido = data.searchPaymentData.recibo
    })

  }

  async ngAfterViewInitP(){
    this.dataSource1.paginator = this.paginator1;
    this.dataSource1.sort = this.sort1;

    this.ngAfterViewInitP();
  }

  async ngAfterViewInit(){
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
       this.listReceipts = []

      for(let i = 0; i < data.searchPaymentReport.recibo.length; i++){
        const client = {
          cedula: data.searchPaymentReport.recibo[i].casegurado
        }

        this.http.post(environment.apiUrl + '/api/v1/collection/search', client).subscribe((response: any) => {

          let id = data.searchPaymentReport.recibo[i].cramo
          let treatments = this.tradesList
          let filterdata = treatments.filter((data: { id: any; }) => data.id == id)
          const xramo = filterdata[0].value

          this.listReceipts.push(data.searchPaymentReport.recibo[i].crecibo)

          let receipt = data.searchPaymentReport.recibo[i].crecibo
          let listReceipt = this.listDiference
          let receiptOfDiference = listReceipt.filter((data: { crecibo: any; }) => data.crecibo == receipt)

          if(receiptOfDiference.length > 0) {
            this.diference = true
          }else{
            this.diference = false

          }

          this.dataReport.push({
            cpoliza : data.searchPaymentReport.recibo[i].cpoliza,
            crecibo : data.searchPaymentReport.recibo[i].crecibo,
            casegurado : response.searchReceipt.client[0].xcliente,
            cramo : data.searchPaymentReport.recibo[i].cramo +' - '+ xramo,
            mprimabrutaext : data.searchPaymentReport.recibo[i].mprimabrutaext,
            mprimabruta : data.searchPaymentReport.recibo[i].mprimabruta
          })

          this.dataReportB.push({
            cpoliza : data.searchPaymentReport.recibo[i].cpoliza,
            crecibo : data.searchPaymentReport.recibo[i].crecibo,
            casegurado : data.searchPaymentReport.recibo[i].casegurado,
            cramo : data.searchPaymentReport.recibo[i].cramo,
            mprimabrutaext : data.searchPaymentReport.recibo[i].mprimabrutaext,
            mprimabruta : data.searchPaymentReport.recibo[i].mprimabruta
          })

          if(this.listReceipts.length > 1){
            this.boollistReceipts = true
          }else {
            this.boollistReceipts = false
          }
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

  updateReceiptNotificated(){

    if(this.updateReceipt.get('iestadorec')?.value == 'ER' ){
      const data = {
        receipt : this.dataReportB,
        transacccion : this.ntransaccion,
        xobservacion: this.updateReceipt.get('xobservacion')?.value ,
        mdiferencia: this.updateReceipt.get('mdiferencia')?.value ,
        iestadorec: this.updateReceipt.get('iestadorec')?.value ,
        itransaccion: this.updateReceipt.get('itransaccion')?.value,
      }
      this.http.post(environment.apiUrl + '/api/v1/collection/receipt-under-review/', data ).subscribe((response: any) => {
        
        if(response.status){
          location.reload()
        }
  
      })

    }else{
      const data = {
        receipt : this.dataReport,
        transacccion : this.ntransaccion,
        iestadorec: this.updateReceipt.get('iestadorec')?.value ,
        itransaccion: this.updateReceipt.get('itransaccion')?.value,
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
    
                  if(this.updateReceiptPending.get('cmoneda')?.value == "$   " ){
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
                  if(this.updateReceiptPending.get('cmoneda')?.value == "BS  "){
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
    const typeOperation = this.updateReceiptPending.get('itransaccion')?.value

    if(typeOperation != "EF" ){
      this.updateReceiptPending.enable()
    }else{
      this.updateReceiptPending.disable()
      this.updateReceiptPending.get('itransaccion')?.enable()
      this.updateReceiptPending.get('cmoneda')?.enable()

    }
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


}
