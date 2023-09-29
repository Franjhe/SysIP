import { Component, ViewChild, TemplateRef,  OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient,   } from '@angular/common/http';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as  pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
//import axios from 'axios';
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})

export class PdfGenerationService {
  canal_venta: any;
  cpoliza: any;
  fanopol: any;
  fcobro: any;
  fdesde: any;
  fdesde_recibo: any;
  fecha: any;
  ffecha_emision: any;
  ffecha_inc1: any;
  ffecha_inc2: any;
  ffecha_inc3: any;
  ffecha_inc4: any;
  ffecha_inc5: any;
  ffecha_nac1: any;
  ffecha_nac2: any;
  ffecha_nac3: any;
  ffecha_nac4: any;
  ffecha_nac5: any;
  ffecha_nac_ben: any;
  ffecha_suscripcion: any;
  fhasta: any;  
  fhasta_recibo: any;
  fmespol: any;
  mgastos: any;
  mprima1: any;
  mprima2: any;
  mprima3: any;
  mprima4: any;
  mprima5: any;
  mprima6: any;
  msuma1: any;
  msuma2: any;
  msuma3: any;
  msuma4: any;
  msuma5: any;
  msuma6: any;
  mtotal: any;
  mtotal_prima: any ;

  constructor(
    private router: Router,
    private http: HttpClient
  ) 
  {
    
  }

    async certificateData(){
      this.http.get(environment.apiUrl + '/api/v1/certificate/search').subscribe((response: any) => {
        console.log(response)
 
      });
    }

    async certifiquedPDF(){
    const data = await this.certificateData()
      var dd = {
      	content: [{
      		text: 'Cuadro - Recibo de Póliza'
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [345, 150],
      			body: [
      				['Tomador', 'Cédula de Identidad / R.I.F.'],
      				['Asegurado', 'Cédula de Identidad / R.I.F.']
      			]
      		}
      	}, {
      		text: 'direccion del tomador '
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [150, 150, 70, '*', 35],
      			body: [
      				['Estado', 'Ciudad', 'Zona Postal', 'Teléfonos', 'Fax'],
      				['fixed-width ', {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}]
      			]
      		}
      	}, {
      		text: 'direccion del Asegurado '
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [150, 150, 70, '*', 30],
      			body: [
      				['Estado', 'Ciudad', 'Zona Postal', 'Teléfonos', 'Fax'],
      				['fixed-width ', {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'nothing ',
      					italics: true,
      					color: 'gray'
      				}]
      			]
      		}
      	}, {
      		text: 'DATOS DE LA PÓLIZA'
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [250, 90, 150],
      			body: [
      				['Fecha de Suscripción', 'Vigencia', 'Moneda', ],
      				[{
      					text: 'Sucursal / Oficina ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Canal de Venta ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Frecuencia de Pago ',
      					italics: true,
      					color: 'gray'
      				}, ],
      				[{
      					text: 'Intermediario(s):',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Participación',
      					italics: true,
      					color: 'gray'
      				}, ]
      			]
      		}
      	}, {
      		text: 'ASEGURADOS / DEPENDIENTES'
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [145, 90, 145, 100],
      			body: [
      				['Apellido', '', 'Nombre', ''],
      				[{
      					text: 'Cédula Identidad ',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Fecha Nacimiento',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, ],
      				[{
      					text: 'Parentesco',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Sexo',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, ],
      				[{
      					text: 'Cantidad de Servicios APS',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Exoneración de plazos de Espera',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: '',
      					italics: true,
      					color: 'gray'
      				}, ]
      			]
      		}
      	}, {
      		text: 'COBERTURAS'
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [150, 120, 150, 60],
      			body: [
      				['COBERTURAS', 'SUMA ASEGURADA', 'DEDUCIBLE', 'PRIMA'],
      				[{
      						text: 'Cédula Identidad ',
      						italics: true,
      						color: 'gray'
      					}, {
      						text: '',
      						italics: true,
      						color: 'gray'
      					},
      					[{
      						table: {
      							body: [
      								['%', 'U.T', 'Monto Mínimo'],
      							]
      						},
      					}], {
      						text: '',
      						italics: true,
      						color: 'gray'
      					},
      				],
      			]
      		}
      	}, {
      		text: 'DATOS DEL RECIBO'
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [70, 120, 150, 140],
      			body: [
      				['Recibo Nro.', 'Fecha de Emisión', 'Vigencia', 'Tipo de Movimiento'],
      			]
      		}
      	}, {
      		table: {
      			widths: [90, 70, 80, 80, 150],
      			body: [
      				['Fecha de Cobro', 'Referencia', 'Total Prima', 'Gastos', 'Total a Cobrar'],
      			]
      		}
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: ['*'],
      			body: [
      				['OBSERVACIONES:  \n\n '],
      			]
      		}
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: ['*'],
      			body: [
      				['El Asegurador entregará al Tomador este Cuadro Póliza Recibo, junto con las condiciones generales, las condiciones particulares, los anexos, si los hubiere, copia de lasolicitud de seguro y demás documentos que formen parte del contrato. En las renovaciones la obligación se mantendrá si se modifican las condiciones originalmente contratadas. El Tomador, Asegurado o Beneficiario de la Póliza, que sienta vulneración de sus derechos, y requieran presentar cualquier denuncia, queja, reclamo o solicitud de asesoría; surgida con ocasión de este contrato de seguros; puede acudir a la Oficina de la Defensoría del Asegurado de la Superintendencia de la Actividad Aseguradora, o comunicarlo a través de la página web: http://www.sudeaseg.gob.ve/.'],
      			]
      		}
      	}, {
      		style: 'tableExample',
      		table: {
      			widths: [240, 255],
      			body: [
      				['Por el Tomador', 'Por La Mundial C.A. Venezolana de Seguros de Crédito'],
      				[{
      					text: 'Nombre y Apellido/Denominación Social:',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Representante',
      					italics: true,
      					color: 'gray'
      				}, ],
      				[{
      					text: 'C.I./RIF:',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Nombre y Apellido:',
      					italics: true,
      					color: 'gray'
      				}, ],
      				[{
      					text: 'Firma:',
      					italics: true,
      					color: 'gray'
      				}, {
      					text: 'Cargo \n\n Firma',
      					italics: true,
      					color: 'gray'
      				}, ],
      			]
      		}
      	}, ]
      }
    }

    objetdata(){

            // "recordsets": [
            //     [
            //         {
            //             "cpoliza": 100000000000026,
            //             "fanopol": 2004,
            //             "fmespol": 7,
            //             "u_version": "!",
            //             "xcertificado": "0",
            //             "fecha": "2023-09-29T14:08:52.120Z",
            //             "xtomador": "IDLER MEDINA, GRACIELA EDELVAIS",
            //             "xcedula_tomador": "V-007958589",
            //             "xdireccion_tomador": "Av. Principal",
            //             "xestado_tomador": null,
            //             "xciudad_tomador": null,
            //             "xzona_postal_tomador": "2",
            //             "xtelefono_tomador": "793-91-80",
            //             "xasegurado": "IDLER MEDINA, GRACIELA EDELVAIS",
            //             "xcedula_asegurado": "V-007958589",
            //             "xdireccion_asegurado": "Av. Principal",
            //             "xestado_asegurado": null,
            //             "xciudad_asegurado": null,
            //             "xzona_postal_asegurado": "2",
            //             "xtelefono_asegurado": "793-91-80",
            //             "ffecha_suscripcion": "2004-07-08T00:00:00.000Z",
            //             "fdesde": "2004-07-08T00:00:00.000Z",
            //             "fhasta": "2004-08-08T00:00:00.000Z",
            //             "xmoneda": "BOLIVARES",
            //             "xsucursal": "SUCURSAL CARACAS",
            //             "canal_venta": "Directo",
            //             "xfrecuencia": null,
            //             "xintermediario": "DIRECTO",
            //             "xparticipacion": null,
            //             "xplan": null,
            //             "xasegurado1": null,
            //             "xparentesco1": null,
            //             "xcedula1": null,
            //             "xsexo1": null,
            //             "ffecha_nac1": null,
            //             "ffecha_inc1": null,
            //             "xasegurado2": null,
            //             "xparentesco2": null,
            //             "xcedula2": null,
            //             "xsexo2": null,
            //             "ffecha_nac2": null,
            //             "ffecha_inc2": null,
            //             "xasegurado3": null,
            //             "xparentesco3": null,
            //             "xcedula3": null,
            //             "xsexo3": null,
            //             "ffecha_nac3": null,
            //             "ffecha_inc3": null,
            //             "xasegurado4": null,
            //             "xparentesco4": null,
            //             "xcedula4": null,
            //             "xsexo4": null,
            //             "ffecha_nac4": null,
            //             "ffecha_inc4": null,
            //             "xasegurado5": null,
            //             "xparentesco5": null,
            //             "xcedula5": null,
            //             "xsexo5": null,
            //             "ffecha_nac5": null,
            //             "ffecha_inc5": null,
            //             "xcobertura1": null,
            //             "msuma1": null,
            //             "mprima1": null,
            //             "xcobertura2": null,
            //             "msuma2": null,
            //             "mprima2": null,
            //             "xcobertura3": null,
            //             "msuma3": null,
            //             "mprima3": null,
            //             "xcobertura4": null,
            //             "msuma4": null,
            //             "mprima4": null,
            //             "xcobertura5": null,
            //             "msuma5": null,
            //             "mprima5": null,
            //             "xcobertura6": null,
            //             "msuma6": null,
            //             "mprima6": null,
            //             "xcedula_ben": "V-007958589",
            //             "xnombre_ben": "IDLER MEDINA, GRACIELA EDELVAIS",
            //             "ffecha_nac_ben": "1968-10-27T00:00:00.000Z",
            //             "xparentesco_ben": null,
            //             "xparticipacion_ben": null,
            //             "xrecibo": "1000000001",
            //             "ffecha_emision": "2004-07-08T00:00:00.000Z",
            //             "fdesde_recibo": "2004-07-08T00:00:00.000Z",
            //             "fhasta_recibo": "2004-08-08T00:00:00.000Z",
            //             "xtipo_mov": "Emisión",
            //             "fcobro": null,
            //             "xreferencia": null,
            //             "mtotal_prima": 0,
            //             "mgastos": 89.18,
            //             "mtotal": 0
            //         }
            //     ]
            // ],
        
    
    }
}