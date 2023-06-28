import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent {
  cusuario: any;
  updateUser!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.updateUser = this.formBuilder.group({
      cusuario: [{ value: '', disabled: true }],
      xnombre: [''],
      xapellido: [''],
      xlogin: [''],
      xusuario: [''],
      xcorreo: [''],
      xobservacion: [''],
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
          this.updateUser.get('cusuario')?.setValue(this.cusuario);
          this.updateUser.get('xnombre')?.setValue(response.data.xnombre);
          this.updateUser.get('xapellido')?.setValue(response.data.xapellido);
          this.updateUser.get('xlogin')?.setValue(response.data.xlogin);
          this.updateUser.get('xusuario')?.setValue(response.data.xusuario);
          this.updateUser.get('xcorreo')?.setValue(response.data.xcorreo);
          this.updateUser.get('xobservacion')?.setValue(response.data.xobservacion);
        }
      });
    }
  }

  onSubmit(form: any){
    if (this.updateUser.valid) {
      let dataUpdate = {
        cusuario: parseInt(this.cusuario),
        xnombre: form.xnombre,
        xapellido: form.xapellido,
        xlogin: form.xlogin,
        xusuario: form.xusuario,
        xcorreo: form.xcorreo,
        xobservacion: form.xobservacion ? form.xobservacion: null,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/user/update', dataUpdate).subscribe((response: any) => {
        if (response.status) {

        }
      });
    } 
  }
}
