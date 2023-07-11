import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-departament',
  templateUrl: './delete-departament.component.html',
  styleUrls: ['./delete-departament.component.scss']
})
export class DeleteDepartamentComponent {

  cdepartamento: any;
  deleteDepartament!: FormGroup;
  submitted = false;
  showModal = false;
  @ViewChild("DeleteDepartament") private DeleteDepartament!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
              private route: ActivatedRoute, 
              private formBuilder: FormBuilder,
              private http: HttpClient,
              readonly dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router,
            ) {}

  ngOnInit() {
    this.deleteDepartament = this.formBuilder.group({
      cdepartamento: [{ value: '', disabled: true }],
      xdepartamento: [{ value: '', disabled: true }],
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
          this.deleteDepartament.get('cdepartamento')?.setValue(this.cdepartamento);
          this.deleteDepartament.get('xdepartamento')?.setValue(response.data.xdepartamento);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/departament/']);
    });
  }

  open() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      template: this.DeleteDepartament
    };
    this.dialogRef = this.dialog.open(this.DeleteDepartament, config);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();
    let dataDelete = {
      cdepartamento: parseInt(this.cdepartamento),
      istatus: 'N'
    }
    this.http.post(environment.apiUrl + '/api/v1/security/departament/delete', dataDelete).subscribe((response: any) => {
      if (response.status) {
        this.snackBar.open(`${response.data.message}`, '', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['security/departament/']);
          });
        },
        (err) => {
          console.log(err.error.data.message)
          let code = err.error.data.code;
        });
      }
    });
  }
}
