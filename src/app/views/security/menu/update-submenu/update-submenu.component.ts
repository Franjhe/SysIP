import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-submenu',
  templateUrl: './update-submenu.component.html',
  styleUrls: ['./update-submenu.component.scss']
})
export class UpdateSubmenuComponent {

  csubmenu: any;
  updateSubMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.updateSubMenu = this.formBuilder.group({
      csubmenu: [{ value: '', disabled: true }],
      xmenuprincipal: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      xsubmenu: [''],
      xruta: [''],
    });

    this.route.params.subscribe(params => {
      this.csubmenu = params['csubmenu'];
      this.getMenu();
    });
  }

  getMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        csubmenu: this.csubmenu,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/submenu', data).subscribe((response: any) => {
        if (response.status) {
          this.updateSubMenu.get('csubmenu')?.setValue(this.csubmenu);
          this.updateSubMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.updateSubMenu.get('xsubmenu')?.setValue(response.data.xsubmenu);
          this.updateSubMenu.get('xmenuprincipal')?.setValue(response.data.xmenuprincipal);
          this.updateSubMenu.get('xruta')?.setValue(response.data.xrutasubmenu);
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
    if (this.updateSubMenu.valid) {
      let dataUpdate = {
        csubmenu: parseInt(this.csubmenu),
        xsubmenu: form.xsubmenu,
        xruta: form.xruta,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/menu/update/submenu', dataUpdate).subscribe((response: any) => {
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
