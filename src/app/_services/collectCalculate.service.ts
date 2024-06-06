import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class collectCalculateService {

    private userSubject: BehaviorSubject<null>;    
    public user: Observable<null>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(xlogin: string, xcontrasena: string) {
        return this.http.post<any>(environment.apiUrl + '/api/v1/auth/signIn', { xlogin, xcontrasena })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    // calculateMount(lista : any){
    
    //     const sumaTotal = lista.reduce((acumulador: any,  
    //       recibo: 
    //       { seleccionado: any; 
    //         mdiferenciaext: any; 
    //         mdiferencia : any;
    //         mprimabrutaext: any,
    //       }) => {
    
    //           if (recibo.seleccionado && recibo.mdiferenciaext == null) {
    //               acumulador += recibo.mprimabrutaext;
    //           }
    //           if(recibo.seleccionado && recibo.mdiferenciaext > 0){
    //             acumulador += recibo.mdiferenciaext;
    //           }
    
    //       return acumulador;
    //     }, 0);
    
    //     const sumaTotalBs = lista.reduce((acumulador: any,  
    //       recibo: 
    //       { seleccionado: any; 
    //         mdiferencia: any; 
    //         mprimabruta: any;
    //         cmoneda : any
    //       }) => {
            
    //         if (recibo.seleccionado && recibo.mdiferencia == null && recibo.cmoneda =='BS  ') {
    //             acumulador += recibo.mprimabruta;
    //         }
    //         if(recibo.seleccionado && recibo.mdiferencia > 0 && recibo.cmoneda =='BS  '){
    
    //           acumulador += recibo.mprimabruta;
    //         }
    
    //       return acumulador;
    //     }, 0);
    
    //   console.log(sumaTotalBs,sumaTotal)
    //     let mount 
    //     if(this.PositiveBalanceBool){      
    
    //       if(this.positiveBalanceUSD != 0){
    
    //         mount = Number(sumaTotal.usd) - this.positiveBalanceUSD 
    
    //       }else{
    
    //         let operation = this.positiveBalanceBs / this.bcv
    //         mount =  Number(sumaTotal.usd) - operation
    
    //       }
      
    //     }else{
    //       mount = sumaTotal.usd
    //     }
      
    //     // if(sumaTotalBs > 0){
    //     //   this.mount = mount.toFixed(4) //suma de los dolares brutos
    
    //     //   const operation = mount * this.bcv
    //     //   this.mountBs = operation.toFixed(2)  //dolares brutos convertidos en bolivares 
    
    //     //   const mountIGTF = mount + ((3/100)*mount) 
    //     //   this.mountIGTF = mountIGTF.toFixed(2) //dolares netos
    
    //     //   const mountBs = this.mountIGTF*this.bcv
    //     //   this.mountBsExt = mountBs.toFixed(2) //bolivares netos
    
    //     //   const porcentajeBs = this.bcv * ((3/100)*mount) 
    //     //   this.mountBsP = porcentajeBs.toFixed(2) //porcentaje del igtf en bolivares 
    
    //     //   const porcentaje = (3/100)*mount
    //     //   this.mountP = porcentaje.toFixed(2) //porcentaje del igtf en dolares  
    
    //     //   this.determinarSiPuedeAvanzar()
    
    //     // } 
    //     // else if (sumaTotal > 0){
    
    //     //   this.mount = sumaTotal.toFixed(4) //suma de los bolivares
    
    //     //   const operation = sumaTotal / this.bcv
    //     //   this.mountBs = operation.toFixed(2)  //bolivares brutos convertidos en dolares 
      
    //     //   const mountIGTF = operation + ((3/100)* operation) 
    //     //   this.mountIGTF = mountIGTF.toFixed(2) //dolares netos
      
    //     //   const mountBs = this.mountIGTF*this.bcv
    //     //   this.mountBsExt = mountBs.toFixed(2) //bolivares netos
      
    //     //   const porcentajeBs = this.bcv * ((3/100)*operation) 
    //     //   this.mountBsP = porcentajeBs.toFixed(2) //porcentaje del igtf en bolivares 
      
    //     //   const porcentaje = (3/100)*operation
    //     //   this.mountP = porcentaje.toFixed(2) //porcentaje del igtf en dolares  
      
    //     //   this.determinarSiPuedeAvanzar()
    //     // }
    
    //     // console.log(this.mount, this.mountBs, this.mountIGTF , this.mountBsExt , this.mountBsP , this.mountP)
    // }
}