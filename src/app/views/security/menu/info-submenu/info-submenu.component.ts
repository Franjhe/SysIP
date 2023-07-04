import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-submenu',
  templateUrl: './info-submenu.component.html',
  styleUrls: ['./info-submenu.component.scss']
})
export class InfoSubmenuComponent {

  csubmenu: any;
  infoSubMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}


  ngOnInit() {
    this.infoSubMenu = this.formBuilder.group({
      xmenuprincipal: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      csubmenu: [{ value: '', disabled: true }],
      xsubmenu: [{ value: '', disabled: true }],
      xrutasubmenu: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.csubmenu = params['csubmenu'];
      this.getSubMenu();
    });
  }

  getSubMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        csubmenu: this.csubmenu,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/submenu', data).subscribe((response: any) => {
        if (response.status) {
          this.infoSubMenu.get('csubmenu')?.setValue(this.csubmenu);
          this.infoSubMenu.get('xmenuprincipal')?.setValue(response.data.xmenuprincipal);
          this.infoSubMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.infoSubMenu.get('xsubmenu')?.setValue(response.data.xsubmenu);
          this.infoSubMenu.get('xrutasubmenu')?.setValue(response.data.xrutasubmenu);
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
