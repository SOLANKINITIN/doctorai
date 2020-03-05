import ReducerFactory from "./reducerFactory";
import { createAction } from "redux-actions";

const PREFIX = "@DOCTOR_AI";

const getActionName = name => `${PREFIX}/${name}`;

const getDataAction = name => {
  return {
    reset: createAction(getActionName(`${name}_RESET`)),
    init: createAction(getActionName(`${name}_INIT`)),
    failed: createAction(getActionName(`${name}_FAILED`)),
    success: createAction(getActionName(`${name}_SUCCESS`))
  };
};

export const hospitalListingAction = getDataAction("HOSPITAL_LISTING");
export const hospitalDetailAction = getDataAction("HOSPITAL_DETAIL");
export const currentPatientAction = getDataAction("CURRENT_PATIENT");
export const addCategoryAction = getDataAction("ADD_CATEGORY");
export const categoryListingAction = getDataAction("CATEGORY_LISTING");
export const currentOrderAction = getDataAction("CURRENT_ORDER");
export const userOrderAction = getDataAction("USER_ORDER");
export const sendMailAction = getDataAction("MAIL");
export const forgotPasswordAction = getDataAction("FORGOT_PASSWORD");

const addDataAction = (action, key) => {
  return reducerFactory => {
    reducerFactory.add(action.reset, state => {
      return {
        ...state,
        [key]: {
          initialized: false,
          loading: true,
          error: null,
          data: null
        }
      };
    });
    reducerFactory.add(action.init, state => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: true,
          error: null,
          data: null
        }
      };
    });
    reducerFactory.add(action.failed, (state, action) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: false,
          error: action.payload,
          data: null
        }
      };
    });
    reducerFactory.add(action.success, (state, action) => {
      return {
        ...state,
        [key]: {
          initialized: true,
          loading: false,
          error: null,
          data: action.payload
        }
      };
    });
  };
};

const initialState = {
  hospitals: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  hospitalDetail: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  currentPatient: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  currentCategory: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  categoryListing: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  currentOrder: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  userOrder: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  mail: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  },
  forgotpassword: {
    initialized: false,
    loading: false,
    error: null,
    data: null
  }
};
const reducer = new ReducerFactory(initialState)
  .addCustom(addDataAction(hospitalListingAction, "hospitals"))
  .addCustom(addDataAction(hospitalDetailAction, "hospitalDetail"))
  .addCustom(addDataAction(currentPatientAction, "currentPatient"))
  .addCustom(addDataAction(addCategoryAction, "currentCategory"))
  .addCustom(addDataAction(categoryListingAction, "categoryListing"))
  .addCustom(addDataAction(currentOrderAction, "currentOrder"))
  .addCustom(addDataAction(userOrderAction, "userOrder"))
  .addCustom(addDataAction(sendMailAction, "mail"))
  .addCustom(addDataAction(forgotPasswordAction, "forgotpassword"))
  .toReducer();

export default reducer;
