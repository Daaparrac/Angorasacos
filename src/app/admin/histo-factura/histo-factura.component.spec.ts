import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoFacturaComponent } from './histo-factura.component';

describe('HistoFacturaComponent', () => {
  let component: HistoFacturaComponent;
  let fixture: ComponentFixture<HistoFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
