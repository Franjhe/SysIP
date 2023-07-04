import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent {

  cmenu: any;
  updateMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.updateMenu = this.formBuilder.group({
      cmenu: [{ value: '', disabled: true }],
      xmenuprincipal: [{ value: '', disabled: true }],
      xmenu: [''],
      xruta: [''],
    });

    this.route.params.subscribe(params => {
      this.cmenu = params['cmenu'];
      this.getMenu();
    });
  }

  getMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        cmenu: this.cmenu,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/menu', data).subscribe((response: any) => {
        if (response.status) {
          this.updateMenu.get('cmenu')?.setValue(this.cmenu);
          this.updateMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.updateMenu.get('xmenuprincipal')?.setValue(response.data.xmenuprincipal);
          this.updateMenu.get('xruta')?.setValue(response.data.xrutamenu);
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
    if (this.updateMenu.valid) {
      let dataUpdate = {
        cmenu: parseInt(this.cmenu),
        xmenu: form.xmenu,
        xruta: form.xruta,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/menu/update/menu', dataUpdate).subscribe((response: any) => {
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
