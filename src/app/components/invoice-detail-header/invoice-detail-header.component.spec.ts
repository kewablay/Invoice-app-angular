import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailHeaderComponent } from './invoice-detail-header.component';

describe('InvoiceDetailHeaderComponent', () => {
  let component: InvoiceDetailHeaderComponent;
  let fixture: ComponentFixture<InvoiceDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
