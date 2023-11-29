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
  searchReceipt = this._formBuilder.group({
    xcedula: [''],
    receipt :  this._formBuilder.array([]),
    ximagen : [{}],
    mount : ['']

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

          this.receipt.push(
            this._formBuilder.group({
              crecibo: response.searchReceipt.receipt[i].crecibo,
              fdesde: ISOFdesdeP,
              fhasta: ISOFhastaP,
              mprimabrutaext: response.searchReceipt.receipt[i].mprimabrutaext,
              cmoneda: response.searchReceipt.receipt[i].cmoneda,
              cnrecibo: response.searchReceipt.receipt[i].cnrecibo,
              cnpoliza: response.searchReceipt.receipt[i].cnpoliza,
              cramo: response.searchReceipt.receipt[i].cramo,
              seleccionado : false
              
            })
          )

        }

        for(let i = 0; i < response.searchReceipt.client.length; i++){
          this.cliente = response.searchReceipt.client.xcliente
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

  onFileSelect(event : any){

    const file = event.target.files[0]
    this.searchReceipt.get('ximagen')?.setValue(file);

  }

  onSubmit(){

    const formData = new FormData();
    formData.append('file', this.searchReceipt.get('ximagen')?.value!);

    this.http.post(environment.apiUrl + '/api/upload/image', formData).subscribe((response: any) => {

        const rutaimage  =  response.uploadedFile.filename

        const receipt = this.searchReceipt.get("receipt") as FormArray

        const savePaymentReport = {
          xcedula: this.searchReceipt.get('xcedula')?.value,
          receipt : receipt,
          ximagen : rutaimage,
          mount : this.searchReceipt.get('mount')?.value
        }
    
        this.http.post(environment.apiUrl + '/api/v1/collection/search', savePaymentReport ).subscribe((response: any) => {
    
        })

    });



  }



}
