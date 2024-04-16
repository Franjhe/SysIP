import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, ElementRef, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort , MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import {MatStepperModule} from '@angular/material/stepper';
import { Observable, OperatorFunction , fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';


type Treatments = { id: number; value:string};


@Component({
  selector: 'app-payment-administration',
  templateUrl: './payment-administration.component.html',
  styleUrls: ['./payment-administration.component.scss']
})
export class PaymentAdministrationComponent {

  @ViewChild('NotFound') NotFound!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<any>(true, []);

  displayedColumns: string[] = ['select','progress', 'cedula','fruit','correo'];
  dataSource = new MatTableDataSource<any> ;

  //modales de tipos de pago
  @ViewChild('Transfer') Transfer!: TemplateRef<any>;
  @ViewChild('Deposit') Deposit!: TemplateRef<any>;
  @ViewChild('PagoMovil') PagoMovil!: TemplateRef<any>;
  @ViewChild('DepositoUSD') DepositoUSD!: TemplateRef<any>;

  transaccionUnica : boolean = false

  bcv : any
  targetBankList : any = []
  selectedFiles?: FileList;
  currentFile?: File;
  typeOfPayList : any = []

  idTrans : any
  diference : boolean = false
  asegurado : any

  viewData : boolean = false
  viewBank : boolean = false
  paymentMix : boolean = false
  Submit : boolean = false 
  puedeAvanzar: boolean = false 
  image: boolean = false 

  usd : boolean = false
  pmovil : boolean = false
  depositoUSD : boolean = false
  trans: boolean = false
  
  cliente : any = {}
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
  listaNombres: any = []
  transaccion : any

  listaRecibos : any = []

  bankInternational : any = []
  bankNational: any = []

  bankReceptorInternational : any = []
  bankReceptorNational : any = []
  bankReceptorPM : any = []
  bankReceptorCustodia : any = []
  classText : any 
  searchReceipt = this._formBuilder.group({
    receipt :  this._formBuilder.array([]),
    transfer : this._formBuilder.array([]),
    xcedula: [''],
    iestadorec : [''],
    xobservacion :[''],
    mdiferencia : [''],
    idiferencia : [''],
    cmoneda :[''],
    recibo: [''],
  });

  itipo!: any ;
  amountDollar!: any ;
  amountBs!: any ;
  montoTotal!: any ;
  montoDollar!: any ;
  montoBs!: any ;
  
  diferenceBool :boolean = false;
  messageDiference : any = []

  PositiveBalance : any
  PositiveBalanceBool :boolean = false;
  correo : any

  revision : boolean = false
  cobradoSAF : boolean = false


  constructor( private _formBuilder: FormBuilder,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _stepper: MatStepperModule
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

    fetch(environment.apiUrl + '/api/v1/collection/search-pending' )
    .then((response) => response.json())
    .then(data => {
      this.dataSource = new MatTableDataSource(data.searchPaymentPendingData.recibo);
      const listPending = data.searchPaymentPendingData.recibo
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toLowerCase();
  }

  newPayment(): FormGroup {
    return this._formBuilder.group({
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
      ctipopago: '',
    })
  }
  
  addPayment() {
    this.transfer.push(this.newPayment());
  }

  removePayment(i:number) {
    this.transfer.removeAt(i);
  }
  
  searchDataReceipt(){

    const receipt = this.searchReceipt.get("receipt") as FormArray

    while (receipt.length !== 0) {
      receipt.removeAt(0)
    }

    const trasnfer = this.searchReceipt.controls.transfer as FormArray;

    while (trasnfer.length !== 0) {
      trasnfer.removeAt(0)
    }

    this.listaNombres = []

    this.selection.selected.forEach(item => {

      this.listaNombres.push({
        id: item.cci_rif,
        cedula: item.cid,
        nombre:item.xcliente,
        correo : item.xcorreo
      })

      const client = {
        cedula: item.cid,
        asegurado: item.cci_rif
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
                cliente : item.xcliente,
                asegurado: item.cci_rif,
                cdoccob: response.searchReceipt.receipt[i].cdoccob,
                sumaBS  : sumaBS,
                sumaUSD : sumaUSD,
                positiveBalance:this.PositiveBalanceBool
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
  
              this._stepper;
              
            }else if(response.searchReceipt.receipt[i].idiferencia == 'H'){
              messajeCliente = 'tiene un saldo a favor de '
              class_text = 'text-success'
              this.messageDiference.push({
              class : class_text,
              messaje: 'El cliente ' + messajeCliente + 
                response.searchReceipt.receipt[i].mdiferencia + 'Bs /' + response.searchReceipt.receipt[i].mdiferenciaext +'USD'})  
              
  
            }
  
          }
    
        }else{
  
          this.Found()
        }
  
      });
    });

    if(this.selection.selected.length == 1){
      this.transaccionUnica = true
    }

    this.addPayment()

  }

  determinarSiPuedeAvanzar(){
    const creds = this.searchReceipt.get("receipt") as FormArray
    this.listaRecibos = []
    if(this.diference){

      creds.value.forEach((recibo:any) => {

        if(recibo.seleccionado && recibo.mdiferenciaext > 0){
          this.puedeAvanzar = true
          this.listaRecibos.push({crecibo : recibo.crecibo, cnrecibo : recibo.cnrecibo});

        }
        else if(recibo.seleccionado && recibo.mdiferenciaext == null) {
          this.toast.open('Necesita pagar sus recibos que poseen diferencia para poder avanzar', '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['error-toast']
          }); 
        }

      })

    }else{
      creds.value.forEach((recibo:any) => {
        if(recibo.seleccionado){
          this.listaRecibos.push({crecibo : recibo.crecibo, cnrecibo : recibo.cnrecibo});
        }

      })
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
      if(recibo.seleccionado && recibo.sumaBS !== 0){
        let montoBolivares = recibo.sumaBS / this.bcv
        acumulador -= montoBolivares;
      }
      if(recibo.seleccionado && recibo.sumaUSD !== 0){
        acumulador -= recibo.sumaUSD;
      }
      return acumulador;
    }, 0);

    this.determinarSiPuedeAvanzar()
    let mount = sumaTotal

    this.mount = sumaTotal.toFixed(2) //suma de los dolares brutos

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

  Found(config?: MatDialogConfig) {
    return this.dialog.open(this.NotFound, config);
  }

  onFileSelect(event : any , i : number){
    this.image = true
    const file = event.target.files[0]
    const creds = this.searchReceipt.get("transfer") as FormArray
    creds.at(i).get('ximagen')?.setValue(file);

  }

  async llenarlistas(){

    const receipt = this.searchReceipt.get("receipt") as FormArray
    this.receiptList = []

    for(let i = 0; i < receipt.length; i++){
      if(receipt.value[i].seleccionado == true){
        let montoBs = receipt.value[i].mprimabrutaext * this.bcv 
        if(receipt.value[i].cdoccob > 0){
          this.idTrans = receipt.value[i].cdoccob
          this.asegurado = receipt.value[i].asegurado
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
            mprimabruta: montoBs,
            mprimabrutaext: receipt.value[i].mprimabrutaext,
            ptasamon: this.bcv ,
            cproductor : receipt.value[i].cproductor,
            asegurado : receipt.value[i].asegurado,
            cuotas : receipt.value[i].qcuotas,

  
          });
        }else{
          this.asegurado = receipt.value[i].asegurado
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
            mprimabruta: montoBs,
            mprimabrutaext: receipt.value[i].mprimabrutaext,
            ptasamon: this.bcv ,
            cproductor : receipt.value[i].cproductor,
            asegurado : receipt.value[i].asegurado,
            cuotas : receipt.value[i].qcuotas,

          });
        }

      }

    }   

    const transfer = this.searchReceipt.get("transfer") as FormArray
    if(this.selection.selected.length > 1){
      this.asegurado = 'Admin'
    }
  
    const fecha = new Date()
    let fechaTran = fecha.toISOString().substring(0, 10);
    
    for(let i = 0; i < transfer.length; i++){
      
      let nombre = ''
      
      if(this.image){
        
        const fileObject = transfer.at(i).get('ximagen')?.value!
        const fileType = fileObject.type;
        const extension = fileType.split('/').pop();
        nombre = this.asegurado +'-' + fechaTran +'-'+ i + transfer.value[i].xreferencia +'.'+ extension;
      }else{
        nombre = 'sinRefecencia'
      }

      if(transfer.at(i).get('cmoneda')?.value == "USD" ){

        this.transferList.push({
          cmoneda: transfer.value[i].cmoneda,
          cbanco: transfer.value[i]?.cbanco.id,
          cbanco_destino: transfer.value[i].cbanco_destino.id,
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
          cbanco_destino: transfer.value[i].cbanco_destino.id,
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

  bcvChange(tasa : any) {
    this.bcv = tasa;
  }

  async onSubmit(){

    await this.llenarlistas()
    this.Submit = true
    this.searchReceipt.disable()
    const fecha = new Date()

    if(this.selection.selected.length == 1){
      
      if(this.searchReceipt.get('iestadorec')?.value == 'C'){
        this.selection.selected.forEach(item => {
          const savePaymentTrans = {
          group : false,
          ctransaccion : this.idTrans,
          receipt : this.receiptList,
          report: this.transferList,
          casegurado: item.cci_rif,
          mpago : this.mountBs,
          mpagoext : this.mountIGTF,
          ptasamon : this.bcv,
          freporte : fecha ,
          cprog : 'Pg_admin',
          cusuario : 13,
          iestadorec : 'C',
          ifuente : 'Web_Sys',
          iestado : 0,
          detalle : this.receiptList,
          fpago : fecha,
          cliente : item.xcliente,
          transaccion : this.idTrans,
          correo : item.xcorreo ,
          ccategoria : this.searchReceipt.get('ccategoria')?.value,
          diference: this.diference,
          positiveBalance : this.PositiveBalanceBool
          }
  
          //primero llenamos el recipo y la tabla de transacciones 
          this.http.post(environment.apiUrl + '/api/v1/collection/collect-receipt',savePaymentTrans).subscribe( (response: any) => {
            if (response.status) {
              this.toast.open("Registro de pago éxitoso", "Cerrar", {
                duration: 3000,
              });
  
            }
            if(this.image){
              this.uploadFile()
            }  
          })   
          setTimeout(() => {
            location.reload();
          }, 3000);
  
        })
      }

      if(this.searchReceipt.get('iestadorec')?.value == 'CS'){
        this.selection.selected.forEach(item => {
          const savePaymentTrans = {
          group : false,
          msaldodif: this.searchReceipt.get('mdiferencia')?.value,
          cmoneda_dif: this.searchReceipt.get('cmoneda')?.value,
          receipt : this.receiptList,
          report: this.transferList,
          casegurado: item.cci_rif,
          mpago : this.mountBs,
          mpagoext : this.mountIGTF,
          ptasamon : this.bcv,
          freporte : fecha ,
          cprog : 'Pg_admin',
          cusuario : 13,
          iestadorec : 'C',
          ifuente : 'Web_Sys',
          iestado : 0,
          detalle : this.receiptList,
          fpago : fecha,
          cliente : item.xcliente,
          transaccion : this.idTrans,
          ctransaccion: this.idTrans,
          correo : item.xcorreo ,
          idiferencia : "H",
          }
  
          //primero llenamos el recipo y la tabla de transacciones 
          this.http.post(environment.apiUrl + '/api/v1/collection/admin-positiveBalance',savePaymentTrans).subscribe( (response: any) => {
            if (response.status) {
              this.toast.open("Registro de pago éxitoso", "Cerrar", {
                duration: 3000,
              });
  
            }
            if(this.image){
              this.uploadFile()
            }
  
          })   
          setTimeout(() => {
            location.reload();
          }, 3000);
  
        })
      }

    }else{
        const savePaymentTrans = {
        group : true,
        ctransaccion : this.idTrans,
        receipt : this.receiptList,
        report: this.transferList,
        asegurados: this.listaNombres,
        mpago : this.mountBs,
        mpagoext : this.mountIGTF,
        ptasamon : this.bcv,
        freporte : fecha ,
        cprog : 'Pg_admin',
        cusuario : 13,
        iestadorec : 'C',
        ifuente : 'Web_Sys',
        iestado : 0,
        fpago : fecha,
        transaccion : this.idTrans,
        detalle : this.receiptList,
        ccategoria : this.searchReceipt.get('ccategoria')?.value,
        // diference: this.diference,
        // positiveBalance : this.PositiveBalanceBool
        }

        //primero llenamos el recipo y la tabla de transacciones 
        this.http.post(environment.apiUrl + '/api/v1/collection/collect-receipt-group',savePaymentTrans).subscribe( (response: any) => {
          if (response.status) {
            this.toast.open("Registro de pago éxitoso", "Cerrar", {
              duration: 3000,
            });

          }
          if(this.image){
            this.uploadFile()
          }
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
      trasnfer.at(i).get('cbanco')?.enable();

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
    if(trasnfer.at(i).get('ctipopago')?.value.id == 9 ){
      trasnfer.at(i).get('cbanco')?.disable();
      trasnfer.at(i).get('cbanco_destino')?.disable()
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

      this.tipoTrans.push(
        {
        id: 2,
        value: "Tranferencias",
        },
        {
        id: 3,
        value: "Pago Movil",
        },
        {
        id: 9,
        value: "Efectivo",
        }
      )   

      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.setValue('')
      trasnfer.at(i).get('ctipopago')?.setValue('')

    }
    if(trasnfer.at(i).get('cmoneda')?.value == 'USD' ){

      this.tipoTrans.push(
        {
        id: 1,
        value: "Tranferencias USD",
        },
        {
        id: 7,
        value: "Cuenta custodia",
        },
        {
        id: 9,
        value: "Efectivo",
        }
      )   

      trasnfer.at(i).get('cbanco')?.setValue('')
      trasnfer.at(i).get('cbanco_destino')?.setValue('')
      trasnfer.at(i).get('ctipopago')?.setValue('')
    }

  }

  masterToggle() {
    if (this.isAllSelected()) {
        this.selection.clear();
      } else {
        this.dataSource.data.forEach(row => this.selection.select(row));
   
      }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  validateMov(){
    if(this.searchReceipt.get('iestadorec')?.value == 'ER'){
      this.revision = true
      this.cobradoSAF = false
    }
    else if(this.searchReceipt.get('iestadorec')?.value== 'CS'){
      this.cobradoSAF = true
      this.revision = false

    }
    else{
      this.revision = false
      this.cobradoSAF = false
    }

  }

  //Banco Emisor
  searchTreatments: OperatorFunction<string, readonly { id : any; value : any }[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term:any) => term.length >= 0),
    map((term:any) => this.bankList.filter((Treatments:any) => new RegExp(term, 'mi').test(Treatments.value)).slice(0, 10)),
  
    );
  formatterTreatments = (Treatments : Treatments) => Treatments.value;


  //Banco receptor
  searchBank: OperatorFunction<string, readonly { id : any; value : any }[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term:any) => term.length >= 0),
    map((term:any) => this.targetBankList.filter((Treatments:any) => new RegExp(term, 'mi').test(Treatments.value)).slice(0, 10)),
  
    );
  formatterchBank = (Treatments : Treatments) => Treatments.value;
  
  //Tipo de Movimiento
  searchTipo: OperatorFunction<string, readonly { id : any; value : any }[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter((term:any) => term.length >= 0),
    map((term:any) => this.tipoTrans.filter((Treatments:any) => new RegExp(term, 'mi').test(Treatments.value)).slice(0, 10)),
  
    );
  formatterchTipo= (Treatments : Treatments) => Treatments.value;
    

}
