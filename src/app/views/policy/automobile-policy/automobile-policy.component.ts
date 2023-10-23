import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PdfGenerationService } from '../../../_services/ServicePDF'
import {from, Observable} from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-automobile-policy',
  templateUrl: './automobile-policy.component.html',
  styleUrls: ['./automobile-policy.component.scss']
})
export class AutomobilePolicyComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['ccontratoflota', 'xnombre', 'xvehiculo', 'xplaca', 'star'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private pdfGenerationService: PdfGenerationService,
              private snackBar: MatSnackBar) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data;
      this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/search', data).subscribe((response: any) => {
        if (response.data.contract) {
          this.dataSource.data = response.data.contract;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
            
  openPdf(ccontratoflota: any) {
    const observable = from(this.pdfGenerationService.LoadDataCertifiqued(ccontratoflota));

    observable.subscribe(
      (data) => {
        console.log('DATA ' + data)
      },
      (error) => {
        console.log(error)
      }
    );

    this.snackBar.open(`Se está generando el Cuadro Póliza. Por favor espere.`, '', {
      duration: 6000,
    });

  }
}
