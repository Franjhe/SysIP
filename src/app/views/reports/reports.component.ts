import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, FormGroupDirective, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { userInfo } from 'os';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as  pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { log } from 'console';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})

export class ReportsComponent {

  consulta_reporte!: FormGroup;
  submitted = false;
  name?: string;
  color: ThemePalette;
  showButton: boolean = false;
  sendButton: boolean = false;
  selectedOption: string = '';
  correo: string = '';
  ctransaccion: string = '';
  fdesde_pol: string = '';


  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['cedula', 'nombApell', 'correo', 'nrofac', 'hora_emision', 'cantidad_tickes', 'mcosto_ext', 'fingreso'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listPending: any = []
  listCollection: any = []
  listCollectedReport: any = []
  valorList: any = []
  ctransaccion_receipt: any = []

  groupReceiptsForm = this.formBuilder.group({
    agrupado: this.formBuilder.array([])
  });

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
  }
  availableColors = [
    { name: 'Recibos Pendientes',  color: 'primary',  valor: 'P' },
    { name: 'Recibos Cobrados',    color: 'warn',     valor: 'C' },
    { name: 'Recibos Anulados',    color: 'accent',   valor: 'A' },
    { name: 'Recibos Notificados', color: 'warn',     valor: 'N' },
    { name: 'Detalle de Cobrados', color: 'accent',   valor: 'CD' },
    { name: 'Ingreso de Caja',     color: 'primary',  valor: 'I' },
  ];

  ngOnInit() {
    this.showButton = false
    this.consulta_reporte = this.formBuilder.group({
      estado: [''],
      fdesde_pol: [''],
      fhasta_pol: [''],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      ctransaccion: [''],
      
    });
  }
  saveSelection(opcion: string) {
    this.selectedOption = opcion;
    this.consulta_reporte.get('estado')?.setValue(this.selectedOption);
    this.dataReport();
  }
  selectValor(opcion: any) {
    this.valorList = opcion;
  }
  buscadorFiltro(event: Event) {
    this.ctransaccion_receipt = (event.target as HTMLInputElement).value;
  }
  buscarTransaccion() {
    let buscarTransaccion = {
      ctransaccion: this.consulta_reporte.get('ctransaccion')?.value,
    };
    window.open(environment.apiUrl_prod + '/sis2000/ingreso_caja/' + this.ctransaccion_receipt + '/', '_blank');
  }
  onSubmit() {
    let data = {
      estado: this.consulta_reporte.get('estado')?.value,
      fdesde_pol: this.consulta_reporte.get('fdesde_pol')?.value,
      fhasta_pol: this.consulta_reporte.get('fhasta_pol')?.value,
    };
    this.http.post(environment.apiUrl_reporte + '/single_receipts/', data).subscribe((response: any) => {
    });
  }
  buscarReporte() {
    this.snackBar.open("Reporte en PDF descargado con Éxito", "Cerrar", {
      duration: 3000,
    });
    let data = {
      estado: this.consulta_reporte.get('estado')?.value,
      fdesde_pol: this.consulta_reporte.get('fdesde_pol')?.value,
      fhasta_pol: this.consulta_reporte.get('fhasta_pol')?.value,
    };
    var mediaType = 'application/pdf';
    let path = '';
    if (data.estado == 'CD') {
      path = '/cobranza/';
    } else {
      path = '/single_receipts/';
    }
    try {
      this.http.post(environment.apiUrl_prod + path, JSON.stringify(data), { responseType: 'blob' }).subscribe(
        (response) => {
          var blob = new Blob([response], { type: mediaType });
          saveAs(blob, 'reporte.pdf');
        },
      );
    } catch (e) {
      console.log(e);
    }
  }
  activateSendButton() {
    if (this.consulta_reporte.invalid) {
      this.snackBar.open(`Ingrese un correo valido`, '', {
        duration: 5000,
      });
      this.consulta_reporte.get('correo')?.setValue('')
      this.sendButton = false;
    } else {
      this.sendButton = true;
    }
  }
  dataReport() {
    let estado = this.consulta_reporte.get('estado')?.value;
    let fdesde_pol = this.consulta_reporte.get('fdesde_pol')?.value;
    let fhasta_pol = this.consulta_reporte.get('fhasta_pol')?.value;
    if (estado !== 'CD') {
      this.showButton = true
      fetch(environment.apiUrl + '/api/v1/collection/search-collected/' + estado)
        .then((response) => response.json())
        .then(data => {
          this.listPending = []
          for (let i = 0; i < data.searchPaymentCollected.recibo.length; i++) {
            let fechaFiltro = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Pol).toISOString().substring(0, 10);
            //fecha emisión Recibo
            let dateEReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_Emision_Rec);
            let fechaEmRec = dateEReceipt.toISOString().substring(0, 10);
            //fecha desde recibo
            let dateDePol = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Pol);
            let fechaDePol = dateDePol.toISOString().substring(0, 10);
            //fecha hasta Poliza
            let dateHPol = new Date(data.searchPaymentCollected.recibo[i].Fecha_hasta_Pol);
            let fechaHaPol = dateHPol.toISOString().substring(0, 10);
            //fecha desde recibo
            let dateDeReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Recibo);
            let fechaDeReceipt = dateDeReceipt.toISOString().substring(0, 10);
            //fecha hasta Recibo
            let dateHaReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_hasta_Recibo);
            let fechaHaReceipt = dateHaReceipt.toISOString().substring(0, 10);
            //fecha Cobro Recibo
            let dateFCreceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_Cobro);
            let fechaDeCobro = dateFCreceipt.toISOString().substring(0, 10); 
            let estado = ''

            if (data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'P') {
              estado = 'Pendiente'

            }
            if (data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'C') {
              estado = 'Cobrado'

            }
            if (data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'A') {
              estado = 'Anulado'

            }
            if (data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'S') {
              estado = 'Suspendido'

            }
            if (data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'N') {
              estado = 'Notificado'
            } 
            this.listPending.push({
              Poliza: data.searchPaymentCollected.recibo[i].Nro_Poliza,
              Descripcion_Ramo: data.searchPaymentCollected.recibo[i].Descripcion_Ramo,
              Fecha_Emision_Rec: fechaEmRec,
              Fecha_desde_Pol: fechaDePol,
              Fecha_hasta_Pol: fechaHaPol,
              CID: data.searchPaymentCollected.recibo[i].CID,
              Nombre_del_Tomador: data.searchPaymentCollected.recibo[i].Nombre_del_Tomador,
              Id_Asegurado: data.searchPaymentCollected.recibo[i].Id_Asegurado,
              Nombre_Asegurado: data.searchPaymentCollected.recibo[i].Nombre_Asegurado,
              Moneda: data.searchPaymentCollected.recibo[i].Moneda,
              Nro_Recibo: data.searchPaymentCollected.recibo[i].Nro_Recibo,
              Fecha_desde_Recibo: fechaDeReceipt,
              Fecha_hasta_Recibo: fechaHaReceipt,
              Descripcion_estado_rec: estado,
              Suma_asegurada: data.searchPaymentCollected.recibo[i].Suma_asegurada,
              Suma_asegurada_Ext: data.searchPaymentCollected.recibo[i].Suma_asegurada_Ext,
              Monto_Recibo: data.searchPaymentCollected.recibo[i].Monto_Recibo,
              Monto_Recibo_Ext: data.searchPaymentCollected.recibo[i].Monto_Recibo_Ext,
              Tasa_Cambio: data.searchPaymentCollected.recibo[i].Tasa_Cambio,
              Dias_de_vigencia: data.searchPaymentCollected.recibo[i].Dias_de_vigencia,
              Sucursal: data.searchPaymentCollected.recibo[i].Sucursal,
              Intermediario: data.searchPaymentCollected.recibo[i].Intermediario,
              Fecha_Cobro: fechaDeCobro,
              Poliza_Origen: data.searchPaymentCollected.recibo[i].Poliza_Origen,     
            })
          }
        })
    } 
    else {
      this.showButton = true
    //   window.open('https://api.lamundialdeseguros.com/sis2000/cobranza/', '_blank');
     }
  }
  makeExcel() {
    this.snackBar.open("Reporte en Excel descargado con Éxito", "Cerrar", {
      duration: 3000,
    });
    let fecha = new Date()
    let day = fecha.getDate()
    let month = fecha.getMonth() + 1
    let year = fecha.getFullYear()
    var formato_fecha = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let filteredData = []
    let fdesde_pol = this.consulta_reporte.get('fdesde_pol')?.value;
    let fhasta_pol = this.consulta_reporte.get('fhasta_pol')?.value;
    fdesde_pol = fdesde_pol ? fdesde_pol : '1900-01-01';
    fhasta_pol = fhasta_pol ? fhasta_pol : '2100-01-01';
    if (this.valorList == 'C') {

      for (let item of this.listPending) {
        let fechaFiltro = new Date(item.Fecha_Cobro).toISOString().substring(0, 10);
        if (fechaFiltro >= fdesde_pol && fechaFiltro <= fhasta_pol) {
          filteredData.push({
            'Poliza': item.Poliza,
            'Descripción_Ramo': item.Descripcion_Ramo,
            'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
            'Fecha_desde_Pol': item.Fecha_desde_Pol,
            'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
            'Cedula_Tomador': item.CID,
            'Nombre_del_Tomador': item.Nombre_del_Tomador,
            'Cedula_Asegurado': item.Id_Asegurado,
            'Nombre_Asegurado': item.Nombre_Asegurado,
            'Moneda': item.Moneda,
            'Nro_Recibo': item.Nro_Recibo,
            'Fecha_desde_Recibo': item.Fecha_desde_Recibo,
            'Fecha_hasta_Recibo': item.Fecha_hasta_Recibo,
            'Estatus_Recibo': item.Descripcion_estado_rec,
            'Suma_asegurada': item.Suma_asegurada ? item.Suma_asegurada.toFixed(2) : 0.00,
            'Suma_asegurada_Ext': item.Suma_asegurada_Ext ? item.Suma_asegurada_Ext.toFixed(2) : 0.00,
            'Monto_Recibo': item.Monto_Recibo,
            'Monto_Recibo_Ext': item.Monto_Recibo_Ext,
            'Tasa_Cambio': item.Tasa_Cambio,
            'Dias_de_vigencia': item.Dias_de_vigencia,
            'Sucursal': item.Sucursal,
            'Intermediario': item.Intermediario,
            'Fecha_Cobro': (item.Fecha_Cobro == '1970-01-01') ? 'N/A' : item.Fecha_Cobro,
            'Poliza_Origen': item.Poliza_Origen == null ? 'N/A' : item.Poliza_Origen,
          })
        }
      }
    }
    else {
      for (let item of this.listPending) {
        let fechaFiltro = new Date(item.Fecha_desde_Recibo).toISOString().substring(0, 10);
        if (fechaFiltro >= fdesde_pol && fechaFiltro <= fhasta_pol) {
          filteredData.push({
            'Poliza': item.Poliza,
            'Descripción_Ramo': item.Descripcion_Ramo,
            'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
            'Fecha_desde_Pol': item.Fecha_desde_Pol,
            'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
            'Cedula_Tomador': item.CID,
            'Nombre_del_Tomador': item.Nombre_del_Tomador,
            'Cedula_Asegurado': item.Id_Asegurado,
            'Nombre_Asegurado': item.Nombre_Asegurado,
            'Moneda': item.Moneda,
            'Nro_Recibo': item.Nro_Recibo,
            'Fecha_desde_Recibo': item.Fecha_desde_Recibo,
            'Fecha_hasta_Recibo': item.Fecha_hasta_Recibo,
            'Estatus_Recibo': item.Descripcion_estado_rec,
            'Suma_asegurada': item.Suma_asegurada ? item.Suma_asegurada.toFixed(2) : 0.00,
            'Suma_asegurada_Ext': item.Suma_asegurada_Ext ? item.Suma_asegurada_Ext.toFixed(2) : 0.00,
            'Monto_Recibo': item.Monto_Recibo,
            'Monto_Recibo_Ext': item.Monto_Recibo_Ext,
            'Tasa_Cambio': item.Tasa_Cambio,
            'Dias_de_vigencia': item.Dias_de_vigencia,
            'Sucursal': item.Sucursal,
            'Intermediario': item.Intermediario,
            'Fecha_Cobro': (item.Fecha_Cobro == '1970-01-01') ? 'N/A' : item.Fecha_Cobro,
            'Poliza_Origen': item.Poliza_Origen == null ? 'N/A' : item.Poliza_Origen,
          })
        }
      }
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
    saveAs(excelData, `Reporte de Recibos.xlsx`);
  }
  makeExcelCollection() {
    this.snackBar.open("Reporte en Excel descargado con Éxito", "Cerrar", {
      duration: 3000,
    });
    const filteredData = this.listCollection.map((item: any) => ({
      'Cod_Transaccion': item.ctransaccion,
      'C.I/Asegurado': item.casegurado,
      'Nombre_Apellido': item.xcliente,
      'Fecha_Reporte': item.freporte,
      'Monto_Transaccion': item.mpago,
      'Monto_Transaccion_Ext': item.mpagoext,
      'Tasa': item.ptasamon ? item.ptasamon.toFixed(2) : 0.00,
      //     Soporte Recibo
      'Recibo': item.cnrecibo,
      'Monto_Recibo': item.mmontorec,
      'Monto_Recibo_Ext,': item.mmontorecext,
      'Fecha_Ingreso,': item.fingreso,
      'Fecha_Cobro': item.fcobro,
      'Diferencia_Bs': item.mdiferencia,
      'Diferencia_Dolares': item.mdiferenciaext,
      'Tasa_Diferencia': item.ptasamon,
      'Moneda_Diferencia': item.cmoneda,
      'Observacion': item.xobservacion,
      //     Soporte Transacción
      'banco_destino': item.cbanco_destino,
      'banco_origen': item.cbanco_origen,
      'tasa': item.ptasamon,
      'moneda': item.cmoneda,
      'pago_total': item.mpago,
      'pago_total_ext': item.monto_declarado_ext,
      'Pago_igtf': item.mpagoigtf,
      'Referencia': item.xreferencia,
    }));
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
    saveAs(excelData, `Detalle de recibos pendientes Cobrados.xlsx`);
  }
  sendMail() {
    let estado = this.consulta_reporte.get('estado')?.value
    let variable = (<HTMLInputElement>document.getElementById("prueba1")).value;
    this.http.get(environment.apiUrl + '/api/v1/report/email/' + estado).subscribe((response: any) => {
      console.log(response, this.correo)
    });

  }

}


