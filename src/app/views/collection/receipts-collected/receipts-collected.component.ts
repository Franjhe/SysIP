import { AfterViewInit, Component, ViewChild ,TemplateRef } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-receipts-collected',
  templateUrl: './receipts-collected.component.html',
  styleUrls: ['./receipts-collected.component.scss']
})
export class ReceiptsCollectedComponent {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
  details: string[] = ['cnpoliza','cnrecibo', 'pdf','recibo'];
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
    private http: HttpClient,
    readonly dialog: MatDialog,
    ) {
  }

  ngOnInit(){

    fetch(environment.apiUrl + '/api/v1/collection/receipts-collect' )
    .then((response) => response.json())
    .then(data => {
      let obj = data.searchClientforReceiptCollect
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
    window.open('https://api.lamundialdeseguros.com/sis2000/recibo/' + recibo + '/', '_blank')
  }

  openP(poliza : any){  
    window.open('https://api.lamundialdeseguros.com/sis2000/poliza/' + poliza.trim() + '/', '_blank')
  }


}
