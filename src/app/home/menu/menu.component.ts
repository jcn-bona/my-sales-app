import { Component } from '@angular/core';
import { MatList, MatListModule } from '@angular/material/list';

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
  imports: [MatListModule],
  template: `
    @for (item of menuItems; track item.path) {
          <a mat-list-item [href]="item.path">{{item.label}}</a>
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
