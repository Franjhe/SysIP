import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = navItems;

  constructor( private router: Router,
               private http: HttpClient) {}


  ngOnInit() {
    console.log('hola')
    this.getMenus();
  }

  getMenus() {
    let params;
    this.http.post(environment.apiUrl + '/api/v1/menu/get-menu', params).subscribe((response: any) => {
      const menuPrincipal = response.data.menuPrincipal;
      const menu = response.data.menu;
  
      if (Array.isArray(menuPrincipal) && Array.isArray(menu)) {
        this.navItems = menuPrincipal.map((item: any, index: number) => ({
          name: item.xmenu,
          url: item.xruta,
          iconComponent: { name: item.xicono },
          children: menu[index]?.map((childItem: any) => ({
            name: childItem.xmenu,
            url: childItem.xruta,
          })) || [],
        }));
      }
    });  
  }
}
