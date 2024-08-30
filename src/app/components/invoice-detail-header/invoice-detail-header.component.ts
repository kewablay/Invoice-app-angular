import { Component, Input } from '@angular/core';
import { StatusComponent } from "../status/status.component";
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-detail-header',
  standalone: true,
  imports: [StatusComponent],
  templateUrl: './invoice-detail-header.component.html',
  styleUrl: './invoice-detail-header.component.sass'
})
export class InvoiceDetailHeaderComponent {
  @Input() invoice!: Invoice
}
