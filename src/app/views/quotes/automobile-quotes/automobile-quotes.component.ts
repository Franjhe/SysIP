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
  @ViewChild("updateSAModal") private updateSAModal!: TemplateRef<any>;

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
  notUpdate: boolean = false;

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
  xcorreo_emisor!: any
  sumaAseguradaInicial!: any
  descuento!: any;
  recargo!: any
  sumaAseguradaMax!: any;
  sumaAseguradaMin!: any;
  primaFinal!: any;

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
    pdescuento: [''],
    precarga: [''],
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
      this.xcorreo_emisor = params['correo'];
    });

    const storedSession = localStorage.getItem('user');

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
      .then((response) => response.json())
      .then(data => {
        this.bcv = data.monitors.usd.price;

        if (this.cusuario) {
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
        if (this.currentUser) {
          this.getBroker();
        }
      });

      // if (this.cusuario) {
      //   let token = {
      //     status: true,
      //     message: "Usuario Autenticado",
      //     data: {
      //       bconsultar: false,
      //       bcrear: true,
      //       beliminar: false,
      //       bmodificar: false,
      //       ccorredor: parseInt(this.ccorredor),
      //       cdepartamento: 4,
      //       crol: 6,
      //       cusuario: parseInt(this.cusuario),
      //       token: this.tokenphp,
      //       xcorredor: this.xcorredor,
      //       cagencia: this.cagencia,
      //       cproductor: this.cproductor,
      //     }
      //   }
      //   let tokenString = JSON.stringify(token);
      //   localStorage.setItem('user', tokenString);
      
      //   if(storedSession){
      //     this.currentUser = JSON.parse(storedSession);
      //   }else{
      //     this.currentUser = JSON.parse(tokenString);
      //   }
      // } else {
      //   if(storedSession){
      //     this.currentUser = JSON.parse(storedSession);
      //   }else{
      //     this.token = localStorage.getItem('user');
      //     this.currentUser = JSON.parse(this.token);
      //   }
      // }
      // console.log(this.currentUser)
      // if (this.currentUser) {
      //   this.getBroker();
      // }
  }


  changeYears() {
    const fanoControl = this.quotesForm.get('fano');

    if (fanoControl && fanoControl.value) {
      this.getBrand()
      this.snackBar.open(`Si el vehículo no existe por favor localice al ejecutivo comercial para regularizar esa incidencia`, '', {
        duration: 4000,
      });
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
      this.searchRates();
      this.getHullPrice();
      this.quotesForm.get('npasajeros')?.setValue(selectedVersion.npasajero);

      if (!this.quotesForm.get('ctarifa_exceso')?.value) {
        this.activateRate = true;
        this.getRates();
      } else {
        this.activateRate = false;
      }
    }
    this.sumaAseguradaInicial = selectedVersion.msum;
  }

  searchRates(){
    let data = {
      cano: this.quotesForm.get('fano')?.value,
      xclase: this.quotesForm.get('xclasificacion')?.value,
    }
    this.http.post(environment.apiUrl + '/api/v1/emissions/automobile/search-rates', data).subscribe((response: any) => {
      if(response.casco){
        this.isYearValid = response.casco
      }else{
        this.snackBar.open(`${response.message}`, '', {
          duration: 4000,
        });
        this.isYearValid = response.casco
      }
    })
  }

  getBroker() {
    this.http.post(environment.apiUrl + '/api/v1/valrep/brokers', null).subscribe((response: any) => {
      if (response.data.broker) {
        for (let i = 0; i < response.data.broker.length; i++) {
          this.brokerList.push({
            id: response.data.broker[i].cproductor,
            value: response.data.broker[i].xproductor,
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

      console.log(this.brokerList)
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

    let xtipo;
    const ctarifa_exceso = this.quotesForm.get('ctarifa_exceso')?.value;

    if (ctarifa_exceso !== null && ctarifa_exceso !== undefined) {
      const parsedValue = parseInt(ctarifa_exceso, 10);
    
      if (!isNaN(parsedValue) && parsedValue === 20) {
        xtipo = 'M';
      } else {
        xtipo = 'V';
      }
    }

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
      xtipo: xtipo
    }

    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/create', data).subscribe((response: any) => {
      if (response.status) {
        this.vector = false;
        this.distributionCard = true;
        this.loading = false;
        this.quotesBoolean = true;
        this.quotesList = response.data.list.result;
        console.log(this.quotesList)
        this.quotesList.sort((a, b) => a.cplan_rc > b.cplan_rc ? 1 : -1);

        this.nombreCompleto = data.xnombre + ' ' + data.xapellido;
        this.vehiculo = this.quotesForm.get('xmarca')?.value + ' ' + this.quotesForm.get('xmodelo')?.value;
        this.cotizacion = response.data.list.result[0].ccotizacion;
        this.version = this.quotesForm.get('xversion')?.value

        const fanoValue = this.quotesForm.get('fano')?.value;
        // this.isYearValid = fanoValue !== null && fanoValue !== undefined && parseInt(fanoValue, 10) >= 2007;

        this.xcorredor = response.data.list.result[0].xcorredor
        this.xcorreocorredor = response.data.list.result[0].xcorreocorredor
        this.xtelefonocorredor = response.data.list.result[0].xtelefonocorredor
      
        if(this.currentUser.data.ccorredor){
          this.notUpdate = false;
        }else{
          this.notUpdate = true;
        }


        if(this.xcorreo_emisor){
          let data2 = {
            name: this.quotesForm.get('xnombre')?.value?.toUpperCase(),
            last_name: this.quotesForm.get('xapellido')?.value?.toUpperCase(),
            email: this.quotesForm.get('email')?.value?.toUpperCase(),
            email_user: this.xcorreo_emisor
          }
          this.http.post('https://api.lamundialdeseguros.com/get_quote/', data2).subscribe((response: any) => {
            // console.log(response.status)
          })
        }

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

  updateSA() {
    const modalRef = this.modalService.open(this.updateSAModal, { centered: true, size: 'lg' });
  
    modalRef.result.then((result) => {
      if (result === 'result') {
        let recarga = this.quotesForm.get('precarga')?.value
        let descuento = this.quotesForm.get('pdescuento')?.value
        if(recarga){
          this.quotesList.forEach(quote => {
            const recargaPorcentaje = parseFloat(recarga || '');
            const recargaDecimal = recargaPorcentaje / 100;
        
            const mtotal_rcv = parseFloat(quote.mtotal_rcv);
            const mtotal_amplia = parseFloat(quote.mtotal_amplia);
            const mtotal_perdida = parseFloat(quote.mtotal_perdida);
        
            // Comprobación de valores numéricos
            if (!isNaN(mtotal_rcv) && !isNaN(mtotal_amplia) && !isNaN(mtotal_perdida)) {
                // Realizar los cálculos necesarios para cada objeto
                let mtotalAmpliaNuevo = mtotal_amplia - mtotal_rcv;
                let mtotalPerdidaNuevo = mtotal_perdida - mtotal_rcv;
        
                // Aplicar el descuento al resultado de la resta
                mtotalAmpliaNuevo *= (1 + recargaDecimal);
                mtotalPerdidaNuevo *= (1 + recargaDecimal);
        
                // Sumar nuevamente mtotal_rcv al resultado del descuento
                let mtotalamplia = mtotalAmpliaNuevo + mtotal_rcv;
                let mtotalperdida = mtotalPerdidaNuevo + mtotal_rcv;
        
                // Asignar los nuevos valores al objeto original
                quote.mtotal_amplia = mtotalamplia.toFixed(2);
                quote.mtotal_perdida = mtotalperdida.toFixed(2);
            }
          });
          this.updatePremiums()
        }else if(descuento){
          this.quotesList.forEach(quote => {
            const descuentoPorcentaje = parseFloat(descuento || '');
            const descuentoDecimal = descuentoPorcentaje / 100;
        
            const mtotal_rcv = parseFloat(quote.mtotal_rcv);
            const mtotal_amplia = parseFloat(quote.mtotal_amplia);
            const mtotal_perdida = parseFloat(quote.mtotal_perdida);
        
            // Comprobación de valores numéricos
            if (!isNaN(mtotal_rcv) && !isNaN(mtotal_amplia) && !isNaN(mtotal_perdida)) {
                // Realizar los cálculos necesarios para cada objeto
                let mtotalAmpliaNuevo = mtotal_amplia - mtotal_rcv;
                let mtotalPerdidaNuevo = mtotal_perdida - mtotal_rcv;
        
                // Aplicar el descuento al resultado de la resta
                mtotalAmpliaNuevo *= (1 - descuentoDecimal);
                mtotalPerdidaNuevo *= (1 - descuentoDecimal);
        
                // Sumar nuevamente mtotal_rcv al resultado del descuento
                let mtotalamplia = mtotalAmpliaNuevo + mtotal_rcv;
                let mtotalperdida = mtotalPerdidaNuevo + mtotal_rcv;
        
                // Asignar los nuevos valores al objeto original
                quote.mtotal_amplia = mtotalamplia.toFixed(2);
                quote.mtotal_perdida = mtotalperdida.toFixed(2);
            }
          });
          this.updatePremiums()
        }else{
          this.quotesList.forEach(quote => {
            const mtotal_rcv = parseFloat(quote.mtotal_rcv);
            const tasa_amplia = parseFloat(quote.pcobertura_amplia);
            const tasa_perdida = parseFloat(quote.pperdida_total);

            if(this.quotesForm.get('msuma_aseg')?.value == null || this.quotesForm.get('msuma_aseg')?.value == undefined){
              this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial)
            }

            const suma_aseg = parseFloat(this.quotesForm.get('msuma_aseg')?.value || '');

            let max = this.sumaAseguradaInicial * 0.30
            let min = this.sumaAseguradaInicial * 0.10

            let MaxSum = this.sumaAseguradaInicial + max;
            let MinSum = this.sumaAseguradaInicial - min;

            this.sumaAseguradaMax = MaxSum.toFixed(2)
            this.sumaAseguradaMin = MinSum.toFixed(2)

            if(suma_aseg > this.sumaAseguradaMax){
              this.snackBar.open('La Suma Asegurada excedió el 30%.', '', {
                duration: 5000,
              });
    
              this.quotesForm.get('msuma_aseg')?.setValue(suma_aseg.toString());
              return
            }else{

              const calculoCA = suma_aseg * tasa_amplia / 100;
              const calculoPE = suma_aseg * tasa_perdida / 100;
  
              const sumaCA = calculoCA + mtotal_rcv;
              const sumaPE = calculoPE + mtotal_rcv;
  
              quote.mtotal_amplia = sumaCA.toFixed(2);
              quote.mtotal_perdida = sumaPE.toFixed(2);
            }

            if(suma_aseg < this.sumaAseguradaMin){
              this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
                duration: 5000,
              });
    
              this.quotesForm.get('msuma_aseg')?.setValue(suma_aseg.toString());
              return
            }else{
              const pcatastrofico = 0.10;
              const msumaAsegRobo = 600;
              const probo = 4.48;
              const pmotinCA = 0.88;
              const pmotinPE = 0.59;

              const calculoCA = suma_aseg * tasa_amplia / 100;
              const calculoPE = suma_aseg * tasa_perdida / 100;

              const motinCA = (suma_aseg * pmotinCA) / 100;
              const motinPE = (suma_aseg * pmotinPE) / 100;
              const catastrofico = (suma_aseg * pcatastrofico) / 100;
              const robo = (msumaAsegRobo * probo) / 100;

              const CA = motinCA + catastrofico + robo;
              const PE = motinPE + catastrofico + robo;

              const resultCA = calculoCA + CA
              const resultPE = calculoPE + PE
  
              const sumaCA = resultCA + mtotal_rcv;
              const sumaPE = resultPE + mtotal_rcv;
  
              quote.mtotal_amplia = sumaCA.toFixed(2);
              quote.mtotal_perdida = sumaPE.toFixed(2);
            }


          })
          this.updatePremiums()
        }
      }
    }).catch((reason) => {
      // Manejar errores aquí
    });
}

  getDiscount() {
    const descuento = this.quotesForm.get('pdescuento')?.value;
    const sum_aseg = this.quotesForm.get('msuma_aseg')?.value

    if (descuento) {
        if (typeof descuento === 'number') {

            if(this.currentUser.data.crol === 8){
              if(descuento > 20){
                window.alert('No se puede hacer un descuento de más del 20%');
                this.quotesForm.get('pdescuento')?.setValue('');
                this.quotesForm.get('precarga')?.enable();
                if (sum_aseg !== undefined) {
                  this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg);
                }
              }else{
                this.quotesForm.get('precarga')?.disable();
                if (sum_aseg !== undefined) {
                  this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg);
                }
              }
            }else{
              this.quotesForm.get('precarga')?.disable();
              if (sum_aseg !== undefined) {
                this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg);
              }
            }
            return sum_aseg;
        } else {
            return 0;
        }
    } else {
        this.quotesForm.get('precarga')?.enable();
        // this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial)

        return 0;
    }
    
  }

  getRecharge(){
    const recarga = this.quotesForm.get('precarga')?.value;
    const sum_aseg = this.quotesForm.get('msuma_aseg')?.value || ''
    
    if (recarga) {
        if (typeof recarga === 'number') {
            if(recarga == 0 || recarga == null){
              this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg)
            }

            if(this.currentUser.data.crol === 8){
              if(recarga > 20){
                window.alert('No se puede hacer una recarga de más del 20%');
                this.quotesForm.get('precarga')?.setValue('');
                this.quotesForm.get('pdescuento')?.enable();
                if (sum_aseg !== undefined) {
                  this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg);
                }
              }else{
                if (sum_aseg !== undefined) {
                  this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg);
                }
                this.quotesForm.get('pdescuento')?.disable();
              }
            }else{
              if (sum_aseg !== undefined) {
                this.quotesForm.get('msuma_aseg')?.setValue(sum_aseg);
              }
              this.quotesForm.get('pdescuento')?.disable();
            }
            this.recargo = sum_aseg
            
            return sum_aseg;
        } else {
            return 0;
        }
    } else {
        this.quotesForm.get('pdescuento')?.enable();
        // this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial)

        return 0;
    }
  }

  getSum(){
    if(this.quotesForm.get('msuma_aseg')?.value == null || this.quotesForm.get('msuma_aseg')?.value == undefined){
      this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial)
    }

    const suma_aseg = parseFloat(this.quotesForm.get('msuma_aseg')?.value || '');

    let max = this.sumaAseguradaInicial * 0.30
    let min = this.sumaAseguradaInicial * 0.10

    let MaxSum = this.sumaAseguradaInicial + max;
    let MinSum = this.sumaAseguradaInicial - min;

    this.sumaAseguradaMax = MaxSum.toFixed(2)
    this.sumaAseguradaMin = MinSum.toFixed(2)

    if(suma_aseg > this.sumaAseguradaMax){
      window.alert('La Suma Asegurada excedió el 30% de inma.');
      this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial);
      return
    }else{
      this.estoEsFeoperoFunciona()
    }

    if(suma_aseg < this.sumaAseguradaMin){
      window.alert('La Suma Asegurada es menor al 10% de inma.');
      this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial);
      return
    }else{
      this.estoEsFeoperoFunciona()
    }
  }

  estoEsFeoperoFunciona(){
    let recarga = this.quotesForm.get('precarga')?.value
    let descuento = this.quotesForm.get('pdescuento')?.value
    if(recarga){
      this.quotesList.forEach(quote => {
        const recargaPorcentaje = parseFloat(recarga || '');
        const recargaDecimal = recargaPorcentaje / 100;
    
        const mtotal_rcv = parseFloat(quote.mtotal_rcv);
        const mtotal_amplia = parseFloat(quote.mtotal_amplia);
        const mtotal_perdida = parseFloat(quote.mtotal_perdida);
    
        // Comprobación de valores numéricos
        if (!isNaN(mtotal_rcv) && !isNaN(mtotal_amplia) && !isNaN(mtotal_perdida)) {
            // Realizar los cálculos necesarios para cada objeto
            let mtotalAmpliaNuevo = mtotal_amplia - mtotal_rcv;
            let mtotalPerdidaNuevo = mtotal_perdida - mtotal_rcv;
    
            // Aplicar el descuento al resultado de la resta
            mtotalAmpliaNuevo *= (1 + recargaDecimal);
            mtotalPerdidaNuevo *= (1 + recargaDecimal);
    
            // Sumar nuevamente mtotal_rcv al resultado del descuento
            let mtotalamplia = mtotalAmpliaNuevo + mtotal_rcv;
            let mtotalperdida = mtotalPerdidaNuevo + mtotal_rcv;
    
            // Asignar los nuevos valores al objeto original
            quote.mtotal_amplia = mtotalamplia.toFixed(2);
            quote.mtotal_perdida = mtotalperdida.toFixed(2);
        }
      });
      this.updatePremiums()
    }else if(descuento){
      this.quotesList.forEach(quote => {
        const descuentoPorcentaje = parseFloat(descuento || '');
        const descuentoDecimal = descuentoPorcentaje / 100;
    
        const mtotal_rcv = parseFloat(quote.mtotal_rcv);
        const mtotal_amplia = parseFloat(quote.mtotal_amplia);
        const mtotal_perdida = parseFloat(quote.mtotal_perdida);
    
        // Comprobación de valores numéricos
        if (!isNaN(mtotal_rcv) && !isNaN(mtotal_amplia) && !isNaN(mtotal_perdida)) {
            // Realizar los cálculos necesarios para cada objeto
            let mtotalAmpliaNuevo = mtotal_amplia - mtotal_rcv;
            let mtotalPerdidaNuevo = mtotal_perdida - mtotal_rcv;
    
            // Aplicar el descuento al resultado de la resta
            mtotalAmpliaNuevo *= (1 - descuentoDecimal);
            mtotalPerdidaNuevo *= (1 - descuentoDecimal);
    
            // Sumar nuevamente mtotal_rcv al resultado del descuento
            let mtotalamplia = mtotalAmpliaNuevo + mtotal_rcv;
            let mtotalperdida = mtotalPerdidaNuevo + mtotal_rcv;
    
            // Asignar los nuevos valores al objeto original
            quote.mtotal_amplia = mtotalamplia.toFixed(2);
            quote.mtotal_perdida = mtotalperdida.toFixed(2);
        }
      });
      this.updatePremiums()
    }else{
      this.quotesList.forEach(quote => {
        const mtotal_rcv = parseFloat(quote.mtotal_rcv);
        const tasa_amplia = parseFloat(quote.pcobertura_amplia);
        const tasa_perdida = parseFloat(quote.pperdida_total);

        if(this.quotesForm.get('msuma_aseg')?.value == null || this.quotesForm.get('msuma_aseg')?.value == undefined){
          this.quotesForm.get('msuma_aseg')?.setValue(this.sumaAseguradaInicial)
        }

        const suma_aseg = parseFloat(this.quotesForm.get('msuma_aseg')?.value || '');

        let max = this.sumaAseguradaInicial * 0.30
        let min = this.sumaAseguradaInicial * 0.10

        let MaxSum = this.sumaAseguradaInicial + max;
        let MinSum = this.sumaAseguradaInicial - min;

        this.sumaAseguradaMax = MaxSum.toFixed(2)
        this.sumaAseguradaMin = MinSum.toFixed(2)

        if(suma_aseg > this.sumaAseguradaMax){
          this.snackBar.open('La Suma Asegurada excedió el 30%.', '', {
            duration: 5000,
          });

          this.quotesForm.get('msuma_aseg')?.setValue(suma_aseg.toString());
          return
        }else{

          const calculoCA = suma_aseg * tasa_amplia / 100;
          const calculoPE = suma_aseg * tasa_perdida / 100;

          const sumaCA = calculoCA + mtotal_rcv;
          const sumaPE = calculoPE + mtotal_rcv;

          quote.mtotal_amplia = sumaCA.toFixed(2);
          quote.mtotal_perdida = sumaPE.toFixed(2);
        }

        if(suma_aseg < this.sumaAseguradaMin){
          this.snackBar.open('La Suma Asegurada es menor al 10%.', '', {
            duration: 5000,
          });

          this.quotesForm.get('msuma_aseg')?.setValue(suma_aseg.toString());
          return
        }else{
          const pcatastrofico = 0.10;
          const msumaAsegRobo = 600;
          const probo = 4.48;
          const pmotinCA = 0.88;
          const pmotinPE = 0.59;

          const calculoCA = suma_aseg * tasa_amplia / 100;
          const calculoPE = suma_aseg * tasa_perdida / 100;

          const motinCA = (suma_aseg * pmotinCA) / 100;
          const motinPE = (suma_aseg * pmotinPE) / 100;
          const catastrofico = (suma_aseg * pcatastrofico) / 100;
          const robo = (msumaAsegRobo * probo) / 100;

          const CA = motinCA + catastrofico + robo;
          const PE = motinPE + catastrofico + robo;

          const resultCA = calculoCA + CA
          const resultPE = calculoPE + PE

          const sumaCA = resultCA + mtotal_rcv;
          const sumaPE = resultPE + mtotal_rcv;

          quote.mtotal_amplia = sumaCA.toFixed(2);
          quote.mtotal_perdida = sumaPE.toFixed(2);
        }


      })
      this.updatePremiums()
    }
  }

  updatePremiums(){
    let data = {
      ccotizacion: this.cotizacion,
      quotes: this.quotesList,
      msuma_aseg: this.quotesForm.get('msuma_aseg')?.value
    }
    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/update-premiums', data).subscribe((response: any) => {
      if(response.status){
      }
    })
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
    const observable = from(this.pdfGenerationService.LoadDataQuotes(this.cotizacion, this.montoRCV, parseFloat(this.montoAmplia), parseFloat(this.montoPerdida), this.allCoverages, this.planPdf, this.dataVehicle, this.quotesForm.get('fano')?.value, this.xcorredor, this.xcorreocorredor, this.xtelefonocorredor));

    observable.subscribe(
      (data) => {
      },
      (error) => {
        // console.log(error)
      }
    );
  }

  onToggle(cobertura: string, plan: number, prima: any) {
    if (cobertura == 'Rcv') {
      this.brcv = true;
      this.bamplia = false;
      this.bperdida = false;
    } else if (cobertura == 'Cobertura Amplia') {
      this.brcv = false;
      this.bamplia = true;
      this.bperdida = false;
      this.primaFinal = prima
    } else if (cobertura == 'Perdida Total') {
      this.brcv = false;
      this.bamplia = false;
      this.bperdida = true;
      this.primaFinal = prima
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
            ccorredor: this.currentUser.data.ccorredor,
            suma_aseg: this.quotesForm.get('msuma_aseg')?.value,
            prima: this.primaFinal
          }
        };

        if(this.bamplia || this.bperdida){
          if(this.currentUser.data.ccorredor){
            window.alert('¡Se ha cotizado exitosamente!');
            location.reload();
          }else if(this.currentUser.data.crol == 8){
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
