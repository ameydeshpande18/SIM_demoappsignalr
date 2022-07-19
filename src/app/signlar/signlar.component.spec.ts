import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignlarComponent } from './signlar.component';

describe('SignlarComponent', () => {
  let component: SignlarComponent;
  let fixture: ComponentFixture<SignlarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignlarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignlarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
