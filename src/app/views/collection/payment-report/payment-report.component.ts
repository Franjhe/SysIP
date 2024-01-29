import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  selectedFiles?: FileList;
  currentFile?: File;

  viewData : boolean = false
  viewBank : boolean = false
  paymentMix : boolean = false

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
  backReceptors : any = []
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
  });

  diferenceBool :boolean = false;
  messageDiference : any

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

  newTransfer(): FormGroup {
    return this._formBuilder.group({
      cmoneda : '',
      cbanco : '',
      cbanco_destino : '',
      mpago : '',
      mpagoext : '',
      ptasamon : '',
      ptasaref : '',
      freporte : '',
      xreferencia : '',
      ximagen :'',
     })
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

  }

  newPayment(): FormGroup {
    return this._formBuilder.group({
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
    })
  }
  
  addPayment() {
    this.transfer.push(this.newPayment());

    const trasnfer = this.searchReceipt.get("transfer") as FormArray

    if(trasnfer.length > 0){
      this.paymentMix = true
    }else{
      this.paymentMix = false
    }
  }

  removePayment(i:number) {
    this.transfer.removeAt(i);

    const trasnfer = this.searchReceipt.get("transfer") as FormArray

    if(trasnfer.length > 0){
      this.paymentMix = true
    }else{
      this.paymentMix = false
    }

  }
  
  searchDataReceipt(){
    const client = {
      cedula: this.searchReceipt.get('xcedula')?.value 
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


      if(response.searchReceipt.receipt.length > 0){
        for(let i = 0; i < response.searchReceipt.receipt.length; i++){
          this.viewData = true
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


          this.receipt.push(
            this._formBuilder.group({
              cnpoliza: response.searchReceipt.receipt[i].cnpoliza,
              cnrecibo: response.searchReceipt.receipt[i].cnrecibo,
              crecibo: response.searchReceipt.receipt[i].crecibo,
              cpoliza: response.searchReceipt.receipt[i].cpoliza,
              fanopol: response.searchReceipt.receipt[i].fanopol,
              fmespol: response.searchReceipt.receipt[i].fmespol,
              cramo: response.searchReceipt.receipt[i].cramo,
              xramo : xramo ,
              cmoneda: response.searchReceipt.receipt[i].cmoneda,
              fdesde_pol: ISOFdesdePol,
              fhasta_pol: ISOFhastaPol,
              fdesde_rec: ISOFdesdeP,
              fhasta_rec: ISOFhastaP,
              mprimabruta: response.searchReceipt.receipt[i].mprimabruta,
              mprimabrutaext: response.searchReceipt.receipt[i].mprimabrutaext,
              ptasamon: response.searchReceipt.receipt[i].ptasamon,
              seleccionado : false,

            })
          )
        }
        for(let i = 0; i < response.searchReceipt.client.length; i++){

          this.cliente = response.searchReceipt.client[i].xcliente
        } 
        
        if(response.searchReceipt.diferenceList.length > 0){

          this.diferenceBool = true
          for(let i = 0; i < response.searchReceipt.diferenceList.length; i++){

            this.messageDiference = 'El cliente posee ' + response.searchReceipt.diferenceList[i].mdiferencia + ' ' + response.searchReceipt.diferenceList[i].cmoneda + ' de diferencia ,por concepto de : '  +response.searchReceipt.diferenceList[i].xobservacion
          } 
        }else{
          this.diferenceBool = false
          this.messageDiference = ''

        }

        this.addPayment()

      }else{

        this.Found()
      }

    });



  }

  calculateMount(i :any){
    const creds = this.searchReceipt.get("receipt") as FormArray

    const sumaTotal = creds.value.reduce((acumulador: any, recibo: { seleccionado: any; mprimabrutaext: any; }) => {
      if (recibo.seleccionado) {
          acumulador += recibo.mprimabrutaext;
      }
      return acumulador;
    }, 0);

    this.mount = sumaTotal //suma de los dolares brutos

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

  Alert(config?: MatDialogConfig) {

    return this.dialog.open(this.Alerta, config);

  }

  Found(config?: MatDialogConfig) {

    return this.dialog.open(this.NotFound, config);

  }


  modalTransfer(config?: MatDialogConfig) {
    this.changeStatusTrans()
    return this.dialog.open(this.Transfer, config);

  }

  modalDeposit(config?: MatDialogConfig) {
    this.changeStatusTransCustodia()
    return this.dialog.open(this.Deposit, config);

  }

  modalPagoMovil(config?: MatDialogConfig) {
    this.changeStatusPm()
    return this.dialog.open(this.PagoMovil, config);

  }

  modalDepositoUSD(config?: MatDialogConfig) {
    this.changeStatusUSD()
    return this.dialog.open(this.DepositoUSD, config);

  }

  validateMount(i : number ){
    const creds = this.searchReceipt.get("transfer") as FormArray
    const mountDeclare = creds.at(i).get('mpago')?.value

    if(this.paymentMix){


    }else{
      if(creds.at(i).get('cmoneda')?.value == "$   "){

        if(mountDeclare < this.mount ){
          this.toast.open('El monto no puede ser menor al estimado de pago, valide su seleccion de recibos o ingrese el monto correcto', '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-toast']
          }); 
          
          creds.at(i).get('mpago')?.setValue('')
  
        }
  
      }
      if(creds.at(i).get('cmoneda')?.value == ""){
  
        creds.at(i).get('mpago')?.setValue('')
  
        this.toast.open('Debe seleccionar una moneda antes de proceder a registrar su monto', '', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['error-toast']
        }); 
      }
      if(creds.at(i).get('cmoneda')?.value == "BS  "){
  
        if(mountDeclare < this.mountBs ){
          this.toast.open('El monto no puede ser menor al estimado de pago, valide su seleccion de recibos o ingrese el monto correcto', '', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-toast']
          }); 
          
          creds.at(i).get('mpago')?.setValue('')
    
        }
  
      }
    }




  }

  validateCoin(i : number ){

    const creds = this.searchReceipt.get("transfer") as FormArray

    const mountDeclare = creds.at(i).get('cmoneda')?.value!

    if(mountDeclare == '$' || mountDeclare == 'EUR' ){
        this.viewBank = false 
    } else {
      this.viewBank = true 
    }

    if(creds.at(i).get('mpago')?.value){
      creds.at(i).get('mpago')?.setValue('')
    }

  }


  onFileSelect(event : any , i : number){

    const file = event.target.files[0]

    const creds = this.searchReceipt.get("transfer") as FormArray

    creds.at(i).get('ximagen')?.setValue(file);

  }

  async llenarlistas(){

    const receipt = this.searchReceipt.get("receipt") as FormArray

    this.receiptList = []

    console.log(this.receiptList)

    for(let i = 0; i < receipt.length; i++){
      if(receipt.value[i].seleccionado == true){
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
          ptasamon: receipt.value[i].ptasamon,

        });
      }

    }   
    
  }

  async onSubmit(){

    this.llenarlistas()

    const transfer = this.searchReceipt.get("transfer") as FormArray

    const fecha = new Date()
    const savePaymentTrans = {
      receipt : this.receiptList,
      casegurado: this.searchReceipt.get('xcedula')?.value,
      mpago : this.mountBs,
      mpagoext : this.mountIGTF,
      ptasamon : this.bcv,
      freporte : fecha ,
      cprog : 'Reporte de pago web',
      cusuario : 13,
      iestadorec : 'N',
      ifuente : 'Web_Sys',
      iestado : 0,
      ccategoria : this.searchReceipt.get('ccategoria')?.value,
    }
    //primero llenamos el recipo y la tabla de transacciones 
    this.http.post(environment.apiUrl + '/api/v1/collection/create-trans',savePaymentTrans).subscribe(async (response: any) => {

      const transaccion = response.ctransaccion.result

      //obtenemos el codigo de transaccion 
      if(transaccion){

        for(let i = 0; i < transfer.length; i++){

          const formData = new FormData();
          formData.append('file', transfer.at(i).get('ximagen')?.value!);
      
          //cargamos las imagenes con el codigo de transaccion
          this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((response: any) => {
              const rutaimage  =  response.uploadedFile.filename //ruta de imagen por registro 

              if(transfer.at(i).get('cmoneda')?.value == "USD" ){
                this.transferList.push({
                  cmoneda: transfer.value[i].cmoneda,
                  cbanco: transfer.value[i].cbanco,
                  cbanco_destino: transfer.value[i].cbanco_destino,
                  mpago: this.mountBs,
                  mpagoext: this.mount,
                  mpagoigtf: this.mountBsP,
                  mpagoigtfext: this.mountP ,
                  mtotal: this.mountBsExt,
                  mtotalext: this.mountIGTF,
                  ptasamon: this.bcv,
                  ptasaref: 0,        
                  xreferencia: transfer.value[i].xreferencia,
                  ximagen: rutaimage,
                });
              }
              if(transfer.at(i).get('cmoneda')?.value == "Bs"){
                this.transferList.push({
                  cmoneda: transfer.value[i].cmoneda,
                  cbanco: transfer.value[i].cbanco,
                  cbanco_destino: transfer.value[i].cbanco_destino,
                  mpago: this.mountBs,
                  mpagoext: this.mount,
                  mpagoigtf: 0,
                  mpagoigtfext: 0 ,
                  mtotal:this.mountBs,
                  mtotalext: this.mount,
                  ptasaref: 0,
                  ptasamon: this.bcv,        
                  xreferencia: transfer.value[i].xreferencia,
                  ximagen: rutaimage,
                });
              }

              const reporData = {
                report : this.transferList,
                ctransaccion : transaccion,
                casegurado: this.searchReceipt.get('xcedula')?.value,

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

        }



        await this.toast 
      }



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
  }



}
