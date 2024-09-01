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
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { SidebarModule } from 'primeng/sidebar';
import { ModalService } from '../../services/modalService/modal.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-invoice-detail-header',
  standalone: true,
  imports: [StatusComponent, InvoiceFormComponent, SidebarModule, ToastModule],
  templateUrl: './invoice-detail-header.component.html',
  styleUrl: './invoice-detail-header.component.sass',
  providers: [MessageService],
})
export class InvoiceDetailHeaderComponent {
  @Input() invoice!: Invoice;
  isEditModalOpen!: boolean;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private modalService: ModalService,
    private messageService: MessageService
  ) {
    this.modalService.isModalOpen('editInvoice').subscribe((isOpen) => {
      this.isEditModalOpen = isOpen;
    });
  }

  deleteInvoice = (id: string) => {
    this.store.dispatch(deleteInvoice({ id }));
    this.router.navigate(['']);
  };

  markAsPaid = (id: string) => {
    this.store.dispatch(updateInvoice({ invoice: { id, status: 'paid' } }));
    this.showToast({
      type: 'success',
      message: 'Invoice marked as paid',
      title: 'Status Updated',
    });
  };
  markAsPending = (id: string) => {
    this.store.dispatch(updateInvoice({ invoice: { id, status: 'pending' } }));
    this.showToast({
      type: 'success',
      message: 'Invoice marked as Pending',
      title: 'Status Updated',
    });
  };

  openEditModal = () => {
    this.modalService.openModal('editInvoice');
  };
  closeEditModal = () => {
    this.modalService.closeModal('editInvoice');
  };

  showToast(event: { type: string; message: string; title: string }) {
    this.messageService.add({
      severity: event.type,
      summary: event.title,
      detail: event.message,
    });
  }

  onSidebarVisibleChange(isVisible: boolean) {
    if (isVisible) {
      this.modalService.openModal('editInvoice');
    } else {
      this.modalService.closeModal('editInvoice');
    }
  }
}
