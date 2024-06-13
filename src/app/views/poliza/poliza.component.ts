import { saveAs } from 'file-saver';
import { LiveAnnouncer } from '@angular/cdk/a11y';
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
import { PdfGenerationService } from '../../_services/ServicePDF';
import { from } from 'rxjs';
// import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

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
  styleUrls: ['./poliza.component.scss'],
})
export class PolizaComponent implements AfterViewInit {
  // @ViewChild('stepper') stepper?: MatStepper;
  intermediario: string = 'No encontrado';
  currentStep = 0;
  consulta_reporte!: FormGroup;
  showButton: boolean = true;
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource<any>();
  descripcionPlan: string = 'No encontrado';
  currentUser!: any;
  token!: any;
  poliza: any;
  recibosData: any;
  defaultDataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    'select',
    'Nro_Poliza',
    'Descripcion_Ramo',
    'Intermediario',
    'Dias_de_vigencia',
    'Id_Asegurado',
    'Nombre_Asegurado',
    'Estatus_Poliza',
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
  details: string[] = ['cnpoliza', 'cnrecibo', 'ramo', 'pdf', 'recibo'];
  // Para las Pólizas
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Para Los Recibos
  @ViewChild('cnrecibo') cnrecibo!: ElementRef<HTMLInputElement>;
  @ViewChild('Cuotas') Cuotas!: ElementRef<HTMLInputElement>;
  @ViewChild('Fecha_desde_Rec') Fecha_desde_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('Fecha_hasta_Rec') Fecha_hasta_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('Monto_Rec') Monto_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('Monto_Rec_Ext') Monto_Rec_Ext!: ElementRef<HTMLInputElement>;
  @ViewChild('Status_Rec') Status_Rec!: ElementRef<HTMLInputElement>;
  @ViewChild('ctransaccion') ctransaccion!: ElementRef<HTMLInputElement>;
  @ViewChild('Receip') Receip!: TemplateRef<any>;
  detailReceipst: any = [];

  polizaGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    nroPolizaInput: [''],
    ciTomadorInput: [''],
    tomadorInput: [''],
    ciAseguradoInput: [''],
    nombreAseguradoInput: [''],
    descripcionRamo: [''],
    ciBeneficiarioInput: [''],
    nombreBeneficiarioInput: [''],
    FechaDesdePol: [''],
    FechaHastaPol: [''],
    Vigencia: [''],
    Sucursal: [''],
    cproductor: [''],
    Intermediario: [''],
    Moneda: [''],
    Tasa_Cambio: [''],
    Tipo_Renovacion: [''],
    Fecha_Emision: [''],
    Estatus_Poliza: [''],
    Plan: [''],
    Descripcion_Plan: [''],
    Observacion: [''],
  });

  datosTecnicos = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    beneficiarios: this._formBuilder.array([]),
    asegurados: this._formBuilder.array([]),
    automovil: this._formBuilder.array([]),
  });

  isLinear = false;
  ramoAuto = false;


  constructor(
    private router: Router,
    private pdfGenerationService: PdfGenerationService,
    private paginator2: MatPaginatorIntl,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    readonly dialog: MatDialog,
    private snackBar: MatSnackBar
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

  get beneficiarios(): FormArray {
    return this.datosTecnicos.get('beneficiarios') as FormArray;
  }

  get asegurados(): FormArray {
    return this.datosTecnicos.get('asegurados') as FormArray;
  }
  get automovil(): FormArray {
    return this.datosTecnicos.get('automovil') as FormArray;
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
    }
  }
  ngOnInit() {
    fetch(environment.apiUrl + '/api/v1/collection/receipts-collect')
      .then((response) => response.json())
      .then((data) => {
        let obj = data.searchClientforReceiptCollect;
        let array = Object.values(obj);
      });
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
        .post(environment.apiUrl + '/api/v1/poliza/searchPoliza', corredor)
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
        .post(environment.apiUrl + '/api/v1/poliza/searchPoliza', null)
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
  receipt(data: any) {
    this.detailReceipst = [];
    this.detailReceipst = data.recibos;
    this.detail();
  }
  detail(config?: MatDialogConfig) {
    return this.dialog.open(this.Receip, config);
  }

  openR(recibo: any) {
    window.open(
      'https://api.lamundialdeseguros.com/sis2000/recibo/' + recibo + '/',
      '_blank'
    );
  }
  openT(transaccion: any) {
    window.open(
      'https://api.lamundialdeseguros.com/sis2000/ingreso_caja/' +
        transaccion +
        '/',
      '_blank'
    );
  }

  openP(poliza: any) {
    if (poliza.cramo !== 18) {
      window.open(
        'https://api.lamundialdeseguros.com/sis2000/poliza/' +
          poliza.cnpoliza +
          '/',
        '_blank'
      );
    } else {
      this.openPdf(poliza.contrato);
    }
  }

  openPdf(ccontratoflota: any) {
    const observable = from(
      this.pdfGenerationService.LoadDataCertifiqued(ccontratoflota)
    );

    observable.subscribe(
      (data) => {},
      (error) => {
        console.log(error);
      }
    );

    this.snackBar.open(
      `Se está generando el Cuadro Póliza. Por favor espere.`,
      '',
      {
        duration: 6000,
      }
    );
  }

  buscarReporte() {
    if (this.poliza === undefined) {
      this.snackBar.open(
        'La Póliza Seleccionada No fue Encontrada.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    } else {
      window.open(
        environment.apiUrl_prod + '/sis2000/poliza/' + this.poliza + '/',
        '_blank'
      );
    }
  }
  pruebaDialog() {
    let poliza: any;
    this.selection.selected.forEach((row: any) => {
      this.poliza = row.Nro_Poliza.trim();
      poliza = row.Nro_Poliza.trim();
      this.polizaGroup.get('nroPolizaInput')?.setValue(row.Nro_Poliza.trim());
      this.polizaGroup.get('ciTomadorInput')?.setValue(row.CID);
      this.polizaGroup.get('tomadorInput')?.setValue(row.Nombre_del_Tomador);
      this.polizaGroup.get('ciAseguradoInput')?.setValue(row.Id_Asegurado);
      this.polizaGroup
        .get('nombreAseguradoInput')
        ?.setValue(row.Nombre_Asegurado);
      this.polizaGroup.get('descripcionRamo')?.setValue(row.Descripcion_Ramo);
      this.polizaGroup
        .get('ciBeneficiarioInput')
        ?.setValue(row.Id_del_Beneficiario);
      this.polizaGroup
        .get('nombreBeneficiarioInput')
        ?.setValue(row.Nombre_Beneficiario);
      this.polizaGroup.get('FechaDesdePol')?.setValue(row.Fecha_desde_Pol);
      this.polizaGroup.get('FechaHastaPol')?.setValue(row.Fecha_hasta_Pol);
      this.polizaGroup.get('Vigencia')?.setValue(row.Dias_de_vigencia);
      this.polizaGroup.get('Sucursal')?.setValue(row.Sucursal || 'N/A.');
      this.polizaGroup
        .get('cproductor')
        ?.setValue(row.cproductor + ' - ' + row.Intermediario || 'N/A');
      this.polizaGroup.get('Intermediario')?.setValue(row.Intermediario);
      this.polizaGroup.get('Moneda')?.setValue(row.Moneda);
      this.polizaGroup.get('Tasa_Cambio')?.setValue(row.Tasa_Cambio.toFixed(2));
      this.polizaGroup.get('Tipo_Renovacion')?.setValue(row.Tipo_Renovacion);
      this.polizaGroup.get('Fecha_Emision')?.setValue(row.Fecha_Emision);
      this.polizaGroup.get('Estatus_Poliza')?.setValue(row.Estatus_Poliza);
      this.polizaGroup.get('Plan')?.setValue(row.Plan + ' - ' + row.Descripcion_Plan || 'N/A.');
      this.polizaGroup
        .get('Descripcion_Plan')
        ?.setValue(row.Descripcion_Plan || 'N/A.');
      this.polizaGroup.get('Observacion')?.setValue(row.Observacion);
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
        this.http.post(environment.apiUrl + '/api/v1/poliza/searchAutomobile', { cnpoliza: this.poliza })
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
          console.log(this.datosTecnicos);

        });
      } else {
        this.ramoAuto = false
        this.http.post(environment.apiUrl + '/api/v1/poliza/searchBeneficiary', { cnpoliza: this.poliza })
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
                  fnacimiento_beneficiario:
                    item.fnacimiento_beneficiario || 'N/A.',
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
        
          });
      }
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
