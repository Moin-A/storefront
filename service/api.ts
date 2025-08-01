export class SolidusAPI {
    baseURL: string | undefined;
    constructor() {
        this.baseURL = process.env.AP_URL;
      }

      async request(
        endpoint: string,
        options: Record<string, any> = {}
      ):Promise<any> {

      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      };

      const config = {
        credentials: 'include'as RequestCredentials,
        ...options,
        headers
      };

      const response = await fetch(`${this.baseURL}${endpoint}`, config);

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      

    }


    async login(email:string, password:string) {
      return this.request('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
    }
  
    async register(userData: Record<string, any>) {
      return this.request('/api/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    }
  
    // Products
    async getProducts(params = {}) {
      const query = new URLSearchParams(params).toString();
      return this.request(`/api/products${query ? `?${query}` : ''}`);
    }
}