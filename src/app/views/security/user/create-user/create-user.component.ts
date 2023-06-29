import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  createUser!: FormGroup;
  submitted = false;
  isLoggedIn: any;
  userObject: any;
  departamentList: any[] = [];
  rolList: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createUser = this.formBuilder.group({
      xnombre: [''],
      xapellido: [''],
      xlogin: [''],
      xcontrasena: [''],
      xusuario: [''],
      xcorreo: [''],
      xobservacion: [''],
      cdepartamento: [''],
      crol: [''],
    });

    this.isLoggedIn = localStorage.getItem('user');
    this.userObject = JSON.parse(this.isLoggedIn);
    let data = this.userObject;
    this.http.post(environment.apiUrl + '/api/v1/valrep/departament', data).subscribe((response: any) => {
      if (response.status) {
        for(let i = 0; i < response.data.departaments.length; i++){
          this.departamentList.push({
            id: response.data.departaments[i].cdepartamento,
            value: response.data.departaments[i].xdepartamento
          })
          console.log(this.departamentList)
        }
      }
    });
  }

  changeValrepRol(){
    let data = {
      cdepartamento: parseInt(this.createUser.get('cdepartamento')?.value)
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/rol', data).subscribe((response: any) => {
      if (response.status) {
        for(let i = 0; i < response.data.rols.length; i++){
          this.rolList.push({
            id: response.data.rols[i].crol,
            value: response.data.rols[i].xrol
          })
          console.log(this.rolList)
        }
      }
    });
  }

  onSubmit(form: any){
    if (this.createUser.valid) {
      let dataUpdate = {
        xnombre: form.xnombre,
        xapellido: form.xapellido,
        xlogin: form.xlogin,
        xusuario: form.xusuario,
        xcorreo: form.xcorreo,
        xobservacion: form.xobservacion ? form.xobservacion: null,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/user/update', dataUpdate).subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open(`${response.data.message}`, '', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigate(['security/user/']);
          });
        }
      });
    } 
  }

}
