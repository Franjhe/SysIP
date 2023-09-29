import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PdfGenerationService } from '../../../../app/_services';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cdepartamento', 'xdepartamento', 'istatus', 'star'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showTable: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private PdfService: PdfGenerationService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data;
      this.http.post(environment.apiUrl + '/api/v1/security/departament/search', data).subscribe((response: any) => {
        if (response.data.departaments) {
          this.dataSource.data = response.data.departaments;
        }else{

        }
      });
    }

    this.PdfService.certificateData()

  }
}
