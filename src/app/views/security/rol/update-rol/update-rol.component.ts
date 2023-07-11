import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-rol',
  templateUrl: './update-rol.component.html',
  styleUrls: ['./update-rol.component.scss']
})
export class UpdateRolComponent {

  crol: any;
  updateRol!: FormGroup;
  submitted = false;
  departamentList: any[] = [];

  constructor(
              private route: ActivatedRoute, 
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar
            ) {}

  ngOnInit() {
    this.updateRol = this.formBuilder.group({
      cdepartamento: [''],
      crol: [{ value: '', disabled: true }],
      xrol: [''],
      bcrear: [''],
      bconsultar: [''],
      beliminar: [''],
      bmodificar: [''],
    });
  
    this.route.params.subscribe(params => {
      this.crol = params['crol'];
      this.getRol();
    });
  }

  getRol(){
    this.updateRol.get('crol')?.setValue(this.crol)
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        crol: parseInt(this.crol),
      };
      this.http.post(environment.apiUrl + '/api/v1/security/rol/info', data).subscribe((response: any) => {
        if (response.status) {
          this.updateRol.get('cdepartamento')?.setValue(response.data.cdepartamento);
          this.getValrepDepartament();
          this.updateRol.get('crol')?.setValue(this.crol);
          this.updateRol.get('xdepartamento')?.setValue(response.data.xdepartamento);
          this.updateRol.get('xrol')?.setValue(response.data.xrol);
          this.updateRol.get('bcrear')?.setValue(response.data.bcrear);
          this.updateRol.get('bconsultar')?.setValue(response.data.bconsultar);
          this.updateRol.get('beliminar')?.setValue(response.data.beliminar);
          this.updateRol.get('bmodificar')?.setValue(response.data.bmodificar);
        }
      });
    }
  }

  getValrepDepartament(){
    let data = {
      cdepartamento: parseInt(this.updateRol.get('cdepartamento')?.value)
    }
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

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/rol/']);
    });
  }

  onSubmit(form: any){
    if (this.updateRol.valid) {
      let dataUpdate = {
        crol: parseInt(this.updateRol.get('crol')?.value),
        xrol: form.xrol,
        cdepartamento: form.cdepartamento,
        bcrear: form.bcrear,
        bconsultar: form.bconsultar,
        bmodificar: form.bmodificar,
        beliminar: form.beliminar
      }
      this.http.post(environment.apiUrl + '/api/v1/security/rol/update', dataUpdate).subscribe((response: any) => {
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
