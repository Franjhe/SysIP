import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, OperatorFunction , fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';


type Treatments = { id: number; value:string};

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss']
})
export class PaymentReportComponent {

  @ViewChild('Alerta') Alerta!: TemplateRef<any>;
  @ViewChild('NotFound') NotFound!: TemplateRef<any>;

  //modales de tipos de pago
  @ViewChild('Transfer') Transfer!: TemplateRef<any>;
  @ViewChild('Deposit') Deposit!: TemplateRef<any>;
  @ViewChild('PagoMovil') PagoMovil!: TemplateRef<any>;
  @ViewChild('DepositoUSD') DepositoUSD!: TemplateRef<any>;

  bcv : any
  targetBankList : any = []

  idTrans : any
  diference : boolean = false

  viewData : boolean = false
  Submit : boolean = false 
  puedeAvanzar: boolean = false 

  usd : boolean = false
  pmovil : boolean = false
  depositoUSD : boolean = false
  trans: boolean = false
  
  cliente : any
  mount : any //monto de la suma de los recibos 
  mountIGTF : any //monto con el calculo igtf 
  mountBs : any //monto en bolivares multiplicado por bcv 
  mountP : any //monto del porcentaje del igtf 
  mountBsP : any //monto en bolivares del porcentaje igtf 
  mountBsExt : any //monto en bolivares del monto total en dolares con igtf

  bankList : any = []
  tipoTrans : any = []
  backEmitter : any = []
  coinList : any = []
  receiptList : any = []
  transferList : any = []
  tradesList : any = []

  bankInternational : any = []
  bankNational: any = []

  bankReceptorInternational : any = []
  bankReceptorNational : any = []
  bankReceptorPM : any = []
  bankReceptorCustodia : any = []

  searchReceipt = this._formBuilder.group({
    receipt :  this._formBuilder.array([]),
    transfer : this._formBuilder.array([]),
    xcedula: ['', Validators.required],
    tipo_cedula: ['', Validators.required],
  });

 
  messageDiference : any = []

  listCollection : any = []


  itipo!: any ;
  amountDollar!: any ;
  amountBs!: any ;
  montoTotal!: any ;
  montoDollar!: any ;
  montoBs!: any ;
  typeOfPayList : any = []


  PositiveBalance : any
  PositiveBalanceBool :boolean = false;
  positiveBalanceBs! : number
  positiveBalanceUSD! : number




  constructor( private _formBuilder: FormBuilder,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    ) {
   }
   
  get receipt() : FormArray {
    return this.searchReceipt.get("receipt") as FormArray
  }

  get transfer() : FormArray {
    return this.searchReceipt.get("transfer") as FormArray
  }


  ngOnInit(){

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

  }

  newPayment(): FormGroup {
    return this._formBuilder.group({
      itipo : '',
      ctipopago : '',
      formapago : '',
      cmoneda:'',
      cbanco: 0,
      cbanco_destino: '',
      mpago: '',
      mpagoext: '',
      ptasamon: '',
      ptasaref: '',
      freporte: '',
      xreferencia: '',
      ximagen: '',
    })
  }
  
  addPayment() {
    this.transfer.push(this.newPayment());
  }

  removePayment(i:number) {
    this.transfer.removeAt(i);
  }
  
  searchDataReceipt(){
    let cedula = this.searchReceipt.get('tipo_cedula')?.value + '-' +  this.searchReceipt.get('xcedula')?.value 
    let aseguradoNumber = this.searchReceipt.get('xcedula')?.value 

    const client = {
      cedula: cedula ,
      asegurado : Number(aseguradoNumber)
    }

    const receipt = this.searchReceipt.get("receipt") as FormArray

    while (receipt.length !== 0) {
      receipt.removeAt(0)
    }

    const trasnfer = this.searchReceipt.controls.transfer as FormArray;

    while (trasnfer.length !== 0) {
      trasnfer.removeAt(0)
    }

    this.http.post(environment.apiUrl + '/api/v1/collection/search', client ).subscribe((response: any) => {
      
      if(response.searchReceipt.transaccion == null){
        this.idTrans = 1
      }else{
        this.idTrans = response.searchReceipt.transaccion
      }

      let sumaBS = 0;
      let sumaUSD = 0;

      response.searchReceipt.saldo.forEach((item: any) => {

        if (item.cmoneda_dif == 'BS  ') {
          sumaBS += item.msaldodif;
        }  
        if (item.cmoneda_dif == 'USD ') {
          sumaUSD += item.msaldodif;

        }
        if (item.cmoneda_dif !== null) {
          this.PositiveBalanceBool = true
        }
      });

      this.positiveBalanceBs = sumaBS
      this.positiveBalanceUSD = sumaUSD

      this.listCollection = response.searchReceipt.cobrados


      this.PositiveBalance = 'Saldo a favor en Bs ' + sumaBS + '/' + 'Saldo  en USD ' + sumaUSD
      this.viewData = false;
      this.diference = false

      if(response.searchReceipt.receipt.length > 0){
        for(let i = 0; i < response.searchReceipt.receipt.length; i++){

          const currentReceipt = response.searchReceipt.receipt[i];

          // Verificar si mdiferencia es diferente de nulo
          if (currentReceipt.mdiferencia !== null) {
            this.viewData = true; // Cambiar el estado del booleano si se encuentra un valor diferente de nulo
            this.diference = true
          }

          this.cliente = response.searchReceipt.receipt[i].xcliente

          const fdesdeP = new Date(response.searchReceipt.receipt[i].fdesde);
          let ISOFdesdeP = fdesdeP.toISOString().substring(0, 10);

          const fhastaP = new Date(response.searchReceipt.receipt[i].fhasta);
          let ISOFhastaP = fhastaP.toISOString().substring(0, 10);

          const fdesdePol = new Date(response.searchReceipt.receipt[i].fdesde_pol);
          let ISOFdesdePol = fdesdePol.toISOString().substring(0, 10);

          const fhastaPol = new Date(response.searchReceipt.receipt[i].fhasta_pol);
          let ISOFhastaPol = fhastaPol.toISOString().substring(0, 10);

          let id = response.searchReceipt.receipt[i].cramo
          let treatments = this.tradesList
          let filterdata = treatments.filter((data: { id: any; }) => data.id == id)
          const xramo = filterdata[0].value

          let messaje : string 
          if(response.searchReceipt.receipt[i].idiferencia == 'D'){
            messaje = 	'debe '
          }else if(response.searchReceipt.receipt[i].idiferencia == 'H'){
            messaje = 'a favor '
          }else{
            messaje = ''
          }
          this.receipt.push(
            this._formBuilder.group({
              cnpoliza: response.searchReceipt.receipt[i].cnpoliza,
              cnrecibo: response.searchReceipt.receipt[i].cnrecibo,
              crecibo: response.searchReceipt.receipt[i].crecibo,
              cpoliza: response.searchReceipt.receipt[i].cpoliza,
              fanopol: response.searchReceipt.receipt[i].fanopol,
              fmespol: response.searchReceipt.receipt[i].fmespol,
              cramo: response.searchReceipt.receipt[i].cramo,
              cproductor : response.searchReceipt.receipt[i].cproductor,
              qcuotas : response.searchReceipt.receipt[i].qcuotas,
              xramo : xramo ,
              cmoneda: response.searchReceipt.receipt[i].cmoneda,
              fdesde_pol: ISOFdesdePol,
              fhasta_pol: ISOFhastaPol,
              fdesde_rec: ISOFdesdeP,
              fhasta_rec: ISOFhastaP,
              mprimabruta: response.searchReceipt.receipt[i].mmontorec ,
              mprimabrutaext: response.searchReceipt.receipt[i].mmontorecext ,
              ptasamon: response.searchReceipt.receipt[i].ptasamon,
              seleccionado : false,
              mdiferenciaext: response.searchReceipt.receipt[i].mdiferenciaext,
              mdiferencia: response.searchReceipt.receipt[i].mdiferencia,
              xobservacion: response.searchReceipt.receipt[i].xobservacion,
              idiferencia: messaje,
              cdoccob: response.searchReceipt.receipt[i].cdoccob,
              asegurado : Number(aseguradoNumber)
            })
          )


          let messajeCliente : string 
          let class_text: string 
          if(response.searchReceipt.receipt[i].idiferencia == 'D'){
            messajeCliente = 	'debe '
            class_text = 'text-danger'

            this.messageDiference.push({
              class : class_text,
              messaje: 'El cliente ' + messajeCliente + 
              response.searchReceipt.receipt[i].mdiferencia + 'Bs /' + response.searchReceipt.receipt[i].mdiferenciaext +'USD'
            })
            
          }else if(response.searchReceipt.receipt[i].idiferencia == 'H'){
            messajeCliente = 'tiene un saldo a favor de '
            class_text = 'text-success'
            this.messageDiference.push({
            class : class_text,
            messaje: 'El cliente ' + messajeCliente + 
              response.searchReceipt.receipt[i].mdiferencia + 'Bs /' + response.searchReceipt.receipt[i].mdiferenciaext +'USD'})  
            

          }

        }

        this.addPayment()

      }else{

        this.Found()
      }

    });

  }

  determinarSiPuedeAvanzar(){
    if(this.diference){

      const creds = this.searchReceipt.get("receipt") as FormArray

      creds.value.forEach((recibo:any) => {

        if(recibo.seleccionado && recibo.mdiferenciaext > 0){
          this.puedeAvanzar = true
        }
        else if(recibo.seleccionado && recibo.mdiferenciaext == null) {
          this.toast.open('Necesita pagar sus recibos que poseen diferencia para poder avanzar', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['error-toast']
          }); 
        }

      })

    }else {
      this.puedeAvanzar = true
    }
  }

  calculateMount(i :any){
    const creds = this.searchReceipt.get("receipt") as FormArray

    const sumaTotal = creds.value.reduce((acumulador: any, 
      recibo: 
      { seleccionado: any; 
        mdiferenciaext: any; 
        mprimabrutaext: any; 
        sumaBS: any; 
        sumaUSD: any; 
      }) => {

      if (recibo.seleccionado && recibo.mdiferenciaext == null) {
          acumulador += recibo.mprimabrutaext;
      }
      if(recibo.seleccionado && recibo.mdiferenciaext !== 0){
        acumulador += recibo.mdiferenciaext;
      }

      return acumulador;
    }, 0);

    this.determinarSiPuedeAvanzar()

    let mount 
    if(this.PositiveBalanceBool){      

      mount = Number(sumaTotal) - this.positiveBalanceUSD 
  
    }else{
      mount = sumaTotal
    }
  

    this.mount = mount.toFixed(2) //suma de los dolares brutos

    const operation = mount * this.bcv
    this.mountBs = operation.toFixed(2)  //dolares brutos convertidos en bolivares 

    const mountIGTF = mount + ((3/100)*mount) 
    this.mountIGTF = mountIGTF.toFixed(2) //dolares netos

    const mountBs = this.mountIGTF*this.bcv
    this.mountBsExt = mountBs.toFixed(2) //bolivares netos

    const porcentajeBs = this.bcv * ((3/100)*mount) 
    this.mountBsP = porcentajeBs.toFixed(2) //porcentaje del igtf en bolivares 

    const porcentaje = (3/100)*mount
    this.mountP = porcentaje.toFixed(2) //porcentaje del igtf en dolares  

  }

  Alert(config?: MatDialogConfig) {

    return this.dialog.open(this.Alerta, config);

  }

  Found(config?: MatDialogConfig) {

    return this.dialog.open(this.NotFound, config);

  }

  modalTransfer(config?: MatDialogConfig) {
    this.trans = true
    return this.dialog.open(this.Transfer, config);
  }

  modalDeposit(config?: MatDialogConfig) {
    this.depositoUSD = true
    return this.dialog.open(this.Deposit, config);
  }

  modalPagoMovil(config?: MatDialogConfig) {
    this.pmovil = true
    return this.dialog.open(this.PagoMovil, config);
  }

  modalDepositoUSD(config?: MatDialogConfig) {
    this.usd = true
    return this.dialog.open(this.DepositoUSD, config);
  }

  onFileSelect(event : any , i : number){

    const file = event.target.files[0]

    const creds = this.searchReceipt.get("transfer") as FormArray

    creds.at(i).get('ximagen')?.setValue(file);

  }

  async llenarlistas(){

    const receipt = this.searchReceipt.get("receipt") as FormArray

    this.receiptList = []

    for(let i = 0; i < receipt.length; i++){
      if(receipt.value[i].seleccionado == true){
        if(receipt.value[i].cdoccob > 0){
          this.idTrans = receipt.value[i].cdoccob
          this.receiptList.push({
            cnpoliza: receipt.value[i].cnpoliza,
            cnrecibo: receipt.value[i].cnrecibo,
            crecibo: receipt.value[i].crecibo,
            cpoliza: receipt.value[i].cpoliza,
            fanopol: receipt.value[i].fanopol,
            fmespol: receipt.value[i].fmespol,
            cramo: receipt.value[i].cramo,        
            cmoneda: receipt.value[i].cmoneda,
            fdesde_pol: receipt.value[i].fdesde_pol,
            fhasta_pol: receipt.value[i].fhasta_pol,
            fdesde_rec: receipt.value[i].fdesde_rec,
            fhasta_rec: receipt.value[i].fhasta_rec,
            mprimabruta: receipt.value[i].mprimabruta,
            mprimabrutaext: receipt.value[i].mprimabrutaext,
            cproductor : receipt.value[i].cproductor,
            cuotas : receipt.value[i].qcuotas,
            asegurado : receipt.value[i].asegurado,
  
          });
        }else{
          this.receiptList.push({
            cnpoliza: receipt.value[i].cnpoliza,
            cnrecibo: receipt.value[i].cnrecibo,
            crecibo: receipt.value[i].crecibo,
            cpoliza: receipt.value[i].cpoliza,
            fanopol: receipt.value[i].fanopol,
            fmespol: receipt.value[i].fmespol,
            cramo: receipt.value[i].cramo,        
            cmoneda: receipt.value[i].cmoneda,
            fdesde_pol: receipt.value[i].fdesde_pol,
            fhasta_pol: receipt.value[i].fhasta_pol,
            fdesde_rec: receipt.value[i].fdesde_rec,
            fhasta_rec: receipt.value[i].fhasta_rec,
            mprimabruta: receipt.value[i].mprimabruta,
            mprimabrutaext: receipt.value[i].mprimabrutaext,
            cproductor : receipt.value[i].cproductor,
            cuotas : receipt.value[i].qcuotas,
            asegurado : receipt.value[i].asegurado,


          });
        }

      }

    }   


    const transfer = this.searchReceipt.get("transfer") as FormArray
    let asegurado = this.searchReceipt.get('xcedula')?.value || ''
    const fecha = new Date()
    let fechaTran = fecha.toISOString().substring(0, 10);

    for(let i = 0; i < transfer.length; i++){

      const fileObject = transfer.at(i).get('ximagen')?.value!
      const fileType = fileObject.type;
      const extension = fileType.split('/').pop();
      let nombre = asegurado +'-' + fechaTran +'-'+ i + transfer.value[i].xreferencia +'.'+ extension;

      if(transfer.at(i).get('cmoneda')?.value == "USD" ){

        this.transferList.push({
          cmoneda: transfer.value[i].cmoneda,
          cbanco: transfer.value[i]?.cbanco.id,
          cbanco_destino: transfer.value[i]?.cbanco_destino.id,
          mpago: 0,
          mpagoext: transfer.value[i].mpago,
          mpagoigtf: this.mountBsP,
          mpagoigtfext: this.mountP ,
          mtotal: this.mountBsExt,
          mtotalext: this.mountIGTF,
          ptasamon: this.bcv,
          ptasaref: 0,        
          xreferencia: transfer.value[i].xreferencia,
          ximage : nombre
        });
      }
      else if(transfer.at(i).get('cmoneda')?.value == "Bs"){
        this.transferList.push({
          cmoneda: transfer.value[i].cmoneda,
          cbanco: transfer.value[i]?.cbanco.id,
          cbanco_destino: transfer.value[i]?.cbanco_destino.id,
          mpago: transfer.value[i].mpago,
          mpagoext: 0,
          mpagoigtf: 0,
          mpagoigtfext: 0 ,
          mtotal:this.mountBs,
          mtotalext: this.mount,
          ptasaref: 0,
          ptasamon: this.bcv,        
          xreferencia: transfer.value[i].xreferencia,
          ximage : nombre
        });
      }

    }
    
  }

  async onSubmit(){

    await this.llenarlistas()
    this.Submit = true
    this.searchReceipt.disable()

    let asegurado = this.searchReceipt.get('xcedula')?.value || ''
    const fecha = new Date()

    if(this.diference){

      const reporData = {
        transaccion : this.idTrans,
        freporte : fecha ,
        casegurado: this.searchReceipt.get('xcedula')?.value,
        mpago : this.mountBs,
        mpagoext : this.mountIGTF,
        ptasamon : this.bcv,
        cprog : 'Reporte de pago web',
        ifuente : 'Web_Sys',
        cusuario : 13,
        positiveBalance : this.PositiveBalanceBool,
        diference : this.diference,
        soporte : this.transferList,
        recibo : this.receiptList,
      }

      this.http.post(environment.apiUrl + '/api/v1/collection/create-report-diference', reporData).subscribe( (response: any) => {
        if (response.status) {

          this.toast.open("Registro de pago éxitoso", "Cerrar", {
            duration: 3000,
          });

        }
        this.uploadFile()
  
      })
            
      setTimeout(() => {
        location.reload();
      }, 3000);

    }else{
      const savePaymentTrans = {
        transaccion : this.idTrans,
        freporte : fecha ,
        casegurado: asegurado,
        mpago : this.mountBs,
        mpagoext : this.mountIGTF,
        ptasamon : this.bcv,
        cprog : 'Reporte de pago web',
        ifuente : 'Web_Sys',
        cusuario : 13,
        positiveBalance : this.PositiveBalanceBool,      
        diference: this.diference,
        recibo : this.receiptList,
        soporte: this.transferList,

      }

      //primero llenamos el recipo y la tabla de transacciones 
      this.http.post(environment.apiUrl + '/api/v1/collection/create-trans',savePaymentTrans).subscribe( (response: any) => {
        if (response.status) {

          this.toast.open("Registro de pago éxitoso", "Cerrar", {
            duration: 3000,
          });

        }
        this.uploadFile()
      })   
  
      setTimeout(() => {
        location.reload();
      }, 3000);
    }


  }


  uploadFile(){

    const transfer = this.searchReceipt.get("transfer") as FormArray

    let asegurado = this.searchReceipt.get('xcedula')?.value || ''
    const fecha = new Date()
    let fechaTran = fecha.toISOString().substring(0, 10);


    const formData = new FormData();
    for(let i = 0; i < transfer.length; i++){

      const fileObject = transfer.at(i).get('ximagen')?.value!
      const fileType = fileObject.type;
      const extension = fileType.split('/').pop();
      let nombre = asegurado +'-' + fechaTran +'-'+ i + transfer.value[i].xreferencia +'.'+ extension;
      formData.append('image', transfer.at(i).get('ximagen')?.value!, nombre);
  
      //cargamos las imagenes con el codigo de transaccion
      
    }
    this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((image: any) => {})
  }

  getTargetBank(i : any){
    const trasnfer = this.searchReceipt.get("transfer") as FormArray

    if(trasnfer.at(i).get('ctipopago')?.value.id == 2 ){
      this.bankList = this.bankNational
      this.targetBankList = this.bankReceptorNational
      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco')?.enable();
      trasnfer.at(i).get('cbanco_destino')?.enable();

      trasnfer.at(i).get('cbanco_destino')?.setValue('')
    }
    if(trasnfer.at(i).get('ctipopago')?.value.id == 1 ){
      this.targetBankList = this.bankReceptorInternational
      this.bankList = this.bankInternational
      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco')?.enable();
      trasnfer.at(i).get('cbanco_destino')?.enable();

      trasnfer.at(i).get('cbanco_destino')?.setValue('')
    }
    if(trasnfer.at(i).get('ctipopago')?.value.id == 3 ){
      this.bankList =  this.bankNational
      this.targetBankList = this.bankReceptorPM
      trasnfer.at(i).get('cbanco')?.enable();
      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.enable();

    }    
    if(trasnfer.at(i).get('ctipopago')?.value.id == 7 ){
      this.targetBankList = this.bankReceptorCustodia
      trasnfer.at(i).get('cbanco')?.disable();
      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.enable();

    }
  }

  validationBank(i : any){
    const trasnfer = this.searchReceipt.get("transfer") as FormArray


    if( trasnfer.at(i).get('cmoneda')?.value == 'Bs'){
      trasnfer.at(i).get('itipo')?.setValue('V')
      this.getBank(i);
    }else{
      trasnfer.at(i).get('itipo')?.setValue('E')
      this.getBank(i);
    }


  }

  getBank(i : any){
    //bancos emision
    const trasnfer = this.searchReceipt.get("transfer") as FormArray
    this.tipoTrans = []
    if(trasnfer.at(i).get('cmoneda')?.value == 'Bs' ){
      this.usd = false
      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.setValue('')
      trasnfer.at(i).get('ctipopago')?.setValue('')

      this.tipoTrans.push(
        {
        id: 2,
        value: "Tranferencias",
        },
        {
        id: 3,
        value: "Pago Movil",
        }

      )  

    }
    if(trasnfer.at(i).get('cmoneda')?.value == 'USD' ){
      this.usd = true
      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.setValue('')
      trasnfer.at(i).get('ctipopago')?.setValue('')

      this.tipoTrans.push(
        {
        id: 1,
        value: "Tranferencias USD",
        },
        {
        id: 7,
        value: "Cuenta custodia",
        }
      ) 
    }

  }

  //Treatments
  searchTreatments: OperatorFunction<string, readonly { id : any; value : any }[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term:any) => term.length >= 0),
    map((term:any) => this.bankList.filter((Treatments:any) => new RegExp(term, 'mi').test(Treatments.value)).slice(0, 10)),
  
    );
  formatterTreatments = (Treatments : Treatments) => Treatments.value;


  //Treatments
  searchBank: OperatorFunction<string, readonly { id : any; value : any }[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term:any) => term.length >= 0),
    map((term:any) => this.targetBankList.filter((Treatments:any) => new RegExp(term, 'mi').test(Treatments.value)).slice(0, 10)),
  
    );
  formatterchBank = (Treatments : Treatments) => Treatments.value;
  
  //Treatments
  searchTipo: OperatorFunction<string, readonly { id : any; value : any }[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term:any) => term.length >= 0),
    map((term:any) => this.tipoTrans.filter((Treatments:any) => new RegExp(term, 'mi').test(Treatments.value)).slice(0, 10)),
  
    );
  formatterchTipo= (Treatments : Treatments) => Treatments.value;
    

}
