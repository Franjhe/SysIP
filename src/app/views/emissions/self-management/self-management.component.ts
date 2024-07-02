import {Component, ViewChild, TemplateRef } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl , FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PdfGenerationService } from '../../../_services/ServicePDF'
import { MatStepper } from '@angular/material/stepper';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDatepicker } from '@angular/material/datepicker';
import { ChangeDetectorRef } from '@angular/core';
import { format, addYears } from 'date-fns';
import { initUbii } from '@ubiipagos/boton-ubii-dc';
// import { initUbii } from '@ubiipagos/boton-ubii';
import * as Papa from 'papaparse';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-self-management',
  templateUrl: './self-management.component.html',
  styleUrls: ['./self-management.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class SelfManagementComponent {
  @ViewChild('paymentModal') paymentModal: any;
  @ViewChild('stepper') stepper!: MatStepper;
  campoNombres: { [key: string]: string } = { // Mapa de nombres de campo
    icedula: 'Tipo de Documento de Identidad',
    xrif_cliente: 'RIF o Cédula',
    xnombre: 'Nombre',
    xapellido: 'Apellido',
    fnacimiento: 'Fecha de Nacimiento',
    xtelefono_emp: 'Teléfono',
    email: 'Correo',
    cestado: 'Estado',
    cciudad: 'Ciudad',
    iestado_civil: 'Estado Civil',
    isexo: 'Sexo',
    xdireccion: 'Direcciónn',
  };

  campoNombresV: { [key: string]: string } = {
    xplaca: 'Placa',
    xmarca: 'Marca',
    xmodelo: 'Modelo',
    xversion: 'Version',
    fano: 'Año',
    xcolor: 'Color',
    xserialcarroceria: 'Serial de Carroceria'
  };


  dataList: any[] = []; 
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
  accesoriesList: any[] = [];
  methodOfPaymentList: any[] = [];
  takersList: any[] = [];
  accessorySelected: any[] = [];
  typeOfPayList: any[] = [];
  bankList: any[] = [];
  targetBankList: any[] = [];
  groupList: any[] = [];
  parsedData: any[] = [];

  identControl = new FormControl('');
  stateControl = new FormControl('');
  cityControl = new FormControl('');
  stateTakerControl = new FormControl('');
  cityTakerControl = new FormControl('');
  brandControl = new FormControl('');
  modelControl = new FormControl('');
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
  methodOfPaymentControl = new FormControl('');
  takersControl = new FormControl('');

  filteredIdent!: Observable<string[]>;
  filteredState!: Observable<string[]>;
  filteredCity!: Observable<string[]>;
  filteredStateTaker!: Observable<string[]>;
  filteredCityTaker!: Observable<string[]>;
  filteredBrand!: Observable<string[]>;
  filteredModel!: Observable<string[]>;
  filteredVersion!: Observable<string[]>;
  filteredColor!: Observable<string[]>;
  filteredRates!: Observable<string[]>;
  filteredTypeVehicle!: Observable<string[]>;
  filteredUtilityVehicle!: Observable<string[]>;
  filteredUtility!: Observable<string[]>;
  filteredClass!: Observable<string[]>;
  filteredPlan!: Observable<string[]>;
  filteredBroker!: Observable<string[]>;
  filteredMethodOfPayment!: Observable<string[]>;
  filteredTakers!: Observable<string[]>;

  isLinear = true;
  check = false;
  helmet: boolean = false;
  trans: boolean = true;
  discount: boolean = false;
  enableInfo: boolean = false;
  amountTotalRcv: boolean = false;
  amountTotalCasco: boolean = false;
  buttonEmissions: boolean = false;
  loadingEmissions: boolean = false;
  activateInspection: boolean = false;
  activateUtility: boolean = false;
  loadingPdf: boolean = false;
  activateAttachment: boolean = false;
  firstTime: boolean = true;
  detail: boolean = false;
  takersInfo: boolean = false;
  activateTypeVehicle: boolean = false;
  isModalActive: boolean = false; 
  activateRate: boolean = false;
  methodOfPayment: boolean = false;
  bpagarubii: boolean = false;
  amountDollar: boolean = false;
  amountBs: boolean = false;
  userBroker: boolean = false;
  paymentButtons: boolean = true;
  paymentButtonManual: boolean = true;
  activateGroup: boolean = false;
  activateBrandList: boolean = true;
  activateBrandText: boolean = false;
  casco: boolean = false;
  activaSexoYEs: boolean = true;
  activaRepresentante: boolean = false;
  activaNombreYapellido: boolean = true;
  primaBruta!: any;
  descuento!: any;
  sumaAsegurada!: any;
  sumaAseguradaBase!: any;
  sumaAseguradaMax!: any;
  sumaAseguradaMin!: any;
  montoTotal!: any;
  montoDollar!: any;
  montoBs!: any;
  ccontratoflota!: any;
  currentUser!: any
  token!: any
  today!: Date;
  xmetodologia!: any;
  xprimaAccesorio!: any;
  ubii!: any;
  bcv!: any ;
  itipo!: any ;
  tasaCascoInicial!: any ;
  primaCascoInicial!: any ;
  xprimaTotalCasco!: any ;
  pmotin!: any ;  
  primaMotin!: any ;  
  primaRiesgo!: any ; 
  primaRobo!: any ; 
  primaFinal!: any ; 
  ccotizacion!: any ; 
  fano!: any ; 
  cplan!: any ; 
  ctarifa!: any ;
  suma_aseg!: any ;
  prima!: any ;
  messageCoti: boolean = false;
  fechas!: any ;
  recargaInicial!: any ;
  ocultarRecarga: boolean = true;
  activateCard: boolean = false;
  xnombrePlan!: any
  planCoverage: any[] = [];

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

  vehicleFormGroup = this._formBuilder.group({
    ccotizacion: [{ value: '', disabled: false }],
    cinspeccion: [{ value: '', disabled: false }],
    xplaca: ['',[Validators.required, Validators.maxLength(7)]],
    xmarca: ['', [Validators.required, Validators.maxLength(50)]],
    xmodelo: ['', [Validators.required, Validators.maxLength(50)]],
    xversion: ['', [Validators.required, Validators.maxLength(50)]],
    fano: ['',[Validators.required, Validators.maxLength(4)]],
    npasajeros: [{ value: '', disabled: true }],
    cclasificacion: [''], 
    xtipovehiculo: [''],
    xcolor: ['', Validators.required],
    xserialcarroceria: ['', [Validators.required, Validators.maxLength(17)]],
    xserialmotor: ['', [Validators.maxLength(17)]],
    xcobertura: [{ value: 'Rcv', disabled: true}, Validators.required],
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

  planFormGroup = this._formBuilder.group({
    cplan: ['', Validators.required],
    xplan: [{ value: '', disabled: true }],
    ccorredor: [''],
    xcorredor: [''],
    ctomador: [{ value: '', disabled: false }],
    xtomador: [{ value: '', disabled: false }],
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

  constructor( private _formBuilder: FormBuilder,
               private http: HttpClient,
               private modalService: NgbModal,
               private dateAdapter: DateAdapter<Date>,
               private pdfGenerationService: PdfGenerationService,
               private snackBar: MatSnackBar,
               private cdr: ChangeDetectorRef,
               private route: ActivatedRoute,
               readonly dialog: MatDialog,
               private router: Router,
               ) {}

  ngOnInit(){
    this.getState();
    this.getColor();
    this.getRates();
    this.getTypeVehicles();
    this.getUtilityVehicle();
    this.getClass();
    this.getPlan();
    this.getBroker();
    this.getMethodOfPayment();
    this.setDefaultDates();
    this.getTypeOfPay();
    this.getUtility();
    this.fechas = 'Fecha de Nacimiento';
    fetch("https://ve.dolarapi.com/v1/dolares")
    .then(response => response.json())
    .then(data => {

      for(let tasa of data){
        if(tasa.fuente == 'oficial'){
          this.bcv = tasa.promedio
        }
      }
    });

    this.today = new Date();
    const formattedDate = this.today.toISOString().split('T')[0]; // Obtener solo la parte de la fecha sin la hora
    
    this.receiptFormGroup.get('fdesde')?.setValue(formattedDate);
    
    const fdesdeString = this.receiptFormGroup.get('fdesde')?.value;
    
    if (fdesdeString) {
      const fdesde = new Date(fdesdeString);
      const fhasta = new Date(fdesde);
    
      fhasta.setFullYear(fhasta.getFullYear() + 1);
    
      const formattedFhasta = fhasta.toISOString().split('T')[0]; // Obtener solo la parte de la fecha sin la hora
      this.receiptFormGroup.get('fhasta')?.setValue(formattedFhasta);

    }

    this.filteredIdent = this.identControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  formatCurrency(value: any): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
    });
    return formatter.format(value);
  }

  calculateYears(event: any) {
    const selectedDate = new Date(event.value);
    const currentDate = new Date();
    const eighteenYearsAgo = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
    if (selectedDate > eighteenYearsAgo) {
      this.snackBar.open('Usted es menor de edad, por ende no se puede emitir esta póliza', '', {
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

  onNextStep() {
    if (this.personsFormGroup.valid) {
      this.stepper.next();
      // Si el formulario es válido, permite pasar al siguiente paso
      // Puedes poner aquí cualquier lógica adicional que necesites
    } else {
 // Si el formulario es inválido, construir mensaje de campos faltantes
      let camposFaltantes = '';
      Object.keys(this.personsFormGroup.controls).forEach(key => {
        const control = this.personsFormGroup.get(key);
        if (control && control.invalid) { // Agregar verificación de nulidad
          camposFaltantes += this.campoNombres[key] + '\n'; // Usar el mapa de nombres de campo
        }
      });
      camposFaltantes = camposFaltantes.slice(0, -2); // Eliminar la coma y el espacio extra al final
      window.alert('Por favor, complete los siguientes campos: \n' + camposFaltantes);
    }
  }

  onNextStepV() {
    if (this.vehicleFormGroup.valid) {
      this.stepper.next();
      // Si el formulario es válido, permite pasar al siguiente paso
      // Puedes poner aquí cualquier lógica adicional que necesites
    } else {
      let camposFaltantes = '';
      Object.keys(this.vehicleFormGroup.controls).forEach(key => {
        if (key !== 'ctarifa_exceso') { // Excluir el campo 'ctarifa_exceso'
          const control = this.vehicleFormGroup.get(key);
          if (control && control.invalid) {
            const nombreCampo = this.campoNombresV[key] || key;
            camposFaltantes += nombreCampo + '\n';
          }
        }
      });
      if (camposFaltantes.length > 0) {
        camposFaltantes = camposFaltantes.trimEnd(); // Eliminar espacios en blanco al final
        window.alert('Por favor, complete los siguientes campos:\n' + camposFaltantes);
      }
    }
  }

  onNextStepP() {
    if (this.planFormGroup.valid) {
      this.stepper.next();
      // Si el formulario es válido, permite pasar al siguiente paso
      // Puedes poner aquí cualquier lógica adicional que necesites
    } else {
      window.alert('Por favor, seleccione un plan para poder continuar con la autogestión vehicular');
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

    // Si selectedIdent es distinto de 'V', eliminar la validación de 'fnacimiento'
    if (selectedIdent !== 'V') {
      this.personsFormGroup.get('fnacimiento')?.clearValidators();
      this.personsFormGroup.get('iestado_civil')?.clearValidators();
      this.personsFormGroup.get('isexo')?.clearValidators();
      this.personsFormGroup.get('xapellido')?.clearValidators();
      this.activaSexoYEs = false;
      this.activaNombreYapellido = false;
      this.activaRepresentante = true;
      this.fechas = 'Fecha de Registro';
    } else { // Si selectedIdent es 'V', establecer la validación de 'fnacimiento'
      this.personsFormGroup.get('fnacimiento')?.setValidators([Validators.required]);
      this.personsFormGroup.get('iestado_civil')?.setValidators([Validators.required]);
      this.personsFormGroup.get('isexo')?.setValidators([Validators.required]);
      this.personsFormGroup.get('xapellido')?.setValidators([Validators.required]);
      this.activaSexoYEs = true;
      this.activaNombreYapellido = true;
      this.activaRepresentante = false;
      this.fechas = 'Fecha de Nacimiento';
    }

    // Actualizar los controles después de cambiar las validaciones
    this.personsFormGroup.get('fnacimiento')?.updateValueAndValidity();
    this.personsFormGroup.get('iestado_civil')?.updateValueAndValidity();
    this.personsFormGroup.get('isexo')?.updateValueAndValidity();
    this.personsFormGroup.get('xapellido')?.updateValueAndValidity();
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

  onStateSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedState = this.stateList.find(state => state.value === selectedValue);
    if (selectedState) {
      this.personsFormGroup.get('cestado')?.setValue(selectedState.id);
      this.getCity();
    }
  }

  onStateSelectionTakers(event: any) {
    const selectedValue = event.option.value;
    const selectedState = this.stateTakerList.find(state => state.value === selectedValue);
    if (selectedState) {
      this.planFormGroup.get('cestado_tomador')?.setValue(selectedState.id);
      this.getCityTaker();
    }
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

  onCitySelection(event: any) {
    const selectedValue = event.option.value;
    const selectedCity = this.cityList.find(city => city.value === selectedValue);
    if (selectedCity) {
      this.personsFormGroup.get('cciudad')?.setValue(selectedCity.id);
    }
  }

  onCitySelectionTakers(event: any) {
    const selectedValue = event.option.value;
    const selectedCity = this.cityTakerList.find(city => city.value === selectedValue);
    if (selectedCity) {
      this.planFormGroup.get('cciudad_tomador')?.setValue(selectedCity.id);
    }
  }

  changeYears() {
    this.getBrand() 
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

        if(!this.brandList[0]){
          window.alert(`No existe una Marca para el año ${data.qano}`)
          this.vehicleFormGroup.get('fano')?.setValue('')
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
      this.vehicleFormGroup.get('xmarca')?.setValue(selectedBrand.value);
      this.getModel();
    }else if(this.ccotizacion){
      this.vehicleFormGroup.get('xmarca')?.setValue(selectedValue);
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
    }else if(this.ccotizacion){
      this.vehicleFormGroup.get('xmodelo')?.setValue(selectedValue);
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
            this.vehicleFormGroup.get('xuso')?.setValue(selectedVersion.xuso);
      
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
      this.vehicleFormGroup.get('id_inma')?.setValue(selectedVersion.id_inma);
      this.vehicleFormGroup.get('xtipovehiculo')?.setValue(selectedVersion.xtipovehiculo);
      this.vehicleFormGroup.get('ctarifa_exceso')?.setValue(selectedVersion.ctarifa_exceso);
      this.vehicleFormGroup.get('xuso')?.setValue(selectedVersion.xuso);
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
      this.vehicleFormGroup.get('xtipovehiculo')?.setValue(selectedTypeVehicle.value);
    }
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

  onUtilityVehicleSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedUtilityVehicle = this.utilityVehicleList.find(utility => utility.value === selectedValue);
    if (selectedUtilityVehicle) {
      this.vehicleFormGroup.get('cuso')?.setValue(selectedUtilityVehicle.id);
      this.vehicleFormGroup.get('precargo')?.setValue(selectedUtilityVehicle.precargo);
    }
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

  onUtilitySelection(event: any) {
    const selectedValue = event.option.value;
    const selectedUtility = this.utilityList.find(utility => utility.value === selectedValue);
    this.vehicleFormGroup.get('xuso')?.setValue(selectedUtility.value);
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
        for (let i = 0; i < 5; i++) {
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
      let plan = {
        cplan: selectedPlan.id
      }
      this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/coverages-plan', plan).subscribe((response: any) => {
        // console.log(response.data.coverages)
        this.planCoverage = response.data.coverages.map((item: any) => {
          this.trans = false;
          return {
            name: item.cobertura,
            sum: item.suma.toFixed(2)   
          };
        });
      })
      this.xnombrePlan = selectedPlan.value;
      this.getAmount();
    }
  }

  getBroker(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].cproductor,
            value: response.data.broker[i].xproductor,
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

  validationBank(){
    if(this.receiptFormGroup.get('xmoneda')?.value == 'Bs'){
      this.itipo = 'V';
      this.amountDollar = false;
      this.amountBs = true;

      let cambio = this.montoTotal * this.bcv;
      this.montoBs = cambio.toFixed(2) 

      this.getBank();
      this.getTypeOfPay()
    }else{
      this.itipo = 'E';
      this.amountDollar = true;
      this.amountBs = false;

      let igtf = this.montoTotal * 0.03
      let total = this.montoTotal + igtf;

      this.montoDollar = total.toFixed(2)

      this.getBank();
      this.getTypeOfPay()
    }
  }

  getTypeOfPay(){
    let data = {
      itipo: this.itipo
    }
    this.http.post(environment.apiUrl + '/api/v1/valrep/type-of-payment', data).subscribe((response: any) => {
      if (response.data.typePayment) {
        this.typeOfPayList = [];
        for (let i = 0; i < response.data.typePayment.length; i++) {
          this.typeOfPayList.push({
            id: response.data.typePayment[i].ctipopago,
            value: response.data.typePayment[i].xtipopago,
          });
        }
      }
    });
  }

  getBank(){
    let data = {
      itipo: this.itipo
    }
    this.http.post(environment.apiUrl + '/api/v1/valrep/bank', data).subscribe((response: any) => {
      if (response.data.bank) {
        this.bankList = [];
        for (let i = 0; i < response.data.bank.length; i++) {
          this.bankList.push({
            id: response.data.bank[i].cbanco,
            value: response.data.bank[i].xbanco,
          });
        }
      }
    });
  }

  getTargetBank(){
    if(this.receiptFormGroup.get('ctipopago')?.value == '5' || this.receiptFormGroup.get('ctipopago')?.value == '6'){
      this.receiptFormGroup.get('cbanco_destino')?.disable();
      this.receiptFormGroup.get('cbanco')?.disable();
    }else{
      this.receiptFormGroup.get('cbanco_destino')?.enable();
      this.receiptFormGroup.get('cbanco')?.enable();
      let data = {
        ctipopago: this.receiptFormGroup.get('ctipopago')?.value
      }
      this.http.post(environment.apiUrl + '/api/v1/valrep/target-bank', data).subscribe((response: any) => {
        if (response.data.targetBank) {
          for (let i = 0; i < response.data.targetBank.length; i++) {
            this.targetBankList.push({
              id: response.data.targetBank[i].cbanco_destino,
              value: response.data.targetBank[i].xbanco,
            });
          }
        }
      });
    }
  }

  onCoverageChange() {
    if(this.vehicleFormGroup.get('xcobertura')?.value == 'Rcv'){
      this.paymentButtons = true;
      this.messageCoti = true;
    }
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


    // if(this.planFormGroup.get('ctomador')?.value, this.planFormGroup.get('xtomador')?.value){
    //   console.log('hola')
    //   this.planFormGroup.get('xtomador')?.setValue('')
    //   this.takersInfo = false;
    // }else{
    //   console.log('aaaaa')
    //   this.takersInfo = true;
    // }
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
      this.xmetodologia = selectedMethodOfPayment.value;
      this.validateMethod();
      // this.operationAmount();
      
    }
  }

  setDefaultDates(): void {
    const currentDate = new Date();

    const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

    this.receiptFormGroup.get('fdesde')?.setValue(formattedCurrentDate);

    const nextYearDate = addYears(currentDate, 1);

    const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');

    this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
  }

  getAmount(){
    let data = {
      cplan: this.planFormGroup.get('cplan')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/premium-amount', data).subscribe((response: any) => {
      if (response.status) {
        this.activateCard = true;
        this.montoTotal = response.data.mprima
        this.ubii = response.data.ccubii
        if(this.montoTotal){
          this.operationUbii();
          this.amountTotalRcv = true;
        }else{
          this.amountTotalRcv = false;
        }
      }else{
        this.amountTotalRcv = false;
      }
    });
  }

  getPaymentSelection(){
    if(this.receiptFormGroup.get('xpago')?.value == 'PAGO MANUAL'){
      this.openPaymentModal();
    }else if(this.receiptFormGroup.get('xpago')?.value == 'UBII'){
      this.operationUbii();
    }
  }

  getFormControl(name: string) {
    return this.receiptFormGroup.get(name);
  }

  validateAmount(){
    if(this.receiptFormGroup.get('xmoneda')?.value == 'Bs'){
      const bs = this.montoBs;
      const montoControl = this.receiptFormGroup.get('mpagado');

      if (montoControl) {
        const monto = montoControl.value;
  
        if (monto !== null && monto !== undefined) {
          if (monto < bs) {
            window.alert('El monto que colocó es menor al monto a pagar.');
            montoControl.setValue('');
          }
        }
      }
    }else{
      const ds = this.montoDollar;
      const montoControl = this.receiptFormGroup.get('mpagado');

      if (montoControl) {
        const monto = montoControl.value;
  
        if (monto !== null && monto !== undefined) {
          if (monto < ds) {
            window.alert('El monto que colocó es menor al monto a pagar.');
            montoControl.setValue('');
          }
        }
      }
    }
  }

  configurationCollectionDate(newValue: string){
    if (newValue) {
      const fcobro = new Date(newValue);
      const currentDate = new Date();
  
      const minStartDate = new Date(currentDate);
      minStartDate.setDate(minStartDate.getDate() - 5);
  
      if (fcobro < minStartDate) {
        window.alert('La Fecha de Cobro no puede ser menor a 5 días antes de la fecha actual.')
  
        const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
        this.receiptFormGroup.get('fcobro')?.setValue(formattedCurrentDate);
        this.cdr.detectChanges();
  
        return;
      }
    }
  }

  openPaymentModal() {
    const currentDate = new Date();

    const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');

    this.receiptFormGroup.get('fcobro')?.setValue(formattedCurrentDate);

    const modalRef = this.modalService.open(this.paymentModal, { centered: true });
  
    modalRef.result.then((result) => {
      if (result === 'result') {
        const pagado = this.getFormControl('mpagado')?.value;
        this.getFormControl('ctipopago')?.value;
        this.getFormControl('cbanco')?.value;
        this.getFormControl('cbanco_destino')?.value;
        this.getFormControl('fcobro')?.value;
        this.getFormControl('xreferencia')?.value;
        this.getFormControl('mpagado')?.value;
        this.receiptFormGroup.get('mprima_pagada')?.setValue(pagado);
        this.buttonEmissions = true;
      }
    }).catch((reason) => {
      this.buttonEmissions = false;
    });
  }

  closeModal() {
    this.isModalActive = false;
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
                  this.buttonEmissions = true;
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
                  this.buttonEmissions = true;

        // this.buttonEmissions = false;
        // this.snackBar.open(`Lo sentimos, debe formalizar una modalidad de pago para emitir la póliza`, '', {
        //   duration: 3000,
        // });
      }
    }else{
      this.buttonEmissions = true;
    }

  }

  operationUbii() {
    if (this.vehicleFormGroup.get('xcobertura')?.value == 'Rcv') {
      let prima = this.montoTotal.toString().split(" ");
      let prima_ds: String = String(parseFloat(prima[0]).toFixed(2));
      let prima_bs: String = String( (Math.round( ( (parseFloat(prima[0]) * (this.bcv) ) + Number.EPSILON ) * 100 ) /100).toFixed(2) );
      let orden: string = "UB_" + this.ubii;

      this.bpagarubii = true;

      initUbii(
        'ubiiboton',
        {
          amount_ds: prima_ds,
          amount_bs:  prima_bs,
          concept: "COMPRA",
          principal: "ds",
          clientId:"f2514eda-610b-11ed-8e56-000c29b62ba1",
          orderId: orden
        },
        this.callbackFn.bind(this),
        {
          text: 'Pagar con Ubii '
        },
      );

    }
  }

  async onSubmitUbii() {

      const response = await fetch(`${environment.apiUrl}/api/v1/emissions/automobile/create`, {
        "method": "POST",
        "headers": {
          "CONTENT-TYPE": "Application/json",
          "X-CLIENT-CHANNEL": "BTN-API"
        },
        "body": JSON.stringify({
          icedula: this.personsFormGroup.get('icedula')?.value,
          xrif_cliente: this.personsFormGroup.get('xrif_cliente')?.value,
          xnombre: this.personsFormGroup.get('xnombre')?.value?.toUpperCase(),
          xapellido: this.personsFormGroup.get('xapellido')?.value?.toUpperCase(),
          xtelefono_emp: this.personsFormGroup.get('xtelefono_emp')?.value,
          email: this.personsFormGroup.get('email')?.value?.toUpperCase(),
          cestado: this.personsFormGroup.get('cestado')?.value,
          cciudad: this.personsFormGroup.get('cciudad')?.value,
          fnacimiento: this.personsFormGroup.get('fnacimiento')?.value,
          iestado_civil: this.personsFormGroup.get('iestado_civil')?.value,
          isexo: this.personsFormGroup.get('isexo')?.value,
          xdireccion: this.personsFormGroup.get('xdireccion')?.value?.toUpperCase(),
          xplaca: this.vehicleFormGroup.get('xplaca')?.value?.toUpperCase(),
          xmarca: this.vehicleFormGroup.get('xmarca')?.value,
          xmodelo: this.vehicleFormGroup.get('xmodelo')?.value,
          xversion: this.vehicleFormGroup.get('xversion')?.value,
          fano: this.vehicleFormGroup.get('fano')?.value,
          npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
          xcolor: this.vehicleFormGroup.get('xcolor')?.value,
          xserialcarroceria: this.vehicleFormGroup.get('xserialcarroceria')?.value?.toUpperCase(),
          xserialmotor: this.vehicleFormGroup.get('xserialmotor')?.value?.toUpperCase(),
          xcobertura: this.vehicleFormGroup.get('xcobertura')?.value,
          ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
          cclasificacion: this.vehicleFormGroup.get('cclasificacion')?.value,
          ctomador: this.planFormGroup.get('ctomador')?.value,
          xtomador: this.planFormGroup.get('xtomador')?.value,
          xrif_tomador: this.planFormGroup.get('xrif_tomador')?.value,
          xemail_tomador: this.planFormGroup.get('xemail_tomador')?.value,
          cestado_tomador: this.planFormGroup.get('cestado_tomador')?.value,
          cciudad_tomador: this.planFormGroup.get('cciudad_tomador')?.value,
          xdireccion_tomador: this.planFormGroup.get('xdireccion_tomador')?.value,
          xzona_postal_tomador: this.planFormGroup.get('xzona_postal_tomador')?.value,
          xtelefono_tomador: this.planFormGroup.get('xtelefono_tomador')?.value,
          ccotizacion: this.vehicleFormGroup.get('ccotizacion')?.value,
          cinspeccion: this.vehicleFormGroup.get('cinspeccion')?.value,
          fdesde_pol: this.receiptFormGroup.get('fdesde')?.value,
          fhasta_pol: this.receiptFormGroup.get('fhasta')?.value,
          cplan_rc: this.planFormGroup.get('cplan')?.value,
          ccorredor: this.planFormGroup.get('ccorredor')?.value,
          pcasco: this.planFormGroup.get('pcasco')?.value,
          msuma_aseg: this.planFormGroup.get('msuma_aseg')?.value,
          mprima_bruta: this.planFormGroup.get('mprima_bruta')?.value,
          pdescuento: this.planFormGroup.get('pdescuento')?.value,
          precarga: this.planFormGroup.get('precarga')?.value,
          pmotin: this.planFormGroup.get('pmotin')?.value,
          pcatastrofico: this.planFormGroup.get('pcatastrofico')?.value,
          mprima_casco: this.planFormGroup.get('mprima_casco')?.value,
          mcatastrofico: this.planFormGroup.get('mcatastrofico')?.value,
          mmotin: this.planFormGroup.get('mmotin')?.value,
          pblindaje: this.planFormGroup.get('pblindaje')?.value,
          msuma_blindaje: this.planFormGroup.get('msuma_blindaje')?.value,
          mprima_blindaje: this.planFormGroup.get('mprima_blindaje')?.value,
          accesorios: this.planFormGroup.controls.accesorios.value,
          xpago: this.receiptFormGroup.get('xpago')?.value,
          femision: this.receiptFormGroup.get('femision')?.value,
          cmetodologiapago: 5,
          id_inma: this.vehicleFormGroup.get('id_inma')?.value,
          cuso: this.vehicleFormGroup.get('cuso')?.value,
          xuso: this.vehicleFormGroup.get('xuso')?.value,
          cpais: 58,
          ctipopago: this.receiptFormGroup.get('ctipopago')?.value,
          cbanco: this.receiptFormGroup.get('cbanco')?.value,
          cbanco_destino: this.receiptFormGroup.get('cbanco_destino')?.value,
          fcobro: this.receiptFormGroup.get('fcobro')?.value,
          xreferencia: this.receiptFormGroup.get('xreferencia')?.value,
          mpagado: this.receiptFormGroup.get('mpagado')?.value,
          mprima_pagada: this.receiptFormGroup.get('mprima_pagada')?.value,
          mprima_accesorio: this.receiptFormGroup.get('mprima_accesorio')?.value,
          npesovacio: this.vehicleFormGroup.get('npesovacio')?.value,
          ncapcarga: this.vehicleFormGroup.get('ncapcarga')?.value,
          paditamento: this.planFormGroup.get('paditamento')?.value,
          msuma_aditamento: this.planFormGroup.get('msuma_aditamento')?.value,
          mprima_aditamento: this.planFormGroup.get('mprima_aditamento')?.value,
        }) 
      });
      let res = await response.json();
      // console.log(res)
      if (res.data) {
        this.ccontratoflota = res.data.ccontratoflota;
        this.buttonEmissions = false;
      }else{
        this.buttonEmissions = true;
      }
  }

  async callbackFn(answer: any) {

    if(answer.data.R == 0){
      await this.onSubmitUbii();
      let ctipopago;
      if(answer.data.method == "ZELLE"){
        ctipopago = 4;
      }
      if(answer.data.method == "P2C") {
        ctipopago = 3;
      }
      let datetimeformat = answer.data.date.split(' ');
      let dateformat = datetimeformat[0].split('/');
      let fcobro = dateformat[2] + '-' + dateformat[1] + '-' + dateformat[0] + ' ' + datetimeformat[1];
      const response = await fetch(`${environment.apiUrl}/api/v1/emissions/automobile/ubii/update`, {
        "method": "POST",
        "headers": {
          "CONTENT-TYPE": "Application/json"
        },
        "body": JSON.stringify({
          paymentData: {
            ccontratoflota: this.ccontratoflota,
            orderId: answer.data.orderID,
            ctipopago: ctipopago,
            xreferencia: answer.data.ref,
            fcobro: fcobro,
            mprima_pagada: answer.data.m,
            mtasa_cambio: this.bcv
          }
        }) });
        this.check = true;
        const observable = from(this.pdfGenerationService.LoadDataCertifiqued(this.ccontratoflota));

        observable.subscribe(
          (data) => {
            this.check = true;
            this.loadingPdf = false
          },
          (error) => {
          }
        );

        this.snackBar.open(`Se ha generado exitósamente el contrato n° ${this.ccontratoflota}`, '', {
          duration: 3000,
        });
    }
    if (answer.data.R == 1) {
      window.alert(`No se pudo procesar el pago. Motivo: ${answer.data.M}, intente nuevamente`);
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

  prueba() {
    const fhastaControl = this.receiptFormGroup.get('fhasta');
  
    // if (fhastaControl?.value) {
    //   const fdesdeValue = this.receiptFormGroup.get('fdesde')?.value;
  
    //   if (fdesdeValue) {
    //     const fdesde = new Date(fdesdeValue as string);
    //     const currentDate = new Date();
    //     const maxEndDate = new Date(fdesde);
    //     maxEndDate.setDate(maxEndDate.getDate() + 366);
    //     const minEndDate = new Date(fdesde);
    //     minEndDate.setDate(minEndDate.getDate() + 30);
  
    //     const selectedDate = new Date(fhastaControl.value as string);
  
    //     if (selectedDate < minEndDate) {
    //       console.error('La Fecha Hasta debe ser mayor a la Fecha Desde más 30 días');
    //       this.snackBar.open('La Fecha Hasta debe ser mayor a la Fecha Desde más 30 días.', '', {
    //         duration: 3000,
    //       });
    //       this.receiptFormGroup.get('fhasta')?.setValue(currentDate.toISOString());
    //       return;
    //     }
  
    //     if (selectedDate > maxEndDate) {
    //       this.snackBar.open('La Fecha Hasta no puede ser mayor a 365 días desde la Fecha Desde.', '', {
    //         duration: 3000,
    //       });
          
    //       const nextYearDate = addYears(fdesde, 1);
    //       const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');
    //       this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
    //     }
    //   }
    // }
  }
  
  onSubmit(){
    this.buttonEmissions = false;
    this.loadingEmissions = true;

    if(this.personsFormGroup.invalid){
      this.snackBar.open(`Por favor, revise la información antes de emitir esta póliza.`, '', {
        duration: 3000,
      });

      this.buttonEmissions = true;
      this.loadingEmissions = false;
      return;
    }

    if(this.vehicleFormGroup.invalid){
      this.snackBar.open(`Por favor, revise la información antes de emitir esta póliza.`, '', {
        duration: 3000,
      });

      this.buttonEmissions = true;
      this.loadingEmissions = false;
      return;
    }

    if(this.planFormGroup.invalid){
      this.snackBar.open(`Por favor, revise la información antes de emitir esta póliza.`, '', {
        duration: 3000,
      });

      this.buttonEmissions = true;
      this.loadingEmissions = false;
      return;
    }

    if(this.receiptFormGroup.invalid){
      this.snackBar.open(`Por favor, revise la información antes de emitir esta póliza.`, '', {
        duration: 3000,
      });

      this.buttonEmissions = true;
      this.loadingEmissions = false;
      return;
    }

    let data = {
      icedula: this.personsFormGroup.get('icedula')?.value,
      xrif_cliente: this.personsFormGroup.get('xrif_cliente')?.value,
      xnombre: this.personsFormGroup.get('xnombre')?.value?.toUpperCase(),
      xapellido: this.personsFormGroup.get('xapellido')?.value?.toUpperCase(),
      xtelefono_emp: this.personsFormGroup.get('xtelefono_emp')?.value,
      email: this.personsFormGroup.get('email')?.value?.toUpperCase(),
      cestado: this.personsFormGroup.get('cestado')?.value,
      cciudad: this.personsFormGroup.get('cciudad')?.value,
      fnacimiento: this.personsFormGroup.get('fnacimiento')?.value,
      iestado_civil: this.personsFormGroup.get('iestado_civil')?.value,
      isexo: this.personsFormGroup.get('isexo')?.value,
      xdireccion: this.personsFormGroup.get('xdireccion')?.value?.toUpperCase(),
      xplaca: this.vehicleFormGroup.get('xplaca')?.value?.toUpperCase(),
      xmarca: this.vehicleFormGroup.get('xmarca')?.value,
      xmodelo: this.vehicleFormGroup.get('xmodelo')?.value,
      xversion: this.vehicleFormGroup.get('xversion')?.value,
      fano: this.vehicleFormGroup.get('fano')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      xcolor: this.vehicleFormGroup.get('xcolor')?.value,
      xserialcarroceria: this.vehicleFormGroup.get('xserialcarroceria')?.value?.toUpperCase(),
      xserialmotor: this.vehicleFormGroup.get('xserialmotor')?.value?.toUpperCase(),
      xcobertura: this.vehicleFormGroup.get('xcobertura')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      cclasificacion: this.vehicleFormGroup.get('cclasificacion')?.value,
      ccotizacion: this.vehicleFormGroup.get('ccotizacion')?.value,
      fdesde_pol: this.receiptFormGroup.get('fdesde')?.value,
      fhasta_pol: this.receiptFormGroup.get('fhasta')?.value,
      cplan_rc: this.planFormGroup.get('cplan')?.value,
      pcasco: this.planFormGroup.get('pcasco')?.value,
      xpago: this.receiptFormGroup.get('xpago')?.value,
      femision: this.receiptFormGroup.get('femision')?.value,
      cmetodologiapago: 5,
      id_inma: this.vehicleFormGroup.get('id_inma')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
      xuso: this.vehicleFormGroup.get('xuso')?.value,
      cpais: 58,
      ctipopago: this.receiptFormGroup.get('ctipopago')?.value,
      cbanco: this.receiptFormGroup.get('cbanco')?.value,
      cbanco_destino: this.receiptFormGroup.get('cbanco_destino')?.value,
      fcobro: this.receiptFormGroup.get('fcobro')?.value,
      xreferencia: this.receiptFormGroup.get('xreferencia')?.value,
      mpagado: this.receiptFormGroup.get('mpagado')?.value,
      mprima_pagada: this.receiptFormGroup.get('mprima_pagada')?.value,
      mprima_accesorio: this.receiptFormGroup.get('mprima_accesorio')?.value,
      npesovacio: this.vehicleFormGroup.get('npesovacio')?.value,
      ncapcarga: this.vehicleFormGroup.get('ncapcarga')?.value,
    };

    // console.log(data)

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
            this.check = true;
            this.loadingPdf = false
          },
          (error) => {
          }
        );

        this.snackBar.open(`Se ha generado exitósamente el contrato n° ${this.ccontratoflota} del cliente ${nombre?.toUpperCase()} para el vehículo de placa ${placa?.toUpperCase()}`, '', {
          duration: 3000,
        });
      }
    });
  }

}

