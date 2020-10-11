import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }
 
  @Input() selected:boolean = false;

  @Output() click:EventEmitter<any> = new EventEmitter<any>();
  @Input() innerClass;
  ngOnInit(): void {
  }

  clickEvent() {
    this.click.emit();
  }
 
  @Input() contextMenuItems:contextMenuItem[] = [];
  
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;

  @ViewChild("card") card:ElementRef;

  contextMenuPosition = { x: '0px', y: '0px' };

  onContextMenu(event: MouseEvent, card:HTMLElement = null) {
    if (card == null) card = this.card.nativeElement;

    if (this.contextMenuItems.length > 0) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { 'item': card.parentElement };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
    }
  }

  onContextMenuAction(item: contextMenuItem) {
    item.click(this.contextMenu.menuData["item"] as HTMLElement);
  }
  ContextMenuDisabled(item: contextMenuItem) {
    if (item.disableFunction == null) return false;
    
    var isDisabled = item.disableFunction(this.contextMenu.menuData["item"] as HTMLElement);
    return isDisabled;
  }
}
@Component({
  selector: 'card-header',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.css']
})
export class CardHeaderComponent implements OnInit {

  constructor(private card:CardComponent) {

   }
   ngOnInit() {

   }
}
@Component({
  selector: 'card-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./card.component.css']
})
export class CardContentComponent implements OnInit {

  constructor(private card:CardComponent) {

   }
   ngOnInit() {

   }
}

export class contextMenuItem {
  public label:string = "Item Name"
  public type:string = "button";
  public iconName:string = "";
  public click:Function = null;
  public disableFunction:Function = () => { return false; };
}