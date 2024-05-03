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

  displayedColumns: string[] = ['poliza', 'descripcion', 'id-tomador', 'nombre-tomador', 'id-asegurado', 'nombre-asegurado', 'moneda', 'recibo', 'fecha-desde-rec', 'fecha-hasta-rec'];
  itemList: any = [];
  // displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>;
  dataSourceindex: any;
  defaultDataSource = new MatTableDataSource<any>;
  filteredData: any;
  
  constructor(private _formBuilder: FormBuilder,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,
    readonly dialog: MatDialog,
    private toast: MatSnackBar,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit() {
    this.itemList = [];

    this.http.post(environment.apiUrl + '/api/v1/report/bonusAndCommissions', '').subscribe((response: any) => {
      var data = response.data.list.search

      console.log(response.data.list.search);

      this.defaultDataSource = new MatTableDataSource(data);
      this.dataSource = new MatTableDataSource(data);
      this.itemList = new MatTableDataSource(data).data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;


      // this.itemList.push(
      //   {
      //     poliza: data['Nro. Poliza'],
      //     descripcion: data['Descripcion del Ramo'],
      //     identificacion: data['Identificacion'],
      //     tomador: data['Nombre del Tomador'],
      //   }
      // );
    })

  }

  exportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.itemList);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.itemList = this.dataSource.filteredData
    
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
