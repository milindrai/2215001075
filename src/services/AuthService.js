
import { api } from '../lib/api';

export class AuthService {
  static instance = null;
  token = null;

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async register(data) {
    const response = await api.post('/register', data);
    return response.data;
  }

  async getToken(credentials) {
    const response = await api.post('/auth', credentials);
    this.token = response.data.access_token;
    return this.token;
  }

  getStoredToken() {
    return this.token;
  }
}
