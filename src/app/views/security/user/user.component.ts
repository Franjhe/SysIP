import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['cusuario', 'xnombre', 'xapellido', 'xlogin', 'star'];
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
      this.http.post(environment.apiUrl + '/api/v1/security/user/search', data).subscribe((response: any) => {
        if (response.data.users) {
          this.dataSource.data = response.data.users;
          this.showAlert('Hola');
        }else{
          this.showAlert('No hay usuario autenticado');
        }
      });
    }
  }

  showAlert(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditUser(cusuario: any) {
    this.showTable = false;
    this.router.navigate(['update-user', cusuario], { relativeTo: this.route });
  }
  
  onDeleteUser(event: Event) {
    console.log('Crear Usuario');
    event.preventDefault();
  }

  onInfoUser(cusuario: any) {
    this.showTable = false;
    this.router.navigate(['info-user', cusuario], { relativeTo: this.route });
  }

}
