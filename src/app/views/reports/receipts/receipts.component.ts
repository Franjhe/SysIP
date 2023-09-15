import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { ExportAsModule } from 'ngx-export-as';
// import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent {

  receipt_form!: FormGroup;
  submitted = false;
  name?: string;
  color: ThemePalette;
  showTable: boolean = true;
  disableChip: boolean = true;
  disableTable: boolean = false;
  disableCard: boolean = false;
  loading: boolean = false;
  enableDate: boolean = false;
  enableDownload: boolean = false;
  fdesde?: string;
  fhasta?: string
  selectedOption: string = '';

  availableColors = [
    {name: 'Recibos Pendientes', color: 'primary'},
    {name: 'Recibos Cobrados', color: 'warn'},
  ];

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['name_user', 'last_name_user', 'start_date', 'end_date', 'ncuota', 'total_payment', 'total_payment_bs'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,){}
              // private exportAsService: ExportAsService) {}

  // ngAfterViewInit() {

  // }

  ngOnInit() {
    this.receipt_form = this.formBuilder.group({
      brecibo: [''],
      fdesde: [''],
      fhasta: [''],
      id_status: ['']
    });
  }

  saveSelection(opcion: string) {
    this.selectedOption = opcion;
    this.receipt_form.get('brecibo')?.setValue(this.selectedOption);

    if(this.receipt_form.get('brecibo')?.value == 'Recibos Pendientes'){
      this.receipt_form.get('id_status')?.setValue(9);
    }else{
      this.receipt_form.get('id_status')?.setValue(8);
    }
  }

  onSubmit(){
    let data = {
      id_status: this.receipt_form.get('id_status')?.value,
      fdesde: this.receipt_form.get('fdesde')?.value,
      fhasta: this.receipt_form.get('fhasta')?.value,
    };
    this.fdesde = data.fdesde;
    this.fhasta = data.fhasta;
    this.disableCard = true;
    this.disableChip = false;
    this.loading = true;
    this.http.post(environment.apiUrl + '/api/v1/report/receipt', data).subscribe((response: any) => {
      if (response.data.list) {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = response.data.list;
        this.disableTable = true;
        this.loading = false;
        this.enableDate = true;
        this.enableDownload = true;
      }
    },(err) => {
      let code = err.error.data.code;
      this.disableChip = true;
      this.disableTable = false;
      this.disableCard = false;
      this.loading = false;
      this.enableDate = false;
      this.enableDownload = false;
      if(code == 404){
        this.snackBar.open(`Error: No existen ${this.selectedOption} segun los parámetros seleccionados`, '', {
          duration: 3000,
        })
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // downloadExcel() {
  //   const data = this.dataSource.data;

  //   // Configura los estilos personalizados
  //   const exportAsConfig: ExportAsConfig = {
  //     type: 'xls', // Tipo de archivo Excel
  //     elementIdOrContent: 'tabla-de-datos', // ID de elemento HTML o contenido para exportar
  //     options: {
  //       xls: {
  //         sheet: {
  //           // Establece el estilo del encabezado
  //           name: 'Hoja1', // Nombre de la hoja
  //           merge: [
  //             { s: { r: 0, c: 0 }, e: { r: 0, c: data.length - 1 } }, // Fusiona la primera fila
  //           ],
  //           rows: [
  //             {
  //               cells: data[0].map((cell: number, index: number) => ({ value: cell, style: { fill: { fgColor: 'FFFF00' }, font: { bold: true } } })),
  //             }, // Estilo de la primera fila
  //           ],
  //         },
  //       },
  //     },
  //   };

  //   // Genera y descarga el archivo Excel
  //   this.exportAsService.save(exportAsConfig, 'datos'); // 'datos' es el nombre del archivo
  // }

}
