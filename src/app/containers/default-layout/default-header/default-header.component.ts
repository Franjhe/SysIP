import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataSharingService } from './../../../_services/data-sharing.service';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthenticationService } from '../../../../app/_services';
import { Subscription } from 'rxjs';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  menuData : any = [];
  private subscription!: Subscription;

  @Input() sidebarId: string = "sidebar";

  public location!: Location;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private dataSharingService: DataSharingService,
    private classToggler: ClassToggleService,
    private authenticationService: AuthenticationService
    ) {
    super();

 
    // this.subscription = this.dataSharingService.data$.subscribe(menu => {

    //   // this.menuData = []
    //   // for(let i = 0; i < menu.list.length; i++){
    
    //   //       this.menuData.push({
    //   //         xsubmenu: menu.list[i].xsubmenu,
    //   //         xrutasubmenu: '#/' +menu.list[i].xrutasubmenu
    //   //     })
  
    //   // }

    // });

   
  }

  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
