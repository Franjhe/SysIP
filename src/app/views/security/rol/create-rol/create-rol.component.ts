import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.scss']
})
export class CreateRolComponent {

  createRol!: FormGroup;
  submitted = false;
  isLoggedIn: any;
  departamentList: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createRol = this.formBuilder.group({
      cdepartamento: [''],
      xrol: [''],
      bcrear: [''],
      bconsultar: [''],
      beliminar: [''],
      bmodificar: [''],
    });

    this.getValrepDepartament();
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/rol/']);
    });
  }   

  getValrepDepartament(){
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/departament', data).subscribe((response: any) => {
      if (response.status) {
        for(let i = 0; i < response.data.departaments.length; i++){
          this.departamentList.push({
            id: response.data.departaments[i].cdepartamento,
            value: response.data.departaments[i].xdepartamento
          })
        }
      }
    });
  }

  onSubmit(form: any){
    if (this.createRol.valid) {
      let dataCreate = {
        u_version: '?',
        xrol: form.xrol,
        cdepartamento: form.cdepartamento,
        bcrear: form.bcrear,
        bconsultar: form.bconsultar,
        beliminar: form.beliminar,
        bmodificar: form.bmodificar,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/rol/create', dataCreate).subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open(`${response.data.message}`, '', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['security/rol/']);
            });
          });
        }
      });
    } 
  }
}
