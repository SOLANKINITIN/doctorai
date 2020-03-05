import axios from 'axios';
import Config from "Config";
import { handleError } from 'Store/helper';

class MapService {
  key;
  API_URL = 'https://maps.google.com/maps/api/geocode/json';
  constructor(key) {
    this.key = key;
  }

  /**
   * @param {string} address
   * @returns {Promise}
   */
  async fromAddress(address) {
    try {
      if (!address) {
        return;
      }
      const url = `${this.API_URL}?key=${this.key}&address=${encodeURIComponent(address)}`;
      return await axios.get(url);
    } catch (err) {
      handleError(err);
    }
  }

  /**
   * @param {number} lat
   * @param {number} lng
   * @returns {Promise}
   */
  async fromLatLng(lat, lng) {
    if (!lat || !lng) {
      return;
    }
    const latLng = `${lat},${lng}`;
    const url = `${this.API_URL}?key=${this.key}&latlng=${encodeURIComponent(latLng)}`;
    return await axios.get(url);
  }
}

export default new MapService(Config.GOOGLE_KEY);