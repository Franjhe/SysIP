import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

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

  searchReceipt = this._formBuilder.group({
    receipt :  this._formBuilder.array([]),
    ximagen : [{}],
    xcedula: [''],
    cmoneda : [''],
    mpago_dec : [''],
    ccategoria: [''],

  });
  

  constructor( private _formBuilder: FormBuilder,
    private http: HttpClient,
    readonly dialog: MatDialog,
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

          this.receipt.push(
            this._formBuilder.group({
              cnpoliza: response.searchReceipt.receipt[i].cnpoliza,
              cnrecibo: response.searchReceipt.receipt[i].cnrecibo,
              cpoliza: response.searchReceipt.receipt[i].cpoliza,
              fanopol: response.searchReceipt.receipt[i].fanopol,
              fmespol: response.searchReceipt.receipt[i].fmespol,
              cramo: response.searchReceipt.receipt[i].cramo,
              cmoneda: response.searchReceipt.receipt[i].cmoneda,
              fdesde_pol: ISOFdesdePol,
              fhasta_pol: ISOFhastaPol,
              fdesde_rec: ISOFdesdeP,
              fhasta_rec: ISOFhastaP,
              mprimabruta: response.searchReceipt.receipt[i].mprimabruta,
              mprimabrutaext: response.searchReceipt.receipt[i].mprimabrutaext,
              ptasamon: response.searchReceipt.receipt[i].ptasamon,
              seleccionado : false,
              iestadorec : 'N'
              
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

    this.http.post(environment.apiUrl + '/api/v1/valrep/coin', client ).subscribe((coin: any) => {

      for(let i = 0; i < coin.data.coins.length; i++){
        this.coinList.push({
          id: coin.data.coins[i].cmoneda,
          value: coin.data.coins[i].xdescripcion_l,
        })
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

  onFileSelect(event : any){

    const file = event.target.files[0]
    this.searchReceipt.get('ximagen')?.setValue(file);

  }

  async llenarlistas(){

    const creds = this.searchReceipt.get("receipt") as FormArray

    for(let i = 0; i < creds.length; i++){
      if(creds.value[i].seleccionado == true){
        this.receiptList.push({
          cnpoliza: creds.value[i].cnpoliza,
          cnrecibo: creds.value[i].cnrecibo,
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
          seleccionado : creds.value[i].seleccionado,
          iestadorec : creds.value[i].iestadorec

        });
      }

    }   
    
  }

  async onSubmit(){

    const formData = new FormData();
    formData.append('file', this.searchReceipt.get('ximagen')?.value!);

    this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((response: any) => {
        const rutaimage  =  response.uploadedFile.filename
        if(response.status){

           this.llenarlistas()

          const fecha = new Date()
          const savePaymentReport = {
            receipt : this.receiptList,
            xruta : rutaimage,
            casegurado: this.searchReceipt.get('xcedula')?.value,
            cmoneda : this.searchReceipt.get('cmoneda')?.value,
            mpago_dec : this.searchReceipt.get('mpago_dec')?.value,
            mpago : this.mountBs,
            mpagoext : this.mount,
            ptasamon : this.bcv,
            freporte : fecha ,
            cprog : 'Reporte de pago web',
            cusuario : 13,
            ccategoria : this.searchReceipt.get('ccategoria')?.value,
          }

          this.http.post(environment.apiUrl + '/api/v1/collection/create',savePaymentReport).subscribe((response: any) => {
      
            console.log(response)
          })          
        }



    });

  }



}
