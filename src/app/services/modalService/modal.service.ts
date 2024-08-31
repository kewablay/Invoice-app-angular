import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState: Map<string, BehaviorSubject<boolean>> = new Map();

  constructor() { }

  private getModalSubject(modalName: string): BehaviorSubject<boolean> {
    if (!this.modalState.has(modalName)) {
      this.modalState.set(modalName, new BehaviorSubject<boolean>(false));
    }
    return this.modalState.get(modalName)!;
  }

  openModal(modalName: string): void {
    this.getModalSubject(modalName).next(true);
  }

  closeModal(modalName: string): void {
    this.getModalSubject(modalName).next(false);
  }

  isModalOpen(modalName: string): Observable<boolean> {
    return this.getModalSubject(modalName).asObservable();
  }

  toggleModal(modalName: string): void {
    const currentState = this.getModalSubject(modalName).value;
    this.getModalSubject(modalName).next(!currentState);
  }
}