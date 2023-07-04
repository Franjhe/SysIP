import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-mainmenu',
  templateUrl: './update-mainmenu.component.html',
  styleUrls: ['./update-mainmenu.component.scss']
})
export class UpdateMainmenuComponent {

  cmenu_principal: any;
  updateMainMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.updateMainMenu = this.formBuilder.group({
      cmenu_principal: [{ value: '', disabled: true }],
      xmenu: [''],
      xicono: [''],
      xruta: [''],
    });

    this.route.params.subscribe(params => {
      this.cmenu_principal = params['cmenu_principal'];
      this.getMainMenu();
    });
  }

  getMainMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        cmenu_principal: this.cmenu_principal,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/main-menu', data).subscribe((response: any) => {
        if (response.status) {
          this.updateMainMenu.get('cmenu_principal')?.setValue(this.cmenu_principal);
          this.updateMainMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.updateMainMenu.get('xicono')?.setValue(response.data.xicono);
          this.updateMainMenu.get('xruta')?.setValue(response.data.xruta);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/menu/']);
    });
  }

  onSubmit(form: any){
    if (this.updateMainMenu.valid) {
      let dataUpdate = {
        cmenu_principal: parseInt(this.cmenu_principal),
        xmenu: form.xmenu,
        xicono: form.xicono,
        xruta: form.xruta,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/menu/update/main-menu', dataUpdate).subscribe((response: any) => {
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
