import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FxFieldComponent } from './fx-field.component';

describe('FxFieldComponent', () => {
  let component: FxFieldComponent;
  let fixture: ComponentFixture<FxFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FxFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FxFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
