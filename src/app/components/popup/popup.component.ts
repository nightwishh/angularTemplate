import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor() { }
  scaleClass:string = "";
  blurClass:string = "";
  @Input() fullScreen:boolean = false;
  @Input() header:boolean = true;
  @Input() setStyle:string = "";
  @Input() closeOnModalClick:boolean = true;
  @Input() draggable:boolean = false;
  _isvisible:boolean = false;
  @Input() 
  set visible(value:boolean) {
    this._isvisible = value;
    if (value) {
      document.body.classList.add("overflowHidden");
      setTimeout(() => {
        this.scaleClass = "scaleIn";        
      }, 1);

      setTimeout(() => {
        this.blurClass = "blur";
      }, 1);

    }
    else {
      document.body.classList.remove("overflowHidden");
    }
  };
  get visible():boolean {
    return this._isvisible;
  }
  @Output() visibleChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onHide:EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    var html = document.getElementById("darkbg");
    document.body.prepend(html);
  }
  ngAfterViewInit() {

  }
  onModalClick() {
    if (this.closeOnModalClick)
    this.hidePopup();
  }
  hidePopup() {
    this.scaleClass = "";
    this.blurClass = "";
    this.onHide.emit();

    setTimeout(() => {
      this.visible = false;
      this.visibleChange.emit(this.visible);
    }, 250);
  }
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.hidePopup();
  }

  // addBlur() {
  //   var html = document.getElementById("darkbg");
  //   document.body.appendChild(html);
  //   document.body.getElementsByTagName("app-root")[0].classList.add("blurParent");
  // }
  // removeBlur() {
  //   document.body.getElementsByTagName("app-root")[0].classList.remove("blurParent");
  // }

}
@Component({
  selector: 'p-header',
  template: '<ng-content></ng-content>',
  styleUrls: ['./popup.component.css']
})
export class PopupHeaderComponent implements OnInit {

  constructor(private popup:PopupComponent) {

   }
   ngOnInit() {

   }
}
@Component({
  selector: 'p-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./popup.component.css']
})
export class PopupContentComponent implements OnInit {

  constructor(private popup:PopupComponent) {

   }
   ngOnInit() {

   }
}