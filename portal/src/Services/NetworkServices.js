import axios, { AxiosResponse } from "axios";
import { ApplicationError, LogServices, AuthServices } from "Services";

const logger = LogServices.getInstance("Service:Network");

const MESSAGES = {
  OFFLINE: "You are offline, Please connect internet",
  NOT_REACHABLE: "We are not able to connect to server at the moment",
  UNKNOWN: "Something went wrong, Please contact to administrator"
};

class NetworkService {
  handleError(error) {
    if (error instanceof ApplicationError) {
      throw error;
    }

    if (error.message === "Network Error") {
      throw new ApplicationError(MESSAGES.NOT_REACHABLE);
    }

    throw error;
  }

  /**
   *
   * @param {AxiosResponse} response
   */
  handleResponse(response) {
    if (response.status !== 200 && response.status !== 201) {
      logger.error(response);
      throw new ApplicationError(MESSAGES.UNKNOWN);
    }
    return response.data;
  }

  getHeader(options) {
    const header = {};
    if (options && options.headers) {
      Object.assign(header, options.headers);
    }

    if (options && options.external) {
      return header;
    }

    const token = AuthServices.getToken();
    if (token) {
      header.Authorization = `Bearer ${token}`;
    }

    return header;
  }

  /**
   * @param {string} url
   * @param {any} options
   */

  async get(url, options) {
    logger.debug("get", url);
    try {
      const response = await axios.get(url, {
        headers: this.getHeader(options)
      });

      logger.debug("get response", response);

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {any} options
   */
  async post(url, data, options) {
    logger.debug("post", url, data);
    try {
      const response = await axios.post(url, data, {
        headers: this.getHeader(options)
      });

      logger.debug("post response", response);

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {any} options
   */
  async put(url, data, options) {
    logger.debug("put", url, data);
    try {
      const response = await axios.put(url, data, {
        headers: this.getHeader(options)
      });

      logger.debug("put response", response);

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * @param {string} url
   * @param {any} options
   */
  async delete(url, options) {
    logger.debug("delete", url);
    try {
      const response = await axios.delete(url, {
        headers: this.getHeader(options)
      });

      logger.debug("delete response", response);

      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new NetworkService();
