import { saveAs } from 'file-saver';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import { TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginatorIntl, PageEvent} from "@angular/material/paginator";
import {ThemePalette} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ElementRef } from '@angular/core';

export interface polizaDate {
  Nro_Poliza: string;
  Descripcion_Ramo: string;
  Sucursal: string;
  Intermediario: string;
  Dias_de_vigencia: number;
  Nombre_Asegurado: string;
  Id_Asegurado: string;
  Nro_Recibo: string;
  Estado_del_Recibo: string;
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: polizaDate[];
}

@Component({
  selector: 'app-poliza',
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.scss']
})
export class PolizaComponent implements AfterViewInit {

  consulta_reporte!: FormGroup;
  
  showButton: boolean = true;
  
  selection = new SelectionModel<any>(true, []);

  dataSource = new MatTableDataSource<any>;

  currentUser!: any
  token!: any;
  poliza: any;
  recibosData: any;

  defaultDataSource = new MatTableDataSource<any>;
  
  displayedColumns: string[] = ['select','Nro_Poliza', 'Descripcion_Ramo', 'Intermediario', 'Dias_de_vigencia', 'Id_Asegurado', 'Nombre_Asegurado'];
  
  ColumnsRecibos: string[] = ['cnrecibo', 'Cuotas', 'Fecha_desde_Rec', 'Fecha_hasta_Rec', 'Monto_Rec', 'Monto_Rec_Ext', 'Status_Rec'];

  // Para las Pólizas
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('nroPolizaInput') nroPolizaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ciTomadorInput') ciTomadorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('tomadorInput') tomadorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('ciAseguradoInput') ciAseguradoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nombreAseguradoInput') nombreAseguradoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descripcionRamo') descripcionRamo!: ElementRef<HTMLInputElement>;
  @ViewChild('ciBeneficiarioInput') ciBeneficiarioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nombreBeneficiarioInput') nombreBeneficiarioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('FechaDesdePol') FechaDesdePol!: ElementRef<HTMLInputElement>;
  @ViewChild('FechaHastaPol') FechaHastaPol!: ElementRef<HTMLInputElement>;
  @ViewChild('Vigencia') Vigencia!: ElementRef<HTMLInputElement>;
  @ViewChild('Sucursal') Sucursal!: ElementRef<HTMLInputElement>;
  @ViewChild('Intermediario') Intermediario!: ElementRef<HTMLInputElement>;
  @ViewChild('Productor') Productor!: ElementRef<HTMLInputElement>;
  @ViewChild('Moneda') Moneda!: ElementRef<HTMLInputElement>;
  @ViewChild('Tasa') Tasa!: ElementRef<HTMLInputElement>;
  @ViewChild('Tipo_Renovacion') Tipo_Renovacion!: ElementRef<HTMLInputElement>;
  @ViewChild('Fecha_Emision') Fecha_Emision!: ElementRef<HTMLInputElement>;
  @ViewChild('Estatus_Poliza') Estatus_Poliza!: ElementRef<HTMLInputElement>;
  @ViewChild('Observacion') Observacion!: ElementRef<HTMLInputElement>;
  // Para Los Recibos
  @ViewChild('cnrecibo') cnrecibo!: ElementRef<HTMLInputElement>;
  @ViewChild('Cuotas') Cuotas!: ElementRef<HTMLInputElement>;
  @ViewChild('Fecha_desde_Rec') Fecha_desde_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('Fecha_hasta_Rec') Fecha_hasta_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('Monto_Rec') Monto_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('Monto_Rec_Ext') Monto_Rec_Ext!: ElementRef<HTMLInputElement>;
  @ViewChild('Status_Rec') Status_Rec!: ElementRef<HTMLInputElement>;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private router: Router,

    private paginator2: MatPaginatorIntl,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private http: HttpClient,
    readonly dialog: MatDialog,
    private snackBar: MatSnackBar
    
  ) {

      this.paginator2.firstPageLabel = "Primera Página";
      this.paginator2.itemsPerPageLabel = "Registros por Página";
      this.paginator2.previousPageLabel = "Página Anterior";
      this.paginator2.nextPageLabel = "Siguiente Página";
      this.paginator2.lastPageLabel = "Última Página";
      this.paginator2.getRangeLabel = (page: number, pageSize: number, length: number): string => {22
        if (length === 0) {
          return `Página 1 de 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return `Página ${page + 1} de ${amountPages}`;
        };
    }
    isAllSelected() {
      return this.selection.selected.length === 1;
    }
    masterToggle(row: any) {
      this.selection.clear();
      this.selection.toggle(row);
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.defaultDataSource.data;
      return;
    }}

    ngOnInit() {
      this.token = localStorage.getItem('user');
      this.currentUser = JSON.parse(this.token);
      let ccorredor = this.currentUser.data.ccorredor;
      console.log(ccorredor)
      if (this.token) {
        let corredor = {
          ccorredor: ccorredor
        }
        this.http.post(environment.apiUrl + '/api/v1/poliza/searchPoliza', corredor).subscribe((response: any) => {
          if (response.data && response.data.list) {
            const dataArray = Object.values(response.data.list);
            this.dataSource.data = dataArray;
            this.defaultDataSource = new MatTableDataSource(dataArray);
            this.dataSource = new MatTableDataSource(dataArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
      }
    }
  buscarReporte() {
  if (this.poliza === undefined) {
      this.snackBar.open('La Póliza Seleccionada No fue Encontrada.', 'Cerrar', {
      duration: 3000
    });
  } else {
    window.open(environment.apiUrl_prod + '/sis2000/poliza/' + this.poliza + '/', '_blank');
  }
}
  
  pruebaDialog() {
    this.selection.selected.forEach((row: any) => {
      this.poliza = row.Nro_Poliza.trim();
      let Nro_Poliza = row.Nro_Poliza.trim();
      let CID_T = row.CID.trim();
      let Nombre_Tomador = row.Nombre_del_Tomador.trim();
      let CID_A = row.Id_Asegurado.trim();
      let Nombre_Asegurado = row.Nombre_Asegurado.trim();
      let Descripcion_Ramo = row.Descripcion_Ramo.trim();
      let CID_B = row.Id_del_Beneficiario.trim();
      let Nombre_Beneficiario = row.Nombre_Beneficiario.trim();
      let FechaDesdePol = row.Fecha_desde_Pol;
      let FechaHastaPol = row.Fecha_hasta_Pol;
      let Vigencia = row.Dias_de_vigencia;
      let Sucursal = row.Sucursal.trim();
      let Intermediario = row.Intermediario.trim();
      let Productor = row.cproductor;
      let Moneda = row.Moneda.trim();
      let Tasa = row.Tasa_Cambio.toFixed(2);
      let Tipo_Renovacion = row.Tipo_Renovacion;
      let Fecha_Emision = row.Fecha_Emision;
      let Estatus_Poliza = row.Estatus_Poliza;
      let Observacion = row.Observacion;

      this.nroPolizaInput.nativeElement.value = Nro_Poliza.trim();
      this.ciTomadorInput.nativeElement.value = CID_T;
      this.tomadorInput.nativeElement.value = Nombre_Tomador;
      this.ciAseguradoInput.nativeElement.value = CID_A;
      this.nombreAseguradoInput.nativeElement.value = Nombre_Asegurado;
      this.descripcionRamo.nativeElement.value = Descripcion_Ramo;
      this.ciBeneficiarioInput.nativeElement.value = CID_B;
      this.nombreBeneficiarioInput.nativeElement.value = Nombre_Beneficiario;
      this.FechaDesdePol.nativeElement.value = FechaDesdePol;
      this.FechaHastaPol.nativeElement.value = FechaHastaPol;
      this.Vigencia.nativeElement.value = Vigencia;
      this.Sucursal.nativeElement.value = Sucursal;
      this.Intermediario.nativeElement.value = Intermediario;
      this.Productor.nativeElement.value = Productor;
      this.Moneda.nativeElement.value = Moneda;
      this.Tasa.nativeElement.value = Tasa;
      this.Tipo_Renovacion.nativeElement.value = Tipo_Renovacion;
      this.Estatus_Poliza.nativeElement.value = Estatus_Poliza;
      this.Fecha_Emision.nativeElement.value = Fecha_Emision;
      this.Observacion.nativeElement.value = Observacion;
  });

  this.recibosData = [];
  for (let dataRecibo of this.selection.selected) {
    for (let recibo of dataRecibo.recibos) {
      let cnrecibo = recibo.cnrecibo;
      let Cuotas = recibo.Cuotas;
      let Fecha_desde_Rec = recibo.Fdesde_Rec;
      let Fecha_hasta_Rec = recibo.Fhasta_Rec;
      let Monto_Rec = recibo.Monto_Rec;
      let Monto_Rec_Ext = recibo.Monto_Rec_Ext;
      let Status_Rec = recibo.Status_Rec;
  
      this.recibosData.push({
        cnrecibo,
        Cuotas,
        Fecha_desde_Rec,
        Fecha_hasta_Rec,
        Monto_Rec,
        Monto_Rec_Ext,
        Status_Rec
      });
    }
    
  }
  
  this.http.post(environment.apiUrl + '/api/v1/poliza/searchPoliza', null).subscribe((response: any) => {
      if (response.data.list) {
        this.dataSource.data = response.data.list;
        const dataArray = Object.values(response.data.list);
            this.dataSource.data = dataArray;
            this.defaultDataSource = new MatTableDataSource(dataArray);
            this.dataSource = new MatTableDataSource(dataArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
    }});
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
