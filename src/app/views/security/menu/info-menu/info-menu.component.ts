import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent {

  cmenu: any;
  infoMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}


  ngOnInit() {
    this.infoMenu = this.formBuilder.group({
      xmenuprincipal: [{ value: '', disabled: true }],
      cmenu: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      xrutamenu: [{ value: '', disabled: true }],
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
          this.infoMenu.get('cmenu')?.setValue(this.cmenu);
          this.infoMenu.get('xmenuprincipal')?.setValue(response.data.xmenuprincipal);
          this.infoMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.infoMenu.get('xrutamenu')?.setValue(response.data.xrutamenu);
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
