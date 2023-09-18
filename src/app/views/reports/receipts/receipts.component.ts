import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ThemePalette } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { NotificationService } from './../../../_services/notification.service';

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
  disableError: boolean = false;
  fdesde?: string;
  fhasta?: string
  selectedOption: string = '';
  errorMessage: string | null = null;
  errorCode: number | null = null;

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
              private snackBar: MatSnackBar,
              private notificationService: NotificationService){}

  ngOnInit() {
    this.receipt_form = this.formBuilder.group({
      brecibo: [''],
      fdesde: [''],
      fhasta: [''],
      id_status: ['']
    });

    this.notificationService.error$.subscribe(({ code, message }) => {
      this.errorCode = code; // Almacena el código de error
      this.errorMessage = message;
      this.loading = false
      this.disableError = true;
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
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refresh(){
    location.reload();
  }

  downloadExcel() {
    // Define un objeto de mapeo para cambiar los nombres de las columnas
    const columnMapping = {
      start_date: 'Fecha desde',
      end_date: 'Fecha hasta',
      amount_term: 'Monto término',
      total_payment: 'Pago total dólares',
      total_payment_bs: 'Pago total bolívares',
      ncuota: 'Cuotas',
      msaldo: 'Saldo',
      name_user: 'Nombre',
      last_name_user: 'Apellido'
    };
  
    // Filtra y renombra los campos que deseas exportar
    const filteredData = this.dataSource.data.map(item => ({
      'Fecha desde': item.start_date,
      'Fecha hasta': item.end_date,
      'Monto término': item.amount_term,
      'Pago total dólares': item.total_payment,
      'Pago total bolívares': item.total_payment_bs,
      'Cuotas': item.ncuota,
      'Saldo': item.msaldo,
      'Nombre': item.name_user,
      'Apellido': item.last_name_user
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const excelData: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    saveAs(excelData, `Reporte de ${this.selectedOption} solicitados.xlsx`);
  }
}
