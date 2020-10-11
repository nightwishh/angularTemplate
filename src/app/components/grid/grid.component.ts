import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { element } from 'protractor';
import { Grid, GridService, FilterParam, DataType } from 'src/app/services/grid.service';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CommonFunctions } from 'src/app/common/common-functions';
import { Data } from '@angular/router';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, AfterViewInit {
  // @Input() data:any[] = [];
  @Input() data:Observable<any[]>;
  @Input() webMethod:string = "";
  @Input() view:string = "";
  @Input() pageSize:number = 10;
  @Input() setStyle:object;
  @Input() setClass:string;
  @Output() onRowClick:EventEmitter<any> = new EventEmitter<any>();

  datasource = new MatTableDataSource();
  // displayedColumns = ['name','name', 'email', 'phone', 'bxEmail'];
  columns:GridColumn[] = []
  showLoader:boolean = false;
  displayedColumns = this.columns.map(x=>x.fieldName);
  
  constructor(private gridService:GridService) { 
    this.columns = [];

    // var grdCol = new GridColumn();
    // grdCol.fieldName = "nam";
    // grdCol.header = "სახელი";
    // var grdCol1 = new GridColumn();
    // grdCol1.fieldName = "a";
    // grdCol1.header = "სახელი";
    // this.columns.push(grdCol);
    // this.columns.push(grdCol1);
  }
  getDisplayedColumns() {
    this.displayedColumns = this.columns.map(x=>x.fieldName);
    return this.displayedColumns;
  }

  ngOnInit(): void {
    //this.getData();
    //this.dataObs = Observable.create(this.data);
  }
  @ViewChild("paginator",{static:false}) paginator:MatPaginator;
  ngAfterViewInit() {
    if (this.webMethod.trim().length == 0 && this.data == null) console.error("Please provide Data:Observable<any[]> or Webmethod:string");
    this.getData();
  }
  applyFilter(filterID:string,filterValue:string) {
    var gridFilter = new FilterParam();
    gridFilter.FieldName = filterID;
    gridFilter.FilterValue = filterValue;
    gridFilter.FilterType = 1;
    this.gridService.applyFilter(gridFilter);
  }
  keyUpTimer(filterID:string, filterValue:string) {
    new CommonFunctions().timeoutAfterKeyPress(500,() => {
      this.applyFilter(filterID,filterValue);
      this.getData();
    })
  }
  onRowClickEvent(row) {
    this.onRowClick.emit(row);
  }
  onPage(event:PageEvent) {
    this.pageSize = event.pageSize;
    this.gridService.changePage(event.pageIndex + 1);
    this.getData();
  }
  
  public getData() {
    setTimeout(() => {
      this.showLoader = true;      
    }, 1);
    if (this.data) {
      setTimeout(() => {
        this.data.toPromise().then(x => {
          console.log(x);
          this.showLoader = false;
          if (x["rootElement"] == null) {
            this.datasource.data = x;
            this.paginator = this.datasource.paginator;
            return;
          }
          this.datasource.data = x["rootElement"]["DATA"]["Rows"];
          this.paginator.length = x["rootElement"]["DATA"]["Count"];
        }).catch(err => {
          window.alert(err);
        }).finally(() => {
          this.showLoader = false;
        })
      }, 1); 
    }
    else if (this.webMethod.trim().length > 0 ) {
      this.gridService.setMaximumRows(this.pageSize);
      // this.gridService.changePage(this.page);
      this.gridService.webMethod = this.webMethod;
      this.gridService.grid.view = this.view;
      this.gridService.GetData<Object>().toPromise().then(x=> {
        this.showLoader = false;
        
        if (x["rootElement"] == null) {
          this.datasource.data = x;
          this.paginator = this.datasource.paginator;
          return;
        }
        this.datasource.data = x["rootElement"]["DATA"]["Rows"];
        this.paginator.length = x["rootElement"]["DATA"]["Count"];
      }).catch(err => {
        window.alert(err.error.STATUS.TEXT);
      }).finally(()=> {
        this.showLoader = false;
      })
      //this.getData();
    }
  }

}
export class GridColumn {
  public header:string;
  public fieldName:string;
  public filter:boolean = false;
  public cell = (element: any) => `${element[this.fieldName]}`;
}
@Component({
  selector: 'column',
  template:`<ng-content></ng-content>`
})
export class ColumnComponent implements OnInit {
  @Input() fieldName:string;
  @Input() header:string;
  @Input() dataType:DataType = DataType.String;
  @Input() filter:boolean = true;

  constructor(private grid:GridComponent) {

  }
  ngOnInit() {
    var grdCol:GridColumn = new GridColumn();
    grdCol.fieldName = this.fieldName;
    grdCol.header = this.header;
    grdCol.filter = this.filter;
    this.grid.columns.push(grdCol);
  };
}