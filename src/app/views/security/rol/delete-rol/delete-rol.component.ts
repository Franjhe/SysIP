import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-rol',
  templateUrl: './delete-rol.component.html',
  styleUrls: ['./delete-rol.component.scss']
})
export class DeleteRolComponent {

  crol: any;
  deleteRol!: FormGroup;
  submitted = false;
  showModal = false;
  @ViewChild("DeleteRol") private DeleteRol!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    readonly dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.deleteRol = this.formBuilder.group({
      xdepartamento: [{ value: '', disabled: true }],
      crol: [{ value: '', disabled: true }],
      xrol: [{ value: '', disabled: true }],
      bcrear: [{ value: '', disabled: true }],
      bconsultar: [{ value: '', disabled: true }],
      beliminar: [{ value: '', disabled: true }],
      bmodificar: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
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
          this.deleteRol.get('crol')?.setValue(this.crol);
          this.deleteRol.get('xdepartamento')?.setValue(response.data.xdepartamento);
          this.deleteRol.get('xrol')?.setValue(response.data.xrol);
          this.deleteRol.get('bcrear')?.setValue(response.data.bcrear);
          this.deleteRol.get('bconsultar')?.setValue(response.data.bconsultar);
          this.deleteRol.get('beliminar')?.setValue(response.data.beliminar);
          this.deleteRol.get('bmodificar')?.setValue(response.data.bmodificar);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/rol/']);
    });
  }

  open() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      template: this.DeleteRol
    };
    this.dialogRef = this.dialog.open(this.DeleteRol, config);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close();
    let dataDelete = {
      crol: this.crol,
      istatus: 'N'
    }
    this.http.post(environment.apiUrl + '/api/v1/security/rol/delete', dataDelete).subscribe((response: any) => {
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
