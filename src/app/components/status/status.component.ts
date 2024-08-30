import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [],
  templateUrl: './status.component.html',
  styleUrl: './status.component.sass',
})
export class StatusComponent {
  @Input() invoice!: Invoice;
}
