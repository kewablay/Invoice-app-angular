import { loadInvoices, loadInvoicesSuccess, loadInVoicesError } from './invoices.actions';
import { Invoice, Address, Item } from '../../../models/invoice.model'; // Adjust the path as necessary

describe('Invoice Actions', () => {
  describe('loadInvoices', () => {
    it('should create an action', () => {
      const action = loadInvoices();
      expect(action.type).toBe('[Invoices] Load Invoices');
    });
  });

  describe('loadInvoicesSuccess', () => {
    it('should create an action with invoices', () => {
      const senderAddress: Address = {
        street: '123 Test St',
        city: 'Test City',
        postCode: '12345',
        country: 'Test Country'
      };

      const clientAddress: Address = {
        street: '456 Client St',
        city: 'Client City',
        postCode: '67890',
        country: 'Client Country'
      };

      const item: Item = {
        name: 'Test Item',
        quantity: 1,
        price: 100,
        total: 100
      };

      const invoices: Invoice[] = [
        {
          id: '1',
          createdAt: '2023-01-01',
          paymentDue: '2023-02-01',
          description: 'Test Invoice',
          paymentTerms: 30,
          clientName: 'Test Client',
          clientEmail: 'test@example.com',
          status: 'pending',
          senderAddress,
          clientAddress,
          items: [item],
          total: 100
        }
      ];
      
      const action = loadInvoicesSuccess({ invoices });
      
      expect(action.type).toBe('[Invoices] Load Invoices Success');
      expect(action.invoices).toEqual(invoices);
    });
  });

  describe('loadInVoicesError', () => {
    it('should create an action with error message', () => {
      const error = 'Test error message';
      const action = loadInVoicesError({ error });
      
      expect(action.type).toBe('[Invoices ] Load Invoices Error');
      expect(action.error).toBe(error);
    });
  });
});