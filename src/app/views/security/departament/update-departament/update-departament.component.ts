import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-departament',
  templateUrl: './update-departament.component.html',
  styleUrls: ['./update-departament.component.scss']
})
export class UpdateDepartamentComponent {

  cdepartamento: any;
  updateDepartament!: FormGroup;
  submitted = false;

  constructor(
              private route: ActivatedRoute, 
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar
            ) {}

  ngOnInit() {
    this.updateDepartament = this.formBuilder.group({
      cdepartamento: [{ value: '', disabled: true }],
      xdepartamento: [''],
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
          this.updateDepartament.get('cdepartamento')?.setValue(this.cdepartamento);
          this.updateDepartament.get('xdepartamento')?.setValue(response.data.xdepartamento);
        }
      });
    }
  }
  
  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/departament/']);
    });
  }    

  onSubmit(form: any){
    if (this.updateDepartament.valid) {
      let dataUpdate = {
        cdepartamento: parseInt(this.cdepartamento),
        xdepartamento: form.xdepartamento,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/departament/update', dataUpdate).subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open(`${response.data.message}`, '', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['security/departament/']);
            });
          });
        }else{
          this.snackBar.open('Ha ocurrido un error, por favor verifique.', '', {
            duration: 3000,
          })
        }
      });
    } 
  }
}
