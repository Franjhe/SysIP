import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-departament',
  templateUrl: './departament.component.html',
  styleUrls: ['./departament.component.scss']
})
export class DepartamentComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cdepartamento', 'xdepartamento', 'istatus', 'star'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showTable: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private snackBar: MatSnackBar) {}

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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditDepartament(cdepartamento: any) {
    this.showTable = false;
    this.router.navigate(['update-departament', cdepartamento], { relativeTo: this.route });
  }
  
  onDeleteDepartament(cdepartamento: any) {
    this.showTable = false;
    this.router.navigate(['delete-departament', cdepartamento], { relativeTo: this.route });
  }

  onInfoDepartament(cdepartamento: any) {
    this.showTable = false;
    this.router.navigate(['info-departament', cdepartamento], { relativeTo: this.route });
  }

  addDepartament(){
    this.showTable = false;
    this.router.navigate(['create-departament'], { relativeTo: this.route });
  }

}
