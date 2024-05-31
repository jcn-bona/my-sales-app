import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

interface MenuItem {
  /**
  * The path that will be loaded when you click on the menu
  */
  path: string;
  label: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, RouterModule],
  template: `
    @for (item of menuItems; track item.path) {
          <a mat-list-item [routerLink]="item.path">{{item.label}}</a>
    }
  `,
  styles: ``
})
export class MenuComponent {

  menuItems: Array<MenuItem> = [
    {path: '/', label: 'Home'},
    {path: '/categorias', label: 'Categorias'},
    {path: '/fornecedores', label: 'Fornecedores'}
  ]

}
