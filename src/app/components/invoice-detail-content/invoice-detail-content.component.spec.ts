import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailContentComponent } from './invoice-detail-content.component';

describe('InvoiceDetailContentComponent', () => {
  let component: InvoiceDetailContentComponent;
  let fixture: ComponentFixture<InvoiceDetailContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceDetailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
