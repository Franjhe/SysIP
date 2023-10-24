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

	//poliza emitida desde el cor del negocio
	xlogo: any;
	cpoliza: number | undefined;
	xcertificado: string | undefined;
	fecha: string | undefined;
	xtomador: string | undefined;
	xasegurado:string | undefined;
	xcedula_tomador: string | undefined;
	xcedula_asegurado:string | undefined;
	xdireccion_tomador: string | undefined;
	xestado_tomador: string | undefined;
	xciudad_tomador: string | undefined;
	xzona_postal_tomador:string | undefined;
	xtelefono_tomador: string | undefined;
	xdireccion_asegurado: string | undefined;
	xestado_asegurado: string | undefined;
	xciudad_asegurado: string | undefined;
	xzona_postal_asegurado: string | undefined;
	xtelefono_asegurado: string | undefined;
	fdesde_poliza: string | undefined;
	fhasta_poliza: string | undefined;
	xmoneda: string | undefined;
	xsucursal: string | undefined;
	canal_venta: string | undefined;
	xfrecuencia: string | undefined;
	xintermediario: string | undefined;
	xparticipacion: string | undefined;
	xrecibo: string | undefined;
	femision_rec: string | undefined;
	ffecha_emision: string | undefined;
	fdesde_recibo:string | undefined;
	xtipo_mov: string | undefined;
	fhasta_recibo: string | undefined;
	fcobro: string | undefined;
	xreferencia: string | undefined;
	mtotal_prima: number | undefined ;
	mgastos: number | undefined ;
	mtotal: number| undefined ;
	beneficiarios : any = [] 
	coberturas : any = [] 


	checked = false;
	indeterminate = false;
	marcaList: any[] = [];
	modeloList: any[] = [];
	TypeVehicleList: any[] = [];
	TypeVehicle: any[] = [];
	UtilityVehicle: any[] = [];
	ListClase: any[] = [];
	coberturaList: any[] = [];
	versionList: any[] = [];
	corredorList: any[] = [];
	planList: any[] = [];
	CountryList: any[] = [];
	StateList: any[] = [];
	CityList:  any[] = [];
	colorList:any[] = [];
	metodologiaList:any[] = [];
	canCreate: boolean = false;
	canDetail: boolean = false;
	canEdit: boolean = false;
	canDelete: boolean = false;
	status: boolean = true;
	cuotas: boolean = false;
	grua: boolean = false;
	accessoryList: any[] = [];
	descuento: boolean = false;
	cobertura: boolean = false;
	ccontratoflota:string | undefined;
	ctipopago:string | undefined;
	mprima_pagada: string | undefined;
	ccarga:string | undefined;
	xanexo: string | undefined;
	xobservaciones:string | undefined;
	xtituloreporte: string | undefined;
	xnombrerepresentantelegal: string | undefined;
	xdocidentidadrepresentantelegal:string | undefined;
	xnombrecliente:string | undefined;
	xdocidentidadcliente:string | undefined;
	xdireccionfiscalcliente:string | undefined;
	xciudadcliente:string | undefined;
	xestadocliente:string | undefined;
	xtelefonocliente:string | undefined;
	xemailcliente:string | undefined;
	xrepresentantecliente:string | undefined;
	mprimatotal = 0 ; 
	mprimaprorratatotal: number | undefined ;
	xpoliza:string | undefined;
	xsucursalsuscriptora:string | undefined;
	xsucursalemision:string | undefined;
	fsuscripcion: Date | undefined;
	fdesde_pol: Date | undefined;
	fhasta_pol: Date | undefined;
	fdesde_rec: Date | undefined;
	fhasta_rec: Date | undefined;
	femision: Date | undefined;
	plan: boolean = false
	ano: Date | undefined;
	bpago: boolean = false;
	pagos: boolean = false;
	bpagarubii: boolean = false;
	bemitir: boolean = false;
	bpagomanual: boolean = false;
	paymentList: {} | undefined;
	fnacimientopropietario: string | undefined;
	fnacimientopropietario2:string | undefined;
	ctasa_cambio: number | undefined ;
	mtasa_cambio: number | undefined ;
	fingreso_tasa: Date | undefined ;
	cestatusgeneral: number | undefined ;
	canalventa: string | undefined ;
  
	serviceList: any[] = [];
	coverageList: any[] = [];
	realCoverageList: any[] = [];
	annexList: any[] = [];
	receiptList: any[] = [];
	accesoriesList: any[] = [];
	ccorredor: number | undefined ;
	xcorredor:string | undefined;
	xnombrepropietario:string | undefined;
	xapellidopropietario:string | undefined;
	xtipodocidentidadpropietario:string | undefined;
	xdocidentidadpropietario:string | undefined;
	xtelefonocelularpropietario:string | undefined;
	xdireccionpropietario:string | undefined;
	xestadopropietario:string | undefined;
	xciudadpropietario:string | undefined;
	xestadocivilpropietario:string | undefined;
	xemailpropietario:string | undefined;
	xocupacionpropietario:string | undefined;
	cmetodologiapago: number | undefined ;
	xmetodologiapago: string | undefined ;
	xtelefonopropietario:string | undefined;
	cvehiculopropietario: number | undefined ;
	ctipoplan: number | undefined ;
	cplan: number | undefined ;
	ctiporecibo: number | undefined ;
	xmarca:string | undefined;
	xmodelo:string | undefined;
	xversion:string | undefined;
	xplaca:string | undefined;
	xuso:string | undefined;
	xtipovehiculo:string | undefined;
	fano: number | undefined ;
	xserialcarroceria:string | undefined;
	xserialmotor:string | undefined;
	mpreciovehiculo: number | undefined ;
	ctipovehiculo: number | undefined ;
	xtipomodelovehiculo:string | undefined;
	ncapacidadcargavehiculo: number | undefined ;
	ncapacidadpasajerosvehiculo: number | undefined ;
	xplancoberturas:string | undefined;
	xplanservicios:string | undefined;
	detail_form: number | undefined ;
	xnombrecorredor: any;
	xcolor:string | undefined;
	modalidad: boolean = true;
	montorcv: boolean = true;
	keyword = 'value';
	// Validation place 
	xdocidentidad :string | undefined;
	fdesde_pol_place : Date | undefined;
	fhasta_pol_place : Date | undefined;
	xpoliza_place :string | undefined;
	takersList: any[] = [];
	xprofesion :string | undefined;
	xrif :string | undefined;
	xdomicilio :string | undefined;
	xzona_postal :string | undefined;
	xnombre_ben :string | undefined;
	xcedula_ben :string | undefined;
	xtelefono :string | undefined;
	xcorreo :string | undefined;
	xestado :string | undefined;
	xciudad :string | undefined;
	 xtransmision: any;
	 nkilometraje: any;
	 xzona_postal_propietario: any;
	 xclase: any;
	 fmespol:string | undefined;
	 fanopol:string | undefined;



  constructor(
    private router: Router,
    private http: HttpClient
  ) 
  {

	// this.certificateData()

	// setTimeout(x => {
    //     this.certifiquedPDF() ;

    //   },4000)

	
  }

  //Funciones para generar el pdf emitido desde el cor del negocio
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


	//Funciones para generar el pdf de emision

	async LoadDataCertifiqued(contratoflota : any){

		let params = {
			ccontratoflota: contratoflota,
			cpais: 58,
			ccompania: 1
		}
		
		await this.http.post( environment.apiUrl + '/api/v1/certificate/detail', params).subscribe( async (response: any) => {
			if(response.status){
			console.log(response.data)
			this.ccarga = response.data.ccarga;
			this.xpoliza = response.data.xpoliza;
			this.xtituloreporte = response.data.xtituloreporte;
			this.xanexo = response.data.xanexo;
			this.xobservaciones = response.data.xobservaciones;
			this.xnombrerepresentantelegal = response.data.xnombrerepresentantelegal;
			this.xdocidentidadrepresentantelegal = response.data.xdocidentidadrepresentantelegal;
			this.xnombrecliente = response.data.xnombrecliente;
			this.xdocidentidadcliente = response.data.xdocidentidadcliente;
			this.xdireccionfiscalcliente = response.data.xdireccionfiscalcliente;
			this.xciudadcliente = response.data.xciudadcliente;
			this.xestadocliente = response.data.xestadocliente;
			this.fdesde_pol = response.data.fdesde_pol;
			this.fhasta_pol = response.data.fhasta_pol;
			if (response.data.xtelefonocliente) {
				this.xtelefonocliente = response.data.xtelefonocliente;
			} else {
				this.xtelefonocliente = ' ';
			}
			if (response.data.xemailcliente) {
				this.xemailcliente = response.data.xemailcliente;
			} else {
				this.xemailcliente = ' ';
			}
			if (response.data.xrepresentantecliente) {
				this.xrepresentantecliente = response.data.xrepresentantecliente;
			} else {
				this.xrepresentantecliente = ' ';
			}
			this.xsucursalemision = response.data.xsucursalemision;
			this.xsucursalsuscriptora = response.data.xsucursalsuscriptora;
			if(response.data.ccorredor){
				this.ccorredor = response.data.ccorredor;
				this.canalventa = 'INTERMEDIARIO'
			}else{
				this.canalventa = 'DIRECTO'
			}
			this.xnombrecorredor = response.data.xcorredor;
			this.xnombrepropietario = response.data.xnombrepropietario;
			this.xapellidopropietario = response.data.xapellidopropietario;
			this.xtipodocidentidadpropietario = response.data.xtipodocidentidadpropietario ;
			this.xdocidentidadpropietario = response.data.xdocidentidadpropietario ;
			this.xdireccionpropietario = response.data.xdireccionpropietario ;
			this.xtelefonocelularpropietario = response.data.xtelefonocelularpropietario;
			this.xestadopropietario = response.data.xestadopropietario;
			this.xciudadpropietario = response.data.xciudadpropietario;
			this.xocupacionpropietario = response.data.xocupacionpropietario;
			this.xestadocivilpropietario = response.data.xestadocivilpropietario;
			this.xemailpropietario = response.data.xemailpropietario;
			this.xtelefonopropietario = response.data.xtelefonopropietario;
			this.cvehiculopropietario = response.data.cvehiculopropietario;
			this.ctipoplan = response.data.ctipoplan;
			this.cplan = response.data.cplan;
			this.cmetodologiapago = response.data.cmetodologiapago;
			this.xmetodologiapago = response.data.xmetodologiapago;
			this.ctiporecibo = response.data.ctiporecibo;
			this.xmarca = response.data.xmarca;
			this.xmoneda = response.data.xmoneda;
			this.xmodelo = response.data.xmodelo;
			this.xversion = response.data.xversion;
			this.xplaca = response.data.xplaca;
			this.xuso = response.data.xuso;
			this.xtipovehiculo = response.data.xtipovehiculo;
			this.nkilometraje = response.data.nkilometraje;
			this.xclase = response.data.xclase;
			this.xtransmision = response.data.xtransmision;
			this.fano = response.data.fano;
			this.xserialcarroceria = response.data.xserialcarroceria;
			this.xserialmotor = response.data.xserialmotor;
			this.xcolor = response.data.xcolor;
			this.mpreciovehiculo = response.data.mpreciovehiculo;
			this.ctipovehiculo = response.data.ctipovehiculo;
			this.xtipomodelovehiculo = response.data.xtipomodelovehiculo;
			this.ncapacidadcargavehiculo = response.data.ncapacidadcargavehiculo;
			this.ncapacidadpasajerosvehiculo = response.data.ncapacidadpasajerosvehiculo;
			this.xplancoberturas = response.data.xplancoberturas;
			this.xplanservicios = response.data.xplanservicios;
			this.mprimatotal = response.data.mprimatotal;
			this.mprimaprorratatotal = response.data.mprimaprorratatotal;
			this.xzona_postal_propietario = response.data.xzona_postal_propietario;
			this.cestatusgeneral = response.data.cestatusgeneral;
			this.fsuscripcion = response.data.fsuscripcion;
			this.femision = response.data.femision;
			this.xrecibo = response.data.xrecibo;
			this.fdesde_rec = response.data.finiciorecibo;
			this.fhasta_rec = response.data.fhastarecibo;
			if(response.data.xtomador){
				this.xtomador = response.data.xtomador;
			}else{
				this.xtomador = this.xnombrecliente;
			}
			
			if(response.data.xprofesion){
				this.xprofesion = response.data.xprofesion;
			}else{
				this.xprofesion = ' ';
			}
	
			if(response.data.xrif){
				this.xrif = response.data.xrif;
			}else{
				this.xrif = this.xdocidentidadcliente;
			}
	
			if(response.data.xdomicilio){
				this.xdomicilio = response.data.xdomicilio;
			}else{
				this.xdomicilio = this.xdireccionfiscalcliente;
			}
	
			if(response.data.xzona_postal){
				this.xzona_postal = response.data.xzona_postal;
			}else{
				this.xzona_postal = ' ';
			}
	
			if(response.data.xtelefono){
				this.xtelefono = response.data.xtelefono;
			}else{
				this.xtelefono = this.xtelefonocliente;
			}
	
			if(response.data.xcorreo){
				this.xcorreo = response.data.xcorreo;
			}else{
				this.xcorreo = this.xemailcliente;
			}
	
			if(response.data.xestado){
				this.xestado = response.data.xestado;
			}else{
				this.xestado = this.xestadocliente;
			}
			
			if(response.data.xciudad){
				this.xciudad = response.data.xciudad;
			}else{
				this.xciudad = this.xciudadcliente;
			}
			
			if(response.data.fnacimientopropietario){
				let dateFormat = new Date(response.data.fnacimientopropietario);
				let dd = dateFormat.getDay();
				let mm = dateFormat.getMonth();
				let yyyy = dateFormat.getFullYear();
				this.fnacimientopropietario = dd + '-' + mm + '-' + yyyy;
			} else {
				this.fnacimientopropietario = ''
			}
			this.serviceList = response.data.services;
			this.coverageList = response.data.realCoverages;
			this.annexList = response.data.coverageAnnexes;
			this.receiptList = response.data.receipt;
			// await window.alert(`Se ha generado exitósamente la póliza n° ${this.xpoliza} del cliente ${this.xnombrecliente} para el vehículo de placa ${this.xplaca}`);
			try {this.createPDF()}
			catch(err) {console.log()};
			}
			await response.data.estatus 
		},
		(err) => { });
	}

	 getPaymentMethodology(cmetodologiapago : any) {
		let xmetodologiapago = this.metodologiaList.find(element => element.id === parseInt(cmetodologiapago));
		return xmetodologiapago.value
	  }

	 changeDateFormat(date : any) {
		if (date) {
		  let dateArray = date.substring(0,10).split("-");
		  return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
		}
		else {
		  return ' ';
		}
	  }
	
	  buildAccesoriesBody() {
		let body = [];
		if (this.accesoriesList.length > 0){
		  this.accesoriesList.forEach(function(row) {
			let dataRow = [];
			dataRow.push({text: row.xaccesorio, alignment: 'center', border: [true, false, true, false]});
			dataRow.push({text: row.msuma_accesorio, alignment: 'center', border: [false, false, true, false]})
			dataRow.push({text: row.mprima_accesorio, alignment: 'center', border: [false, false, true, false]})
			body.push(dataRow);
		  })
		} else {
		  let dataRow = [];
		  dataRow.push({text: ' ', border: [true, false, true, false]}, {text: ' ', border: [false, false, true, false]}, {text: ' ', border: [false, false, true, false]});
		  body.push(dataRow);
		}
		return body;
	  }
	
	  buildAnnexesBody() {
		let body = []
		if (this.annexList.length > 0) {
		  this.annexList.forEach(function(row) {
			let dataRow = [];
			dataRow.push({text: row.xanexo, border: [true, false, true, false]});
			body.push(dataRow);
		  })
		} else {
		  let dataRow = []
			dataRow.push({text: ' ', border: [true, false, true, false]});
			body.push(dataRow);
		}
		return body;
	  }
	
	  buildCoverageBody2() {
		let body: (({ text: any; margin: number[]; border: boolean[]; alignment?: undefined; fillColor?: undefined; } | { text: string; alignment: string; border: boolean[]; margin?: undefined; fillColor?: undefined; } | { text: string; fillColor: string; alignment: string; border: boolean[]; margin?: undefined; })[] | ({ text: any; decoration: string; margin: number[]; border: boolean[]; fillColor?: undefined; } | { text: string; fillColor: string; border: boolean[]; decoration?: undefined; margin?: undefined; })[])[] = []
		if (this.coverageList.length > 0){
		  this.coverageList.forEach(function(row) {
			if (row.ititulo == 'C') {
			  let dataRow = [];
			  dataRow.push({text: row.xcobertura, margin: [10, 0, 0, 0], bold: true, border: [false, false, false, false]});
			  //Se utiliza el formato DE (alemania) ya que es el que coloca '.' para representar miles, y ',' para los decimales fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
			  dataRow.push({text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.msumaasegurada)}`, alignment: 'right', border:[false, false, false, false]});
			  if (row.mtasa) {
				dataRow.push({text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.mtasa)}`, alignment: 'right', border:[false, false, false, false]});
			  } else {
				dataRow.push({text: ` `, alignment: 'right', border: [false, false, false, false]});
			  }
			  if (row.pdescuento) {
				dataRow.push({text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.pdescuento)} %`, alignment: 'right', border:[false, false, false, false]});
			  } else {
				dataRow.push({text: ` `, alignment: 'right', border: [false, false, false, false]});
			  }
			  if(row.mprima){
				dataRow.push({text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.mprima)}`, fillColor: '#f2f2f2', alignment: 'right', border:[false, false, false, false]});
			  } else {
				dataRow.push({text: ` `,fillColor: '#f2f2f2', alignment: 'right', border: [false, false, false, false]});
			  }
			  body.push(dataRow);
			}
			if (row.ititulo == 'T') {
			  let dataRow = [];
			  dataRow.push({text: row.xcobertura, decoration: 'underline', margin: [2, 0, 0, 0], border: [false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#D7D7D7', border:[false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#D7D7D7', border:[false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#D7D7D7', border:[false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#f2f2f2', border:[false, false, false, false]});
			  body.push(dataRow);
			}
		  });
		}
		return body;
	  }

	buildReceiptBody() {
		let body: (({ text: any; margin: number[]; border: boolean[]; alignment?: undefined; fillColor?: undefined; } | { text: string; alignment: string; border: boolean[]; margin?: undefined; fillColor?: undefined; } | { text: string; fillColor: string; alignment: string; border: boolean[]; margin?: undefined; })[] | ({ text: any; decoration: string; margin: number[]; border: boolean[]; fillColor?: undefined; } | { text: string; fillColor: string; border: boolean[]; decoration?: undefined; margin?: undefined; })[])[] = []
		if (this.receiptList.length > 0){
		  this.receiptList.forEach(function(row) {
			  let dataRow = [];
			  dataRow.push({text: row.crecibo, margin: [10, 0, 0, 0], bold: true, border: [false, false, false, false]});
			  dataRow.push({text: row.fdesde_rec, alignment: 'right', border:[false, false, false, false]});
			  dataRow.push({text: row.fhasta_rec, alignment: 'right', border:[false, false, false, false]});
			  dataRow.push({text: row.xmoneda, alignment: 'right', border:[false, false, false, false]});
			  dataRow.push({text: row.mprima, alignment: 'right', border:[false, false, false, false]});

			  body.push(dataRow);
		  });
		}
		return body;
	}
	
	  selectWatermark() {
		let watermarkBody = {}
		if (this.cestatusgeneral == 13) {
		  watermarkBody = {text: 'PENDIENTE DE PAGO', color: 'red', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70}
		}
		if (this.cestatusgeneral == 7) {
		  watermarkBody = {text: 'COBRADO', color: 'green', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70}
		}
		if (this.cestatusgeneral == 3) {
		  watermarkBody = {text: 'PÓLIZA ANULADA', color: 'red', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70}
		}
		return watermarkBody;
	  }
	
	  createPDF(){
		try{
			fetch('https://i.ibb.co/dbj12S8/firma.png')
			.then((response) => response.blob())
			.then((blob) => {
			  const reader = new FileReader();
			  reader.onload = () => {
				const base64 = reader.result; // Obtén la cadena de base64 de la imagen
				if (base64) {
				  this.xlogo = base64; // Almacena la imagen como base64 en this.xlogo
				}
			  };
			  reader.readAsDataURL(blob);
			});
			// this.xlogo = 'https://i.ibb.co/dbj12S8/firma.png'
			console.log(this.xlogo)
		const pdfDefinition: any = {
		  watermark: this.selectWatermark(),
		  info: {
			title: `Póliza - ${this.xnombrecliente}`,
			subject: `Póliza - ${this.xnombrecliente}`
		  },
		  footer: function(currentPage : any, pageCount : any) { 
			return {
			  table: {
				widths: ['*'],
				body: [
				  [{text: 'Página ' + currentPage.toString() + ' de ' + pageCount, fontSize: 7, alignment: 'center', border: [false, false, false, false]}]
				]
			  }
			}
		  },
		  content: [
			{
			  style: 'data',
			  table: {
				widths: [220, 230,'*'],
				body: [
				  [ {image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
				  + 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
				  + 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy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', width: 180, height: 50, border:[false, false, false, false]},
				  {text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false]}, {text: `\n\n${this.ccarga}\n0\n0`, alignment: 'right', bold: true, border: [false, false, false, false]},
				 ]
				]
			  }
			},
			{
				alignment: 'center',
				style: 'title',
				margin: [0, 0, 0, 6],
				text: [
				  { text: '\nCUADRO - RECIBO DE PÓLIZA', bold: true },
				  { text: '\nAUTOMÓVIL', bold: true },
				]
			},
			{
				style: 'data',
				table: {
				widths: ['*'],
				body: [
					[{text: 'DATOS DEL TOMADOR - ASEGURADO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				table: {
				widths: [40, 140, 70, 70, 120, '*'],
				body: [
				  [{text: 'TOMADOR:', bold: true, border: [false, false, false, false]}, {text: this.xtomador, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif, border: [false, false, false, false]}, {text: 'CÓDIGO RAMO PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: '18', border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				table: {
				widths: [40, 140, 40, 100, 120, '*'],
				body: [
				  [{text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xdireccionfiscalcliente, border: [false, false, false, false]}, {text: 'EMAIL:', bold: true, border: [false, false, false, false]}, {text: this.xemailcliente, border: [false, false, false, false]}, {text: 'PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: `${this.ccarga}`, border: [false, false, false, false]}]
				]
				}
			},
			{
			  style: 'data',
			  table: {
				widths: [30, 100, 40, 50, 60, 22, 50, '*'],
				body: [
				  [{text: 'CIUDAD:', bold: true, border: [false, false, false, false]}, {text: this.xciudad, border: [false, false, false, false]}, {text: 'ESTADO:', bold: true, border: [false, false, false, false]}, {text: this.xestado, border: [false, false, false, false]}, {text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false]}, {text: this.xzona_postal, border: [false, false, false, false]}, {text: 'TELÉFONO:', bold: true, border: [false, false, false, false]}, {text: this.xtelefono, border: [false, false, false, false]}]
				]
			  }
			},
			{
				style: 'data',
				table: {
				widths: [45, 135, 70, 70],
				body: [
				  [{text: 'ASEGURADO:', bold: true, border: [false, false, false, false]}, {text: `${this.xnombrepropietario} ${this.xapellidopropietario}`, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif, border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				table: {
				widths: [40, 140, 40, 100],
				body: [
				  [{text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xdireccionfiscalcliente, border: [false, false, false, false]}, {text: 'EMAIL:', bold: true, border: [false, false, false, false]}, {text: this.xemailcliente, border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 6],
				table: {
				  widths: [30, 100, 40, 50, 60, 22, 50, '*'],
				  body: [
					[{text: 'CIUDAD:', bold: true, border: [false, false, false, false]}, {text: this.xciudad, border: [false, false, false, false]}, {text: 'ESTADO:', bold: true, border: [false, false, false, false]}, {text: this.xestado, border: [false, false, false, false]}, {text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false]}, {text: this.xzona_postal, border: [false, false, false, false]}, {text: 'TELÉFONO:', bold: true, border: [false, false, false, false]}, {text: this.xtelefono, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'DATOS DE LA PÓLIZA', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: [60, 100, 60, 110, 60, '*'],
				  body: [
					[{text: 'FECHA EMISIÓN:', bold: true, border: [false, false, false, false]}, {text: `${this.changeDateFormat(this.femision)}`, border: [false, false, false, false]}, {text: 'VIGENCIA:', bold: true, border: [false, false, false, false]}, {text: `${this.changeDateFormat(this.fdesde_pol)}  -  ${this.changeDateFormat(this.fhasta_pol)}`, border: [false, false, false, false]}, {text: 'MONEDA:', bold: true, border: [false, false, false, false]}, {text: this.xmoneda, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				widths: [50, 110, 60, 80, 80, '*'],
				body: [
				  [{text: 'SUCURSAL:', bold: true, border: [false, false, false, false]}, {text: this.xsucursalemision, border: [false, false, false, false]}, {text: 'CANAL DE VENTA:', bold: true, border: [false, false, false, false]}, {text: this.canalventa, border: [false, false, false, false]}, {text: 'FRECUENCIA DE PAGO:', bold: true, border: [false, false, false, false]}, {text: `${this.xmetodologiapago}`, border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 6],
				table: {
				widths: [60, 280, '*', '*'],
				body: [
				  [{text: 'INTERMEDIARIO:', bold: true, border: [false, false, false, false]}, {text: this.xnombrecorredor, border: [false, false, false, false]}, {text: 'TIPO MOVIM.', bold: true, border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'DATOS DEL VEHICULO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: [30, 50, 40, 60, 50, 120, 60, '*'],
				  body: [
					[{text: 'MARCA:', bold: true, border: [false, false, false, false]}, {text: this.xmarca, border: [false, false, false, false]}, {text: 'MODELO:', bold: true, border: [false, false, false, false]}, {text: this.xmodelo, border: [false, false, false, false]}, {text: 'VERSION:', bold: true, border: [false, false, false, false]}, {text: this.xversion, border: [false, false, false, false]}, {text: 'AÑO:', bold: true, border: [false, false, false, false]}, {text: this.fano, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: [70, 60, 80, 60, 30, 40, 70, '*'],
				  body: [
					[{text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false]}, {text: this.xserialcarroceria, border: [false, false, false, false]}, {text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false]}, {text: this.xserialmotor, border: [false, false, false, false]}, {text: 'PLACA:', bold: true, border: [false, false, false, false]}, {text: this.xplaca, border: [false, false, false, false]}, {text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xtransmision, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 6],
				table: {
				  widths: [30, 50],
				  body: [
					[{text: 'COLOR:', bold: true, border: [false, false, false, false]}, {text: this.xcolor, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'COBERTURAS CONTRATADAS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
			  style: 'data',
			  table: {
				widths: [150, 100, 60, 50, '*'],
				body: [
				  [{text: 'COBERTURAS', bold: true, border: [false, false, false, false]}, {text: 'SUMA ASEGURADA', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'TASAS', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: '% DESC.', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'PRIMA', alignment: 'center', bold: true, border: [false, false, false, false]}]
				]
			  }
			},
			{
			  style: 'data',
			  table: {
				widths: [150, 100, 60, 50, '*'],
				body: this.buildCoverageBody2()
			  }
			},
			{
			  style: 'data',
			  margin: [0, 0, 0, 10],
			  table: {
				widths: [150, 100, 60, 50, '*'],
				body: [
				  [{text: 'Prima total', colSpan: 4, alignment: 'right', bold: true, border: [false, false, false, false]}, {}, {}, {}, {text: `${this.xmoneda} ${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(this.mprimatotal)}`, alignment: 'right', bold: true, border: [false, false, false, false]}]
				]
			  }
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'RECIBOS DE PRIMAS - FRACCIONAMIENTO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: [150, 100, 60, 50, '*'],
				  body: [
					[{text: 'NO. RECIBO', bold: true, border: [false, false, false, false]}, {text: 'FECHA DESDE', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'FECHA HASTA', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'MONEDA', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'PRIMA', alignment: 'center', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 10],
				table: {
				  widths: [135, 80, 80, 45, 82],
				  body: this.buildReceiptBody()
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'DECLARACIÓN DE FE', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'En mi carácter de Tomador de la Póliza contratada con La Mundial de Seguros, C.A., bajo Fe de Juramento certifico que el dinero utilizado para el pago de la prima de la referida Póliza, proviene de fuente lícita; por lo tanto no tiene relación alguna con dinero, capitales, bienes, haberes, valores o títulos producto de actividades o acciones a que se refiere el Articulo 37 de la Ley Orgánica sobre Sustancias Estupefacientes y Psicotrópicas.', alignment: 'justify', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 10],
				table: {
				  widths: [150, '*'],
				  body: [
					[{text: 'POR EL TOMADOR', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}, {text: 'POR LA MUNDIAL DE SEGUROS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'tableExample',
				table: {
				  widths: [150, 110, '*'],
				  heights: 40,
				  body: [
					[
					  {
						text: `Nombre Apellido / Denominación Social:\n${this.xnombrepropietario} ${this.xapellidopropietario}\n\nC.I./RIF: ${this.xrif}\n\nFirma:`,
						fontSize: 7,
						border: [true, true, false, true]
					  },
					  {
						text: 'Representante\nNombre Apellido\n\n\n\nFirma Autorizada',
						fontSize: 7,
						border: [true, true, false, true]
					  },
					//   {
					// 	table: {
					// 	  body: [
					// 		[ {image: this.xlogo, width: 180, height: 50, border:[false, false, false, false]}]
					// 	  ]
					// 	},
					//   }
					]
				  ]
				}
			  }
		  ], 
		  styles: {
			title: {
			  fontSize: 9.5,
			  bold: true,
			  alignment: 'center'
			},
			header: {
			  fontSize: 7.5,
			  color: 'gray'
			},
			data: {
			  fontSize: 6.5
			}
		  }
		}
		let pdf = pdfMake.createPdf(pdfDefinition);
		pdf.download(`Póliza - ${this.xnombrecliente}`);
		pdf.open();

	  }
		catch(err){console.log()}
	  }


}