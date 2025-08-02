export class SolidusAPI {
    baseURL: string | undefined;
    constructor() {
        this.baseURL = process.env.API_URL;
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
        const errorBody = await response.text();
        const error = new Error(errorBody || 'Network response was not ok');
        (error as any).status = response.status;
        throw error;
      }
    }
}