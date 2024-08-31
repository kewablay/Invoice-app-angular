import { Component, Input } from '@angular/core';
import { StatusComponent } from '../status/status.component';
import { Invoice } from '../../models/invoice.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  deleteInvoice,
  updateInvoice,
} from '../../store/invoices/invoices-actions/invoices.actions';
import { InvoiceFormComponent } from "../invoice-form/invoice-form.component";
import { SidebarModule } from 'primeng/sidebar';
import { ModalService } from '../../services/modalService/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invoice-detail-header',
  standalone: true,
  imports: [StatusComponent, InvoiceFormComponent, SidebarModule],
  templateUrl: './invoice-detail-header.component.html',
  styleUrl: './invoice-detail-header.component.sass',
})
export class InvoiceDetailHeaderComponent {
  @Input() invoice!: Invoice;
  isEditModalOpen!: boolean; 
  private modalSubscription: Subscription

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private modalService: ModalService
  ) {
    this.modalSubscription = this.modalService.isModalOpen('editInvoice')
      .subscribe(isOpen => {
        this.isEditModalOpen = isOpen;
      });
  }

  

  deleteInvoice = (id: string) => {
    this.store.dispatch(deleteInvoice({ id }));
    this.router.navigate(['']);
  };

  markAsPaid = (id: string) => {
    this.store.dispatch(updateInvoice({ invoice: { id, status: 'paid' } }));
  };
  markAsPending = (id: string) => {
    this.store.dispatch(updateInvoice({ invoice: { id, status: 'pending' } }));
  };

  openEditModal = () => {
    this.modalService.openModal('editInvoice');
  };

  onSidebarVisibleChange(isVisible: boolean) {
    if (isVisible) {
      this.modalService.openModal('editInvoice');
    } else {
      this.modalService.closeModal('editInvoice');
    }
  }
}
