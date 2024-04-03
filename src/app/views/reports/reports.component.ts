import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray, FormGroupDirective, NgForm, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


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
    private snackBar: MatSnackBar,
      ) {
     }

availableColors = [
{name: 'Primas Pendientes', color: 'primary'},
{name: 'Primas Cobradas', color: 'warn'},
];
ngOnInit() {
  this.showButton = false


  this.consulta_reporte = this.formBuilder.group({
    estado: [''],
    fdesde_pol: [''],
    fhasta_pol: [''],
    correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
  });
}

saveSelection(opcion: string) {
  this.selectedOption = opcion;
  this.consulta_reporte.get('bprima')?.setValue(this.selectedOption);
}

onSubmit(){
  let data = {
    estado: this.consulta_reporte.get('estado')?.value,
    fdesde_pol: this.consulta_reporte.get('fdesde_pol')?.value,
    fhasta_pol: this.consulta_reporte.get('fhasta_pol')?.value,
  };
  // let estado = this.consulta_reporte.get('fhasta')?.value
  this.http.post(environment.apiUrl_reporte + '/single_receipts/', data).subscribe((response: any) => {
    // if (response.data.list) {
    //   this.dataSource.data = response.data.list;
    // }
  });
}
buscarReporte(){
  // window.open(environment.apiUrl_prod + '/single_receipts/', '_blank');
  let data = {
    estado: this.consulta_reporte.get('estado')?.value,
    fdesde_pol: this.consulta_reporte.get('fdesde_pol')?.value,
    fhasta_pol: this.consulta_reporte.get('fhasta_pol')?.value,
  };

  // var form = document.getElementById("formato");
  // document.body.appendChild(this.consulta_reporte.value);
  //   window.open('', 'view');
  //   form?.click;
  
    
  var mediaType = 'application/pdf';
  try {
    this.http.post(environment.apiUrl_prod + '/single_receipts/', JSON.stringify(data), { responseType: 'blob' }).subscribe(
      (response) => {
          var blob = new Blob([response], { type: mediaType });
          saveAs(blob, 'reporte.pdf');
        },
        // e => { throwError(e); }
    );
  } catch (e) {
    console.log(e);
  }
}

activateSendButton(){
  if(this.consulta_reporte.invalid){
    this.snackBar.open(`Ingrese un correo valido`, '', {
      duration: 5000,
    });
    this.consulta_reporte.get('correo')?.setValue('')
    this.sendButton = false;
  }else{
    this.sendButton = true;
  }
}

dataReport(){
  let estado = this.consulta_reporte.get('estado')?.value
  this.showButton = true
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

      this.listPending = []
      for(let i = 0; i < data.searchPaymentCollected.recibo.length; i++){   
        //fecha emisión Recibo
        let dateEReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_Emision_Rec );
        let fechaEmRec = dateEReceipt.toISOString().substring(0, 10);
         //fecha desde recibo
         let dateDePol = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Pol );
         let fechaDePol = dateDePol.toISOString().substring(0, 10);
        //fecha hasta Poliza
        let dateHPol = new Date(data.searchPaymentCollected.recibo[i].Fecha_hasta_Pol );
        let fechaHaPol = dateHPol.toISOString().substring(0, 10);
        //fecha desde recibo
        let dateDeReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Recibo );
        let fechaDeReceipt = dateDeReceipt.toISOString().substring(0, 10);
        //fecha hasta Recibo
        let dateHaReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_hasta_Recibo );
        let fechaHaReceipt = dateHaReceipt.toISOString().substring(0, 10);

        this.listPending.push({
          Poliza: data.searchPaymentCollected.recibo[i].Nro_Poliza,
          // Codigo_Ramo: data.searchPaymentCollected.recibo[i].Codigo_Ramo,
          Descripcion_Ramo:data.searchPaymentCollected.recibo[i].Descripcion_Ramo,
          Fecha_Emision_Rec: fechaEmRec,
          Fecha_desde_Pol : fechaDePol,
          Fecha_hasta_Pol: fechaHaPol,
          CID: data.searchPaymentCollected.recibo[i].CID,
          Nombre_del_Tomador: data.searchPaymentCollected.recibo[i].Nombre_del_Tomador,
          Id_Asegurado: data.searchPaymentCollected.recibo[i].Id_Asegurado,
          Nombre_Asegurado: data.searchPaymentCollected.recibo[i].Nombre_Asegurado,
          // Cedula_Beneficiario: data.searchPaymentCollected.recibo[i].Id_del_Beneficiario,
          // Nombre_Beneficiario: data.searchPaymentCollected.recibo[i].Nombre_Beneficiario,
          // Codigo_Moneda: data.searchPaymentCollected.recibo[i].Codigo_Moneda,
          Moneda: data.searchPaymentCollected.recibo[i].Moneda,
          Nro_Recibo: data.searchPaymentCollected.recibo[i].Nro_Recibo,
          Fecha_desde_Recibo: fechaDeReceipt,
          Fecha_hasta_Recibo: fechaHaReceipt,
          // Estado_del_Recibo: data.searchPaymentCollected.recibo[i].Estado_del_Recibo,
          Descripcion_estado_rec: data.searchPaymentCollected.recibo[i].Descripcion_estado_rec,
          Suma_asegurada: data.searchPaymentCollected.recibo[i].Suma_asegurada,
          Suma_asegurada_Ext: data.searchPaymentCollected.recibo[i].Suma_asegurada_Ext,
          Monto_Recibo: data.searchPaymentCollected.recibo[i].Monto_Recibo,
          Monto_Recibo_Ext: data.searchPaymentCollected.recibo[i].Monto_Recibo_Ext,
          Tasa_Cambio: data.searchPaymentCollected.recibo[i].Tasa_Cambio,
          Dias_de_vigencia: data.searchPaymentCollected.recibo[i].Dias_de_vigencia,
          Sucursal: data.searchPaymentCollected.recibo[i].Sucursal,
          // Descripcion_Corta_Sucursal: data.searchPaymentCollected.recibo[i].Descripcion_Corta_Sucursal,
          // cproductor: data.searchPaymentCollected.recibo[i].cproductor,
          Intermediario: data.searchPaymentCollected.recibo[i].Intermediario
        })
      }

    })

  }
makeExcel(){
  let fecha = new Date()
  let day = fecha.getDate()
  let month = fecha.getMonth() + 1
  let year = fecha.getFullYear()
  var formato_fecha = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    // if(this.consulta_reporte.get('estatus')?.value == 'C'){
    //   this.makeExcelCollection()
    // }
    // else{
        const filteredData = this.listPending.map((item :any) => ({

          'Poliza': item.Poliza,
          // 'Código_Ramo': item.Codigo_Ramo,
          'Descripción_Ramo': item.Descripcion_Ramo,
          'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
          'Fecha_desde_Pol' : item.Fecha_desde_Pol,
          'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
          'Cedula_Tomador': item.CID,
          'Nombre_del_Tomador': item.Nombre_del_Tomador,
          'Cedula_Asegurado' : item.Id_Asegurado,
          'Nombre_Asegurado' : item.Nombre_Asegurado,
          // 'C.I./Beneficiario' : item.Id_del_Beneficiario,
          // 'Nombre_Beneficiario,' :item.Nombre_Beneficiario,
          // 'Codigo_Moneda,': item.Codigo_Moneda,
          'Moneda': item.Moneda,
          'Nro_Recibo' : item.Nro_Recibo,
          'Fecha_desde_Recibo' : item.Fecha_desde_Recibo,
          'Fecha_hasta_Recibo' : item.Fecha_hasta_Recibo,
          // 'Estado_del_Recibo' :item.Estado_del_Recibo,
          'Estatus_Recibo' :item.Descripcion_estado_rec,
          'Suma_asegurada': item.Suma_asegurada ? item.Suma_asegurada.toFixed(2) : 0.00,
          'Suma_asegurada_Ext': item.Suma_asegurada_Ext ? item.Suma_asegurada_Ext.toFixed(2) : 0.00,
          'Monto_Recibo' : item.Monto_Recibo,
          'Monto_Recibo_Ext' : item.Monto_Recibo_Ext,
          'Tasa_Cambio' : item.Tasa_Cambio,
          'Dias_de_vigencia' : item.Dias_de_vigencia,
          'Sucursal' :item.Sucursal,
          // 'Descripcion_Corta_Sucursal' :item.Descripcion_Corta_Sucursal,
          // 'cproductor' :item.cproductor,
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

// makeExcelCollection(){
//   const filteredData = this.listCollection.map((item :any) => ({
//     'Poliza': item.Nro_Poliza,
//     'Código_Ramo': item.Codigo_Ramo,
//     'Descripción_Ramo': item.Descripcion_Ramo,
//     'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
//     'Fecha_desde_Pol' : item.Fecha_desde_Pol,
//     'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
//     'CID': item.CID,
//     'Nombre_del_Tomador': item.Nombre_del_Tomador,
//     'C.I./Asegurado' : item.Id_Asegurado,
//     'Nombre_Asegurado' : item.Nombre_Asegurado,
//     'C.I./Beneficiario' : item.Id_del_Beneficiario,
//     'Nombre_Beneficiario,' :item.Nombre_Beneficiario,
//     'Codigo_Moneda,': item.Codigo_Moneda,
//     'Moneda': item.Moneda,
//     'Nro_Recibo' : item.Nro_Recibo,
//     'Fecha_desde_Recibo' : item.Fecha_desde_Recibo,
//     'C.I./Fecha_hasta_Recibo' : item.Fecha_hasta_Recibo,
//     'Estado_del_Recibo' :item.Estado_del_Recibo,
//     'Descripcion_estado_rec' :item.Descripcion_estado_rec,
//     'Suma_asegurada': item.Suma_asegurada,
//     // 'Suma_asegurada_Ext': item.Suma_asegurada_Ext,
//     'Monto_Recibo' : item.Monto_Recibo,
//     'Monto_Recibo_Ext' : item.Monto_Recibo_Ext,
//     'Tasa_Cambio' : item.Tasa_Cambio,
//     'Dias_de_vigencia' : item.Dias_de_vigencia,
//     'Sucursal' :item.Sucursal,
//     'Descripcion_Corta_Sucursal' :item.Descripcion_Corta_Sucursal,
//     'cproductor' :item.cproductor,
//     'Intermediario' :item.Intermediario,
//     'mdiferencia' : item.mdiferencia,
//     'mdiferenciaext' :item.mdiferenciaext,
//     'idiferencia' :item.idiferencia,
//     'mpago' :item.mpago,
//     'mpagoext' :item.mpagoext,
//     'xreferencia' :item.xreferencia,
//     'cbanco_destino' :item.cbanco_destino,
//     'xbanco' :item.xbanco,
//     }));
//     const worksheet = XLSX.utils.json_to_sheet(filteredData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
//     const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
//     saveAs(excelData, `Reporte de recibos pendientes Cobrados.xlsx`);
// } 

sendMail(){
  let estado = this.consulta_reporte.get('estado')?.value
  let variable = (<HTMLInputElement>document.getElementById("prueba1")).value;
  this.http.get(environment.apiUrl + '/api/v1/report/email/'+ estado).subscribe((response: any) => {
    console.log(response, this.correo)
  });
  
}

}


