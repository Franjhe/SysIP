import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

  cusuario: any;
  deleteUser!: FormGroup;
  submitted = false;
  showModal = false;
  @ViewChild("DeleteUser") private DeleteUser!: TemplateRef<any>;
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
    this.deleteUser = this.formBuilder.group({
      cusuario: [{ value: '', disabled: true }],
      xnombre: [{ value: '', disabled: true }],
      xapellido: [{ value: '', disabled: true }],
      xlogin: [{ value: '', disabled: true }],
      xusuario: [{ value: '', disabled: true }],
      xcorreo: [{ value: '', disabled: true }],
      xobservacion: [{ value: '', disabled: true }],
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
          this.deleteUser.get('cusuario')?.setValue(this.cusuario);
          this.deleteUser.get('xnombre')?.setValue(response.data.xnombre);
          this.deleteUser.get('xapellido')?.setValue(response.data.xapellido);
          this.deleteUser.get('xlogin')?.setValue(response.data.xlogin);
          this.deleteUser.get('xusuario')?.setValue(response.data.xusuario);
          this.deleteUser.get('xcorreo')?.setValue(response.data.xcorreo);
          this.deleteUser.get('xobservacion')?.setValue(response.data.xobservacion);
        }
      });
    }
  }

  open() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      template: this.DeleteUser
    };
    this.dialogRef = this.dialog.open(this.DeleteUser, config);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close();
    let dataDelete = {
      cusuario: parseInt(this.cusuario),
      istatus: 'N'
    }
    this.http.post(environment.apiUrl + '/api/v1/security/user/delete', dataDelete).subscribe((response: any) => {
      if (response.status) {
        this.snackBar.open(`${response.data.message}`, '', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['security/user/']);
          });
        });
      }
    });
  }

}
