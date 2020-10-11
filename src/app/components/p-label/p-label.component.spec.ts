import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PLabelComponent } from './p-label.component';

describe('PLabelComponent', () => {
  let component: PLabelComponent;
  let fixture: ComponentFixture<PLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
