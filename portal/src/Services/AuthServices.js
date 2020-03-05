import Config from "Config";
import { NetworkServices, LogServices } from "Services";
import config from "Config";

const logger = LogServices.getInstance("AuthServices");
const AUTH_LOCALSTORAGEKEY = "panther";

class AuthService {
  _auth;
  constructor() {
    const authString = localStorage.getItem(AUTH_LOCALSTORAGEKEY);
    if (authString) {
      this._auth = JSON.parse(authString);
    }
  }

  /**
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    const response = await NetworkServices.post(`${Config.SERVER_URL}/login`, {
      username,
      password
    });
    if (response.success) {
      localStorage.setItem(AUTH_LOCALSTORAGEKEY, JSON.stringify(response.data));
      this._auth = response.data;
    }

    logger.debug(response);
    return response;
  }

  async signup(username, password) {
    const response = await NetworkServices.post(`${config.SERVER_URL}/signup`, {
      username,
      password
    });
    if (response.success) {
      localStorage.setItem(AUTH_LOCALSTORAGEKEY, JSON.stringify(response.data));
      this._auth = response.data;
    }
    logger.debug(response);
    return response;
  }

  isAuthenticated() {
    if (!this._auth) {
      return false;
    }

    if (Date.now() > this._auth.expiredOn) {
      localStorage.removeItem(AUTH_LOCALSTORAGEKEY);
      this._auth = undefined;
      return false;
    }

    return true;
  }

  getToken() {
    if (!this._auth) {
      return null;
    }
    return this._auth.token;
  }

  async logout() {
    localStorage.removeItem(AUTH_LOCALSTORAGEKEY);
    this._auth = undefined;
  }

  isAdmin() {
    if (!this.isAuthenticated()) {
      return false;
    }
    if (!this._auth.isAdmin) {
      return false;
    }
    return true;
  }
}

export default new AuthService();
