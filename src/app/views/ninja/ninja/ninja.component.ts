import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-ninja',
  templateUrl: './ninja.component.html',
  styleUrls: ['./ninja.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*', display: 'table-row-group' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NinjaComponent implements AfterViewInit {
  search_form!: FormGroup;
  submitted = false;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  columnsToDisplay: string[] = ['cedula', 'nombApell', 'correo', 'nrofac', 'hora_emision', 'cantidad_tickes', 'mcosto_ext', 'fingreso'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any;
  columnsName: string[] = ['Cédula', 'Nombre', 'Correo', 'Factura', 'Hora', 'Cantidad T.', 'Costo', 'Fecha'];
  expandedDetailData: any[] = [];
  columnsNameDetail: string[] = ['Acompañante', 'Producto', 'N. Producto', 'Cantidad', 'Costo Ext.', 'Costo Local'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  showTable: boolean = true;
  parkList: any[] = [];
  parkControl = new FormControl('');
  filteredPark!: Observable<string[]>;
  loadingData: boolean = false;

  constructor(private http: HttpClient,
              private formBuilder: FormBuilder) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.search_form = this.formBuilder.group({
      plan_adquirido: ['']
    });

    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/park', data).subscribe((response: any) => {
      if (response.status) {
        for(let i = 0; i < response.data.parks.length; i++){
          this.parkList.push({
            plan_adquirido: response.data.parks[i].plan_adquirido,
            value: response.data.parks[i].xcompania
          })
        }
        this.filteredPark = this.parkControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.parkList
      .map(park => park.value)
      .filter(parks => parks.toLowerCase().includes(filterValue));
  }

  onParkSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedPark = this.parkList.find(park => park.plan_adquirido === selectedValue);
    if (selectedPark) {
      this.search_form.get('plan_adquirido')?.setValue(selectedPark.plan_adquirido)
    }
    if(this.search_form.get('plan_adquirido')?.value){
      this.getDataFromPark();
    }
  }

  getDataFromPark(){
    this.loadingData = true;
    let data = {
      plan_adquirido: this.search_form.get('plan_adquirido')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/ninjaPark/search', data).subscribe((response: any) => {
      if (response.data.list) {
        this.dataSource.data = response.data.list;
      }
      this.loadingData = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleRow(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;

    this.searchPropietary(element);
  }

  searchPropietary(element: any) {
    let data = {
      cedula: element.cedula
    };
    this.http.post(environment.apiUrl + '/api/v1/ninjaPark/detail', data).subscribe((response: any) => {
      if (response.data.list) {
        this.expandedDetailData = response.data.list;
      }
    });
  }
}
