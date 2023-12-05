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


  bcv : any
  targetBankList : any = []
  selectedFiles?: FileList;
  currentFile?: File;

  viewData : boolean = false
  viewBank : boolean = false

  cliente : any
  mount : any
  mountBs : any

  bankList : any = []
  backReceptors : any = []
  backEmitter : any = []
  coinList : any = []
  receiptList : any = []
  transferList : any = []
  tradesList : any = []

  searchReceipt = this._formBuilder.group({
    receipt :  this._formBuilder.array([]),
    transfer : this._formBuilder.array([]),
    xcedula: ['', Validators.required],
  });

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


    this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', '' ).subscribe((response: any) => {
      for(let i = 0; i < response.data.targetBank.length; i++){
        this.bankList.push({
          id: response.data.targetBank[i].cbanco_destino,
          value: response.data.targetBank[i].xbanco,
        })        
      }


    })

    let venezolano = {
      itipo: 'v'
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/bank', venezolano).subscribe((response: any) => {
      for(let i = 0; i < response.data.bank.length; i++){
        this.backEmitter.push({
          id: response.data.bank[i].cbanco,
          value: response.data.bank[i].xbanco,
        })        
      }
    })

    let extranjero = {
      itipo: 'e'
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/bank', extranjero).subscribe((response: any) => {
      for(let i = 0; i < response.data.bank.length; i++){
        this.backReceptors.push({
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
  }

  removePayment(i:number) {
    this.transfer.removeAt(i);
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

    this.mount = sumaTotal 
    const operation = this.mount * this.bcv
    this.mountBs = operation.toFixed(2)

  }

  Alert(config?: MatDialogConfig) {

    return this.dialog.open(this.Alerta, config);

  }

  Found(config?: MatDialogConfig) {

    return this.dialog.open(this.NotFound, config);

  }

  validateMount(i : number ){

    const creds = this.searchReceipt.get("transfer") as FormArray

    const mountDeclare = creds.at(i).get('mpago')?.value!
    if(mountDeclare < this.mount ){
      this.toast.open('El monto no puede ser menor al estimado de pago, valide su seleccion de recibos o ingrese el monto correcto', '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-toast']
      }); 
      
      creds.at(i).get('mpago')?.setValue('')

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

      const fecha = new Date()
      const savePaymentTrans = {
        receipt : this.receiptList,
        casegurado: this.searchReceipt.get('xcedula')?.value,
        mpago : this.mountBs,
        mpagoext : this.mount,
        ptasamon : this.bcv,
        freporte : fecha ,
        cprog : 'Reporte de pago web',
        cusuario : 13,
        iestadorec : 'N',
        ifuente : 'Web Sys2000',
        ccategoria : this.searchReceipt.get('ccategoria')?.value,
      }

      //primero llenamos el recipo y la tabla de transacciones 
      this.http.post(environment.apiUrl + '/api/v1/collection/create-trans',savePaymentTrans).subscribe(async (response: any) => {

        const transfer = this.searchReceipt.get("transfer") as FormArray

        //obtenemos el codigo de transaccion 
        if(response.data.ctransaccion){

          for(let i = 0; i < transfer.length; i++){

            const formData = new FormData();
            formData.append('file', transfer.at(i).get('ximagen')?.value!);
        
            //cargamos las imagenes con el codigo de transaccion
            this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((response: any) => {
                const rutaimage  =  response.uploadedFile.filename //ruta de imagen por registro 

                this.transferList.push({
                  cmoneda: transfer.value[i].cmoneda,
                  cbanco: transfer.value[i].cbanco,
                  cbanco_destino: transfer.value[i].cbanco_destino,
                  mpago: transfer.value[i].mpago,
                  mpagoext: transfer.value[i].mpagoext,
                  ptasamon: transfer.value[i].ptasamon,
                  ptasaref: transfer.value[i].ptasaref,        
                  freporte: transfer.value[i].freporte,
                  xreferencia: transfer.value[i].xreferencia,
                  ximagen: rutaimage,
                });

                const reporData = {
                  report : this.transferList,
                  ctransaccion : response.data.ctransaccion
                }

                if(response.status){
                  this.http.post(environment.apiUrl + '/api/v1/collection/create-report', reporData).subscribe((response: any) => {

                  })

                }
            
              })

          }

          this.toast.open(response.message, '', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['success-toast']
          });  
  
          await this.toast 
        }
  


      })          
        

  }



}
