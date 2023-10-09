import {Component} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.scss']
})
export class AutomobileComponent {

  identList = ['V', 'P', 'E', 'J', 'C','G'];
  stateList: any[] = [];
  cityList: any[] = [];


  identControl = new FormControl('');
  stateControl = new FormControl('');
  cityControl = new FormControl('');

  filteredIdent!: Observable<string[]>;
  filteredState!: Observable<string[]>;
  filteredCity!: Observable<string[]>;

  personsFormGroup = this._formBuilder.group({
    icedula: ['', Validators.required],
    xrif_cliente: ['', Validators.required],
    xnombre: ['', Validators.required],
    xapellido: ['', Validators.required],
    xtelefono_emp: ['', Validators.required],
    email: ['', Validators.required],
    cestado: ['', Validators.required],
    cciudad: ['', Validators.required],
  });
  vehicleFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  planFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  receiptFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = false;

  constructor( private _formBuilder: FormBuilder,
               private http: HttpClient,) {}


  ngOnInit(){
    this.filteredIdent = this.identControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
    this.getState();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.identList.filter(ident => ident.toLowerCase().includes(filterValue));
  }

  onIdentSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedIdent = this.identList.find(ident => ident === selectedValue);
    if (selectedIdent) {
      this.personsFormGroup.get('icedula')?.setValue(selectedIdent)
    }
  }

  getState(){
    let data = {
      cpais: 58
    };
    this.http.post('https://autos.lamundialdeseguros.com/api/valrep/state', data).subscribe((response: any) => {
      if (response.data.list) {
        console.log(response.data.list)
        for (let i = 0; i < response.data.state.length; i++) {
          this.stateList.push({
            id: response.data.state[i].cestado,
            value: response.data.state[i].xestado
          });
        }
        this.filteredState = this.stateControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterState(value || ''))
        );
      }
    });
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList
      .map(state => state.value)
      .filter(state => state.toLowerCase().includes(filterValue));
  }

  onStateSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedState = this.stateList.find(state => state.value === selectedValue);
    if (selectedState) {
      this.personsFormGroup.get('cestado')?.setValue(selectedState.id);
      this.getCity();
    }
  }

  getCity(){
    let data = {
      cpais: 58,
      cestado: this.personsFormGroup.get('cestado')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/city', data).subscribe((response: any) => {
      if (response.data.city) {
        for (let i = 0; i < response.data.city.length; i++) {
          this.cityList.push({
            id: response.data.city[i].cciudad,
            value: response.data.city[i].xciudad
          });
        }
        this.filteredCity = this.cityControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCity(value || ''))
        );
      }
    });
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityList
      .map(city => city.value)
      .filter(city => city.toLowerCase().includes(filterValue));
  }

  onCitySelection(event: any) {
    const selectedValue = event.option.value;
    const selectedCity = this.cityList.find(city => city.value === selectedValue);
    if (selectedCity) {
      this.personsFormGroup.get('cestado')?.setValue(selectedCity.id);
      this.getCity();
    }
  }
}
