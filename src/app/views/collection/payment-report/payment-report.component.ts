import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.scss']
})
export class PaymentReportComponent {

  @ViewChild('Alerta') Alerta!: TemplateRef<any>;

  bcv : any
  targetBankList : any = []

  viewData : boolean = false
  cliente : any
  mount : any
  mountBs : any
  searchReceipt = this._formBuilder.group({
    xcedula: [{ value: '', disabled: false }],
    receipt :  this._formBuilder.array([]),

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

    let data = {
      ctipopago: ''
    }

    this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', data).subscribe((response: any) => {
      if (response.data.targetBank) {
        for (let i = 0; i < response.data.targetBank.length; i++) {
          this.targetBankList.push({
            id: response.data.targetBank[i].cbanco_destino,
            value: response.data.targetBank[i].xbanco,
          });
        }
      }
    });


  
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
    this.mountBs = this.mount * this.bcv

  }

  Alert(config?: MatDialogConfig) {

    return this.dialog.open(this.Alerta, config);

  }



}
