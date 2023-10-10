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
  brandList: any[] = [];
  modelList: any[] = [];
  versionList: any[] = [];
  colorList: any[] = [];
  ratesList: any[] = [];
  typeVehicleList: any[] = [];
  utilityVehicleList:  any[] = [];
  classList:  any[] = [];
  planList:  any[] = [];

  identControl = new FormControl('');
  stateControl = new FormControl('');
  cityControl = new FormControl('');
  brandControl = new FormControl('');
  modelControl = new FormControl('');
  versionControl = new FormControl('');
  colorControl = new FormControl('');
  ratesControl = new FormControl('');
  typeVehicleControl = new FormControl('');
  utilityVehicleControl = new FormControl('');
  classControl = new FormControl('');
  planControl = new FormControl('');

  filteredIdent!: Observable<string[]>;
  filteredState!: Observable<string[]>;
  filteredCity!: Observable<string[]>;
  filteredBrand!: Observable<string[]>;
  filteredModel!: Observable<string[]>;
  filteredVersion!: Observable<string[]>;
  filteredColor!: Observable<string[]>;
  filteredRates!: Observable<string[]>;
  filteredTypeVehicle!: Observable<string[]>;
  filteredUtilityVehicle!: Observable<string[]>;
  filteredClass!: Observable<string[]>;
  filteredPlan!: Observable<string[]>;

  personsFormGroup = this._formBuilder.group({
    icedula: ['', Validators.required],
    xrif_cliente: ['', Validators.required],
    xnombre: ['', Validators.required],
    xapellido: ['', Validators.required],
    xtelefono_emp: ['', Validators.required],
    email: ['', Validators.required],
    cestado: ['', Validators.required],
    cciudad: ['', Validators.required],
    xdireccion: ['', Validators.required],
  });
  vehicleFormGroup = this._formBuilder.group({
    xplaca: ['', Validators.required],
    cmarca: ['', Validators.required],
    cmodelo: ['', Validators.required],
    cversion: ['', Validators.required],
    fano: [{ value: '', disabled: true }],
    npasajeros: [{ value: '', disabled: true }],
    ccolor: ['', Validators.required],
    xserialcarroceria: ['', Validators.required],
    xserialmotor: ['', Validators.required],
    xcobertura: ['', Validators.required],
    ctarifa_exceso: ['', Validators.required],
    cuso: ['', Validators.required],
    ctipovehiculo: ['', Validators.required],
    cclase: ['', Validators.required],
  });
  planFormGroup = this._formBuilder.group({
    cplan: ['', Validators.required],
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
    this.getBrand();
    this.getColor();
    this.getRates();
    this.getTypeVehicles();
    this.getUtilityVehicle();
    this.getClass();
    this.getPlan();
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
    this.http.post(environment.apiUrl + '/api/v1/valrep/state', data).subscribe((response: any) => {
      if (response.data.state) {
        for (let i = 0; i < response.data.state.length; i++) {
          this.stateList.push({
            id: response.data.state[i].cestado,
            value: response.data.state[i].xdescripcion_l
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
            value: response.data.city[i].xdescripcion_l
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

  getBrand(){
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/brand', data).subscribe((response: any) => {
      if (response.data.brand) {
        for (let i = 0; i < response.data.brand.length; i++) {
          this.brandList.push({
            id: response.data.brand[i].cmarca,
            value: response.data.brand[i].xmarca
          });
        }
        this.filteredBrand = this.brandControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterBrand(value || ''))
        );
      }
    });
  }

  private _filterBrand(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brandList
      .map(brand => brand.value)
      .filter(brand => brand.toLowerCase().includes(filterValue));
  }

  onBrandSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedBrand = this.brandList.find(brand => brand.value === selectedValue);
    if (selectedBrand) {
      this.vehicleFormGroup.get('cmarca')?.setValue(selectedBrand.id);
      this.getModel();
    }
  }

  getModel(){
    let data = {
      cmarca: this.vehicleFormGroup.get('cmarca')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/model', data).subscribe((response: any) => {
      if (response.data.model) {
        for (let i = 0; i < response.data.model.length; i++) {
          this.modelList.push({
            id: response.data.model[i].cmodelo,
            value: response.data.model[i].xmodelo
          });
        }
        this.filteredModel = this.modelControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterModel(value || ''))
        );
      }
    });
  }

  private _filterModel(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.modelList
      .map(model => model.value)
      .filter(model => model.toLowerCase().includes(filterValue));
  }

  onModelSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedModel = this.modelList.find(model => model.value === selectedValue);
    if (selectedModel) {
      this.vehicleFormGroup.get('cmodelo')?.setValue(selectedModel.id);
      this.getVersion();
    }
  }

  getVersion(){
    let data = {
      cmarca: this.vehicleFormGroup.get('cmarca')?.value,
      cmodelo: this.vehicleFormGroup.get('cmodelo')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/version', data).subscribe((response: any) => {
      if (response.data.version) {
        for (let i = 0; i < response.data.version.length; i++) {
          this.versionList.push({
            id: response.data.version[i].cversion,
            value: response.data.version[i].xversion,
            npasajeros: response.data.version[i].npasajero,
            fano: response.data.version[i].cano,
          });
        }
        this.filteredVersion = this.versionControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterVersion(value || ''))
        );
      }
    });
  }

  private _filterVersion(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.versionList
      .map(version => version.value)
      .filter(version => version.toLowerCase().includes(filterValue));
  }

  onVersionSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedVersion = this.versionList.find(version => version.value === selectedValue);
    if (selectedVersion) {
      this.vehicleFormGroup.get('cversion')?.setValue(selectedVersion.id);
      this.changePassager();
    }
  }

  changePassager(){
    let version = this.versionList.find(element => element.id == this.vehicleFormGroup.get('cversion')?.value) ;
    this.vehicleFormGroup.get('fano')?.setValue(version.fano);
    this.vehicleFormGroup.get('npasajeros')?.setValue(version.npasajeros);
  }

  getColor(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/color', null).subscribe((response: any) => {
      if (response.data.color) {
        for (let i = 0; i < response.data.color.length; i++) {
          this.colorList.push({
            id: response.data.color[i].ccolor,
            value: response.data.color[i].xcolor,
          });
        }
        this.filteredColor = this.colorControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterColor(value || ''))
        );
      }
    });
  }

  private _filterColor(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.colorList
      .map(color => color.value)
      .filter(color => color.toLowerCase().includes(filterValue));
  }

  onColorSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedColor = this.colorList.find(color => color.value === selectedValue);
    if (selectedColor) {
      this.vehicleFormGroup.get('ccolor')?.setValue(selectedColor.id);
    }
  }

  getRates(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/rates', null).subscribe((response: any) => {
      if (response.data.rates) {
        for (let i = 0; i < response.data.rates.length; i++) {
          this.ratesList.push({
            id: response.data.rates[i].ctarifa_exceso,
            value: response.data.rates[i].xgrupo,
          });
        }
        this.filteredRates = this.ratesControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterRates(value || ''))
        );
      }
    });
  }

  private _filterRates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.ratesList
      .map(rates => rates.value)
      .filter(rates => rates.toLowerCase().includes(filterValue));
  }

  onRatesSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedRates = this.ratesList.find(rates => rates.value === selectedValue);
    if (selectedRates) {
      this.vehicleFormGroup.get('ctarifa_exceso')?.setValue(selectedRates.id);
    }
  }

  getTypeVehicles(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/type-vehicle', null).subscribe((response: any) => {
      if (response.data.type) {
        for (let i = 0; i < response.data.type.length; i++) {
          this.typeVehicleList.push({
            id: response.data.type[i].ctipovehiculo,
            value: response.data.type[i].xtipovehiculo,
          });
        }
        this.filteredTypeVehicle = this.typeVehicleControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterTypeVehicle(value || ''))
        );
      }
    });
  }

  private _filterTypeVehicle(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.typeVehicleList
      .map(type => type.value)
      .filter(type => type.toLowerCase().includes(filterValue));
  }

  onTypeVehicleSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedTypeVehicle = this.typeVehicleList.find(typeVehicle => typeVehicle.value === selectedValue);
    if (selectedTypeVehicle) {
      this.vehicleFormGroup.get('ctipovehiculo')?.setValue(selectedTypeVehicle.id);
    }
  }

  getUtilityVehicle(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/utility', null).subscribe((response: any) => {
      if (response.data.utility) {
        for (let i = 0; i < response.data.utility.length; i++) {
          this.utilityVehicleList.push({
            id: response.data.utility[i].cuso,
            value: response.data.utility[i].xuso,
          });
        }
        this.filteredUtilityVehicle = this.utilityVehicleControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterUtilityVehicle(value || ''))
        );
      }
    });
  }

  private _filterUtilityVehicle(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.utilityVehicleList
      .map(utility => utility.value)
      .filter(utility => utility.toLowerCase().includes(filterValue));
  }

  onUtilityVehicleSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedUtilityVehicle = this.utilityVehicleList.find(utility => utility.value === selectedValue);
    if (selectedUtilityVehicle) {
      this.vehicleFormGroup.get('cuso')?.setValue(selectedUtilityVehicle.id);
    }
  }

  getClass(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/class', null).subscribe((response: any) => {
      if (response.data.class) {
        for (let i = 0; i < response.data.class.length; i++) {
          this.classList.push({
            id: response.data.class[i].cclase,
            value: response.data.class[i].xclase,
          });
        }
        this.filteredClass = this.classControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterClass(value || ''))
        );
      }
    });
  }

  private _filterClass(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.classList
      .map(classL => classL.value)
      .filter(classL => classL.toLowerCase().includes(filterValue));
  }

  onClassSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedClass = this.classList.find(classL => classL.value === selectedValue);
    if (selectedClass) {
      this.vehicleFormGroup.get('cclase')?.setValue(selectedClass.id);
    }
  }

  getPlan(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/plan', null).subscribe((response: any) => {
      if (response.data.plan) {
        for (let i = 0; i < response.data.plan.length; i++) {
          this.planList.push({
            id: response.data.plan[i].cplan_rc,
            value: response.data.plan[i].xplan_rc,
          });
        }
        this.filteredPlan = this.planControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterPlan(value || ''))
        );
      }
    });
  }

  private _filterPlan(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.planList
      .map(plan => plan.value)
      .filter(plan => plan.toLowerCase().includes(filterValue));
  }

  onPlanSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedPlan = this.planList.find(plan => plan.value === selectedValue);
    if (selectedPlan) {
      this.planFormGroup.get('cplan')?.setValue(selectedPlan.id);
    }
  }
}
