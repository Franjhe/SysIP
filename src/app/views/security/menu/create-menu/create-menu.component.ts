import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent {

  createMenu!: FormGroup;
  submitted = false;
  mainMenuList: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createMenu = this.formBuilder.group({
      xmenu: [''],
      xruta: [''],
      cmenu_principal: ['']
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

  onSubmit(form: any){
    if (this.createMenu.valid) {
      let dataCreate = {
        u_version: '?',
        cmenu_principal:form.cmenu_principal,
        xmenu: form.xmenu,
        xruta: form.xruta,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/menu/create/menu', dataCreate).subscribe((response: any) => {
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
