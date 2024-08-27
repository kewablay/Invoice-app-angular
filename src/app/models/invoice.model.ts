export interface Address {
  street?: string;
  city?: string;
  postCode?: string;
  country?: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
  total: number;
}


export interface Invoice {
    id: string;
    createdAt: string; // You may consider using `Date` if you'll parse these as actual date objects
    paymentDue: string;
    description: string;
    paymentTerms: number;
    clientName: string;
    clientEmail?: string;
    status: 'paid' | 'pending' | 'draft'; // Consider using a union type for status
    senderAddress: Address;
    clientAddress: Address;
    items: Item[];
    total: number;
  }
  