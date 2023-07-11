import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-departament',
  templateUrl: './info-departament.component.html',
  styleUrls: ['./info-departament.component.scss']
})
export class InfoDepartamentComponent {

  cdepartamento: any;
  infoDepartament!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.infoDepartament = this.formBuilder.group({
      cdepartamento: [{ value: '', disabled: true }],
      xdepartamento: [{ value: '', disabled: true }],
      istatus: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.cdepartamento = params['cdepartamento'];
      this.getDepartament();
    });
  }

  getDepartament(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        cdepartamento: this.cdepartamento,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/departament/info', data).subscribe((response: any) => {
        if (response.status) {
          this.infoDepartament.get('cdepartamento')?.setValue(this.cdepartamento);
          this.infoDepartament.get('xdepartamento')?.setValue(response.data.xdepartamento);
          this.infoDepartament.get('istatus')?.setValue(response.data.istatus);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/departament/']);
    });
  }

}
