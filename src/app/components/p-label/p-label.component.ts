import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

export const NUMBER_VALUE_ACCESSOR:any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(()=> PLabelComponent),
  multi:true
}

@Component({
  selector: 'p-label', /// This is a <p> text with editing function 
  templateUrl: './p-label.component.html',
  styleUrls: ['./p-label.component.css'],
  providers:[NUMBER_VALUE_ACCESSOR]
})
export class PLabelComponent implements OnInit {

  @Input() style:string = "";
  @Input() text:string = null;

  @Input() ngModel:any = "";
  @Output() ngModelChange:EventEmitter<any> = new EventEmitter<any>();

  private _editing:boolean = false;
  @Input()
  set editing(val:boolean) {
    this._editing = val;
    this.editingBh.next(val);
  };
  get editing():boolean {
    return this._editing;
  }
  @Output() editingChange:EventEmitter<boolean> = new EventEmitter<boolean>();

  private editingBh = new BehaviorSubject(this.editing);

  @Output() confirmEdit:EventEmitter<any> = new EventEmitter<any>(); 

  @Input() editBtnClass:string = "";
  @Input() cancelBtnClass:string = "";

  @Input() editingDirection:string = "vertical";
  @Input() editControls:boolean = true;
  initialNgModel:any = "";
  
  @Input() autoFocus:boolean = true;

  constructor() { 
    
  }

  @ViewChild("editInput") editInput:ElementRef;

  ngOnInit(): void {
    this.initialNgModel = this.ngModel;
    // const x = new Subject<boolean>();
    // x.next(this.editing);
    this.editingBh.subscribe(value => {
      if (value == true && this.autoFocus) {
        setTimeout(() => {
          var input = this.editInput.nativeElement;
          input.focus();
          input.setSelectionRange(0,String(this.ngModel).lastIndexOf("."));
        }, 100);
      }
    });
    // this.editing.subscribe(console.log);
    
    // this.editing.asObservable().subscribe(value => {
    //   if (value == true) console.log("Ok");
    // })
    // this.editing.subscribe( => {
    //   if (val == true) console.log("Ok");
    // })
  }
  ngModelChangeEvent() {
    this.ngModelChange.emit(this.ngModel);
  }
  editBtnClick() {
    this.confirmEdit.emit();

    this.editing = false;
    this.editingChange.emit(this.editing);
  }
  
  cancelBtnClick() {
    this.ngModel = this.initialNgModel;
    this.editing = false;
    this.editingChange.emit(this.editing);
  }

  public revertChanges() {
    this.cancelBtnClick();
  }
  writeValue(val:any):void {
    
  }
  registerOnChange(val:any):void {
  }
  registerOnTouched(val:any):void {
  }

}
