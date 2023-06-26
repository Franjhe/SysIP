import { Component } from '@angular/core';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent {
  
  colors = [
    { color: 'info', textColor: 'info' },

  ];

  imgContext = { $implicit: 'top', bottom: 'bottom' };


}
