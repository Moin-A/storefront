
  export const SOLIDUS_ROUTES = {
    frontend: {
      home: '/',
      products: '/shop',
      product_detail: '/shop/[slug]',
      categories: '/shop/categories',
      category_detail: '/shop/categories/[slug]',
      search: '/shop/search',
      cart: '/cart',
      checkout: '/cart/checkout',
      checkout_address: '/cart/checkout/address',
      checkout_delivery: '/cart/checkout/delivery', 
      checkout_payment: '/cart/checkout/payment',
      checkout_complete: '/cart/checkout/complete',
      login: '/account/login',
      register: '/account/register',
      account: '/account',
      orders: '/account/orders',
      order_detail: '/account/orders/[id]',
      addresses: '/account/addresses',
      profile: '/account/profile'
    },
    
    api: {
      // Authentication
      login: '/api/login',
      register: '/api/register',
      logout: '/api/auth/logout',
      
      // Products
      products: '/api/products',
      product: '/api/product',
      product_detail: '/api/products/[id]',
      product_variants: '/api/products/[id]/variants',
      product_properties: (id:string|number)=>`/api/products/${id}/product_properties`,
      
      // Categories/Taxons
      taxons: '/api/taxons',
      taxon_detail: '/api/taxons/[id]',
      taxon_products: (id:string|number)=>`/api/taxons/${id}/products`,
      
      // Cart/Orders
      current_order: '/api/orders/current',
      orders: '/api/orders',
      order_detail: '/api/orders/[id]',
      
      // Line Items (Cart Items)
      line_items: '/api/orders/current/line_items',
      add_to_cart: '/api/cart/add',
      update_cart_item: '/api/orders/current/line_items/[id]',
      remove_cart_item: '/api/orders/current/line_items/[id]',
      
      // Checkout
      checkout_next: '/api/checkouts/[id]/next',
      checkout_advance: '/api/checkouts/[id]/advance',
      checkout_complete: '/api/checkouts/[id]/complete',
      
      // Addresses
      addresses: '/api/addresses',
      countries: '/api/countries',
      states: '/api/countries/[country_id]/states',
      
      // Payments
      payment_methods: '/api/payment_methods',
      payments: '/api/orders/[id]/payments',
      
      // Shipments
      shipping_methods: '/api/shipping_methods',
      shipments: '/api/orders/[id]/shipments',
      
      // User
      user_profile: '/api/user',
      user_orders: '/api/user/orders',
      user_addresses: '/api/user/addresses',

      //store

      stores: '/api/stores'
    }
  };
  
  