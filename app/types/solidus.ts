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
  id?: number|string;
  firstname?: string;
  lastname?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zipcode?: string;
  phone?: string;
  state_name?: string;
  country_name?: string;
  user_address?: {
    default_billing?: boolean;
    default_shipping?: boolean;
  };
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
    images?: Array<{
      id?: number;
      alt?: string;
      attachment_url?: string;
      url?: string;
    }>;
    product?: {
      id?: number;
      name?: string;
      slug?: string;
      description?: string;
      images?: Array<{
        id?: number;
        alt?: string;
        attachment_url?: string;
        url?: string;
      }>;
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
  ship_total: string
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

export type TaxonDetail = {
  id: number;
  parent_id: number | null;
  name: string;
  permalink: string;
  taxonomy_id: number;
  lft?: number;
  rgt?: number;
  icon_file_name?: string | null;
  icon_content_type?: string | null;
  icon_file_size?: number | null;
  icon_updated_at?: string | null;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  depth?: number;
};

export type ShippingMethod = {
  shipping_rate_id: string;
  shipment_id: string;
  name: string;
  display_cost: string;
  admin_name?: string;
  shipment?: {
    shipping_rates: Array<{
      id: string;
      name: string;
      cost: string;
      display_cost: string;
    }>;
  };
};