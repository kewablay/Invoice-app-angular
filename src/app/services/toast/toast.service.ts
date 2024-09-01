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

  showToast({type, title, message}:ToastType) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
    });
  }
}
