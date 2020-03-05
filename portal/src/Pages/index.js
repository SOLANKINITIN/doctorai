import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Config from "Config";

import Home from "Pages/Home";
import Login from "Pages/Login";
import Register from "Pages/Register";
import Forgotpassword from "Pages/ForgotPassword.js";
import HospitalListing from "Pages/HospitalListing";
import HospitalAdd from "Pages/HospitalAdd";
import Cab from "Pages/Cab";
import DoctorAdd from "./DoctorAdd";
import NotFoundView from "./NotFoundView";
import HospitalDetail from "Pages/HospitalsDetail";
import PatientDetail from "Pages/PatientDetails";
import Notification from "Pages/Notification";
import Order from "Pages/Order";
import OtpVerification from "Pages/OTP VERIFICATION";
import CategoryAddPage from "Pages/Category";
import CategoryListing from "Pages/CategoryListing";
import ExpressFirebase from "express-firebase";
import { AuthServices } from "Services";
import Resetpassword from "Pages/ResetPassword";
ExpressFirebase.connect(Config.FIREBASE_CONFIG);

// const PrivateRoute = ({ component, ...rest }) => {
//   // const render = (props: any) => {
//   //   if (!AuthServices.isAuthenticated()) {
//   //     return (
//   //       <Redirect path="/login" />
//   //     )
//   //   }
//   //   return <Component {...props} />;
//   // };
//   // return (
//   <Route {...rest} render={render} />
//   // )
// }

const check = () => <h1>You are not Have a Right To Check this</h1>;

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={HospitalListing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Route exact path="/hospital" component={HospitalListing} />
          <Route exact path="/forgotpassword" component={Forgotpassword} />
          <Route exact path="/reset/:tokenid" component={Resetpassword} />

          {AuthServices.isAuthenticated() && AuthServices.isAdmin() && (
            <Route exact path="/add/hospital" component={HospitalAdd} />
          )}
          {/* adding cab */}

          {AuthServices.isAuthenticated() && AuthServices.isAdmin() && (
            <Route exact path="/cab" component={Cab} />
          )}

          {/* category */}

          {AuthServices.isAuthenticated() && AuthServices.isAdmin() && (
            <Route exact path="/category" component={CategoryAddPage} />
          )}

          <Route
            exact
            path="/hospital/:hospitalId"
            component={HospitalDetail}
          />
          <Route exact path="/add/doctor/:hospitalId" component={DoctorAdd} />
          <Route exact path="/patient" component={PatientDetail} />
          <Route exact path="/notification" component={Notification} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/otp" component={OtpVerification} />
          <Route exact path="/category/list" component={CategoryListing} />
          <Route component={NotFoundView} />
        </Switch>
      </Router>
    );
  }
}
export default Root;
