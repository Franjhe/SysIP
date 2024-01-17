import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DataSharingService } from './../../_services/data-sharing.service';

import { navItems } from './_nav';

interface MenuItem {
  name?: any;
  url: any;
  iconComponent: { name: any };
  children: { name: any; url: any }[];
}

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

      this.http
      .post(environment.apiUrl + '/api/v1/menu/get-menu', params)
      .subscribe((response: any) => {
        this.listmenus = response.data.menuPrincipal;
        const menuPrincipal = response.data.menuPrincipal;
        this.navItems = [];

        for (let i = 0; i < menuPrincipal.length; i++) {
          const menuItem: MenuItem = {
            url: menuPrincipal[i].xrutaprincipal,
            iconComponent: { name: menuPrincipal[i].xicono },
            children: [],
          };

          if ('xmenuprincipal' in menuPrincipal[i]) {
            menuItem.name = menuPrincipal[i].xmenuprincipal;
          }

          for (let j = 0; j < menuPrincipal[i].children.length; j++) {
            menuItem.children.push({
              name: menuPrincipal[i].children[j].xmenu,
              url: menuPrincipal[i].children[j].xrutamenu,
            });
          }

          this.navItems.push(menuItem);
        }
      });
      
    } else {
      console.log('No hay usuario autenticado');
    }
  }

pn(){
  
}

  onNavItemSelect(event: any) {
    const urlString = event.toString();
    const startIndex = urlString.indexOf('/#');
    const shortPath = urlString.substring(startIndex);
  
    for (let i = 0; i < this.listmenus.length; i++) {
      for (let j = 0; j < this.listmenus[i].children.length; j++) {
        const menuPath = '/#' + this.listmenus[i].children[j].xrutamenu;
  
        if (shortPath.includes(menuPath)) {
          this.listshare = [
            {
              xrutamenu: this.listmenus[i].children[j].xrutamenu,
              xsubmenu: this.listmenus[i].children[j].xsubmenu,
              xrutasubmenu: this.listmenus[i].children[j].xrutasubmenu,
            },
          ];
        }
      }
    }
  
    const info = {
      list: this.listshare,
    };
  
    this.dataSharingService.updateData(info);
  }

  onContainerClick(event: MouseEvent) {
    let evento = '/' +event.view?.window.location.hash
    this.onNavItemSelect(evento)
  }

}