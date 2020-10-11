import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnComponent, GridColumn, GridComponent } from './grid.component';
import { LoaderComponent } from '../loader/loader.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    // GridComponent,
    // ColumnComponent,
    // MatTableModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatInputModule,
    // MatSortModule
  ],
  imports: [
    CommonModule
  ],
  exports: [
    // GridComponent,
    // ColumnComponent
  ]
})
export class GridModule { }
