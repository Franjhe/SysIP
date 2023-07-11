import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-mainmenu',
  templateUrl: './info-mainmenu.component.html',
  styleUrls: ['./info-mainmenu.component.scss']
})
export class InfoMainmenuComponent {

  cmenu_principal: any;
  infoMainMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.infoMainMenu = this.formBuilder.group({
      cmenu_principal: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      xicono: [{ value: '', disabled: true }],
      xruta: [{ value: '', disabled: true }],
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
          this.infoMainMenu.get('cmenu_principal')?.setValue(this.cmenu_principal);
          this.infoMainMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.infoMainMenu.get('xicono')?.setValue(response.data.xicono);
          this.infoMainMenu.get('xruta')?.setValue(response.data.xruta);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/menu/']);
    });
  }

}
