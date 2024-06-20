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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { ChangeDetectorRef } from '@angular/core';
import { format, addYears } from 'date-fns';
// import { initUbii } from '@ubiipagos/boton-ubii-dc';
import { initUbii } from '@ubiipagos/boton-ubii';
import * as Papa from 'papaparse';


export interface State {
  id : '' , nombre : ''
}

export interface City {
  id : '' , nombre : ''
}

export interface Marca {
  id : '' , nombre : ''
}

export interface Modelo {
  id : '' , nombre : ''
}

export interface Version {
  id : '' , 
  nombre : '',
  npasajero : '' , 
  cclasificacion : '', 
  id_inma: '', 
  msum: '', 
  xtipovehiculo: '', 
  ctarifa_exceso: '', 
  xuso: '', 
  npesovacio: '', 
  ncapcarga: '', 
}
export interface State_Take {
  id : '' , nombre : ''
}
export interface City_Take {
  id : '' , nombre : ''
}
export interface Plan {
  id : '' , nombre : ''
}

export interface broker {
  id : '' , nombre : ''
}

export interface takers {
  id : '' , nombre : ''
}

export interface color {
  id : '' , nombre : ''
}

export interface rates {
  id : '' , nombre : ''
}

export interface typeVehicle {
  id : '' , nombre : ''
}

export interface filteredUtilityVehicle {
  id : '' , nombre : ''
}

export interface filteredUtility {
  id : '' , nombre : ''
}
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
    cestado : new FormControl<any | State>('', { nonNullable: true}) ,
    cciudad: new FormControl<any | City>('', { nonNullable: true}),
    iestado_civil: ['', Validators.required],
    isexo: ['', Validators.required],
    xdireccion: [''],
  });

  planFormGroup = this._formBuilder.group({
    cplan:  new FormControl<any | Plan>('', { nonNullable: true}),
    msuma_aseg: 0,
    pdescuento: 0,
    precarga: 0,
    mcatastrofico: 0,
    mmotin: 0,
    msuma_blindaje: 0,
    accesorios :  this._formBuilder.array([]),
    msuma_aseg_acce: [{ value: 0, disabled: false }],
    paditamento: [{ value: 0, disabled: false }],
    msuma_aditamento: 0,
    mprima_aditamento: [{ value: 0, disabled: false }],
    xcobertura: ['', Validators.required],
    pcasco: [{ value: 0, disabled: true }],
    msuma_aseg_ext: [{ value: '', disabled: true }],
    mprima_bruta: [{ value: 0, disabled: true }],
    mprima_casco_ext: [{ value: 0, disabled: true }],
    mprima_bruta_ext: [{ value: 0, disabled: true }],
    pmotin: [{ value: 0, disabled: true }],
    pcatastrofico: [{ value: 0, disabled: true }],
    mprima_casco: [{ value: 0, disabled: true }],
    pblindaje: [{ value: 0, disabled: true }],
    mprima_blindaje: [{ value: 0, disabled: true }],

  });

  receiptFormGroup = this._formBuilder.group({
    xpago: [''],
    femision: [''],
    fdesde: ['', Validators.required],
    fhasta: ['', Validators.required],
    cmetodologiapago: ['', Validators.required],
    ctipopago: [''],
    fcobro: [''],
    mprima_pagada: [''],
    mprima_accesorio: [''],
    irecibo: [''],
    ccorredor:  new FormControl<any | broker>('', { nonNullable: true}),
    xcorredor: [''],
    ctomador:  new FormControl<any | takers>('', { nonNullable: true}),
    xtomador: [''],
    icedula_tomador: [''],
    xrif_tomador: [''],
    cestado_tomador:  new FormControl<any | State_Take>('', { nonNullable: true}),
    cciudad_tomador:  new FormControl<any | City_Take>('', { nonNullable: true}),
    xemail_tomador: [''],
    xdireccion_tomador: [''],
    xzona_postal_tomador: [''],
    xtelefono_tomador: [''],

  });

  vehicleFormGroup = this._formBuilder.group({
    ccotizacion: [{ value: '', disabled: false }],
    cinspeccion: [{ value: '', disabled: false }],
    xplaca: ['',[Validators.required, Validators.maxLength(7)]],
    xmarca: new FormControl<any | Marca>('', { nonNullable: true}) ,
    xmodelo:  new FormControl<any | Modelo>('', { nonNullable: true}),
    xversion: new FormControl<any | Version>('', { nonNullable: true}),
    fano: ['',[Validators.required, Validators.maxLength(4)]],
    npasajeros: [{ value: '', disabled: true }],
    xtipovehiculo: [''],
    xcolor: new FormControl<any | color>('', { nonNullable: true}),
    xserialcarroceria: ['', [Validators.required, Validators.maxLength(17)]],
    xserialmotor: ['', [Validators.maxLength(17)]],
    ctarifa_exceso: new FormControl<any | rates>('', { nonNullable: true}), //['', Validators.required],
    cuso: [''],
    cusoVeh: [''],
    xuso: new FormControl<any | filteredUtility>('', { nonNullable: true}),
    precargo: new FormControl<any | filteredUtilityVehicle>('', { nonNullable: true}),
    ctipovehiculo: new FormControl<any | typeVehicle>('', { nonNullable: true}),
    cclase: [''],
    id_inma: [''],
    npesovacio: [''],
    ncapcarga: [''],
  });

  //listas
  identList = ['V', 'P', 'E', 'J', 'C','G'];
  stateList:            any[] = [];
  cityList:             any[] = [];
  stateTakerList:       any[] = [];
  cityTakerList:        any[] = [];
  brandList:            any[] = [];
  modelList:            any[] = [];
  versionList:          any[] = [];
  colorList:            any[] = [];
  ratesList:            any[] = [];
  typeVehicleList:      any[] = [];
  utilityVehicleList:   any[] = [];
  utilityList:          any[] = [];
  classList:            any[] = [];
  planList:             any[] = [];
  brokerList:           any[] = [];
  takersList:           any [] = []
  methodOfPaymentList:  any [] = []

  //Observable's 
  filteredState! : Observable<State[]>;
  filteredCity!: Observable<any[]>;
  filteredStateTaker!: Observable<any[]>;
  filteredCityTaker!: Observable<any[]>;
  filteredVersion!: Observable<any[]>;
  filteredColor!: Observable<any[]>;
  filteredRates!: Observable<any[]>;
  filteredTypeVehicle!: Observable<any[]>;
  filteredUtilityVehicle!: Observable<any[]>;
  filteredUtility!: Observable<any[]>;
  filteredClass!: Observable<any[]>;
  filteredPlan!: Observable<any[]>;
  filteredBroker!: Observable<any[]>;
  filteredTakers!: Observable<any[]>;
  filteredBrand!: Observable<any[]>;
  filteredModel!: Observable<any[]>;

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
  newClient : boolean = false;


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
  pmotin!: any ;
  primaCascoInicial!: any ;
  sumaAseguradaMax!: any ;
  sumaAseguradaMin!: any ;

  constructor
  (
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private dateAdapter: DateAdapter<Date>,
    private pdfGenerationService: PdfGenerationService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
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
    this.getPlan();
    this.getBroker();
    this.getAccesories();
    this.getTakers();
    this.setDefaultDates();
    this.getUtility();
    this.getMethodOfPayment()
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

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })


  }

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
    this.newClient = false
    let cliente = this.personsFormGroup.get('icedula')?.value +'-'+ this.personsFormGroup.get('xrif_cliente')?.value
    let data = {
      xrif_cliente: cliente
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/propietary', data).subscribe((response: any) => {
      if (response.status) {
        this.newClient = true
        this.personsFormGroup.get('xnombre')?.setValue(response.info.xnombre)
        this.personsFormGroup.get('xapellido')?.setValue(response.info.xapellido)
        this.personsFormGroup.get('isexo')?.setValue(response.info?.isexo)
        this.personsFormGroup.get('email')?.setValue(response.info?.xcorreo)
        this.personsFormGroup.get('fnacimiento')?.setValue(response.info?.fnacimiento)
        this.personsFormGroup.get('cestado')?.setValue({id:response.info?.cestado, nombre:response.info?.xestado})
        this.personsFormGroup.get('cciudad')?.setValue({id:response.info?.cciudad, nombre:response.info?.xciudad})
        this.personsFormGroup.get('iestado_civil')?.setValue(response.info?.iestado_civil)
        this.personsFormGroup.get('xtelefono_emp')?.setValue(response.info?.xtelefono)
        this.personsFormGroup.get('xdireccion')?.setValue(response.info?.xavecalle)
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
            nombre: response.data.state[i].xdescripcion_l
          });

          this.stateTakerList.push({
            id: response.data.state[i].cestado,
            nombre: response.data.state[i].xdescripcion_l
          });
        }


        this.filteredState = this.personsFormGroup.get('cestado')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterState(name as string) : this.stateList.slice();
          }),
        );

        this.filteredStateTaker = this.receiptFormGroup.get('cestado_tomador')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterStateTaker(name as string) : this.stateTakerList.slice();
          }),
        );
      }
    });
  }

  getCityTaker(){
    let data = {
      cpais: 58,
      cestado: this.receiptFormGroup.get('cestado_tomador')?.value.id
    };
    this.cityTakerList = []
    this.http.post(environment.apiUrl + '/api/v1/valrep/city', data).subscribe((response: any) => {
      if (response.data.city) {
        for (let i = 0; i < response.data.city.length; i++) {
          this.cityTakerList.push({
            id: response.data.city[i].cciudad,
            nombre: response.data.city[i].xdescripcion_l
          });
        }
        this.filteredCityTaker = this.receiptFormGroup.get('cciudad_tomador')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterCityTaker(name as string) : this.cityTakerList.slice();
          }),
        );
      }
    });
  }

  getCity(){
    let data = {
      cpais: 58,
      cestado: this.personsFormGroup.get('cestado')?.value.id
    };

    this.cityList = []

    this.http.post(environment.apiUrl + '/api/v1/valrep/city', data).subscribe((response: any) => {
      if (response.data.city) {
        for (let i = 0; i < response.data.city.length; i++) {
          this.cityList.push({
            id: response.data.city[i].cciudad,
            nombre: response.data.city[i].xdescripcion_l
          });
        }
        this.filteredCity = this.personsFormGroup.get('cciudad')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterCity(name as string) : this.cityList.slice();
          }),
        );
      }
    });
  }

  getRates(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/rates', null).subscribe((response: any) => {
      if (response.data.rates) {
        for (let i = 0; i < response.data.rates.length; i++) {
          this.ratesList.push({
            id: response.data.rates[i].ctarifa_exceso,
            nombre: response.data.rates[i].xgrupo,
          });
        }
        
        this.filteredRates = this.vehicleFormGroup.get('ctarifa_exceso')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterRates(name as string) : this.ratesList.slice();
          }),
        );
      }
    });
  }

  getTypeVehicles(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/type-vehicle', null).subscribe((response: any) => {
      if (response.data.type) {
        for (let i = 0; i < response.data.type.length; i++) {
          this.typeVehicleList.push({
            id: response.data.type[i].ctipovehiculo,
            nombre: response.data.type[i].xtipovehiculo,
          });
        }
        this.filteredTypeVehicle = this.vehicleFormGroup.get('ctipovehiculo')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterTypeVehicle(name as string) : this.typeVehicleList.slice();
          }),
        );
      }
    });
  }

  getUtilityVehicle(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/utility-rechange', null).subscribe((response: any) => {
      if (response.data.utilityR) {
        for (let i = 0; i < response.data.utilityR.length; i++) {
          this.utilityVehicleList.push({
            id: response.data.utilityR[i].cuso,
            nombre: response.data.utilityR[i].xuso,
            precargo: response.data.utilityR[i].precargo,
          });
        }
        this.filteredUtilityVehicle = this.vehicleFormGroup.get('precargo')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterUtilityVehicle(name as string) : this.typeVehicleList.slice();
          }),
        );
      }
    });
  }

  getUtility(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/utility', null).subscribe((response: any) => {
      if (response.data.utility) {
        for (let i = 0; i < response.data.utility.length; i++) {
          this.utilityList.push({
            nombre: response.data.utility[i].xuso,
          });
        }
        this.filteredUtility = this.vehicleFormGroup.get('xuso')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterUtility(name as string) : this.utilityList.slice();
          }),
        );
      }
    });
  }

  searchRates(){
    let data = {
      cano: this.vehicleFormGroup.get('fano')?.value,
      xclase: this.vehicleFormGroup.get('xversion')?.value.cclasificacion,
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
              this.casco = true;
              this.userBroker = true;
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

  getPlan(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/plan', null).subscribe((response: any) => {
      if (response.data.plan) {
        for (let i = 0; i < response.data.plan.length; i++) {
          this.planList.push({
            id: response.data.plan[i].cplan,
            nombre: response.data.plan[i].xplan,
          });
        }


        if (this.currentUser.data.crol === 5 || this.currentUser.data.crol === 7) {
          
        }else{
          this.planList = this.planList.slice(0, 6);
        }

        
        if(this.ccotizacion){
            this.getAmountQuotes();
        }

        this.filteredPlan = this.planFormGroup.get('cplan')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterPlan(name as string) : this.planList.slice();
          }),
        );
      }
    });
  }

  getBroker(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].cproductor,
            nombre: response.data.broker[i].xproductor.trim(),
          });
        }
        this.filteredBroker = this.receiptFormGroup.get('ccorredor')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterBroker(name as string) : this.brokerList.slice();
          }),
        );
      }

    });
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
            nombre: response.data.takers[i].xtomador,
          });
        }
        this.filteredTakers = this.receiptFormGroup.get('ctomador')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterTakers(name as string) : this.takersList.slice();
          }),
        );
      }
    });
  }

  validateTaker(){
    this.takersInfo = false;
  }

  validateTaker2(){
    this.takersInfo = true;
  }

  async validateYearsFromHullPrice() {
    if(this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo){
      await this.getHullPrice()
    }
    this.planFormGroup.get('xcobertura')?.setValue('')
  }

  async getHullPrice(){
    let data =  {
      cano: this.vehicleFormGroup.get('fano')?.value,
      xclase: this.vehicleFormGroup.get('cclasificacion')?.value,
    };
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/hull-price', data).subscribe((response: any) => {
      if(response.status){
          if(this.planFormGroup.get('xcobertura')?.value == 'Cobertura Amplia'){
            this.tasaCascoInicial = response.data.ptasa_casco
            this.planFormGroup.get('pcasco')?.setValue(response.data.ptasa_casco);
            this.planFormGroup.get('pblindaje')?.setValue(response.data.ptasa_casco);
            if(this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo == 'CARGA' || this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo == 'Carga'){
              this.planFormGroup.get('paditamento')?.setValue(response.data.ptasa_casco);
              this.calculationPremiumsAttachment()

            }else{
              this.planFormGroup.get('paditamento')?.setValue(null);
            }
          }else{
            this.tasaCascoInicial = response.data.pperdida_total;
            this.planFormGroup.get('pcasco')?.setValue(response.data.pperdida_total);
            this.planFormGroup.get('pblindaje')?.setValue(response.data.pperdida_total);
            if(this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo == 'CARGA' || this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo == 'Carga'){
              this.planFormGroup.get('paditamento')?.setValue(response.data.pperdida_total);
              this.calculationPremiumsAttachment()
            }else{
              this.planFormGroup.get('paditamento')?.setValue(null);
            }
          }
          if(this.currentUser.data.crol == 5 || this.currentUser.data.crol == 7){
            this.planFormGroup.get('msuma_aseg')?.enable();
          }else{
            this.planFormGroup.get('msuma_aseg')?.disable();
          }
      }
    })

    this.planFormGroup.get('msuma_aseg')?.setValue(this.sumaAsegurada);
    this.planFormGroup.get('msuma_aseg_ext')?.setValue(this.sumaAsegurada);

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
    //   //     if(this.planFormGroup.get('xcobertura')?.value !== 'Rcv'){
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
    //       if(this.planFormGroup.get('xcobertura')?.value !== 'Rcv'){
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
            nombre: response.data.brand[i].xmarca,
          });
        }
        this.brandList.sort((a, b) => a.value > b.value ? 1 : -1);

        this.filteredBrand = this.vehicleFormGroup.get('xmarca')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterBrand(name as string) : this.brandList.slice();
          }),
        );
      }
    });
  }

  getModel(){
    let data = {
      qano: this.vehicleFormGroup.get('fano')?.value,
      xmarca: this.vehicleFormGroup.get('xmarca')?.value.nombre,
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/model', data).subscribe((response: any) => {
      if (response.data.model) {
        this.modelList = [];
        for (let i = 0; i < response.data.model.length; i++) {
          this.modelList.push({
            id: i,
            nombre: response.data.model[i].xmodelo,
          });
        }
        this.modelList.sort((a, b) => a.value > b.value ? 1 : -1);

        this.filteredModel = this.vehicleFormGroup.get('xmodelo')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterModel(name as string) : this.modelList.slice();
          }),
        );
      }
    });
  }

  getVersion(){
    let data = {
      qano: this.vehicleFormGroup.get('fano')?.value,
      xmarca: this.vehicleFormGroup.get('xmarca')?.value.nombre,
      xmodelo: this.vehicleFormGroup.get('xmodelo')?.value.nombre,
    };
    this.http.post(environment.apiUrl + '/api/v1/valrep/version', data).subscribe((response: any) => {
      if (response.data.version) {
        this.versionList = [];
        for (let i = 0; i < response.data.version.length; i++) {
          this.versionList.push({
            id: i,
            nombre: response.data.version[i].xversion,
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

        this.filteredVersion = this.vehicleFormGroup.get('xversion')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterVersion(name as string) : this.versionList.slice();
          }),
        );
      }
    });
  }

  onVersionSelection() {

      this.vehicleFormGroup.get('npasajeros')?.setValue(this.vehicleFormGroup.get('xversion')?.value.npasajero);
      this.searchRates();
      this.vehicleFormGroup.get('id_inma')?.setValue(this.vehicleFormGroup.get('xversion')?.value.id_inma);
      this.vehicleFormGroup.get('npesovacio')?.setValue(this.vehicleFormGroup.get('xversion')?.value.npesovacio);
      this.vehicleFormGroup.get('ncapcarga')?.setValue(this.vehicleFormGroup.get('xversion')?.value.ncapcarga);
      this.sumaAsegurada = this.vehicleFormGroup.get('xversion')?.value.msum;
      this.sumaAseguradaBase = this.vehicleFormGroup.get('xversion')?.value.msum;


      if(this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo == 'CARGA' || this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo == 'Carga'){
        this.activateAttachment = true;
      }else{
        this.activateAttachment = false;
      }
      if(!this.vehicleFormGroup.get('xversion')?.value.xtipovehiculo){
        this.activateTypeVehicle = true;
      }else{
        this.activateTypeVehicle = false;
      }
      
      if(!this.vehicleFormGroup.get('xversion')?.value.ctarifa_exceso){
        this.activateRate = true;
      }else{
        this.activateRate = false;
      }

      if(!this.vehicleFormGroup.get('xversion')?.value.xuso){
        this.activateUtility = true;
      }else{
        this.activateUtility = false;
      }

      const tarifaExcesoValue = this.vehicleFormGroup.get('xversion')?.value.ctarifa_exceso;
      if (tarifaExcesoValue !== null && tarifaExcesoValue !== undefined) {
          if (typeof tarifaExcesoValue === 'number' && tarifaExcesoValue === 20) {
              if(this.currentUser.data.crol == 7){

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
            nombre: response.data.color[i].xcolor,
          });
        }
        this.filteredColor = this.vehicleFormGroup.get('xcolor')!.valueChanges.pipe(
          startWith(''),
          map(value => {
            const name = typeof value === 'string' ? value : value?.nombre;
            return name ? this._filterColor(name as string) : this.colorList.slice();
          }),
        );
      }
    });
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
      this.snackBar.open(`No posee Número de Inspección, por lo tanto no puede proceder con ${this.planFormGroup.get('xcobertura')?.value}`, '', {
        duration: 4000,
      });
    }
  }

  async onCoverageChange() {
    await this.getHullPrice()
    this.calculationPremiums()
    this.calculationPremiumsShielding()
    this.calculationsPremiumsCascoTotal()

    if(this.planFormGroup.get('xcobertura')?.value == 'Rcv'){
      this.planFormGroup.get('mmotin')?.setValue(0);
      this.planFormGroup.get('mcatastrofico')?.setValue(0);
    }
    else if(this.planFormGroup.get('xcobertura')?.value !== 'Rcv'){
      this.activateInspection = true;
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

  calculateDate(newValue: any) {
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

  getMethodOfPayment(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/method-of-payment', null).subscribe((response: any) => {
      if (response.data.payment) {
        for (let i = 0; i < response.data.payment.length; i++) {
          this.methodOfPaymentList.push({
            id: response.data.payment[i].cmetodologiapago,
            nombre: response.data.payment[i].xmetodologiapago,
          });
        }
      }
    });
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
  
    if (this.planFormGroup.get('xcobertura')?.value === 'Rcv') {
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

  //Calculos

  calculationPremiums(){
    const msumaAseg = this.planFormGroup.get('msuma_aseg')?.value;
    const pcasco = this.planFormGroup.get('pcasco')?.value;
    const pcatastrofico = 0.10;
    const msumaAsegRobo  = 600;
    const probo : number = 4.48;
    let pmotin : number = 0
    
    let calculo: number = 0;
    let catastrofico: number = 0;
    let motin: number = 0;
    let robo: number = 0;

    let data = {
      xcobertura: this.planFormGroup.get('xcobertura')?.value
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/riot-rate', data).subscribe((response: any) => {
      if(response.status){
        this.pmotin = response.data.pmotin;
        if (typeof msumaAseg === 'number' && typeof pmotin === 'number') {
          motin = (msumaAseg * this.pmotin) / 100;
        
          this.planFormGroup.get('mmotin')?.setValue(motin);
          this.primaMotin = motin.toFixed(2);
          
        }
      }
    });

    if (typeof msumaAseg === 'number' && typeof pcasco === 'number') {
      calculo = (msumaAseg * pcasco) / 100;
  
      // // Redondear la prima a dos decimales
      // let primaRedondeada : number = calculo.toFixed(2);
      this.primaCascoInicial = calculo;

      this.planFormGroup.get('mprima_casco')?.setValue(calculo);
      this.planFormGroup.get('mprima_bruta')?.setValue(calculo);
      this.planFormGroup.get('mprima_casco_ext')?.setValue(calculo);
      this.planFormGroup.get('mprima_bruta_ext')?.setValue(calculo);
      this.primaBruta = this.planFormGroup.get('mprima_bruta_ext')?.value;
    }

    if (typeof msumaAseg === 'number' && typeof pcatastrofico === 'number') {
      catastrofico = (msumaAseg * pcatastrofico) / 100;
    
      this.planFormGroup.get('mcatastrofico')?.setValue(catastrofico);
      this.primaRiesgo = catastrofico.toFixed(2);
    }

    if (typeof msumaAsegRobo === 'number' && typeof probo === 'number') {
      robo = (msumaAsegRobo * probo) / 100;
    
      this.primaRobo = robo.toFixed(2);
    }
    
    this.sumaAsegurada = msumaAseg;


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

  async calculationsPremiumsCascoTotal() {
    const primaCascoControl = this.planFormGroup.get('mprima_casco_ext');
    const primaBlindajeControl = this.planFormGroup.get('mprima_blindaje');
    const primaAditamentoControl = this.planFormGroup.get('mprima_aditamento');


      if (primaCascoControl && primaCascoControl.value) {
        this.xprimaTotalCasco = Number(primaCascoControl.value);
    
        if (primaBlindajeControl && primaBlindajeControl.value) {
          this.xprimaTotalCasco += Number(primaBlindajeControl.value);
        }
  
        if (primaAditamentoControl && primaAditamentoControl.value) {
          this.xprimaTotalCasco += Number(primaAditamentoControl.value);
        }
    
        for(let i = 0; i < this.accesorios.value.length; i++){
          if (
            this.accesorios.value[i].xprimaAccesorio !== 0 &&
            this.accesorios.value[i].xprimaAccesorio !== ""
          ) {
            this.xprimaTotalCasco += Number(this.accesorios.value[i].xprimaAccesorio);
          }

        }
          
        if(this.primaMotin !== 0 || this.primaMotin !== ""){
          this.xprimaTotalCasco += Number(this.primaMotin)
        }

        if(this.primaRiesgo !== 0 || this.primaRiesgo !== ""){
          this.xprimaTotalCasco += Number(this.primaRiesgo)
        }

        if(this.primaRobo !== 0 || this.primaRobo !== ""){
          this.xprimaTotalCasco += Number(this.primaRobo)
        }
  
        this.xprimaTotalCasco = Number(this.xprimaTotalCasco.toFixed(2));
  
        this.primaFinal = this.xprimaTotalCasco + this.montoTotal;
        // Corregir redondeo aquí también
        this.primaFinal = Number(this.primaFinal.toFixed(2));
      } 
      else{
        this.xprimaTotalCasco = 0;
      }

  }

 async calculationPremiumsShielding(){
    const msumaAseg = this.planFormGroup.get('msuma_blindaje')?.value;
    const pblindaje = this.planFormGroup.get('pblindaje')?.value;

    let calculo: number = 0;
    
    if (typeof msumaAseg === 'number' && typeof pblindaje === 'number') {
      let msumaAsegBlin = msumaAseg;
        if(msumaAseg !== null){
          
          let max = this.sumaAseguradaBase * 0.60
          let min = this.sumaAseguradaBase * 0.10
  
          let MaxSum = this.sumaAseguradaBase + max;
          let MinSum = this.sumaAseguradaBase - min;
  
          this.sumaAseguradaMax = MaxSum.toFixed(2)
          this.sumaAseguradaMin = MinSum.toFixed(2)
  
          if(msumaAsegBlin > this.sumaAseguradaMax){
            this.snackBar.open('La Suma Asegurada excedió el 60%.', '', {
              duration: 5000,
            });
  
            this.planFormGroup.get('msuma_blindaje')?.setValue(this.sumaAseguradaBase);
            
          }
  
          if(msumaAsegBlin < this.sumaAseguradaMin){
            this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
              duration: 5000,
            });
  
            this.planFormGroup.get('msuma_blindaje')?.setValue(this.sumaAseguradaBase);

          }

          calculo = msumaAsegBlin * pblindaje / 100;
          let valorTotal = calculo
          this.planFormGroup.get('mprima_blindaje')?.setValue(valorTotal);
        }
    }
}
  
  async calculationPremiumsAttachment(){
    const msumaAsegAdi = this.planFormGroup.get('msuma_aditamento')?.value;
    const paditamento = this.planFormGroup.get('paditamento')?.value;

    let calculo: number = 0;
    
    if (typeof msumaAsegAdi === 'number' && typeof paditamento === 'number') {
      let msumaAsegBlin = msumaAsegAdi
        if(msumaAsegBlin !== null){
          
          let max = this.sumaAseguradaBase * 0.60
          let min = this.sumaAseguradaBase * 0.10
  
          let MaxSum = this.sumaAseguradaBase + max;
          let MinSum = this.sumaAseguradaBase - min;
  
          this.sumaAseguradaMax = MaxSum.toFixed(2)
          this.sumaAseguradaMin = MinSum.toFixed(2)
  
          if(msumaAsegBlin > this.sumaAseguradaMax){
            this.snackBar.open('La Suma Asegurada excedió el 60%.', '', {
              duration: 5000,
            });
  
            this.planFormGroup.get('msuma_aditamento')?.setValue(this.sumaAseguradaBase);

          }
  
          if(msumaAsegBlin < this.sumaAseguradaMin){
            this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
              duration: 5000,
            });
  
            this.planFormGroup.get('msuma_aditamento')?.setValue(this.sumaAseguradaBase);

          }

          calculo = msumaAsegBlin * paditamento / 100;
          let valorTotal = calculo
          this.planFormGroup.get('mprima_aditamento')?.setValue(valorTotal);
        }
    }
  }

  getDiscount(){
    const descuento = this.planFormGroup.get('pdescuento')?.value;
    const pcascoValue = this.planFormGroup.get('pcasco')?.value;
    const casco = this.planFormGroup.get('mprima_casco')?.value;
    const sumaAseg = this.planFormGroup.get('msuma_aseg')?.value || 0
    
    let division: number = 0;
    let multiplicacion: number = 0;
    let calculo_descuento: number = 0;

    if(descuento){
      if (typeof descuento === 'number' && typeof pcascoValue === 'number' && typeof casco === 'string') {
        const calculatedAmount = (descuento / 100) * pcascoValue;
        const restRecharge = pcascoValue - calculatedAmount;

        const cascoNumero = parseFloat(casco);
      
        // division = restRecharge / 100;
        // multiplicacion = cascoNumero * division;
        calculo_descuento = restRecharge * sumaAseg / 100;

        let valorTotal = calculo_descuento
  
        this.planFormGroup.get('mprima_casco')?.setValue(calculo_descuento);
        this.planFormGroup.get('mprima_casco_ext')?.setValue(valorTotal);
        this.calculationsPremiumsCascoTotal();

        const discount = restRecharge

        this.planFormGroup.get('pcasco')?.setValue(discount)
      }
    }else{

      this.planFormGroup.get('pcasco')?.setValue(this.tasaCascoInicial);
      this.planFormGroup.get('mprima_casco_ext')?.setValue(this.primaCascoInicial)
      this.planFormGroup.get('mprima_casco')?.setValue(this.primaBruta);
    }

    this.descuento = this.planFormGroup.get('pdescuento')?.value;
  }

  getRecharge() {
    const precargaValue = this.planFormGroup.get('precarga')?.value;
    const pcascoValue = this.planFormGroup.get('pcasco')?.value;
    const casco = this.planFormGroup.get('mprima_casco')?.value;
    const sumaAseg = this.planFormGroup.get('msuma_aseg')?.value || 0

    let division: number = 0;
    let multiplicacion: number = 0;
    let calculo_recarga: number = 0;
  
    if(precargaValue){
      if (typeof precargaValue === 'number' && typeof pcascoValue === 'number' && typeof casco === 'string') {
      
        const calculatedAmount = (precargaValue / 100) * pcascoValue;
        const sumRecharge = pcascoValue + calculatedAmount;
  
        const cascoNumero = parseFloat(casco);

        // console.log(sumRecharge)
        // console.log(this.planFormGroup.get('msuma_aseg')?.value)
        
        // division = sumRecharge / 100;
        // multiplicacion = cascoNumero * division;
        calculo_recarga = sumRecharge * sumaAseg / 100;
  
        let valorTotal = calculo_recarga
  
        this.planFormGroup.get('mprima_casco')?.setValue(calculo_recarga);
        this.planFormGroup.get('mprima_casco_ext')?.setValue(valorTotal);
        this.calculationsPremiumsCascoTotal();
  
        const recharge = sumRecharge
  
        this.planFormGroup.get('pcasco')?.setValue(recharge)
      }
    }else{
      this.planFormGroup.get('pcasco')?.setValue(this.tasaCascoInicial);
      this.planFormGroup.get('mprima_casco_ext')?.setValue(this.primaCascoInicial)
    }

  }


  //Guardado

  onSubmit(){
    let data = {}
    const accesorios = this.planFormGroup.controls.accesorios as FormArray;

    if(this.planFormGroup.get('xcobertura')?.value == 'Rcv'){
      data = {
        persona: this.personsFormGroup.value,
        vehivulo: this.vehicleFormGroup.value,
        plan: this.planFormGroup.value,
        recibo: this.receiptFormGroup.value,
        cpais: 58,
        cusuario: this.currentUser.data.cusuario,
      }
    }else{
      data = {
        persona: this.personsFormGroup.value,
        vehivulo: this.vehicleFormGroup.value,
        plan: this.planFormGroup.value,
        recibo: this.receiptFormGroup.value,
        accesorios: accesorios.value,
        cpais: 58,
        cusuario: this.currentUser.data.cusuario,
      }
    }

    const nombre = this.personsFormGroup.get('xnombre')?.value + ' ' + this.personsFormGroup.get('xapellido')?.value;
    const placa = this.vehicleFormGroup.get('xplaca')?.value;

    this.http.post(environment.apiUrl + '/api/v1/emissions/quote-automovile', data).subscribe((response: any) => {
      if (response.status) {
        // this.loadingEmissions = false;
        // this.loadingPdf = true;
        // this.ccontratoflota = response.data.ccontratoflota;
        // const observable = from(this.pdfGenerationService.LoadDataCertifiqued(this.ccontratoflota));

        // observable.subscribe(
        //   (data) => {
        //     this.check = true;
        //     this.loadingPdf = false
        //   },
        //   (error) => {
        //   }
        // );

        // this.snackBar.open(`Se ha generado exitósamente el contrato n° ${this.ccontratoflota} del cliente ${nombre?.toUpperCase()} para el vehículo de placa ${placa?.toUpperCase()}`, '', {
        //   duration: 3000,
        // });
      }
    });

  }

  //Display input's

  displayStateFn(State: any): string {
    return State.nombre;
  }

  displayCityFn(City: any): string {
    return City.nombre;
  }  

  displayBrandFn(Brand: any): string {
    return Brand.nombre;
  } 

  displayModelFn(Model: any): string {
    return Model.nombre;
  }

  displayVersionFn(Version: any): string {
    return Version.nombre;
  }

  displayColorFn(Color: any): string {
    return Color.nombre;
  }

  displayRatesFn(Rates: any): string {
    return Rates.nombre;
  }

  displayTypeVehicleFn(TypeVehicle: any): string {
    return TypeVehicle.nombre;
  } 
  
  displayUtilityVehicle(UtilityVehicle: any): string {
    return UtilityVehicle.nombre;
  }
  
  displayUtilityFn(Utility: any): string {
    return Utility.nombre;
  }

  displayPlanFn(Plan: any): string {
    return Plan.nombre;
  }

  displayBrokerFn(Broker: any): string {
    return Broker.nombre;
  } 

  displayTakersFn(Takers: any): string {
    return Takers.nombre;
  }

  displayStateTakerFn(StateTaker: any): string {
    return StateTaker.nombre;
  }  

  displayCityTakerFn(CityTaker: any): string {
    return CityTaker.nombre;
  }


  //Funciones private
  private _filterVersion(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.versionList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterColor(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.colorList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterModel(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.modelList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterBrand(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.brandList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterTakers(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.takersList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterBroker(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.brokerList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterPlan(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.planList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterStateTaker(value: string): any[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.stateTakerList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.stateList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterUtilityVehicle(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.utilityVehicleList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterUtility(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.utilityList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterCity(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.cityList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterCityTaker(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.cityTakerList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterTypeVehicle(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.typeVehicleList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }

  private _filterRates(value: string): string[] {
    const filterValue = value.toLowerCase();
    const filteredStates = this.ratesList.filter(state => state.nombre.toLowerCase().includes(filterValue));
    return filteredStates;
  }
}
