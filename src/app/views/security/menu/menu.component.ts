import { Component, ViewChild, AfterViewInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

//Tabla de Menu Principal
dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
displayedColumns: string[] = ['cmenu_principal', 'xmenu', 'xruta', 'star'];
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;

//Tabla de Menu
dataSourceMenu: MatTableDataSource<any> = new MatTableDataSource<any>();
displayedColumnsMenu: string[] = ['cmenu', 'xmenu', 'xruta', 'star'];
@ViewChild(MatSort) sortMenu!: MatSort;
@ViewChild(MatPaginator) paginatorMenu!: MatPaginator;

//Tabla de Sub-Menu
dataSourceSubMenu: MatTableDataSource<any> = new MatTableDataSource<any>();
displayedColumnsSubMenu: string[] = ['csubmenu', 'xsubmenu', 'xruta', 'star'];
@ViewChild(MatSort) sortSubMenu!: MatSort;
@ViewChild(MatPaginator) paginatorSubMenu!: MatPaginator;

  showTable: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private snackBar: MatSnackBar) {}


  ngOnInit() {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      const userObject = JSON.parse(isLoggedIn);
      let data = {
      cusuario: userObject.data.cusuario,
      };
      //Buscar el Menu Principal
      this.http.post(environment.apiUrl + '/api/v1/security/menu/search/main-menu', data).subscribe((response: any) => {
        if (response.data.mainMenu) {
          this.dataSource.data = response.data.mainMenu;
        }
      });

      //Busca el Menu
      this.http.post(environment.apiUrl + '/api/v1/security/menu/search/menu', data).subscribe((response: any) => {
        if (response.data.Menu) {
          this.dataSourceMenu.data = response.data.Menu;
        }
      });

      //Busca el Sub-menu
      this.http.post(environment.apiUrl + '/api/v1/security/menu/search/submenu', data).subscribe((response: any) => {
        if (response.data.Submenu) {
          this.dataSourceSubMenu.data = response.data.Submenu;
        }
      });
    }
  }

  ngAfterViewInit() {
    //Menu Principal
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.ngAfterViewInitMenu();
    this.ngAfterViewInitSubMenu();
  }

  ngAfterViewInitMenu() {
   //Menu
   this.dataSourceMenu.sort = this.sortMenu;
   this.dataSourceMenu.paginator = this.paginatorMenu;
 }

 ngAfterViewInitSubMenu() {
   //Sub-Menu
   this.dataSourceSubMenu.sort = this.sortSubMenu;
   this.dataSourceSubMenu.paginator = this.paginatorSubMenu;
 }

  //Filtro por Menu Principal
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }

  //Filtro por Menu
  applyFilterMenu(event: Event) {
    const filterMenuValue = (event.target as HTMLInputElement).value;
    this.dataSourceMenu.filter = filterMenuValue.trim().toLowerCase();
  }

  //Filtro por SubMenu
  applyFilterSubMenu(event: Event) {
    const filterSubMenuValue = (event.target as HTMLInputElement).value;
    this.dataSourceSubMenu.filter = filterSubMenuValue.trim().toLowerCase();
  }



  onEditMainMenu(cmenu_principal: any) {
    this.showTable = false;
    this.router.navigate(['update-menu', cmenu_principal], { relativeTo: this.route });
  }
  
  onDeleteMainMenu(cmenu_principal: any) {
    this.showTable = false;
    this.router.navigate(['delete-menu', cmenu_principal], { relativeTo: this.route });
  }

  onInfoMainMenu(cmenu_principal: any) {
    this.showTable = false;
    this.router.navigate(['info-menu', cmenu_principal], {relativeTo: this.route});
  }

  addMainMenu(){
    this.showTable = false;
    this.router.navigate(['create-menu'], { relativeTo: this.route });
  }

}
