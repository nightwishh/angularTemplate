import { Injectable } from '@angular/core';
import { CommonService } from '../common/common.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private commonService:CommonService, private http:HttpClient) {

  }
  grid:Grid = new Grid();
  private _webMethod:string = "";
  get webMethod():string {
    return this._webMethod;
  }
  set webMethod(value:string) {
    this._webMethod = this.commonService.baseUrl + value;
  };
  GetData<T>(): Observable<T[]> {
    var httpOptions = this.commonService.getHttpOptions();
    var gridJson = this.grid;
    return this.http.post<T[]>(this.webMethod,gridJson,httpOptions);
  }
  onPaging(event) {
    console.log(event);
  }
  applyFilter(filter:FilterParam) {
    var index = this.grid.FilterParams.findIndex(x=>x.FieldName==filter.FieldName);
    if (index > -1) this.grid.FilterParams.splice(index,1);

    if (filter.FilterValue.trim().length == 0) return;
    
    this.grid.FilterParams.push(filter);
  }
  setMaximumRows(max:number) {
    this.grid.MaximumRows = max;
  }
  changePage(page:number) {
    this.grid.Page = page;
  }
}
export class Grid {
  public MaximumRows:number = 10;
  public Page:number = 1;
  public FilterParams:FilterParam[] = [];
  public view:string = "";
  constructor() {}
  public GetData() {
    
  }
}
export class FilterParam {
  public FieldName:string;
  public FilterValue:string;
  public DataType:DataType;
  public FilterType:FilterType;
}
export enum FilterType { 
  Equal,
  Contains,
  Greater,
  GreaterOrEq,
  Less,
  LessOrEq,
  NotEqual
  }    
  export enum DataType {
  String,
  Number,
  Date
  }
