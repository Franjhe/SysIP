import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-submenu',
  templateUrl: './create-submenu.component.html',
  styleUrls: ['./create-submenu.component.scss']
})
export class CreateSubmenuComponent {

  createSubMenu!: FormGroup;
  submitted = false;
  mainMenuList: any[] = [];
  menuList: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createSubMenu = this.formBuilder.group({
      xsubmenu: [''],
      xruta: [''],
      cmenu_principal: [''],
      cmenu: [''],
    });

    this.getMainMenu();
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/menu/']);
    });
  }

  getMainMenu(){
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/main-menu', data).subscribe((response: any) => {
      if (response.status) {
        for(let i = 0; i < response.data.mainMenu.length; i++){
          this.mainMenuList.push({
            id: response.data.mainMenu[i].cmenu_principal,
            value: response.data.mainMenu[i].xmenu
          })
        }
      }
    });
  }

  changeGetMenu(){
    let data = {
      cmenu_principal: this.createSubMenu.get('cmenu_principal')?.value
    };
    this.menuList = [];
    this.http.post(environment.apiUrl + '/api/v1/valrep/menu', data).subscribe((response: any) => {
      if (response.status) {
        for(let i = 0; i < response.data.menu.length; i++){
          this.menuList.push({
            id: response.data.menu[i].cmenu,
            value: response.data.menu[i].xmenu
          })
        }
      }
    });
  }

  onSubmit(form: any){
    if (this.createSubMenu.valid) {
      let dataCreate = {
        u_version: '?',
        cmenu_principal: form.cmenu_principal,
        cmenu: form.cmenu,
        xsubmenu: form.xsubmenu,
        xruta: form.xruta,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/menu/create/submenu', dataCreate).subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open(`${response.data.message}`, '', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['security/menu/']);
            });
          });
        }
      });
    } 
  }

}
