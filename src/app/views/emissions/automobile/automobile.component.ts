import {Component, ViewChild} from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PdfGenerationService } from '../../../_services/ServicePDF'

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

  isLinear = false;
  helmet: boolean = false;
  discount: boolean = false;
  enableInfo: boolean = false;
  amountTotal: boolean = false;
  primaBruta!: any;
  descuento!: any;
  sumaAsegurada!: any;
  montoTotal!: any;
  ccontratoflota!: any;

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
    xcolor: ['', Validators.required],
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
    ccorredor: ['', Validators.required],
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
    cmetodologiapago: ['', Validators.required]
  });

  constructor( private _formBuilder: FormBuilder,
               private http: HttpClient,
               private modalService: NgbModal,
               private dateAdapter: DateAdapter<Date>,
               private pdfGenerationService: PdfGenerationService) {dateAdapter.setLocale('es');}


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
    this.getBroker();
    this.getAccesories();
    this.getMethodOfPayment();
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

  getBrand(){
    let data;
    this.http.post(environment.apiUrl + '/api/v1/valrep/brand', data).subscribe((response: any) => {
      if (response.data.brand) {
        this.brandList = [];
        for (let i = 0; i < response.data.brand.length; i++) {
          this.brandList.push({
            id: response.data.brand[i].cmarca,
            value: response.data.brand[i].xmarca,
            control: response.data.brand[i].control,
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
      this.vehicleFormGroup.get('cmarca')?.setValue(selectedBrand.control);
      this.getModel();
    }
  }

  getModel(){
    let marca = this.brandList.find(element => element.control == this.vehicleFormGroup.get('cmarca')?.value) ;
    let data = {
      cmarca: marca.id
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/model', data).subscribe((response: any) => {
      if (response.data.model) {
        this.modelList = [];
        for (let i = 0; i < response.data.model.length; i++) {
          this.modelList.push({
            id: response.data.model[i].cmodelo,
            value: response.data.model[i].xmodelo,
            control: response.data.model[i].control,
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
      this.vehicleFormGroup.get('cmodelo')?.setValue(selectedModel.control);
      this.getVersion();
    }
  }

  getVersion(){
    let marca = this.brandList.find(element => element.control == this.vehicleFormGroup.get('cmarca')?.value);
    let modelo = this.modelList.find(element => element.control == this.vehicleFormGroup.get('cmodelo')?.value);
    let data = {
      cmarca: marca.id,
      cmodelo: modelo.id
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/version', data).subscribe((response: any) => {
      if (response.data.version) {
        this.versionList = [];
        for (let i = 0; i < response.data.version.length; i++) {
          this.versionList.push({
            id: response.data.version[i].cversion,
            value: response.data.version[i].xversion,
            value2: `${response.data.version[i].xversion} - Año ${response.data.version[i].fano}`,
            npasajeros: response.data.version[i].npasajeros,
            fano: response.data.version[i].fano,
            control: response.data.version[i].control,
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
      .map(version => version.value2)
      .filter(version => version.toLowerCase().includes(filterValue));
  }

  onVersionSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedVersion = this.versionList.find(version => version.value2 === selectedValue);
    if (selectedVersion) {
      this.vehicleFormGroup.get('cversion')?.setValue(selectedVersion.control);
      this.changePassager();
    }
  }

  changePassager(){
    let version = this.versionList.find(element => element.control == this.vehicleFormGroup.get('cversion')?.value) ;
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
    if(this.vehicleFormGroup.get('xcobertura')?.value == 'RCV'){
      this.helmet = false;
    }else{
      this.helmet = true;
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
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobil/hull-price', data).subscribe((response: any) => {
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
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobil/premium-amount', data).subscribe((response: any) => {
      if (response.status) {
        this.amountTotal = true;
        this.montoTotal = response.data.mprima
      }else{
        this.amountTotal = false;
      }
    });
  }

  onSubmit(){
    let marca = this.brandList.find(element => element.control === this.vehicleFormGroup.get('cmarca')?.value);
    let modelo = this.modelList.find(element => element.control === this.vehicleFormGroup.get('cmodelo')?.value);
    let version = this.versionList.find(element => element.control === this.vehicleFormGroup.get('cversion')?.value);
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
      cmarca: marca.id,
      cmodelo: modelo.id,
      cversion: version.id,
      fano: this.vehicleFormGroup.get('fano')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      xcolor: this.vehicleFormGroup.get('xcolor')?.value,
      xserialcarroceria: this.vehicleFormGroup.get('xserialcarroceria')?.value,
      xserialmotor: this.vehicleFormGroup.get('xserialmotor')?.value,
      xcobertura: this.vehicleFormGroup.get('xcobertura')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
      ctipovehiculo: this.vehicleFormGroup.get('ctipovehiculo')?.value,
      cclase: this.vehicleFormGroup.get('cclase')?.value,
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
      cpais: 58
    }

    console.log(data)
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobil/create', data).subscribe((response: any) => {
      if (response.status) {
        this.ccontratoflota = response.data.ccontratoflota;
        const observable = from(this.pdfGenerationService.LoadDataCertifiqued(this.ccontratoflota));

        observable.subscribe(
          (data) => {
            console.log(data)
          },
          (error) => {
            console.log(error)
          }
        );
      }
    });
  }
}
