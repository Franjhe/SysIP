import { Component, ViewChild, TemplateRef, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, } from '@angular/common/http';
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
	xasegurado: string | undefined;
	xcedula_asegurado: string | undefined;
	xdireccion_tomador: string | undefined;
	xestado_tomador: string | undefined;
	xciudad_tomador: string | undefined;
	xzona_postal_tomador: string | undefined;
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
	fdesde_recibo: string | undefined;
	xtipo_mov: string | undefined;
	fhasta_recibo: string | undefined;
	fcobro: string | undefined;
	xreferencia: string | undefined;
	mtotal_prima: number | undefined;
	mgastos: number | undefined;
	mtotal: number | undefined;
	beneficiarios: any = []
	coberturas: any = []
	fcotizacion: any;


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
	CityList: any[] = [];
	colorList: any[] = [];
	metodologiaList: any[] = [];
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
	ccontratoflota: string | undefined;
	ctipopago: string | undefined;
	mprima_pagada: string | undefined;
	ccarga: string | undefined;
	xanexo: string | undefined;
	xobservaciones: string | undefined;
	xtituloreporte: string | undefined;
	xnombrerepresentantelegal: string | undefined;
	xdocidentidadrepresentantelegal: string | undefined;
	xnombrecliente: string | undefined;
	xdocidentidadcliente: string | undefined;
	xdireccionfiscalcliente: string | undefined;
	xciudadcliente: string | undefined;
	xestadocliente: string | undefined;
	xtelefonocliente: string | undefined;
	xemailcliente: string | undefined;
	xrepresentantecliente: string | undefined;
	mprimatotal = 0;
	mprimaprorratatotal: number | undefined;
	xpoliza: string | undefined;
	xsucursalsuscriptora: string | undefined;
	xsucursalemision: string | undefined;
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
	fnacimientopropietario2: string | undefined;
	ctasa_cambio: number | undefined;
	mtasa_cambio: number | undefined;
	fingreso_tasa: Date | undefined;
	cestatusgeneral: number | undefined;
	canalventa: string | undefined;

	serviceList: any[] = [];
	coverageList: any[] = [];
	realCoverageList: any[] = [];
	annexList: any[] = [];
	receiptList: any[] = [];
	accesoriesList: any[] = [];
	ccorredor: number | undefined;
	xcorredor: string | undefined;
	xnombrepropietario: string | undefined;
	xapellidopropietario: string | undefined;
	xtipodocidentidadpropietario: string | undefined;
	xdocidentidadpropietario: string | undefined;
	xtelefonocelularpropietario: string | undefined;
	xdireccionpropietario: string | undefined;
	xestadopropietario: string | undefined;
	xciudadpropietario: string | undefined;
	xestadocivilpropietario: string | undefined;
	xemailpropietario: string | undefined;
	xocupacionpropietario: string | undefined;
	cmetodologiapago: number | undefined;
	xmetodologiapago: string | undefined;
	xtelefonopropietario: string | undefined;
	cvehiculopropietario: number | undefined;
	ctipoplan: number | undefined;
	cplan: number | undefined;
	ctiporecibo: number | undefined;
	xmarca: string | undefined;
	xmodelo: string | undefined;
	xversion: string | undefined;
	xplaca: string | undefined;
	xuso: string | undefined;
	npesovacio: any;
	ncapcarga: any;
	ccerti: any;
	xtipovehiculo: string | undefined;
	xgrua: string | undefined;
	fano: number | undefined;
	xserialcarroceria: string | undefined;
	xserialmotor: string | undefined;
	mpreciovehiculo: number | undefined;
	ctipovehiculo: number | undefined;
	xtipomodelovehiculo: string | undefined;
	ncapacidadcargavehiculo: number | undefined;
	ncapacidadpasajerosvehiculo: number | undefined;
	xplancoberturas: string | undefined;
	xplanservicios: string | undefined;
	detail_form: number | undefined;
	xnombrecorredor: any;
	xcolor: string | undefined;
	modalidad: boolean = true;
	montorcv: boolean = true;
	keyword = 'value';
	// Validation place 
	xdocidentidad: string | undefined;
	fdesde_pol_place: Date | undefined;
	fhasta_pol_place: Date | undefined;
	xpoliza_place: string | undefined;
	takersList: any[] = [];
	xprofesion: string | undefined;
	xrif: string | undefined;
	xdomicilio: string | undefined;
	xzona_postal: string | undefined;
	xnombre_ben: string | undefined;
	xcedula_ben: string | undefined;
	xtelefono: string | undefined;
	xcorreo: string | undefined;
	xestado: string | undefined;
	xciudad: string | undefined;
	xtransmision: any;
	nkilometraje: any;
	xzona_postal_propietario: any;
	xclase: any;
	fmespol: string | undefined;
	fanopol: string | undefined;
	rcv: any;
	camplia: any;
	ptotal: any;
	allCoverages: any;
	coveragesList: any[] = [];
	metodologyList: any[] = [];
	ncotizacion: any;
	xusuario: any;
	xtelefonocorredor!: any;
	xcorreocorredor!: any;


	constructor(
		private router: Router,
		private http: HttpClient
	) {

		// this.certificateData()

		// setTimeout(x => {
		//     this.certifiquedPDF() ;

		//   },4000)


	}

	//Funciones para generar el pdf emitido desde el cor del negocio
	async certificateData() {

		this.http.get(environment.apiUrl + '/api/v1/certificate/search').subscribe((response: any) => {


			//poliza 

			for (let i = 0; i < response.data.poliza.length; i++) {

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
			for (let i = 0; i < response.data.beneficiario.length; i++) {

				let fnacimiento = new Date(response.data.beneficiario[0][0].fnacimiento);
				let ISOnacimiento = fnacimiento.toISOString().substring(0, 10);

				this.beneficiarios.push({

					fnacimiento: ISOnacimiento,
					xcedula: response.data.beneficiario[0][0].xcedula,
					xnombre: response.data.beneficiario[0][0].xnombre,
					xparentesco: response.data.beneficiario[0][0].xparentesco,
					xsexo: response.data.beneficiario[0][0].xsexo,
				});
			}



			//coberturas

			this.coberturas = []
			for (let i = 0; i < response.data.cobertura.length; i++) {

				this.coberturas.push({
					cmoneda: response.data.cobertura[0][0].cmoneda,
					mprima: response.data.cobertura[0][0].mprima,
					mprimaext: response.data.cobertura[0][0].mprimaext,
					msumaaseg: response.data.cobertura[0][0].msumaaseg,
					xdescripcion_l: response.data.cobertura[0][0].xdescripcion_l,
				});
			}


		});

		this.buildBeneficiariosBody()

		this.buildCoberturasBody()
	}

	buildBeneficiariosBody() {
		let body = [];

		if (this.beneficiarios.length > 0) {

			this.beneficiarios.forEach(function (row:
				{
					fnacimiento: any;
					xcedula: any;
					xnombre: any;
					xparentesco: any;
					xsexo: any;
				}
			) {
				let dataRow = [];
				dataRow.push({ fontSize: 10, text: 'Fecha Nacimiento \n\n' + row.fnacimiento, alignment: 'center', });
				dataRow.push({ fontSize: 10, text: 'Cédula Identidad\n\n' + row.xcedula, alignment: 'center', })
				dataRow.push({ fontSize: 10, text: 'Nombre\n\n' + row.xnombre, alignment: 'center', })
				dataRow.push({ fontSize: 10, text: 'Parentesco\n\n' + row.xparentesco, alignment: 'center', })
				dataRow.push({ fontSize: 10, text: 'Sexo\n\n' + row.xsexo, alignment: 'center', })
				body.push(dataRow);
			})
		} else {
			let dataRow = [];
			dataRow.push(
				{ fontSize: 10, text: 'Fecha Nacimiento \n\n', },
				{ fontSize: 10, text: 'Cédula Identidad\n\n', },
				{ fontSize: 10, text: 'Nombre\n\n', },
				{ fontSize: 10, text: 'Parentesco\n\n', },
				{ fontSize: 10, text: 'Sexo\n\n', }
			);
			body.push(dataRow);
		}
		return body;
	}

	buildCoberturasBody() {
		let body = [];
		if (this.coberturas.length > 0) {
			this.coberturas.forEach(function (row:
				{
					cmoneda: any;
					mprima: any;
					mprimaext: any;
					msumaaseg: any;
					xdescripcion_l: any;

				}) {
				let dataRow = [];
				dataRow.push({ fontSize: 10, text: 'COBERTURAS \n\n' + row.xdescripcion_l, alignment: 'center', });
				dataRow.push({ fontSize: 10, text: 'SUMA ASEGURADA \n\n' + row.cmoneda + ' ' + row.msumaaseg, alignment: 'center', })
				dataRow.push(
					{ fontSize: 10, text: 'DEDUCIBLE \n\n' })
				dataRow.push({ fontSize: 10, text: 'PRIMA\n\n' + row.cmoneda + ' ' + row.mprima, alignment: 'center', })

				body.push(dataRow);
			})
		} else {
			let dataRow = [];
			dataRow.push(
				{ fontSize: 10, text: ' ', },
				{ fontSize: 10, text: ' ', },
				{ fontSize: 10, text: ' ', },
				{ fontSize: 10, text: ' ', },

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
										widths: [100, 250, 150],
										body: [
											[
												{
													style: 'tableExample',
													table: {
														widths: ['*'],
														body: [
															[{ image: this.xlogo, width: 140, height: 40, border: [false, false, false, false], },],
															[{ fontSize: 10, text: 'RIF.: J-00084644-8', alignment: 'center', border: [false, false, false, false] }],

														]
													},
												},

												{ fontSize: 12, text: 'Cuadro - Recibo de Póliza', absolutePosition: { x: 205, y: 60 }, bold: true, border: [false, false, false, false] },

												{
													style: 'tableExample',
													table: {
														widths: ['*'],
														body: [
															[{ fontSize: 10, text: 'Póliza     ' + `${this.cpoliza}`, alignment: 'center', bold: true }],
															[{ fontSize: 10, text: 'Certificado     ' + `${this.xcertificado}`, alignment: 'center', bold: true }],
															[{ fontSize: 10, text: 'Fecha  ' + `${this.fecha}`, alignment: 'center', bold: true }],
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
											[{ fontSize: 10, text: 'DATOS DEL TOMADOR Y ASEGURADO', alignment: 'center', bold: true, }
											],
										]
									}

								}, {
									style: 'tableExample',
									fontSize: 10,
									table: {
										widths: [345, 150],
										body: [
											['Tomador \n\n ' + `${this.xtomador}`, 'Cédula de Identidad / R.I.F.\n\n ' + `${this.xrif_tomador}`],
											['Asegurado \n\n ' + `${this.xasegurado}`, 'Cédula de Identidad / R.I.F. \n\n ' + `${this.xcedula_asegurado}`]
										]
									}
								}, {

									style: 'tableExample',
									table: {
										widths: ['*'],
										body: [
											[{ fontSize: 10, text: 'Direccion del tomador  \n\n ' + `${this.xdireccion_tomador}`, }
											],
										]
									}
								}, {
									style: 'tableExample',
									fontSize: 10,
									table: {
										widths: [150, 150, 70, '*', 35],
										body: [
											['Estado \n\n ' + `${this.xestado_tomador}`, 'Ciudad \n\n ' + `${this.xciudad_tomador}`, 'Zona Postal \n\n ' + `${this.xzona_postal_tomador}`, 'Teléfonos \n\n ' + `${this.xtelefono_tomador}`, 'Fax \n\n '],

										],

									},

								}, {

									style: 'tableExample',
									table: {
										widths: ['*'],
										body: [
											[{ fontSize: 10, text: 'Direccion del Asegurado  \n\n ' + `${this.xdireccion_asegurado}`, }
											],
										]
									}


								}, {
									style: 'tableExample',
									fontSize: 10,
									table: {
										widths: [150, 150, 70, '*', 30],
										body: [
											['Estado \n\n ' + `${this.xestado_asegurado}`, 'Ciudad \n\n ' + `${this.xciudad_asegurado}`, 'Zona Postal \n\n ' + `${this.xzona_postal_asegurado}`, 'Teléfonos \n\n ' + `${this.xtelefono_asegurado}`, 'Fax \n\n '],

										]
									}
								}, {
									style: 'tableExample',
									fillColor: '#eeeeee',
									table: {
										widths: ['*'],
										body: [
											[{ fontSize: 10, text: 'DATOS DE LA PÓLIZA', alignment: 'center', bold: true, }
											],
										]
									}
								}, {
									style: 'tableExample',
									fontSize: 10,
									table: {
										widths: [170, 170, 147],
										body: [
											['Fecha de Suscripción \n\n' + `${this.fecha}`,
											'Vigencia\n\n ' + 'Desde ' + `${this.fdesde_poliza}` + '\n\n hasta ' + `${this.fhasta_poliza}`,

											'Moneda \n\n ' + `${this.xmoneda}`],
											[{
												fontSize: 10, text: 'Sucursal / Oficina \n\n ' + `${this.xsucursal}`,


											}, {
												fontSize: 10, text: 'Canal de Venta \n\n ' + `${this.canal_venta}`,


											}, {
												fontSize: 10, text: 'Frecuencia de Pago \n\n ' + `${this.xfrecuencia}`,


											},],
											[{
												fontSize: 10, text: 'Intermediario(s):\n\n ' + `${this.xintermediario}`,


											}, {
												fontSize: 10, text: '',


											}, {
												fontSize: 10, text: 'Participación\n\n ' + `${this.xparticipacion}`,


											},]
										]
									}
								}, {

									style: 'tableExample',
									fillColor: '#eeeeee',
									table: {
										widths: ['*'],
										body: [
											[{ fontSize: 10, text: 'ASEGURADOS / DEPENDIENTES', alignment: 'center', bold: true, }
											],
										]
									}

								}, {
									style: 'tableExample',
									fontSize: 10,
									table: {
										widths: [100, 90, 140, 70, '*'],
										body: this.buildBeneficiariosBody()
									}
								}, {

									style: 'tableExample',
									fillColor: '#eeeeee',
									table: {
										widths: ['*'],
										body: [
											[{ fontSize: 10, text: 'COBERTURAS', alignment: 'center', bold: true, }
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
											[{ fontSize: 10, text: 'DATOS DEL RECIBO', alignment: 'center', bold: true, }
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
												'Recibo Nro.\n\n ' + `${this.xrecibo}`,
												'Fecha de Emisión\n\n ' + `${this.femision_rec}`,
												'Vigencia\n\n ' + 'Desde ' + `${this.fdesde_recibo}` + '\n\n hasta ' + `${this.fhasta_recibo}`,
												'Tipo de Movimiento\n\n ' + `${this.xtipo_mov}`],
										]
									}
								}, {
									fontSize: 10,
									table: {
										widths: [90, 70, 80, 80, 150],
										body: [
											[
												'Fecha de Cobro.\n\n ' + `${this.fcobro}`,
												'Referencia.\n\n ' + `${this.xreferencia}`,
												'Total Prima.\n\n ' + `${this.mtotal_prima}`,
												'Gastos.\n\n ' + `${this.mgastos}`,
												'Total a Cobrar.\n\n ' + `${this.mtotal}`
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
											[{ text: '  \n\n ', border: [false, false, false, false] }],
										]
									}
								}, {
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
												fontSize: 10, text: 'Nombre y Apellido/Denominación Social:\n\n',


											}, {
												fontSize: 10, text: 'Representante\n\n',


											},],
											[{
												fontSize: 10, text: 'C.I./RIF:',


											}, {
												fontSize: 10, text: 'Nombre y Apellido:',


											},],
											[{
												fontSize: 10, text: 'Firma:',


											}, {
												fontSize: 10, text: 'Cargo \n\n Firma',


											},],
										]
									}
								},],
							styles: {

								header: {
									fontSize: 10,
									bold: true,
									background: 'cornflowerblue',
								},
								subheader: {
									fontSize: 15,
									bold: true,
									background: 'cornflowerblue',
								},

							}
						}


						const mamefile = `${' Poliza #' + this.cpoliza}.pdf`
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

	async LoadDataQuotes(cotizacion: any, rcv: any, amplia: any, ptotal: any, allCoverages: any, cplan: any, dataVehicle: any, fano: any, xcorredor: any, xcorreocorredor: any, xtelefonocorredor: any) {
		this.rcv = rcv.toFixed(2);
		this.camplia = amplia.toFixed(2);
		this.ptotal = ptotal.toFixed(2);
		this.allCoverages = allCoverages;

		let data = {
			ccotizacion: cotizacion,
			cplan: cplan,
			fano: fano,
			coverage: this.allCoverages
		}

		this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/detail', data).subscribe(async (response: any) => {
			if (response.status) {
				this.metodologyList = [];
				this.coveragesList = [];
				for (let i = 0; i < response.data.list.length; i++) {
					this.coveragesList.push({
						ccobertura: response.data.list[i].ccobertura,
						xcobertura: response.data.list[i].xcobertura,
						m1: response.data.list[i].m1,
						m2: response.data.list[i].m2,
						m3: response.data.list[i].m3,
					})
				}

				for (let i = 0; i < response.data.payment.length; i++) {
					this.metodologyList.push({
						xmetodologiapago: response.data.payment[i].xmetodologiapago,
						m1: response.data.payment[i].m1,
						m2: response.data.payment[i].m2,
						m3: response.data.payment[i].m3,
					})
				}
				const fechaCotizacion = response.data.list[0].fcotizacion;

				// Crear un objeto Date con la fecha de cotización
				const fechaObj = new Date(fechaCotizacion);

				// Obtener los componentes de la fecha (día, mes, año)
				const dia = fechaObj.getDate();
				const mes = fechaObj.getMonth() + 1; // Nota: JavaScript cuenta los meses desde 0
				const anio = fechaObj.getFullYear();

				// Formatear la fecha en el formato "día mes año"
				const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${anio}`;

				this.fcotizacion = fechaFormateada,
					this.xmarca = dataVehicle.xmarca;
				this.xmodelo = dataVehicle.xmodelo;
				this.xversion = dataVehicle.xversion;
				this.ncapacidadpasajerosvehiculo = dataVehicle.npasajeros;
				this.fano = dataVehicle.fano;
				this.ncotizacion = cotizacion;
				this.xusuario = dataVehicle.xusuario.toUpperCase();
				this.xcorreo = dataVehicle.xcorreo.toUpperCase();
				this.xcorredor = xcorredor;
				this.xcorreocorredor = xcorreocorredor;
				this.xtelefonocorredor = xtelefonocorredor;
				this.quotesPdf();
			}
		})
	}


	//Funciones para generar el pdf de emision

	async LoadDataCertifiqued(contratoflota: any) {

		let params = {
			ccontratoflota: contratoflota,
			cpais: 58,
			ccompania: 1
		}

		await this.http.post(environment.apiUrl + '/api/v1/certificate/detail', params).subscribe(async (response: any) => {
			if (response.status) {
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
				this.ccerti = response.data.ccerti;
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
				if (response.data.ccorredor) {
					this.ccorredor = response.data.ccorredor;
					this.canalventa = 'INTERMEDIARIO'
				} else {
					this.canalventa = 'DIRECTO'
				}
				this.xnombrecorredor = response.data.xcorredor;
				this.xnombrepropietario = response.data.xnombrepropietario
				this.xapellidopropietario = response.data.xapellidopropietario
				this.xtipodocidentidadpropietario = response.data.xtipodocidentidadpropietario;
				this.xdocidentidadpropietario = response.data.xdocidentidadpropietario;
				this.xdireccionpropietario = response.data.xdireccionpropietario;
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
				this.ncapcarga = response.data.ncapcarga;
				this.npesovacio = response.data.npesovacio;
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
				this.xgrua = response.data.xgrua
				if (response.data.xtomador) {
					this.xtomador = response.data.xtomador
				} else {
					this.xtomador = this.xnombrecliente;
				}

				if (response.data.xrif_tomador) {
					this.xrif_tomador = response.data.xrif_tomador
				} else {
					this.xrif_tomador = this.xdocidentidadcliente;
				}

				if (response.data.xzona_postal_tomador) {
					this.xzona_postal_tomador = response.data.xzona_postal_tomador
				} else {
					this.xzona_postal_tomador = ' ';
				}

				if (response.data.xtelefono_tomador) {
					this.xtelefono_tomador = response.data.xtelefono_tomador;
				} else {
					this.xtelefono_tomador = this.xtelefonocliente;
				}

				if (response.data.xcorreo_tomador) {
					this.xcorreo_tomador = response.data.xcorreo_tomador
				} else {
					this.xcorreo_tomador = this.xemailcliente;
				}

				if (response.data.xestado_tomador) {
					this.xestado_tomador = response.data.xestado_tomador
				} else {
					this.xestado_tomador = this.xestadocliente;
				}

				if (response.data.xciudad_tomador) {
					this.xciudad_tomador = response.data.xciudad_tomador
				} else {
					this.xciudad_tomador = this.xciudadcliente;
				}

				if (response.data.xdireccion_tomador) {
					this.xdireccion_tomador = response.data.xdireccion_tomador
				} else {
					this.xdireccion_tomador = this.xdireccionfiscalcliente;
				}

				if (response.data.xrif) {
					this.xrif = response.data.xrif;
				} else {
					this.xrif = this.xdocidentidadcliente;
				}

				if (response.data.xdomicilio) {
					this.xdomicilio = response.data.xdomicilio;
				} else {
					this.xdomicilio = this.xdireccionfiscalcliente;
				}

				if (response.data.xzona_postal) {
					this.xzona_postal = response.data.xzona_postal;
				} else {
					this.xzona_postal = ' ';
				}

				if (response.data.xtelefono) {
					this.xtelefono = response.data.xtelefono;
				} else {
					this.xtelefono = this.xtelefonocliente;
				}

				if (response.data.xcorreo) {
					this.xcorreo = response.data.xcorreo;
				} else {
					this.xcorreo = this.xemailcliente;
				}

				if (response.data.xestado) {
					this.xestado = response.data.xestado;
				} else {
					this.xestado = this.xestadocliente;
				}

				if (response.data.xciudad) {
					this.xciudad = response.data.xciudad;
				} else {
					this.xciudad = this.xciudadcliente;
				}

				if (response.data.fnacimientopropietario) {
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
				this.createConditionArys();
				// await window.alert(`Se ha generado exitósamente la póliza n° ${this.xpoliza} del cliente ${this.xnombrecliente} para el vehículo de placa ${this.xplaca}`);
				try { this.createPDF() }
				catch (err) { console.log() };
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

	getPaymentMethodology(cmetodologiapago: any) {
		let xmetodologiapago = this.metodologiaList.find(element => element.id === parseInt(cmetodologiapago));
		return xmetodologiapago.value
	}

	changeDateFormat(date: any) {
		if (date) {
			let dateArray = date.substring(0, 10).split("-");
			return dateArray[2] + '/' + dateArray[1] + '/' + dateArray[0];
		}
		else {
			return ' ';
		}
	}

	buildCoveragesQuotesBody() {
		let imagen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABGAAAARgBIE5viAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAElSURBVFiF7dc9SgNBGIfxZ8TOS6T1AtZWaSVV+viRnMBaLG28QbqkEbyDJwhY2AleQBASCCSwf5tdWTfJzjv7NU0Gptt5f08mJLBOEjHXSVT9GACcdok5566APvANTCV9Ian1nX7QGaDcXgEXXeEvBTzbbzFxAcuYuIBFTDwB+jHxkSSi4n8BwBkwBCbAecv4deEcPeAz99AWuO8CzwJeDxx4aBvPAn5KDpZGBOA3JTP48AzYG9EEngWMPEN2IgLwW+9XmA58tkY0if/7HzBGPBrxO/MvqHC1lojG8J2AmhHB+N6AihEJMA7FDwYERlTGSwOMEQkwqYp7AzwRtXFTQBrxVMA3da49v10KeJdz7hIYAGtgLunddNA31xrQ1or+ZnQM+AU9IcfG/v5QwQAAAABJRU5ErkJggg=='
		let body = [];
		if (this.coveragesList.length > 0) {
			this.coveragesList.forEach(function (row) {
				let dataRow = [];
				dataRow.push({ text: row.xcobertura, margin: [35, 0, 0, 0], alignment: 'center', border: [false, false, false, false] });

				if (row.m1 !== undefined && row.m1 !== 0) {
					dataRow.push({ text: row.m1.toFixed(2), margin: [5, 0, 0, 0], alignment: 'right', border: [false, false, false, false] });
				} else {
					if (row.ccobertura >= 24 && row.ccobertura <= 28) {
						dataRow.push({ image: imagen, fit: [8, 4], alignment: 'right', margin: [-4, 0, 5, 0], border: [false, false, false, false] });
					} else {
						dataRow.push({ text: '–', fit: [8, 4], alignment: 'right', margin: [-8, 0, 5, 0], border: [false, false, false, false] });
					}
				}

				if (row.m2 !== undefined && row.m2 !== 0) {
					dataRow.push({ text: row.m2.toFixed(2), margin: [11, 0, 0, 0], alignment: 'right', border: [false, false, false, false] });
				} else {
					if (row.ccobertura >= 24 && row.ccobertura <= 28) {
						dataRow.push({ image: imagen, fit: [8, 4], alignment: 'right', margin: [-4, 0, 5, 0], border: [false, false, false, false] });
					} else {
						dataRow.push({ text: '–', fit: [8, 4], alignment: 'right', margin: [-8, 0, 5, 0], border: [false, false, false, false] });
					}
				}

				if (row.m3 !== undefined && row.m3 !== 0) {
					dataRow.push({ text: row.m3.toFixed(2), margin: [-10, 0, 0, 0], alignment: 'right', border: [false, false, false, false] });
				} else {
					if (row.ccobertura >= 24 && row.ccobertura <= 28) {
						dataRow.push({ image: imagen, fit: [8, 4], alignment: 'right', margin: [-4, 0, 5, 0], border: [false, false, false, false] });
					} else {
						dataRow.push({ text: '–', fit: [8, 4], alignment: 'right', margin: [-8, 0, 5, 0], border: [false, false, false, false] });
					}
				}

				body.push(dataRow);
			});
		} else {
			let dataRow = [];
			dataRow.push({ text: ' ', border: [false, false, false, false] });
			body.push(dataRow);
		}
		return body;
	}

	buildMetodologyQuotesBody() {
		let imagen = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAA5nAAAOZwGPiYJxAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAVBQTFRF////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3ZsMjgAAAG90Uk5TAAECAwQFBgcIERIYGx8hJCcpLi8zNDY3ODo7PkBCRUpRU1RZW1xfZWZnaGlsbW9wcXJ2eHp8fn+EhYaHi4yPk5ean6ChoqOkpaa6u7y9vr/BxMfIysvNztDR1NbX2Nnb3d7f4OLk7fHy8/j6/P3+YHCVfAAAAuFJREFUGBntwdlWFgQUBtCPAjWwDLN5TosGKCsrE22kNEwssCgEoxywEs773yUucuGAeun6z947AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8hMbfP/HD2Qt/FwPh6srZUyemnsyDGXp2eqUYQOePPTOU+9l1+HIxsC5/sCv3MnTor2Kg/XlwKDt6ebEYeL+8mB18slE0sP5R7mbPqaKJ73bnDmMLRRvzY7nN2MWikYtjucWehaKV+d3Z7vuimW+yzcdFO4dz00vrRTvXns+WoV+Lhhay5WDR0hu5YWS1aOmPkWyaKpqazKZLRVOXct2Boq0DSY4WbR1NslS0tZTsKxrbl8misckcLxo7npNFYyczVzQ2l5WisZWsFY2tpWgtRWspWkvRWorWUrSWorUUraVoLUVrKVpL0VqK1lK0lqK1FK2laC1FaylaS9FaitZStJaitRSt5UrR2JUsFY0tZbZobDYzRWMzmS4am85E0dhE9m4UbW3sTc4VbZ1LcqRo60iS8aKt8Vy3XDS1nE1vFk0dyqZHfi9aWhzKDa8WLb2SLT8VDc3mf0//W7Tzz/7cNFG081a2+bJo5otsN3ymaOX0o7nF6ErRyPJobjM6V7Rx5rHcYeTroomvhnM3H64XDVybyg5emC8G3s/PZWevXygG2spruafh91aLgbX67nDu66nPfisG0OKn+/OAnnjn2MyPy1eLgbB2/vS3n7/9eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAePj8B5DRNXh9vFzAAAAAAElFTkSuQmCC'
		let body = [];
		if (this.metodologyList.length > 0) {
			this.metodologyList.forEach(function (row) {
				let dataRow = [];
				dataRow.push({ text: row.xmetodologiapago, margin: [35, 0, 0, 0], alignment: 'center', border: [false, false, false, false] });

				if (row.m1 !== undefined && row.m1 !== 0) {
					dataRow.push({ text: row.m1.toFixed(2), margin: [5, 0, 0, 0], alignment: 'right', border: [false, false, false, false] });
				} else {
					dataRow.push({ image: imagen, fit: [4, 4], alignment: 'right', margin: [5, 0, 0, 0], border: [false, false, false, false] });
				}

				if (row.m2 !== undefined && row.m2 !== 0) {
					dataRow.push({ text: row.m2.toFixed(2), margin: [11, 0, 0, 0], alignment: 'right', border: [false, false, false, false] });
				} else {
					dataRow.push({ image: imagen, fit: [4, 4], alignment: 'right', margin: [7, 0, 0, 0], border: [false, false, false, false] });
				}

				if (row.m3 !== undefined && row.m3 !== 0) {
					dataRow.push({ text: row.m3.toFixed(2), margin: [-10, 0, 0, 0], alignment: 'right', border: [false, false, false, false] });
				} else {
					dataRow.push({ image: imagen, fit: [4, 4], alignment: 'right', margin: [10, 0, 0, 0], border: [false, false, false, false] });
				}

				body.push(dataRow);
			});
		} else {
			let dataRow = [];
			dataRow.push({ text: ' ', border: [false, false, false, false] });
			body.push(dataRow);
		}
		return body;
	}

	// buildPayment() {
	// 	this.rcv
	// 	this.camplia
	// 	this.ptotal
	// 	let body = [];

	// 	return body;
	// }

	buildAccesoriesBody() {
		let body = [];
		if (this.accesoriesList.length > 0) {
			this.accesoriesList.forEach(function (row) {
				let dataRow = [];
				dataRow.push({ text: row.xaccesorio, margin: [11, 0, 0, 0], alignment: 'left', bold: true, border: [false, false, false, false] });
				dataRow.push({ text: row.msuma_aseg.toFixed(2), margin: [11, 0, 0, 0], alignment: 'left', border: [false, false, false, false] });
				dataRow.push({ text: row.maccesoriocontratoflota.toFixed(2), margin: [11, 0, 0, 0], alignment: 'left', border: [false, false, false, false] });
				body.push(dataRow);
			})
		} else {
			let dataRow = [];
			dataRow.push({ text: ' ', border: [false, false, false, false] });
			body.push(dataRow);
		}
		return body;
	}

	buildAnnexesBody() {
		let body = []
		if (this.annexList.length > 0) {
			this.annexList.forEach(function (row) {
				let dataRow = [];
				dataRow.push({ text: row.xanexo, border: [true, false, true, false] });
				body.push(dataRow);
			})
		} else {
			let dataRow = []
			dataRow.push({ text: ' ', border: [true, false, true, false] });
			body.push(dataRow);
		}
		return body;
	}

	buildCoverageBody2() {
		let body: (({ text: any; margin: number[]; border: boolean[]; alignment?: undefined; fillColor?: undefined; } | { text: string; alignment: string; border: boolean[]; margin?: undefined; fillColor?: undefined; } | { text: string; fillColor: string; alignment: string; border: boolean[]; margin?: undefined; })[] | ({ text: any; decoration: string; margin: number[]; border: boolean[]; fillColor?: undefined; } | { text: string; fillColor: string; border: boolean[]; decoration?: undefined; margin?: undefined; })[])[] = []
		if (this.coverageList.length > 0) {
			this.coverageList.forEach(function (row) {
				if (row.ititulo == 'C') {
					let dataRow = [];
					dataRow.push({ text: row.xcobertura, margin: [10, 0, 0, 0], bold: true, border: [false, false, false, false] });
					//Se utiliza el formato DE (alemania) ya que es el que coloca '.' para representar miles, y ',' para los decimales fuente: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
					dataRow.push({ text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.msumaasegurada)}`, alignment: 'right', border: [false, false, false, false] });
					if (row.mtasa) {
						dataRow.push({ text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.mtasa)}`, alignment: 'right', border: [false, false, false, false] });
					} else {
						dataRow.push({ text: ` `, alignment: 'right', border: [false, false, false, false] });
					}
					if (row.pdescuento) {
						dataRow.push({ text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.pdescuento)} %`, alignment: 'right', border: [false, false, false, false] });
					} else {
						dataRow.push({ text: ` `, alignment: 'right', border: [false, false, false, false] });
					}
					//   if(row.m2){
					// 	dataRow.push({text: row.m2, fillColor: '#FFFFFF', alignment: 'right', border:[false, false, false, false]});
					//   } else {
					// 	dataRow.push({text: ` `, alignment: 'right', border: [false, false, false, false]});
					//   }
					if (row.mprima) {
						dataRow.push({ text: `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(row.mprima)}`, alignment: 'center', border: [false, false, false, false] });
					} else {
						dataRow.push({ text: ` `, alignment: 'right', border: [false, false, false, false] });
					}
					body.push(dataRow);
				}
				if (row.ititulo == 'T') {
					let dataRow = [];
					dataRow.push({ text: row.xcobertura, decoration: 'underline', margin: [2, 0, 0, 0], border: [false, false, false, false] });
					dataRow.push({ text: ` `, fillColor: '#FFFFFF', border: [false, false, false, false] });
					dataRow.push({ text: ` `, fillColor: '#FFFFFF', border: [false, false, false, false] });
					dataRow.push({ text: ` `, fillColor: '#FFFFFF', border: [false, false, false, false] });
					dataRow.push({ text: ` `, fillColor: '#FFFFFF', border: [false, false, false, false] });
					body.push(dataRow);
				}
			});
		}
		return body;
	}

	buildReceiptBody() {
		let body: (({ text: any; margin: number[]; border: boolean[]; alignment?: undefined; fillColor?: undefined; } | { text: string; alignment: string; border: boolean[]; margin?: undefined; fillColor?: undefined; } | { text: string; fillColor: string; alignment: string; border: boolean[]; margin?: undefined; })[] | ({ text: any; decoration: string; margin: number[]; border: boolean[]; fillColor?: undefined; } | { text: string; fillColor: string; border: boolean[]; decoration?: undefined; margin?: undefined; })[])[] = []
		if (this.receiptList.length > 0) {
			this.receiptList.forEach(function (row) {
				let dataRow = [];
				dataRow.push({ text: row.crecibo, margin: [10, 0, 0, 0], bold: true, border: [false, false, false, false] });
				dataRow.push({ text: row.fdesde_rec, alignment: 'right', border: [false, false, false, false] });
				dataRow.push({ text: row.fhasta_rec, alignment: 'right', border: [false, false, false, false] });
				dataRow.push({ text: row.fcobro, alignment: 'right', border: [false, false, false, false] });
				dataRow.push({ text: row.xmoneda, alignment: 'right', border: [false, false, false, false] });
				dataRow.push({ text: row.mprima, alignment: 'right', border: [false, false, false, false] });
				dataRow.push({ text: row.xestatus, alignment: 'right', border: [false, false, false, false] });

				body.push(dataRow);
			});
		}
		return body;
	}

	buildServiceArysBody() {
		let body: (({ text: any; margin: number[]; border: boolean[]; alignment?: undefined; fillColor?: undefined; } | { text: string; alignment: string; border: boolean[]; margin?: undefined; fillColor?: undefined; } | { text: string; fillColor: string; alignment: string; border: boolean[]; margin?: undefined; })[] | ({ text: any; decoration: string; margin: number[]; border: boolean[]; fillColor?: undefined; } | { text: string; fillColor: string; border: boolean[]; decoration?: undefined; margin?: undefined; })[])[] = []
		if (this.serviceList.length > 0) {
			this.serviceList.forEach(function (row) {
				let dataRow = [];
				// dataRow.push({text: row.cservicio, margin: [100, 0, 0, 0], bold: true, border: [false, false, false, false]});
				dataRow.push({ text: row.xservicio, alignment: 'center', border: [false, false, false, false] });

				body.push(dataRow);
			});
		}
		return body;
	}

	//   selectWatermark() {
	// 	this.receiptList
	// 	let watermarkBody = {}
	// 	if (this.cestatusgeneral == 13) {
	// 	  watermarkBody = {text: 'PENDIENTE DE PAGO', color: 'red', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70}
	// 	}
	// 	if (this.cestatusgeneral == 7) {
	// 	  watermarkBody = {text: 'COBRADO', color: 'green', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70}
	// 	}
	// 	if (this.cestatusgeneral == 3) {
	// 	  watermarkBody = {text: 'PÓLIZA ANULADA', color: 'red', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70}
	// 	}
	// 	return watermarkBody;
	//   }

	selectWatermark() {
		let watermarkBody = {};
		let today = new Date(); // Obtener la fecha de hoy

		// Recorrer cada elemento de this.receiptList
		for (let i = 0; i < this.receiptList.length; i++) {
			let receipt = this.receiptList[i];

			// Obtener las fechas de cada recibo
			let fdesdeRecDate = new Date(receipt.fdesde_rec_s);
			let fhastaRecDate = new Date(receipt.fhasta_rec_s);

			console.log(fdesdeRecDate)
			console.log(fhastaRecDate)
			console.log(receipt.cestatus)

			// Verificar si la fecha de hoy está dentro del rango de fdesde_rec y fhasta_rec
			if (fdesdeRecDate <= today && today <= fhastaRecDate) {
				// La fecha está dentro del rango

				// Verificar el valor de cestatus para el recibo actual
				if (receipt.cestatus == 13) {
					watermarkBody = { text: 'PENDIENTE DE PAGO', color: '#FFA9A9', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70 };
					break; // Salir del bucle si se encuentra una marca de agua
				} else if (receipt.cestatus == 7) {
					watermarkBody = { text: 'COBRADO', color: '#B0FFA9', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70 };
					break; // Salir del bucle si se encuentra una marca de agua
				} else if (receipt.cestatus == 3) {
					watermarkBody = { text: 'PÓLIZA ANULADA', color: '#FFA9A9', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70 };
					break; // Salir del bucle si se encuentra una marca de agua
				}
			} else {
				if (receipt.cestatus == 13) {
					watermarkBody = { text: 'PENDIENTE DE PAGO', color: '#FFA9A9', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70 };
					break; // Salir del bucle si se encuentra una marca de agua
				} else if (receipt.cestatus == 3) {
					watermarkBody = { text: 'PÓLIZA ANULADA', color: '#FFA9A9', opacity: 0.3, bold: true, italics: false, fontSize: 50, angle: 70 };
					break; // Salir del bucle si se encuentra una marca de agua
				}
			}
		}
		return watermarkBody;
	}

	createPDF() {
		try {
			this.xlogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAACLCAYAAACjgGhzAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAABc1JHQgCuzhzpAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAOe5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTEwLTA2VDEyOjA2OjA2LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0xMC0wNlQxMjowNjowNi0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMTAtMDZUMTI6MDY6MDYtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjBlNWU1ZmY0LTJkY2ItZWE0Ny1iN2E1LTU1ZDlmNWU3MWVkMjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjMzNTI5YzRlLTY0NjItMTFlZS05ZWFlLWFkNGE4YjllZjY3NDwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjQzMWM5ZjZkLWExNTgtYTI0Zi04NjU1LTVkNGU3YmEwMDFhYTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0MzFjOWY2ZC1hMTU4LWEyNGYtODY1NS01ZDRlN2JhMDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMTAtMDZUMTI6MDY6MDYtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MGU1ZTVmZjQtMmRjYi1lYTQ3LWI3YTUtNTVkOWY1ZTcxZWQyPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTEwLTA2VDEyOjA2OjA2LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjM3MzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkT3jawAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMzoxMDoyNSAwOTozMToxOBLZ7JEAAMVSSURBVHhe7J0HgF1F9f/Pvfe9t303u5veew+BQOgl9I5SBQGVIioi1YaiYMOCSlMQEZCqIKB0pIQaAgktkEB678nuZvur9/6/n3n7lg1NkeAP+XOS2Xvf3Olz5jtnzjT7X6MoirxMJnNNJpNOZ9JhNG1qS3ToPtdGLe3hykzYvjffO5x+LCgMwxKZ/WVuk9kgk8nlcspCZk02mz2mw9l/jVQ+idYovW1LS3jVZb95ac0uk34Z/ubiaVEmGbal0233t2caKMNEh/NP6VP6lD6lD04CuMME0g3pdC7auC4X/eT816OZMzal0rncdQKY4g5n/6dEZyFAHiQgPlnPJ2QaZULZO9Jrm8yv9Op3ePlISfGQnpr2TGbvtrbc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");'
			const pdfDefinition: any = {
				watermark: this.selectWatermark(),
				info: {
					title: `Póliza - ${this.xnombrepropietario}`,
					subject: `Póliza - ${this.xnombrepropietario}`
				},
				footer: function (currentPage: any, pageCount: any) {
					return {
						table: {
							widths: ['*'],
							body: [
								[{ text: 'Página ' + currentPage.toString() + ' de ' + pageCount, fontSize: 7, alignment: 'center', border: [false, false, false, false] }]
							]
						}
					}
				},
				content: [
					{
						style: 'data',
						table: {
							widths: [220, 230, '*'],
							body: [
								[{
									image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
										+ 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
										+ 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy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', width: 180, height: 50, border: [false, false, false, false]
								},
								{ text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.\nN° de Certificado.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false] }, { text: `\n\n73\n7.000.000\n7.000.000\n0`, alignment: 'right', bold: true, border: [false, false, false, false] },
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
								[{ text: 'DATOS DEL TOMADOR - ASEGURADO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 140, 70, 70, 80, '*'],
							body: [
								[{ text: 'TOMADOR:', bold: true, border: [false, false, false, false] }, { text: this.xtomador, border: [false, false, false, false] }, { text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false] }, { text: this.xrif_tomador, border: [false, false, false, false] }, { text: 'RAMO PÓLIZA:', bold: true, border: [false, false, false, false] }, { text: 'AUTOMÓVIL', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 140, 40, 100, 60, 80],
							body: [
								[{ text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false] }, { text: this.xdireccion_tomador, border: [false, false, false, false] }, { text: 'EMAIL:', bold: true, border: [false, false, false, false] }, { text: this.xcorreo_tomador, border: [false, false, false, false] }, { text: 'PÓLIZA:', bold: true, border: [false, false, false, false] }, { text: `${this.xpoliza}`, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [30, 100, 40, 50, 60, 22, 50, '*'],
							body: [
								[{ text: 'CIUDAD:', bold: true, border: [false, false, false, false] }, { text: this.xciudad_tomador, border: [false, false, false, false] }, { text: 'ESTADO:', bold: true, border: [false, false, false, false] }, { text: this.xestado_tomador, border: [false, false, false, false] }, { text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false] }, { text: this.xzona_postal_tomador, border: [false, false, false, false] }, { text: 'TELÉFONO:', bold: true, border: [false, false, false, false] }, { text: this.xtelefono_tomador, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [45, 135, 70, 70],
							body: [
								[{ text: 'ASEGURADO:', bold: true, border: [false, false, false, false] }, { text: `${this.xnombrepropietario} ${this.xapellidopropietario}`, border: [false, false, false, false] }, { text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false] }, { text: this.xrif, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 140, 40, 100],
							body: [
								[{ text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false] }, { text: this.xdireccionfiscalcliente, border: [false, false, false, false] }, { text: 'EMAIL:', bold: true, border: [false, false, false, false] }, { text: this.xemailcliente, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [30, 100, 40, 50, 60, 22, 50, '*'],
							body: [
								[{ text: 'CIUDAD:', bold: true, border: [false, false, false, false] }, { text: this.xciudad, border: [false, false, false, false] }, { text: 'ESTADO:', bold: true, border: [false, false, false, false] }, { text: this.xestado, border: [false, false, false, false] }, { text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false] }, { text: this.xzona_postal, border: [false, false, false, false] }, { text: 'TELÉFONO:', bold: true, border: [false, false, false, false] }, { text: this.xtelefono, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DATOS DE LA PÓLIZA', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [60, 100, 60, 110, 60, '*'],
							body: [
								[{ text: 'FECHA EMISIÓN:', bold: true, border: [false, false, false, false] }, { text: `${this.changeDateFormat(this.femision)}`, border: [false, false, false, false] }, { text: 'VIGENCIA:', bold: true, border: [false, false, false, false] }, { text: `${this.changeDateFormat(this.fdesde_pol)}  -  ${this.changeDateFormat(this.fhasta_pol)}`, border: [false, false, false, false] }, { text: 'MONEDA:', bold: true, border: [false, false, false, false] }, { text: this.xmoneda, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [50, 110, 60, 80, 80, '*'],
							body: [
								[{ text: 'SUCURSAL:', bold: true, border: [false, false, false, false] }, { text: this.xsucursalemision, border: [false, false, false, false] }, { text: 'CANAL DE VENTA:', bold: true, border: [false, false, false, false] }, { text: this.canalventa, border: [false, false, false, false] }, { text: 'FRECUENCIA DE PAGO:', bold: true, border: [false, false, false, false] }, { text: `${this.xmetodologiapago}`, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [60, 280, '*', '*'],
							body: [
								[{ text: 'INTERMEDIARIO:', bold: true, border: [false, false, false, false] }, { text: this.xnombrecorredor, border: [false, false, false, false] }, { text: 'TIPO MOVIM.', bold: true, border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DATOS DEL VEHICULO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [30, 50, 40, 60, 50, 120, 60, '*'],
							body: [
								[{ text: 'MARCA:', bold: true, border: [false, false, false, false] }, { text: this.xmarca, border: [false, false, false, false] }, { text: 'MODELO:', bold: true, border: [false, false, false, false] }, { text: this.xmodelo, border: [false, false, false, false] }, { text: 'VERSION:', bold: true, border: [false, false, false, false] }, { text: this.xversion, border: [false, false, false, false] }, { text: 'AÑO:', bold: true, border: [false, false, false, false] }, { text: this.fano, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [70, 75, 65, 70, 30, 40, 50, '*'],
							body: [
								[{ text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false] }, { text: this.xserialcarroceria, border: [false, false, false, false] }, { text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false] }, { text: this.xserialmotor, border: [false, false, false, false] }, { text: 'PLACA:', bold: true, border: [false, false, false, false] }, { text: this.xplaca, border: [false, false, false, false] }, { text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false] }, { text: this.xtransmision, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 75, 45, 70, 30, 90, '*', '*'],
							body: [
								[{ text: 'USO:', bold: true, border: [false, false, false, false] }, { text: this.xuso, border: [false, false, false, false] }, { text: 'PUESTOS:', bold: true, border: [false, false, false, false] }, { text: this.ncapacidadpasajerosvehiculo, border: [false, false, false, false] }, { text: 'PESO:', bold: true, border: [false, false, false, false] }, { text: this.npesovacio, border: [false, false, false, false] }, { text: 'CAPACIDAD:', bold: true, border: [false, false, false, false] }, { text: this.ncapcarga, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [30, 300, 40, 100],
							body: [
								[{ text: 'COLOR:', bold: true, border: [false, false, false, false] }, { text: this.xcolor, border: [false, false, false, false] }, { text: 'GRÚA:', bold: true, border: [false, false, false, false] }, { text: this.xgrua, border: [false, false, false, false] }]
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
								[{ text: 'COBERTURAS CONTRATADAS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [150, 100, 60, 50, '*'],
							body: [
								[{ text: 'COBERTURAS', bold: true, border: [false, false, false, false] }, { text: 'SUMA ASEGURADA', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'TASAS', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: '% DESC.', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'PRIMA', alignment: 'center', bold: true, border: [false, false, false, false] }]
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
							widths: [219, 200, '*'],
							body: this.buildAccesoriesBody()
						}
					},
					{
						style: 'data',
						table: {
							widths: [500],
							body: [
								[{ text: 'La prima no incluye el impuesto del  3% de  IGFT, el cual debe pagar en caso que su moneda de pago sea diferente de bolívares', alignment: 'center', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [150, 100, 60, 50, '*'],
							body: [
								[{ text: 'Prima total', colSpan: 4, alignment: 'right', bold: true, border: [false, false, false, false] }, {}, {}, {}, { text: `${this.xmoneda} ${new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(this.mprimatotal)}`, alignment: 'right', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DECLARACIÓN DE FE', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'En mi carácter de Tomador de la Póliza contratada con La Mundial de Seguros, C.A., bajo Fe de Juramento certifico que el dinero utilizado para el pago de la prima de la referida Póliza, proviene de fuente lícita; por lo tanto no tiene relación alguna con dinero, capitales, bienes, haberes, valores o títulos producto de actividades o acciones a que se refiere el Articulo 37 de la Ley Orgánica sobre Sustancias Estupefacientes y Psicotrópicas.', alignment: 'justify', bold: true, border: [false, false, false, false] }]
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
							widths: [220, 230, '*'],
							body: [
								[{
									image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
										+ 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
										+ 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy9jnaHb/F1f6EfCUxE0R12E+Gbbb9SY209ORSIQRCu/Yqpf9bcmLF4i9OCW3a0MNJ9Bynl8DlU+HxETjjFaiJChyJKpQEBYqPgHgJFJcCOAiIAgiONcSRUKNm9t3g6nzaKmfuiUWKJ95+QmyzzYZWbPAEOFCkCUelLvwahyNOQSTDSeoy3QQuhcTcRq+uReHsBUP2vvzW5NCOPZ0UJ+BwEbi8ClxeApdPgcdP4EpQ4UxWoCarUJMUqAkqiJ9AiVNAPABxqAAhEEwAGocIK6uU5J4b3X0u/dSZO7icqE77SbHNNhtahtUxjtVB3mp9vehYrSOBMsxkHOAcTzgEaIaDVAxPIRt6xysBh4QXZwwVX32Xtf3uR28LrN/cAVwkAQAUwOECnB4Fbgktt5/AE6/CmaLCkapCTVHgSFZBEhUo8QoUfxyIMxFE9UIQArAwRCQAEQqAh9XlauoJa7yDpy9Uk3Lsp8U22/7q0CrROBbVsH77NGQwhjsZBzgDJLTAGMAZgQo8MygJv5yXrW5XOUXBrDcH5t//1N9pdW2rpmUqDsDhJobSilPg8SvwxCtwJRnQcqRLeCUrUJIVKPHpULzZIO5UEEccBAGgBcAj5RD1JeB1FaugttntHPT3Oe7sfgFCiP3U2GbbXw1aQgjs1LjyfhUfFqCIExwzKQOEBFUUWgRcgkxwvNzDj+2DXnm0dfVLb0wQmp7SXPkOF+DwELi9Ctx+Y/AkKHCmqnBkSGilqlDTVChJqVD9uVB8bUDiMgCHHxAcQquCqC8GC+wGr90JPexZovWeNqdV1zF7bXDZZtsfZ797MxkVAmuDLOGLWjFQ47ibMTSAiZnqigOMEwgW/c05pvxUJbCtx5k4IXs50ndtQ3PooBSAJkAUDqICRAUUFSBOAuIhIC459hIQbx2Euw6CR0CIA4o3HXAnA0yDqC8C3MlQHD6QuvzTsf5x10ZH/H+75A6pdCoENrxss+33N/Wf//xn+99rZyEm8FUta708II7TGf7Bm7iDXLqDjJP95hvTBPVJ6dh5/Ai4CnYhpXhPbHAJQ7UBACESLoRAEQIKISAqgaISEIWAqAzEqYMoLhDVA+L0QfGkgfiyQZw+EBBAUUBAoJDaXHXvioRV8YN2pfmS6jwKbHDZZtuxCC0hBGqZwIc1rMfGEDoyjjuZxR3kAmDUUFecN1JXiKXEaFwCdhx3MiKVNcgs2ArVJFRTcAljQgAG3AgBEdHPAAyWKQDRACUEArMcY4dEUUEACEFBBAM4hZOWdhYl2yq/jDuRpLi9JYkOG1y22XZMQUsIgX06x/tVfMCeCLIYxx2N1BMzp4kMvFuAZa5nAsuynXC4UdB7KEp1F3L2bISbas2DSwAC0WnCAMKNaQAgQkBwDUAtwEMAjUDQIKAHIFgYkANhYQgeQnxwZ/9dInvhMnTu51dR2spNNBtcttl2DMS0uBDYFOKeL+r48dU6Eng0naGJgiKNfnOLAuMMoCwKsagKIyAuN/LOvwZliW1w1v8eRVZN0f7HQAFdCOPTHgEQCAgOcC4AJiCYgNBVOCIAIgGISB6UcCWU+n3gnjQQV4IMlIUguG7EvRxAv+L/vbDFPxhvhdKerkzj341II8Uu9c/xKWd9SMPbH6zqcyjrnj6y97rszOQ/9HhXrt6evKugrFFLcGqSv+bUk3oVqUd4TYUQ+GFtftKO3aWZ1vnZmckVJw3pXmZXfRta+xkTAt8FWNp3AdG7nuJebrqBVjgxgDZxCQUDKG8uOG+BnPxNVAfKR4zBK/7WuPDdu9GlbOt+cS7BABqB4Y8KBZwxCK5AUMCtC4iIAA8LOMIK1HoBJakUSnw1SJwfijseUL2Gm8jCEHoNwDha1eUjt3QV1qSNu/HDQuHZFxTrzmuDDfHOPx5cToeC/n3b5xUWV6XMefvbc97+cNWFnBuy8rwz+i+aeuXI+VkZSdWKQkSC3/uHH2+rjMSarXlFrf/fEwtv276jpC0ApKX4y96bffP1IwZ3Kz+SMnftKVeuuWnWwxu27O0KAKNP6fXl9GtOfz0nM7nSrva2e7ifRZjApzW03fdB9I4w3G11BaPB9SYBdxbDJRSGUmINsCMNwLIqMkEU6GkZWJF5MhL2bUd23d79u6+Qqk0wYcCRyzElgC5ANACagNDlOMKAcBjQ6iAiVRBaNUSkBiIcAcICCHNomgO/pI6ETtF/VwCVO2pFYpcE7PI5/1hXUVUVtMpI1Dt3yKw9vk/7Hxd/tW5YeWUgxeN24vVnpv59xODu5ZkZSXqr9ETd5frjv7NMTvKJvr3alu4rruIrvt82WKpFX2FRZfplFwz+RlEO/0Xw8NOLzv7wkx/Hmb9nTDvj+cvHD92ckuwXdrVv2XZUZYEQApUax+xCevxPtbw7peJOZlFLUSAZ7iAzXT9r3Ipa1qWG6mLmNg3TUWBRZqQ4cKIgrksW3jjvSbzX9RJosXptEADVAK1eIBwQCNVyhGoYgpUcoVKKSCGFVqBDK6DQCyjoXmNg+3SwoghYGQWv5GA1HDzAkVW+GUQLgVKA6piwrgLd7l/LL8uv4aoQf466kRDv5Wkp8WUA4PE44fW6tT/jg0gIgdOp0uTEOPTt1RYA8PW3mwe8t2h158O9lj+t3+Wf/fbyy4ad2KVhXkVlINGu7ja09gPWjnqhPr+bn7a+inQrLcfMYB0FoyIKGgpQCSxqzrNMGy2I0d+0AWKk0XwmQaVTOW6AHoE/NwGLx9yBp46/E7VOH2I97pwCekhAC3IDXNUMwUqGYDlDaB9FpECHtkeXANOh7dWh76OgRRSslIFVMPAaDndFDTLK8xqORae4uKgOU+/9Xkz9ppCnMy7+FDAwGwmM6T/ngyiEQEVFICk12b/nvtvPvyotxV+mUxZ/3yPv315ZFTj0OCoXuO+RD67v1L5Vq+lXj2qYX1pek2pXdzum1Sh+9VMtj39/nzi5LoIZlAFMV1EfAlwuHX6/E0IojVzEhpQHizvYkPogop/wMIH93MFGAONmbMwCriwXNgy7BPe42uK2n+5Cdqh0/zgXB/QIwCgHowRMJ6CagB5W4AwLOAMczhoFapwCxUugeAgUFzF6hSAExts/Am9NBag/ClPGCKp1XPzkT/DvquGLL+6qrPc6jv2WxRXfb035bOmGQV06Zu6+8JxBmw7X7aSUoaYulJCYGFc9/MRuOy85f/AHz8z6fOqmbfuyXn5j6Sm3TR+39GBBeSEEvli2IWvxl78Mf/e1Gye2yUmtBPAxAJSV16UJIRqlp1TVBLHwkx97F5fWpNXW1fshAI/HGUlPS6gafXLvtR1zW7Gm+wiFNfxv8dquewrKM6tr6hOEEPD5PKH2bdL2nTduwKa9+yod2/KKs4L1kTgAaN82vWRAv9zqAx17WUUtflq3OysQDMfpOnMoCuEJ8d763HbpJVmtkmnejmJ/VXXQVx+KuCIR6vZ4nBFFUYQQAoxzVXCB+HhvOKtVYmVaSoKelBgHhyN2/3ChsIadu8vc4YjujL7YAH+cJ5zbLp02tx0AbMsrcsx797tRmRmJ5ZdfOHR1Qnzz8dB9xVWoqAzE6ZQ1nLiqKMLlclC/zx3JyUrGkbj9RwVaYSawvJJnLS4VQyMa/mZVQYypCFYDNVUaUjNcIFD2TxhtEmxv+G3GrngTyJnKrAm4rGVQTuBKc6B4wAjcRV7A3zb+E8dVr4faVHfJmJnOBbguQHUCPQI4I4AjROB0CzjdHA4XgeohIE4DXEQBQACqKOBBDZRGgWkeX5jhzHkbEbezkre+ZSD5NNF97GbQ65Rh/gerxjwz6/OpmRmJJf16tZ3Us3ub8OGUoekMdYFQQmJCXJXLpeLGKacv+PSLX8bm7ypt89xrX045c/Rx3/fu0ab+QGVUVgdx38Pv33LWmOO+PHlYj4LikmrV43bWhCN6YlVNMEXTKdyuaI8dSQlxuOyCIeu/XbW11VkT/vOiprGkB+4cf9+kS4av9npcMffhcTtx3pkDtm7Ztq/gqukvPbS3qDLzjWevu+Xkod0LXS4HkhJ9NDExLvTKvKUXffjJ2rOSE+MqHrjzwoemTBq52tkMEOI8LuRkJVd9u2przsx/vX3H5eOHvDdl4siFKcl+SilDdW29b+26XV1vv2/+/xEC/xvPX49hg7pAIQQRjaKiMoCCfRX44OM1z2/eWtgtKzOp+PLxQz8aMbhbodfr2u/lsGtPWfozsz6b9OmX60a5XY7au245+5mRI3quadcmrfJAL4TPlq4//v7HPrjd43bWdMxtdd3oU3oXNbd+bV3ImbezOOvJF5ZcvWzlliGtMhJL773tvEe7d8nZxVh8XXZmcvhIn7df5R7W6ALvFbMenxSL4WENf7O4SQa4dIALFXVhN7Zv1RAK0WheljWW1SRGZW0dZE3cSErlmMVQXcxwFTUOaJyApBBU9emJh3o/gY8yx0AnsU9X8GisKxLgCNdyhKo56qsZ6qsYglXSdSxnCJVShMsYImUMWiVHRFcltAh0Js9dHmdYwymf7cSpt30prtpRJf40ca6jbTt2lTi/XLbx1OEndkVxaU2ree9+N+pwz1XTKOoCYX9iQlytqiromJtBb752zH8BBAsKK7KffPHTyzSdHtAtfPv9lQN/Wr+r690zzn3Z7/PA6XSwhHhvBAACwUh8KKTt5zq7XA6cNLR7icftpAl+D4YO6vJLnNfd7AuGEAKX04E+PdvWjzm1z+f9erZdP/qU3oVutxOEEGSkJWD4iV3Lh53YbXVOZjLcbmfqrXfPu/v+R94/M1gfiVmmz+dBz26tw1ddNmJNVquk6rGn9l3et1fbYFpKPJKTfDhlWI+Sm649fVlOdkotUQhaZ6egbes0tM5JRcfcVjihf0dccNYJePrBK66f9dQ1p8T7vZdeNPnp/06+8aVphUWNORTv9+KMUf323nTtmNcBoEfXnILrJ5/22dBBXSsPpI7LyuuwYOGq808e0g2aThNffuOrizSt+fvRrXO2ft6ZA/OvvXLkG8bvrLwrLh6++uSh3ct6dW8dVn9FetARbSmEQEmEY/ZeduIPFeit6biB6gakYg0AASUebPiZoaZSi8asWGPgmGplv/kSBEzGrxrBizYuS2OAxggiDIgwQCQD4V6tMavb/XipzVRElOZvjJEaIRCR8ArVMtTXMANeDQNHfRVDfQ1HXUBBrZIIagWWEZSHrhvHousYsKYQk25dIm79dg9POxbB9f5Ha0Z0bJ/R8bH7L4PX48S7i1ZfuHN32WE9W5pOUVsXSjSgpUJRFEy8eNgP/fvm5st9jF26fFOz/QPl7yxx/HfWZ9ddecmIBb26G4rM6VSRmOANA0AwGPbVh2JDQ1EICIzPuhRCDvkGJcR7A16PK9wc4E7o33HR7GevvbRt69TqB5/83/U33fnGVWXltc2WZ5w3ESTGMRBCEOd1RQ52TO3apOPRf16CKy4ZnjL/g1VnTL7x5btLy2r2W8/rMcryelxBVT14V+PLV27pVFMbSnzl6anISIvH1yu2DFv9846Ug21nHrOqKLp6lPIYD7sULgTy64X64i4+Oq8W7TQd1+t6VGHperTSGvMIdEogBAHxuvHzj0BZQaiRgjJdSiqBZYVVg/qyAstUWLRxC2KEEWiMIEwNYFAGEEFAEgF0T8Ci3Gl4sP2dKHckHBjKzFBeegiI1AuEAxzhOo5QjQGyUC1HuIahVvNib1rnBmAxCS3NBKoePcZt5Tjz70tw59xfRC9+DIGruLQaixavHXv15SdjQL9cjBzeA/m7Stp++MmawYflYuoUdYFQUmKCt8YhH+6EeC/u+fu5/3G7HbXVNfWp/378w+nhiB7zJfrcq5+fX18f8cyYdsZ8EyIupwOJCXFVhtIKx9eHtKP6RwCEEH7AyqUQfuqInkUfvHHL1N492ux+7c1lF1xxwwt37dxTevi1lwAE4IeyalycB3fcfDbatk71ff71+hPfeHv5iObP4eDlhcIaXntr2YWTLh3RvUP7DFx2wVCUV9alvzF/+dl/+tZDJgR+qOZJr+7mZ5SFcKeu43pqgZVuqbQ6I9AoMRSHBmhScbmTXfj5Ryf2bAmCMdEogM6aqC6rotIt6qthPo/Oj3ACjQEhqbB0DhABgAMKB7gPcPR0YFX2xbgn91HkeVsfXFFygGmAHjbgFanniNRxA2IBjoKkTqhzJTZAlVqugU6j56FJ4BbX4fh7vsTM+5eKMWH92ADXp1/80sflVLWRw3tAURRMvWIkvB4XXp6zdHJdIHQY7iFT6gJhd3Kir9ba2nnm6ON2jz217zcAsGpNfs83313Rp6la/f7HvKS33l85/obJo2Z1aJ/BzO2dThUJ8d5q6R62ra+PuP+I1tseXXPCH8+/bdqpI3qsXrJ0/ZBzLn/8+Q2bCjy/p'
										+ 'erOSEvAmaP6QQj4Pvj4x3HNuaaHYqtWb29VVFyddd4Z/QEAEy4cisyMRLz/0eozd+4uVf6U0BJCQOcCH5Xw3HcKxWm1EcxopKysbpFMa2gEMKm+NApwQuDNduDntT5sW10PPcINhWVpGWSx0iFYFF7M0lpIuamwgBA3FJYQBrAEByAMMBIOcBeB0lPBjoyhuKvNs1jp74NDemyEob6YZrQ46iEBLSSwveNgI4VDnrdmwpVGXVpNqjCNAhFKUB1B6wdXiBsmvcunl9RytGR3kVKGF1778spLLxgyxON1QdMpThraHX17tUX+rtKM9xat7n2o56fpVA0EI62Sk3zVVndLVRXccfNZL7dKTyjVKYv/12Mf/l+FJQWCc477H/1gWuuc1OJJlw5fat3WcA/jaqXSQn1Id/0R14kQguzMZCx45cb7rp5w0rsbtxTmjBr/0OxvVmxO579RWoyqKujZLQeEEJRX1qUfyC09WN1/9c1l544Y0q1PTlYKNJ2iR9ccnDqiJyqqAumvzvtmLGP8zwUtIQSCTOD1Pez4r0rFCWENf2tQVmbsxjLWdGL81uRyzaiwGgUiOhDWAV0QxHUk2LTRj3VfRhAOaAeMX+kWpWUNyGtSzUWkwtKooazAAcIFwIXhIjLzW0OjZ1N0U1CT3gH/ynwO/0scBY0chtcgYViW1h5b+pzaAGpNQpvqjd1EXQc0ShCmBEEKBHQBFhIJH67ho859kT22roD7WiK4hBD44psNOdt2FLV76KlFe3sM/r+CHoP/r6D/yH8U5O8sKWWMkxde++KqiKYfUnmhsOYOhTSkJPn2q10Dj+tYe+WlI+YBCO4qKE9+4vlPz6KUQQiB/y1Zm/vV8k2Dbp8+7r+ZGUmNtjPcQ28tAATrIwjUhz0HvbcC5DCuwWGpjKREH55+8IrX7r9j/JOVVQHvuVc88eLrb33TRz9AA8OvMYfDAUIAp1Nl7iP88mFrXpFzydJ1p7236Id9PYYY97jn0NsLvl6xuVhVlbpZc7++orom+Ls+e46DPZj7wgJv7+NDdwbQjlFMpVI5cDOpsyHBkzQKjjcoMLl+hJpxJ6MSRzhAOgkUbPYi8L8Qup3C4UrwNG4R5I1VFbfM12X8KyzVFeWAIntxABfGx9YSYJwLEAkyymCkLHRUwHkCnmcPoFB9CZdXv4VEXn+o3ML6oeeiPKVdQ3IrbwJVU3Hp3IBqPQU0KoCIgBoR4BGR8MN2MeDsJ9hLL1zhuH10X3WvqrSclAhdZ3hl7tfjb5s27rlbrh/7pTU2UlZRi/FXPf3492t3dF2+cmvWaSf1KjpYukdVVdAHgpjQIoTguitPXfjRkp/O2ri1sNOsOUsnXjBu4NK2bdICDzz24S2jTu694vSRfbbHUhtJCb4a41kGKioCiQCKm4ntCMo4KGOH/AaLRKhTdSiHRRyvx4Xbbxz3RVarxNJb7573z+kz37h/z96KF26/6azFLufR+6SKc46tefvAuUDXTlkbMzISj6iM2fOXn3HW6ccvefKBCbOcTtXyktFxzU0v3/L+x2tOe+v9lSfccPWoH5TfKaXngG+KLQHhfmUPH72zDu0oxdSGLHS98VijpMFFbKS8THVFjXlhCkR0gnpqVGIQgOQCVUEXflrAUVsQBKWiUYDdGsvSG1oIjda6sIxfUW48lEIYYDK+LYT8eFEYXdEwIzOfMOO3IICSq4KkubHQdy0eSb4N+xyHljRdlt0Zvww6d78APKNR1aVLJRiiQIACEU0AYQElzMEjAjzCQcIchUUi59LH9Kdf/JQODGn8TwMlyhjefO+7bjW1sUGet7PY/f3a/EFXXDLsS6/XBY8nOrTOTsWE8UMXAMALr315yaHEUyqqAgmEECQn+YOxW8XSMOOGM54mBMHS8rqMh5/+6KqX31h66vrNe9vfdes5L8ZKdCSEID01vqLhvpXXJjbnvrVrk1ZUFwgjb0dxzqFVaIFfNu7p2blD5o7DV0AqJl9+8rrZz1w7IyM9IfDvJxZOu3HmG1c1d62PxKpr6vHZ0vXwup01UyaeskA9gkTOqpog5r+/8sKpV4x8Nz7e2+geJyf5MHXSyAWKQsTs+csvP1L386hCq54KLCrmJ5aGcKcugaXp0RYx3QIsM76lWV3GhjiOMT9CCUK64SKFqYCgAlQXUAAo7RWEVAc2vANUbqoD1VmjtAfaKKXBiF+F5UC5kUlPYgCLcABMzmcAqAQWFVCZ7KamvQPIdGKN6wzck/AgtjjbHrCJJuLxYfGl/0BlQmZDThZr4sbqlCBCCeoZEKQCesSAlRLmYGEBHuYgEQFEABERqKnhKbc+p919x0vaRZW1fzy4dJ3i1bnfHL+noDwrLm7/2LVOGWbN/fqsc88YsLBVelJMCFxw1sBVbXJSapYsXX/S+k0FB+37pryyLokQIDnZF2gOLOPPOWHdiMFdfwGAhZ/+eMG/H19492UXDF40oF9udXPlpqXGV5nTpeW1zb6VLjpn0HsAArPmfj3hUODx/Y95yVu2FfY8Z2z/ZUd6nc8e23/nvBenTe/Tvc3OWXO/Hj95+ku3VVYF4n/9/WN47c1l2LilMDjtmtGzTxrSvfBI3P93Fv4woGfXnI29u7eOeX2HnNC58MT+HTetXber41fLN3b7Nce8d18FDhV8zUIrSIHqCBIaIKRZWgl1o2JqOokG2TUZv9KjQ1iOIzpBSDfUla4LcB1guoCqC3Bq9HXlbKdAc6vY/hFB6Xd1oBrdT2WZwIpIYDEZX3IwQGGiIXFVMCN+ZQwCjBqgMoGlyHUoM24OyVaBbCcK1H64x/c4vnX2B4sR2tAdTnx+/gzkdzqhwR3eT13pBGEGA1iaAA0LqGEOHhKgIaMbHBIWQBhScRnTkSBPeGaBfsUV94TuKChmRy1ATxmHplMXADDGwbk4oIYPBMP4z7OfnDJ7/vJL/jZl9NJYWdw7d5c6lny1fsyUK05ZZHUZGrVepSfisguGvB2sjyTNmrP0AkrZAY9z89bCDgSAU1Wapbbf58E9t53/lMftrIloFH6fu/T26eNeby7/RwgBVY2mJezcU9q2ubInX37SN2NP67P8h7U7ul35txdnbNm+z8k5jwn0z5euz7puxqv/74qLh83r3y+3KtZ+hRBgjCsH+v6UEILBAzpVvf3K9FtGDu+xZuHitSeXlO3/D1PReNvBY2iaRjFrzlI8+szHpbdcN+a1e2477/2mWfEAwDhXG441RnNUWUUd5r3z3fgpk06ZH2t7835MvvzkNwmAWXO+vrS2LnTYcT8hBIpLqvHyG0vHHuoz36wTneIC2rpRVFyHuZRiArW4QZSR/RI8G+VqMUNhmS5SmAIhCnAJEMIMYFEGqLqAQgWYEEA7BTyiYO8yjlBJLVJH+cCIGxqXLZJcxsR4tBdSBzdiWCbAjAC8MU9IiBEZhBdMQOUAk93TQLqK4ARKmgOcATW72uAx9/3YS17EeO1juGBUNs3pwcpRV2H10IugMaVR66beANZoo0BY9tOlagI0IgDNGIgmAA1gmgB0OV+X86jwf/INHXbmruCLi571Xdsu59elFUUiOr7+dlPnrduL2gFAXSCEB/7z4dWnDO+xUlUaw0EIgfLKuuQlX60fuX5TQfc5z193s9+3f9y6PhTB0y8uuUjTqKtLx8z6A7VenTqi5w+PPfsJFi356fQLlq5fPPa0vo3+yUgIgYimY8X32zI//vzncTpleOjpRVf8341nzWnfNo06HY0eT0EIwclDuxdfcPbARW+9u3L01Ekjn+vaOTso86WEdQgEQlj90860F17/ahiAXwDg21Xbkn/ZsIv17N4m7FBVaw0haakJZNaTU+596oXFo1+c/dWlw8+8/9nj+rTPH9S/00+pyb4azgXJ21HSfs0vOwYxJsidt5z95LlnDNjaNA4lhEBFZR2Wrdw6eFteUbdf1u+O79e7fZ3DoTQLro65rdg7r95477W3vnLTwsVrT4u1XlFJNfYWVyUzxlFdHdxvn3V1Iaz6MR+vzP36vXBE87z+zNS3Th3Ra2+sLHfOOX5ev7sTAOzaW962tKzWmZLk161Keu6C5UN/3rCr6+ABnXce6OuAU0f0/NnpcrBVa/L6zn9/5fHXTDx5rflNIeccu/aUZwJASWlNztp1u5LTU+PrGsDJOMnfVZL54JOLpj/4j4seSU9LOLTW2AP9hVh1RGDeDnbCt0UYyCku1GXFjMIrGnDXZDKlxqKuoQmsCAO4jFWpTADUgJdTKi3OBKAb7huPCCBfBymmiG9NkTIuDiGvz/g0RwLLfDRVCSfOjaRXIj/9UZgBLsYAxQosBlDzt4x1QTdaFw11JoAyCrFTg8rqMYK9h5u0l4C4OCy+cCZ+OuEc6NzR0ChguoNMnmuEG3/eoUXQACgW4YAGEI0b7qBUmohIWElggcppKgAdwWmXOec98Y+4N51H0DfX3sIKPPHi4vFUZ2pdMBwfDuuHlZ90XO/2G269Yew3VgXDucB3P2xL+WzpukG7Csrbci6U3Hbpe9pkpxadd+aAtdYHbtHite327qvM2JZflFtSVpsOAPF+T7B71+xt11x+ynd+vwHDFd9vTXn7w1WnBes1fyikuQ0wIRzv91S0bZ22e8YNY5e53S4d8ukwh01bC8WcBd8mT7t61L7W2SmyuaUBWPhq+Ub1g4/WuOtDERIK6wTyLwJAAH+cW8TFufnIYT0iZ4/tbwbRzYtMGOOkrLxW+WblZt+6jQVJ+4qq4nWduf3xHqVDu3RtUP9Odcf1bq/F+z0uQogLgAuAKgey7LstaT/+srNLdU0wQQgQv88dSkyIC549pv+arMykA173YDCMZ2Z9dsroU/qsPq5P+4DhNlVi0ZK1A7flF+WWlBrXMiXZV9WlY+YOr8elaRp11NSF4p0OlbbOTikZeFyH7a2zU5nb7Yj5KVJZeS3efO+7Ies27ekRChnPRUZaQlm/3m03X3zuievzd5V6Fn7647C8HSW5EZ26Wmel7Mttl7531Em91nbqkNkgl5ev3Jq2ceve9rsLynJ2761oDQF4Pc5I187Z2y87f/A3G7bszdmWV9Rmw5a93QLBiI8QcK/XFVZVRVjVY0SjzuN6t9t4/eTTvjvUhoiD/u9hhAks3Mk7v71djIvo5Bxm/VyFNk6mjFhykoxmfkCXbhinhqKCVFwO3ZjHqVFRiVRyRDcqu9ipQZRQeFP0mg4T48t2qb40nSOJC6OVUOFGt8nC0jrIpNISEkKGipKpDtwIxBtdLMt+4qnxm7Oo6hJUAFUU2BMBIhRD/B+j07T+2JzT18jJolFgmeCOmMCiAtRUUxFDYRFdGPErTQJLKq0GlUUt8JLgBgVGnuj45r2XfPcmJRx+ANXsWvrI84r2/7MOU7rHKrfp+s3sX8BI0+OEEOOKC0GFgAklHUAExtWJgEAnALWoKFjGf6QRy1iV3ooDgLPJ2Jy2Dg4ZkiGWcmJeZ/N6Hsq9NC/9oXyQf6DyzM1/xT0+aDm/9vgPmvIAAG6V4MKOyvZEp1jwygbBKyM4r6GV0OIeNgTeGYFG0QAsTg2AOKQ7qFBjmsn5hrqQqkhWXsEAkemER9Caay+on3fbtNQFT6/FOU9/j8kKQyJENOAuGoAloWMCq5H7J8DM1kQTWLpUaSawZNwLHECcCpLtQlulpvC/r513bXy71PD9y8TV60vQjzJ0jzYMWNxBKgyXL2IMrIk7KDSjJwnDHUQUVNSEVxRYoAJd2pO8OA85Qugc/X6zolnqh7QuJwRSx0IDEAYQkmNzHiOEMEJgVUotwawA5fJ8moObOTgk4FwA3AA8ALxy2mVZrjStuEfhXpLDLe8Q7/FRKeeITuhw/mH6x2Ie/9QacVleBS7VWOMgtMaMFsJIg+IygEWYAJHuoKob05QZ3RorVAJKB4hUXEJW6LQElD17k+vO80Y4tztUAsYFXlotBv7rK/H3inq0ElJRQRgxKoVHgWVMS4iZ60nFBR1QmKH2GtQYtbiHFFA4AqMGKN8/P9P179wcJweAkgDHw9+K8Z9sx5majly9QV3J1lAJK6FxCA2AxkE0GC6i7Mq5kTuoW1WWBJbcf/cOSv5Hc/xTOrR3cLQcYxJG9QBqAAQlqHS5zO7mODbUTNfS2USlqVKVKbHgY5nX3HW1lmnCUWlO4bWoC3c40AKAnVVceWSVuPy7PRiiU3Q3g+6mO6hZgKUyI7WBU8MdFEyAUQFBDWDxhkhFVHEJKtC3Pdn8zM3uu4b1cezXv8+izbzd7Z+Ke/JKRUezr3cTQpB/DWaASwbiTYBRmf4gASV4dJ6wAMMB1F19lmPBv65zz0lPbuyaBTWBZ7/nJ72wmkyp09C6ngloOiSwOEREQOgGvJTm3EHdorSoaKSuVIHAyMGO1S886vtXbluF/479b4kj3IZJ9RQAUCXHERzih722/abuq9WFdQNIBJACIF6C7K8DLQCoDgk8+C0/b+FmnB3UkWsqLBNYggkoprtFBRQzfiXhQSSwGlyyhgqM4LhB6rLHprn+06WN2mym8U+Fwn/rQnb7snxxnMLg5zLwbsLLjHc1pD9QYxmopdXQ6g5KcPhcqL5nsvOJ6Re7vvF6YseSKBd44yfR596vxcyiWpGNiJE0KjRjgGYAi5u/rcoqGmi3njNABVwKaidf7HrnX7fHzUlLVX4rMHFLQFuzxJBMNcRjQIw04xpRy/a/i5KaMHHSCAC95s6Z/Zxl3qFuPgLA6ZbfGwB8KNXgH2Zz58z+PXfnApAOIAtAXEtVXUf03UCSl+CfJysftPKJ0qdW4YZ6HTlGbMtQLKp0B4kJLGaoLUWXgW9qxJQaAYsheOO5jtn/mORakJZ04Ep7XA4JvHm5evetH7Bp767lY8AQbwbgFRb9X0Mhq6fCLAF3HlV0YFFg5aSi+LEb3fdeOMq59UCf0zgUgiuPx7qcBNx284fi/u3VoiO3xK+ICawm6QyNoEXRoCxBBeJcqH7gdu+j1050r4iLU44moMzgdsgyhCVoaAuLJQFAMoDCI9jOBNarAPIB5AC4RA6v/YVUmAZgn3Th20vV1eLAdcQ1xOskmD6IrHhkNO5PcqOYytZBRTegpOgGpBg1AtCqmdJg/kWXpVL7HKh6ZKrz4UducB8UWKZlJRK8cpn67IyTlVleBdWQ8TNuxqsksFQJKDPgHlU5DcAK9ulANr/zoOf6i0YfGFgNF40QjO5ECt+fqNwwOAerEBFBEhYgYYBFZHwrbAbl0ZCj1eAaatE4VkYyKZ33jO+WG6/xHA1gCQmqWgB7AWwDsAnAdgB7AJQBqJMga4lxphzphh6udQSQJ4EFCb5lADpJl+mvZEJew90SXn8N99BqXAj8WCgSJrwlntpRwtMERbwqY1pMuofmb9HQpB+ttJlJKHnuZvfMs4Y5dh7JB8OUCcxewfrNXEDvqqxDuhnbAgXUhoC7VFhS6TUoLIbgqAHKD6/c7bmvdYZy2H24CyFQEwKmvKjdtHAlP02PiPhGgNIs52u2ELIGpRXs3VXZ++oTvr/37+uoOwrxKy5VVAWAUvlAtujY0oSJk06XKgkAlphqae6c2fkTJk7qCOBcCZ2QXL66maIuBZAtVVXlIbiPhQAWWlTdQLnMK+cVymu9BMAN0tVcZimnF4Dn5HiEPL5Ocv2QpawQgCVz58xeLc93oDwnyOOcP3fO7MLfqu4DaA2gTUuLcf3qV7tCCAbkkNovpyhXndQeax1U1DJdgOocxPxURwOEDExbAtLBvu3Jxk8f8U4+Z/iRAQsAHCrB5OHqzx9Md17bPhkFkK6n0WIpGuJqjVvvBFxA7ZSz1HcWPe49ImABRrNvUhzBvOmup2aerT7nhahBhBv7igijJ0KdN0kkFSBUBM861bns0zfjrz2KwApIdbVHTrd0YI2QsHgOwH8s8No3YeKkHACTJaTuksA49wCqaZlcNqNJXMsKrBHSfbxLwuQSuayXLHuZZdkJFqClNHFZky2KLkWqw3wAD8h51rKWATh3wsRJKRMmTvLKZUvmzpl9l4TWJb+x4iqH0cor/lLQMitv6ySCd69y3HvVieQdRYg6RTdcRC5jVw3uoCagcATGDlS+XfIf77S+ndTgr620hBAM66pWfn6na9LgDmSNwhEQlnhVgzsoVU6SFxUP3uB8+LmZ3tfdLuVX/0uOy0Fw76XOT1+e7roj3YeyBkhpVrWFhoD73650v/HWi76Hc7LUo/EPPUJWpGKpsChauMkKfDqAZXPnzC6cO2d2JYD1ACrnzpkdAjAawA9z58w21c1qixsYywol/AolnP5tgaBXTi+xwGa1BE6KXJZnUVKfyXGVBJJXxomsLmyoSQxumZzXq0lZqy1g9FqOp+EYJKB/KwvLUEKLesEd1f9ET/IRPH6RY06XVOy4bwGdURtCCkxgyWx3j4qaqeMc8/51jXtBfNzRjQF2yFD4wttdf5/xqn7t/KV0nE4R38gdpEDbdBQ+c5v7zjOGOXcfzf6rVJXg0pGOTR1beadMvCv0dN5O3taa4Q4qkJqA8rume5+4capnhaoetX3r8q1cIeNUx4KZ8MlvMn+fBFonCbcTDqNME1wdJRBPl/O8cjjX4po1jaO9ZfkdspTXC9EGDhM4OdK1NLfd0GRZrLIwd87sygkTJ/0AYMSEiZN6SWDf9TvEtwLyRae2lIfjqLete10EN57uWPHqdc7bchKwT8igM9EEUuJQ/tj1rgceuu7oA8u09EQFz13nevGeSxxPJbhRaSothSHQvzNZ9/ET3qvHDT+6wGq4mArBoF5q9cf/jZs8bqj6qc8hqqELOISoO66buvG1x/0zbrr2qAJLyNhVFQxNd6xYiqzIVrcrToLCdAFflZXaOsSKaVlVlQnC1yQwcizl3RVjSG4KFxkba8417GiJR5nL8y3bNS0rx7r+3DmzF0oXNSTdxoG/w7WmLe1l5/gtClUVgvMHOfI7pJMp876gp2/eybvmpJKiK8c4Fg7srlY51N+2ldXvJZh5seuLsQMc3y9eSQcFgsLXu4OyddQgx5amCaNHPbpJCLq0U+n8x/0Pb9pOE3bv5RlJ8STQt4ejOC31qP9hK5MxiSCOQZswcZJ37pzZoQkTJ6VIVbO+iaox7RwJgOeaUVhNXaxQjGmvZXqGVEgbYuxrIKItmDlNXMOOcn8hCSyvBWDhAyjKqgkTJ/0bwFtz58zeAOC5CRMnzbCA7re0lpb28ttAy7R+HdRg3ynK+9YK/budmErQv4ta17+L+sUfcWF9cQQD+zprB/bFb9mlI0P0U5ljyaytdssklAAgX0KsUqqnDXJ8QhO3y2obpCs4whJLusqyzDQzrnWVhM1qCZxKeRzmvsxWQNPM/ntOl8exwaKsKpu4k+Zx5yPaIrls7pzZhfKcBgLYICHtxZGldxy2xkALy9X61SkPtv2hVg+jtbDkGFRZ1hSEDQA6zp0z+wG5LMeirg6W7mAC6fQmUDxQSoN1mZmImmJRbW+ZxwQjncJrgZUZeB8RI4ZlPW7AaClcZjmnSyzu6oa5c2a/9Ttc6kwAuTCy5W1o2fabW1BCq/SvegEO4zOeo2E5MPKyHsBR+vznd/6MJ5an1V6C668biLftd79/9j387WwEgH8gGtMaACNlIXSMnJ8fQEJLApZJWttarplf8Ks4dtId/ky2AUYDwD8srt/8Y+TcnADSYLTKtiiz3cOWbRxGVvMetPwWRLN/KQXRPqbMl6omB7vLm6P3ssuW7q67pR28rbRafkX3SYkfagGV2oSS2Tmd2ce6s5lBRfQj8CCMRMgQor1UWP/Mwgpygcbd7NgdEDau89lycLfUE7CtZUPLA6PFqR7GJxniT3Z8DumC+OXgsYDK2txODuLKeOV5mv1+xer7S1iWmd09UzT5Y4wmZYgYZVjHvMn4117fP+r+qPLllgUjabbF1n0bWseG1E+UFZNLRfJHKS5TSXkkoBJh9Nnktjxr5AjLNct2/ApIWKHWFFrCcmzWeVYI8ibAtJZPDrB/0mQcC7BWoD'
										+ 'YHVXGAc7Puw+pmW++FT74AWnSXy+Ro/SmobbbZZputtGz7az+cnc4ZD+BKAA/RvIXfHmB5AMAzAMx1MgHMhJG9/jOirX8A0Nw25nzE2MYs80m57CE5bxiASdLlehfA6022GQPgb3L+u7HKonkLH2rm3GfK8gHgdZq38F37iTDMzvGxraUCbZgFMn4JB7/8bQILAPpZ1mtum06W+eY245vs8kpL+dbtsyzQG9ZkmwuaOfymZcWCsbWsKx2dzuln33UbWra1bOsrx/+QSsYvK3qmRWGNA1AEYOhBtjGB8DqAm+V0J8u+hsUA0hi5/TMW5dW3CZiyYhx3rLKamrnvmy3qrZN9y2330LaWbVnSxftZjk23K9Pi4gHGx8nDJGCa26Y4Rvl1TVzKny1wMyESALBY/h7XxP0bE2Ob5so60L5NC9i33FZatrVss7pXxc3MP9Ay6/zFEiRXwog1FQF4zwKZTKmoYtkDAD5CtDtlU2UVW4CGQyzLtPdgfC70pCzrZ5q3cLF9y22lZVtLelAbB6aPdlDa3wRoWRYldbqET6CZ7UzF1M8EjDzOh2KsG7OsGOf2rUUxAkArR6dzMmnewmL7SbChZdufC0yZAGYB+JTmLXy2GVUUy13KPIAblXkI24yRkHpIQucJGK2CJsDGIxqYHwYj0G/azfL4ZjVx+WY2UV4xy5LAamrm+pfI43oARlD/WfspsaFl25/IaN7CYkencwIAOstZnSzLHmoCuGkSEv0s6xVbANdPqpaO0t0LyHGsbWL9IUb8QQ43D9FY2a8976bn9vIRHI8NLdts+4PsZ6lAPpK/i2jewrwY6/0CYCyisaSAdKsCEij9YMSarO7kgbYZ20QdfSuHcRb3br6c95AFeg80OfbXEW3xM1XZ6/IY3m1aVjN5WiukGpvfBJK2wQ7E2/bns9ctFTQPwMPNqJNvLXAwE0VN9+8hSxk/W9ZrbhvrfHObgwXL8+R+AjHK/rXK63VEk14B4F07uTRq9mc8ttlmm620bLPNNttsaNlmm2222dCyzTbbbGjZZptttv2G9v8HAFqcTtSyHgmwAAAAAElFTkSuQmCC', width: 180, height: 50, border: [false, false, false, false]
								},
								{ text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.\nN° de Certificado.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false] }, { text: `\n\n73\n7.000.000\n7.000.000\n\n0`, alignment: 'right', bold: true, border: [false, false, false, false] },
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
								[{ text: 'DATOS DEL TOMADOR - ASEGURADO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 140, 70, 70, 80, '*'],
							body: [
								[{ text: 'TOMADOR:', bold: true, border: [false, false, false, false] }, { text: this.xtomador, border: [false, false, false, false] }, { text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false] }, { text: this.xrif_tomador, border: [false, false, false, false] }, { text: 'RAMO PÓLIZA:', bold: true, border: [false, false, false, false] }, { text: 'AUTOMÓVIL', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 140, 40, 100, 60, 80],
							body: [
								[{ text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false] }, { text: this.xdireccionfiscalcliente, border: [false, false, false, false] }, { text: 'EMAIL:', bold: true, border: [false, false, false, false] }, { text: this.xemailcliente, border: [false, false, false, false] }, { text: 'PÓLIZA:', bold: true, border: [false, false, false, false] }, { text: `${this.xpoliza}`, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [30, 100, 40, 50, 60, 22, 50, '*'],
							body: [
								[{ text: 'CIUDAD:', bold: true, border: [false, false, false, false] }, { text: this.xciudad, border: [false, false, false, false] }, { text: 'ESTADO:', bold: true, border: [false, false, false, false] }, { text: this.xestado, border: [false, false, false, false] }, { text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false] }, { text: this.xzona_postal, border: [false, false, false, false] }, { text: 'TELÉFONO:', bold: true, border: [false, false, false, false] }, { text: this.xtelefono, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [45, 135, 70, 70],
							body: [
								[{ text: 'ASEGURADO:', bold: true, border: [false, false, false, false] }, { text: `${this.xnombrepropietario} ${this.xapellidopropietario}`, border: [false, false, false, false] }, { text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false] }, { text: this.xrif, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 140, 40, 100],
							body: [
								[{ text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false] }, { text: this.xdireccionfiscalcliente, border: [false, false, false, false] }, { text: 'EMAIL:', bold: true, border: [false, false, false, false] }, { text: this.xemailcliente, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 6],
						table: {
							widths: [30, 100, 40, 50, 60, 22, 50, '*'],
							body: [
								[{ text: 'CIUDAD:', bold: true, border: [false, false, false, false] }, { text: this.xciudad, border: [false, false, false, false] }, { text: 'ESTADO:', bold: true, border: [false, false, false, false] }, { text: this.xestado, border: [false, false, false, false] }, { text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false] }, { text: this.xzona_postal, border: [false, false, false, false] }, { text: 'TELÉFONO:', bold: true, border: [false, false, false, false] }, { text: this.xtelefono, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DATOS DE LA PÓLIZA', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [60, 100, 60, 110, 60, '*'],
							body: [
								[{ text: 'FECHA EMISIÓN:', bold: true, border: [false, false, false, false] }, { text: `${this.changeDateFormat(this.femision)}`, border: [false, false, false, false] }, { text: 'VIGENCIA:', bold: true, border: [false, false, false, false] }, { text: `${this.changeDateFormat(this.fdesde_pol)}  -  ${this.changeDateFormat(this.fhasta_pol)}`, border: [false, false, false, false] }, { text: 'MONEDA:', bold: true, border: [false, false, false, false] }, { text: this.xmoneda, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [50, 110, 60, 80, 80, '*'],
							body: [
								[{ text: 'SUCURSAL:', bold: true, border: [false, false, false, false] }, { text: this.xsucursalemision, border: [false, false, false, false] }, { text: 'CANAL DE VENTA:', bold: true, border: [false, false, false, false] }, { text: this.canalventa, border: [false, false, false, false] }, { text: 'FRECUENCIA DE PAGO:', bold: true, border: [false, false, false, false] }, { text: `${this.xmetodologiapago}`, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 6],
						table: {
							widths: [60, 280, '*', '*'],
							body: [
								[{ text: 'INTERMEDIARIO:', bold: true, border: [false, false, false, false] }, { text: this.xnombrecorredor, border: [false, false, false, false] }, { text: 'TIPO MOVIM.', bold: true, border: [false, false, false, false] }, { text: '', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DATOS DEL VEHICULO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [30, 50, 40, 60, 50, 120, 60, '*'],
							body: [
								[{ text: 'MARCA:', bold: true, border: [false, false, false, false] }, { text: this.xmarca, border: [false, false, false, false] }, { text: 'MODELO:', bold: true, border: [false, false, false, false] }, { text: this.xmodelo, border: [false, false, false, false] }, { text: 'VERSION:', bold: true, border: [false, false, false, false] }, { text: this.xversion, border: [false, false, false, false] }, { text: 'AÑO:', bold: true, border: [false, false, false, false] }, { text: this.fano, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [70, 75, 65, 70, 30, 40, 50, '*'],
							body: [
								[{ text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false] }, { text: this.xserialcarroceria, border: [false, false, false, false] }, { text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false] }, { text: this.xserialmotor, border: [false, false, false, false] }, { text: 'PLACA:', bold: true, border: [false, false, false, false] }, { text: this.xplaca, border: [false, false, false, false] }, { text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false] }, { text: this.xtransmision, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 75, 45, 70, 30, 90, '*', '*'],
							body: [
								[{ text: 'USO:', bold: true, border: [false, false, false, false] }, { text: this.xuso, border: [false, false, false, false] }, { text: 'PUESTOS:', bold: true, border: [false, false, false, false] }, { text: this.ncapacidadpasajerosvehiculo, border: [false, false, false, false] }, { text: 'PESO:', bold: true, border: [false, false, false, false] }, { text: this.npesovacio, border: [false, false, false, false] }, { text: 'CAPACIDAD:', bold: true, border: [false, false, false, false] }, { text: this.ncapcarga, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [30, 300, 40, 100],
							body: [
								[{ text: 'COLOR:', bold: true, border: [false, false, false, false] }, { text: this.xcolor, border: [false, false, false, false] }, { text: 'GRÚA:', bold: true, border: [false, false, false, false] }, { text: this.xgrua, border: [false, false, false, false] }]
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
								[{ text: 'RECIBOS DE PRIMAS - FRACCIONAMIENTO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [50, 60, 60, 60, 60, 60, '*'],
							body: [
								[{ text: 'NO. RECIBO', bold: true, border: [false, false, false, false] }, { text: 'FECHA DESDE', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'FECHA HASTA', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'FECHA COBRO', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'MONEDA', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'PRIMA', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'ESTATUS', alignment: 'center', bold: true, border: [false, false, false, false] },]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [50, 60, 55, 60, 50, 62, 92],
							body: this.buildReceiptBody()
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 10],
						table: {
							widths: [150, '*'],
							body: [
								[{ text: 'POR EL TOMADOR', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }, { text: 'POR LA MUNDIAL DE SEGUROS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
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
								[{ text: [{ text: `En Caracas a los ${new Date().getDate()} días del mes de ${this.getMonthAsString(new Date().getMonth())} del ${new Date().getFullYear()}` }], alignment: 'center', fontSize: 6, bold: true, border: [false, false, false, false] }]
							]
						},
					},
					{
						table: {
							widths: ['*'],
							body: [
								[{ text: [{ text: `Obtenga y conozca el contenido de las Condiciones Generales, Condiciones Particulares y Anexos correspondientes a las coberturas descritas en este Cuadro Recibo de la Póliza, accediendo a nuestra página web www.lamundialdeseguros.com` }], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false] }]
							]
						},
					},
					{
						table: {
							widths: ['*'],
							body: [
								[{ text: [{ text: `Aprobado por la Superintendencia de la Actividad Aseguradora mediante Oficio N° FSAA-1-1-0363-2022 de fecha 05-08-2022.` }], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false] }]
							]
						},
					},
					{
						table: {
							widths: ['*'],
							body: [
								[{ text: [{ text: `Para la activación de los servicios comunicarse a través de: Principal: N° Contacto: 0500-5526256| Opción:  Solicitud de Grúa 3-1 | Servicios Club Arys 3-2` }], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false] }]
							]
						},
					},
					{
						table: {
							widths: ['*'],
							body: [
								[{ text: [{ text: `El Tomador Asegurado o Beneficiario de las Pólizas, que sienta vulneración de sus derechos, y requiera presentar cualquier denuncia, queja, reclamo o solicitud de asesoría sugerida con ocasión de este contrato de seguros; puede acudir a la Oficina de la Defensor del Asegurado de la Superintendencia de la Actividad Aseguradora, o comunicarlo a través de la Pagina web: http: //www,lamundialdeseguros.com` }], alignment: 'justify', fontSize: 6, bold: true, border: [false, false, false, false] }]
							]
						},
					},
					{
						table: {
							widths: ['*'],
							body: [
								[{ text: [{ text: `CLIENTE` }], color: 'red', alignment: 'center', fontSize: 6, bold: true, border: [false, false, false, false] }]
							]
						},
					},
					// {
					// 	pageBreak: 'before',
					// 	style: 'data',
					// 	table: {
					// 		widths: [220, 230,'*'],
					// 	  body: [
					// 		[ {image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
					// 		+ 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
					// 		+ 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy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'
					// 		+ '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'
					// 		+ 'YHVXGAc7Puw+pmW++FT74AWnSXy+Ro/SmobbbZZputtGz7az+cnc4ZD+BKAA/RvIXfHmB5AMAzAMx1MgHMhJG9/jOirX8A0Nw25nzE2MYs80m57CE5bxiASdLlehfA6022GQPgb3L+u7HKonkLH2rm3GfK8gHgdZq38F37iTDMzvGxraUCbZgFMn4JB7/8bQILAPpZ1mtum06W+eY245vs8kpL+dbtsyzQG9ZkmwuaOfymZcWCsbWsKx2dzuln33UbWra1bOsrx/+QSsYvK3qmRWGNA1AEYOhBtjGB8DqAm+V0J8u+hsUA0hi5/TMW5dW3CZiyYhx3rLKamrnvmy3qrZN9y2330LaWbVnSxftZjk23K9Pi4gHGx8nDJGCa26Y4Rvl1TVzKny1wMyESALBY/h7XxP0bE2Ob5so60L5NC9i33FZatrVss7pXxc3MP9Ay6/zFEiRXwog1FQF4zwKZTKmoYtkDAD5CtDtlU2UVW4CGQyzLtPdgfC70pCzrZ5q3cLF9y22lZVtLelAbB6aPdlDa3wRoWRYldbqET6CZ7UzF1M8EjDzOh2KsG7OsGOf2rUUxAkArR6dzMmnewmL7SbChZdufC0yZAGYB+JTmLXy2GVUUy13KPIAblXkI24yRkHpIQucJGK2CJsDGIxqYHwYj0G/azfL4ZjVx+WY2UV4xy5LAamrm+pfI43oARlD/WfspsaFl25/IaN7CYkencwIAOstZnSzLHmoCuGkSEv0s6xVbANdPqpaO0t0LyHGsbWL9IUb8QQ43D9FY2a8976bn9vIRHI8NLdts+4PsZ6lAPpK/i2jewrwY6/0CYCyisaSAdKsCEij9YMSarO7kgbYZ20QdfSuHcRb3br6c95AFeg80OfbXEW3xM1XZ6/IY3m1aVjN5WiukGpvfBJK2wQ7E2/bns9ctFTQPwMPNqJNvLXAwE0VN9+8hSxk/W9ZrbhvrfHObgwXL8+R+AjHK/rXK63VEk14B4F07uTRq9mc8ttlmm620bLPNNttsaNlmm2222dCyzTbbbGjZZptttv2G9v8HAFqcTtSyHgmwAAAAAElFTkSuQmCC', width: 180, height: 50, border:[false, false, false, false]},
					// 		{text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false]}, {text: `\n\n73\n7.000.000\n7.000.000`, alignment: 'right', bold: true, border: [false, false, false, false]},
					// 	   ]
					// 	  ]
					// 	}
					// },
					// {
					// 	alignment: 'center',
					// 	style: 'title',
					// 	margin: [0, 0, 0, 6],
					// 	text: [
					// 	  { text: '\nCUADRO - RECIBO DE PÓLIZA', bold: true },
					// 	  { text: '\nAUTOMÓVIL', bold: true },
					// 	]
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	widths: ['*'],
					// 	body: [
					// 		[{text: 'DATOS DEL TOMADOR - ASEGURADO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	widths: [40, 140, 70, 70, 80, '*'],
					// 	body: [
					// 	  [{text: 'TOMADOR:', bold: true, border: [false, false, false, false]}, {text: this.xtomador, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif_tomador, border: [false, false, false, false]}, {text: 'RAMO PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: 'AUTOMÓVIL', border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	widths: [40, 140, 40, 100, 120, '*'],
					// 	body: [
					// 	  [{text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xdireccionfiscalcliente, border: [false, false, false, false]}, {text: 'EMAIL:', bold: true, border: [false, false, false, false]}, {text: this.xemailcliente, border: [false, false, false, false]}, {text: 'PÓLIZA:', bold: true, border: [false, false, false, false]}, {text: `${this.ccarga}`, border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					//   style: 'data',
					//   table: {
					// 	widths: [30, 100, 40, 50, 60, 22, 50, '*'],
					// 	body: [
					// 	  [{text: 'CIUDAD:', bold: true, border: [false, false, false, false]}, {text: this.xciudad, border: [false, false, false, false]}, {text: 'ESTADO:', bold: true, border: [false, false, false, false]}, {text: this.xestado, border: [false, false, false, false]}, {text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false]}, {text: this.xzona_postal, border: [false, false, false, false]}, {text: 'TELÉFONO:', bold: true, border: [false, false, false, false]}, {text: this.xtelefono, border: [false, false, false, false]}]
					// 	]
					//   }
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	widths: [45, 135, 70, 70],
					// 	body: [
					// 	  [{text: 'ASEGURADO:', bold: true, border: [false, false, false, false]}, {text: `${this.xnombrepropietario} ${this.xapellidopropietario}`, border: [false, false, false, false]}, {text: 'C.I. / R.I.F.:', bold: true, border: [false, false, false, false]}, {text: this.xrif, border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	widths: [40, 140, 40, 100],
					// 	body: [
					// 	  [{text: 'DIRECCIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xdireccionfiscalcliente, border: [false, false, false, false]}, {text: 'EMAIL:', bold: true, border: [false, false, false, false]}, {text: this.xemailcliente, border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	margin: [0, 0, 0, 6],
					// 	table: {
					// 	  widths: [30, 100, 40, 50, 60, 22, 50, '*'],
					// 	  body: [
					// 		[{text: 'CIUDAD:', bold: true, border: [false, false, false, false]}, {text: this.xciudad, border: [false, false, false, false]}, {text: 'ESTADO:', bold: true, border: [false, false, false, false]}, {text: this.xestado, border: [false, false, false, false]}, {text: 'ZONA POSTAL:', bold: true, border: [false, false, false, false]}, {text: this.xzona_postal, border: [false, false, false, false]}, {text: 'TELÉFONO:', bold: true, border: [false, false, false, false]}, {text: this.xtelefono, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: ['*'],
					// 	  body: [
					// 		[{text: 'DATOS DE LA PÓLIZA', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: [60, 100, 60, 110, 60, '*'],
					// 	  body: [
					// 		[{text: 'FECHA EMISIÓN:', bold: true, border: [false, false, false, false]}, {text: `${this.changeDateFormat(this.femision)}`, border: [false, false, false, false]}, {text: 'VIGENCIA:', bold: true, border: [false, false, false, false]}, {text: `${this.changeDateFormat(this.fdesde_pol)}  -  ${this.changeDateFormat(this.fhasta_pol)}`, border: [false, false, false, false]}, {text: 'MONEDA:', bold: true, border: [false, false, false, false]}, {text: this.xmoneda, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	widths: [50, 110, 60, 80, 80, '*'],
					// 	body: [
					// 	  [{text: 'SUCURSAL:', bold: true, border: [false, false, false, false]}, {text: this.xsucursalemision, border: [false, false, false, false]}, {text: 'CANAL DE VENTA:', bold: true, border: [false, false, false, false]}, {text: this.canalventa, border: [false, false, false, false]}, {text: 'FRECUENCIA DE PAGO:', bold: true, border: [false, false, false, false]}, {text: `${this.xmetodologiapago}`, border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	margin: [0, 0, 0, 6],
					// 	table: {
					// 	widths: [60, 280, '*', '*'],
					// 	body: [
					// 	  [{text: 'INTERMEDIARIO:', bold: true, border: [false, false, false, false]}, {text: this.xnombrecorredor, border: [false, false, false, false]}, {text: 'TIPO MOVIM.', bold: true, border: [false, false, false, false]}, {text: '', border: [false, false, false, false]}]
					// 	]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: ['*'],
					// 	  body: [
					// 		[{text: 'DATOS DEL VEHICULO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: [30, 50, 40, 60, 50, 120, 60, '*'],
					// 	  body: [
					// 		[{text: 'MARCA:', bold: true, border: [false, false, false, false]}, {text: this.xmarca, border: [false, false, false, false]}, {text: 'MODELO:', bold: true, border: [false, false, false, false]}, {text: this.xmodelo, border: [false, false, false, false]}, {text: 'VERSION:', bold: true, border: [false, false, false, false]}, {text: this.xversion, border: [false, false, false, false]}, {text: 'AÑO:', bold: true, border: [false, false, false, false]}, {text: this.fano, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: [70, 75, 65, 70, 30, 40, 50, '*'],
					// 	  body: [
					// 		[{text: 'SERIAL CARROCERIA:', bold: true, border: [false, false, false, false]}, {text: this.xserialcarroceria, border: [false, false, false, false]}, {text: 'SERIAL DEL MOTOR:', bold: true, border: [false, false, false, false]}, {text: this.xserialmotor, border: [false, false, false, false]}, {text: 'PLACA:', bold: true, border: [false, false, false, false]}, {text: this.xplaca, border: [false, false, false, false]}, {text: 'TRANSMISIÓN:', bold: true, border: [false, false, false, false]}, {text: this.xtransmision, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: [40, 75, 45, 70, 30, 90, '*', '*'],
					// 	  body: [
					// 		[{text: 'USO:', bold: true, border: [false, false, false, false]}, {text: this.xuso, border: [false, false, false, false]}, {text: 'PUESTOS:', bold: true, border: [false, false, false, false]}, {text: this.ncapacidadpasajerosvehiculo, border: [false, false, false, false]}, {text: 'PESO:', bold: true, border: [false, false, false, false]}, {text: this.npesovacio, border: [false, false, false, false]}, {text: 'CAPACIDAD:', bold: true, border: [false, false, false, false]}, {text: this.ncapcarga, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	margin: [0, 0, 0, 2],
					// 	table: {
					// 	  widths: [30, 300, 40, 100],
					// 	  body: [
					// 		[{text: 'COLOR:', bold: true, border: [false, false, false, false]}, {text: this.xcolor, border: [false, false, false, false]}, {text: 'GRÚA:', bold: true, border: [false, false, false, false]}, {text: this.xgrua, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: ['*'],
					// 	  body: [
					// 		[{text: 'SERVICIOS DE ARYS AUTO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	margin: [0, 0, 0, 2],
					// 	table: {
					// 	  widths: [500],
					// 	  body: this.buildServiceArysBody()
					// 	}
					// },
					// {
					// 	style: 'data',
					// 	table: {
					// 	  widths: ['*'],
					// 	  body: [
					// 		[{text: 'NOTIFICACIÓN DE INDEMNIZACIÓN O SERVICIO DE AUTOMÓVIL', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false]}]
					// 	  ]
					// 	}
					// },
					// {
					// 	margin: [0, 0, 0, 2],
					// 	table: {
					// 	  widths: ['*'],
					// 	  body: [
					// 		[{text: [{text: `El tomador, Asegurado, o Beneficiario, deberá notificar dentre de los primeros cinco (5) días hábiles luego de ocurrido el siniestro o en el momento que tenga conocimiento al Call Center atención al cliente 24/7`}], alignment: 'justify', fontSize: 7, bold: true, border: [false, false, false, false]} ]
					// 	  ]
					// 	},
					// },
					// {
					// 	table: {
					// 	  widths: ['*'],
					// 	  body: [
					// 		[{text: [{text: `+58 0500-2797288 ó +58 0241-8200184`}], alignment: 'center', fontSize: 7, bold: true, border: [false, false, false, false]} ]
					// 	  ]
					// 	},
					// },
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
			pdf.download(`Póliza - ${this.xnombrepropietario}`);
			pdf.open();

		}
		catch (err) { console.log() }
	}

	createConditionArys() {
		const filename = 'Condiciones Beneficios Club Arys.pdf';
		const url = `./assets/${filename}`;

		this.http.get(url, { responseType: 'blob' }).subscribe((response: any) => {
			const blob = new Blob([response], { type: 'application/pdf' });
			const objectUrl = window.URL.createObjectURL(blob);

			window.open(objectUrl, '_blank');
		});
	}

	quotesPdf() {
		try {
			this.xlogo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWkAAACLCAYAAACjgGhzAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAABc1JHQgCuzhzpAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEwAACxMBAJqcGAAAOe5pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTEwLTA2VDEyOjA2OjA2LTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0xMC0wNlQxMjowNjowNi0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMTAtMDZUMTI6MDY6MDYtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjBlNWU1ZmY0LTJkY2ItZWE0Ny1iN2E1LTU1ZDlmNWU3MWVkMjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjMzNTI5YzRlLTY0NjItMTFlZS05ZWFlLWFkNGE4YjllZjY3NDwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOjQzMWM5ZjZkLWExNTgtYTI0Zi04NjU1LTVkNGU3YmEwMDFhYTwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo0MzFjOWY2ZC1hMTU4LWEyNGYtODY1NS01ZDRlN2JhMDAxYWE8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMTAtMDZUMTI6MDY6MDYtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6MGU1ZTVmZjQtMmRjYi1lYTQ3LWI3YTUtNTVkOWY1ZTcxZWQyPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTEwLTA2VDEyOjA2OjA2LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjM3MzwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMTc8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PkT3jawAAAAhdEVYdENyZWF0aW9uIFRpbWUAMjAyMzoxMDoyNSAwOTozMToxOBLZ7JEAAMVSSURBVHhe7J0HgF1F9f/Pvfe9t303u5veew+BQOgl9I5SBQGVIioi1YaiYMOCSlMQEZCqIKB0pIQaAgktkEB678nuZvur9/6/n3n7lg1NkeAP+XOS2Xvf3Olz5jtnzjT7X6MoirxMJnNNJpNOZ9JhNG1qS3ToPtdGLe3hykzYvjffO5x+LCgMwxKZ/WVuk9kgk8nlcspCZk02mz2mw9l/jVQ+idYovW1LS3jVZb95ac0uk34Z/ubiaVEmGbal0233t2caKMNEh/NP6VP6lD6lD04CuMME0g3pdC7auC4X/eT816OZMzal0rncdQKY4g5n/6dEZyFAHiQgPlnPJ2QaZULZO9Jrm8yv9Op3ePlISfGQnpr2TGbvtrbc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");'
			const pdfDefinition: any = {
				info: {
					title: `Cotización N° ${this.ncotizacion}`,
					subject: `Cotización N° ${this.ncotizacion}`
				},
				footer: function (currentPage: any, pageCount: any) {
					return {
						table: {
							widths: ['*'],
							body: [
								[{ text: 'Página ' + currentPage.toString() + ' de ' + pageCount, fontSize: 7, alignment: 'center', border: [false, false, false, false] }]
							]
						}
					}
				},
				content: [
					{
						style: 'data',
						table: {
							widths: [220, 230, '*'],
							body: [
								[{
									image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS0AAABLCAYAAAAlOdEdAAAACXBIWXMAAAsTAAALEwEAmpwYAABDLmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDIzLTAxLTExVDE1OjMzOjMyLTA0OjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjdiZDRiZjQxLTE4MTAtZTM0Yy04M2I0LTk5ZTVkNmEyZDRlNjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmMzYzc4Y2M5LTkxZTctMTFlZC1hYzIyLWNlNDc5NDRmMDkwOTwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmUwY2Q5YWFlLTg4MmUtZTY0OS05OTk3LTAzN2JhZWJjNDEwMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6MzM6MzItMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPnNhdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6NWU4Y2JhNTctZTNkMy1hZTQxLTk4MjAtYjJhOTk0NmYzMmFhPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDIzLTAxLTExVDE1OjM1OjI4LTA0OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpjaGFuZ2VkPi88L3N0RXZ0OmNoYW5nZWQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAyMy0wMS0xMVQxNTo0MDoyMC0wNDowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y29udmVydGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9wbmc8L3N0RXZ0OnBhcmFtZXRlcnM+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5kZXJpdmVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpwYXJhbWV0ZXJzPmNvbnZlcnRlZCBmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nPC9zdEV2dDpwYXJhbWV0ZXJzPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo3YmQ0YmY0MS0xODEwLWUzNGMtODNiNC05OWU1ZDZhMmQ0ZTY8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMjMtMDEtMTFUMTU6NDA6MjAtMDQ6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8eG1wTU06RGVyaXZlZEZyb20gcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICA8c3RSZWY6aW5zdGFuY2VJRD54bXAuaWlkOjIxMGE2MTEyLTI4NDEtNTA0NS04ZTE4LTZlM2M4YjEyODJlZTwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOmRvY3VtZW50SUQ+CiAgICAgICAgICAgIDxzdFJlZjpvcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDplMGNkOWFhZS04ODJlLWU2NDktOTk5Ny0wMzdiYWViYzQxMDM8L3N0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgICAgPHBob3Rvc2hvcDpUZXh0TGF5ZXJzPgogICAgICAgICAgICA8cmRmOkJhZz4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJOYW1lPmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllck5hbWU+CiAgICAgICAgICAgICAgICAgIDxwaG90b3Nob3A6TGF5ZXJUZXh0PmRlIFNlZ3Vyb3M8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHBob3Rvc2hvcDpMYXllck5hbWU+Si0wMDA4NDY0NC04PC9waG90b3Nob3A6TGF5ZXJOYW1lPgogICAgICAgICAgICAgICAgICA8cGhvdG9zaG9wOkxheWVyVGV4dD5KLTAwMDg0NjQ0LTg8L3Bob3Rvc2hvcDpMYXllclRleHQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpCYWc+CiAgICAgICAgIDwvcGhvdG9zaG9wOlRleHRMYXllcnM+CiAgICAgICAgIDxwaG90b3Nob3A6Q29sb3JNb2RlPjM8L3Bob3Rvc2hvcDpDb2xvck1vZGU+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOlhSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6WVJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpSZXNvbHV0aW9uVW5pdD4yPC90aWZmOlJlc29sdXRpb25Vbml0PgogICAgICAgICA8ZXhpZjpDb2xvclNwYWNlPjY1NTM1PC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4zMDE8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NzU8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA'
										+ 'gICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg'
										+ 'ICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PmE3qp0AAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAANA1JREFUeNrsnXeYFFX297+3quN0Tw5MIA05gwIiUUVBUMyYQRQFA4uJ9SfqqqvrvsY1rVkMCChiZDGACQURFEQlhxnSMEzO3dPdVTe8f9St6ZqhhySGwTrPU09VV7gV76e+59xTt4kQ4iTYZptttrUQU+xLYJttttnQss0222yzoWWbbbbZZkPLNttss6Flm2222WZDyzbbbLMNAOA4Fk9KCAFBKUQkAhGqBy0r8vH6Gi8RugMORRC3W1MT0+rUxHQKpxvE6QZRVPtpsM02G1q/L6h4fQj1+Tviar7+uk9ky8bOvLwwm1QV5jiculuNV7qqfgLFp0DxKiAu8oviT6hW09rsVVNy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', width: 180, height: 50, border: [false, false, false, false]
								},
								{ text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false] }, { text: `\n\n73\n7.000.000\n7.000.000`, alignment: 'right', bold: true, border: [false, false, false, false] },
								]
							]
						}
					},
					{
						alignment: 'center',
						style: 'title',
						margin: [0, 0, 0, 2],
						text: [
							{ text: '\nCOTIZACIÓN AUTOMÓVIL', bold: true }
						]
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DATOS DEL TOMADOR', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 3],
						table: {
							widths: [60, 100, 40, 100, 40, '*'],
							body: [
								[{ text: 'N° COTIZACIÓN:', bold: true, border: [false, false, false, false] }, { text: this.ncotizacion, border: [false, false, false, false] }, { text: 'CLIENTE:', bold: true, border: [false, false, false, false] }, { text: this.xusuario, border: [false, false, false, false] }, { text: 'EMAIL:', bold: true, border: [false, false, false, false] }, { text: this.xcorreo, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DATOS DEL VEHICULO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 100, 40, 100, 40, '*'],
							body: [
								[{ text: 'MARCA:', bold: true, border: [false, false, false, false] }, { text: this.xmarca, border: [false, false, false, false] }, { text: 'MODELO:', bold: true, border: [false, false, false, false] }, { text: this.xmodelo, border: [false, false, false, false] }, { text: 'VERSION:', bold: true, border: [false, false, false, false] }, { text: this.xversion, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 3],
						table: {
							widths: [30, 110, 50, 5],
							body: [
								[{ text: 'AÑO:', bold: true, border: [false, false, false, false] }, { text: this.fano, border: [false, false, false, false] }, { text: 'PASAJEROS:', bold: true, alignment: 'left', border: [false, false, false, false] }, { text: this.ncapacidadpasajerosvehiculo, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'INTERMEDIRARIO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [40, 150, 40, 90, 50, '*'],
							body: [
								[{ text: 'Corredor', alignment: 'left', bold: true, border: [false, false, false, false] }, { text: this.xcorredor, alignment: 'left', border: [false, false, false, false] }, { text: 'Correo', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: this.xcorreocorredor, alignment: 'center', border: [false, false, false, false] }, { text: 'Telefono', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: this.xtelefonocorredor, alignment: 'center', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [500, '*'],
							body: [
								[{ text: 'SUMAS ASEGURADAS', margin: [5, 0, 0, 0], alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }, { text: 'MONEDA: DÓLARES', margin: [-100, 0, 0, 0], alignment: 'left', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [150, 110, 110, 90],
							body: [
								[{ text: 'DETALLE DE COBERTURAS', margin: [5, 0, 0, 0], alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'R.C.V', margin: [22, 0, 0, 0], alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'COBERTURA AMPLIA', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'PÉRDIDA TOTAL', alignment: 'center', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [125, 100, 100, 100],
							body: this.buildCoveragesQuotesBody()
						}
					},
					{
						style: 'data',
						table: {
							widths: [500, '*'],
							body: [
								[{ text: 'FRECUENCIA DE PAGOS', margin: [5, 0, 0, 0], alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }, { text: 'MONEDA: DÓLARES', margin: [-100, 0, 0, 0], alignment: 'left', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: [150, 110, 110, 90],
							body: [
								[{ text: 'FORMA DE PAGO', margin: [5, 0, 0, 0], alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'RCV', margin: [22, 0, 0, 0], alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'COBERTURA AMPLIA', alignment: 'center', bold: true, border: [false, false, false, false] }, { text: 'PÉRDIDA TOTAL', alignment: 'center', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 2],
						table: {
							widths: [125, 100, 100, 100],
							body: this.buildMetodologyQuotesBody()
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'NOTAS', margin: [5, 0, 0, 0], alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						margin: [0, 0, 0, 1],
						table: {
							widths: ['*'],
							body: [
								[{ text: 'La prima de la presente cotización no incluye el impuesto del 3% de IGFT.', alignment: 'center', bold: true, fontSize: 9.5, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: `La presente cotización de seguro se mantendrá en vigencia durante un plazo máximo de quince (15) días continuos contados a partir del ${this.fcotizacion}, lo que ocurra primero, siempre y no se hayan modificado las condiciones del riesgo o no se haya evidenciado reticencia o declaraciones falsas del solicitante. Esta Cotización no implica la aceptación del riesgo por parte de la compañía.`, alignment: 'justify', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: `Forma de Pagos: Cobertura Amplia y Pérdida Total -> Divisas en efectivo - Cuenta custodia en USD`, alignment: 'justify', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'Para las inspecciones debe de solicitarla a la siguiente dirección de correo solicitudinspeccionauto@lamundialdeseguros.com con la siguiente información: Nombre, Apellido, C.I y N° de teléfono del asegurado o de la persona contacto, indicar Marca-Modelo-Placa del vehículo a inspeccionar, Lugar donde se encuentra el vehículo asegurar.', alignment: 'justify', border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{
									text: `DOCUMENTOS PARA LA EMISIÓN DE LA PÓLIZA. 
						Solicitud de Seguros llena en todas sus partes, firmada y con huella dactilar por Asegurado.
						Persona Natural:
						Fotocopia Cédula de Identidad del Asegurado
						Fotocopia Registro de Información Fiscal (Rif), Vigente.
						Persona Jurídicos:
						°	Fotocopia del Acta Constitución y estatus sociales de la empresa con sus correspondientes modificaciones
						°	Fotocopia Registro de Información Fiscal (Rif), Vigente. 
						°	Fotocopia Cédula de Identidad del representante legal.
						°	Declaración Jurada de Origen de los Fondos.
						Adicional:
						°	Copia del documento que demuestre la propiedad o interés asegurable del bien Asegurar
						°	Copia de recibo de servicio público
						°	Referencia bancaria vigente
						°	Copia de la última declaración del impuesto sobre la renta`, alignment: 'justify', border: [false, false, false, false]
								}]
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'Aprobado por la Superintendencia de la Actividad Aseguradora mediante Oficio N° FSAA-1-1-0363-2022 de fecha 05-08-2022.', alignment: 'justify', border: [false, false, false, false] }]
							]
						}
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
						fontSize: 7.5
					},
				}
			}
			let pdf = pdfMake.createPdf(pdfDefinition);
			pdf.download(`Cotización`);
			pdf.open();

			const emailData = {
				to: `${this.xcorreo}`,
				subject: 'Cotización - La Mundial de Seguros',
				text: 'Pruebaaaaaa',
				user: this.xusuario,
				pdfDefinition,
			};
			this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/send-email', emailData)
				.subscribe(response => {
					console.log(response);
					// Puedes manejar la respuesta del servidor aquí
				}, error => {
					console.error(error);
					// Puedes manejar el error aquí
				});
		}
		catch (err) { console.log() }
	}

	async CreatePaymentRequestPDF(paymentRequest: any) {
		this.PaymentRequestPDF(paymentRequest);

	}

	PaymentRequestPDF(paymentRequest: any) {
		console.log('pago pago');
		console.log(paymentRequest, 'info pdf');

		try {

			// Creamos la varabile para el body de los recibos
			const movimientos = [];

			// Insertamos los objetos correspondientes al header
			movimientos.push(
				[
					{ text: 'POLIZA:', bold: true, border: [false, false, false, false] },
					{ text: 'RECIBO:', bold: true, border: [false, false, false, false] },
					{ text: 'TIPO MOV.:', bold: true, border: [false, false, false, false] },
					{ text: 'FECHA MOV.:', bold: true, border: [false, false, false, false] },
					{ text: 'PRIMA BS.:', bold: true, border: [false, false, false, false] },
					{ text: 'PRIMA DIVISAS.:', bold: true, border: [false, false, false, false] },
					{ text: '% COM.:', bold: true, border: [false, false, false, false] },
					{ text: 'COMISIÓN BS.:', bold: true, border: [false, false, false, false] },
					{ text: 'COMISIÓN DIVISAS', bold: true, border: [false, false, false, false] },
					{ text: 'MONEDA\nRECIBO', bold: true, border: [false, false, false, false] },
					{ text: 'TASA BCV:', bold: true, border: [false, false, false, false] },
				]
			);

			paymentRequest.recibos.forEach((recibo: any) => {
				var mmontoapag = recibo.mmontoapag ? recibo.mmontoapag.toFixed(2) : '';
				var mmontoapagext = recibo.mmontoapagext ? recibo.mmontoapagext.toFixed(2) : '';
				var mmovcom = recibo.mmovcom ? recibo.mmovcom.toFixed(2) : '';
				var mmovcomext = recibo.mmovcomext ? recibo.mmovcomext.toFixed(2) : '';

				movimientos.push(
					[
						{ text: recibo.cnpoliza, border: [false, false, false, false] },
						{ text: recibo.cnrecibo, border: [false, false, false, false] },
						{ text: recibo.imovcom, border: [false, false, false, false] },
						{ text: recibo.femision, border: [false, false, false, false] },
						{ text: 'Bs. ' + mmontoapag, border: [false, false, false, false] },
						{ text: '$. ' + mmontoapagext, border: [false, false, false, false] },
						{ text: recibo.pcomision + '%', border: [false, false, false, false] },
						{ text: 'Bs. ' + mmovcom, border: [false, false, false, false] },
						{ text: '$. ' + mmovcomext, border: [false, false, false, false] },
						{ text: recibo.cmoneda, border: [false, false, false, false] },
						{ text: recibo.ptasamon, border: [false, false, false, false] },
					]
				)
			});


			const pdfDefinition: any = {
				// pageSize: 'A5',
				// pageOrientation: 'landscape',

				info: {
					title: `Solicitud de pago N° ${paymentRequest.csolpag}`,
					subject: `Solicitud de pago N° ${paymentRequest.csolpag}`
				},
				footer: function (currentPage: any, pageCount: any) {
					return {
						table: {
							widths: ['*'],
							body: [
								[
									{ text: ' ', fontSize: 6, alignment: 'center', border: [false, true, false, false], margin: [50, 0, 50, 0] }
								],
								[
									{ text: 'Telefono: +582122839619 | email: info@lamundialdeseguros.com | web: https://lamundialdeseguros.com/', fontSize: 7, alignment: 'center', border: [false, false, false, false] }
								],
								[
									{ text: 'Página ' + currentPage.toString() + ' de ' + pageCount, fontSize: 7, alignment: 'center', border: [false, false, false, false] }
								],
							]
						}
					}
				},
				content: [
					{
						style: 'data',
						table: {
							widths: [220, 230, '*'],
							body: [
								[
									{
										image: 'data:image/png;base64,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'
										, width: 90, border: [false, false, false, false]
									},
									{ text: `\n\nInscrita en la Superintendencia de la Actividad Aseguradora bajo el No.\nCapital Suscrito Bs.\nCapital Pagado Bs.`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false] },
									{ text: `\n\n73\n7.000.000\n7.000.000`, fontSize: 7, alignment: 'right', bold: true, border: [false, false, false, false] },
								]
							]
						}
					},
					{
						alignment: 'center',
						style: 'title',
						margin: [0, 0, 0, 15],
						text: [
							{ text: '\n Solicitud de Pago N° ' + paymentRequest.csolpag, bold: true }
						]
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'ORDEN DE PAGO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'mini',
						margin: [0, 0, 0, 3],
						table: {
							widths: [75, 300, '*', '*'],
							body: [
								[
									{ text: `TRANSACCIÓN:`, bold: true, border: [false, false, false, false] },
									{ text: paymentRequest.xtransaccion, border: [false, false, false, false] },
									{ text: 'FECHA ORDEN:', bold: true, border: [false, false, false, false], alignment: 'right' },
									{ text: paymentRequest.fsolicit, border: [false, false, false, false], alignment: 'right' }
								],
								[
									{ text: 'CONCEPTO:', bold: true, border: [false, false, false, false] },
									{ text: paymentRequest.xconcepto, border: [false, false, false, false] },
									{ text: 'ESTATUS:', bold: true, border: [false, false, false, false], alignment: 'right' },
									{ text: paymentRequest.xstatsol, border: [false, false, false, false], alignment: 'right' },
								],
								[
									{ text: `PÁGUESE A LA ORDEN DE:`, bold: true, border: [false, false, false, false] },
									{ text: paymentRequest.cid_ben + ' - ' + paymentRequest.xbeneficiario, border: [false, false, false, false], alignment: 'left' },
									{ text: ``, bold: true, border: [false, false, false, false] },
									{ text: ``, bold: true, border: [false, false, false, false] },
								],
								[
									{ text: 'CORREDOR:', bold: true, border: [false, false, false, false] },
									{ text: paymentRequest.cproductor + ' - ' + paymentRequest.xbeneficiario, border: [false, false, false, false], alignment: 'left' },
									{ text: ``, bold: true, border: [false, false, false, false] },
									{ text: ``, bold: true, border: [false, false, false, false], alignment: 'right' },
								],
								[
									{ text: 'OBSERVACIONES:', bold: true, border: [false, false, false, false] },
									{ text: paymentRequest.xobservaciones, border: [false, false, false, false], alignment: 'left' },
									{ text: '', bold: true, border: [false, false, false, false], alignment: 'right' },
									{ text: '', border: [false, false, false, false], alignment: 'right' },
								],
								// [
								// 	{ text: `MONEDA DE PAGO`, bold: true, border: [false, false, false, false], alignment: 'left'  },
								// 	{ text: `${paymentRequest.xmoneda} (${paymentRequest.cmoneda})`, border: [false, false, false, false], alignment: 'left'  },
								// 	{ text: '', bold: true, border: [false, false, false, false], alignment: 'right' },
								// 	{ text: '', border: [false, false, false, false], alignment: 'right' },
								// ],
								// [
								// 	{ text: 'MONTO MOVIMIENTO:', bold: true, border: [false, false, false, false] },
								// 	{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mmovimiento}`, border: [false, false, false, false], alignment: 'left' },
								// 	{ text: '', bold: true, border: [false, false, false, false], alignment: 'right' },
								// 	{ text: '', border: [false, false, false, false], alignment: 'right' },
								// ],
								// [
								// 	{ text: `% RETENCIÓN: `, bold: true, border: [false, false, false, false] },
								// 	{ text: '% '+ paymentRequest.pislr, border: [false, false, false, false], alignment: 'left' },
								// 	{ text: ``, bold: true, border: [false, false, false, false], alignment: 'right' },
								// 	{ text: '', border: [false, false, false, false], alignment: 'right' },
								// ],
								// [
								// 	{ text: `MONTO RETENCIÓN: `, bold: true, border: [false, false, false, false] },
								// 	{ text: `${paymentRequest.cmoneda}. ${paymentRequest.islr}`, border: [false, false, false, false], alignment: 'left' },
								// 	{ text: ``, bold: true, border: [false, false, false, false], alignment: 'right' },
								// 	{ text: '', border: [false, false, false, false], alignment: 'right' },
								// ],
								// [
								// 	{ text: `MONTO A PAGAR: `, bold: true, border: [false, false, false, false], alignment: 'left' },
								// 	{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mmontototal}`, border: [false, false, false, false], alignment: 'left' },
								// 	{ text: ``, bold: true, border: [false, false, false, false], alignment: 'left' },
								// 	{ text: '', border: [false, false, false, false], alignment: 'left' },
								// ],
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DETALLE DE PAGO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'mini',
						margin: [0, 0, 0, 3],
						table: {
							widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
							body: [
								[
									{ text: 'MONEDA DE PAGO', bold: true, border: [false, false, false, false] },
									{ text: 'TOTAL COMISIONES', bold: true, border: [false, false, false, false] },
									{ text: 'TOTAL BONIFICACIONES', bold: true, border: [false, false, false, false] },
									{ text: 'MONTO MOVIMIENTO', bold: true, border: [false, false, false, false] },
									{ text: '% RETENCIÓN', bold: true, border: [false, false, false, false] },
									{ text: 'MONTO RETENCIÓN', bold: true, border: [false, false, false, false] },
									{ text: 'SUSTRAENDO', bold: true, border: [false, false, false, false] },
									{ text: 'DIFERENCIA CAMBIARIA', bold: true, border: [false, false, false, false] },
									{ text: 'MONTO NETO A PAGAR', bold: true, border: [false, false, false, false] },

								],
								[
									{ text: `${paymentRequest.xmoneda} (${paymentRequest.cmoneda})`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mtotalco}`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mtotalbo}`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mmovimiento}`, border: [false, false, false, false], alignment: 'left' },
									{ text: paymentRequest.pislr + ' %', border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.islr}`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.msustraendo}`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mmonto_3}`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mmontototal}`, border: [false, false, false, false], alignment: 'left' },
								],
							]
						}
					},
					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'DISTRIBUCIÓN DE PAGO', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'mini',
						margin: [0, 0, 0, 3],
						table: {
							widths: ['*', '*'],
							body: [
								[
									{ text: 'PRIMER MOVIMIENTO', bold: true, border: [false, false, false, false] },
									{ text: 'SEGUNDO MOVIMIENTO', bold: true, border: [false, false, false, false] },
								],
								[
									{ text: `${paymentRequest.cmoneda_1} ${paymentRequest.mmonto_1}`, border: [false, false, false, false], alignment: 'left' },
									{ text: `${paymentRequest.cmoneda_2}. ${paymentRequest.mmonto_2}`, border: [false, false, false, false], alignment: 'left' },
								],
							]
						}
					}

					,

					{
						style: 'data',
						table: {
							widths: ['*'],
							body: [
								[{ text: 'MOVIMIENTOS', alignment: 'center', fillColor: '#D7D7D7', bold: true, border: [false, false, false, false] }]
							]
						}
					},
					{
						style: 'mini',
						margin: [0, 0, 0, 3],
						table: {
							headerRows: 1,
							widths: [37, '*', 20, 35, '*', '*', 25, '*', 30, 25, 22],
							body: movimientos
						}
					},
					// {
					// 	style: 'data',
					// 	table: {
					// 		widths: ['*'],
					// 		body: [
					// 			[{ text: '', alignment: 'center', bold: true, border: [false, true, false, false] }]
					// 		]
					// 	}
					// },
					// {
					// 	style: 'mini',
					// 	table: {
					// 		widths: ['*', '*'],
					// 		body: [
					// 			[
					// 				{ text: 'TOTAL BONIFICACIONES DE COBRANZA', border: [false, false, false, false] },
					// 				{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mtotalbo}`, border: [false, false, false, false], alignment: 'right' },
					// 			],
					// 			[
					// 				{ text: 'TOTAL COMISIONES GENERADAS:', border: [false, false, false, false] },
					// 				{ text: `${paymentRequest.cmoneda}. ${paymentRequest.mtotalco}`, border: [false, false, false, false], alignment: 'right' },
					// 			],
					// 		]
					// 	}
					// },

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
						fontSize: 7.5
					},
					mini: {
						fontSize: 6
					}

				}

			}
			let pdf = pdfMake.createPdf(pdfDefinition);
			// pdf.download(`Cotización`);
			pdf.open();

			// const emailData = {
			// 	to: `${this.xcorreo}`,
			// 	subject: 'Cotización - La Mundial de Seguros',
			// 	text: 'Pruebaaaaaa',
			// 	user: this.xusuario,
			// 	pdfDefinition,
			// };
			// this.http.post(environment.apiUrl + '/api/v1/quotes/automobile/send-email', emailData)
			// 	.subscribe(response => {
			// 		console.log(response);
			// 		// Puedes manejar la respuesta del servidor aquí
			// 	}, error => {
			// 		console.error(error);
			// 		// Puedes manejar el error aquí
			// 	});
		}
		catch (err) { console.log(err) }

	}



}