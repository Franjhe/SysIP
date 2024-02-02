import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { from, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfGenerationService } from '../../../_services/ServicePDF'

@Component({
  selector: 'app-automobile-quotes',
  templateUrl: './automobile-quotes.component.html',
  styleUrls: ['./automobile-quotes.component.scss']
})
export class AutomobileQuotesComponent {

  @ViewChild("coverageModal") private coverageModal!: TemplateRef<any>;

  isActive: boolean = false;
  public isYearValid: boolean = false;
  currentUser!: any
  token!: any;
  tokenphp!: any;
  cusuario!: string;

  brandList: any[] = [];
  modelList: any[] = [];
  versionList: any[] = [];
  ratesList: any[] = [];
  quotesList: any[] = [];
  coverageListRcv: any[] = [];
  coverageListAmplia: any[] = [];
  coverageListPerdida: any[] = [];
  allCoverages: any[] = [];
  brokerList: any[] = [];
  dataVehicle!: {}

  brandControl = new FormControl('');
  modelControl = new FormControl('');
  versionControl = new FormControl('');
  ratesControl = new FormControl('');
  brokerControl = new FormControl('');

  filteredBrand!: Observable<string[]>;
  filteredModel!: Observable<string[]>;
  filteredVersion!: Observable<string[]>;
  filteredRates!: Observable<string[]>;
  filteredBroker!: Observable<string[]>;

  vector: boolean = true;
  loading: boolean = false;
  buttonQuotes: boolean = false;
  activateRate: boolean = false;
  distributionCard: boolean = false;
  quotesBoolean: boolean = true;
  check: boolean = false;
  brcv: boolean = false;
  bamplia: boolean = false;
  bperdida: boolean = false;
  tasas: boolean = false;

  cotizacion!: any;
  nombreCompleto!: any;
  vehiculo!: any;
  version!: any;
  bcv!: any;
  plan!: any;
  montoRCV!: any;
  montoAmplia!: any;
  montoPerdida!: any;
  planPdf!: any;
  xcorredor!: any;
  xtelefonocorredor!: any;
  xcorreocorredor!: any;
  pcasco!: any
  pperdida!: any
  ccorredor!: any
  cagencia!: any
  cproductor!: any

  quotesForm = this._formBuilder.group({
    xmarca: ['', Validators.required],
    xmodelo: ['', Validators.required],
    xversion: ['', Validators.required],
    fano: ['', Validators.required],
    xnombre: ['', Validators.required],
    xapellido: ['', Validators.required],
    email: ['', Validators.required],
    msuma_aseg: [''],
    ctarifa_exceso: [''],
    xclasificacion: [''],
    npasajeros: [''],
    id_inma: [''],
    ccorredor: [''],
    xcorredor: [''],
    pcasco: [''],
    pperdida: [''],
  });

  constructor(private _formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private modalService: NgbModal,
              private pdfGenerationService: PdfGenerationService,
              private router: Router,
              private route: ActivatedRoute,
            ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.cusuario = params['cusuario'];
      this.tokenphp = params['token'];
      this.ccorredor = params['ccorredor'];
      this.xcorredor = params['xcorredor'];
      this.cagencia = params['cagencia'];
      this.cproductor = params['cproductor'];
    });

    const storedSession = localStorage.getItem('user');

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
      .then((response) => response.json())
      .then(data => {
        this.bcv = data.monitors.usd.price;

        if (this.cusuario) {
          console.log('pasa por usuario php')
          let token = {
            status: true,
            message: "Usuario Autenticado",
            data: {
              bconsultar: false,
              bcrear: true,
              beliminar: false,
              bmodificar: false,
              ccorredor: parseInt(this.ccorredor),
              cdepartamento: 4,
              crol: 6,
              cusuario: parseInt(this.cusuario),
              token: this.tokenphp,
              xcorredor: this.xcorredor,
              cagencia: this.cagencia,
              cproductor: this.cproductor,
            }
          }
          let tokenString = JSON.stringify(token);
          localStorage.setItem('user', tokenString);
        
          if(storedSession){
            this.currentUser = JSON.parse(storedSession);
          }else{
            this.currentUser = JSON.parse(tokenString);
          }
        } else {
          if(storedSession){
            this.currentUser = JSON.parse(storedSession);
          }else{
            this.token = localStorage.getItem('user');
            this.currentUser = JSON.parse(this.token);
          }
        }
        console.log(this.currentUser)
        if (this.currentUser) {
          this.getBroker();
        }
      });
  }


  changeYears() {
    const fanoControl = this.quotesForm.get('fano');

    if (fanoControl && fanoControl.value) {
      const fanoValue = parseInt(fanoControl.value, 10);

      if (fanoValue > 2021) {
        this.snackBar.open(`No puedes colocar un año mayor al 2021. Por favor, vuelve a intentarlo`, '', {
          duration: 5000,
        });
        this.quotesForm.get('fano')?.setValue('')
      } else if (fanoValue < 1980) {
        this.snackBar.open(`No puedes colocar un año menor a 1980. Por favor, vuelve a intentarlo`, '', {
          duration: 5000,
        });
        this.quotesForm.get('fano')?.setValue('')
      } else {
        this.getBrand()
      }
    }
  }

  getBrand() {
    let data = {
      qano: this.quotesForm.get('fano')?.value
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
      this.quotesForm.get('xmarca')?.setValue(selectedBrand.value);
      this.getModel();
    }
  }

  getModel() {
    let data = {
      qano: this.quotesForm.get('fano')?.value,
      xmarca: this.quotesForm.get('xmarca')?.value,
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
      this.quotesForm.get('xmodelo')?.setValue(selectedModel.value);
      this.getVersion();
    }
  }

  getVersion() {
    let data = {
      qano: this.quotesForm.get('fano')?.value,
      xmarca: this.quotesForm.get('xmarca')?.value,
      xmodelo: this.quotesForm.get('xmodelo')?.value,
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
      this.quotesForm.get('xversion')?.setValue(selectedVersion.value);
      this.quotesForm.get('ctarifa_exceso')?.setValue(selectedVersion.ctarifa_exceso);
      this.quotesForm.get('id_inma')?.setValue(selectedVersion.id_inma);
      this.quotesForm.get('msuma_aseg')?.setValue(selectedVersion.msum);
      this.quotesForm.get('xclasificacion')?.setValue(selectedVersion.cclasificacion);
      this.getHullPrice()
      this.quotesForm.get('npasajeros')?.setValue(selectedVersion.npasajero);

      if (!this.quotesForm.get('ctarifa_exceso')?.value) {
        this.activateRate = true;
        this.getRates();
      } else {
        this.activateRate = false;
      }
    }
  }

  getBroker() {
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].cproductor,
            value: response.data.broker[i].xintermediario,
          });
        }
        if (this.currentUser.data.xcorredor) {
          this.quotesForm.get('ccorredor')?.setValue(this.currentUser.data.ccorredor);
          this.quotesForm.get('xcorredor')?.setValue(this.currentUser.data.xcorredor);
          this.quotesForm.get('xcorredor')?.disable();
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
      this.quotesForm.get('ccorredor')?.setValue(selectedBroker.id);
      this.quotesForm.get('xcorredor')?.setValue(selectedBroker.value);
    }
  }

  getRates() {
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
      this.quotesForm.get('ctarifa_exceso')?.setValue(selectedRates.id);
      this.activateRate = false;
    }
  }


  validateForm() {
    if (this.quotesForm.invalid) {
      this.buttonQuotes = false;
    } else {
      this.buttonQuotes = true;
    }
  }

  getHullPrice() {
    if (this.currentUser.data.crol == 5) {
      this.tasas = true;
      let data = {
        cano: this.quotesForm.get('fano')?.value,
        xclase: this.quotesForm.get('xclasificacion')?.value,
      };
      this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/hull-price', data).subscribe((response: any) => {
        if (response.status) {
          this.pcasco = response.data.ptasa_casco;
          this.pperdida = response.data.pperdida_total;
        }
      })
    } else {
      this.tasas = false;
    }

  }

  onSubmit() {
    this.loading = true;
    this.buttonQuotes = false;

    let data = {
      id_inma: this.quotesForm.get('id_inma')?.value,
      fano: this.quotesForm.get('fano')?.value,
      xnombre: this.quotesForm.get('xnombre')?.value?.toUpperCase(),
      xapellido: this.quotesForm.get('xapellido')?.value?.toUpperCase(),
      email: this.quotesForm.get('email')?.value?.toUpperCase(),
      ctarifa_exceso: this.quotesForm.get('ctarifa_exceso')?.value,
      msum: this.quotesForm.get('msuma_aseg')?.value,
      xclasificacion: this.quotesForm.get('xclasificacion')?.value,
      ncapacidad_p: this.quotesForm.get('npasajeros')?.value,
      ccorredor: this.quotesForm.get('ccorredor')?.value,
    }

    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/create', data).subscribe((response: any) => {
      if (response.status) {
        this.vector = false;
        this.distributionCard = true;
        this.loading = false;
        this.quotesBoolean = true;
        this.quotesList = response.data.list.result;
        this.quotesList.sort((a, b) => a.xplan_rc > b.xplan_rc ? 1 : -1);

        this.nombreCompleto = data.xnombre + ' ' + data.xapellido;
        this.vehiculo = this.quotesForm.get('xmarca')?.value + ' ' + this.quotesForm.get('xmodelo')?.value;
        this.cotizacion = response.data.list.result[0].ccotizacion;
        this.version = this.quotesForm.get('xversion')?.value

        const fanoValue = this.quotesForm.get('fano')?.value;
        this.isYearValid = fanoValue !== null && fanoValue !== undefined && parseInt(fanoValue, 10) >= 2007;

        this.xcorredor = response.data.list.result[0].xcorredor
        this.xcorreocorredor = response.data.list.result[0].xcorreocorredor
        this.xtelefonocorredor = response.data.list.result[0].xtelefonocorredor
      }
    })
  }

  openCoverages(quotes: any) {
    const modalRef = this.modalService.open(this.coverageModal, { centered: true, size: 'lg' });

    this.montoRCV = quotes.mtotal_rcv;
    this.montoAmplia = quotes.mtotal_amplia;
    this.montoPerdida = quotes.mtotal_perdida;
    this.planPdf = quotes.cplan_rc

    this.dataVehicle = {
      xmarca: this.quotesForm.get('xmarca')?.value,
      xmodelo: this.quotesForm.get('xmodelo')?.value,
      xversion: this.quotesForm.get('xversion')?.value,
      npasajeros: this.quotesForm.get('npasajeros')?.value,
      fano: this.quotesForm.get('fano')?.value,
      xusuario: this.quotesForm.get('xnombre')?.value + ' ' + this.quotesForm.get('xapellido')?.value,
      xcorreo: this.quotesForm.get('email')?.value
    }
    this.searchCoverages();
  }

  searchCoverages() {
    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/search-coverages', null).subscribe((response: any) => {
      if (response.status) {
        this.coverageListRcv = response.data.rcv
        this.coverageListAmplia = response.data.amplia
        this.coverageListPerdida = response.data.perdida
        this.allCoverages = response.data.allCoverages

        this.coverageListRcv.sort((a, b) => a.corden > b.corden ? 1 : -1);
        this.coverageListAmplia.sort((a, b) => a.corden > b.corden ? 1 : -1);
        this.coverageListPerdida.sort((a, b) => a.corden > b.corden ? 1 : -1);
      }
    })
  }

  onQuotePdf() {
    const observable = from(this.pdfGenerationService.LoadDataQuotes(this.cotizacion, this.montoRCV, this.montoAmplia, this.montoPerdida, this.allCoverages, this.planPdf, this.dataVehicle, this.quotesForm.get('fano')?.value, this.xcorredor, this.xcorreocorredor, this.xtelefonocorredor));

    observable.subscribe(
      (data) => {
      },
      (error) => {
        console.log(error)
      }
    );
  }

  onToggle(cobertura: string, plan: number) {
    if (cobertura == 'Rcv') {
      this.brcv = true;
      this.bamplia = false;
      this.bperdida = false;
    } else if (cobertura == 'Cobertura Amplia') {
      this.brcv = false;
      this.bamplia = true;
      this.bperdida = false;
    } else if (cobertura == 'Perdida Total') {
      this.brcv = false;
      this.bamplia = false;
      this.bperdida = true;
    }

    this.plan = plan;
    this.selectedPlan()
  }

  selectedPlan() {
    this.quotesBoolean = false;
    this.isActive = true
    this.loading = true;

    let data = {
      ccotizacion: this.cotizacion,
      cplan_rc: this.plan,
      brcv: this.brcv,
      bamplia: this.bamplia,
      bperdida: this.bperdida,
      iaceptado: true
    }

    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/update', data).subscribe((response: any) => {
      if (response.status) {
        this.loading = false;
        this.check = true;

        const navigationExtras: NavigationExtras = {
          queryParams: {
            cotizacion: this.cotizacion,
            fano: this.quotesForm.get('fano')?.value,
            cplan: this.plan,
            ctarifa_exceso: this.quotesForm.get('ctarifa_exceso')?.value,
            ccorredor: this.currentUser.data.ccorredor
          }
        };

        if(this.bamplia || this.bperdida){
          if(this.currentUser.data.ccorredor){
            window.alert('¡Se ha cotizado exitosamente!');
            location.reload();
          }else{
            if (window.confirm("¡Se ha cotizado exitosamente!... ¿Desea Emitir la Cotización?")) {
              this.router.navigate(['/emissions/automobile'], navigationExtras);
            } else {
              location.reload();
            }
          }
        }else{
          if (window.confirm("¡Se ha cotizado exitosamente!... ¿Desea Emitir la Cotización?")) {
            this.router.navigate(['/emissions/automobile'], navigationExtras);
          } else {
            location.reload();
          }
        }
      }
    })
  }

}
