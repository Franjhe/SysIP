import { Component, ViewChild, TemplateRef,  OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient,   } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as  pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import axios from 'axios';
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})

export class PdfGenerationService {

	cpoliza: number | undefined;
	fanopol: number | undefined ;
	fmespol: number | undefined ;
	xcertificado: string | undefined;
	fecha: string | undefined;
	xtomador: string | undefined;
	xcedula_tomador: string | undefined;
	xdireccion_tomador: string | undefined;
	xestado_tomador: string | undefined;
	xciudad_tomador: string | undefined;
	xzona_postal_tomador:string | undefined;
	xtelefono_tomador: string | undefined;
	xasegurado:string | undefined;
	xcedula_asegurado:string | undefined;
	xdireccion_asegurado: string | undefined;
	xestado_asegurado: string | undefined;
	xciudad_asegurado: string | undefined;
	xzona_postal_asegurado: string | undefined;
	xtelefono_asegurado: string | undefined;
	ffecha_suscripcion:string | undefined;
	fdesde: string | undefined;
	fhasta: string | undefined;
	xmoneda: string | undefined;
	xsucursal: string | undefined;
	canal_venta: string | undefined;
	xfrecuencia: string | undefined;
	xintermediario: string | undefined;
	xparticipacion: string | undefined;
	xplan: string | undefined;
	xasegurado1: string | undefined;
	xparentesco1: string | undefined;
	xcedula1: string | undefined;
	xsexo1: string | undefined;
	ffecha_nac1: string | undefined;
	ffecha_inc1: string | undefined;
	xasegurado2: string | undefined;
	xparentesco2: string | undefined;
	xcedula2: string | undefined;
	xsexo2: string | undefined;
	ffecha_nac2: string | undefined;
	ffecha_inc2: string | undefined;
	xasegurado3: string | undefined;
	xparentesco3: string | undefined;
	xcedula3: string | undefined;
	xsexo3: string | undefined;
	ffecha_nac3: string | undefined;
	ffecha_inc3: string | undefined;
	xasegurado4: string | undefined;
	xparentesco4: string | undefined;
	xcedula4: string | undefined;
	xsexo4: string | undefined;
	ffecha_nac4: string | undefined;
	ffecha_inc4: string | undefined;
	xasegurado5: string | undefined;
	xparentesco5: string | undefined;
	xcedula5: string | undefined;
	xsexo5: string | undefined;
	ffecha_nac5: string | undefined;
	ffecha_inc5: string | undefined;
	xcobertura1: string | undefined;
	msuma1: string | undefined;
	mprima1: string | undefined;
	xcobertura2: string | undefined;
	msuma2: string | undefined;
	mprima2: string | undefined;
	xcobertura3: string | undefined;
	msuma3: string | undefined;
	mprima3: string | undefined;
	xcobertura4: string | undefined;
	msuma4: string | undefined;
	mprima4: string | undefined;
	xcobertura5: string | undefined;
	msuma5: string | undefined;
	mprima5: string | undefined;
	xcobertura6: string | undefined;
	msuma6: string | undefined;
	mprima6: string | undefined;
	xcedula_ben: string | undefined;
	xnombre_ben: string | undefined;
	ffecha_nac_ben:string | undefined;
	xparentesco_ben: string | undefined;
	xparticipacion_ben: string | undefined;
	xrecibo: string | undefined;
	ffecha_emision: string | undefined;
	fdesde_recibo:string | undefined;
	fhasta_recibo: string | undefined;
	xtipo_mov: string | undefined;
	fcobro: string | undefined;
	xreferencia: string | undefined;
	mtotal_prima: number | undefined ;
	mgastos: number | undefined ;
	mtotal: number| undefined ;

  constructor(
    private router: Router,
    private http: HttpClient
  ) 
  {
    
  }

    async certificateData(){
      this.http.get(environment.apiUrl + '/api/v1/certificate/search').subscribe((response: any) => {
        console.log(response)
 
		this.cpoliza = response.data.cpoliza;
		this.fanopol = response.data.fanopol;
		this.fmespol = response.data.fmespol;
		this.xcertificado = response.data.xcertificado;
		this.fecha = response.data.fecha;
		this.xtomador = response.data.xtomador;
		this.xcedula_tomador = response.data.xcedula_tomador;
		this.xdireccion_tomador = response.data.xdireccion_tomador;
		this.xestado_tomador = response.data.xestado_tomador;
		this.xciudad_tomador = response.data.xciudad_tomador;
		this.xzona_postal_tomador = response.data.xzona_postal_tomador;
		this.xtelefono_tomador = response.data.xtelefono_tomador;
		this.xasegurado = response.data.xasegurado;
		this.xcedula_asegurado = response.data.xcedula_asegurado;
		this.xdireccion_asegurado = response.data.xdireccion_asegurado;
		this.xestado_asegurado = response.data.xestado_asegurado;
		this.xciudad_asegurado = response.data.xciudad_asegurado;
		this.xzona_postal_asegurado = response.data.xzona_postal_asegurado;
		this.xtelefono_asegurado = response.data.xtelefono_asegurado;
		this.ffecha_suscripcion = response.data.ffecha_suscripcion;
		this.fdesde = response.data.fdesde;
		this.fhasta = response.data.fhasta;
		this.xmoneda = response.data.xmoneda;
		this.xsucursal = response.data.xsucursal;
		this.canal_venta = response.data.canal_venta;
		this.xfrecuencia = response.data.xfrecuencia;
		this.xintermediario = response.data.xintermediario;
		this.xparticipacion = response.data.xparticipacion;
		this.xplan = response.data.xplan;
		this.xasegurado1 = response.data.xasegurado1;
		this.xparentesco1 = response.data.xparentesco1;
		this.xcedula1 = response.data.this.xcedula1;
		this.xsexo1 = response.data.xsexo1;
		this.ffecha_nac1 = response.data.ffecha_nac1;
		this.ffecha_inc1 = response.data.ffecha_inc1;
		this.xasegurado2 = response.data.xasegurado2;
		this.xparentesco2 = response.data.xparentesco2;
		this.xcedula2 = response.data.this.xcedula2;
		this.xsexo2 = response.data.xsexo2;
		this.ffecha_nac2 = response.data.ffecha_nac2;
		this.ffecha_inc2 = response.data.ffecha_inc2;
		this.xasegurado3 = response.data.xasegurado3;
		this.xparentesco3 = response.data.xparentesco3;
		this.xcedula3 = response.data.this.xcedula3;
		this.xsexo3 = response.data.xsexo3;
		this.ffecha_nac3 = response.data.ffecha_nac3;
		this.ffecha_inc3 = response.data.ffecha_inc3;
		this.xasegurado4 = response.data.xasegurado4;
		this.xparentesco4 = response.data.xparentesco4;
		this.xcedula4 = response.data.this.xcedula4;
		this.xsexo4 = response.data.xsexo4;
		this.ffecha_nac4 = response.data.ffecha_nac4;
		this.ffecha_inc4 = response.data.ffecha_inc4;
		this.xasegurado5 = response.data.xasegurado5;
		this.xparentesco5 = response.data.xparentesco5;
		this.xcedula5 = response.data.this.xcedula5;
		this.xsexo5 = response.data.xsexo5;
		this.ffecha_nac5 = response.data.ffecha_nac5;
		this.ffecha_inc5 = response.data.ffecha_inc5;
		this.xcobertura1 = response.data.xcobertura1;
		this.msuma1 = response.data.msuma1;
		this.mprima1 = response.data.mprima1;
		this.xcobertura2 = response.data.xcobertura2;
		this.msuma2 = response.data.msuma2;
		this.mprima2 = response.data.mprima2;
		this.xcobertura3 = response.data.xcobertura3;
		this.msuma3 = response.data.msuma3;
		this.mprima3 = response.data.mprima3;
		this.xcobertura4 = response.data.xcobertura4;
		this.msuma4 = response.data.msuma4;
		this.mprima4 = response.data.mprima4;
		this.xcobertura5 = response.data.xcobertura5;
		this.msuma5 = response.data.msuma5;
		this.mprima5 = response.data.mprima5;
		this.xcobertura6 = response.data.xcobertura6;
		this.msuma6 = response.data.msuma6;
		this.mprima6 = response.data.mprima6;
		this.xcedula_ben = response.data.xcedula_ben;
		this.xnombre_ben = response.data.xnombre_ben;
		this.ffecha_nac_ben = response.data.ffecha_nac_ben;
		this.xparentesco_ben = response.data.xparentesco_ben;
		this.xparticipacion_ben = response.data.xparticipacion_ben;
		this.xrecibo = response.data.xrecibo;
		this.ffecha_emision = response.data.ffecha_emision;
		this.fdesde_recibo = response.data.fdesde_recibo;
		this.fhasta_recibo = response.data.fhasta_recibo;
		this.xtipo_mov = response.data.xtipo_mov;
		this.fcobro = response.data.fcobro;
		this.xreferencia = response.data.xreferencia;
		this.mtotal_prima = response.data.mtotal_prima;
		this.mgastos = response.data.mgastos;
		this.mtotal = response.data.mtotal;
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
						  ['Tomador \n\n ' +`${this.xtomador }`, 'Cédula de Identidad / R.I.F.\n\n ' +`${this.xcedula_tomador }` ],
						  ['Asegurado \n\n ' +`${this.xasegurado }`, 'Cédula de Identidad / R.I.F. \n\n ' +`${this.xcedula_asegurado }`]
					  ]
				  }
			  }, {
				  text: 'direccion del tomador  \n\n ' +`${this.xdireccion_tomador }`
			  }, {
				  style: 'tableExample',
				  table: {
					  widths: [150, 150, 70, '*', 35],
					  body: [
						  ['Estado \n\n ' +`${this.xestado_tomador }`, 'Ciudad \n\n ' +`${this.xciudad_tomador }`, 'Zona Postal \n\n ' +`${this.xzona_postal_tomador }`, 'Teléfonos \n\n ' +`${this.xtelefono_tomador }`, 'Fax \n\n '],
	
					  ]
				  }
			  }, {
				  text: 'direccion del Asegurado  \n\n '+ `${this.xdireccion_asegurado }`
			  }, {
				  style: 'tableExample',
				  table: {
					  widths: [150, 150, 70, '*', 30],
					  body: [
						['Estado \n\n ' +`${this.xestado_asegurado }`, 'Ciudad \n\n ' +`${this.xciudad_asegurado }`, 'Zona Postal \n\n ' +`${this.xzona_postal_asegurado }`, 'Teléfonos \n\n ' +`${this.xtelefono_asegurado }`, 'Fax \n\n '],
	
					  ]
				  }
			  }, {
				  text: 'DATOS DE LA PÓLIZA'
			  }, {
				  style: 'tableExample',
				  table: {
					  widths: [250, 90, 150],
					  body: [
						  ['Fecha de Suscripción' +`${this.ffecha_suscripcion }`, 'Vigencia' +`${this.xmoneda }`, 'Moneda \n\n ' +`${this.xmoneda }` ],
						  [{
							  text: 'Sucursal / Oficina \n\n ' +`${this.xsucursal }`,
							  italics: true,
							  
						  }, {
							  text: 'Canal de Venta \n\n ' +`${this.canal_venta }`,
							  italics: true,
							  
						  }, {
							  text: 'Frecuencia de Pago \n\n ' +`${this.xfrecuencia }`,
							  italics: true,
							  
						  }, ],
						  [{
							  text: 'Intermediario(s):\n\n ' +`${this.xintermediario }`,
							  italics: true,
							  
						  }, {
							  text: '',
							  italics: true,
							  
						  }, {
							  text: 'Participación\n\n ' +`${this.xparticipacion }`,
							  italics: true,
							  
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
						  ['Apellido\n\n ' +`${this.xasegurado1 }`, '', 'Nombre\n\n ' +`${this.xasegurado1 }`, ''],
						  [{
							  text: 'Cédula Identidad \n\n ' +`${this.xcedula1}`,
							  italics: true,
							  
						  }, {
							  text: '',
							  italics: true,
							  
						  }, {
							  text: 'Fecha Nacimiento \n\n ' +`${this.ffecha_nac1 }`,
							  italics: true,
							  
						  }, {
							  text: '',
							  italics: true,
							  
						  }, ],
						  [{
							  text: 'Parentesco \n\n ' +`${this.xparentesco1 }`,
							  italics: true,
							  
						  }, {
							  text: '',
							  italics: true,
							  
						  }, {
							  text: 'Sexo \n\n ' +`${this.xsexo1 }`,
							  italics: true,
							  
						  }, {
							  text: '',
							  italics: true,
							  
						  }, ],
	
					  ]
				  }
			  }, {
				  text: 'COBERTURAS'
			  }, {
				  style: 'tableExample',
				  table: {
					  widths: [150, 120, 150, 60],
					  body: [
						  [
						 'COBERTURAS \n\n ' +`${this.xcobertura1 }` + '\n\n'  +`${this.xcobertura2 }`+ '\n\n'  +`${this.xcobertura3 }`+ '\n\n'  +`${this.xcobertura4 }`+ '\n\n'  +`${this.xcobertura5  }`+ '\n\n'  +`${this.xcobertura6  }`,
						 'SUMA ASEGURADA\n\n ' +`${this.msuma1 }` + '\n\n'  +`${this.msuma2 }`+ '\n\n'  +`${this.msuma3 }`+ '\n\n'  +`${this.msuma4 }`+ '\n\n'  +`${this.msuma5  }`+ '\n\n'  +`${this.msuma6  }`, 
						 'DEDUCIBLE', 
						 'PRIMA\n\n ' +`${this.mprima1 }` + '\n\n'  +`${this.mprima2 }`+ '\n\n'  +`${this.mprima3 }`+ '\n\n'  +`${this.mprima4 }`+ '\n\n'  +`${this.mprima5  }`+ '\n\n'  +`${this.mprima6  }`,
						],
						  [{
								  text: ' ',
								  italics: true,
								  
							  }, {
								  text: '',
								  italics: true,
								  
							  },
							  [{
								  table: {
									  body: [
										  [
											'%',
											'U.T',
											'Monto Mínimo'
										],
									  ]
								  },
							  }], {
								  text: '',
								  italics: true,
								  
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
						  ['Recibo Nro.\n\n ' +`${this.xrecibo }`,
						 'Fecha de Emisión\n\n ' +`${this.fdesde_recibo }`, 
						 'Vigencia\n\n ' +`${this.fhasta_recibo }`, 
						 'Tipo de Movimiento\n\n ' +`${this.xtipo_mov }`],
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
							  
						  }, {
							  text: 'Representante',
							  italics: true,
							  
						  }, ],
						  [{
							  text: 'C.I./RIF:',
							  italics: true,
							  
						  }, {
							  text: 'Nombre y Apellido:',
							  italics: true,
							  
						  }, ],
						  [{
							  text: 'Firma:',
							  italics: true,
							  
						  }, {
							  text: 'Cargo \n\n Firma',
							  italics: true,
							  
						  }, ],
					  ]
				  }
			  }, ]
		  }
		}

}