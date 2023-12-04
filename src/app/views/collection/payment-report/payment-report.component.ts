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
  cliente : any
  mount : any
  mountBs : any

  coinList : any = []
  receiptList : any = []
  tradesList : any = []

  searchReceipt = this._formBuilder.group({
    receipt :  this._formBuilder.array([]),
    xcedula: ['', Validators.required],
    cmoneda : [''],
    mpago_dec : [''],
    ccategoria: [''],
  });

  detailPayment = this._formBuilder.group({
    cmoneda : ['', Validators.required],
    mpago_dec : ['', Validators.required],
    ximagen : [{}],
    xreferencia : ['', Validators.required],
    ccategoria: [''],
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

  }

  searchDataReceipt(){
    const client = {
      cedula: this.searchReceipt.get('xcedula')?.value 
    }

    const creds = this.searchReceipt.get("receipt") as FormArray

    while (creds.length !== 0) {
      creds.removeAt(0)
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

  validateMount(){
    const mountDeclare = this.detailPayment.get('mpago_dec')?.value!
    if(mountDeclare < this.mount ){
      this.toast.open('El monto no puede ser menor al estimado de pago, valide su seleccion de recibos o ingrese el monto correcto', '', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: ['error-toast']
      });  
    }

  }
  onFileSelect(event : any){

    const file = event.target.files[0]
    this.detailPayment.get('ximagen')?.setValue(file);

  }

  async llenarlistas(){

    const creds = this.searchReceipt.get("receipt") as FormArray

    this.receiptList = []

    for(let i = 0; i < creds.length; i++){
      if(creds.value[i].seleccionado == true){
        this.receiptList.push({
          cnpoliza: creds.value[i].cnpoliza,
          cnrecibo: creds.value[i].cnrecibo,
          crecibo: creds.value[i].crecibo,
          cpoliza: creds.value[i].cpoliza,
          fanopol: creds.value[i].fanopol,
          fmespol: creds.value[i].fmespol,
          cramo: creds.value[i].cramo,        
          cmoneda: creds.value[i].cmoneda,
          fdesde_pol: creds.value[i].fdesde_pol,
          fhasta_pol: creds.value[i].fhasta_pol,
          fdesde_rec: creds.value[i].fdesde_rec,
          fhasta_rec: creds.value[i].fhasta_rec,
          mprimabruta: creds.value[i].mprimabruta,
          mprimabrutaext: creds.value[i].mprimabrutaext,
          ptasamon: creds.value[i].ptasamon,

        });
      }

    }   
    
  }

  async onSubmit(){

    const formData = new FormData();
    formData.append('file', this.detailPayment.get('ximagen')?.value!);

    this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((response: any) => {
        const rutaimage  =  response.uploadedFile.filename
        if(response.status){

           this.llenarlistas()

          const fecha = new Date()
          const savePaymentReport = {
            receipt : this.receiptList,
            xruta : rutaimage,
            casegurado: this.searchReceipt.get('xcedula')?.value,
            cmoneda : this.detailPayment.get('cmoneda')?.value,
            mpago_dec : this.detailPayment.get('mpago_dec')?.value,
            mpago : this.mountBs,
            mpagoext : this.mount,
            ptasamon : this.bcv,
            freporte : fecha ,
            cprog : 'Reporte de pago web',
            cusuario : 13,
            iestadorec : 'N',
            ifuente : 'Web Sys2000',
            ccategoria : this.searchReceipt.get('ccategoria')?.value,
            xreferencia : this.detailPayment.get('xreferencia')?.value,
          }

          this.http.post(environment.apiUrl + '/api/v1/collection/create',savePaymentReport).subscribe(async (response: any) => {
      
            this.toast.open(response.message, '', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['success-toast']
            });  

            await this.toast 
            location.reload();

          })          
        }



    });

  }



}
