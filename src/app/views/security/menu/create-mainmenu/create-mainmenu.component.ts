import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-mainmenu',
  templateUrl: './create-mainmenu.component.html',
  styleUrls: ['./create-mainmenu.component.scss']
})
export class CreateMainmenuComponent {

  createMainMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createMainMenu = this.formBuilder.group({
      xmenu: [''],
      xicono: [''],
      xruta: [''],
    });
  }

  backComponent(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['security/menu/']);
    });
  }

  onSubmit(form: any){
    if (this.createMainMenu.valid) {
      let dataCreate = {
        u_version: '?',
        xmenu: form.xmenu,
        xicono: form.xicono,
        xruta: form.xruta,
      }
      this.http.post(environment.apiUrl + '/api/v1/security/menu/create/main-menu', dataCreate).subscribe((response: any) => {
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

}