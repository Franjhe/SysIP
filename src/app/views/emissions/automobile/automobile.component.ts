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

interface CsvItem {
  IRIF: string;
  XCLIENTE: string;
  XRIF_CLIENTE: string;
  ID_INMA: string;
  XNOMBRE: string;
  XAPELLIDO: string;
  ICEDULA: string;
  XCEDULA: string;
  FNAC: string;
  CMETODOLOGIAPAGO: string;
  CPLAN_RC: string;
  CTARIFA_EXCESO: string;
  XSERIALCARROCERIA: string;
  XSERIALMOTOR: string;
  XPLACA: string;
  XMARCA: string;
  XMODELO: string;
  XVERSION: string;
  CANO: string;
  XCOLOR: string;
  XCOBERTURA: string;
  PTASA: string;
  MSUMA_ASEG: string;
  PCASCO: string;
  MPRIMA_BRUTA: string;
  MPRIMA_CASCO: string;
  PCATASTROFICO: string;
  MCATASTROFICO: string;
  PMOTIN: string;
  MMOTIN: string;
  MSUMA_BLINDAJE: string;
  PBLINDAJE: string;
  MPRIMA_BLINDAJE: string;
  XDIRECCIONFISCAL: string;
  XTELEFONO_EMP: string;
  EMAIL: string;
  FEMISION: string;
  FDESDE_POL: string;
  FHASTA_POL: string;
  NCAPACIDAD_P: string;
  MCAPACIDAD_C: string;
  XUSO: string;
  CCORREDOR: string;
  CPAIS: string;
  CESTADO: string;
  CCIUDAD: string;
  CESTATUSGENERAL: string;
  CCLASIFICACION: string;
  XZONA_POSTAL: string;
}

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
  selector: 'app-automobile',
  templateUrl: './automobile.component.html',
  styleUrls: ['./automobile.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class AutomobileComponent {
  @ViewChild('pickerHasta') pickerHasta!: MatDatepicker<Date>;
  @ViewChild('paymentModal') paymentModal: any;
  @ViewChild(MatPaginator) paginatorGroup!: MatPaginator;
  @ViewChild('Alerta') alertConfirmation!: TemplateRef<any>;
  displayedColumnsGroup: string[] = ['xnombre', 'xapellido', 'xcedula', 'xmarca', 'xmodelo', 'xversion', 'xcobertura', 'fdesde', 'fhasta'];
  dataSource = new MatTableDataSource<any>([]);
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
  sumaAseguradaControl: FormControl = new FormControl(0);

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
    xmarca: [{ value: '', disabled: true}, Validators.required],
    xmodelo: [{ value: '', disabled: true}, Validators.required],
    xversion: [{ value: '', disabled: true}, Validators.required],
    fano: ['',[Validators.required, Validators.maxLength(4)]],
    npasajeros: [{ value: '', disabled: true }],
    cclasificacion: [''], 
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
               ) {
                dateAdapter.setLocale('es');
                this.route.queryParams.subscribe(params => {
                  const cotizacion = params['cotizacion'];
                  const fano = params['fano'];
                  const cplan = params['cplan'];
                  const ctarifa = params['ctarifa_exceso'];
                  const ccorredor = params['ccorredor'];
                  const msuma_aseg = params['suma_aseg'];
                  const prima = params['prima'];
                  if(ccorredor){
                    this.paymentButtons = true;
                    this.buttonEmissions = true;
                  }
                  this.ccotizacion = cotizacion
                  this.fano = fano
                  this.cplan = cplan
                  this.ctarifa = ctarifa
                  this.suma_aseg = parseFloat(msuma_aseg)
                  this.prima = parseFloat(prima)

                });

                if(this.ccotizacion){
                  this.vehicleFormGroup.get('ccotizacion')?.setValue(this.ccotizacion);
                  this.vehicleFormGroup.get('fano')?.setValue(this.fano);
                  this.vehicleFormGroup.get('ctarifa_exceso')?.setValue(this.ctarifa);
                  this.planFormGroup.get('msuma_aseg')?.setValue(this.suma_aseg);
                  this.planFormGroup.get('mprima_casco_text')?.setValue(this.prima);
                  this.planFormGroup.get('mprima_casco')?.setValue(this.prima);
                  if(!this.vehicleFormGroup.get('ctarifa_exceso')?.value){
                    this.activateRate = true;
                  }else{
                    this.activateRate = false;
                  }
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
              
                  this.searchQuotes();
                }
              }

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
    this.getMethodOfPayment();
    this.getTakers();
    this.setDefaultDates();
    this.getTypeOfPay();
    this.getUtility();

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })

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

    this.token = localStorage.getItem('user');
    
    this.currentUser = JSON.parse(this.token);

    this.filteredIdent = this.identControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );

    if(this.currentUser.data.crol == 6){
      this.userBroker = false;
    }else{
      this.userBroker = true;
    }


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
      this.validateYearsFromHullPrice()
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

  searchRates(){
    let data = {
      cano: this.vehicleFormGroup.get('fano')?.value,
      xclase: this.vehicleFormGroup.get('cclasificacion')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/search-rates', data).subscribe((response: any) => {
      if(response.casco){
        this.casco = response.casco;
      }else{
        this.snackBar.open(`${response.message}`, '', {
          duration: 4000,
        });
        this.casco = response.casco;
      }
    })
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

  onPlanSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedPlan = this.planList.find(plan => plan.value === selectedValue);
    if (selectedPlan) {
      this.planFormGroup.get('cplan')?.setValue(selectedPlan.id);
      this.getAmount();
    }
  }

  getBroker(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].cproductor,
            value: response.data.broker[i].xintermediario,
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
      this.helmet = false;
      this.activateInspection = false;
      
      if(this.currentUser.data.crol == 7){
        this.paymentButtonManual = false;
      }else{
        this.paymentButtonManual = true;
      }
      this.planFormGroup.get('mmotin')?.setValue('');
      this.planFormGroup.get('mcatastrofico')?.setValue('');
    }
    else if(this.vehicleFormGroup.get('xcobertura')?.value !== 'Rcv'){
      this.validateYearsFromHullPrice()
      this.activateInspection = true;
      if(this.ccotizacion){
        this.helmet = true;
        this.messageCoti = false;
      }else{
        this.helmet = true;
        this.messageCoti = false;
      }
      
      this.paymentButtons = false;
    }
  }

  changeInspection(){
    if(this.currentUser.data.crol != 5){
      this.snackBar.open(`No posee Número de Inspección, por lo tanto no puede proceder con ${this.vehicleFormGroup.get('xcobertura')?.value}`, '', {
        duration: 4000,
      });
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
          this.tasaCascoInicial = response.data.ptasa_casco
          if(this.vehicleFormGroup.get('xcobertura')?.value == 'Cobertura Amplia'){
            this.planFormGroup.get('pcasco')?.setValue(response.data.ptasa_casco);
            this.planFormGroup.get('pblindaje')?.setValue(response.data.ptasa_casco);
            if(this.vehicleFormGroup.get('xtipovehiculo')?.value == 'CARGA' || this.vehicleFormGroup.get('xtipovehiculo')?.value == 'Carga'){
              this.planFormGroup.get('paditamento')?.setValue(response.data.ptasa_casco);
            }else{
              this.planFormGroup.get('paditamento')?.setValue(null);
            }
          }else{
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

        this.openDiscount();
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
      if(this.planFormGroup.get('xtomador')?.value){
        this.validateTaker();
      }
    }

    return lista
  }

  onTakersSelection(event: any) {
    const selectedValue = event.option.value;
    const selectedTakers = this.takersList.find(taker => taker.value === selectedValue);
    if (selectedTakers) {
      this.planFormGroup.get('ctomador')?.setValue(selectedTakers.id);
      this.validateTaker();
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
    const pcatastrofico = 0.10;
    const msumaAsegRobo = 600;
    const probo = 4.48;
    let pmotin = 0
    
    let calculo: number = 0;
    let catastrofico: number = 0;
    let motin: number = 0;
    let robo: number = 0;

    let data = {
      xcobertura: this.vehicleFormGroup.get('xcobertura')?.value
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/riot-rate', data).subscribe((response: any) => {
      if(response.status){
        this.pmotin = response.data.pmotin;
        if (typeof msumaAseg === 'number' && typeof pmotin === 'number') {
          motin = (msumaAseg * this.pmotin) / 100;
        
          this.planFormGroup.get('mmotin')?.setValue(motin.toString());
          this.primaMotin = motin.toFixed(2);
          this.calculationsPremiumsCascoTotal()
        }
      }
    });

    if (typeof msumaAseg === 'number' && typeof pcasco === 'number') {
      calculo = (msumaAseg * pcasco) / 100;
  
      // Redondear la prima a dos decimales
      const primaRedondeada = calculo.toFixed(2);
      this.primaCascoInicial = primaRedondeada;

      this.planFormGroup.get('mprima_casco')?.setValue(primaRedondeada);
      this.planFormGroup.get('mprima_bruta')?.setValue(primaRedondeada);
      this.planFormGroup.get('mprima_casco_text')?.setValue(primaRedondeada);
      this.calculationsPremiumsCascoTotal();
      this.planFormGroup.get('mprima_bruta_text')?.setValue(primaRedondeada);
      this.primaBruta = this.planFormGroup.get('mprima_bruta_text')?.value;
    }

    if (typeof msumaAseg === 'number' && typeof pcatastrofico === 'number') {
      catastrofico = (msumaAseg * pcatastrofico) / 100;
    
      this.planFormGroup.get('mcatastrofico')?.setValue(catastrofico.toString());
      this.primaRiesgo = catastrofico.toFixed(2);
      this.calculationsPremiumsCascoTotal()
    }

    if (typeof msumaAsegRobo === 'number' && typeof probo === 'number') {
      robo = (msumaAsegRobo * probo) / 100;
    
      this.primaRobo = robo.toFixed(2);
      this.calculationsPremiumsCascoTotal()
    }
    
    this.sumaAsegurada = msumaAseg;
  }

  getDiscount(){
    const descuento = this.planFormGroup.get('pdescuento')?.value;
    const pcascoValue = this.planFormGroup.get('pcasco')?.value;
    const casco = this.planFormGroup.get('mprima_casco')?.value;
    const sumaAseg = parseFloat(this.planFormGroup.get('msuma_aseg')?.value || '')
    
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

        let valorTotal = calculo_descuento.toFixed(2)
  
        this.planFormGroup.get('mprima_casco')?.setValue(calculo_descuento.toString());
        this.planFormGroup.get('mprima_casco_text')?.setValue(valorTotal);
        this.calculationsPremiumsCascoTotal();

        const discount = restRecharge.toFixed(2)

      this.planFormGroup.get('pcasco')?.setValue(discount.toString())
      }
    }else{
      this.planFormGroup.get('pcasco')?.setValue(this.tasaCascoInicial);
      this.planFormGroup.get('mprima_casco_text')?.setValue(this.primaCascoInicial)
      this.planFormGroup.get('mprima_casco')?.setValue(this.primaBruta);
    }

    if(this.planFormGroup.get('mprima_casco')?.value){
      this.enableInfo = true;
    }
    this.descuento = this.planFormGroup.get('pdescuento')?.value;
  }

  getRecharge() {
    const precargaValue = this.planFormGroup.get('precarga')?.value;
    const pcascoValue = this.planFormGroup.get('pcasco')?.value;
    const casco = this.planFormGroup.get('mprima_casco')?.value;
    const sumaAseg = parseFloat(this.planFormGroup.get('msuma_aseg')?.value || '')

    let division: number = 0;
    let multiplicacion: number = 0;
    let calculo_recarga: number = 0;
  
    if(precargaValue){
      if (typeof precargaValue === 'number' && typeof pcascoValue === 'number' && typeof casco === 'string') {
      
        const calculatedAmount = (precargaValue / 100) * pcascoValue;
        const sumRecharge = pcascoValue + calculatedAmount;
  
        const cascoNumero = parseFloat(casco);

        console.log(sumRecharge)
        console.log(this.planFormGroup.get('msuma_aseg')?.value)
        
        // division = sumRecharge / 100;
        // multiplicacion = cascoNumero * division;
        calculo_recarga = sumRecharge * sumaAseg / 100;
  
        let valorTotal = calculo_recarga.toFixed(2)
  
        this.planFormGroup.get('mprima_casco')?.setValue(calculo_recarga.toString());
        this.planFormGroup.get('mprima_casco_text')?.setValue(valorTotal);
        this.calculationsPremiumsCascoTotal();
  
        const recharge = sumRecharge.toFixed(2)
  
        this.planFormGroup.get('pcasco')?.setValue(recharge.toString())
      }
    }else{
      this.planFormGroup.get('pcasco')?.setValue(this.tasaCascoInicial);
      this.planFormGroup.get('mprima_casco_text')?.setValue(this.primaCascoInicial)
    }

  }

  premiumRecalculation() {
    const msumaAsegRaw = this.planFormGroup.get('msuma_aseg')!.value;
    const pcatastrofico = 0.10;
    const msumaAsegRobo = 600;
    const probo = 4.48;

    let robo: number = 0;
    // Verifica si msumaAsegRaw no es null antes de convertirlo a un número
    if (msumaAsegRaw !== null) {
        let msumaAseg = parseFloat(msumaAsegRaw);

        let max = this.sumaAseguradaBase * 0.30
        let min = this.sumaAseguradaBase * 0.10

        let MaxSum = this.sumaAseguradaBase + max;
        let MinSum = this.sumaAseguradaBase - min;

        this.sumaAseguradaMax = MaxSum.toFixed(2)
        this.sumaAseguradaMin = MinSum.toFixed(2)

        if(msumaAseg > this.sumaAseguradaMax){
          this.snackBar.open('La Suma Asegurada excedió el 30%.', '', {
            duration: 5000,
          });

          this.planFormGroup.get('msuma_aseg')?.setValue(this.sumaAseguradaBase);
          this.premiumRecalculation()
          return
        }

        if(msumaAseg < this.sumaAseguradaMin){
          this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
            duration: 5000,
          });

          this.planFormGroup.get('msuma_aseg')?.setValue(this.sumaAseguradaBase);
          this.premiumRecalculation()
          return
        }

        const pcasco = this.planFormGroup.get('pcasco')?.value;

        let calculo: number = 0;
        let catastrofico: number = 0;
        let motin: number = 0;

        if (!isNaN(msumaAseg) && typeof pcasco === 'number') {
            calculo = (msumaAseg * pcasco) / 100;

            // Redondear la prima a dos decimales
            const primaRedondeada = calculo.toFixed(2);

            this.planFormGroup.get('mprima_casco')?.setValue(primaRedondeada);
            this.planFormGroup.get('mprima_bruta')?.setValue(primaRedondeada);
            this.planFormGroup.get('mprima_casco_text')?.setValue(primaRedondeada);
            this.planFormGroup.get('mprima_bruta_text')?.setValue(primaRedondeada);
            this.primaBruta = this.planFormGroup.get('mprima_bruta_text')?.value;

            if(this.planFormGroup.get('mprima_casco_text')?.value){
              this.calculationsPremiumsCascoTotal();
            }
        }

        if (!isNaN(msumaAseg) && typeof pcatastrofico === 'number') {
            catastrofico = (msumaAseg * pcatastrofico) / 100;

            this.planFormGroup.get('mcatastrofico')?.setValue(catastrofico.toString());
            this.primaRiesgo = catastrofico.toFixed(2);
            this.calculationsPremiumsCascoTotal()
        }

        if (typeof msumaAseg === 'number' && typeof this.pmotin === 'number') {
          motin = (msumaAseg * this.pmotin) / 100;

          this.planFormGroup.get('mmotin')?.setValue(motin.toString());
          this.primaMotin = motin.toFixed(2);
          this.calculationsPremiumsCascoTotal()
        }

        if (typeof msumaAsegRobo === 'number' && typeof probo === 'number') {
          robo = (msumaAsegRobo * probo) / 100;
        
          this.primaRobo = robo.toFixed(2);
          this.calculationsPremiumsCascoTotal()
        }
        this.sumaAsegurada = msumaAseg;
    }
  }


  calculationPremiumsShielding(){
    const msumaAseg = this.planFormGroup.get('msuma_blindaje')?.value;
    const pblindaje = this.planFormGroup.get('pblindaje')?.value;

    let calculo: number = 0;
    
    if (typeof msumaAseg === 'number' && typeof pblindaje === 'number') {
      let msumaAsegBlin = parseFloat(msumaAseg);
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
            this.calculationPremiumsShielding()
            return
          }
  
          if(msumaAsegBlin < this.sumaAseguradaMin){
            this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
              duration: 5000,
            });
  
            this.planFormGroup.get('msuma_blindaje')?.setValue(this.sumaAseguradaBase);
            this.calculationPremiumsShielding()
            return
          }

          calculo = msumaAsegBlin * pblindaje / 100;
          let valorTotal = calculo.toFixed(2)
          this.planFormGroup.get('mprima_blindaje')?.setValue(valorTotal);
          this.calculationsPremiumsCascoTotal()
        }
    }
  }
  
  calculationPremiumsAttachment(){
    const msumaAsegAdi = this.planFormGroup.get('msuma_aditamento')?.value;
    const paditamento = this.planFormGroup.get('paditamento')?.value;

    let calculo: number = 0;
    
    if (typeof msumaAsegAdi === 'number' && typeof paditamento === 'number') {
      let msumaAsegBlin = parseFloat(msumaAsegAdi);
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
            this.calculationPremiumsAttachment()
            return
          }
  
          if(msumaAsegBlin < this.sumaAseguradaMin){
            this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
              duration: 5000,
            });
  
            this.planFormGroup.get('msuma_aditamento')?.setValue(this.sumaAseguradaBase);
            this.calculationPremiumsAttachment()
            return
          }

          calculo = msumaAsegBlin * paditamento / 100;
          let valorTotal = calculo.toFixed(2)
          this.planFormGroup.get('mprima_aditamento')?.setValue(valorTotal);
          this.calculationsPremiumsCascoTotal()
        }
    }
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
              sumaAsegurada: '',
              xprimaAccesorio: ''
            })
          )

          this.accesoriesList.push({
            caccesorio: response.data.accesories[i].caccesorio,
            xaccesorio: response.data.accesories[i].xaccesorio,
            ptasa: response.data.accesories[i].ptasa,
            sumaAsegurada: 0,
            xprimaAccesorio: 0
          });
        }
      }
    });
  }

  cloneObject(source: any) {
    return JSON.parse(JSON.stringify(source));
  }

  updateSumaAsegurada(accessory: any, event: any) {
    if (event && event.target) {
      const newValue = event.target.value;
      accessory.sumaAsegurada = newValue;
      this.calculateAccesories(accessory);
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

  calculateDate(newValue: string) {
    this.receiptFormGroup.get('fhasta')?.setValue('');
  
    if (newValue) {
      const fdesde = new Date(newValue);
      const currentDate = new Date();
  
      const minStartDate = new Date(currentDate);
      minStartDate.setDate(minStartDate.getDate() - 5);
  
      if (fdesde < minStartDate) {
        this.snackBar.open('La Fecha Desde no puede ser menor a 5 días antes de la fecha actual.', '', {
          duration: 3000,
        });
  
        const formattedCurrentDate = format(currentDate, 'yyyy-MM-dd');
        this.receiptFormGroup.get('fdesde')?.setValue(formattedCurrentDate);
        this.cdr.detectChanges();
  
        const nextYearDate = addYears(currentDate, 1);
        const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');
        this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
  
        return;
      }
  
      const fhasta = new Date(fdesde);
      const daysToAdd = 30;
  
      if (fdesde < currentDate && fdesde.getDate() + 6 <= currentDate.getDate()) {
        this.snackBar.open('Requiere autorización si la Fecha Desde es menor que la fecha actual en 6 días o más.', '', {
          duration: 3000,
        });
      }
  
      fhasta.setDate(fhasta.getDate() + daysToAdd);
  
      const maxEndDate = new Date(fdesde);
      maxEndDate.setDate(maxEndDate.getDate() + 366);
  
      if (fhasta > maxEndDate) {
        this.snackBar.open('La Fecha Hasta no puede ser mayor a 365 días desde la Fecha Desde.', '', {
          duration: 3000,
        });
        console.error('La Fecha Hasta no puede ser mayor a 365 días desde la Fecha Desde');
        return;
      }
      
      const nextYearDate = addYears(fdesde, 1);
      const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');
      this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
    }
  }

  prueba() {
    const fhastaControl = this.receiptFormGroup.get('fhasta');
  
    if (fhastaControl?.value) {
      const fdesdeValue = this.receiptFormGroup.get('fdesde')?.value;
  
      if (fdesdeValue) {
        const fdesde = new Date(fdesdeValue as string);
        const currentDate = new Date();
        const maxEndDate = new Date(fdesde);
        maxEndDate.setDate(maxEndDate.getDate() + 366);
        const minEndDate = new Date(fdesde);
        minEndDate.setDate(minEndDate.getDate() + 30);
  
        const selectedDate = new Date(fhastaControl.value as string);
  
        if (selectedDate < minEndDate) {
          console.error('La Fecha Hasta debe ser mayor a la Fecha Desde más 30 días');
          this.snackBar.open('La Fecha Hasta debe ser mayor a la Fecha Desde más 30 días.', '', {
            duration: 3000,
          });
          this.receiptFormGroup.get('fhasta')?.setValue(currentDate.toISOString());
          return;
        }
  
        if (selectedDate > maxEndDate) {
          this.snackBar.open('La Fecha Hasta no puede ser mayor a 365 días desde la Fecha Desde.', '', {
            duration: 3000,
          });
          
          const nextYearDate = addYears(fdesde, 1);
          const formattedNextYearDate = format(nextYearDate, 'yyyy-MM-dd');
          this.receiptFormGroup.get('fhasta')?.setValue(formattedNextYearDate);
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

  getAmount(){
    let data = {
      cplan: this.planFormGroup.get('cplan')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/premium-amount', data).subscribe((response: any) => {
      if (response.status) {
        this.montoTotal = response.data.mprima
        this.ubii = response.data.ccubii
        if(this.montoTotal){
          this.operationUbii();
          this.amountTotalRcv = true;
          this.calculationsPremiumsCascoTotal()
          if(this.vehicleFormGroup.get('xcobertura')?.value !== 'Rcv'){
            this.amountTotalCasco = true;
          }else{
            this.amountTotalCasco = false;
          }
        }else{
          this.amountTotalRcv = false;
        }
      }else{
        this.amountTotalRcv = false;
      }
    });
  }

  getAmountQuotes(){
    let data = {
      cplan: this.planFormGroup.get('cplan')?.value,
      ctarifa_exceso: this.vehicleFormGroup.get('ctarifa_exceso')?.value,
      npasajeros: this.vehicleFormGroup.get('npasajeros')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/premium-amount', data).subscribe((response: any) => {
      if (response.status) {
        this.ubii = response.data.ccubii
        if(this.montoTotal){
          this.operationUbii();
          this.amountTotalRcv = true;
          this.calculationsPremiumsCascoTotal()
          if(this.vehicleFormGroup.get('xcobertura')?.value !== 'Rcv'){
            this.amountTotalCasco = true;
          }else{
            this.amountTotalCasco = false;
          }
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
        if (this.xmetodologia !== 'ANUAL') {
          this.snackBar.open(`Lo sentimos, solo se puede colocar ${this.xmetodologia} cuando no sea RCV.`, '', {
            duration: 3000,
          });
          this.receiptFormGroup.get('cmetodologiapago')?.setValue('');
          this.methodOfPaymentControl.setValue('');
          this.buttonEmissions = false;
        } else {
          this.buttonEmissions = true;
        }
      } else {
        if (this.xmetodologia !== 'ANUAL') {
          this.snackBar.open(`Lo sentimos, solo se puede colocar ${this.xmetodologia} cuando no sea RCV.`, '', {
            duration: 3000,
          });
          this.receiptFormGroup.get('cmetodologiapago')?.setValue('');
          this.methodOfPaymentControl.setValue('');
          this.buttonEmissions = false;
        } else {
          this.buttonEmissions = true;
        }

        // this.buttonEmissions = false;
        // this.snackBar.open(`Lo sentimos, debe formalizar una modalidad de pago para emitir la póliza`, '', {
        //   duration: 3000,
        // });
      }
    }else{
      this.buttonEmissions = true;
    }

  }

  calculationsPremiumsCascoTotal() {
    const primaCascoControl = this.planFormGroup.get('mprima_casco_text');
    const primaBlindajeControl = this.planFormGroup.get('mprima_blindaje');
    const primaAditamentoControl = this.planFormGroup.get('mprima_aditamento');

    if(this.ccotizacion){

      let motin = parseFloat(this.primaMotin) 
      let riesgo = parseFloat(this.primaRiesgo) 
      let robo = parseFloat(this.primaRobo) 

      let resta = this.prima - motin - riesgo - robo - this.montoTotal

      this.planFormGroup.get('mprima_casco')?.setValue(resta.toString())

      this.primaFinal = this.prima;
    }else{
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
      } else {
        this.xprimaTotalCasco = 0;
      }
    }
  

  }

  searchQuotes(){
    let data = {
      ccotizacion: this.vehicleFormGroup.get('ccotizacion')?.value
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/search-quote', data).subscribe((response: any) => {
      if(response.status){
        this.activateBrandList = false;
        this.activateBrandText = true;
        this.personsFormGroup.get('xnombre')?.setValue(response.data.xnombre);
        this.personsFormGroup.get('xapellido')?.setValue(response.data.xapellido);
        this.personsFormGroup.get('email')?.setValue(response.data.email);
        this.vehicleFormGroup.get('xmarca')?.setValue(response.data.xmarca);
        this.planFormGroup.get('xcorredor')?.setValue(response.data.xcorredor);
        this.planFormGroup.get('xcorredor')?.disable()
        let eventB = {
          option: {
            value: this.vehicleFormGroup.get('xmarca')?.value
          }
        }
        this.onBrandSelection(eventB)
        this.vehicleFormGroup.get('xmodelo')?.setValue(response.data.xmodelo);
        let eventM = {
          option: {
            value: this.vehicleFormGroup.get('xmodelo')?.value
          }
        }
        this.onModelSelection(eventM)
        this.vehicleFormGroup.get('xversion')?.setValue(response.data.xversion);
        this.vehicleFormGroup.get('npasajeros')?.setValue(response.data.npasajeros);
        this.vehicleFormGroup.get('xcobertura')?.setValue(response.data.xcobertura);
        if(this.vehicleFormGroup.get('xcobertura')?.value == 'Rcv'){
          this.paymentButtons = true;
        }
        this.vehicleFormGroup.get('xcobertura')?.disable();
        this.onCoverageChange()
        this.vehicleFormGroup.get('fano')?.setValue(response.data.fano);
        this.vehicleFormGroup.get('fano')?.disable();
        this.planFormGroup.get('cplan')?.setValue(response.data.cplan);
        this.planFormGroup.get('ccorredor')?.setValue(response.data.ccorredor);
        let event = {
          option: {
            id: this.planFormGroup.get('cplan')?.value
          }
        }
        this.onPlanSelection(event)
        this.montoTotal = response.data.mtotal_rcv
      }
    })
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
          orderId: '1'
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
          "X-CLIENT-CHANNEL": "BTN-API",
          "Authorization": `Bearer ${this.currentUser.data.token}`
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
          cmetodologiapago: this.receiptFormGroup.get('cmetodologiapago')?.value,
          id_inma: this.vehicleFormGroup.get('id_inma')?.value,
          cuso: this.vehicleFormGroup.get('cuso')?.value,
          xuso: this.vehicleFormGroup.get('xuso')?.value,
          npesovacio: this.vehicleFormGroup.get('npesovacio')?.value,
          ncapcarga: this.vehicleFormGroup.get('ncapcarga')?.value,
          paditamento: this.planFormGroup.get('paditamento')?.value,
          msuma_aditamento: this.planFormGroup.get('msuma_aditamento')?.value,
          mprima_aditamento: this.planFormGroup.get('mprima_aditamento')?.value,
          cpais: 58,
          cusuario: this.currentUser.data.cusuario,
        }) 
      });
      let res = await response.json();
      if (res.data) {
        this.ccontratoflota = res.data.ccontratoflota;
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
          "CONTENT-TYPE": "Application/json",
          "Authorization": `Bearer ${this.currentUser.data.token}`
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
      cmetodologiapago: this.receiptFormGroup.get('cmetodologiapago')?.value,
      id_inma: this.vehicleFormGroup.get('id_inma')?.value,
      cuso: this.vehicleFormGroup.get('cuso')?.value,
      xuso: this.vehicleFormGroup.get('xuso')?.value,
      cpais: 58,
      cusuario: this.currentUser.data.cusuario,
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

  onFileSelected(event: any): void {
    const tipoRecibo = this.receiptFormGroup.get('irecibo')?.value;
  
    if (!tipoRecibo) {
      this.snackBar.open(`Lo sentimos, para realizar la carga de archivo por favor seleccione el Tipo de Recibo`, '', {
        duration: 3000,
      });
      
      // Restablecer la selección del archivo
      event.target.value = null;
      
      return; // Detener el proceso si no se selecciona un Tipo de Recibo
    }
  
    const file = event.target.files[0];
  
    if (!file) {
      return; // Detener el proceso si no se selecciona un archivo
    }
  
    Papa.parse(file, {
      header: true,
      //delimiter: [',', ';'],
      quoteChar: '"',
      complete: (result: any) => {
        const requiredHeaders: string[] = [
          "irif", "xcliente", "xrif_cliente", "xnombre", "xapellido", "icedula", "xcedula", "cmetodologiapago",
          "cplan_rc", "xserialcarroceria", "xserialmotor", "xplaca", "xmarca", "xmodelo", "xversion", "cano", "xcolor",
          "xcobertura", "msuma_aseg", "ptasa", "xdireccionfiscal", "xtelefono_emp",
          "email", "fdesde_pol", "fhasta_pol", "ccorredor", "cestado", "cciudad", "xzona_postal"
      ];

      let csvHeaders: string[] = Object.keys(result.data[0]);
      let error = "";

      // Convertir todos los encabezados a minúsculas para hacer la comparación insensible a mayúsculas y minúsculas
      const lowerCaseRequiredHeaders = requiredHeaders.map(header => header.toLowerCase());
      const lowerCaseCsvHeaders = csvHeaders.map(header => header.toLowerCase());

      // Verificar si todos los encabezados requeridos están presentes
      const missingHeaders = lowerCaseRequiredHeaders.filter(header => !lowerCaseCsvHeaders.includes(header));
      if (missingHeaders.length > 0) {
          error = `Error: El archivo no incluye todos los atributos necesarios. Faltan los siguientes campos: ${missingHeaders.join(', ')}`;
      }

      // Verificar si hay encabezados adicionales en el archivo
      const extraHeaders = lowerCaseCsvHeaders.filter(header => !lowerCaseRequiredHeaders.includes(header));
      if (extraHeaders.length > 0) {
          error = `Error: El archivo incluye atributos adicionales. Elimine los siguientes campos: ${extraHeaders.join(', ')}`;
      }

      if (error) {
          window.alert(error)
          location.reload()
          return;
      }
      
    this.dataList = result.data.slice(0, result.data.length - 1).map((item: CsvItem) => {
        const msuma_aseg = parseFloat(item.MSUMA_ASEG.replace(',', '.'));
        const ptasa = parseFloat(item.PTASA.replace(',', '.'));
    
        const mprima = (msuma_aseg * ptasa) / 100;
    
        return {
            irif: item.IRIF,
            xcliente: item.XCLIENTE,
            xrif_cliente: item.XRIF_CLIENTE,
            id_inma: item.ID_INMA,
            xnombre: item.XNOMBRE,
            xapellido: item.XAPELLIDO,
            icedula: item.ICEDULA,
            xcedula: item.XCEDULA,
            cmetodologiapago: parseInt(item.CMETODOLOGIAPAGO),
            cplan_rc: parseInt(item.CPLAN_RC),
            xserialcarroceria: item.XSERIALCARROCERIA,
            xserialmotor: item.XSERIALMOTOR,
            xplaca: item.XPLACA,
            xmarca: item.XMARCA,
            xmodelo: item.XMODELO,
            xversion: item.XVERSION,
            cano: parseInt(item.CANO),
            xcolor: item.XCOLOR,
            xcobertura: item.XCOBERTURA,
            pcasco: ptasa,
            msuma_aseg: msuma_aseg,
            mprima_bruta: mprima,
            mprima_casco: mprima,
            xdireccionfiscal: item.XDIRECCIONFISCAL,
            xtelefono_emp: item.XTELEFONO_EMP,
            email: item.EMAIL,
            fdesde_pol: item.FDESDE_POL,
            fhasta_pol: item.FHASTA_POL,
            ccorredor: parseInt(item.CCORREDOR),
            cestado: parseInt(item.CESTADO),
            cciudad: parseInt(item.CCIUDAD),
            xzona_postal: item.XZONA_POSTAL,
        };
    });
          
        this.groupList = this.dataList;
        this.dataSource = new MatTableDataSource<any>(this.groupList);
        this.dataSource.paginator = this.paginatorGroup;
        this.activateGroup = true;
      },
      error: (error: any) => {
        console.error('Error al analizar el archivo CSV:', error);
      }
    });
  }
  
  Alert(): void {
    const dialogRef = this.dialog.open(this.alertConfirmation);
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if (result === 'confirm') {
        this.onSubmitGroup();
      }
    });
  }

  onSubmitGroup(){
    let data = {
      group: this.groupList
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/group', data).subscribe((response: any) => {
      if(response.status){
        if (window.confirm("¡La Flota se ha cargado exitosamente!... ¿Deseas Consultar esa Flota?")) {
          this.router.navigate(['/policy/automobile-policy']);
        } else {
          location.reload();
        }
      }
    })
  }
}
