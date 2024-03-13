import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
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
    estado: this.report_form.get('fhasta')?.value,
  };
  let estado = this.report_form.get('fhasta')?.value
  this.http.get(environment.apiUrl_reporte + '/lamundialapi/recibos/'+ estado).subscribe((response: any) => {
    if (response.data.list) {
      this.dataSource.data = response.data.list;
    }
  });
}

buscarReporte(){

}
}
