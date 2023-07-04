import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-menu',
  templateUrl: './info-menu.component.html',
  styleUrls: ['./info-menu.component.scss']
})
export class InfoMenuComponent {

  cmenu_principal: any;
  cmenu: any;
  csubmenu: any;
  infoMenu!: FormGroup;
  submitted = false;

  constructor(
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}


  ngOnInit() {
    this.infoMenu = this.formBuilder.group({
      cdepartamento: [{ value: '', disabled: true }],
      xdepartamento: [{ value: '', disabled: true }],
      istatus: [{ value: '', disabled: true }],
    });

    this.route.params.subscribe(params => {
      this.cmenu = params['cmenu'];
      // this.getDepartament();
    });
  }
}
