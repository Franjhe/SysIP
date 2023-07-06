import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.scss']
})
export class DeleteMenuComponent {

  cmenu: any;
  deleteMenu!: FormGroup;
  submitted = false;
  showModal = false;
  @ViewChild("DeleteMenu") private DeleteMenu!: TemplateRef<any>;
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
    this.deleteMenu = this.formBuilder.group({
      xmenuprincipal: [{ value: '', disabled: true }],
      cmenu: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      xrutamenu: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.cmenu = params['cmenu'];
      this.getMenu();
    });
  }

  getMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        cmenu: this.cmenu,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/menu', data).subscribe((response: any) => {
        if (response.status) {
          this.deleteMenu.get('cmenu')?.setValue(this.cmenu);
          this.deleteMenu.get('xmenuprincipal')?.setValue(response.data.xmenuprincipal);
          this.deleteMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.deleteMenu.get('xrutamenu')?.setValue(response.data.xrutamenu);
        }
      });
    }
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/menu/']);
    });
  }

  open() {
    const config: MatDialogConfig = new MatDialogConfig();
    config.data = {
      template: this.DeleteMenu
    };
    this.dialogRef = this.dialog.open(this.DeleteMenu, config);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close();
    let dataDelete = {
      cmenu: this.cmenu,
      istatus: 'N'
    }
    this.http.post(environment.apiUrl + '/api/v1/security/menu/delete/menu', dataDelete).subscribe((response: any) => {
      if (response.status) {
        this.snackBar.open(`${response.data.message}`, '', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['security/menu/']);
          });
        });
      }
    });
  }

}
