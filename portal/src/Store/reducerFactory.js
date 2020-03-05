import { handleActions } from "redux-actions";

class ReducerFactory {
  reducerMap;
  initState;

  constructor(initState) {
    this.initState = initState;
    this.reducerMap = {};
  }

  add(actionTypeOrActionCreator, reducer) {
    return this.addReducerInternal(actionTypeOrActionCreator, reducer);
  }

  addCustom(fn) {
    fn(this);
    return this.asAllowingPayload();
  }

  addReducerInternal(actionTypeOrActionCreator, reducer) {
    this.reducerMap[actionTypeOrActionCreator.toString()] = reducer;
    return this.asAllowingPayload();
  }

  asAllowingPayload() {
    return this;
  }

  toReducer() {
    return handleActions(this.reducerMap, this.initState);
  }
}

export default ReducerFactory;
