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

  constructor(private router: Router, private http: HttpClient) {
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
        const menuPrincipal = response.data.menuPrincipal;
        if (Array.isArray(menuPrincipal) && menuPrincipal.length > 0) {
          const distinctMenuPrincipal = [...new Set(menuPrincipal.map(item => item.xmenuprincipal))];
          this.navItems = distinctMenuPrincipal.map(menu => {
            const firstItem = menuPrincipal.find(item => item.xmenuprincipal === menu);
            return {
              name: firstItem.xmenuprincipal,
              url: firstItem.xrutaprincipal,
              iconComponent: { name: firstItem.xicono },
              children: menuPrincipal
                .filter(item => item.xmenuprincipal === menu)
                .map(childItem => ({
                  name: childItem.xmenu,
                  url: childItem.xrutamenu,
                })),
            };
          });
        }
      });
    } else {
      console.log('No hay usuario autenticado');
    }
  }
}