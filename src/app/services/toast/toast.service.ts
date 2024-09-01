import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

export interface ToastType {
  type: string;
  title: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showToast( severity: string, summary: string, detail: string, life: number = 3000) {
    this.messageService.add({
      severity,
      summary,
      detail,
      life
    });
  }

  showSuccess(summary: string, detail: string) {
    this.showToast('success', summary, detail);
  }

  showInfo(summary: string, detail: string) {
    this.showToast('info', summary, detail);
  }

  showWarn(summary: string, detail: string) {
    this.showToast('warn', summary, detail);
  }

  showError(summary: string, detail: string) {
    this.showToast('error', summary, detail);
  }
}
