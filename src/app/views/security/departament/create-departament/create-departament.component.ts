import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-departament',
  templateUrl: './create-departament.component.html',
  styleUrls: ['./create-departament.component.scss']
})
export class CreateDepartamentComponent {

  createDepartament!: FormGroup;
  submitted = false;
  isLoggedIn: any;

  constructor(
              private route: ActivatedRoute, 
              private router: Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar
            ) {}

  ngOnInit() {
    this.createDepartament = this.formBuilder.group({
      xdepartamento: [''],
    });
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/departament/']);
    });
  }   

  onSubmit(form: any){
    if (this.createDepartament.valid) {
      let dataCreate = {
        u_version: '?',
        xdepartamento: form.xdepartamento,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/departament/create', dataCreate).subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open(`${response.data.message}`, '', {
            duration: 3000,
          }).afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['security/departament/']);
            });
          });
        }
      });
    } 
  }
}
