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

	//poliza

	cpoliza: number | undefined;
	fanopol: string | undefined ;
	cci_rif: string | undefined ;
	finclusion: string | undefined ;
	fmespol: string | undefined ;
	fnacimiento: string | undefined ;
	xcedula: string | undefined ;
	xnombre: string | undefined ;
	xparentesco: string | undefined ;
	xsexo: string | undefined ;

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
	femision_rec: string | undefined;
	fdesde_poliza: string | undefined;
	fhasta_poliza: string | undefined;
	xlogo: any;

	beneficiarios : any = [] 
	coberturas : any = [] 

  constructor(
    private router: Router,
    private http: HttpClient
  ) 
  {

	this.certificateData()

	setTimeout(x => {
        this.certifiquedPDF() ;

      },4000)

	
  }

    async certificateData(){

      this.http.get(environment.apiUrl + '/api/v1/certificate/search').subscribe((response: any) => {
     
 
		//poliza 
		
		for(let i = 0; i < response.data.poliza.length; i++){

			this.cpoliza = response.data.poliza[0][0].cpoliza;
			this.canal_venta = response.data.poliza[0][0].canal_venta;
			this.fanopol = response.data.poliza[0][0].fanopol;

			//fecha de poliza 
			let dateFormatPoliza = new Date(response.data.poliza[0][0].femision_pol);
			let fechaISPoliza = dateFormatPoliza.toISOString().substring(0, 10);
			this.fecha = fechaISPoliza;

			let fdesdeP = new Date(response.data.poliza[0][0].fdesde_pol);
			let ISOFdesdeP = fdesdeP.toISOString().substring(0, 10);
			this.fdesde_poliza = ISOFdesdeP;

			let fhastaP = new Date(response.data.poliza[0][0].fhasta_pol);
			let ISOFhastaP = fhastaP.toISOString().substring(0, 10);
			this.fhasta_poliza = ISOFhastaP;

			//fechas de recibo
			let femisionR = new Date(response.data.poliza[0][0].femision_rec);
			let ISOFrecibo = femisionR.toISOString().substring(0, 10);
			this.femision_rec = ISOFrecibo;

			let fdesdeR = new Date(response.data.poliza[0][0].fdesde_rec);
			let ISOFdesdeR = fdesdeR.toISOString().substring(0, 10);
			this.fdesde_recibo = ISOFdesdeR;

			let fhastaR = new Date(response.data.poliza[0][0].fhasta_rec);
			let ISOFhastaR = fhastaR.toISOString().substring(0, 10);
			this.fhasta_recibo = ISOFhastaR;

			this.xreferencia = response.data.poliza[0][0].xreferencia;
			this.fcobro = response.data.poliza[0][0].fcobro;
			this.fmespol = response.data.poliza[0][0].fmespol;
			this.mgastos = response.data.poliza[0][0].mgastos;
			this.mtotal = response.data.poliza[0][0].mtotal;
			this.mtotal_prima = response.data.poliza[0][0].mtotal_prima;

			this.xparticipacion = response.data.poliza[0][0].xparticipacion;
			this.xfrecuencia = response.data.poliza[0][0].xfrecuencia;
			
			this.xasegurado = response.data.poliza[0][0].xasegurado;
			this.xcedula_asegurado = response.data.poliza[0][0].xcedula_asegurado;
			this.xcedula_ben = response.data.poliza[0][0].xcedula_ben;
			this.xcedula_tomador = response.data.poliza[0][0].xcedula_tomador;
			this.xcertificado = response.data.poliza[0][0].xcertificado;
			this.xciudad_asegurado = response.data.poliza[0][0].xciudad_asegurado;
			this.xciudad_tomador = response.data.poliza[0][0].xciudad_tomador;
			this.xestado_asegurado = response.data.poliza[0][0].xestado_asegurado;
			this.xestado_tomador = response.data.poliza[0][0].xestado_tomador;
			this.xintermediario = response.data.poliza[0][0].xintermediario;
			this.xmoneda = response.data.poliza[0][0].xmoneda;
			this.xnombre_ben = response.data.poliza[0][0].xnombre_ben;
			this.xrecibo = response.data.poliza[0][0].xrecibo;
			this.xsucursal = response.data.poliza[0][0].xsucursal;
			this.xtelefono_asegurado = response.data.poliza[0][0].xtelefono_asegurado;
			this.xtelefono_tomador = response.data.poliza[0][0].xtelefono_tomador;
			this.xtipo_mov = response.data.poliza[0][0].xtipo_mov;
			this.xtomador = response.data.poliza[0][0].xtomador;
			this.xzona_postal_asegurado = response.data.poliza[0][0].xzona_postal_asegurado;
			this.xzona_postal_tomador = response.data.poliza[0][0].xzona_postal_tomador;

		}

		//beneficiario

		this.beneficiarios = [];
		for(let i = 0; i <response.data.beneficiario.length; i++){

			let fnacimiento = new Date(response.data.beneficiario[0][0].fnacimiento);
			let ISOnacimiento = fnacimiento.toISOString().substring(0, 10);
	
			this.beneficiarios.push({

			fnacimiento: ISOnacimiento, 
			xcedula: response.data.beneficiario[0][0].xcedula,
			xnombre: response.data.beneficiario[0][0].xnombre , 
			xparentesco: response.data.beneficiario[0][0].xparentesco,
			xsexo: response.data.beneficiario[0][0].xsexo,
			});
		}



		//coberturas

		this.coberturas = []
		for(let i = 0; i < response.data.cobertura.length; i++){

			this.coberturas.push({
				cmoneda: response.data.cobertura[0][0].cmoneda, 
				mprima: response.data.cobertura[0][0].mprima,
				mprimaext: response.data.cobertura[0][0].mprimaext ,
				msumaaseg: response.data.cobertura[0][0].msumaaseg,
				xdescripcion_l:response.data.cobertura[0][0].xdescripcion_l,
			});
		}


      });
	  
	  this.buildBeneficiariosBody()

	  this.buildCoberturasBody()
    }

	buildBeneficiariosBody() {
		let body = [];

		if (this.beneficiarios.length > 0){

			this.beneficiarios.forEach(function(row: 
				{
					fnacimiento: any; 
					xcedula: any; 
					xnombre: any; 
					xparentesco: any; 
					xsexo: any; 
				}
				) {
			let dataRow = [];
			dataRow.push({fontSize: 10,text: 'Fecha Nacimiento \n\n' + row.fnacimiento, alignment: 'center', });
			dataRow.push({fontSize: 10,text: 'Cédula Identidad\n\n' + row.xcedula, alignment: 'center',})
			dataRow.push({fontSize: 10,text: 'Nombre\n\n' + row.xnombre, alignment: 'center',})
			dataRow.push({fontSize: 10,text: 'Parentesco\n\n' + row.xparentesco, alignment: 'center',})
			dataRow.push({fontSize: 10,text: 'Sexo\n\n' + row.xsexo, alignment: 'center',})
			body.push(dataRow);
			})
		} else {
			let dataRow = [];
			dataRow.push(
			{fontSize: 10,text: 'Fecha Nacimiento \n\n',},
			{fontSize: 10,text: 'Cédula Identidad\n\n',}, 
			{fontSize: 10,text: 'Nombre\n\n',},
			{fontSize: 10,text: 'Parentesco\n\n',},
			{fontSize: 10,text: 'Sexo\n\n',}
			);
			body.push(dataRow);
		}
		return body;
	}

	buildCoberturasBody() {
		let body = [];
		if (this.coberturas.length > 0){
		  this.coberturas.forEach(function(row: 
			{ 
				cmoneda: any;
				mprima: any; 
				mprimaext: any; 
				msumaaseg: any; 
				xdescripcion_l: any; 

			}) {
			let dataRow = [];
			dataRow.push({fontSize: 10,text: 'COBERTURAS \n\n' + row.xdescripcion_l, alignment: 'center', });
			dataRow.push({fontSize: 10,text: 'SUMA ASEGURADA \n\n' + row.cmoneda + ' '  + row.msumaaseg, alignment: 'center',})
			dataRow.push(
			{fontSize: 10,text: 'DEDUCIBLE \n\n' })
			dataRow.push({fontSize: 10,text: 'PRIMA\n\n' +  row.cmoneda + ' ' + row.mprima, alignment: 'center',})

			body.push(dataRow);
		  })
		} else {
		  let dataRow = [];
		  dataRow.push(
			{fontSize: 10,text: ' ', }, 
			{fontSize: 10,text: ' ',}, 
			{fontSize: 10,text: ' ', }, 
			{fontSize: 10,text: ' ',}, 

			);
		  body.push(dataRow);
		}
		return body;
	}


	async certifiquedPDF() {
		try {

		  const imgURL = 'https://i.ibb.co/SJbTZQt/logo-color.png'; 
	
		  fetch(imgURL)
			.then(response => response.blob())
			.then(blob => {
			  const reader = new FileReader();
			  reader.onload = () => {
				const dataURL = reader.result;
				this.xlogo = dataURL;
	
				var pdfDefinition = {
					content: [
	  
					  {
						  style: 'tableExample',
						  table: {
							  widths: [100 ,250 , 150],
							  body: [
								  [
									  {									  
									  style: 'tableExample',
									  table: {
										  widths: ['*'],
										  body: [
											  [{image: this.xlogo, width: 140, height: 40, border:[false, false, false, false] , },],
											  [{fontSize: 10,text: 'RIF.: J-00084644-8',alignment: 'center',border:[false, false, false, false]}],

									  ]
									  },
									},
	  
									  {fontSize: 12,text: 'Cuadro - Recibo de Póliza',absolutePosition: { x:205, y:60 }, bold: true,  border:[false, false, false, false]},
	  
									  {				  
										  style: 'tableExample',
										  table: {
											  widths: ['*'],
											  body: [
												  [{fontSize: 10,text: 'Póliza     ' +`${this.cpoliza }`,alignment: 'center',bold: true}],
												  [{fontSize: 10,text: 'Certificado     ' +`${this.xcertificado }`,alignment: 'center',bold: true}],
												  [{fontSize: 10,text: 'Fecha  ' +`${this.fecha }`,alignment: 'center',bold: true}],
										  ]
										  },
										 
									  }
								  ],
								],

						  	},
							layout: 'noBorders'
						  
					   },
	  
					  {
						style: 'tableExample',
						fillColor: '#eeeeee',
						table: {
							widths: ['*'],
							body: [
								[{fontSize: 10,text: 'DATOS DEL TOMADOR Y ASEGURADO',alignment: 'center',bold: true,}
							],
						  ]
						}
						
					 }, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [345, 150],
							body: [
								['Tomador \n\n ' +`${this.xtomador }`, 'Cédula de Identidad / R.I.F.\n\n ' +`${this.xcedula_tomador }` ],
								['Asegurado \n\n ' +`${this.xasegurado }`, 'Cédula de Identidad / R.I.F. \n\n ' +`${this.xcedula_asegurado }`]
							]
						}
					}, {
	  
						style: 'tableExample',
						table: {
							widths: ['*'],
							body: [
								[{fontSize: 10,text: 'Direccion del tomador  \n\n ' +`${this.xdireccion_tomador }`,}
							],
						  ]
						}
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [150, 150, 70, '*', 35],
							body: [
								['Estado \n\n ' +`${this.xestado_tomador }`, 'Ciudad \n\n ' +`${this.xciudad_tomador }`, 'Zona Postal \n\n ' +`${this.xzona_postal_tomador }`, 'Teléfonos \n\n ' +`${this.xtelefono_tomador }`, 'Fax \n\n '],
		  
							],
							
						},
						
					}, {
	  
					  style: 'tableExample',
					  table: {
						  widths: ['*'],
						  body: [
							  [{fontSize: 10,text: 'Direccion del Asegurado  \n\n '+ `${this.xdireccion_asegurado }`,}
						  ],
						]
					  }
						
						
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [150, 150, 70, '*', 30],
							body: [
							  ['Estado \n\n ' +`${this.xestado_asegurado }`, 'Ciudad \n\n ' +`${this.xciudad_asegurado }`, 'Zona Postal \n\n ' +`${this.xzona_postal_asegurado }`, 'Teléfonos \n\n ' +`${this.xtelefono_asegurado }`, 'Fax \n\n '],
		  
							]
						}
					}, {
						style: 'tableExample',
						fillColor: '#eeeeee',
						table: {
							widths: ['*'],
							body: [
								[{fontSize: 10,text: 'DATOS DE LA PÓLIZA',alignment: 'center',bold: true,}
							],
						  ]
						}
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [170, 170, 147],
							body: [
								['Fecha de Suscripción \n\n' +`${this.fecha }`,
									'Vigencia\n\n ' +'Desde '+`${this.fdesde_poliza }`+'\n\n hasta '+`${this.fhasta_poliza }`, 
	   
									 'Moneda \n\n ' +`${this.xmoneda }` ],
								[{
									fontSize: 10,text: 'Sucursal / Oficina \n\n ' +`${this.xsucursal }`,
									
									
								}, {
									fontSize: 10,text: 'Canal de Venta \n\n ' +`${this.canal_venta }`,
									
									
								}, {
									fontSize: 10,text: 'Frecuencia de Pago \n\n ' +`${this.xfrecuencia }`,
									
									
								}, ],
								[{
									fontSize: 10,text: 'Intermediario(s):\n\n ' +`${this.xintermediario }`,
									
									
								}, {
									fontSize: 10,text: '',
									
									
								}, {
									fontSize: 10,text: 'Participación\n\n ' +`${this.xparticipacion }`,
									
									
								}, ]
							]
						}
					}, {
	  
						style: 'tableExample',
						fillColor: '#eeeeee',
						table: {
							widths: ['*'],
							body: [
								[{fontSize: 10,text: 'ASEGURADOS / DEPENDIENTES',alignment: 'center',bold: true,}
							],
						  ]
						}
						
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [100, 90, 140, 70 , '*'],
							body: this.buildBeneficiariosBody()
						}
					}, {
	  
						style: 'tableExample',
						fillColor: '#eeeeee',
						table: {
							widths: ['*'],
							body: [
								[{fontSize: 10,text: 'COBERTURAS',alignment: 'center',bold: true,}
							],
						  ]
						}
						
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [150, 120, 130, 80],
							body: this.buildCoberturasBody()
						}
					}, {
	  
						style: 'tableExample',
						fillColor: '#eeeeee',
						table: {
							widths: ['*'],
							body: [
								[{fontSize: 10,text: 'DATOS DEL RECIBO',alignment: 'center',bold: true,}
							],
						  ]
						}
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [70, 100, 170, 140],
							body: [
								[
							   'Recibo Nro.\n\n ' +`${this.xrecibo }`,
							   'Fecha de Emisión\n\n ' +`${this.femision_rec }`, 
							   'Vigencia\n\n ' +'Desde '+`${this.fdesde_recibo }`+'\n\n hasta '+`${this.fhasta_recibo }`, 
							   'Tipo de Movimiento\n\n ' +`${this.xtipo_mov }`],
							]
						}
					}, {
						fontSize: 10,
						table: {
							widths: [90, 70, 80, 80, 150],
							body: [
								[
								  'Fecha de Cobro.\n\n ' +`${this.fcobro }`,
								  'Referencia.\n\n ' +`${this.xreferencia }`,
								  'Total Prima.\n\n ' +`${this.mtotal_prima }`,
								  'Gastos.\n\n ' +`${this.mgastos }`, 
								  'Total a Cobrar.\n\n ' +`${this.mtotal }`
							  ],
							]
						}
					},
					{
						style: 'tableExample',
						fontSize: 10,
						bold: true,
						table: {
							widths: ['*'],
							body: [
								[{text:'  \n\n ', border:[false, false, false, false]}],
							]
						}
					},  {
						style: 'tableExample',
						fontSize: 10,
						bold: true,
						table: {
							widths: ['*'],
							body: [
								['OBSERVACIONES:  \n\n '],
							]
						}
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: ['*'],
							body: [
								['El Asegurador entregará al Tomador este Cuadro Póliza Recibo, junto con las condiciones generales, las condiciones particulares, los anexos, si los hubiere, copia de lasolicitud de seguro y demás documentos que formen parte del contrato. En las renovaciones la obligación se mantendrá si se modifican las condiciones originalmente contratadas. El Tomador, Asegurado o Beneficiario de la Póliza, que sienta vulneración de sus derechos, y requieran presentar cualquier denuncia, queja, reclamo o solicitud de asesoría; surgida con ocasión de este contrato de seguros; puede acudir a la Oficina de la Defensoría del Asegurado de la Superintendencia de la Actividad Aseguradora, o comunicarlo a través de la página web: http://www.sudeaseg.gob.ve/.'],
							]
						}
					}, {
						style: 'tableExample',
						fontSize: 10,
						table: {
							widths: [240, 255],
							body: [
								['Por el Tomador',
								 'Por La Mundial C.A. Venezolana de Seguros de Crédito'],
								[{
									fontSize: 10,text: 'Nombre y Apellido/Denominación Social:\n\n',
									
									
								}, {
									fontSize: 10,text: 'Representante\n\n',
									
									
								}, ],
								[{
									fontSize: 10,text: 'C.I./RIF:',
									
									
								}, {
									fontSize: 10,text: 'Nombre y Apellido:',
									
									
								}, ],
								[{
									fontSize: 10,text: 'Firma:',
									
									
								}, {
									fontSize: 10,text: 'Cargo \n\n Firma',
									
									
								}, ],
							]
						}
					}, ],
					styles: {
		  
					  header: {
						  fontSize: 10,
						  bold: true,
						  background : 'cornflowerblue',
					  },
					  subheader: {
						  fontSize: 15,
						  bold: true,
						  background : 'cornflowerblue',
					  },
	  
				  }
				}
	

				const mamefile = `${ ' Poliza #' + this.cpoliza}.pdf`
				const PdfKit = pdfMake.createPdf(pdfDefinition);
				PdfKit.open();
				//PdfKit.download(mamefile);
			  };
			  reader.readAsDataURL(blob);
			});
		} catch (err) {
		  console.error(err);
		}
	}

}