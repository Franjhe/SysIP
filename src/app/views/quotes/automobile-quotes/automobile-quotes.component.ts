import {Component, ViewChild  } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormControl} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-automobile-quotes',
  templateUrl: './automobile-quotes.component.html',
  styleUrls: ['./automobile-quotes.component.scss']
})
export class AutomobileQuotesComponent {

  isActive: boolean = false;

  brandList: any[] = [];
  modelList: any[] = [];
  versionList: any[] = [];
  ratesList: any[] = [];
  utilityVehicleList:  any[] = [];
  quotesList:  any[] = [];

  brandControl = new FormControl('');
  modelControl = new FormControl('');
  versionControl = new FormControl('');
  ratesControl = new FormControl('');
  utilityVehicleControl = new FormControl('');

  filteredBrand!: Observable<string[]>;
  filteredModel!: Observable<string[]>;
  filteredVersion!: Observable<string[]>;
  filteredRates!: Observable<string[]>;
  filteredUtilityVehicle!: Observable<string[]>;

  vector: boolean = true;
  loading: boolean = false;
  buttonQuotes: boolean = false;
  activateRate: boolean = false;
  distributionCard: boolean = false;
  quotesBoolean: boolean = true;
  check: boolean = false;

  cotizacion!: any;
  nombreCompleto!: any;
  vehiculo!: any;
  version!: any;
  bcv!: any ;

  quotesForm = this._formBuilder.group({
    xmarca: ['', Validators.required],
    xmodelo: ['', Validators.required],
    xversion: ['', Validators.required],
    fano: ['', Validators.required],
    xcobertura: ['', Validators.required],
    xnombre: ['', Validators.required],
    xapellido: ['', Validators.required],
    email: ['', Validators.required],
    ctarifa_exceso: [''],
    cuso: [''],
    id_inma: [''],
  });

  constructor( private _formBuilder: FormBuilder,
               private http: HttpClient,
               private snackBar: MatSnackBar,
             ) {}

  ngOnInit(){
    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })
    
    this.getUtilityVehicle();
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

  getUtilityVehicle(){
    this.http.post(environment.apiUrl + '/api/v1/valrep/utility', null).subscribe((response: any) => {
      if (response.data.utility) {
        for (let i = 0; i < response.data.utility.length; i++) {
          this.utilityVehicleList.push({
            id: response.data.utility[i].cuso,
            value: response.data.utility[i].xuso,
            precargo: response.data.utility[i].precargo,
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
      this.quotesForm.get('cuso')?.setValue(selectedUtilityVehicle.id);
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
      xcobertura: this.quotesForm.get('xcobertura')?.value,
      xnombre: this.quotesForm.get('xnombre')?.value?.toUpperCase(),
      xapellido: this.quotesForm.get('xapellido')?.value?.toUpperCase(),
      email: this.quotesForm.get('email')?.value?.toUpperCase(),
      ctarifa_exceso: this.quotesForm.get('ctarifa_exceso')?.value,
      cuso: this.quotesForm.get('cuso')?.value
    }

    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/create', data).subscribe((response: any) => {
      if (response.status) {
        this.vector = false;
        this.distributionCard = true;
        this.loading = false;
        this.quotesBoolean = true;
        this.quotesList = response.data.list.result;

        this.nombreCompleto = data.xnombre + ' ' + data.xapellido;
        this.vehiculo = this.quotesForm.get('xmarca')?.value + ' ' + this.quotesForm.get('xmodelo')?.value;
        this.cotizacion = response.data.list.result[0].ccotizacion;
        this.version = this.quotesForm.get('xversion')?.value
      }
    })
  }

  selectedPlan(index: number) {
    // this.quotesBoolean = false;
    this.isActive = true
    // this.loading = true;
    // const selectedQuote = this.quotesList[index];

    // let data = {
    //   ccotizacion: selectedQuote.ccotizacion,
    //   cplan_rc: selectedQuote.cplan_rc,
    //   iaceptado: true
    // }

    // this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/update', data).subscribe((response: any) => {
    //   if (response.status) {
    //     this.loading = false;
    //     this.check = true;

    //     this.snackBar.open(`Se ha cotizado con el ${selectedQuote.xplan_rc} exitosamente.`, '', {
    //       duration: 5000,
    //     });
    //   }
    // })

  }

}
