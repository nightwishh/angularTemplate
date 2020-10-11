import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  constructor() { }
  @Input() setStyle:string;
  @Input() setClass:string;
  @Input() placeholder:string = "";
  ngOnInit(): void {
  }

}
