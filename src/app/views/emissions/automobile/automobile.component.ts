import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PdfGenerationService } from '../../../_services/ServicePDF'
import { MatSnackBar } from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
  brokerList:  any[] = [];
  accesoriesList: any[] = [];
  methodOfPaymentList: any[] = [];
  takersList: any[] = [];

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
  brokerControl = new FormControl('');
  accesories = new FormControl('');
  methodOfPaymentControl = new FormControl('');
  takersControl = new FormControl('');

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
  filteredBroker!: Observable<string[]>;
  filteredMethodOfPayment!: Observable<string[]>;
  filteredTakers!: Observable<string[]>;

  isLinear = false;
  helmet: boolean = false;
  discount: boolean = false;
  enableInfo: boolean = false;
  amountTotal: boolean = false;
  buttonEmissions: boolean = true;
  loadingEmissions: boolean = false;
  activateInspection: boolean = false;
  loadingPdf: boolean = false;
  firstTime: boolean = true;
  detail: boolean = false;
  primaBruta!: any;
  descuento!: any;
  sumaAsegurada!: any;
  montoTotal!: any;
  ccontratoflota!: any;
  currentUser!: any
  token!: any
  today!: Date;
  

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
    ccotizacion: [{ value: '', disabled: false }],
    cinspeccion: [{ value: '', disabled: false }],
    xplaca: ['',[Validators.required, Validators.maxLength(7)]],
    xmarca: ['', Validators.required],
    xmodelo: ['', Validators.required],
    xversion: ['', Validators.required],
    fano: [{ value: '', disabled: false }],
    npasajeros: [{ value: '', disabled: true }],
    cclasificacion: ['', Validators.required], 
    xcolor: ['', Validators.required],
    xserialcarroceria: ['', [Validators.required, Validators.maxLength(17)]],
    xserialmotor: ['', [Validators.required, Validators.maxLength(17)]],
    xcobertura: ['', Validators.required],
    ctarifa_exceso: ['', Validators.required],
    cuso: ['', Validators.required],
    ctipovehiculo: ['', Validators.required],
    cclase: ['', Validators.required],
    id_inma: ['', Validators.required],
  });
  planFormGroup = this._formBuilder.group({
    cplan: ['', Validators.required],
    ccorredor: ['', Validators.required],
    ctomador: [{ value: '', disabled: false }],
    xtomador: [{ value: '', disabled: false }],
    pcasco: [{ value: '', disabled: true }],
    msuma_aseg: ['', Validators.required],
    mprima_bruta: [{ value: '', disabled: true }],
    pdescuento: [''],
    pmotin: [''],
    pcatastrofico: ['', Validators.required],
    mprima_casco: [{ value: '', disabled: true }],
    mcatastrofico: ['', Validators.required],
    mmotin: ['', Validators.required],
    pblindaje: [''],
    msuma_blindaje: [''],
    mprima_blindaje: [{ value: '', disabled: true }],
  });
  receiptFormGroup = this._formBuilder.group({
    xpago: ['', Validators.required],
    femision: ['', Validators.required],
    fdesde: ['', Validators.required],
    fhasta: ['', Validators.required],
    cmetodologiapago: ['', Validators.required]
  });

  constructor( private _formBuilder: FormBuilder,
               private http: HttpClient,
               private modalService: NgbModal,
               private dateAdapter: DateAdapter<Date>,
               private pdfGenerationService: PdfGenerationService,
               private snackBar: MatSnackBar) {dateAdapter.setLocale('es');}


  ngOnInit(){
    this.today = new Date();
    const formattedDate = this.today.toISOString();
    
    this.receiptFormGroup.get('fdesde')?.setValue(formattedDate);

    const fdesdeString = this.receiptFormGroup.get('fdesde')?.value;

    if (fdesdeString) {
      const fdesde = new Date(fdesdeString);
      const fhasta = new Date(fdesde);

      fhasta.setFullYear(fhasta.getFullYear() + 1);

      const formattedFhasta = fhasta.toISOString();
      this.receiptFormGroup.get('fhasta')?.setValue(formattedFhasta)
    }

    this.token = localStorage.getItem('user');
    
    this.currentUser = JSON.parse(this.token);

      if (this.currentUser) {
        this.filteredIdent = this.identControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );

        this.getState();
        this.getColor();
        this.getRates();
        this.getTypeVehicles();
        this.getUtilityVehicle();
        this.getClass();
        this.getPlan();
        this.getBroker();
        this.getAccesories();
        this.getMethodOfPayment();
        this.getTakers();
    }
  }

  searchPropietary(){
    let data = {
      xrif_cliente: this.personsFormGroup.get('xrif_cliente')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/propietary', data).subscribe((response: any) => {
      if (response.status) {
        this.firstTime = false;
        this.detail = true;
        this.personsFormGroup.get('xnombre')?.setValue(response.data.xnombre)
        this.personsFormGroup.get('xapellido')?.setValue(response.data.xapellido)
        this.personsFormGroup.get('xtelefono_emp')?.setValue(response.data.xtelefono_emp)
        this.personsFormGroup.get('email')?.setValue(response.data.email)
        this.personsFormGroup.get('cestado')?.setValue(response.data.cestado)
        this.personsFormGroup.get('cciudad')?.setValue(response.data.cciudad)
        this.getCity();
        this.personsFormGroup.get('xdireccion')?.setValue(response.data.xdireccion)
      }
    });
  }

  searchVehicle(){
    let data = {
      xplaca: this.vehicleFormGroup.get('xplaca')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/vehicle', data).subscribe((response: any) => {
      if (response.status) {
        this.snackBar.open(`${response.message}`, '', {
          duration: 10000,
        });
        this.vehicleFormGroup.get('xplaca')?.setValue('')
      }
    });
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
      this.personsFormGroup.get('cciudad')?.setValue(selectedCity.id);
    }
  }

  changeYears() {
    const fanoControl = this.vehicleFormGroup.get('fano');
    
    if (fanoControl && fanoControl.value) {
      const fanoValue = parseInt(fanoControl.value, 10);
      
      if (fanoValue > 2021) {
        this.snackBar.open(`No puedes colocar un año mayor al 2021. Por favor, vuelve a intentarlo`, '', {
          duration: 5000,
        });
      }else{
        this.getBrand()
      }
    }
  }

  getBrand(){
    let data = {
      qano: this.vehicleFormGroup.get('fano')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/brand', data).subscribe((response: any) => {
      if (response.data.brand) {
        this.brandList = [];
        for (let i = 0; i < response.data.brand.length; i++) {
          this.brandList.push({
            id: i,
            value: response.data.brand[i].xmarca,
          });
        }
        this.brandList.sort((a, b) => a.value > b.value ? 1 : -1);

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
      this.vehicleFormGroup.get('xmarca')?.setValue(selectedBrand.value);
      this.getModel();
    }
  }

  getModel(){
    let data = {
      qano: this.vehicleFormGroup.get('fano')?.value,
      xmarca: this.vehicleFormGroup.get('xmarca')?.value,
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/model', data).subscribe((response: any) => {
      if (response.data.model) {
        this.modelList = [];
        for (let i = 0; i < response.data.model.length; i++) {
          this.modelList.push({
            id: i,
            value: response.data.model[i].xmodelo,
          });
        }
        this.modelList.sort((a, b) => a.value > b.value ? 1 : -1);

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
      this.vehicleFormGroup.get('xmodelo')?.setValue(selectedModel.value);
      this.getVersion();
    }
  }

  getVersion(){
    let data = {
      qano: this.vehicleFormGroup.get('fano')?.value,
      xmarca: this.vehicleFormGroup.get('xmarca')?.value,
      xmodelo: this.vehicleFormGroup.get('xmodelo')?.value,
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/version', data).subscribe((response: any) => {
      if (response.data.version) {
        this.versionList = [];
        for (let i = 0; i < response.data.version.length; i++) {
          this.versionList.push({
            id: i,
            value: response.data.version[i].xversion,
            npasajero: response.data.version[i].npasajero,
            cclasificacion: response.data.version[i].xclasificacion,
            id_inma: response.data.version[i].id,
          });
        }
        this.versionList.sort((a, b) => a.value > b.value ? 1 : -1);

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
      this.vehicleFormGroup.get('xversion')?.setValue(selectedVersion.value);
      this.vehicleFormGroup.get('npasajeros')?.setValue(selectedVersion.npasajero);
      this.vehicleFormGroup.get('cclasificacion')?.setValue(selectedVersion.cclasificacion);
      this.vehicleFormGroup.get('id_inma')?.setValue(selectedVersion.id_inma);
    }
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
      this.vehicleFormGroup.get('xcolor')?.setValue(selectedColor.value);
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
      this.getHullPrice();
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

  getBroker(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].ccorredor,
            value: response.data.broker[i].xdescripcion_l,
          });
        }
        this.filteredBroker = this.brokerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterBroker(value || ''))
        );
      }
    });
  }

  private _filterBroker(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.brokerList
      .map(broker => broker.value)
      .filter(broker => broker.toLowerCase().includes(filterValue));
  }

  onBrokerSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedBroker = this.brokerList.find(broker => broker.value === selectedValue);
    if (selectedBroker) {
      this.planFormGroup.get('ccorredor')?.setValue(selectedBroker.id);
    }
  }

  onCoverageChange(): void {
    if(this.vehicleFormGroup.get('xcobertura')?.value == 'Rcv'){
      this.helmet = false;
      this.activateInspection = false;
    }else{
      this.activateInspection = true;
      this.helmet = true;
    }
  }

  changeInspection(){
    if(this.currentUser.data.crol != 1){
      this.snackBar.open(`No posee Número de Inspección, por lo tanto no puede proceder con ${this.vehicleFormGroup.get('xcobertura')?.value}`, '', {
        duration: 4000,
      });
    }
  }

  getHullPrice(){
    let marca = this.brandList.find(element => element.control === this.vehicleFormGroup.get('cmarca')?.value);
    let modelo = this.modelList.find(element => element.control === this.vehicleFormGroup.get('cmodelo')?.value);
    let clase = this.classList.find(element => element.id === this.vehicleFormGroup.get('cclase')?.value);
    let data =  {
      xclase: clase.value,  
      xmarca: marca.value,
      xmodelo: modelo.value,
      cano: this.vehicleFormGroup.get('fano')?.value,
      xcobertura: this.vehicleFormGroup.get('xcobertura')?.value,
      
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/hull-price', data).subscribe((response: any) => {
      if(response.status){
        this.planFormGroup.get('pcasco')?.setValue(response.data.ptasa_casco);
        this.planFormGroup.get('pmotin')?.setValue(response.data.ptarifa);
        for(let i = 0; i < response.data.ptarifa.length; i++){
          this.planFormGroup.get('pcatastrofico')?.setValue(response.data.ptarifa[1].ptarifa)
          this.planFormGroup.get('pmotin')?.setValue(response.data.ptarifa[0].ptarifa)
        }
      }
    })
  }

  getTakers(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/takers', null).subscribe((response: any) => {
      if (response.data.takers) {
        for (let i = 0; i < response.data.takers.length; i++) {
          this.takersList.push({
            id: response.data.takers[i].ctomador,
            value: response.data.takers[i].xtomador,
          });
        }
        this.filteredTakers = this.takersControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterTakers(value || ''))
        );
      }
    });
  }

  private _filterTakers(value: string): string[] {
    const filterValue = value.toLowerCase();
    const lista = this.takersList.map(taker => taker.value).filter(taker => taker.toLowerCase().includes(filterValue));;

    if(!lista[0]){
      this.planFormGroup.get('xtomador')?.setValue(filterValue)
    }

    return lista
  }

  onTakersSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedTakers = this.takersList.find(taker => taker.value === selectedValue);
    if (selectedTakers) {
      this.planFormGroup.get('ctomador')?.setValue(selectedTakers.id);
    }
  }

  openDiscount(){
    if(this.planFormGroup.get('msuma_aseg')?.value){
      this.discount = true;
      this.calculationPremiums()
    }else{
      this.discount = false;
    }
  }

  calculationPremiums(){
    const msumaAseg = this.planFormGroup.get('msuma_aseg')?.value;
    const pcasco = this.planFormGroup.get('pcasco')?.value;
    const pcatastrofico = this.planFormGroup.get('pcatastrofico')?.value;
    const pmotin = this.planFormGroup.get('pmotin')?.value;
    
    let calculo: number = 0;
    let catastrofico: number = 0;
    let motin: number = 0;
    
    if (typeof msumaAseg === 'number' && typeof pcasco === 'number') {
      calculo = msumaAseg * pcasco / 100;
      this.planFormGroup.get('mprima_casco')?.setValue(calculo.toString());
      this.planFormGroup.get('mprima_bruta')?.setValue(calculo.toString());
      this.primaBruta = this.planFormGroup.get('mprima_bruta')?.value
    }

    if (typeof msumaAseg === 'number' && typeof pcatastrofico === 'number') {
      catastrofico = (msumaAseg * pcatastrofico) / 100;
    
      this.planFormGroup.get('mcatastrofico')?.setValue(catastrofico.toString());
    }
    
    if (typeof msumaAseg === 'number' && typeof pmotin === 'number') {
      motin = (msumaAseg * pmotin) / 100;
    
      this.planFormGroup.get('mmotin')?.setValue(motin.toString());
    }
    this.sumaAsegurada = msumaAseg;
  }

  getDiscount(){
    const descuento = this.planFormGroup.get('pdescuento')?.value;
    const casco = this.planFormGroup.get('mprima_casco')?.value;
    
    let division: number = 0;
    let multiplicacion: number = 0;
    let calculo_descuento: number = 0;

    if(descuento){
      if (typeof descuento === 'number' && typeof casco === 'string') {

        const cascoNumero = parseFloat(casco);
      
        division = descuento / 100;
        multiplicacion = cascoNumero * division;
        calculo_descuento = cascoNumero - multiplicacion;
  
        this.planFormGroup.get('mprima_casco')?.setValue(calculo_descuento.toString());
      }
    }else{
      this.planFormGroup.get('mprima_casco')?.setValue(this.primaBruta);
    }

    if(this.planFormGroup.get('mprima_casco')?.value){
      this.enableInfo = true;
    }
    this.descuento = this.planFormGroup.get('pdescuento')?.value;
  }

  calculationPremiumsShielding(){
    const msumaAseg = this.planFormGroup.get('msuma_blindaje')?.value;
    const pblindaje = this.planFormGroup.get('pblindaje')?.value;

    let calculo: number = 0;
    
    if (typeof msumaAseg === 'number' && typeof pblindaje === 'number') {
      calculo = msumaAseg * pblindaje / 100;
      this.planFormGroup.get('mprima_blindaje')?.setValue(calculo.toString());
    }
  }

  getAccesories(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/accesories', null).subscribe((response: any) => {
      if (response.data.accesories) {
        for (let i = 0; i < response.data.accesories.length; i++) {
          this.accesoriesList.push(response.data.accesories[i].xaccesorio);
        }
      }
    });
  }

  onToppingsChange(selectedToppings: any[]) {

  }

  getMethodOfPayment(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/method-of-payment', null).subscribe((response: any) => {
      if (response.data.payment) {
        for (let i = 0; i < response.data.payment.length; i++) {
          this.methodOfPaymentList.push({
            id: response.data.payment[i].cmetodologiapago,
            value: response.data.payment[i].xmetodologiapago,
          });
        }
        this.filteredMethodOfPayment = this.methodOfPaymentControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMethodOfPayment(value || ''))
        );
      }
    });
  }

  private _filterMethodOfPayment(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.methodOfPaymentList
      .map(payment => payment.value)
      .filter(payment => payment.toLowerCase().includes(filterValue));
  }

  onMethodOfPaymentSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedMethodOfPayment = this.methodOfPaymentList.find(payment => payment.value === selectedValue);
    if (selectedMethodOfPayment) {
      this.receiptFormGroup.get('cmetodologiapago')?.setValue(selectedMethodOfPayment.id);
      this.operationAmount();
    }
  }

  operationAmount(){
    let data = {
      cplan: this.planFormGroup.get('cplan')?.value,
      cmetodologiapago: this.receiptFormGroup.get('cmetodologiapago')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      igrua: false,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/premium-amount', data).subscribe((response: any) => {
      if (response.status) {
        this.amountTotal = true;
        this.montoTotal = response.data.mprima
      }else{
        this.amountTotal = false;
      }
    });
  }

  calculateDate(newValue: string) {
    this.receiptFormGroup.get('fhasta')?.setValue('');
    const fdesdeString = newValue;
  
    if (fdesdeString) {
      const fdesde = new Date(fdesdeString);
      const fhasta = new Date(fdesde);
  
      fhasta.setFullYear(fhasta.getFullYear() + 1);
  
      const formattedFhasta = fhasta.toISOString();
      this.receiptFormGroup.get('fhasta')?.setValue(formattedFhasta);
    }
  }
  
  onSubmit(){
    this.buttonEmissions = false;
    this.loadingEmissions = true;

    let data = {
      icedula: this.personsFormGroup.get('icedula')?.value,
      xrif_cliente: this.personsFormGroup.get('xrif_cliente')?.value,
      xnombre: this.personsFormGroup.get('xnombre')?.value,
      xapellido: this.personsFormGroup.get('xapellido')?.value,
      xtelefono_emp: this.personsFormGroup.get('xtelefono_emp')?.value,
      email: this.personsFormGroup.get('email')?.value,
      cestado: this.personsFormGroup.get('cestado')?.value,
      cciudad: this.personsFormGroup.get('cciudad')?.value,
      xdireccion: this.personsFormGroup.get('xdireccion')?.value,
      xplaca: this.vehicleFormGroup.get('xplaca')?.value,
      xmarca: this.vehicleFormGroup.get('xmarca')?.value,
      xmodelo: this.vehicleFormGroup.get('xmodelo')?.value,
      xversion: this.vehicleFormGroup.get('xversion')?.value,
      fano: this.vehicleFormGroup.get('fano')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      xcolor: this.vehicleFormGroup.get('xcolor')?.value,
      xserialcarroceria: this.vehicleFormGroup.get('xserialcarroceria')?.value,
      xserialmotor: this.vehicleFormGroup.get('xserialmotor')?.value,
      xcobertura: this.vehicleFormGroup.get('xcobertura')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      cclasificacion: this.vehicleFormGroup.get('cclasificacion')?.value,
      ctomador: this.planFormGroup.get('ctomador')?.value,
      xtomador: this.planFormGroup.get('xtomador')?.value,
      ccotizacion: this.vehicleFormGroup.get('ccotizacion')?.value,
      cinspeccion: this.vehicleFormGroup.get('cinspeccion')?.value,
      fdesde_pol: this.receiptFormGroup.get('fdesde_pol')?.value,
      fhasta_pol: this.receiptFormGroup.get('fhasta_pol')?.value,
      cplan_rc: this.planFormGroup.get('cplan')?.value,
      ccorredor: this.planFormGroup.get('ccorredor')?.value,
      pcasco: this.planFormGroup.get('pcasco')?.value,
      msuma_aseg: this.planFormGroup.get('msuma_aseg')?.value,
      mprima_bruta: this.planFormGroup.get('mprima_bruta')?.value,
      pdescuento: this.planFormGroup.get('pdescuento')?.value,
      pmotin: this.planFormGroup.get('pmotin')?.value,
      pcatastrofico: this.planFormGroup.get('pcatastrofico')?.value,
      mprima_casco: this.planFormGroup.get('mprima_casco')?.value,
      mcatastrofico: this.planFormGroup.get('mcatastrofico')?.value,
      mmotin: this.planFormGroup.get('mmotin')?.value,
      pblindaje: this.planFormGroup.get('pblindaje')?.value,
      msuma_blindaje: this.planFormGroup.get('msuma_blindaje')?.value,
      mprima_blindaje: this.planFormGroup.get('mprima_blindaje')?.value,
      xpago: this.receiptFormGroup.get('xpago')?.value,
      femision: this.receiptFormGroup.get('femision')?.value,
      cmetodologiapago: this.receiptFormGroup.get('cmetodologiapago')?.value,
      id_inma: this.vehicleFormGroup.get('id_inma')?.value,
      cpais: 58
    }

    const nombre = this.personsFormGroup.get('xnombre')?.value + ' ' + this.personsFormGroup.get('xapellido')?.value;
    const placa = this.vehicleFormGroup.get('xplaca')?.value;

    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/create', data).subscribe((response: any) => {
      if (response.status) {
        this.loadingEmissions = false;
        this.loadingPdf = true;
        this.ccontratoflota = response.data.ccontratoflota;
        const observable = from(this.pdfGenerationService.LoadDataCertifiqued(this.ccontratoflota));

        observable.subscribe(
          (data) => {
            console.log('DATA ' + data)
          },
          (error) => {
            console.log(error)
          }
        );

        this.snackBar.open(`Se ha generado exitósamente el contrato n° ${this.ccontratoflota} del cliente ${nombre?.toUpperCase()} para el vehículo de placa ${placa?.toUpperCase()}`, '', {
          duration: 3000,
        });
      }
    });
  }
}
