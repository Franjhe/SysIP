import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-mainmenu',
  templateUrl: './delete-mainmenu.component.html',
  styleUrls: ['./delete-mainmenu.component.scss']
})
export class DeleteMainmenuComponent {

  cmenu_principal: any;
  deleteMainMenu!: FormGroup;
  submitted = false;
  showModal = false;
  @ViewChild("DeleteMainMenu") private DeleteMainMenu!: TemplateRef<any>;
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
    this.deleteMainMenu = this.formBuilder.group({
      cmenu_principal: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      xicono: [{ value: '', disabled: true }],
      xruta: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.cmenu_principal = params['cmenu_principal'];
      this.getMainMenu();
    });
  }

  getMainMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        cmenu_principal: this.cmenu_principal,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/main-menu', data).subscribe((response: any) => {
        if (response.status) {
          this.deleteMainMenu.get('cmenu_principal')?.setValue(this.cmenu_principal);
          this.deleteMainMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.deleteMainMenu.get('xicono')?.setValue(response.data.xicono);
          this.deleteMainMenu.get('xruta')?.setValue(response.data.xruta);
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
      template: this.DeleteMainMenu
    };
    this.dialogRef = this.dialog.open(this.DeleteMainMenu, config);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close();
    let dataDelete = {
      cmenu_principal: this.cmenu_principal,
      istatus: 'N'
    }
    this.http.post(environment.apiUrl + '/api/v1/security/menu/delete/main-menu', dataDelete).subscribe((response: any) => {
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
