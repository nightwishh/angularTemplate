import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTest1Component } from './auth-test1.component';

describe('AuthTest1Component', () => {
  let component: AuthTest1Component;
  let fixture: ComponentFixture<AuthTest1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthTest1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTest1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
