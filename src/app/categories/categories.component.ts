import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Category } from './category.dto';
import { CategoriesItem } from './datastore';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from './form/form.component';
import { LoadingBarComponent } from '../loading-bar.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-categories',
  standalone: true,
  templateUrl: './categories.component.html',
  styles: `
    .full-width-table { width: 100%; }
    ttr:nth-child(odd) {background-color: #f2f2f2;}
    
  `,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CategoryFormComponent,
    LoadingBarComponent, 
  ],
})
export class CategoriesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;

  dataSource = new MatTableDataSource<Category>();

  showLoading: Boolean = false;
  category!: Category;
  showForm: Boolean = false;
  nameButton: string = 'Incluir Nova Categoria';
  row: Category;

  onNewCategoryClick() {
    if (this.showForm) {
      this.showForm = false;
      this.nameButton = 'Incluir Nova Categoria';
    } else {
      this.showForm = true;
      this.category = {id: 0, name: '', description: ''}
      this.nameButton = 'Fechar Nova Categoria';
    }
  }

  private categoryService = inject(CategoryService);

  displayedColumns = ['id', 'name', 'description', 'action'];

  ngAfterViewInit(): void {
    this.loadCategories();
  }

  async loadCategories(): Promise<void> {
    //this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    //this.showLoading = false;
  }

  async onSave(category: Category) {
    const saved = lastValueFrom(this.categoryService.save(category));
    this.loadCategories();
  }

  onEditCategoryClick(category: Category) {
    this.category = category;
    this.showForm = true;
  }

  async onDeleteCategoryClick(category: Category) {
    if (confirm(`Confirma a exclusão deste item -> ${category.id} - ${category.name}?`)) {
      this.showLoading = true;
      await lastValueFrom(this.categoryService.delete(category.id));
      this.showLoading = false;
      this.loadCategories();
    }
  }
}
