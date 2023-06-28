import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  cusuario: any;
  infoUser!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.infoUser = this.formBuilder.group({
      cusuario: [{ value: '', disabled: true }],
      xnombre: [{ value: '', disabled: true }],
      xapellido: [{ value: '', disabled: true }],
      xlogin: [{ value: '', disabled: true }],
      xusuario: [{ value: '', disabled: true }],
      xcorreo: [{ value: '', disabled: true }],
      xobservacion: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.cusuario = params['cusuario'];
      this.getUser();
    });
  }

  getUser(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        cusuario: this.cusuario,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/user/info', data).subscribe((response: any) => {
        if (response.status) {
          this.infoUser.get('cusuario')?.setValue(this.cusuario);
          this.infoUser.get('xnombre')?.setValue(response.data.xnombre);
          this.infoUser.get('xapellido')?.setValue(response.data.xapellido);
          this.infoUser.get('xlogin')?.setValue(response.data.xlogin);
          this.infoUser.get('xusuario')?.setValue(response.data.xusuario);
          this.infoUser.get('xcorreo')?.setValue(response.data.xcorreo);
          this.infoUser.get('xobservacion')?.setValue(response.data.xobservacion);
        }
      });
    }
  }
}
