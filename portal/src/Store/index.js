import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";
import { loggerMiddleware } from "./logger";

const appReducer = combineReducers({
  root: rootReducer
});

const middleware = composeWithDevTools(applyMiddleware(...loggerMiddleware));

export const store = createStore(appReducer, middleware);

export default store;
