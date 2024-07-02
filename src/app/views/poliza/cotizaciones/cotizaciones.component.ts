import { saveAs } from 'file-saver';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import * as XLSX from 'xlsx';
import {
  AfterViewInit,
  Component,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TemplateRef } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  FormArray,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { ThemePalette } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ElementRef } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { from } from 'rxjs';
import { PdfGenerationService } from '../../../_services/ServicePDF';

export interface polizaDate {
  cproces: string;
  ccorredor: string;
  xramo: string;
  xintermediario: string;
  xcedula_asegurado: string;
  xasegurado: number;
  Estatus_Poliza: string;
  Nro_Recibo: string;
  Estado_del_Recibo: string;
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: polizaDate[];
}

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})

export class CotizacionesComponent implements AfterViewInit {

  intermediario: string = 'No encontrado';
  currentStep = 0;
  consulta_reporte!: FormGroup;
  showButton: boolean = true;
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>();
  descripcionPlan: string = 'No encontrado';
  currentUser!: any;
  token!: any;
  cotizacion: any;
  recibosData: any;
  defaultDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'cproces',
    'ccorredor',
    'xintermediario',
    'xramo',
    'xcedula_asegurado',
    'xasegurado',
    'fdesde_pol',
    'fhasta_pol',
    'Estatus_Cotizacion',
    'xsucursal',
    'xcanal_venta',
    'xmoneda',
  ];
  ColumnsRecibos: string[] = [
    'cnrecibo',
    'Cuotas',
    'Fecha_desde_Rec',
    'Fecha_hasta_Rec',
    'Monto_Rec',
    'Monto_Rec_Ext',
    'Status_Rec',
    'ctransaccion',
  ];
  itemList: any = [];
  details: string[] = ['cnpoliza', 'cnrecibo', 'ramo', 'pdf', 'recibo'];
  cotizacionGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    cproces : [''],
    ccorredor : [''],
    xramo : [''],
    xintermediario : [''],
    xasegurado : [''],
    xcedula_asegurado : [''],
    fdesde_pol : [''],
    fhasta_pol : [''],
    Estatus_Cotizacion : [''],
    start: new FormControl<Date | null>(null),
    end:   new FormControl<Date | null>(null),
  });

  datosTecnicos = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    beneficiarios: this._formBuilder.array([]),
    asegurados: this._formBuilder.array([]),
    descrip: this._formBuilder.array([]),
    automovil: this._formBuilder.array([]),
  });

  constructor(
    private router: Router,
    private paginator2: MatPaginatorIntl,
    private _formBuilder: FormBuilder,
    private pdfGenerationService: PdfGenerationService,
    private route: ActivatedRoute,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private snackBar: MatSnackBar,
    private _snackBar: MatSnackBar
  ) {
    this.paginator2.firstPageLabel = 'Primera Página';
    this.paginator2.itemsPerPageLabel = 'Registros por Página';
    this.paginator2.previousPageLabel = 'Página Anterior';
    this.paginator2.nextPageLabel = 'Siguiente Página';
    this.paginator2.lastPageLabel = 'Última Página';
    this.paginator2.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ): string => {
      22;
      if (length === 0) {
        return `Página 1 de 1`;
      }
      const amountPages = Math.ceil(length / pageSize);
      return `Página ${page + 1} de ${amountPages}`;
    };
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLinear = false;
  ramoAuto  : boolean = false;
  ramoRcg : boolean = false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  masterToggle(row: any) {
    this.selection.clear();
    this.selection.toggle(row);
  }
  isAllSelected() {
    return this.selection.selected.length === 1;
  }
  dateFilter(event: any) {
    let inicio: Date = this.cotizacionGroup.get('start')?.value || new Date()
    let final = this.cotizacionGroup.get('end')?.value || new Date()
    let data = {
      start: new Date(inicio),
      end: new Date(final)
    }
    this.itemList = [];
    this.dataSource.data = []
    this.http.post(environment.apiUrl + '/api/v1/poliza/searchCotizacion', data).subscribe((response: any) => {
      const dataArray = Object.values(response.data.list);
      this.dataSource.data = dataArray;
      this.defaultDataSource = new MatTableDataSource(dataArray);
      this.dataSource = new MatTableDataSource(dataArray);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ngOnInit() {
    this.itemList = [];
    this.pruebaDialog();
    this.token = localStorage.getItem('user');
    this.currentUser = JSON.parse(this.token);
    let ccorredor = this.currentUser.data.ccorredor;
    console.log(ccorredor);
    if (this.token) {
      let corredor = {
        ccorredor: ccorredor,
      };
      this.http
        .post(environment.apiUrl + '/api/v1/poliza/searchCotizacion', corredor)
        .subscribe((response: any) => {
          if (response.data && response.data.list) {
            const dataArray = Object.values(response.data.list);
            this.dataSource.data = dataArray;
            this.defaultDataSource = new MatTableDataSource(dataArray);
            this.dataSource = new MatTableDataSource(dataArray);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        });
    } else {
      this.http
        .post(environment.apiUrl + '/api/v1/poliza/searchCotizacion', null)
        .subscribe((response: any) => {
          if (response.data.list) {
            this.dataSource.data = response.data.list;
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
  pruebaDialog() {
    let cotizacion: any;
    this.selection.selected.forEach((row: any) => {
      this.cotizacion = row.cproces.trim();cotizacion = row.cproces.trim();
      this.cotizacionGroup.get('cproces')?.setValue(row.Observacion);
      this.cotizacionGroup.get('ccorredor')?.setValue(row.Observacion);
      this.cotizacionGroup.get('xramo')?.setValue(row.Observacion);
      this.cotizacionGroup.get('xintermediario')?.setValue(row.Observacion);
      this.cotizacionGroup.get('xasegurado')?.setValue(row.Observacion);
      this.cotizacionGroup.get('xcedula_asegurado')?.setValue(row.Observacion);
      this.cotizacionGroup.get('fdesde_pol')?.setValue(row.Observacion);
      this.cotizacionGroup.get('fhasta_pol')?.setValue(row.Observacion);
      this.cotizacionGroup.get('Estatus_Cotizacion')?.setValue(row.Fecha_Emision_Cotizacion);
    });

    this.recibosData = [];

    for (let dataRecibo of this.selection.selected) {
      for (let recibo of dataRecibo.recibos) {
        this.recibosData.push({
          cnrecibo: recibo.cnrecibo,
          crecibo: recibo.crecibo,
          Cuotas: recibo.Cuotas,
          Fecha_desde_Rec: recibo.Fdesde_Rec,
          Fecha_hasta_Rec: recibo.Fhasta_Rec,
          Monto_Rec: recibo.Monto_Rec.toFixed(2),
          Monto_Rec_Ext: recibo.Monto_Rec_Ext.toFixed(2),
          Status_Rec: recibo.Status_Rec,
          ctransaccion: recibo.ctransaccion,
        });
      }
      const auto = this.datosTecnicos.get('automovil') as FormArray;
      if (dataRecibo.Codigo_Ramo == 18) {
        this.ramoAuto = true
        this.ramoRcg = false
        this.http.post(environment.apiUrl + '/api/v1/poliza/searchAutomobile', { cnpoliza: this.cotizacion })
        .subscribe((response: any) => {
          while (auto.length !== 0) {
            auto.removeAt(0);
          }
          response.search.forEach((item: any) => {
            auto.push(
              this._formBuilder.group({
                  XESTATUSGENERAL : item.XESTATUSGENERAL || 'N/A.',
                  XPLACA : item.XPLACA || 'N/A.',
                  XSERIALCARROCERIA : item.XSERIALCARROCERIA || 'N/A.',
                  XSERIALMOTOR : item.XSERIALMOTOR || 'N/A.',
                  XCOLOR : item.XCOLOR || 'N/A.',
                  XMARCA : item.XMARCA || 'N/A.',
                  XMODELO : item.XMODELO || 'N/A.',
                  XVERSION : item.XVERSION || 'N/A.',
                  FANO : item.FANO || 'N/A.',
                  XTRANSMISION : item.XTRANSMISION || 'N/A.',
                  XUSO : item.XUSO || 'N/A.',
              })
            );
          });
        });
      } else {
        this.ramoAuto = false
        this.ramoRcg = false
        if(dataRecibo.Codigo_Ramo == 10 || dataRecibo.Codigo_Ramo == 11  || dataRecibo.Codigo_Ramo == 12
        || dataRecibo.Codigo_Ramo == 13 || dataRecibo.Codigo_Ramo == 14  || dataRecibo.Codigo_Ramo == 15
        || dataRecibo.Codigo_Ramo == 16 || dataRecibo.Codigo_Ramo == 17  || dataRecibo.Codigo_Ramo == 19
        || dataRecibo.Codigo_Ramo == 20 || dataRecibo.Codigo_Ramo == 21  || dataRecibo.Codigo_Ramo == 22
        || dataRecibo.Codigo_Ramo == 23 || dataRecibo.Codigo_Ramo == 24  || dataRecibo.Codigo_Ramo == 25
        || dataRecibo.Codigo_Ramo == 27 || dataRecibo.Codigo_Ramo == 28  || dataRecibo.Codigo_Ramo == 29
        || dataRecibo.Codigo_Ramo == 30 || dataRecibo.Codigo_Ramo == 31  || dataRecibo.Codigo_Ramo == 32
        || dataRecibo.Codigo_Ramo == 33 || dataRecibo.Codigo_Ramo == 34  || dataRecibo.Codigo_Ramo == 35
        || dataRecibo.Codigo_Ramo == 37 || dataRecibo.Codigo_Ramo == 38  || dataRecibo.Codigo_Ramo == 39
        || dataRecibo.Codigo_Ramo == 40 || dataRecibo.Codigo_Ramo == 41
        ){
          this.ramoRcg = true
        }
        this.http.post(environment.apiUrl + '/api/v1/poliza/searchBeneficiary', { cnpoliza: this.cotizacion })
          .subscribe((response: any) => {
            if (response.data && response.data) {
              const dataArray = Object.values(response.data);
              this.dataSource.data = dataArray;
            }
            const benefi = this.datosTecnicos.get('beneficiarios') as FormArray;
            while (benefi.length !== 0) {
              benefi.removeAt(0);
            }
            response.search.beneficiarios.forEach((item: any) => {
              benefi.push(
                this._formBuilder.group({
                  Nro_Poliza: item.Nro_Poliza,
                  csexo_beneficiario: item.csexo_beneficiario,
                  fingreso_beneficiario: item.fingreso_beneficiario,
                  fnacimiento_beneficiario: item.fnacimiento_beneficiario || 'N/A.',
                  xbeneficiario: item.xbeneficiario,
                  xcedula_beneficiario: item.xcedula_beneficiario,
                  xparentesco_beneficiario: item.xparentesco_beneficiario,
                  Descripcion_Plan_A: item.Descripcion_Plan_A || 'N/A.',
                  cestado_civil_beneficiario: item.cestado_civil_beneficiario,
                })
              );
            });
            const asegu = this.datosTecnicos.get('asegurados') as FormArray;
            while (asegu.length !== 0) {
              asegu.removeAt(0);
            }
            response.search.asegurados.forEach((item: any) => {
              asegu.push(
                this._formBuilder.group({
                  xasegurado: item.xasegurado,
                  xcedula_asegurado: item.xcedula_asegurado,
                  xparentesco_asegurado: item.xparentesco_asegurado,
                  fnacimiento_asegurado: item.fnacimiento_asegurado,
                  csexo_asegurado: item.csexo_asegurado,
                  cestado_civil_asegurado: item.cestado_civil_asegurado,
                  fingreso_asegurado: item.fingreso_asegurado,
                  Descripcion_Plan_A: item.Descripcion_Plan_A || 'N/A',
                })
              );
            });
            const descrip1 = this.datosTecnicos.get('descrip') as FormArray;
            while (descrip1.length !== 0) {
              descrip1.removeAt(0);
            }
            response.search.descrip.forEach((item: any) => {
              descrip1.push(
                this._formBuilder.group({
                  xdescripcion :  item.xdescripcion  || 'N/A.' ,
                  xdescripcion2 : item.xdescripcion2 || 'N/A.' ,
                  xdescripcion3 : item.xdescripcion3 || 'N/A.' ,
                  xdescripcion4 : item.xdescripcion4 || 'N/A.' ,
                  Descrip_Ramo :  item.Descrip_Ramo  || 'N/A.' ,
                })
              );
            });
          });
      }
    }
  }
  
  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = this.defaultDataSource.data;
      return;
    }
  }
  exportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.defaultDataSource.data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    // XLSX.utils.format_cell()
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.  spreadsheetml.sheet' });
    saveAs(excelData, `Reporte.xlsx`);
    this._snackBar.open("Reporte en Excel descargado con Éxito", "Cerrar", {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }
}
