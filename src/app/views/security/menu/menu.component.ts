import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

const countries = [
  'Argentina',
  'Brasil',
  'Colombia',
  'Chile',
  'Ecuador',
  'Perú',
  'Uruguay',
  'Venezuela'
];


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
  // @ViewChild(MatSort) sortMenu!: MatSort;
  // @ViewChild(MatPaginator) paginatorMenu!: MatPaginator;

  //Tabla de Sub-Menu
  dataSourceSubMenu: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumnsSubMenu: string[] = ['csubmenu', 'xsubmenu', 'xruta', 'star'];
  @ViewChild(MatSort) sortSubMenu!: MatSort;
  @ViewChild(MatPaginator) paginatorSubMenu!: MatPaginator;

  showTable: boolean = true;
  distributionMenu!: FormGroup;
  filteredOptions!: Observable<string[]>;
  userList: any[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute, 
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,) {}


  ngOnInit() {
    this.distributionMenu = this.formBuilder.group({
      cusuario: [''],
      cdepartamento: [''],
      crol: [''],
      cmenu_principal: [''],
      cmenu: [''],
      csubmenu: [''],
    });

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

    this.filteredOptions = this.distributionMenu.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.getUser();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
  
    return this.userList.filter(user => user.value.toLowerCase().includes(filterValue))
                        .map(user => user.value);
  }

  getUser() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/user', data).subscribe((response: any) => {
      if (response.data.users) {
        for (let i = 0; i < response.data.users.length; i++) {
          this.userList.push({
            id: response.data.users[i].cusuario,
            value: response.data.users[i].xusuario
          })
        }
      }
    });
  }

  onUserSelection(event: any) {
    const selectedUserId = event.option.value;
    this.distributionMenu.patchValue({ cusuario: selectedUserId });
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
   this.dataSourceMenu.sort = this.sort;
   this.dataSourceMenu.paginator = this.paginator;
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


  //CRUD Main Menu
  onEditMainMenu(cmenu_principal: any) {
    this.showTable = false;
    this.router.navigate(['update-mainmenu', cmenu_principal], { relativeTo: this.route });
  }
  
  onDeleteMainMenu(cmenu_principal: any) {
    this.showTable = false;
    this.router.navigate(['delete-mainmenu', cmenu_principal], { relativeTo: this.route });
  }

  onInfoMainMenu(cmenu_principal: any) {
    this.showTable = false;
    this.router.navigate(['info-mainmenu', cmenu_principal], {relativeTo: this.route});
  }

  
  //CRUD Menu
  onEditMenu(cmenu: any) {
    this.showTable = false;
    this.router.navigate(['update-menu', cmenu], { relativeTo: this.route });
  }
  
  onDeleteMenu(cmenu: any) {
    this.showTable = false;
    this.router.navigate(['delete-menu', cmenu], { relativeTo: this.route });
  }

  onInfoMenu(cmenu: any) {
    this.showTable = false;
    this.router.navigate(['info-menu', cmenu], {relativeTo: this.route});
  }

  //CRUD SubMenu
  onEditSubMenu(csubmenu: any) {
    this.showTable = false;
    this.router.navigate(['update-submenu', csubmenu], { relativeTo: this.route });
  }
  
  onDeleteSubMenu(csubmenu: any) {
    this.showTable = false;
    this.router.navigate(['delete-submenu', csubmenu], { relativeTo: this.route });
  }

  onInfoSubMenu(csubmenu: any) {
    this.showTable = false;
    this.router.navigate(['info-submenu', csubmenu], {relativeTo: this.route});
  }

  addMainMenu(){
    this.showTable = false;
    this.router.navigate(['create-mainmenu'], { relativeTo: this.route });
  }

  addMenu(){
    this.showTable = false;
    this.router.navigate(['create-menu'], { relativeTo: this.route });
  }

  addSubMenu(){
    this.showTable = false;
    this.router.navigate(['create-submenu'], { relativeTo: this.route });
  }

}
