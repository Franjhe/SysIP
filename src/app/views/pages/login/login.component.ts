import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { AuthenticationService } from '../../../../app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  SingIn!: FormGroup
  submitted = false;
  loading = false;
  error = '';
  autentification =  false
  public showPassword: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
      // redirect to home if already logged in
    this.createForm();
      // redirect to home if already logged in
    if (this.authenticationService.userValue) { 
      this.router.navigate(['/dashboard']);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.SingIn.controls;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private createForm() {
    this.SingIn =this.formBuilder.group(
      {
        xlogin: new FormControl ('', [Validators.required,Validators.minLength(2)]),
        xclavesec: new FormControl('', Validators.required),
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.SingIn.invalid) {
      return;
    }
    this.error = '';
    this.loading = true;

    this.authenticationService.login(this.f['xlogin'].value, this.f['xclavesec'].value)
        .pipe(first())
        .subscribe({
            next: () => {
                // get return url from route parameters or default to '/'
                const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
                this.router.navigate([returnUrl]);
            }
        });

  }

  onReset(): void {
    this.submitted = false;
    this.SingIn.reset();
  }

  ShowModal(){
    this.autentification = false
  }

}
