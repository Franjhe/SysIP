import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

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

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  showTable: boolean = true;
  distributionMenu!: FormGroup;

  //Listas del Valrep
  userList: any[] = [];
  departamentList: any[] = [];
  rolList: any[] = [];
  mainMenuList: any[] = [];
  menuList: any[] = [];
  subMenuList: any[] = [];

  //Controles
  userControl = new FormControl('');
  departamentControl = new FormControl('');
  rolControl = new FormControl('');
  mainMenuControl = new FormControl('');
  menuControl = new FormControl('');
  subMenuControl = new FormControl('');

  //Filtros
  filteredUsers!: Observable<string[]>;
  filteredDepartament!: Observable<string[]>;
  filteredRol!: Observable<string[]>;
  filteredMainMenu!: Observable<string[]>;
  filteredMenu!: Observable<string[]>;
  filteredSubMenu!: Observable<string[]>;

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

    this.getUser();
    this.getDepartament();
    this.getMainMenu();
  }

  getUser() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/user', data).subscribe((response: any) => {
      if (response.data.users) {
        for (let i = 0; i < response.data.users.length; i++) {
          this.userList.push({
            id: response.data.users[i].cusuario,
            value: response.data.users[i].xusuario
          });
        }
        this.filteredUsers = this.userControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      }
    });
  }

  getDepartament() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/departament', data).subscribe((response: any) => {
      if (response.data.departaments) {
        for (let i = 0; i < response.data.departaments.length; i++) {
          this.departamentList.push({
            id: response.data.departaments[i].cdepartamento,
            value: response.data.departaments[i].xdepartamento
          });
        }
        this.filteredDepartament = this.departamentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDepartament(value || ''))
        );
      }
    });
  }

  getRol() {
    let data = {
      cdepartamento: this.distributionMenu.get('cdepartamento')?.value
    }
    this.http.post(environment.apiUrl + '/api/v1/valrep/rol', data).subscribe((response: any) => {
      if (response.data.rols) {
        for (let i = 0; i < response.data.rols.length; i++) {
          this.rolList.push({
            id: response.data.rols[i].crol,
            value: response.data.rols[i].xrol
          });
        }
        this.filteredRol = this.rolControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterRol(value || ''))
        );
      }
    });
  }

  getMainMenu() {
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/main-menu', data).subscribe((response: any) => {
      if (response.data.mainMenu) {
        for (let i = 0; i < response.data.mainMenu.length; i++) {
          this.mainMenuList.push({
            id: response.data.mainMenu[i].cmenu_principal,
            value: response.data.mainMenu[i].xmenu
          });
        }
        this.filteredMainMenu = this.mainMenuControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMainMenu(value || ''))
        );
      }
    });
  }

  getMenu() {
    let data = {
      cmenu_principal: this.distributionMenu.get('cmenu_principal')?.value
    }
    this.http.post(environment.apiUrl + '/api/v1/valrep/menu', data).subscribe((response: any) => {
      if (response.data.menu) {
        for (let i = 0; i < response.data.menu.length; i++) {
          this.menuList.push({
            id: response.data.menu[i].cmenu,
            value: response.data.menu[i].xmenu
          });
        }
        this.filteredMenu = this.menuControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMenu(value || ''))
        );
      }
    });
  }

  getSubMenu() {
    let data = {
      cmenu_principal: this.distributionMenu.get('cmenu_principal')?.value,
      cmenu: this.distributionMenu.get('cmenu')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/valrep/submenu', data).subscribe((response: any) => {
      if (response.data.subMenu) {
        for (let i = 0; i < response.data.subMenu.length; i++) {
          this.subMenuList.push({
            id: response.data.subMenu[i].csubmenu,
            value: response.data.subMenu[i].xsubmenu
          });
        }
        this.filteredSubMenu = this.subMenuControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterSubMenu(value || ''))
        );
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.userList
      .map(user => user.value)
      .filter(users => users.toLowerCase().includes(filterValue));
  }

  private _filterDepartament(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.departamentList
      .map(departament => departament.value)
      .filter(departaments => departaments.toLowerCase().includes(filterValue));
  }

  private _filterRol(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.rolList
      .map(rol => rol.value)
      .filter(rols => rols.toLowerCase().includes(filterValue));
  }

  private _filterMainMenu(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.mainMenuList
      .map(main => main.value)
      .filter(mainM => mainM.toLowerCase().includes(filterValue));
  }

  private _filterMenu(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.menuList
      .map(menu => menu.value)
      .filter(menu => menu.toLowerCase().includes(filterValue));
  }

  private _filterSubMenu(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.subMenuList
      .map(submenu => submenu.value)
      .filter(submenu => submenu.toLowerCase().includes(filterValue));
  }

  onUserSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedUser = this.userList.find(user => user.value === selectedValue);
    if (selectedUser) {
      this.distributionMenu.get('cusuario')?.setValue(selectedUser.id)
    }
  }

  onDepartamentSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedDepartament = this.departamentList.find(departament => departament.value === selectedValue);
    if (selectedDepartament) {
      this.distributionMenu.get('cdepartamento')?.setValue(selectedDepartament.id)
    }

    if(this.distributionMenu.get('cdepartamento')?.value){
      this.getRol();
    }
  }

  onRolSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedRol = this.rolList.find(rol => rol.value === selectedValue);
    if (selectedRol) {
      this.distributionMenu.get('crol')?.setValue(selectedRol.id)
    }
  }

  onMainMenuSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedMainMenu = this.mainMenuList.find(main => main.value === selectedValue);
    if (selectedMainMenu) {
      this.distributionMenu.get('cmenu_principal')?.setValue(selectedMainMenu.id)
    }
    if(this.distributionMenu.get('cmenu_principal')?.value){
      this.getMenu();
    }
  }

  onMenuSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedMenu = this.menuList.find(menu => menu.value === selectedValue);
    if (selectedMenu) {
      this.distributionMenu.get('cmenu')?.setValue(selectedMenu.id)
    }
    if(this.distributionMenu.get('cmenu')?.value){
      this.getSubMenu();
    }
  }

  onSubMenuSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedSubMenu = this.subMenuList.find(submenu => submenu.value === selectedValue);
    if (selectedSubMenu) {
      this.distributionMenu.get('csubmenu')?.setValue(selectedSubMenu.id)
    }
    console.log('Usuario:' + ' ' + this.distributionMenu.get('cusuario')?.value)
    console.log('Departamento:' + ' ' + this.distributionMenu.get('cdepartamento')?.value)
    console.log('Rol:' + ' ' + this.distributionMenu.get('crol')?.value)
    console.log('Menu Principal:' + ' ' + this.distributionMenu.get('cmenu_principal')?.value)
    console.log('Menu:' + ' ' + this.distributionMenu.get('cmenu')?.value)
    console.log('Menu:' + ' ' + this.distributionMenu.get('csubmenu')?.value)
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
