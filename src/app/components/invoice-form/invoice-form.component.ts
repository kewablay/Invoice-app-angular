import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  addInvoice,
  updateInvoice,
} from '../../store/invoices/invoices-actions/invoices.actions';
import { GenerateIdService } from '../../services/generateId/generate-id.service';
import { CommonModule } from '@angular/common';
import { Invoice } from '../../models/invoice.model';
import { ModalService } from '../../services/modalService/modal.service';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
  ],
  templateUrl: './invoice-form.component.html',
  styleUrl: './invoice-form.component.sass',
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  @Input() invoice: Invoice | null = null;
  @Output() closeModal = new EventEmitter();

  paymentTermsOptions = [
    { value: 1, name: 'Net 1 Day' },
    { value: 7, name: 'Net 7 Days' },
    { value: 14, name: 'Net 14 Days' },
    { value: 30, name: 'Net 30 Days' },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private generateId: GenerateIdService,
    private modalService: ModalService,
    private toastService: ToastService
  ) {
    this.invoiceForm = this.fb.group({});
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.invoiceForm = this.fb.group({
      senderAddress: this.fb.group({
        street: [this.invoice?.senderAddress.street || '', Validators.required],
        city: [this.invoice?.senderAddress.city || '', Validators.required],
        postCode: [
          this.invoice?.senderAddress.postCode || '',
          Validators.required,
        ],
        country: [
          this.invoice?.senderAddress.country || '',
          Validators.required,
        ],
      }),
      clientAddress: this.fb.group({
        clientName: [this.invoice?.clientName || '', Validators.required],
        clientEmail: [
          this.invoice?.clientEmail || '',
          [Validators.required, Validators.email],
        ],
        street: [this.invoice?.clientAddress.street || '', Validators.required],
        city: [this.invoice?.clientAddress.city || '', Validators.required],
        postCode: [
          this.invoice?.clientAddress.postCode || '',
          Validators.required,
        ],
        country: [
          this.invoice?.clientAddress.country || '',
          Validators.required,
        ],
      }),
      createdAt: [this.invoice?.createdAt || '', Validators.required],
      paymentTerms: [this.invoice?.paymentTerms || '', Validators.required],
      description: [this.invoice?.description || '', Validators.required],
      items: this.fb.array(
        this.invoice?.items.map((item) => this.createItemFormGroup(item)) || [],
        Validators.minLength(1)
      ),
    });

    if (!this.invoice) {
      this.addItem();
    }
  }

  createItemFormGroup(item: any = {}) {
    return this.fb.group({
      name: [item.name || '', Validators.required],
      quantity: [item.quantity || 1, [Validators.required, Validators.min(1)]],
      price: [item.price || 0, [Validators.required, Validators.min(0)]],
      total: [{ value: item.total || 0, disabled: true }],
    });
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.createItemFormGroup());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  calculateItemTotal(index: number) {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value;
    const price = item.get('price')?.value;
    const total = quantity * price;
    item.patchValue({ total: total });
  }

  updateCreatedAt(event: any) {
    this.invoiceForm.get('createdAt')?.setValue(event.value);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const formValue = this.invoiceForm.getRawValue();
      const createdAt = new Date(formValue.createdAt);
      const paymentTerms =
        formValue.paymentTerms.value || formValue.paymentTerms;
      const paymentDue = new Date(createdAt);
      paymentDue.setDate(paymentDue.getDate() + paymentTerms);

      const newInvoice = {
        ...formValue,
        id: this.invoice ? this.invoice.id : this.generateId.generateUniqueId(),
        createdAt: createdAt.toISOString().split('T')[0],
        paymentDue: paymentDue.toISOString().split('T')[0],
        paymentTerms: paymentTerms,
        status: !this.invoice ? 'pending' : this.invoice.status,
        clientName: formValue.clientAddress.clientName,
        clientEmail: formValue.clientAddress.clientEmail,
        items: formValue.items.map((item: any) => ({
          ...item,
          total: item.quantity * item.price,
        })),
        total: formValue.items.reduce(
          (sum: number, item: any) => sum + item.quantity * item.price,
          0
        ),
      };

      if (this.invoice) {
        const id = this.invoice.id;
        this.store.dispatch(updateInvoice({ invoice: { id, ...newInvoice } }));
        this.modalService.closeModal('editInvoice');
        console.log('About to emit update success');
        this.toastService.showSuccess(
          'Success',
          'Invoice updated successfully'
        );
      } else {
        this.store.dispatch(addInvoice({ invoice: newInvoice }));
        this.modalService.closeModal('newInvoice');
        this.toastService.showSuccess(
          'Success',
          'Invoice created successfully'
        );
      }
    }
  }

  saveAsDraft() {
    const formValue = this.invoiceForm.getRawValue();

    const draftInvoice = {
      ...formValue,
      id: this.invoice ? this.invoice.id : this.generateId.generateUniqueId(),
      createdAt: new Date().toISOString().split('T')[0],
      paymentDue: '', // Can be left empty for drafts
      status: 'draft' as 'paid' | 'pending' | 'draft',
      clientName: formValue.clientAddress.clientName,
      clientEmail: formValue.clientAddress.clientEmail,
      items: formValue.items.map((item: any) => ({
        ...item,
        total: (item.quantity || 0) * (item.price || 0),
      })),
      total: formValue.items.reduce(
        (sum: number, item: any) =>
          sum + (item.quantity || 0) * (item.price || 0),
        0
      ),
    };

    this.store.dispatch(addInvoice({ invoice: draftInvoice }));
    this.modalService.closeModal('newInvoice');
    this.toastService.showSuccess('Success', 'Invoice added as draft');
  }

  handleCloseModal() {
    this.closeModal.emit();
  }

  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.invoiceForm.get(fieldName);
    if (control && control.touched && control.invalid) {
      if (control.errors?.['required']) {
        return "Can't be empty";
      }
      if (control.errors?.['email']) {
        return 'Invalid email format';
      }
      if (control.errors?.['min']) {
        return 'Must be greater than 0';
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.invoiceForm.get(fieldName);
    return (
      control !== null && control.invalid && (control.dirty || control.touched)
    );
  }
}
