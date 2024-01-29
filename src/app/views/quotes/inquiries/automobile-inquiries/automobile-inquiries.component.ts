import { Component, ViewChild, AfterViewInit, TemplateRef} from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PdfGenerationService } from '../../../../_services/ServicePDF';
import { from } from 'rxjs';


@Component({
  selector: 'app-automobile-inquiries',
  templateUrl: './automobile-inquiries.component.html',
  styleUrls: ['./automobile-inquiries.component.scss']
})
export class AutomobileInquiriesComponent {
  @ViewChild("coverageModal") private coverageModal!: TemplateRef<any>;

  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['ccotizacion', 'xnombres', 'xvehiculo', 'star'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  showTable: boolean = true;
  distributionCard: boolean = false;
  quotesBoolean: boolean = true;
  quotesList!: any[]
  cotizacion!: any;
  nombreCompleto!: any;
  vehiculo!: any;
  marca!: any;
  modelo!: any;
  version!: any;
  fano!: any;
  npasajeros!: any;
  bcv!: any ;
  plan!: any ;
  montoRCV!: any ;
  montoAmplia!: any ;
  montoPerdida!: any ;
  planPdf!: any ;
  correo!: any ;
  dataVehicle!: {}
  coverageListRcv: any[] = [];
  coverageListAmplia: any[] = [];
  coverageListPerdida: any[] = [];
  allCoverages: any[] = [];
  brcv: boolean = false;
  bamplia: boolean = false;
  bperdida: boolean = false;
  loading: boolean = false;
  isActive: boolean = false;
  check: boolean = false;
  public isYearValid: boolean = false;
  xtelefonocorredor!: any ;
	xcorreocorredor!: any ;
  xcorredor!: any ;
  currentUser!: any
  token!: any

  constructor(private router: Router,
              private http: HttpClient,
              private modalService: NgbModal,
              private pdfGenerationService: PdfGenerationService,) {}

  ngOnInit(){
    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })

    this.token = localStorage.getItem('user');
    this.currentUser = JSON.parse(this.token);

    if (this.currentUser) {
      let data = {
        ccorredor: this.currentUser.data.ccorredor
      }
      this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/detail-automobile', data).subscribe((response: any) => {
        if (response.data.auto) {
          this.dataSource.data = response.data.auto;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onQuotesSelected(ccotizacion: any) {
    this.showTable = false;
    this.distributionCard = true;

    let data = {
      ccotizacion: ccotizacion
    }

    this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/search-quotes', data).subscribe((response: any) => {
      if(response.status){
        this.quotesList = response.data.list;
        this.quotesList.sort((a, b) => a.xplan_rc > b.xplan_rc ? 1 : -1);
        this.quotesBoolean = true;

        this.nombreCompleto = response.data.nombres
        this.vehiculo = response.data.vehiculo
        this.marca = response.data.xmarca
        this.modelo = response.data.xmodelo
        this.version = response.data.xversion
        this.npasajeros = response.data.npasajero
        this.fano = response.data.fano
        this.correo = response.data.xcorreo
        this.cotizacion = ccotizacion;
        this.xcorredor = response.data.xcorredor;
        this.xcorreocorredor = response.data.xcorreocorredor;
        this.xtelefonocorredor = response.data.xtelefonocorredor;

        const fanoValue = this.fano;
        this.isYearValid = fanoValue !== null && fanoValue !== undefined && parseInt(fanoValue, 10) >= 2007;
      }

    })
  }

  openCoverages(quotes: any, event: Event){
    event.preventDefault();
    const modalRef = this.modalService.open(this.coverageModal, { centered: true, size: 'lg' });
    
    this.montoRCV = quotes.mtotal_rcv;
    this.montoAmplia = quotes.mtotal_amplia;
    this.montoPerdida = quotes.mtotal_perdida;
    this.planPdf = quotes.cplan_rc

    this.dataVehicle = {
      xmarca: this.marca,
      xmodelo: this.modelo,
      xversion:  this.version,
      npasajeros: this.npasajeros,
      fano: this.fano,
      xusuario: this.nombreCompleto,
      xcorreo: this.correo
    }
    this.searchCoverages();
  }

  searchCoverages(){
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

  onQuotePdf(){
    const observable = from(this.pdfGenerationService.LoadDataQuotes(this.cotizacion, this.montoRCV, this.montoAmplia, this.montoPerdida, this.allCoverages, this.planPdf, this.dataVehicle, this.fano, this.xcorredor, this.xcorreocorredor, this.xtelefonocorredor));

    observable.subscribe(
      (data) => {
      },
      (error) => {
        console.log(error)
      }
    );
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

        const navigationExtras: NavigationExtras = {
          queryParams: { cotizacion: this.cotizacion, 
                         fano: this.fano,
                         cplan: this.plan,
                          }
        };

        if (window.confirm("¡Se ha cotizado exitosamente!... ¿Desea Emitir la Cotización?")) {
          this.router.navigate(['/emissions/automobile'], navigationExtras);
        } else {
          location.reload();
        }
      }
    })
  }
}
