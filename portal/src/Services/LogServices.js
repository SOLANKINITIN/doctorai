import config from "Config";

class LogServices {
  /**
   *
   * @param {string} key
   */
  constructor(key) {
    this._key = key;
    if (config.DEBUG) {
      this._console = console;
    } else {
      this._console = {
        error: () => undefined,
        info: () => undefined,
        log: () => undefined,
        warn: () => undefined,
        debug: () => undefined
      };
    }
  }

  /**
   *
   * @param {string} message
   * @param  {...any[]} optionalParams
   */
  error(message, ...optionalParams) {
    this._console.log(`error:${this._key}`, message, ...optionalParams);
  }

  info(message, ...optionalParams) {
    this._console.log(`info:${this._key}`, message, ...optionalParams);
  }

  log(message, ...optionalParams) {
    this._console.log(`log:${this._key}`, message, ...optionalParams);
  }

  warn(message, ...optionalParams) {
    this._console.log(`warn:${this._key}`, message, ...optionalParams);
  }

  debug(message, ...optionalParams) {
    this._console.debug(`debug:${this._key}`, message, ...optionalParams);
  }

  /**
   *
   * @param {string} key
   */
  getInstance(key) {
    return new LogServices(`${this._key}:${key}`);
  }
}

export default new LogServices("app");
