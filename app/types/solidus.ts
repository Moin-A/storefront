export type User = {
  id?: string | number;
  email?: string;
  first_name?: string;
  last_name?: string;
  logged_in?: boolean;
  role?: 'admin' | 'user';
  addresses?: Address[];
};

export type Address = {
  id?: number;
  firstname?: string;
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zipcode?: string;
  phone?: string;
  state_name?: string;
  country_name?: string;
};

export type LineItem = {
  id?: number;
  quantity?: number;
  price?: string;
  total?: string;
  variant?: {
    id?: number;
    sku?: string;
    name?: string;
    product?: {
      id?: number;
      name?: string;
      slug?: string;
      description?: string;
    };
  };
};

export type Cart = {
  id?: number;
  number?: string;
  state?: 'cart';
  total?: string;
  item_total?: string;
  item_count?: number;
  line_items?: LineItem[];
  email?: string;
};

export type Order = {
  id?: number;
  number?: string;
  state?: 'address' | 'delivery' | 'payment' | 'confirm' | 'complete';
  total?: string;
  item_total?: string;
  item_count?: number;
  created_at?: string;
  updated_at?: string;
  line_items?: LineItem[];
  email?: string;
  bill_address?: Address;
  ship_address?: Address;
};