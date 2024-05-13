import {  Component, ViewChild ,TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { from } from 'rxjs';
import { PdfGenerationService } from '../../../_services/ServicePDF'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-receipts-collected',
  templateUrl: './receipts-collected.component.html',
  styleUrls: ['./receipts-collected.component.scss']
})
export class ReceiptsCollectedComponent {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  details: string[] = ['cnpoliza','cnrecibo','ramo', 'pdf','recibo'];
  dataSource: any;

  cliente : any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('Receip') Receip!: TemplateRef<any>;

  detailReceipst : any = []


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor( 
    private snackBar: MatSnackBar,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private pdfGenerationService: PdfGenerationService,
    ) {
  }

  ngOnInit(){

    fetch(environment.apiUrl + '/api/v1/collection/receipts-collect' )
    .then((response) => response.json())
    .then(data => {
      let obj = data.receiptsCollect
      let array = Object.values(obj)
      this.dataSource = new MatTableDataSource(array);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


    })

  }

  receipt(data :any){
    this.detailReceipst = []
    this.detailReceipst = data.recibos
    this.cliente= data.xnombre
    this.detail()
  }

  detail(config?: MatDialogConfig) {
    return this.dialog.open(this.Receip, config);
  }

  openR(recibo : any){
    // console.log(recibo)
    window.open('https://api.lamundialdeseguros.com/sis2000/recibo/' + recibo[0] + '/', '_blank')
  }

  openP(poliza : any){  
      if(poliza.cramo !== 18){
        window.open('https://api.lamundialdeseguros.com/sis2000/poliza/' + poliza.cnpoliza + '/', '_blank')
      }else{
        this.openPdf(poliza.contrato)
      }

  }

  openPdf(ccontratoflota: any) {
    const observable = from(this.pdfGenerationService.LoadDataCertifiqued(ccontratoflota));

    observable.subscribe(
      (data) => {},
      (error) => {
        // console.log(error)
      }
    );

    this.snackBar.open(`Se está generando el Cuadro Póliza. Por favor espere.`, '', {
      duration: 6000,
    });

  }


}
