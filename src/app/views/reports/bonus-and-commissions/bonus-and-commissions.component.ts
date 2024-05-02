import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { clear } from 'console';

@Component({
  selector: 'app-bonus-and-commissions',
  templateUrl: './bonus-and-commissions.component.html',
  styleUrls: ['./bonus-and-commissions.component.scss']
})
export class BonusAndCommissionsComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('Alerta') InfoReceipt!: TemplateRef<any>;

  displayedColumns: string[] = ['poliza', 'cramo', 'descripcion', 'identificacion'];
  // displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>;
  defaultDataSource = new MatTableDataSource<any>;

  selection = new SelectionModel<any>(true, []);

  listMonedaOrden: any = [];

  rowsABuscar: any = [];
  listPaymentReceipts: any = [];

  dataSourceindex: any;

  total_comision = 0;
  total_impuesto = 0;
  total_comisionext = 0;
  total_cmoneda = '';

  listPaymentRequest: PaymentRequest[] = [];

  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {

    this.http.post(environment.apiUrl + '/api/v1/report/bonusAndCommissions', '').subscribe((response: any) => {

      console.log(response.data.list.search);

      this.defaultDataSource = new MatTableDataSource(response.data.list.search);
      this.dataSource = new MatTableDataSource(response.data.list.search);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

  }

  exportExcel() {

    // this.http.post(environment.apiUrl + '/api/v1/report/bonusAndCommissions', '').subscribe((response: any) => {

    //   console.log(response.data.list.search);

    //   this.defaultDataSource = new MatTableDataSource(response.data.list.search);
    //   this.dataSource = new MatTableDataSource(response.data.list.search);

    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // })

    // this.listData = []

        for(let i = 0; i < this.dataSource.data.length; i++){   
          if (new Date(this.dataSource.data[i])) {
            this.dataSource.data[i] = new Date(this.dataSource.data[i]).toISOString().substring(0, 10);
          }
        //   //fecha emisión Recibo
        //   let dateEReceipt = new Date(this.dataSource.data['Fecha desde Recibo'] );
        //   let fechaEmRec = dateEReceipt.toISOString().substring(0, 10);
        //    //fecha desde recibo
        //    let dateDePol = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Pol );
        //    let fechaDePol = dateDePol.toISOString().substring(0, 10);
        //    //fecha hasta Poliza
        //    let dateHPol = new Date(data.searchPaymentCollected.recibo[i].Fecha_hasta_Pol );
        //    let fechaHaPol = dateHPol.toISOString().substring(0, 10);
        //    //fecha desde recibo
        //    let dateDeReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_desde_Recibo );
        //    let fechaDeReceipt = dateDeReceipt.toISOString().substring(0, 10);
        //    //fecha hasta Recibo
        //    let dateHaReceipt = new Date(data.searchPaymentCollected.recibo[i].Fecha_hasta_Recibo );
        //    let fechaHaReceipt = dateHaReceipt.toISOString().substring(0, 10);
        //    let  estado = ''

        //    if(data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'P'){
        //     estado = 'Pendiente'

        //    }
        //    if(data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'C'){
        //     estado = 'Cobrado'

        //    }
        //    if(data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'A'){
        //     estado = 'Anulado'

        //    }
        //    if(data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'S'){
        //     estado = 'Suspendido'

        //    }
        //    if(data.searchPaymentCollected.recibo[i].Estado_del_Recibo == 'N'){
        //     estado = 'Notificado'

        //    }
        //    this.listData.push({
        //     Poliza: data.searchPaymentCollected.recibo[i].Nro_Poliza,
        //     // Codigo_Ramo: data.searchPaymentCollected.recibo[i].Codigo_Ramo,
        //     Descripcion_Ramo:data.searchPaymentCollected.recibo[i].Descripcion_Ramo,
        //     Fecha_Emision_Rec: fechaEmRec,
        //     Fecha_desde_Pol : fechaDePol,
        //     Fecha_hasta_Pol: fechaHaPol,
        //     CID: data.searchPaymentCollected.recibo[i].CID,
        //     Nombre_del_Tomador: data.searchPaymentCollected.recibo[i].Nombre_del_Tomador,
        //     Id_Asegurado: data.searchPaymentCollected.recibo[i].Id_Asegurado,
        //     Nombre_Asegurado: data.searchPaymentCollected.recibo[i].Nombre_Asegurado,
        //     // Cedula_Beneficiario: data.searchPaymentCollected.recibo[i].Id_del_Beneficiario,
        //     // Nombre_Beneficiario: data.searchPaymentCollected.recibo[i].Nombre_Beneficiario,
        //     // Codigo_Moneda: data.searchPaymentCollected.recibo[i].Codigo_Moneda,
        //     Moneda: data.searchPaymentCollected.recibo[i].Moneda,
        //     Nro_Recibo: data.searchPaymentCollected.recibo[i].Nro_Recibo,
        //     Fecha_desde_Recibo: fechaDeReceipt,
        //     Fecha_hasta_Recibo: fechaHaReceipt,
        //     // Estado_del_Recibo: data.searchPaymentCollected.recibo[i].Estado_del_Recibo,
        //     Descripcion_estado_rec: estado,
        //     Suma_asegurada: data.searchPaymentCollected.recibo[i].Suma_asegurada,
        //     Suma_asegurada_Ext: data.searchPaymentCollected.recibo[i].Suma_asegurada_Ext,
        //     Monto_Recibo: data.searchPaymentCollected.recibo[i].Monto_Recibo,
        //     Monto_Recibo_Ext: data.searchPaymentCollected.recibo[i].Monto_Recibo_Ext,
        //     Tasa_Cambio: data.searchPaymentCollected.recibo[i].Tasa_Cambio,
        //     Dias_de_vigencia: data.searchPaymentCollected.recibo[i].Dias_de_vigencia,
        //     Sucursal: data.searchPaymentCollected.recibo[i].Sucursal,
        //     // Descripcion_Corta_Sucursal: data.searchPaymentCollected.recibo[i].Descripcion_Corta_Sucursal,
        //     // cproductor: data.searchPaymentCollected.recibo[i].cproductor,
        //     Intermediario: data.searchPaymentCollected.recibo[i].Intermediario
        //   })
        }

    const filteredData = this.dataSource.data.map((item: any) => ({
      'Poliza': item['Nro. Poliza'],
      'Descripción_Ramo': item['Codigo del Ramo'],
      'Fecha_Emision_Rec': item['Nro. Poliza'],
      'Fecha_desde_Pol': item['Nro. Poliza'],
    }));
    const worksheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    // XLSX.utils.format_cell()
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
    saveAs(excelData, `Reporte de Bonos y Comisiones.xlsx`);
    this._snackBar.open("Reporte en Excel descargado con Éxito", "Cerrar", {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
    // } 
  }

  // makeExcel(){
  //   this.snackBar.open("Reporte en Excel descargado con Éxito", "Cerrar", {
  //     duration: 3000,
  //     panelClass: ['blue-snackbar'],  
  //   });
  //   let fecha = new Date()
  //   let day = fecha.getDate()
  //   let month = fecha.getMonth() + 1
  //   let year = fecha.getFullYear()
  //   var formato_fecha = fecha.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
  //     // if(this.consulta_reporte.get('estatus')?.value == 'C'){
  //     //   this.makeExcelCollection()
  //     // }
  //     // else{
  //         const filteredData = this.listPending.map((item :any) => ({
  //           'Poliza': item.Poliza,
  //           'Descripción_Ramo': item.Descripcion_Ramo,
  //           'Fecha_Emision_Rec': item.Fecha_Emision_Rec,
  //           'Fecha_desde_Pol' : item.Fecha_desde_Pol,
  //           'Fecha_hasta_Pol': item.Fecha_hasta_Pol,
  //           'Cedula_Tomador': item.CID,
  //           'Nombre_del_Tomador': item.Nombre_del_Tomador,
  //           'Cedula_Asegurado' : item.Id_Asegurado,
  //           'Nombre_Asegurado' : item.Nombre_Asegurado,
  //           'Moneda': item.Moneda,
  //           'Nro_Recibo' : item.Nro_Recibo,
  //           'Fecha_desde_Recibo' : item.Fecha_desde_Recibo,
  //           'Fecha_hasta_Recibo' : item.Fecha_hasta_Recibo,
  //           'Estatus_Recibo' :item.Descripcion_estado_rec,
  //           'Suma_asegurada': item.Suma_asegurada ? item.Suma_asegurada.toFixed(2) : 0.00,
  //           'Suma_asegurada_Ext': item.Suma_asegurada_Ext ? item.Suma_asegurada_Ext.toFixed(2) : 0.00,
  //           'Monto_Recibo' : item.Monto_Recibo,
  //           'Monto_Recibo_Ext' : item.Monto_Recibo_Ext,
  //           'Tasa_Cambio' : item.Tasa_Cambio,
  //           'Dias_de_vigencia' : item.Dias_de_vigencia,
  //           'Sucursal' :item.Sucursal,
  //           'Intermediario' :item.Intermediario,
  //     }));
  //       const worksheet = XLSX.utils.json_to_sheet(filteredData);
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  //       const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
  //       saveAs(excelData, `Reporte de recibos pendientes solicitados.xlsx`);
  //       // } 
  // }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    // alert(numSelected);
    // alert(numRows);
    return numSelected === numRows;
    // this.varable1 = 100;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.defaultDataSource.data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case '0': return this.compare(a.cproductor, b.cproductor, isAsc);
        case '1': return this.compare(a.xcliente, b.xcliente, isAsc);
        case '2': return this.compare(a.mmovcom, b.mmovcom, isAsc);
        case '3': return this.compare(a.mcomexttot, b.mcomexttot, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
