import React, { useEffect, useState } from "react";
import useStyles from "./style";
import Header from "Components/Header";
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  LinkButtons
} from "@material-ui/core";
import Config from "Config";
import EmailIcon from "@material-ui/icons/Email";
import axios from "axios";
import { forgotPassword } from "Store/action";
import { handleError } from "Store/helper";
import { useSelector } from "react-redux";
import { forgotpassword } from "Store/selectors";
import { useHistory } from "react-router-dom";
const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    showError: false,
    messageFromServer: "",
    showNullError: false
  });
  // useEffect(() => {
  //   forgotpassword();
  // }, []);

  const hadlechange = async e => {
    setState({ username: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();

    const { username } = state;
    try {
      await forgotPassword({ username });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.cabbooking}>
      <Header title="Forgot password" />
      <div className={classes.cabcontent}>
        <Container className={classes.container} maxWidth="sm">
          <form>
            <Typography
              variant="h6"
              align="center"
              className={classes.title}
              style={{ marginBottom: "2rem" }}>
              Verifying Email
            </Typography>
            <TextField
              autoFocus
              className={classes.TextField}
              id="input-with-icon-AcccountCircle"
              fullWidth
              name="username"
              onChange={hadlechange}
              size="medium"
              value={state.email}
              placeholder="Username Or Email"
              type="email"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon style={{ color: "#222222" }} />
                  </InputAdornment>
                )
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              style={{ marginTop: 20 }}
              // disabled={isSubmitting}
              fullWidth>
              Submit
            </Button>
          </form>
          {state.showError && (
            <div>
              <p>The email address cannot be null.</p>
            </div>
          )}
          {state.showError && (
            <div>
              <p>
                That email address isn&apos;t recognized. Please try again or
                register for a new account.
              </p>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};
export default Layout;
