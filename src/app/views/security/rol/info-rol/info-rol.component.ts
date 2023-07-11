import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-rol',
  templateUrl: './info-rol.component.html',
  styleUrls: ['./info-rol.component.scss']
})
export class InfoRolComponent {

  cdepartamento: any;
  crol: any;
  infoRol!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.infoRol = this.formBuilder.group({
      cdepartamento: [{ value: '', disabled: true }],
      xdepartamento: [{ value: '', disabled: true }],
      crol: [{ value: '', disabled: true }],
      xrol: [{ value: '', disabled: true }],
      bcrear: [{ value: '', disabled: true }],
      bconsultar: [{ value: '', disabled: true }],
      beliminar: [{ value: '', disabled: true }],
      bmodificar: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      // this.cdepartamento = params['cdepartamento'];
      this.crol = params['crol'];
      this.getRol();
    });
  }

  getRol(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        // cdepartamento: this.cdepartamento,
        crol: parseInt(this.crol),
      };
      this.http.post(environment.apiUrl + '/api/v1/security/rol/info', data).subscribe((response: any) => {
        if (response.status) {
          this.infoRol.get('cdepartamento')?.setValue(this.cdepartamento);
          this.infoRol.get('crol')?.setValue(this.crol);
          this.infoRol.get('xdepartamento')?.setValue(response.data.xdepartamento);
          this.infoRol.get('xrol')?.setValue(response.data.xrol);
          this.infoRol.get('bcrear')?.setValue(response.data.bcrear);
          this.infoRol.get('bconsultar')?.setValue(response.data.bconsultar);
          this.infoRol.get('beliminar')?.setValue(response.data.beliminar);
          this.infoRol.get('bmodificar')?.setValue(response.data.bmodificar);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/rol/']);
    });
  }

}
