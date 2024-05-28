import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { Category } from './category.dto';
import { CategoriesItem } from './datastore';
import { CategoryService } from './category.service';
import { lastValueFrom } from 'rxjs';
import { CategoryFormComponent } from "./form/form.component";
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {LoadingBarComponent} from '../loading-bar.component'

@Component({
    selector: 'app-categories',
    standalone: true,
    templateUrl: './categories.component.html',
    styles: `.full-width-table { width: 100%; }
           tr:nth-child(odd) {background-color: #f2f2f2;}`,
    imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCardModule,
        CategoryFormComponent,
        MatButton,
        MatIconModule,
        LoadingBarComponent
    ]
})
export class CategoriesComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoriesItem>;

  dataSource = new MatTableDataSource<Category>();

  showLoading: Boolean = false
  category!: Category
  showForm: Boolean = false;
  nameButton: string = 'New Category'
  row: Category;

  onNewCategoryClick(){
    if (this.showForm) {
      this.showForm = false;
      this.nameButton = 'Open New Category'  
    } else {
      this.showForm = true;
      //this.catecogory = {id: 0, name: '', description: ''}
      this.nameButton = 'Close New Category'  
    }
  }

  private categoryService = inject(CategoryService);

  displayedColumns = ['id', 'name', 'description', 'action'];

  ngAfterViewInit(): void {
    this.loadCategories(); 
  }

  async loadCategories(): Promise<void> {
    this.showLoading = true;
    const categories = await lastValueFrom(this.categoryService.getAll());
    this.dataSource = new MatTableDataSource(categories);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.showLoading = false;
  }

  async onSave(category: Category) {
    const saved = lastValueFrom(this.categoryService.save(category))
    this.loadCategories();
  }

  onEditCategoryClick(category: Category) {
    console.log('edit category', category)
  }

  async onDeleteCategoryClick(category: Category) {
    if (confirm(`Delete "${category.name}" with id #${category.id} ?`)) {
      this.showLoading = true;
      await lastValueFrom(this.categoryService.delete(category.id));
      this.showLoading = false;
      this.loadCategories();
    }
  }
}
