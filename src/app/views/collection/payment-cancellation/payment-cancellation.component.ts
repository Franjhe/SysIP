import {Component, TemplateRef, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-payment-cancellation',
  templateUrl: './payment-cancellation.component.html',
  styleUrls: ['./payment-cancellation.component.scss']
})
export class PaymentCancellationComponent {

  displayedColumns: string[] = ['casegurado', 'cmoneda', 'freporte', 'ptasamon', 'mpago_dec'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;
  @ViewChild('Pending') Pending!: TemplateRef<any>;
  
  apiUrl = environment.apiUrl 

  bcv : any
  viewData : boolean = false
  cliente : any

  listReceipt : any = []
  listPending : any = []

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

  ngAfterViewInit() {
    this.listPending.paginator = this.paginator;
    this.listPending.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      this.listReceipt = data.searchPaymentReport.recibo
      this.listReceipt.paginator = this.paginator;
      
    })

    fetch(environment.apiUrl + '/api/v1/collection/search-pending' )
    .then((response) => response.json())
    .then(data => {
      this.listPending = data.searchPaymentPendingData.recibo
      
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

  Alert(config?: MatDialogConfig) {

    return this.dialog.open(this.InfoReceipt, config);

  }

  PendindAlert(config?: MatDialogConfig) {

    return this.dialog.open(this.Pending, config);

  }

}
