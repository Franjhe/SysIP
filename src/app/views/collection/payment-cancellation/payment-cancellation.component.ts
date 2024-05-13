import {Component } from '@angular/core';
import {FormBuilder, FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {MatDialog } from '@angular/material/dialog';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-cancellation',
  templateUrl: './payment-cancellation.component.html',
  styleUrls: ['./payment-cancellation.component.scss'],

})
export class PaymentCancellationComponent {
  
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  bcv : any
  totalNotificated : any
  totalNotificatedExt: any

  revision : boolean = false
  cobradoSAF : boolean = false

  mount : any //monto de la suma de los recibos 
  mountIGTF : any //monto con el calculo igtf 
  mountBs : any //monto en bolivares multiplicado por bcv 
  mountP : any //monto del porcentaje del igtf 
  mountBsP : any //monto en bolivares del porcentaje igtf 
  mountBsExt : any //monto en bolivares del monto total en dolares con igtf

  groupReceiptsForm = this._formBuilder.group({
    agrupado : this._formBuilder.array([])
  });

  currentUser!: any
  token: any
  usuario : any

  get agrupado() : FormArray {
    return this.groupReceiptsForm.get("agrupado") as FormArray
  }

  constructor( 
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    readonly dialog: MatDialog
  ) {}

  ngOnInit(){

    let token : any = localStorage.getItem('user');

    this.currentUser = JSON.parse(token);
    this.usuario = this.currentUser.data.cusuario

    fetch('https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv')
    .then((response) => response.json())
    .then(data => {
      this.bcv = data.monitors.usd.price
    })


    fetch(environment.apiUrl + '/api/v1/collection/search-notification' )
    .then((response) => response.json())
    .then(data => {
        // Obtener la referencia al FormArray transactions
        const transactionsArray = this.groupReceiptsForm.get("agrupado") as FormArray
        
        data.searchPaymentReport.forEach((transaction: any) => {
          let dateNotification = new Date(transaction.freporte);
          let fechaISOHasta = dateNotification.toISOString().substring(0, 10);

          const transactionGroup = this._formBuilder.group({
            id: transaction.ctransaccion,
            iestadorec : '',
            xobservacion : '',
            mdiferencia : '',
            idiferencia : '',
            cmoneda : '',
            recibo: '',
            xcorreo:transaction.xcorreo,
            freporte:fechaISOHasta,
            casegurado: transaction.casegurado,
            xcliente: transaction.xcliente,
            iestado: transaction.iestado,
            iestado_tran: transaction.iestado_tran,
            cdoccob: transaction.cdoccob,
            monto_transaccion: transaction.monto_transaccion,
            monto_transaccion_ext: transaction.monto_transaccion_ext,
            diferencia_saldo:transaction.diferencia_saldo,
            msaldodif:transaction.msaldodif,
            tasa_saldo:transaction.tasa_saldo,
            cmoneda_dif:transaction.cmoneda_dif,   
            ptasamon: transaction.ptasamon,
            poliza: this._formBuilder.array([]),
            recibos: this._formBuilder.array([])
          });

          const polizaArray = transactionGroup.get('poliza') as FormArray;
          transaction.poliza.forEach((poliza:any) => {
            polizaArray.push(this._formBuilder.group({
              beneficiario : poliza.beneficiario,
              crecibo: poliza.crecibo,
              cnrecibo: poliza.cnrecibo,
              cpoliza: poliza.cpoliza,
              cnpoliza: poliza.cnpoliza,
              cuotas : poliza.cuotas,
              mmontorec: poliza.mmontorec,
              mmontorecext: poliza.mmontorecext,
              iestadorec: poliza.iestadorec,
              cramo: poliza.cramo, 
              xramo: poliza.xramo, 
              cplan: poliza.cplan,
              codigo_corredor : poliza.codigo_corredor,
              corredor : poliza.corredor,
              mdiferencia: poliza.mdiferencia,
              mdiferenciaext: poliza.mdiferenciaext,
              idiferencia: poliza.idiferencia,
              tasa_diferencia: poliza.tasa_diferencia,
              xobservacion: poliza.xobservacion,
              estado_diferencia: poliza.estado_diferencia,
              freport_pago: poliza.freport_pago,
              moneda_cobro_diferencia: poliza.moneda_cobro_diferencia, 

            }));
          });
      
          // Llenar la sección 'recibos' del formulario
          const recibosArray = transactionGroup.get('recibos') as FormArray;
          transaction.recibos.forEach((recibo:any) => {

            const imageUrl = recibo.xruta;
            const fullImageUrl = this.getImage(imageUrl);
            const safeImageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fullImageUrl);

            recibosArray.push(this._formBuilder.group({
              transaccion: recibo.ctransaccion,
              cbanco_destino: recibo.cbanco_destino,
              cbanco_origen: recibo.cbanco_origen,
              npago: recibo.npago,
              cmoneda: recibo.cmoneda,
              ptasamon: recibo.ptasamon,
              monto_declarado: recibo.mpago,
              monto_declarado_ext: recibo.monto_declarado_ext, 
              mpagoigtf: recibo.mpagoigtf,
              mpagoigtfext : recibo.mpagoigtfext,
              xreferencia : recibo.xreferencia,
              xruta: safeImageUrl,
            }));

          });

          // Agregar el FormGroup principal al FormArray transactions
          transactionsArray.push(transactionGroup);


        });

        let sumaMpago = 0;
        let sumaMpagoExt = 0;

        // Iterar sobre cada objeto en el array
        data.searchPaymentReport.forEach((objeto:any) => {
            // Iterar sobre los recibos de cada objeto
            objeto.recibos.forEach((recibo:any) => {
                // Sumar el valor de mpago al total
                sumaMpago += recibo.mpago;
            });
        });

        data.searchPaymentReport.forEach((objeto:any) => {
          // Iterar sobre los recibos de cada objeto
          objeto.recibos.forEach((recibo:any) => {
              // Sumar el valor de mpago al total
              sumaMpagoExt += recibo.monto_declarado_ext;
          });
      });

      this.totalNotificated = sumaMpago.toFixed(2)
      this.totalNotificatedExt = sumaMpagoExt.toFixed(2)

    })

  }

  getImage(imageUrl: string): string {
    return environment.apiUrl + '/api/get-document/' + imageUrl;
  }

  onSubmit(i : any){

    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    if(creds.at(i).get('iestadorec')?.value == 'ER' ){

      let data = {}
      
      if(creds.at(i).get('cmoneda')?.value == 'BS'){
        let monto = creds.at(i).get('mdiferencia')?.value / this.bcv
        data = {
          transaccion : creds.at(i).get('id')?.value,
          casegurado : creds.at(i).get('casegurado')?.value,
          cliente : creds.at(i).get('xcliente')?.value,
          correo : creds.at(i).get('xcorreo')?.value,
          tasa : this.bcv,
          cusuario : this.usuario,
          fcobro : new Date(),
          reciboConDiferencia: {
            mdiferencia: creds.at(i).get('mdiferencia')?.value,
            mdiferenciaext: monto,
            xobservacion: creds.at(i).get('xobservacion')?.value,
            idiferencia : creds.at(i).get('idiferencia')?.value,
            crecibo : creds.at(i).get('recibo')?.value,
            cmoneda : creds.at(i).get('cmoneda')?.value,
          }

        }

      }else{
        let monto = creds.at(i).get('mdiferencia')?.value * this.bcv
        data = {
          transaccion : creds.at(i).get('id')?.value,
          correo : creds.at(i).get('xcorreo')?.value,
          casegurado : creds.at(i).get('casegurado')?.value,
          cliente : creds.at(i).get('xcliente')?.value,
          tasa : this.bcv,
          cusuario : this.usuario,
          fcobro : new Date(),
          reciboConDiferencia: {
            mdiferencia: monto,
            mdiferenciaext: creds.at(i).get('mdiferencia')?.value,
            xobservacion: creds.at(i).get('xobservacion')?.value,
            idiferencia : creds.at(i).get('idiferencia')?.value,
            crecibo : creds.at(i).get('recibo')?.value,
            cmoneda : creds.at(i).get('cmoneda')?.value,
          }

        }

      }

      this.http.post(environment.apiUrl + '/api/v1/collection/receipt-under-review/', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })

    }
    else if(creds.at(i).get('iestadorec')?.value == 'CS' ){
      let data = {
        transaccion : creds.at(i).get('id')?.value,
        iestadorec: 'C',
        fcobro : new Date(),
        casegurado : creds.at(i).get('casegurado')?.value,
        cliente : creds.at(i).get('xcliente')?.value,
        correo : creds.at(i).get('xcorreo')?.value,
        recibo : creds.at(i).get('poliza')?.value,
        ptasamon : this.bcv,
        cusuario : this.usuario,
        balancePositivo:{        
          cmoneda_dif: creds.at(i).get('cmoneda')?.value,
          msaldodif: creds.at(i).get('mdiferencia')?.value,
          idiferencia : "H",
        }
      }
      this.http.patch(environment.apiUrl + '/api/v1/collection/update-receipt-positive-balance', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })
    }
    else if(creds.at(i).get('iestadorec')?.value == 'C' ){
      const data = {
        transaccion : creds.at(i).get('id')?.value,
        casegurado : creds.at(i).get('casegurado')?.value,
        correo : creds.at(i).get('xcorreo')?.value,
        cliente : creds.at(i).get('xcliente')?.value,
        fpago : creds.at(i).get('freporte')?.value,
        recibo : creds.at(i).get('poliza')?.value,
        cusuario : this.usuario,
        fcobro : new Date(),
      }
      this.http.patch(environment.apiUrl + '/api/v1/collection/update-receipt/', data ).subscribe((response: any) => {
        if(response.status){
          location.reload()
        }
  
      })
    }

  }

  validateMov(i : any){

    const creds = this.groupReceiptsForm.controls.agrupado as FormArray;

    if(creds.at(i).get('iestadorec')?.value == 'ER'){
      this.revision = true
      this.cobradoSAF = false
    }
    
    else if(creds.at(i).get('iestadorec')?.value == 'CS'){
      this.cobradoSAF = true
      this.revision = false    }
    else{
      this.revision = false

    }

  }


}
