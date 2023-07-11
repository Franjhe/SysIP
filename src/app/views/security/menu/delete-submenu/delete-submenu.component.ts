import { Component, OnInit, ViewChild, TemplateRef, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-submenu',
  templateUrl: './delete-submenu.component.html',
  styleUrls: ['./delete-submenu.component.scss']
})
export class DeleteSubmenuComponent {

  csubmenu: any;
  deleteSubMenu!: FormGroup;
  submitted = false;
  showModal = false;
  @ViewChild("DeleteSubMenu") private DeleteSubMenu!: TemplateRef<any>;
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
    this.deleteSubMenu = this.formBuilder.group({
      xmenuprincipal: [{ value: '', disabled: true }],
      xmenu: [{ value: '', disabled: true }],
      csubmenu: [{ value: '', disabled: true }],
      xsubmenu: [{ value: '', disabled: true }],
      xrutasubmenu: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.csubmenu = params['csubmenu'];
      this.getSubMenu();
    });
  }

  getSubMenu(){
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      let data = {
        csubmenu: this.csubmenu,
      };
      this.http.post(environment.apiUrl + '/api/v1/security/menu/info/submenu', data).subscribe((response: any) => {
        if (response.status) {
          this.deleteSubMenu.get('csubmenu')?.setValue(this.csubmenu);
          this.deleteSubMenu.get('xmenuprincipal')?.setValue(response.data.xmenuprincipal);
          this.deleteSubMenu.get('xmenu')?.setValue(response.data.xmenu);
          this.deleteSubMenu.get('xsubmenu')?.setValue(response.data.xsubmenu);
          this.deleteSubMenu.get('xrutasubmenu')?.setValue(response.data.xrutasubmenu);
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
      template: this.DeleteSubMenu
    };
    this.dialogRef = this.dialog.open(this.DeleteSubMenu, config);
  }

  closeModal() {
    this.dialogRef.close();
  }

  onSubmit(){
    this.dialogRef.close();
    let dataDelete = {
      csubmenu: this.csubmenu,
      istatus: 'N'
    }
    this.http.post(environment.apiUrl + '/api/v1/security/menu/delete/submenu', dataDelete).subscribe((response: any) => {
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
