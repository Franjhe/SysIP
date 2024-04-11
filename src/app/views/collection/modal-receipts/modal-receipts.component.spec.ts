import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild, NgModule } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { ModalReceiptsComponent } from './modal-receipts.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.scss'],
})
export class PaymentRequestsComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentRequestsComponent>
  ) {}

  ngOnInit() {
    alert('XD');
  }
  
}