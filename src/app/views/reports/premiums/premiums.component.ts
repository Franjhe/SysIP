import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {ThemePalette} from '@angular/material/core';
import {NgFor} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.component.html',
  styleUrls: ['./premiums.component.scss']
})
export class PremiumsComponent {
  name?: string;
  color: ThemePalette;
  showTable: boolean = true;

  availableColors = [
    {name: 'Primas Pendientes', color: 'primary'},
    {name: 'Primas Cobradas', color: 'warn'},
  ];

  selectedOption: string = '';

  guardarSeleccion(opcion: string) {
    this.selectedOption = opcion;

    console.log(this.selectedOption)
  }
  
}
