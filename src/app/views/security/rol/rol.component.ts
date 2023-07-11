import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent {

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cdepartamento', 'xdepartamento', 'crol', 'xrol', 'star'];
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
      const userObject = JSON.parse(isLoggedIn);
      let data = {
      cusuario: userObject.data.cusuario,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/rol/search', data).subscribe((response: any) => {
        if (response.data.rols) {
          this.dataSource.data = response.data.rols;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditRol(crol: any) {
    this.showTable = false;
    this.router.navigate(['update-rol', crol], { relativeTo: this.route });
  }
  
  onDeleteRol(crol: any) {
    this.showTable = false;
    this.router.navigate(['delete-rol', crol], { relativeTo: this.route });
  }

  onInfoRol(crol: any) {
    this.showTable = false;
    this.router.navigate(['info-rol', crol], {relativeTo: this.route});
  }

  addRol(){
    this.showTable = false;
    this.router.navigate(['create-rol'], { relativeTo: this.route });
  }

}
