import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { userInfo } from 'os';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as  pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  report_form!: FormGroup;
  consulta_reporte!: FormGroup;
  submitted = false;
  name?: string;
  color: ThemePalette;
  showTable: boolean = true;
  selectedOption: string = '';

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['cedula', 'nombApell', 'correo', 'nrofac', 'hora_emision', 'cantidad_tickes', 'mcosto_ext', 'fingreso'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listPending: any = []
  listCollection: any = []

  listCollectedReport: any = []
  groupReceiptsForm = this.formBuilder.group({
    agrupado : this.formBuilder.array([])
  });

  constructor( private formBuilder: FormBuilder,
    private http: HttpClient,
      ) {
     }

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

  this.consulta_reporte = this.formBuilder.group({
    estatus: [''],
    correo: ['']
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

  let estado = this.consulta_reporte.get('estatus')?.value
  let url = environment.apiUrl_reporte + '/recibos/'+ estado + '/'
  // let url = environment.apiUrl_reporte + '/lamundialapi/recibos/'+ estado + '/'
  window.open(url, '_blank');

}

dataReport(){
  let estado = this.consulta_reporte.get('estatus')?.value

  // if(estado == 'C'){

  //   fetch(environment.apiUrl + '/api/v1/collection/search-collected/'+ estado )
  //   .then((response) => response.json())
  //   .then(data => {
  //     this.listCollection = data.searchPaymentCollected.recibo
  //   })

  // }else{

    fetch(environment.apiUrl + '/api/v1/collection/search-collected/'+ estado )
    .then((response) => response.json())
    .then(data => {
      this.listPending = data.searchPaymentCollected.recibo
    })

  // }


  
}

makeExcel(){
    // if(this.consulta_reporte.get('estatus')?.value == 'C'){
    //   this.makeExcelCollection()
    // }
    // else{
        const filteredData = this.listPending.map((item :any) => ({
          'Poliza': item.Nro_Poliza,
          'Código_Ramo': item.Codigo_Ramo,
          'Descripción_Ramo': item.Descripcion_Ramo,
          'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
          'Fecha_desde_Pol' : item.Fecha_desde_Pol,
          'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
          'CID,': item.CID,
          'Nombre_del_Tomador': item.Nombre_del_Tomador,
          'C.I./Asegurado' : item.Id_Asegurado,
          'Nombre_Asegurado' : item.Nombre_Asegurado,
          'C.I./Beneficiario' : item.Id_del_Beneficiario,
          'Nombre_Beneficiario,' :item.Nombre_Beneficiario,
          'Codigo_Moneda,': item.Codigo_Moneda,
          'Moneda': item.Moneda,
          'Nro_Recibo' : item.Nro_Recibo,
          'Fecha_desde_Recibo' : item.Fecha_desde_Recibo,
          'C.I./Fecha_hasta_Recibo' : item.Fecha_hasta_Recibo,
          'Estado_del_Recibo' :item.Estado_del_Recibo,
          'Descripcion_estado_rec' :item.Descripcion_estado_rec,
          'Suma_asegurada': item.Suma_asegurada,
          'Suma_asegurada_Ext': item.Suma_asegurada_Ext,
          'Monto_Recibo' : item.Monto_Recibo,
          'Tasa_Cambio' : item.Tasa_Cambio,
          'Dias_de_vigencia' : item.Dias_de_vigencia,
          'Sucursal' :item.Sucursal,
          'Descripcion_Corta_Sucursal' :item.Descripcion_Corta_Sucursal,
          'cproductor' :item.cproductor,
          'Intermediario' :item.Intermediario,

    }));
      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
      saveAs(excelData, `Reporte de recibos pendientes solicitados.xlsx`);
      // } 
}

makeExcelCollection(){
  const filteredData = this.listCollection.map((item :any) => ({
    'Poliza': item.Nro_Poliza,
    'Código_Ramo': item.Codigo_Ramo,
    'Descripción_Ramo': item.Descripcion_Ramo,
    'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
    'Fecha_desde_Pol' : item.Fecha_desde_Pol,
    'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
    'CID,': item.CID,
    'Nombre_del_Tomador': item.Nombre_del_Tomador,
    'C.I./Asegurado' : item.Id_Asegurado,
    'Nombre_Asegurado' : item.Nombre_Asegurado,
    'C.I./Beneficiario' : item.Id_del_Beneficiario,
    'Nombre_Beneficiario,' :item.Nombre_Beneficiario,
    'Codigo_Moneda,': item.Codigo_Moneda,
    'Moneda': item.Moneda,
    'Nro_Recibo' : item.Nro_Recibo,
    'Fecha_desde_Recibo' : item.Fecha_desde_Recibo,
    'C.I./Fecha_hasta_Recibo' : item.Fecha_hasta_Recibo,
    'Estado_del_Recibo' :item.Estado_del_Recibo,
    'Descripcion_estado_rec' :item.Descripcion_estado_rec,
    'Suma_asegurada': item.Suma_asegurada,
    'Suma_asegurada_Ext': item.Suma_asegurada_Ext,
    'Monto_Recibo' : item.Monto_Recibo,
    'Tasa_Cambio' : item.Tasa_Cambio,
    'Dias_de_vigencia' : item.Dias_de_vigencia,
    'Sucursal' :item.Sucursal,
    'Descripcion_Corta_Sucursal' :item.Descripcion_Corta_Sucursal,
    'cproductor' :item.cproductor,
    'Intermediario' :item.Intermediario,
    'mdiferencia' : item.mdiferencia,
    'mdiferenciaext' :item.mdiferenciaext,
    'idiferencia' :item.idiferencia,
    'mpago' :item.mpago,
    'mpagoext' :item.mpagoext,
    'xreferencia' :item.xreferencia,
    'cbanco_destino' :item.cbanco_destino,
    'xbanco' :item.xbanco,
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
    saveAs(excelData, `Reporte de recibos pendientes Cobrados.xlsx`);
} 

}


