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
	xrif_tomador: string | undefined;
	xcorreo_tomador: string | undefined;
	xasegurado:string | undefined;
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
	xgrua:string | undefined;
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
			this.xrif_tomador = response.data.poliza[0][0].xcedula_tomador;
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
								['Tomador \n\n ' +`${this.xtomador }`, 'Cédula de Identidad / R.I.F.\n\n ' +`${this.xrif_tomador }` ],
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
			this.xnombrecliente = response.data.xnombrecliente
			this.xdocidentidadcliente = response.data.xdocidentidadcliente;
			this.xdireccionfiscalcliente = response.data.xdireccionfiscalcliente
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
				this.xemailcliente = response.data.xemailcliente
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
			this.xnombrepropietario = response.data.xnombrepropietario
			this.xapellidopropietario = response.data.xapellidopropietario
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
			console.log(this.mprimatotal)
			this.mprimaprorratatotal = response.data.mprimaprorratatotal;
			this.xzona_postal_propietario = response.data.xzona_postal_propietario;
			this.cestatusgeneral = response.data.cestatusgeneral;
			this.fsuscripcion = response.data.fsuscripcion;
			this.femision = response.data.femision;
			this.xrecibo = response.data.xrecibo;
			this.fdesde_rec = response.data.finiciorecibo;
			this.fhasta_rec = response.data.fhastarecibo;
			this.xgrua = response.data.xgrua
			if(response.data.xtomador){
				this.xtomador = response.data.xtomador
			}else{
				this.xtomador = this.xnombrecliente;
			}

			if(response.data.xrif_tomador){
				this.xrif_tomador = response.data.xrif_tomador
			}else{
				this.xrif_tomador = this.xdocidentidadcliente;
			}
			
			if(response.data.xzona_postal_tomador){
				this.xzona_postal_tomador = response.data.xzona_postal_tomador
			}else{
				this.xzona_postal_tomador = ' ';
			}

			if(response.data.xtelefono_tomador){
				this.xtelefono_tomador = response.data.xtelefono_tomador;
			}else{
				this.xtelefono_tomador = this.xtelefonocliente;
			}

			if(response.data.xcorreo_tomador){
				this.xcorreo_tomador = response.data.xcorreo_tomador
			}else{
				this.xcorreo_tomador = this.xemailcliente;
			}

			if(response.data.xestado_tomador){
				this.xestado_tomador = response.data.xestado_tomador
			}else{
				this.xestado_tomador = this.xestadocliente;
			}

			if(response.data.xciudad_tomador){
				this.xciudad_tomador = response.data.xciudad_tomador
			}else{
				this.xciudad_tomador = this.xciudadcliente;
			}

			if(response.data.xdireccion_tomador){
				this.xdireccion_tomador = response.data.xdireccion_tomador
			}else{
				this.xdireccion_tomador = this.xdireccionfiscalcliente;
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
			this.accesoriesList = response.data.accesories;
			// await window.alert(`Se ha generado exitósamente la póliza n° ${this.xpoliza} del cliente ${this.xnombrecliente} para el vehículo de placa ${this.xplaca}`);
			try {this.createPDF()}
			catch(err) {console.log()};
			}
			await response.data.estatus 
		},
		(err) => { });
	}

	getMonthAsString(month: any) {
		month = month + 1;
		if (month == 1) {
		  return 'Enero'
		}
		if (month == 2) {
		  return 'Febrero'
		}
		if (month == 3) {
		  return 'Marzo'
		}
		if (month == 4) {
		  return 'Abril'
		}
		if (month == 5) {
		  return 'Mayo'
		}
		if (month == 6) {
		  return 'Junio'
		}
		if (month == 7) {
		  return 'Julio'
		}
		if (month == 8) {
		  return 'Agosto'
		}
		if (month == 9) {
		  return 'Septiembre'
		}
		if (month == 10) {
		  return 'Octubre'
		}
		if (month == 11) {
		  return 'Noviembre'
		}
		if (month == 12) {
		  return 'Diciembre'
		}

		return 'Desconocido';
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
			dataRow.push({text: row.xaccesorio, margin: [11, 0, 0, 0], alignment: 'left', bold: true, border: [false, false, false, false]});
			body.push(dataRow);
		  })
		} else {
		  let dataRow = [];
		  dataRow.push({text: ' ', border: [false, false, false, false]});
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
			  if(row.m2){
				dataRow.push({text: row.m2, fillColor: '#FFFFFF', alignment: 'right', border:[false, false, false, false]});
			  } else {
				dataRow.push({text: ` `, alignment: 'right', border: [false, false, false, false]});
			  }
			  body.push(dataRow);
			}
			if (row.ititulo == 'T') {
			  let dataRow = [];
			  dataRow.push({text: row.xcobertura, decoration: 'underline', margin: [2, 0, 0, 0], border: [false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#FFFFFF', border:[false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#FFFFFF', border:[false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#FFFFFF', border:[false, false, false, false]});
			  dataRow.push({text: ` `, fillColor: '#FFFFFF', border:[false, false, false, false]});
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
			  dataRow.push({text: row.fcobro, alignment: 'right', border:[false, false, false, false]});
			  dataRow.push({text: row.xmoneda, alignment: 'right', border:[false, false, false, false]});
			  dataRow.push({text: row.mprima, alignment: 'right', border:[false, false, false, false]});
			  dataRow.push({text: row.xestatus, alignment: 'right', border:[false, false, false, false]});

			  body.push(dataRow);
		  });
		}
		return body;
	}

	buildServiceArysBody() {
		let body: (({ text: any; margin: number[]; border: boolean[]; alignment?: undefined; fillColor?: undefined; } | { text: string; alignment: string; border: boolean[]; margin?: undefined; fillColor?: undefined; } | { text: string; fillColor: string; alignment: string; border: boolean[]; margin?: undefined; })[] | ({ text: any; decoration: string; margin: number[]; border: boolean[]; fillColor?: undefined; } | { text: string; fillColor: string; border: boolean[]; decoration?: undefined; margin?: undefined; })[])[] = []
		if (this.serviceList.length > 0){
			this.serviceList.forEach(function(row) {
				let dataRow = [];
				// dataRow.push({text: row.cservicio, margin: [100, 0, 0, 0], bold: true, border: [false, false, false, false]});
				dataRow.push({text: row.xservicio, alignment: 'center', border:[false, false, false, false]});

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
		this.xlogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAACLCAYAAACjgGhzAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAABc1JHQgCuzhzpAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAOe5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTEwLTA2VDEyOjA2OjA2LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0xMC0wNlQxMjowNjowNi0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMTAtMDZUMTI6MDY6MDYtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjBlNWU1ZmY0LTJkY2ItZWE0Ny1iN2E1LTU1ZDlmNWU3MWVkMjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjMzNTI5YzRlLTY0NjItMTFlZS05ZWFlLWFkNGE4YjllZjY3NDwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjQzMWM5ZjZkLWExNTgtYTI0Zi04NjU1LTVkNGU3YmEwMDFhYTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0MzFjOWY2ZC1hMTU4LWEyNGYtODY1NS01ZDRlN2JhMDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMTAtMDZUMTI6MDY6MDYtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MGU1ZTVmZjQtMmRjYi1lYTQ3LWI3YTUtNTVkOWY1ZTcxZWQyPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTEwLTA2VDEyOjA2OjA2LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjM3MzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkT3jawAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMzoxMDoyNSAwOTozMToxOBLZ7JEAAMVSSURBVHhe7J0HgF1F9f/Pvfe9t303u5veew+BQOgl9I5SBQGVIioi1YaiYMOCSlMQEZCqIKB0pIQaAgktkEB678nuZvur9/6/n3n7lg1NkeAP+XOS2Xvf3Olz5jtnzjT7X6MoirxMJnNNJpNOZ9JhNG1qS3ToPtdGLe3hykzYvjffO5x+LCgMwxKZ/WVuk9kgk8nlcspCZk02mz2mw9l/jVQ+idYovW1LS3jVZb95ac0uk34Z/ubiaVEmGbal0233t2caKMNEh/NP6VP6lD6lD04CuMME0g3pdC7auC4X/eT816OZMzal0rncdQKY4g5n/6dEZyFAHiQgPlnPJ2QaZULZO9Jrm8yv9Op3ePlISfGQnpr2TGbvtrbc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");'
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
				  + 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy9jnaHb/F1f6EfCUxE0R12E+Gbbb9SY209ORSIQRCu/Yqpf9bcmLF4i9OCW3a0MNJ9Bynl8DlU+HxETjjFaiJChyJKpQEBYqPgHgJFJcCOAiIAgiONcSRUKNm9t3g6nzaKmfuiUWKJ95+QmyzzYZWbPAEOFCkCUelLvwahyNOQSTDSeoy3QQuhcTcRq+uReHsBUP2vvzW5NCOPZ0UJ+BwEbi8ClxeApdPgcdP4EpQ4UxWoCarUJMUqAkqiJ9AiVNAPABxqAAhEEwAGocIK6uU5J4b3X0u/dSZO7icqE77SbHNNhtahtUxjtVB3mp9vehYrSOBMsxkHOAcTzgEaIaDVAxPIRt6xysBh4QXZwwVX32Xtf3uR28LrN/cAVwkAQAUwOECnB4Fbgktt5/AE6/CmaLCkapCTVHgSFZBEhUo8QoUfxyIMxFE9UIQArAwRCQAEQqAh9XlauoJa7yDpy9Uk3Lsp8U22/7q0CrROBbVsH77NGQwhjsZBzgDJLTAGMAZgQo8MygJv5yXrW5XOUXBrDcH5t//1N9pdW2rpmUqDsDhJobSilPg8SvwxCtwJRnQcqRLeCUrUJIVKPHpULzZIO5UEEccBAGgBcAj5RD1JeB1FaugttntHPT3Oe7sfgFCiP3U2GbbXw1aQgjs1LjyfhUfFqCIExwzKQOEBFUUWgRcgkxwvNzDj+2DXnm0dfVLb0wQmp7SXPkOF+DwELi9Ctx+Y/AkKHCmqnBkSGilqlDTVChJqVD9uVB8bUDiMgCHHxAcQquCqC8GC+wGr90JPexZovWeNqdV1zF7bXDZZtsfZ797MxkVAmuDLOGLWjFQ47ibMTSAiZnqigOMEwgW/c05pvxUJbCtx5k4IXs50ndtQ3PooBSAJkAUDqICRAUUFSBOAuIhIC459hIQbx2Euw6CR0CIA4o3HXAnA0yDqC8C3MlQHD6QuvzTsf5x10ZH/H+75A6pdCoENrxss+33N/Wf//xn+99rZyEm8FUta708II7TGf7Bm7iDXLqDjJP95hvTBPVJ6dh5/Ai4CnYhpXhPbHAJQ7UBACESLoRAEQIKISAqgaISEIWAqAzEqYMoLhDVA+L0QfGkgfiyQZw+EBBAUUBAoJDaXHXvioRV8YN2pfmS6jwKbHDZZtuxCC0hBGqZwIc1rMfGEDoyjjuZxR3kAmDUUFecN1JXiKXEaFwCdhx3MiKVNcgs2ArVJFRTcAljQgAG3AgBEdHPAAyWKQDRACUEArMcY4dEUUEACEFBBAM4hZOWdhYl2yq/jDuRpLi9JYkOG1y22XZMQUsIgX06x/tVfMCeCLIYxx2N1BMzp4kMvFuAZa5nAsuynXC4UdB7KEp1F3L2bISbas2DSwAC0WnCAMKNaQAgQkBwDUAtwEMAjUDQIKAHIFgYkANhYQgeQnxwZ/9dInvhMnTu51dR2spNNBtcttl2DMS0uBDYFOKeL+r48dU6Eng0naGJgiKNfnOLAuMMoCwKsagKIyAuN/LOvwZliW1w1v8eRVZN0f7HQAFdCOPTHgEQCAgOcC4AJiCYgNBVOCIAIgGISB6UcCWU+n3gnjQQV4IMlIUguG7EvRxAv+L/vbDFPxhvhdKerkzj341II8Uu9c/xKWd9SMPbH6zqcyjrnj6y97rszOQ/9HhXrt6evKugrFFLcGqSv+bUk3oVqUd4TYUQ+GFtftKO3aWZ1vnZmckVJw3pXmZXfRta+xkTAt8FWNp3AdG7nuJebrqBVjgxgDZxCQUDKG8uOG+BnPxNVAfKR4zBK/7WuPDdu9GlbOt+cS7BABqB4Y8KBZwxCK5AUMCtC4iIAA8LOMIK1HoBJakUSnw1SJwfijseUL2Gm8jCEHoNwDha1eUjt3QV1qSNu/HDQuHZFxTrzmuDDfHOPx5cToeC/n3b5xUWV6XMefvbc97+cNWFnBuy8rwz+i+aeuXI+VkZSdWKQkSC3/uHH2+rjMSarXlFrf/fEwtv276jpC0ApKX4y96bffP1IwZ3Kz+SMnftKVeuuWnWwxu27O0KAKNP6fXl9GtOfz0nM7nSrva2e7ifRZjApzW03fdB9I4w3G11BaPB9SYBdxbDJRSGUmINsCMNwLIqMkEU6GkZWJF5MhL2bUd23d79u6+Qqk0wYcCRyzElgC5ANACagNDlOMKAcBjQ6iAiVRBaNUSkBiIcAcICCHNomgO/pI6ETtF/VwCVO2pFYpcE7PI5/1hXUVUVtMpI1Dt3yKw9vk/7Hxd/tW5YeWUgxeN24vVnpv59xODu5ZkZSXqr9ETd5frjv7NMTvKJvr3alu4rruIrvt82WKpFX2FRZfplFwz+RlEO/0Xw8NOLzv7wkx/Hmb9nTDvj+cvHD92ckuwXdrVv2XZUZYEQApUax+xCevxPtbw7peJOZlFLUSAZ7iAzXT9r3Ipa1qWG6mLmNg3TUWBRZqQ4cKIgrksW3jjvSbzX9RJosXptEADVAK1eIBwQCNVyhGoYgpUcoVKKSCGFVqBDK6DQCyjoXmNg+3SwoghYGQWv5GA1HDzAkVW+GUQLgVKA6piwrgLd7l/LL8uv4aoQf466kRDv5Wkp8WUA4PE44fW6tT/jg0gIgdOp0uTEOPTt1RYA8PW3mwe8t2h158O9lj+t3+Wf/fbyy4ad2KVhXkVlINGu7ja09gPWjnqhPr+bn7a+inQrLcfMYB0FoyIKGgpQCSxqzrNMGy2I0d+0AWKk0XwmQaVTOW6AHoE/NwGLx9yBp46/E7VOH2I97pwCekhAC3IDXNUMwUqGYDlDaB9FpECHtkeXANOh7dWh76OgRRSslIFVMPAaDndFDTLK8xqORae4uKgOU+/9Xkz9ppCnMy7+FDAwGwmM6T/ngyiEQEVFICk12b/nvtvPvyotxV+mUxZ/3yPv315ZFTj0OCoXuO+RD67v1L5Vq+lXj2qYX1pek2pXdzum1Sh+9VMtj39/nzi5LoIZlAFMV1EfAlwuHX6/E0IojVzEhpQHizvYkPogop/wMIH93MFGAONmbMwCriwXNgy7BPe42uK2n+5Cdqh0/zgXB/QIwCgHowRMJ6CagB5W4AwLOAMczhoFapwCxUugeAgUFzF6hSAExts/Am9NBag/ClPGCKp1XPzkT/DvquGLL+6qrPc6jv2WxRXfb035bOmGQV06Zu6+8JxBmw7X7aSUoaYulJCYGFc9/MRuOy85f/AHz8z6fOqmbfuyXn5j6Sm3TR+39GBBeSEEvli2IWvxl78Mf/e1Gye2yUmtBPAxAJSV16UJIRqlp1TVBLHwkx97F5fWpNXW1fshAI/HGUlPS6gafXLvtR1zW7Gm+wiFNfxv8dquewrKM6tr6hOEEPD5PKH2bdL2nTduwKa9+yod2/KKs4L1kTgAaN82vWRAv9zqAx17WUUtflq3OysQDMfpOnMoCuEJ8d763HbpJVmtkmnejmJ/VXXQVx+KuCIR6vZ4nBFFUYQQAoxzVXCB+HhvOKtVYmVaSoKelBgHhyN2/3ChsIadu8vc4YjujL7YAH+cJ5zbLp02tx0AbMsrcsx797tRmRmJ5ZdfOHR1Qnzz8dB9xVWoqAzE6ZQ1nLiqKMLlclC/zx3JyUrGkbj9RwVaYSawvJJnLS4VQyMa/mZVQYypCFYDNVUaUjNcIFD2TxhtEmxv+G3GrngTyJnKrAm4rGVQTuBKc6B4wAjcRV7A3zb+E8dVr4faVHfJmJnOBbguQHUCPQI4I4AjROB0CzjdHA4XgeohIE4DXEQBQACqKOBBDZRGgWkeX5jhzHkbEbezkre+ZSD5NNF97GbQ65Rh/gerxjwz6/OpmRmJJf16tZ3Us3ub8OGUoekMdYFQQmJCXJXLpeLGKacv+PSLX8bm7ypt89xrX045c/Rx3/fu0ab+QGVUVgdx38Pv33LWmOO+PHlYj4LikmrV43bWhCN6YlVNMEXTKdyuaI8dSQlxuOyCIeu/XbW11VkT/vOiprGkB+4cf9+kS4av9npcMffhcTtx3pkDtm7Ztq/gqukvPbS3qDLzjWevu+Xkod0LXS4HkhJ9NDExLvTKvKUXffjJ2rOSE+MqHrjzwoemTBq52tkMEOI8LuRkJVd9u2przsx/vX3H5eOHvDdl4siFKcl+SilDdW29b+26XV1vv2/+/xEC/xvPX49hg7pAIQQRjaKiMoCCfRX44OM1z2/eWtgtKzOp+PLxQz8aMbhbodfr2u/lsGtPWfozsz6b9OmX60a5XY7au245+5mRI3quadcmrfJAL4TPlq4//v7HPrjd43bWdMxtdd3oU3oXNbd+bV3ImbezOOvJF5ZcvWzlliGtMhJL773tvEe7d8nZxVh8XXZmcvhIn7df5R7W6ALvFbMenxSL4WENf7O4SQa4dIALFXVhN7Zv1RAK0WheljWW1SRGZW0dZE3cSErlmMVQXcxwFTUOaJyApBBU9emJh3o/gY8yx0AnsU9X8GisKxLgCNdyhKo56qsZ6qsYglXSdSxnCJVShMsYImUMWiVHRFcltAh0Js9dHmdYwymf7cSpt30prtpRJf40ca6jbTt2lTi/XLbx1OEndkVxaU2ree9+N+pwz1XTKOoCYX9iQlytqiromJtBb752zH8BBAsKK7KffPHTyzSdHtAtfPv9lQN/Wr+r690zzn3Z7/PA6XSwhHhvBAACwUh8KKTt5zq7XA6cNLR7icftpAl+D4YO6vJLnNfd7AuGEAKX04E+PdvWjzm1z+f9erZdP/qU3oVutxOEEGSkJWD4iV3Lh53YbXVOZjLcbmfqrXfPu/v+R94/M1gfiVmmz+dBz26tw1ddNmJNVquk6rGn9l3et1fbYFpKPJKTfDhlWI+Sm649fVlOdkotUQhaZ6egbes0tM5JRcfcVjihf0dccNYJePrBK66f9dQ1p8T7vZdeNPnp/06+8aVphUWNORTv9+KMUf323nTtmNcBoEfXnILrJ5/22dBBXSsPpI7LyuuwYOGq808e0g2aThNffuOrizSt+fvRrXO2ft6ZA/OvvXLkG8bvrLwrLh6++uSh3ct6dW8dVn9FetARbSmEQEmEY/ZeduIPFeit6biB6gakYg0AASUebPiZoaZSi8asWGPgmGplv/kSBEzGrxrBizYuS2OAxggiDIgwQCQD4V6tMavb/XipzVRElOZvjJEaIRCR8ArVMtTXMANeDQNHfRVDfQ1HXUBBrZIIagWWEZSHrhvHousYsKYQk25dIm79dg9POxbB9f5Ha0Z0bJ/R8bH7L4PX48S7i1ZfuHN32WE9W5pOUVsXSjSgpUJRFEy8eNgP/fvm5st9jF26fFOz/QPl7yxx/HfWZ9ddecmIBb26G4rM6VSRmOANA0AwGPbVh2JDQ1EICIzPuhRCDvkGJcR7A16PK9wc4E7o33HR7GevvbRt69TqB5/83/U33fnGVWXltc2WZ5w3ESTGMRBCEOd1RQ52TO3apOPRf16CKy4ZnjL/g1VnTL7x5btLy2r2W8/rMcryelxBVT14V+PLV27pVFMbSnzl6anISIvH1yu2DFv9846Ug21nHrOqKLp6lPIYD7sULgTy64X64i4+Oq8W7TQd1+t6VGHperTSGvMIdEogBAHxuvHzj0BZQaiRgjJdSiqBZYVVg/qyAstUWLRxC2KEEWiMIEwNYFAGEEFAEgF0T8Ci3Gl4sP2dKHckHBjKzFBeegiI1AuEAxzhOo5QjQGyUC1HuIahVvNib1rnBmAxCS3NBKoePcZt5Tjz70tw59xfRC9+DIGruLQaixavHXv15SdjQL9cjBzeA/m7Stp++MmawYflYuoUdYFQUmKCt8YhH+6EeC/u+fu5/3G7HbXVNfWp/378w+nhiB7zJfrcq5+fX18f8cyYdsZ8EyIupwOJCXFVhtIKx9eHtKP6RwCEEH7AyqUQfuqInkUfvHHL1N492ux+7c1lF1xxwwt37dxTevi1lwAE4IeyalycB3fcfDbatk71ff71+hPfeHv5iObP4eDlhcIaXntr2YWTLh3RvUP7DFx2wVCUV9alvzF/+dl/+tZDJgR+qOZJr+7mZ5SFcKeu43pqgZVuqbQ6I9AoMRSHBmhScbmTXfj5Ryf2bAmCMdEogM6aqC6rotIt6qthPo/Oj3ACjQEhqbB0DhABgAMKB7gPcPR0YFX2xbgn91HkeVsfXFFygGmAHjbgFanniNRxA2IBjoKkTqhzJTZAlVqugU6j56FJ4BbX4fh7vsTM+5eKMWH92ADXp1/80sflVLWRw3tAURRMvWIkvB4XXp6zdHJdIHQY7iFT6gJhd3Kir9ba2nnm6ON2jz217zcAsGpNfs83313Rp6la/f7HvKS33l85/obJo2Z1aJ/BzO2dThUJ8d5q6R62ra+PuP+I1tseXXPCH8+/bdqpI3qsXrJ0/ZBzLn/8+Q2bCjy/p'
				  + 'erOSEvAmaP6QQj4Pvj4x3HNuaaHYqtWb29VVFyddd4Z/QEAEy4cisyMRLz/0eozd+4uVf6U0BJCQOcCH5Xw3HcKxWm1EcxopKysbpFMa2gEMKm+NApwQuDNduDntT5sW10PPcINhWVpGWSx0iFYFF7M0lpIuamwgBA3FJYQBrAEByAMMBIOcBeB0lPBjoyhuKvNs1jp74NDemyEob6YZrQ46iEBLSSwveNgI4VDnrdmwpVGXVpNqjCNAhFKUB1B6wdXiBsmvcunl9RytGR3kVKGF1778spLLxgyxON1QdMpThraHX17tUX+rtKM9xat7n2o56fpVA0EI62Sk3zVVndLVRXccfNZL7dKTyjVKYv/12Mf/l+FJQWCc477H/1gWuuc1OJJlw5fat3WcA/jaqXSQn1Id/0R14kQguzMZCx45cb7rp5w0rsbtxTmjBr/0OxvVmxO579RWoyqKujZLQeEEJRX1qUfyC09WN1/9c1l544Y0q1PTlYKNJ2iR9ccnDqiJyqqAumvzvtmLGP8zwUtIQSCTOD1Pez4r0rFCWENf2tQVmbsxjLWdGL81uRyzaiwGgUiOhDWAV0QxHUk2LTRj3VfRhAOaAeMX+kWpWUNyGtSzUWkwtKooazAAcIFwIXhIjLzW0OjZ1N0U1CT3gH/ynwO/0scBY0chtcgYViW1h5b+pzaAGpNQpvqjd1EXQc0ShCmBEEKBHQBFhIJH67ho859kT22roD7WiK4hBD44psNOdt2FLV76KlFe3sM/r+CHoP/r6D/yH8U5O8sKWWMkxde++KqiKYfUnmhsOYOhTSkJPn2q10Dj+tYe+WlI+YBCO4qKE9+4vlPz6KUQQiB/y1Zm/vV8k2Dbp8+7r+ZGUmNtjPcQ28tAATrIwjUhz0HvbcC5DCuwWGpjKREH55+8IrX7r9j/JOVVQHvuVc88eLrb33TRz9AA8OvMYfDAUIAp1Nl7iP88mFrXpFzydJ1p7236Id9PYYY97jn0NsLvl6xuVhVlbpZc7++orom+Ls+e46DPZj7wgJv7+NDdwbQjlFMpVI5cDOpsyHBkzQKjjcoMLl+hJpxJ6MSRzhAOgkUbPYi8L8Qup3C4UrwNG4R5I1VFbfM12X8KyzVFeWAIntxABfGx9YSYJwLEAkyymCkLHRUwHkCnmcPoFB9CZdXv4VEXn+o3ML6oeeiPKVdQ3IrbwJVU3Hp3IBqPQU0KoCIgBoR4BGR8MN2MeDsJ9hLL1zhuH10X3WvqrSclAhdZ3hl7tfjb5s27rlbrh/7pTU2UlZRi/FXPf3492t3dF2+cmvWaSf1KjpYukdVVdAHgpjQIoTguitPXfjRkp/O2ri1sNOsOUsnXjBu4NK2bdICDzz24S2jTu694vSRfbbHUhtJCb4a41kGKioCiQCKm4ntCMo4KGOH/AaLRKhTdSiHRRyvx4Xbbxz3RVarxNJb7573z+kz37h/z96KF26/6azFLufR+6SKc46tefvAuUDXTlkbMzISj6iM2fOXn3HW6ccvefKBCbOcTtXyktFxzU0v3/L+x2tOe+v9lSfccPWoH5TfKaXngG+KLQHhfmUPH72zDu0oxdSGLHS98VijpMFFbKS8THVFjXlhCkR0gnpqVGIQgOQCVUEXflrAUVsQBKWiUYDdGsvSG1oIjda6sIxfUW48lEIYYDK+LYT8eFEYXdEwIzOfMOO3IICSq4KkubHQdy0eSb4N+xyHljRdlt0Zvww6d78APKNR1aVLJRiiQIACEU0AYQElzMEjAjzCQcIchUUi59LH9Kdf/JQODGn8TwMlyhjefO+7bjW1sUGet7PY/f3a/EFXXDLsS6/XBY8nOrTOTsWE8UMXAMALr315yaHEUyqqAgmEECQn+YOxW8XSMOOGM54mBMHS8rqMh5/+6KqX31h66vrNe9vfdes5L8ZKdCSEID01vqLhvpXXJjbnvrVrk1ZUFwgjb0dxzqFVaIFfNu7p2blD5o7DV0AqJl9+8rrZz1w7IyM9IfDvJxZOu3HmG1c1d62PxKpr6vHZ0vXwup01UyaeskA9gkTOqpog5r+/8sKpV4x8Nz7e2+geJyf5MHXSyAWKQsTs+csvP1L386hCq54KLCrmJ5aGcKcugaXp0RYx3QIsM76lWV3GhjiOMT9CCUK64SKFqYCgAlQXUAAo7RWEVAc2vANUbqoD1VmjtAfaKKXBiF+F5UC5kUlPYgCLcABMzmcAqAQWFVCZ7KamvQPIdGKN6wzck/AgtjjbHrCJJuLxYfGl/0BlQmZDThZr4sbqlCBCCeoZEKQCesSAlRLmYGEBHuYgEQFEABERqKnhKbc+p919x0vaRZW1fzy4dJ3i1bnfHL+noDwrLm7/2LVOGWbN/fqsc88YsLBVelJMCFxw1sBVbXJSapYsXX/S+k0FB+37pryyLokQIDnZF2gOLOPPOWHdiMFdfwGAhZ/+eMG/H19492UXDF40oF9udXPlpqXGV5nTpeW1zb6VLjpn0HsAArPmfj3hUODx/Y95yVu2FfY8Z2z/ZUd6nc8e23/nvBenTe/Tvc3OWXO/Hj95+ku3VVYF4n/9/WN47c1l2LilMDjtmtGzTxrSvfBI3P93Fv4woGfXnI29u7eOeX2HnNC58MT+HTetXber41fLN3b7Nce8d18FDhV8zUIrSIHqCBIaIKRZWgl1o2JqOokG2TUZv9KjQ1iOIzpBSDfUla4LcB1guoCqC3Bq9HXlbKdAc6vY/hFB6Xd1oBrdT2WZwIpIYDEZX3IwQGGiIXFVMCN+ZQwCjBqgMoGlyHUoM24OyVaBbCcK1H64x/c4vnX2B4sR2tAdTnx+/gzkdzqhwR3eT13pBGEGA1iaAA0LqGEOHhKgIaMbHBIWQBhScRnTkSBPeGaBfsUV94TuKChmRy1ATxmHplMXADDGwbk4oIYPBMP4z7OfnDJ7/vJL/jZl9NJYWdw7d5c6lny1fsyUK05ZZHUZGrVepSfisguGvB2sjyTNmrP0AkrZAY9z89bCDgSAU1Wapbbf58E9t53/lMftrIloFH6fu/T26eNeby7/RwgBVY2mJezcU9q2ubInX37SN2NP67P8h7U7ul35txdnbNm+z8k5jwn0z5euz7puxqv/74qLh83r3y+3KtZ+hRBgjCsH+v6UEILBAzpVvf3K9FtGDu+xZuHitSeXlO3/D1PReNvBY2iaRjFrzlI8+szHpbdcN+a1e2477/2mWfEAwDhXG441RnNUWUUd5r3z3fgpk06ZH2t7835MvvzkNwmAWXO+vrS2LnTYcT8hBIpLqvHyG0vHHuoz36wTneIC2rpRVFyHuZRiArW4QZSR/RI8G+VqMUNhmS5SmAIhCnAJEMIMYFEGqLqAQgWYEEA7BTyiYO8yjlBJLVJH+cCIGxqXLZJcxsR4tBdSBzdiWCbAjAC8MU9IiBEZhBdMQOUAk93TQLqK4ARKmgOcATW72uAx9/3YS17EeO1juGBUNs3pwcpRV2H10IugMaVR66beANZoo0BY9tOlagI0IgDNGIgmAA1gmgB0OV+X86jwf/INHXbmruCLi571Xdsu59elFUUiOr7+dlPnrduL2gFAXSCEB/7z4dWnDO+xUlUaw0EIgfLKuuQlX60fuX5TQfc5z193s9+3f9y6PhTB0y8uuUjTqKtLx8z6A7VenTqi5w+PPfsJFi356fQLlq5fPPa0vo3+yUgIgYimY8X32zI//vzncTpleOjpRVf8341nzWnfNo06HY0eT0EIwclDuxdfcPbARW+9u3L01Ekjn+vaOTso86WEdQgEQlj90860F17/ahiAXwDg21Xbkn/ZsIv17N4m7FBVaw0haakJZNaTU+596oXFo1+c/dWlw8+8/9nj+rTPH9S/00+pyb4azgXJ21HSfs0vOwYxJsidt5z95LlnDNjaNA4lhEBFZR2Wrdw6eFteUbdf1u+O79e7fZ3DoTQLro65rdg7r95477W3vnLTwsVrT4u1XlFJNfYWVyUzxlFdHdxvn3V1Iaz6MR+vzP36vXBE87z+zNS3Th3Ra2+sLHfOOX5ev7sTAOzaW962tKzWmZLk161Keu6C5UN/3rCr6+ABnXce6OuAU0f0/NnpcrBVa/L6zn9/5fHXTDx5rflNIeccu/aUZwJASWlNztp1u5LTU+PrGsDJOMnfVZL54JOLpj/4j4seSU9LOLTW2AP9hVh1RGDeDnbCt0UYyCku1GXFjMIrGnDXZDKlxqKuoQmsCAO4jFWpTADUgJdTKi3OBKAb7huPCCBfBymmiG9NkTIuDiGvz/g0RwLLfDRVCSfOjaRXIj/9UZgBLsYAxQosBlDzt4x1QTdaFw11JoAyCrFTg8rqMYK9h5u0l4C4OCy+cCZ+OuEc6NzR0ChguoNMnmuEG3/eoUXQACgW4YAGEI0b7qBUmohIWElggcppKgAdwWmXOec98Y+4N51H0DfX3sIKPPHi4vFUZ2pdMBwfDuuHlZ90XO/2G269Yew3VgXDucB3P2xL+WzpukG7Csrbci6U3Hbpe9pkpxadd+aAtdYHbtHite327qvM2JZflFtSVpsOAPF+T7B71+xt11x+ynd+vwHDFd9vTXn7w1WnBes1fyikuQ0wIRzv91S0bZ22e8YNY5e53S4d8ukwh01bC8WcBd8mT7t61L7W2SmyuaUBWPhq+Ub1g4/WuOtDERIK6wTyLwJAAH+cW8TFufnIYT0iZ4/tbwbRzYtMGOOkrLxW+WblZt+6jQVJ+4qq4nWduf3xHqVDu3RtUP9Odcf1bq/F+z0uQogLgAuAKgey7LstaT/+srNLdU0wQQgQv88dSkyIC549pv+arMykA173YDCMZ2Z9dsroU/qsPq5P+4DhNlVi0ZK1A7flF+WWlBrXMiXZV9WlY+YOr8elaRp11NSF4p0OlbbOTikZeFyH7a2zU5nb7Yj5KVJZeS3efO+7Ies27ekRChnPRUZaQlm/3m03X3zuievzd5V6Fn7647C8HSW5EZ26Wmel7Mttl7531Em91nbqkNkgl5ev3Jq2ceve9rsLynJ2761oDQF4Pc5I187Z2y87f/A3G7bszdmWV9Rmw5a93QLBiI8QcK/XFVZVRVjVY0SjzuN6t9t4/eTTvjvUhoiD/u9hhAks3Mk7v71djIvo5Bxm/VyFNk6mjFhykoxmfkCXbhinhqKCVFwO3ZjHqVFRiVRyRDcqu9ipQZRQeFP0mg4T48t2qb40nSOJC6OVUOFGt8nC0jrIpNISEkKGipKpDtwIxBtdLMt+4qnxm7Oo6hJUAFUU2BMBIhRD/B+j07T+2JzT18jJolFgmeCOmMCiAtRUUxFDYRFdGPErTQJLKq0GlUUt8JLgBgVGnuj45r2XfPcmJRx+ANXsWvrI84r2/7MOU7rHKrfp+s3sX8BI0+OEEOOKC0GFgAklHUAExtWJgEAnALWoKFjGf6QRy1iV3ooDgLPJ2Jy2Dg4ZkiGWcmJeZ/N6Hsq9NC/9oXyQf6DyzM1/xT0+aDm/9vgPmvIAAG6V4MKOyvZEp1jwygbBKyM4r6GV0OIeNgTeGYFG0QAsTg2AOKQ7qFBjmsn5hrqQqkhWXsEAkemER9Caay+on3fbtNQFT6/FOU9/j8kKQyJENOAuGoAloWMCq5H7J8DM1kQTWLpUaSawZNwLHECcCpLtQlulpvC/r513bXy71PD9y8TV60vQjzJ0jzYMWNxBKgyXL2IMrIk7KDSjJwnDHUQUVNSEVxRYoAJd2pO8OA85Qugc/X6zolnqh7QuJwRSx0IDEAYQkmNzHiOEMEJgVUotwawA5fJ8moObOTgk4FwA3AA8ALxy2mVZrjStuEfhXpLDLe8Q7/FRKeeITuhw/mH6x2Ie/9QacVleBS7VWOMgtMaMFsJIg+IygEWYAJHuoKob05QZ3RorVAJKB4hUXEJW6LQElD17k+vO80Y4tztUAsYFXlotBv7rK/H3inq0ElJRQRgxKoVHgWVMS4iZ60nFBR1QmKH2GtQYtbiHFFA4AqMGKN8/P9P179wcJweAkgDHw9+K8Z9sx5majly9QV3J1lAJK6FxCA2AxkE0GC6i7Mq5kTuoW1WWBJbcf/cOSv5Hc/xTOrR3cLQcYxJG9QBqAAQlqHS5zO7mODbUTNfS2USlqVKVKbHgY5nX3HW1lmnCUWlO4bWoC3c40AKAnVVceWSVuPy7PRiiU3Q3g+6mO6hZgKUyI7WBU8MdFEyAUQFBDWDxhkhFVHEJKtC3Pdn8zM3uu4b1cezXv8+izbzd7Z+Ke/JKRUezr3cTQpB/DWaASwbiTYBRmf4gASV4dJ6wAMMB1F19lmPBv65zz0lPbuyaBTWBZ7/nJ72wmkyp09C6ngloOiSwOEREQOgGvJTm3EHdorSoaKSuVIHAyMGO1S886vtXbluF/479b4kj3IZJ9RQAUCXHERzih722/abuq9WFdQNIBJACIF6C7K8DLQCoDgk8+C0/b+FmnB3UkWsqLBNYggkoprtFBRQzfiXhQSSwGlyyhgqM4LhB6rLHprn+06WN2mym8U+Fwn/rQnb7snxxnMLg5zLwbsLLjHc1pD9QYxmopdXQ6g5KcPhcqL5nsvOJ6Re7vvF6YseSKBd44yfR596vxcyiWpGNiJE0KjRjgGYAi5u/rcoqGmi3njNABVwKaidf7HrnX7fHzUlLVX4rMHFLQFuzxJBMNcRjQIw04xpRy/a/i5KaMHHSCAC95s6Z/Zxl3qFuPgLA6ZbfGwB8KNXgH2Zz58z+PXfnApAOIAtAXEtVXUf03UCSl+CfJysftPKJ0qdW4YZ6HTlGbMtQLKp0B4kJLGaoLUWXgW9qxJQaAYsheOO5jtn/mORakJZ04Ep7XA4JvHm5evetH7Bp767lY8AQbwbgFRb9X0Mhq6fCLAF3HlV0YFFg5aSi+LEb3fdeOMq59UCf0zgUgiuPx7qcBNx284fi/u3VoiO3xK+ICawm6QyNoEXRoCxBBeJcqH7gdu+j1050r4iLU44moMzgdsgyhCVoaAuLJQFAMoDCI9jOBNarAPIB5AC4RA6v/YVUmAZgn3Th20vV1eLAdcQ1xOskmD6IrHhkNO5PcqOYytZBRTegpOgGpBg1AtCqmdJg/kWXpVL7HKh6ZKrz4UducB8UWKZlJRK8cpn67IyTlVleBdWQ8TNuxqsksFQJKDPgHlU5DcAK9ulANr/zoOf6i0YfGFgNF40QjO5ECt+fqNwwOAerEBFBEhYgYYBFZHwrbAbl0ZCj1eAaatE4VkYyKZ33jO+WG6/xHA1gCQmqWgB7AWwDsAnAdgB7AJQBqJMga4lxphzphh6udQSQJ4EFCb5lADpJl+mvZEJew90SXn8N99BqXAj8WCgSJrwlntpRwtMERbwqY1pMuofmb9HQpB+ttJlJKHnuZvfMs4Y5dh7JB8OUCcxewfrNXEDvqqxDuhnbAgXUhoC7VFhS6TUoLIbgqAHKD6/c7bmvdYZy2H24CyFQEwKmvKjdtHAlP02PiPhGgNIs52u2ELIGpRXs3VXZ++oTvr/37+uoOwrxKy5VVAWAUvlAtujY0oSJk06XKgkAlphqae6c2fkTJk7qCOBcCZ2QXL66maIuBZAtVVXlIbiPhQAWWlTdQLnMK+cVymu9BMAN0tVcZimnF4Dn5HiEPL5Ocv2QpawQgCVz58xeLc93oDwnyOOcP3fO7MLfqu4DaA2gTUuLcf3qV7tCCAbkkNovpyhXndQeax1U1DJdgOocxPxURwOEDExbAtLBvu3Jxk8f8U4+Z/iRAQsAHCrB5OHqzx9Md17bPhkFkK6n0WIpGuJqjVvvBFxA7ZSz1HcWPe49ImABRrNvUhzBvOmup2aerT7nhahBhBv7igijJ0KdN0kkFSBUBM861bns0zfjrz2KwApIdbVHTrd0YI2QsHgOwH8s8No3YeKkHACTJaTuksA49wCqaZlcNqNJXMsKrBHSfbxLwuQSuayXLHuZZdkJFqClNHFZky2KLkWqw3wAD8h51rKWATh3wsRJKRMmTvLKZUvmzpl9l4TWJb+x4iqH0cor/lLQMitv6ySCd69y3HvVieQdRYg6RTdcRC5jVw3uoCagcATGDlS+XfIf77S+ndTgr620hBAM66pWfn6na9LgDmSNwhEQlnhVgzsoVU6SFxUP3uB8+LmZ3tfdLuVX/0uOy0Fw76XOT1+e7roj3YeyBkhpVrWFhoD73650v/HWi76Hc7LUo/EPPUJWpGKpsChauMkKfDqAZXPnzC6cO2d2JYD1ACrnzpkdAjAawA9z58w21c1qixsYywol/AolnP5tgaBXTi+xwGa1BE6KXJZnUVKfyXGVBJJXxomsLmyoSQxumZzXq0lZqy1g9FqOp+EYJKB/KwvLUEKLesEd1f9ET/IRPH6RY06XVOy4bwGdURtCCkxgyWx3j4qaqeMc8/51jXtBfNzRjQF2yFD4wttdf5/xqn7t/KV0nE4R38gdpEDbdBQ+c5v7zjOGOXcfzf6rVJXg0pGOTR1beadMvCv0dN5O3taa4Q4qkJqA8rume5+4capnhaoetX3r8q1cIeNUx4KZ8MlvMn+fBFonCbcTDqNME1wdJRBPl/O8cjjX4po1jaO9ZfkdspTXC9EGDhM4OdK1NLfd0GRZrLIwd87sygkTJ/0AYMSEiZN6SWDf9TvEtwLyRae2lIfjqLete10EN57uWPHqdc7bchKwT8igM9EEUuJQ/tj1rgceuu7oA8u09EQFz13nevGeSxxPJbhRaSothSHQvzNZ9/ET3qvHDT+6wGq4mArBoF5q9cf/jZs8bqj6qc8hqqELOISoO66buvG1x/0zbrr2qAJLyNhVFQxNd6xYiqzIVrcrToLCdAFflZXaOsSKaVlVlQnC1yQwcizl3RVjSG4KFxkba8417GiJR5nL8y3bNS0rx7r+3DmzF0oXNSTdxoG/w7WmLe1l5/gtClUVgvMHOfI7pJMp876gp2/eybvmpJKiK8c4Fg7srlY51N+2ldXvJZh5seuLsQMc3y9eSQcFgsLXu4OyddQgx5amCaNHPbpJCLq0U+n8x/0Pb9pOE3bv5RlJ8STQt4ejOC31qP9hK5MxiSCOQZswcZJ37pzZoQkTJ6VIVbO+iaox7RwJgOeaUVhNXaxQjGmvZXqGVEgbYuxrIKItmDlNXMOOcn8hCSyvBWDhAyjKqgkTJ/0bwFtz58zeAOC5CRMnzbCA7re0lpb28ttAy7R+HdRg3ynK+9YK/budmErQv4ta17+L+sUfcWF9cQQD+zprB/bFb9mlI0P0U5ljyaytdssklAAgX0KsUqqnDXJ8QhO3y2obpCs4whJLusqyzDQzrnWVhM1qCZxKeRzmvsxWQNPM/ntOl8exwaKsKpu4k+Zx5yPaIrls7pzZhfKcBgLYICHtxZGldxy2xkALy9X61SkPtv2hVg+jtbDkGFRZ1hSEDQA6zp0z+wG5LMeirg6W7mAC6fQmUDxQSoN1mZmImmJRbW+ZxwQjncJrgZUZeB8RI4ZlPW7AaClcZjmnSyzu6oa5c2a/9Ttc6kwAuTCy5W1o2fabW1BCq/SvegEO4zOeo2E5MPKyHsBR+vznd/6MJ5an1V6C668biLftd79/9j387WwEgH8gGtMaACNlIXSMnJ8fQEJLApZJWttarplf8Ks4dtId/ky2AUYDwD8srt/8Y+TcnADSYLTKtiiz3cOWbRxGVvMetPwWRLN/KQXRPqbMl6omB7vLm6P3ssuW7q67pR28rbRafkX3SYkfagGV2oSS2Tmd2ce6s5lBRfQj8CCMRMgQor1UWP/Mwgpygcbd7NgdEDau89lycLfUE7CtZUPLA6PFqR7GJxniT3Z8DumC+OXgsYDK2txODuLKeOV5mv1+xer7S1iWmd09UzT5Y4wmZYgYZVjHvMn4117fP+r+qPLllgUjabbF1n0bWseG1E+UFZNLRfJHKS5TSXkkoBJh9Nnktjxr5AjLNct2/ApIWKHWFFrCcmzWeVYI8ibAtJZPDrB/0mQcC7BWoD'
				  + 'YHVXGAc7Puw+pmW++FT74AWnSXy+Ro/SmobbbZZputtGz7az+cnc4ZD+BKAA/RvIXfHmB5AMAzAMx1MgHMhJG9/jOirX8A0Nw25nzE2MYs80m57CE5bxiASdLlehfA6022GQPgb3L+u7HKonkLH2rm3GfK8gHgdZq38F37iTDMzvGxraUCbZgFMn4JB7/8bQILAPpZ1mtum06W+eY245vs8kpL+dbtsyzQG9ZkmwuaOfymZcWCsbWsKx2dzuln33UbWra1bOsrx/+QSsYvK3qmRWGNA1AEYOhBtjGB8DqAm+V0J8u+hsUA0hi5/TMW5dW3CZiyYhx3rLKamrnvmy3qrZN9y2330LaWbVnSxftZjk23K9Pi4gHGx8nDJGCa26Y4Rvl1TVzKny1wMyESALBY/h7XxP0bE2Ob5so60L5NC9i33FZatrVss7pXxc3MP9Ay6/zFEiRXwog1FQF4zwKZTKmoYtkDAD5CtDtlU2UVW4CGQyzLtPdgfC70pCzrZ5q3cLF9y22lZVtLelAbB6aPdlDa3wRoWRYldbqET6CZ7UzF1M8EjDzOh2KsG7OsGOf2rUUxAkArR6dzMmnewmL7SbChZdufC0yZAGYB+JTmLXy2GVUUy13KPIAblXkI24yRkHpIQucJGK2CJsDGIxqYHwYj0G/azfL4ZjVx+WY2UV4xy5LAamrm+pfI43oARlD/WfspsaFl25/IaN7CYkencwIAOstZnSzLHmoCuGkSEv0s6xVbANdPqpaO0t0LyHGsbWL9IUb8QQ43D9FY2a8976bn9vIRHI8NLdts+4PsZ6lAPpK/i2jewrwY6/0CYCyisaSAdKsCEij9YMSarO7kgbYZ20QdfSuHcRb3br6c95AFeg80OfbXEW3xM1XZ6/IY3m1aVjN5WiukGpvfBJK2wQ7E2/bns9ctFTQPwMPNqJNvLXAwE0VN9+8hSxk/W9ZrbhvrfHObgwXL8+R+AjHK/rXK63VEk14B4F07uTRq9mc8ttlmm620bLPNNttsaNlmm2222dCyzTbbbGjZZptttv2G9v8HAFqcTtSyHgmwAAAAAElFTkSuQmCC', width: 180, height: 50, border:[false, false, false, false]},
				  {text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false]}, {text: `\n\n73\n0\n0`, alignment: 'right', bold: true, border: [false, false, false, false]},
				 ]
				]
			  }
			},
			{
				alignment: 'center',
				style: 'title',
				margin: [0, 0, 0, 2],
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
				widths: [40, 140, 70, 70, 80, '*'],
				body: [
				  [{text: 'TOMADOR:', bold: true, border: [false, false, false, false]}, {text: this.xtomador, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif_tomador, border: [false, false, false, false]}, {text: 'RAMO PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: 'AUTOMÓVIL', border: [false, false, false, false]}]
				]
				}
			},
			{
				style: 'data',
				table: {
				widths: [40, 140, 40, 100, 120, '*'],
				body: [
				  [{text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xdireccion_tomador, border: [false, false, false, false]}, {text: 'EMAIL:', bold: true, border: [false, false, false, false]}, {text: this.xcorreo_tomador, border: [false, false, false, false]}, {text: 'PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: `${this.ccarga}`, border: [false, false, false, false]}]
				]
				}
			},
			{
			  style: 'data',
			  table: {
				widths: [30, 100, 40, 50, 60, 22, 50, '*'],
				body: [
				  [{text: 'CIUDAD:', bold: true, border: [false, false, false, false]}, {text: this.xciudad_tomador, border: [false, false, false, false]}, {text: 'ESTADO:', bold: true, border: [false, false, false, false]}, {text: this.xestado_tomador, border: [false, false, false, false]}, {text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false]}, {text: this.xzona_postal_tomador, border: [false, false, false, false]}, {text: 'TELÉFONO:', bold: true, border: [false, false, false, false]}, {text: this.xtelefono_tomador, border: [false, false, false, false]}]
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
				margin: [0, 0, 0, 2],
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
				margin: [0, 0, 0, 2],
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
				  widths: [70, 75, 65, 70, 30, 40, 50, '*'],
				  body: [
					[{text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false]}, {text: this.xserialcarroceria, border: [false, false, false, false]}, {text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false]}, {text: this.xserialmotor, border: [false, false, false, false]}, {text: 'PLACA:', bold: true, border: [false, false, false, false]}, {text: this.xplaca, border: [false, false, false, false]}, {text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xtransmision, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 2],
				table: {
				  widths: [30, 300, 40, 100],
				  body: [
					[{text: 'COLOR:', bold: true, border: [false, false, false, false]}, {text: this.xcolor, border: [false, false, false, false]}, {text: 'GRÚA:', bold: true, border: [false, false, false, false]}, {text: this.xgrua, border: [false, false, false, false]}]
				  ]
				}
			},
			// {
			// 	style: 'data',
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: 'BENEFICIARIOS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
			// 	  ]
			// 	}
			// },
			// {
			// 	style: 'data',
			// 	margin: [0, 0, 0, 2],
			// 	table: {
			// 	  widths: [120, 70],
			// 	  body: [
			// 		[{text: `${this.xnombrepropietario} ${this.xapellidopropietario}`, bold: true, border: [false, false, false, false]}, {text: this.xrif, border: [false, false, false, false]}]
			// 	  ]
			// 	}
			// },
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
				table: {
				  widths: [100],
				  body: this.buildAccesoriesBody()
				}
			  },
			{
				style: 'data',
				table: {
				  widths: [500],
				  body: [
					[{text: 'La prima no incluye el impuesto del  3% de  IGFT, el cual debe pagar en caso que su moneda de pago sea diferente de bolívares', alignment: 'center', bold: true, border: [false, false, false, false]}]
				  ]
				}
			  },
			{
			  style: 'data',
			  margin: [0, 0, 0, 2],
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
			// {
			// 	style: 'data',
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: 'Incluye IGTF', bold: true, border: [false, false, false, false], alignment: 'center' } ]
			// 	  ]
			// 	},
			// },
			// {
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: [{text: `En Caracas a los ${new Date().getDate()} días del mes de ${this.getMonthAsString(new Date().getMonth())} del ${new Date().getFullYear()}`}], alignment: 'center', fontSize: 6, bold: true, border: [false, false, false, false]} ]
			// 	  ]
			// 	},
			// },
			// {
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: [{text: `Obtenga y conozca el contenido de las Condiciones Generales, Condiciones Particulares y Anexos correspondientes a las coberturas descritas en este Cuadro Recibo de la Póliza, accediendo a nuestra página web www.lamundialdeseguros.com`}], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false]} ]
			// 	  ]
			// 	},
			// },
			// {
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: [{text: `Aprobado por la Superintendencia de la Actividad Aseguradora mediante Oficio N° de fecha El Tomador Asegurado o Beneficiario de las Pólizas, que sienta vulneración de sus derechos, y requiera presentar cualquier denuncia, queja, reclamo o solicitud de asesoría sugerida con ocasión de este contrato de seguros; puede acudir a la Ofici na de la Defensor del Asegurado de la Superintendencia de la Actividad Aseguradora, o comunicarlo a través de la Pagina web: http: //www,lamundialdeseguros.com`}], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false]} ]
			// 	  ]
			// 	},
			// },
			// {
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: [{text: `CLIENTE`}], color: 'red', alignment: 'center', fontSize: 6, bold: true, border: [false, false, false, false]} ]
			// 	  ]
			// 	},
			// },
			{
				pageBreak: 'before',
				style: 'data',
				table: {
					widths: [220, 230,'*'],
				  body: [
					[ {image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
					+ 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
					+ 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy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', width: 180, height: 50, border:[false, false, false, false]},
					{text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false]}, {text: `\n\n73\n0\n0`, alignment: 'right', bold: true, border: [false, false, false, false]},
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
				widths: [40, 140, 70, 70, 80, '*'],
				body: [
				  [{text: 'TOMADOR:', bold: true, border: [false, false, false, false]}, {text: this.xtomador, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif_tomador, border: [false, false, false, false]}, {text: 'RAMO PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: 'AUTOMÓVIL', border: [false, false, false, false]}]
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
				  widths: [70, 75, 65, 70, 30, 40, 50, '*'],
				  body: [
					[{text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false]}, {text: this.xserialcarroceria, border: [false, false, false, false]}, {text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false]}, {text: this.xserialmotor, border: [false, false, false, false]}, {text: 'PLACA:', bold: true, border: [false, false, false, false]}, {text: this.xplaca, border: [false, false, false, false]}, {text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xtransmision, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 2],
				table: {
				  widths: [30, 300, 40, 100],
				  body: [
					[{text: 'COLOR:', bold: true, border: [false, false, false, false]}, {text: this.xcolor, border: [false, false, false, false]}, {text: 'GRÚA:', bold: true, border: [false, false, false, false]}, {text: this.xgrua, border: [false, false, false, false]}]
				  ]
				}
			},
			// {
			// 	style: 'data',
			// 	table: {
			// 	  widths: ['*'],
			// 	  body: [
			// 		[{text: 'BENEFICIARIOS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
			// 	  ]
			// 	}
			// },
			// {
			// 	style: 'data',
			// 	margin: [0, 0, 0, 2],
			// 	table: {
			// 	  widths: [120, 70],
			// 	  body: [
			// 		[{text: `${this.xnombrepropietario} ${this.xapellidopropietario}`, bold: true, border: [false, false, false, false]}, {text: this.xrif, border: [false, false, false, false]}]
			// 	  ]
			// 	}
			// },
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
				  widths: [50, 60, 60, 60, 60, 60, '*'],
				  body: [
					[{text: 'NO. RECIBO', bold: true, border: [false, false, false, false]}, {text: 'FECHA DESDE', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'FECHA HASTA', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'FECHA COBRO', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'MONEDA', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'PRIMA', alignment: 'center', bold: true, border: [false, false, false, false]}, {text: 'ESTATUS', alignment: 'center', bold: true, border: [false, false, false, false]},]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 2],
				table: {
				  widths: [40, 60, 55, 60, 50, 62, 92],
				  body: this.buildReceiptBody()
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
						border: [true, true, true, true]
					  },
					  {
						text: 'Representante\nNombre Apellido\n\n\n\nFirma Autorizada',
						fontSize: 7,
						border: [false, true, false, true]
					  },
					  {
						border: [false, true, true, true],
						table: {
						  body: [
							[{ image: this.xlogo, width: 110, height: 47, border: [false, false, false, false] }]
						  ]
						}
					  }
					]
				  ]
				}
			},
			{
				table: {
				  widths: ['*'],
				  body: [
					[{text: [{text: `En Caracas a los ${new Date().getDate()} días del mes de ${this.getMonthAsString(new Date().getMonth())} del ${new Date().getFullYear()}`}], alignment: 'center', fontSize: 6, bold: true, border: [false, false, false, false]} ]
				  ]
				},
			},
			{
				table: {
				  widths: ['*'],
				  body: [
					[{text: [{text: `Obtenga y conozca el contenido de las Condiciones Generales, Condiciones Particulares y Anexos correspondientes a las coberturas descritas en este Cuadro Recibo de la Póliza, accediendo a nuestra página web www.lamundialdeseguros.com`}], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false]} ]
				  ]
				},
			},
			{
				table: {
				  widths: ['*'],
				  body: [
					[{text: [{text: `Aprobado por la Superintendencia de la Actividad Aseguradora FSAA-1-1-0363-2022 mediante Oficio N° de fecha 05-08-2022. El Tomador Asegurado o Beneficiario de las Pólizas, que sienta vulneración de sus derechos, y requiera presentar cualquier denuncia, queja, reclamo o solicitud de asesoría sugerida con ocasión de este contrato de seguros; puede acudir a la Ofici na de la Defensor del Asegurado de la Superintendencia de la Actividad Aseguradora, o comunicarlo a través de la Pagina web: http: //www,lamundialdeseguros.com`}], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false]} ]
				  ]
				},
			},
			{
				table: {
				  widths: ['*'],
				  body: [
					[{text: [{text: `CLIENTE`}], color: 'red', alignment: 'center', fontSize: 6, bold: true, border: [false, false, false, false]} ]
				  ]
				},
			},
			{
				pageBreak: 'before',
				style: 'data',
				table: {
					widths: [220, 230,'*'],
				  body: [
					[ {image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
					+ 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
					+ 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy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', width: 180, height: 50, border:[false, false, false, false]},
					{text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false]}, {text: `\n\n73\n0\n0`, alignment: 'right', bold: true, border: [false, false, false, false]},
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
				widths: [40, 140, 70, 70, 80, '*'],
				body: [
				  [{text: 'TOMADOR:', bold: true, border: [false, false, false, false]}, {text: this.xtomador, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif_tomador, border: [false, false, false, false]}, {text: 'RAMO PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: 'AUTOMÓVIL', border: [false, false, false, false]}]
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
				  widths: [70, 75, 65, 70, 30, 40, 50, '*'],
				  body: [
					[{text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false]}, {text: this.xserialcarroceria, border: [false, false, false, false]}, {text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false]}, {text: this.xserialmotor, border: [false, false, false, false]}, {text: 'PLACA:', bold: true, border: [false, false, false, false]}, {text: this.xplaca, border: [false, false, false, false]}, {text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xtransmision, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 2],
				table: {
				  widths: [30, 300, 40, 100],
				  body: [
					[{text: 'COLOR:', bold: true, border: [false, false, false, false]}, {text: this.xcolor, border: [false, false, false, false]}, {text: 'GRÚA:', bold: true, border: [false, false, false, false]}, {text: this.xgrua, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'SERVICIOS DE ARYS AUTO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				style: 'data',
				margin: [0, 0, 0, 2],
				table: {
				  widths: [500],
				  body: this.buildServiceArysBody()
				}
			},
			{
				style: 'data',
				table: {
				  widths: ['*'],
				  body: [
					[{text: 'NOTIFICACIÓN DE INDEMNIZACIÓN O SERVICIO DE AUTOMÓVIL', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
				  ]
				}
			},
			{
				margin: [0, 0, 0, 2],
				table: {
				  widths: ['*'],
				  body: [
					[{text: [{text: `El tomador, Asegurado, o Beneficiario, deberá notificar dentre de los primeros cinco (5) días hábiles luego de ocurrido el siniestro o en el momento que tenga conocimiento al Call Center atención al cliente 24/7`}], alignment: 'justify', fontSize: 7, bold: true, border: [false, false, false, false]} ]
				  ]
				},
			},
			{
				table: {
				  widths: ['*'],
				  body: [
					[{text: [{text: `+58 0500-2797288 ó +58 0241-8200184`}], alignment: 'center', fontSize: 7, bold: true, border: [false, false, false, false]} ]
				  ]
				},
			},
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
			},
		  }
		}
		let pdf = pdfMake.createPdf(pdfDefinition);
		pdf.download(`Póliza - ${this.xnombrecliente}`);
		pdf.open();

	  }
		catch(err){console.log()}
	  }


}