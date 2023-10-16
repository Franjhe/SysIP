import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DataSharingService } from './../../_services/data-sharing.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  listmenus : any = []
  listshare : any = []

  constructor(
    private router: Router, private http: HttpClient,
    private dataSharingService: DataSharingService
    ) {
    const isLoggedIn = localStorage.getItem('user');
    if (isLoggedIn) {
      const userObject = JSON.parse(isLoggedIn);

      let params = {
        cusuario: userObject.data.cusuario,
        crol: userObject.data.crol,
        cdepartamento: userObject.data.cdepartamento,
      };

      // this.http
      // .post(environment.apiUrl + '/api/v1/menu/get-menu', params)
      // .subscribe((response: any) => {
      //   this.listmenus = response.data.menuPrincipal
      //   const menuPrincipal = response.data.menuPrincipal;
      //   if (Array.isArray(menuPrincipal) && menuPrincipal.length > 0) {
      //     const distinctMenuPrincipal = [...new Set(menuPrincipal.map(item => item.xmenuprincipal))];
      //     this.navItems = distinctMenuPrincipal.map(menu => {
      //       const firstItem = menuPrincipal.find(item => item.xmenuprincipal === menu);
      //       return {
      //         name: firstItem.xmenuprincipal,
      //         url: firstItem.xrutaprincipal,
      //         iconComponent: { name: firstItem.xicono },
      //         children: menuPrincipal
      //           .filter(item => item.xmenuprincipal === menu)
      //           .map(childItem => ({
      //             name: childItem.xmenu,
      //             url: childItem.xrutamenu,
      //           })),
      //       };
      //     });
      //   }
      // });

      this.http
      .post(environment.apiUrl + '/api/v1/menu/get-menu', params)
      .subscribe((response: any) => {
        this.listmenus = response.data.menuPrincipal
        const menuPrincipal = response.data.menuPrincipal;
        if (Array.isArray(menuPrincipal) && menuPrincipal.length > 0) {
          // Obtener los valores únicos de cmenu
          const distinctCmenuValues = [...new Set(menuPrincipal.map(item => item.cmenu))];
    
          // Crear navItems basados en los elementos distintos de cmenu
          this.navItems = distinctCmenuValues.map(cmenu => {
            const filteredItems = menuPrincipal.filter(item => item.cmenu === cmenu);
            const firstItem = filteredItems[0]; // Tomar el primer elemento, ya que todos tienen el mismo cmenu
            return {
              name: filteredItems[0].xmenuprincipal,
              url: filteredItems[0].xrutaprincipal,
              iconComponent: { name: firstItem.xicono },
              children: [{
                name: firstItem.xmenu,
                url: firstItem.xrutamenu,
              }],
            };
          });
        }
      });

    } else {
      console.log('No hay usuario autenticado');
    }
  }



  onNavItemSelect(event: any) {

    const urlString = event.toString();

    const startIndex = urlString.indexOf('/#'); // Encuentra la posición de '/#'

    const shortPath = urlString.substring(startIndex);

    for(let i = 0; i < this.listmenus.length; i++){

        if(shortPath === ('/#' + this.listmenus[i].xrutamenu)){
    
            this.listshare = [{
              xrutamenu: this.listmenus[i].xrutamenu,
              xsubmenu: this.listmenus[i].xsubmenu,
              xrutasubmenu: this.listmenus[i].xrutasubmenu
          }]
        

        }

    }

    const info = {
     list:this.listshare
    }

    this.dataSharingService.updateData(info);

  }

}