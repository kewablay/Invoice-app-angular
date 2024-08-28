import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Invoice } from '../../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getInvoice(): Observable<any[]> {
    return this.http.get<Invoice[]>(environment.apiUrl);
  }
}
