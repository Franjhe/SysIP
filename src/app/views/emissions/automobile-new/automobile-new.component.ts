import {  Component, ViewChild, TemplateRef } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, FormControl , FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  from, Observable  } from 'rxjs';
import {  map, startWith  } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PdfGenerationService } from '../../../_services/ServicePDF'
import {MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { ChangeDetectorRef } from '@angular/core';
import { format, addYears } from 'date-fns';
// import { initUbii } from '@ubiipagos/boton-ubii-dc';
import { initUbii } from '@ubiipagos/boton-ubii';
import * as Papa from 'papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-automobile-new',
  templateUrl: './automobile-new.component.html',
  styleUrls: ['./automobile-new.component.scss']
})
export class AutomobileNewComponent {

  personsFormGroup = this._formBuilder.group({
    icedula: ['', Validators.required],
    xrif_cliente: ['', Validators.required],
    xnombre: ['', Validators.required],
    xapellido: ['', Validators.required],
    fnacimiento: ['', Validators.required],
    xtelefono_emp: ['', Validators.required],
    email: ['', Validators.required],
    cestado: ['', Validators.required],
    cciudad: ['', Validators.required],
    iestado_civil: ['', Validators.required],
    isexo: ['', Validators.required],
    xdireccion: [''],
  });

  planFormGroup = this._formBuilder.group({
    cplan: ['', Validators.required],
    xplan: [{ value: '', disabled: true }],
    ccorredor: [''],
    xcorredor: [''],
    ctomador: [{ value: '', disabled: false }],
    xtomador: [{ value: '', disabled: false }],
    icedula_tomador: [''],
    xrif_tomador: [''],
    cestado_tomador: [''],
    cciudad_tomador: [''],
    xemail_tomador: [''],
    xdireccion_tomador: [''],
    xzona_postal_tomador: [''],
    xtelefono_tomador: [''],
    pcasco: [{ value: '', disabled: true }],
    msuma_aseg: [''],
    msuma_aseg_text: [{ value: '', disabled: true }],
    mprima_bruta: [{ value: '', disabled: true }],
    mprima_casco_text: [{ value: '', disabled: true }],
    mprima_bruta_text: [{ value: '', disabled: true }],
    pdescuento: [''],
    precarga: [''],
    pmotin: [{ value: '', disabled: true }],
    pcatastrofico: [{ value: '', disabled: true }],
    mprima_casco: [{ value: '', disabled: true }],
    mcatastrofico: [''],
    mmotin: [''],
    pblindaje: [{ value: '', disabled: true }],
    msuma_blindaje: [''],
    mprima_blindaje: [{ value: '', disabled: true }],
    accesorios :  this._formBuilder.array([]),
    msuma_aseg_acce: [{ value: '', disabled: false }],
    paditamento: [{ value: '', disabled: false }],
    msuma_aditamento: [''],
    mprima_aditamento: [{ value: '', disabled: false }],
  });

  receiptFormGroup = this._formBuilder.group({
    xpago: [''],
    femision: [''],
    fdesde: ['', Validators.required],
    fhasta: ['', Validators.required],
    cmetodologiapago: ['', Validators.required],
    ctipopago: [''],
    cbanco: [''],
    cbanco_destino: [''],
    fcobro: [''],
    xreferencia: [''],
    mprima_pagada: [''],
    mpagado: [''],
    xmoneda: [''],
    mprima_accesorio: [''],
    irecibo: ['']
  });

  vehicleFormGroup = this._formBuilder.group({
    ccotizacion: [{ value: '', disabled: false }],
    cinspeccion: [{ value: '', disabled: false }],
    xplaca: ['',[Validators.required, Validators.maxLength(7)]],
    xmarca: [{ value: '', disabled: true}, Validators.required],
    xmodelo: [{ value: '', disabled: true}, Validators.required],
    xversion: [{ value: '', disabled: true}, Validators.required],
    fano: ['',[Validators.required, Validators.maxLength(4)]],
    npasajeros: [{ value: '', disabled: true }],
    cclasificacion: [''],
    xclasificacion: [''],  
    xtipovehiculo: [''],
    xcolor: ['', Validators.required],
    xserialcarroceria: ['', [Validators.required, Validators.maxLength(17)]],
    xserialmotor: ['', [Validators.maxLength(17)]],
    xcobertura: ['', Validators.required],
    ctarifa_exceso: ['', Validators.required],
    cuso: [''],
    cusoVeh: [''],
    xuso: [''],
    precargo: [''],
    ctipovehiculo: [''],
    cclase: [''],
    id_inma: [''],
    npesovacio: [''],
    ncapcarga: [''],
  });

  //listas
  identList = ['V', 'P', 'E', 'J', 'C','G'];
  stateList: any[] = [];
  cityList: any[] = [];
  stateTakerList: any[] = [];
  cityTakerList: any[] = [];
  brandList: any[] = [];
  modelList: any[] = [];
  versionList: any[] = [];
  colorList: any[] = [];
  ratesList: any[] = [];
  typeVehicleList: any[] = [];
  utilityVehicleList:  any[] = [];
  utilityList:  any[] = [];
  classList:  any[] = [];
  planList:  any[] = [];
  brokerList:  any[] = [];
  takersList: any [] = []


  //Observable's 
  filteredState!: Observable<string[]>;
  filteredCity!: Observable<string[]>;
  filteredStateTaker!: Observable<string[]>;
  filteredCityTaker!: Observable<string[]>;
  filteredVersion!: Observable<string[]>;
  filteredColor!: Observable<string[]>;
  filteredRates!: Observable<string[]>;
  filteredTypeVehicle!: Observable<string[]>;
  filteredUtilityVehicle!: Observable<string[]>;
  filteredUtility!: Observable<string[]>;
  filteredClass!: Observable<string[]>;
  filteredPlan!: Observable<string[]>;
  filteredBroker!: Observable<string[]>;
  filteredTakers!: Observable<string[]>;
  filteredBrand!: Observable<string[]>;
  filteredModel!: Observable<string[]>;
  filteredMethodOfPayment!: Observable<string[]>;



  //controles
  stateControl = new FormControl('');
  cityControl = new FormControl('');
  stateTakerControl = new FormControl('');
  cityTakerControl = new FormControl('');
  versionControl = new FormControl('');
  colorControl = new FormControl('');
  ratesControl = new FormControl('');
  typeVehicleControl = new FormControl('');
  utilityVehicleControl = new FormControl('');
  utilityControl = new FormControl('');
  classControl = new FormControl('');
  planControl = new FormControl('');
  brokerControl = new FormControl('');
  accesories = new FormControl('');
  takersControl = new FormControl('');
  brandControl = new FormControl('');
  modelControl = new FormControl('');
  methodOfPaymentControl = new FormControl('');


  //validaciones
  clientNew : boolean = false
  activaRepresentante: boolean = false;
  userBroker : boolean = false
  clasificacionMotos: boolean = false;
  casco: boolean = false;
  activateTypeVehicle: boolean = false;
  activateAttachment: boolean = false;
  activateRate : boolean = false;
  takersInfo : boolean = false;
  activateInspection : boolean = false;

  //variables
  fecha!: any ;
  currentUser!: any
  sumaAsegurada!: any;
  ccotizacion!: any ; 
  tasaCascoInicial!: any ;
  sumaAseguradaBase!: any ;
  activateUtility!: any ;
  cplan!: any ;

  //montos
  primaMotin!: any ;
  primaRiesgo!: any ;
  primaRobo!: any ;
  primaFinal!: any ;
  xprimaTotalCasco!: any ;
  bcv!: any ;
  montoTotal!: any ;
  primaBruta!: any ;
  descuento!: any ;

  constructor
  (
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal,
    private dateAdapter: DateAdapter<Date>,
    private pdfGenerationService: PdfGenerationService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    readonly dialog: MatDialog,
    private router: Router
  ) {}
   
  get accesorios() : FormArray {
    return this.planFormGroup.get("accesorios") as unknown as FormArray
  }  

  ngOnInit(){


    this.getState();
    this.getColor();
    this.getRates();
    this.getTypeVehicles();
    this.getUtilityVehicle();
    this.getClass();
    this.getPlan();
    this.getBroker();
    this.getAccesories();
    this.getTakers();
    this.setDefaultDates();
    this.getUtility();
    this.fecha = 'Fecha de Nacimiento';


    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Obtener solo la parte de la fecha sin la hora
    
    this.receiptFormGroup.get('fdesde')?.setValue(formattedDate);
    
    const fdesdeString = this.receiptFormGroup.get('fdesde')?.value;
    
    if (fdesdeString) {
      const fdesde = new Date(fdesdeString);
      const fhasta = new Date(fdesde);
    
      fhasta.setFullYear(fhasta.getFullYear() + 1);
    
      const formattedFhasta = fhasta.toISOString().split('T')[0]; // Obtener solo la parte de la fecha sin la hora
      this.receiptFormGroup.get('fhasta')?.setValue(formattedFhasta);

    }

    const token = localStorage.getItem('user') || '';
    
    this.currentUser = JSON.parse(token);

    if(this.currentUser.data.crol == 6){
      this.userBroker = false;
    }else{
      this.userBroker = true;
    }


  }

  //Funciones en "Datos Personales"

  onIdentSelection() {
    let selectedIdent = this.personsFormGroup.get('icedula')?.value || ''

    // Si selectedIdent es distinto de 'V', eliminar la validación de 'fnacimiento'
    if (selectedIdent !== 'V') {
      this.personsFormGroup.get('fnacimiento')?.clearValidators();
      this.personsFormGroup.get('iestado_civil')?.clearValidators();
      this.personsFormGroup.get('isexo')?.clearValidators();
      this.personsFormGroup.get('xapellido')?.clearValidators();
      this.activaRepresentante = true;
      this.fecha = 'Fecha de Registro';



    } else { 
      // Si selectedIdent es 'V', establecer la validación de 'fnacimiento'
      this.personsFormGroup.get('fnacimiento')?.clearValidators();;
      this.personsFormGroup.get('iestado_civil')?.clearValidators();;
      this.personsFormGroup.get('isexo')?.clearValidators();;
      this.personsFormGroup.get('xapellido')?.clearValidators();;
      this.activaRepresentante = false;
      this.fecha = 'Fecha de Nacimiento';



    }

    // Actualizar los controles después de cambiar las validaciones
    this.personsFormGroup.get('fnacimiento')?.updateValueAndValidity();
    this.personsFormGroup.get('iestado_civil')?.updateValueAndValidity();
    this.personsFormGroup.get('isexo')?.updateValueAndValidity();
    this.personsFormGroup.get('xapellido')?.updateValueAndValidity();
  }

  calculateYears(event: any) {
    const selectedDate = new Date(event.value);
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    if (selectedDate > eighteenYearsAgo) {
      this.snackBar.open('El propietario es menor de edad, por ende no se puede emitir esta póliza', '', {
        duration: 5000,
      });

      this.personsFormGroup.get('fnacimiento')?.setValue('')

      return
    }
  }

  searchPropietary(){
    let data = {
      xrif_cliente: this.personsFormGroup.get('xrif_cliente')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/propietary', data).subscribe((response: any) => {
      if (response.status) {
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

          this.stateTakerList.push({
            id: response.data.state[i].cestado,
            value: response.data.state[i].xdescripcion_l
          });
        }
        this.filteredState = this.stateControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterState(value || ''))
        );

        this.filteredStateTaker = this.stateTakerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterStateTaker(value || ''))
        );
      }
    });
  }

  private _filterStateTaker(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateTakerList
      .map(state => state.value)
      .filter(state => state.toLowerCase().includes(filterValue));
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stateList
      .map(state => state.value)
      .filter(state => state.toLowerCase().includes(filterValue));
  }

  getCityTaker(){
    let data = {
      cpais: 58,
      cestado: this.planFormGroup.get('cestado_tomador')?.value
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/city', data).subscribe((response: any) => {
      if (response.data.city) {
        for (let i = 0; i < response.data.city.length; i++) {
          this.cityTakerList.push({
            id: response.data.city[i].cciudad,
            value: response.data.city[i].xdescripcion_l
          });
        }
        this.filteredCityTaker = this.cityTakerControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterCityTaker(value || ''))
        );
      }
    });
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

  private _filterCityTaker(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cityTakerList
      .map(city => city.value)
      .filter(city => city.toLowerCase().includes(filterValue));
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

  getUtilityVehicle(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/utility-rechange', null).subscribe((response: any) => {
      if (response.data.utilityR) {
        for (let i = 0; i < response.data.utilityR.length; i++) {
          this.utilityVehicleList.push({
            id: response.data.utilityR[i].cuso,
            value: response.data.utilityR[i].xuso,
            precargo: response.data.utilityR[i].precargo,
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

  getUtility(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/utility', null).subscribe((response: any) => {
      if (response.data.utility) {
        for (let i = 0; i < response.data.utility.length; i++) {
          this.utilityList.push({
            value: response.data.utility[i].xuso,
          });
        }
        this.filteredUtility = this.utilityControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterUtility(value || ''))
        );
      }
    });
  }

  private _filterUtility(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.utilityList
      .map(utility => utility.value)
      .filter(utility => utility.toLowerCase().includes(filterValue));
  }

  searchRates(){
    let data = {
      cano: this.vehicleFormGroup.get('fano')?.value,
      xclase: this.vehicleFormGroup.get('cclasificacion')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/search-rates', data).subscribe((response: any) => {
      if(response.casco){
        this.casco = response.casco;
      }else{
        const tarifaExcesoValue = this.vehicleFormGroup.get('ctarifa_exceso')?.value;
        if (tarifaExcesoValue !== null && tarifaExcesoValue !== undefined) {
          if(this.currentUser.data.crol == 7){
            if (typeof tarifaExcesoValue === 'number' && tarifaExcesoValue === 20) {
              this.clasificacionMotos = true;
              this.searchRates()
              // this.casco = true;
              // this.userBroker = true;
            }else{
              this.clasificacionMotos = false;
              this.casco = false;
              this.userBroker = false;
            }
          }else{
            this.snackBar.open(`${response.message}`, '', {
              duration: 4000,
            });
          }
        }
        this.casco = response.casco;
      }
    })
  }

  Clasification(){
    const xclasificacion = this.vehicleFormGroup.get('xclasificacion')?.value
    if(this.currentUser.data.crol == 7){
      this.vehicleFormGroup.get('cclasificacion')?.setValue(xclasificacion || '')
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
            id: response.data.plan[i].cplan,
            value: response.data.plan[i].xplan,
          });
        }


        if (this.currentUser.data.crol === 5 || this.currentUser.data.crol === 7) {
          
        }else{
          this.planList = this.planList.slice(0, 6);
        }

        
        if(this.ccotizacion){
          const selectedId = parseInt(this.cplan);
          const selectedPlan = this.planList.find(plan => plan.id === selectedId);
          if (selectedPlan) {
            this.planFormGroup.get('cplan')?.setValue(selectedPlan.id);
            this.planFormGroup.get('xplan')?.setValue(selectedPlan.value);
            this.getAmountQuotes();
          }
          
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

  getBroker(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].cproductor,
            value: response.data.broker[i].xproductor.trim(),
          });
        }
        this.filteredBroker = this.brokerControl.valueChanges.pipe(
          
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


  setDefaultDates(): void {
    const currentDate = new Date();

    const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

    this.receiptFormGroup.get('fdesde')?.setValue(formattedCurrentDate);

    const nextYearDate = addYears(currentDate, 1);

    const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');

    this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
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
      if(this.planFormGroup.get('xtomador')?.value){
        this.validateTaker();
      }
    }

    return lista
  }


  validateTaker(){
    if(this.planFormGroup.get('xtomador')?.value){
      if(this.planFormGroup.get('ctomador')?.value){
        this.planFormGroup.get('xtomador')?.setValue('')
        this.takersInfo = false;
      }else{
        this.takersInfo = true;
      }
    }

  }

  validateYearsFromHullPrice() {
    if(this.vehicleFormGroup.get('xtipovehiculo')?.value){
      this.getHullPrice()
    }
  }

  getHullPrice(){
    let data =  {
      cano: this.vehicleFormGroup.get('fano')?.value,
      xclase: this.vehicleFormGroup.get('cclasificacion')?.value,
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/hull-price', data).subscribe((response: any) => {
      if(response.status){
        if(!this.ccotizacion){
          let SumaAsegurada = this.sumaAsegurada
          if(this.vehicleFormGroup.get('xcobertura')?.value == 'Cobertura Amplia'){
            this.tasaCascoInicial = response.data.ptasa_casco
            this.planFormGroup.get('pcasco')?.setValue(response.data.ptasa_casco);
            this.planFormGroup.get('pblindaje')?.setValue(response.data.ptasa_casco);
            if(this.vehicleFormGroup.get('xtipovehiculo')?.value == 'CARGA' || this.vehicleFormGroup.get('xtipovehiculo')?.value == 'Carga'){
              this.planFormGroup.get('paditamento')?.setValue(response.data.ptasa_casco);
            }else{
              this.planFormGroup.get('paditamento')?.setValue(null);
            }
          }else{
            this.tasaCascoInicial = response.data.pperdida_total;
            this.planFormGroup.get('pcasco')?.setValue(response.data.pperdida_total);
            this.planFormGroup.get('pblindaje')?.setValue(response.data.pperdida_total);
            if(this.vehicleFormGroup.get('xtipovehiculo')?.value == 'CARGA' || this.vehicleFormGroup.get('xtipovehiculo')?.value == 'Carga'){
              this.planFormGroup.get('paditamento')?.setValue(response.data.pperdida_total);
            }else{
              this.planFormGroup.get('paditamento')?.setValue(null);
            }
          }
          
          this.planFormGroup.get('msuma_aseg')?.setValue(this.sumaAsegurada);
          if(this.currentUser.data.crol == 5 || this.currentUser.data.crol == 7){
            this.planFormGroup.get('msuma_aseg')?.enable();
          }else{
            this.planFormGroup.get('msuma_aseg')?.disable();
          }
          this.planFormGroup.get('msuma_aseg_text')?.setValue(this.formatCurrency(SumaAsegurada));
  
        }

        //this.openDiscount();
      }
    })
  }

  getAmount(){
    let data = {
      cplan: this.planFormGroup.get('cplan')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
    }
    // this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/premium-amount', data).subscribe((response: any) => {
    //   // if (response.status) {
    //   //   this.montoTotal = response.data.mprima
    //   //   this.ubii = response.data.ccubii
    //   //   if(this.montoTotal){
    //   //     this.operationUbii();
    //   //     this.amountTotalRcv = true;
    //   //     this.calculationsPremiumsCascoTotal()
    //   //     if(this.vehicleFormGroup.get('xcobertura')?.value !== 'Rcv'){
    //   //       this.amountTotalCasco = true;
    //   //     }else{
    //   //       this.amountTotalCasco = false;
    //   //     }
    //   //   }else{
    //   //     this.amountTotalRcv = false;
    //   //   }
    //   // }else{
    //   //   this.amountTotalRcv = false;
    //   // }
    // });
  }

  formatCurrency(value: any): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  }

  getAmountQuotes(){
    let data = {
      cplan: this.planFormGroup.get('cplan')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
    }
    // this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/premium-amount', data).subscribe((response: any) => {
    //   if (response.status) {
    //     this.ubii = response.data.ccubii
    //     if(this.montoTotal){
    //       this.operationUbii();
    //       this.amountTotalRcv = true;
    //       this.calculationsPremiumsCascoTotal()
    //       if(this.vehicleFormGroup.get('xcobertura')?.value !== 'Rcv'){
    //         this.amountTotalCasco = true;
    //       }else{
    //         this.amountTotalCasco = false;
    //       }
    //     }else{
    //       this.amountTotalRcv = false;
    //     }
    //   }else{
    //     this.amountTotalRcv = false;
    //   }
    // });
  }

  //Datos del Vehículo
  searchVehicle(){
    let data = {
      xplaca: this.vehicleFormGroup.get('xplaca')?.value
    };

    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/vehicle', data).subscribe((response: any) => {
      if (response.status) {
        this.snackBar.open(`${response.message}`, '', {
          duration: 5000,
        });
        this.vehicleFormGroup.get('xplaca')?.setValue('')
      }
    });
  }

  changeYears() {
    const fanoControl = this.vehicleFormGroup.get('fano');
    
    if (fanoControl && fanoControl.value) {
      this.getBrand() 
      this.snackBar.open(`Si el vehículo no existe por favor localice al ejecutivo comercial para regularizar esa incidencia`, '', {
        duration: 4000,
      });
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
            msum: response.data.version[i].msum,
            xtipovehiculo: response.data.version[i].xclase_rcv,
            ctarifa_exceso: response.data.version[i].ctarifa_exceso,
            xuso: response.data.version[i].xuso,
            npesovacio: response.data.version[i].npesovacio,
            ncapcarga: response.data.version[i].ncapcarga,
          });
        }
        this.versionList.sort((a, b) => a.value > b.value ? 1 : -1);

        if(this.ccotizacion){
          const selectedValue = this.vehicleFormGroup.get('xversion')?.value;
          const selectedVersion = this.versionList.find(version => version.value === selectedValue);
          if (selectedVersion) {
            this.vehicleFormGroup.get('xversion')?.setValue(selectedVersion.value);
            this.vehicleFormGroup.get('npasajeros')?.setValue(selectedVersion.npasajero);
            this.vehicleFormGroup.get('cclasificacion')?.setValue(selectedVersion.cclasificacion);
            this.vehicleFormGroup.get('id_inma')?.setValue(selectedVersion.id_inma);
            this.vehicleFormGroup.get('xtipovehiculo')?.setValue(selectedVersion.xtipovehiculo);
            this.getHullPrice()
            this.vehicleFormGroup.get('xuso')?.setValue(selectedVersion.xuso);
            this.vehicleFormGroup.get('npesovacio')?.setValue(selectedVersion.npesovacio);
            this.vehicleFormGroup.get('ncapcarga')?.setValue(selectedVersion.ncapcarga);
            this.sumaAsegurada = selectedVersion.msum;
            this.sumaAseguradaBase = selectedVersion.msum;
      
      
            if(!this.vehicleFormGroup.get('xtipovehiculo')?.value){
              this.activateTypeVehicle = true;
            }else{
              this.activateTypeVehicle = false;
            }
      
            if(this.vehicleFormGroup.get('xtipovehiculo')?.value == 'CARGA' || this.vehicleFormGroup.get('xtipovehiculo')?.value == 'Carga'){
              this.activateAttachment = true;
            }else{
              this.activateAttachment = false;
            }
      
            if(!this.vehicleFormGroup.get('xuso')?.value){
              this.activateUtility = true;
            }else{
              this.activateUtility = false;
            }
          }
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
      this.vehicleFormGroup.get('xversion')?.setValue(selectedVersion.value);
      this.vehicleFormGroup.get('npasajeros')?.setValue(selectedVersion.npasajero);
      this.vehicleFormGroup.get('cclasificacion')?.setValue(selectedVersion.cclasificacion);
      this.searchRates();
      this.vehicleFormGroup.get('id_inma')?.setValue(selectedVersion.id_inma);
      this.vehicleFormGroup.get('xtipovehiculo')?.setValue(selectedVersion.xtipovehiculo);
      this.vehicleFormGroup.get('ctarifa_exceso')?.setValue(selectedVersion.ctarifa_exceso);
      this.vehicleFormGroup.get('xuso')?.setValue(selectedVersion.xuso);
      this.vehicleFormGroup.get('npesovacio')?.setValue(selectedVersion.npesovacio);
      this.vehicleFormGroup.get('ncapcarga')?.setValue(selectedVersion.ncapcarga);
      this.sumaAsegurada = selectedVersion.msum;
      this.sumaAseguradaBase = selectedVersion.msum;


      if(!this.vehicleFormGroup.get('xtipovehiculo')?.value){
        this.activateTypeVehicle = true;
      }else{
        this.activateTypeVehicle = false;
      }

      if(this.vehicleFormGroup.get('xtipovehiculo')?.value == 'CARGA' || this.vehicleFormGroup.get('xtipovehiculo')?.value == 'Carga'){
        this.activateAttachment = true;
      }else{
        this.activateAttachment = false;
      }
      
      if(!this.vehicleFormGroup.get('ctarifa_exceso')?.value){
        this.activateRate = true;
      }else{
        this.activateRate = false;
      }

      if(!this.vehicleFormGroup.get('xuso')?.value){
        this.activateUtility = true;
      }else{
        this.activateUtility = false;
      }

      const tarifaExcesoValue = this.vehicleFormGroup.get('ctarifa_exceso')?.value;
      if (tarifaExcesoValue !== null && tarifaExcesoValue !== undefined) {
          if (typeof tarifaExcesoValue === 'number' && tarifaExcesoValue === 20) {
              if(this.currentUser.data.crol == 7){

              }
          }
      }
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



  getAccesories(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/accesories', null).subscribe((response: any) => {
      if (response.data.accesories) {
        for (let i = 0; i < response.data.accesories.length; i++) {

          this.accesorios.push(
            this._formBuilder.group({
              caccesorio: response.data.accesories[i].caccesorio,
              xaccesorio: response.data.accesories[i].xaccesorio,
              ptasa: response.data.accesories[i].ptasa,
              sumaAsegurada: 0,
              xprimaAccesorio: 0
            })
          )

        }
      }
    });
  }

  valueSerial(value: any){
    var ExpRegSoloLetras="^[A-Za-z0-9\s]+$";
    if(value.data.match(ExpRegSoloLetras)==null){

      const formulario = this.vehicleFormGroup.get('xserialcarroceria')?.value  || ''
      const newValue = formulario.replace(new RegExp(`[^A-Za-z0-9\\s]`, 'g'), '');
    
      // Actualiza el valor en el formulario
      this.vehicleFormGroup.get('xserialcarroceria')?.setValue(newValue);

    }
  }

  valueSerialMotor(value: any){
    var ExpRegSoloLetras="^[A-Za-z0-9\s]+$";
    if(value.data.match(ExpRegSoloLetras)==null){
      const formulario = this.vehicleFormGroup.get('xserialmotor')?.value  || ''
      const newValue = formulario.replace(new RegExp(`[^A-Za-z0-9\\s]`, 'g'), '');
    
      // Actualiza el valor en el formulario
      this.vehicleFormGroup.get('xserialmotor')?.setValue(newValue);

    }
  }

  valueIdentification(value: any){
    var ExpRegSoloLetras="^[A-Za-z0-9\s]+$";
    if(value.data.match(ExpRegSoloLetras)==null){
      const formulario = this.vehicleFormGroup.get('xserialmotor')?.value  || ''
      const newValue = formulario.replace(new RegExp(`[^A-Za-z0-9\\s]`, 'g'), '');
    
      // Actualiza el valor en el formulario
      this.vehicleFormGroup.get('xserialmotor')?.setValue(newValue);

    }
  }

  changeInspection(){
    if(this.currentUser.data.crol != 5){
      this.snackBar.open(`No posee Número de Inspección, por lo tanto no puede proceder con ${this.vehicleFormGroup.get('xcobertura')?.value}`, '', {
        duration: 4000,
      });
    }
  }

  onCoverageChange() {
    if(this.vehicleFormGroup.get('xcobertura')?.value == 'Rcv'){
      //this.helmet = false;
      this.activateInspection = false;


      if(this.ccotizacion){
        //this.messageCoti = false;
      }else{
        //this.messageCoti = true;
      }
      this.planFormGroup.get('mmotin')?.setValue('');
      this.planFormGroup.get('mcatastrofico')?.setValue('');
    }
    else if(this.vehicleFormGroup.get('xcobertura')?.value !== 'Rcv'){
      this.validateYearsFromHullPrice()
      this.activateInspection = true;
      if(this.ccotizacion){
        //this.helmet = true;
        //this.messageCoti = false;
      }else{
        //this.helmet = true;
        //this.messageCoti = true;
      }
      
    }
  }

  valueplate(value: any){
    var ExpRegSoloLetras="^[A-Za-z0-9\s]+$";
    if(value.data.match(ExpRegSoloLetras)==null){
 

      const formulario = this.vehicleFormGroup.get('xplaca')?.value  || ''
      const newValue = formulario.replace(new RegExp(`[^A-Za-z0-9\\s]`, 'g'), '');
    
      // Actualiza el valor en el formulario
      this.vehicleFormGroup.get('xplaca')?.setValue(newValue);

    }
  }

  calculateDate(newValue: string) {
    this.receiptFormGroup.get('fhasta')?.setValue('');
  
    if (newValue) {
      const fdesde = new Date(newValue);
      const currentDate = new Date();
  
      const minStartDate = new Date(currentDate);
      minStartDate.setDate(minStartDate.getDate() - 5);
  
      // if (fdesde < minStartDate) {
      //   this.snackBar.open('La Fecha Desde no puede ser menor a 5 días antes de la fecha actual.', '', {
      //     duration: 3000,
      //   });
  
      //   const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
      //   this.receiptFormGroup.get('fdesde')?.setValue(formattedCurrentDate);
      //   this.cdr.detectChanges();
  
      //   const nextYearDate = addYears(currentDate, 1);
      //   const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');
      //   this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
  
      //   return;
      // }
  
      const fhasta = new Date(fdesde);
      const daysToAdd = 30;
  
      // if (fdesde < currentDate && fdesde.getDate() + 6 <= currentDate.getDate()) {
      //   this.snackBar.open('Requiere autorización si la Fecha Desde es menor que la fecha actual en 6 días o más.', '', {
      //     duration: 3000,
      //   });
      // }

  
      fhasta.setDate(fhasta.getDate() + daysToAdd);
  
      const maxEndDate = new Date(fdesde);
      maxEndDate.setDate(maxEndDate.getDate() + 366);
  
      // if (fhasta > maxEndDate) {
      //   this.snackBar.open('La Fecha Hasta no puede ser mayor a 365 días desde la Fecha Desde.', '', {
      //     duration: 3000,
      //   });
      //   console.error('La Fecha Hasta no puede ser mayor a 365 días desde la Fecha Desde');
      //   return;
      // }
      
      const nextYearDate = addYears(fdesde, 1);
      const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');
      this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
    }
  }

  onMethodOfPaymentSelection(event: any) {
    const selectedValue = event.option.value;
   // const selectedMethodOfPayment = this.methodOfPaymentList.find(payment => payment.value === selectedValue);
    // if (selectedMethodOfPayment) {
    //   this.receiptFormGroup.get('cmetodologiapago')?.setValue(selectedMethodOfPayment.id);
    //   this.xmetodologia = selectedMethodOfPayment.value;
    //this.validateMethod();
    //this.operationAmount();

    // }
  }

  validateMethod() {
    const fdesdeValue = this.receiptFormGroup.get('fdesde')?.value;
    const fhastaValue = this.receiptFormGroup.get('fhasta')?.value;
    
    // Verificar si fdesde y fhasta son fechas válidas
    if (!fdesdeValue || !fhastaValue) {
      this.snackBar.open('Las fechas son inválidas.', '', {
        duration: 3000,
      });
      return;
    }
    
    const fdesde = new Date(fdesdeValue as string);
    const fhasta = new Date(fhastaValue as string);
  
    if (this.vehicleFormGroup.get('xcobertura')?.value === 'Rcv') {
      if(this.currentUser.data.crol == 5){
        // if (this.xmetodologia !== 'ANUAL') {
        //   this.snackBar.open(`Lo sentimos, solo se puede colocar ${this.xmetodologia} cuando no sea RCV.`, '', {
        //     duration: 3000,
        //   });
        //   this.receiptFormGroup.get('cmetodologiapago')?.setValue('');
        //   this.methodOfPaymentControl.setValue('');
        //   this.buttonEmissions = false;
        // } else {

        // }
                  //this.buttonEmissions = true;
      } else {
        // if (this.xmetodologia !== 'ANUAL') {
        //   this.snackBar.open(`Lo sentimos, solo se puede colocar ${this.xmetodologia} cuando no sea RCV.`, '', {
        //     duration: 3000,
        //   });
        //   this.receiptFormGroup.get('cmetodologiapago')?.setValue('');
        //   this.methodOfPaymentControl.setValue('');
        //   this.buttonEmissions = false;
        // } else {

        // }
                 // this.buttonEmissions = true;

        // this.buttonEmissions = false;
        // this.snackBar.open(`Lo sentimos, debe formalizar una modalidad de pago para emitir la póliza`, '', {
        //   duration: 3000,
        // });
      }
    }else{
      //this.buttonEmissions = true;
    }

  }

  calculateAccesories(i: any) {
    const creds = this.planFormGroup.controls.accesorios as FormArray;

    if(creds.at(i).get('sumaAsegurada')?.value > 1500){
      this.snackBar.open('La Suma Asegurada del Accesorio sobrepasó los 1500$.', '', {
        duration: 3000,
      });
      creds.at(i).get('sumaAsegurada')?.setValue(null)
    }else{
      const xprimaAccesorio = creds.at(i).get('ptasa')?.value * (creds.at(i).get('sumaAsegurada')?.value / 100);
      creds.at(i).get('xprimaAccesorio')?.setValue(xprimaAccesorio);
    
      this.calculationsPremiumsCascoTotal();
    
      let totalXprimaAccesorio = 0;
      for (let j = 0; j < creds.length; j++) {
        totalXprimaAccesorio += creds.at(j).get('xprimaAccesorio')?.value || 0;
      }
    
      this.receiptFormGroup.get('mprima_accesorio')?.setValue(totalXprimaAccesorio.toString())
    }
  }

  calculationsPremiumsCascoTotal() {
    const primaCascoControl = this.planFormGroup.get('mprima_casco_text');
    const primaBlindajeControl = this.planFormGroup.get('mprima_blindaje');
    const primaAditamentoControl = this.planFormGroup.get('mprima_aditamento');

    // if(this.ccotizacion){

    //   let motin = parseFloat(this.primaMotin) 
    //   let riesgo = parseFloat(this.primaRiesgo) 
    //   let robo = parseFloat(this.primaRobo) 

    //   let resta = this.prima - motin - riesgo - robo - this.montoTotal

    //   this.planFormGroup.get('mprima_casco')?.setValue(resta.toString())

    //   this.primaFinal = this.prima;
    // }else{
    //   if (primaCascoControl && primaCascoControl.value) {
    //     this.xprimaTotalCasco = Number(primaCascoControl.value);
    
    //     if (primaBlindajeControl && primaBlindajeControl.value) {
    //       this.xprimaTotalCasco += Number(primaBlindajeControl.value);
    //     }
  
    //     if (primaAditamentoControl && primaAditamentoControl.value) {
    //       this.xprimaTotalCasco += Number(primaAditamentoControl.value);
    //     }
    
    //       for(let i = 0; i < this.accesorios.value.length; i++){
    //         if (
    //           this.accesorios.value[i].xprimaAccesorio !== 0 &&
    //           this.accesorios.value[i].xprimaAccesorio !== ""
    //         ) {
    //           this.xprimaTotalCasco += Number(this.accesorios.value[i].xprimaAccesorio);
    //         }
  
    //       }
            
    //         if(this.primaMotin !== 0 || this.primaMotin !== ""){
    //           this.xprimaTotalCasco += Number(this.primaMotin)
    //         }
  
    //           if(this.primaRiesgo !== 0 || this.primaRiesgo !== ""){
    //             this.xprimaTotalCasco += Number(this.primaRiesgo)
    //           }
  
    //             if(this.primaRobo !== 0 || this.primaRobo !== ""){
    //               this.xprimaTotalCasco += Number(this.primaRobo)
    //             }
  
    //     this.xprimaTotalCasco = Number(this.xprimaTotalCasco.toFixed(2));
  
    //     this.primaFinal = this.xprimaTotalCasco + this.montoTotal;
    //     // Corregir redondeo aquí también
    //     this.primaFinal = Number(this.primaFinal.toFixed(2));
    //   } else {
    //     this.xprimaTotalCasco = 0;
    //   }
    // }
  

  }
}
