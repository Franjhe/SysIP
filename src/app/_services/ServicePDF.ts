import { Component, ViewChild, TemplateRef,  OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient,   } from '@angular/common/http';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as  pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
//import axios from 'axios';
import { Buffer } from 'buffer';


@Injectable({
  providedIn: 'root'
})

export class PdfGenerationService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

    certifiquedPDF(){
      
      var dd = {
        content: [
            
          {
            style: 'tableExample',
            table: {
              widths: [345, 150],
              body: [
                ['Tomador',  'Cédula de Identidad / R.I.F.'],
                ['Asegurado',  'Cédula de Identidad / R.I.F.']
              ]
            }
          },
          
          {text:'direccion del tomador '},
          
          {
            style: 'tableExample',
            table: {
              widths: [100, '*', 200, '*', 20],
              body: [
                ['Estado', 'Ciudad', 'Zona Postal', 'Teléfonos', 'Fax'],
                [
                    'fixed-width ', 
                    {text: 'nothing ', italics: true, color: 'gray'}, 
                    {text: 'nothing ', italics: true, color: 'gray'}, 
                    {text: 'nothing ', italics: true, color: 'gray'},
                    {text: 'nothing ', italics: true, color: 'gray'}
                 ]
              ]
            }
          },
          
            {text:'direccion del Asegurado '},
          
          {
            style: 'tableExample',
            table: {
              widths: [100, '*', 200, '*', 20],
              body: [
                ['Estado', 'Ciudad', 'Zona Postal', 'Teléfonos', 'Fax'],
                [
                    'fixed-width ', 
                    {text: 'nothing ', italics: true, color: 'gray'}, 
                    {text: 'nothing ', italics: true, color: 'gray'}, 
                    {text: 'nothing ', italics: true, color: 'gray'},
                    {text: 'nothing ', italics: true, color: 'gray'}
                 ]
              ]
            }
          },
          
          
          {text:'Datos de la Póliza'},
          
          {
            style: 'tableExample',
            table: {
              widths: [250, 90, 150],
              body: [
                ['Fecha de Suscripción', 'Vigencia', 'Moneda',],
                [
                    {text: 'Sucursal / Oficina ', italics: true, color: 'gray'}, 
                    {text: 'Canal de Venta ', italics: true, color: 'gray'}, 
                    {text: 'Frecuencia de Pago ', italics: true, color: 'gray'},
                 ],
                [
                    {text: 'Intermediario(s):', italics: true, color: 'gray'}, 
                    {text: '', italics: true, color: 'gray'}, 
                    {text: 'Participación', italics: true, color: 'gray'},
                 ]
              ]
            }
          },
          
          
          {text:'Asegurados Inscritos'},
          
          {
            style: 'tableExample',
            table: {
              widths: [250, 90, 150,20],
              body: [
                ['Apellido', '', 'Nombre',''],
                [
                    {text: 'Cédula Identidad ', italics: true, color: 'gray'}, 
                    {text: '', italics: true, color: 'gray'}, 
                    {text: 'Fecha Nacimiento', italics: true, color: 'gray'},
                    {text: '', italics: true, color: 'gray'},
                 ],
                [
                    {text: 'Parentesco', italics: true, color: 'gray'}, 
                    {text: '', italics: true, color: 'gray'}, 
                    {text: 'Sexo', italics: true, color: 'gray'},
                    {text: '', italics: true, color: 'gray'},
                 ],
                 [
                    {text: 'Cantidad de Servicios APS', italics: true, color: 'gray'}, 
                    {text: '', italics: true, color: 'gray'}, 
                    {text: 'Exoneración de plazos de Espera', italics: true, color: 'gray'},
                    {text: '', italics: true, color: 'gray'},
                 ]
              ]
            }
          },
          
        ]
        
      }
    }
}