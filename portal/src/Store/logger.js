import { logger } from "redux-logger";
import Config from "Config";

export const loggerMiddleware = [];

if (Config.DEBUG) {
  loggerMiddleware.push(logger);
}
