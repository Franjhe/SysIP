import { Component, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  currentUser!: any
  token!: any;
  tokenphp!: any;
  cusuario!: string;
  ccorredor!: any;
  xcorredor!: any;

  constructor(
              private router: Router, 
              private http: HttpClient,
              private dataSharingService: DataSharingService,
              private route: ActivatedRoute,
            ) {

    this.route.queryParams.subscribe(params => {
      this.cusuario = params['cusuario'];
      this.tokenphp = params['token'];
      this.ccorredor = params['ccorredor'];
      this.xcorredor = params['xcorredor'];
    });

    if (this.cusuario) {
      let token = {
        status: true,
        message: "Usuario Autenticado",
        data: {
          bconsultar: false,
          bcrear: true,
          beliminar: false,
          bmodificar: false,
          ccorredor: parseInt(this.ccorredor),
          cdepartamento: 4,
          crol: 6,
          cusuario: parseInt(this.cusuario),
          token: this.tokenphp,
          xcorredor: this.xcorredor
        }
      }
      let tokenString = JSON.stringify(token);

      this.currentUser = JSON.parse(tokenString);
    }else{
      this.token = localStorage.getItem('user');
      this.currentUser = JSON.parse(this.token);
    }

      
    if (this.currentUser) {

      let params = {
        cusuario: this.currentUser.data.cusuario,
        crol: this.currentUser.data.crol,
        cdepartamento: this.currentUser.data.cdepartamento,
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