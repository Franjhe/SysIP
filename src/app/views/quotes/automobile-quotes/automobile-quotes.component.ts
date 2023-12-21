import {Component, ViewChild, TemplateRef  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-automobile-quotes',
  templateUrl: './automobile-quotes.component.html',
  styleUrls: ['./automobile-quotes.component.scss']
})
export class AutomobileQuotesComponent {

  @ViewChild("coverageModal") private coverageModal!: TemplateRef<any>;

  isActive: boolean = false;

  brandList: any[] = [];
  modelList: any[] = [];
  versionList: any[] = [];
  ratesList: any[] = [];
  quotesList:  any[] = [];
  coverageListRcv: any[] = [];
  coverageListAmplia: any[] = [];
  coverageListPerdida: any[] = [];

  brandControl = new FormControl('');
  modelControl = new FormControl('');
  versionControl = new FormControl('');
  ratesControl = new FormControl('');

  filteredBrand!: Observable<string[]>;
  filteredModel!: Observable<string[]>;
  filteredVersion!: Observable<string[]>;
  filteredRates!: Observable<string[]>;

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

  cotizacion!: any;
  nombreCompleto!: any;
  vehiculo!: any;
  version!: any;
  bcv!: any ;
  plan!: any ;
  montoRCV!: any ;
  montoAmplia!: any ;
  montoPerdida!: any ;

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
  });

  constructor( private _formBuilder: FormBuilder,
               private http: HttpClient,
               private snackBar: MatSnackBar,
               private modalService: NgbModal,
             ) {}

  ngOnInit(){
    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })
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
      }else if(fanoValue < 1980){
        this.snackBar.open(`No puedes colocar un año menor a 1980. Por favor, vuelve a intentarlo`, '', {
          duration: 5000,
        });
        this.quotesForm.get('fano')?.setValue('')
      }else{
        this.getBrand()
      }
    }
  }

  getBrand(){
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

  getModel(){
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

  getVersion(){
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
      this.quotesForm.get('npasajeros')?.setValue(selectedVersion.npasajero);

      if(!this.quotesForm.get('ctarifa_exceso')?.value){
        this.activateRate = true;
        this.getRates();
      }else{
        this.activateRate = false;
      }
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
      this.quotesForm.get('ctarifa_exceso')?.setValue(selectedRates.id);
      this.activateRate = false;
    }
  }


  validateForm() {
    if (this.quotesForm.invalid){
      this.buttonQuotes = false;
    }else{
      this.buttonQuotes = true;
    }
  }

  onSubmit(){
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
      }
    })
  }

  openCoverages(quotes: any){
    const modalRef = this.modalService.open(this.coverageModal, { centered: true, size: 'xl' });
    
    this.montoRCV = quotes.mtotal_rcv;
    this.montoAmplia = quotes.mtotal_amplia;
    this.montoPerdida = quotes.mtotal_perdida;

    this.searchCoverages();
  }

  searchCoverages(){
    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/search-coverages', null).subscribe((response: any) => {
      if (response.status) {
        this.coverageListRcv = response.data.rcv
        this.coverageListAmplia = response.data.amplia
        this.coverageListPerdida = response.data.perdida

        this.coverageListRcv.sort((a, b) => a.corden > b.corden ? 1 : -1);
        this.coverageListAmplia.sort((a, b) => a.corden > b.corden ? 1 : -1);
        this.coverageListPerdida.sort((a, b) => a.corden > b.corden ? 1 : -1);
      }
    })
  }

  onToggle(cobertura: string, plan: number) {
    if(cobertura == 'Rcv'){
      this.brcv = true;
      this.bamplia = false;
      this.bperdida = false;
    }else if(cobertura == 'Cobertura Amplia'){
      this.brcv = false;
      this.bamplia = true;
      this.bperdida = false;
    }else if(cobertura == 'Perdida Total'){
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

        this.snackBar.open(`Se ha cotizado exitosamente.`, '', {
          duration: 5000,
        });
      }
    })
  }

}
