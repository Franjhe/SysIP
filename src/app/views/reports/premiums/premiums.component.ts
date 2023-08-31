import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-premiums',
  templateUrl: './premiums.component.html',
  styleUrls: ['./premiums.component.scss']
})
export class PremiumsComponent {

  report_form!: FormGroup;
  submitted = false;
  name?: string;
  color: ThemePalette;
  showTable: boolean = true;
  selectedOption: string = '';

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['cedula', 'nombApell', 'correo', 'nrofac', 'hora_emision', 'cantidad_tickes', 'mcosto_ext', 'fingreso'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) {}

  availableColors = [
    {name: 'Primas Pendientes', color: 'primary'},
    {name: 'Primas Cobradas', color: 'warn'},
  ];

  ngOnInit() {
    this.report_form = this.formBuilder.group({
      bprima: [''],
      fdesde: [''],
      fhasta: ['']
    });
  }

  saveSelection(opcion: string) {
    this.selectedOption = opcion;
    this.report_form.get('bprima')?.setValue(this.selectedOption);
  }

  onSubmit(){
    let data = {
      bprima: this.report_form.get('bprima')?.value,
      fdesde: this.report_form.get('fdesde')?.value,
      fhasta: this.report_form.get('fhasta')?.value,
    };
    this.http.post(environment.apiUrl + '/api/v1/report/search', data).subscribe((response: any) => {
      if (response.data.list) {
        this.dataSource.data = response.data.list;
      }
    });
  }
  
}
