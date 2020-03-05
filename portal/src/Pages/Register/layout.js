import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Header } from "Components";
import LockIcon from "@material-ui/icons/Lock";
import validate from "validate.js";

import {
  InputAdornment,
  TextField,
  Button,
  Container,
  Link,
  Typography
} from "@material-ui/core";
// import EmailIcon from "@material-ui/icons/Email";
import Snackbar from "Components/Snakbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

//For Data Retriving from the redux
import { useSelector } from "react-redux";
import { SingUp } from "Store/action";
import { AuthServices } from "Services";
import { useHistory } from "react-router-dom";

const schema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128
    }
  }
};

const Layout = props => {
  const classes = useStyles();
  const history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });
  const [state, setState] = useState({
    isOpen: false,
    variant: "error",
    message: ""
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSubmit = async () => {
    const { username, password } = formState.values;
    try {
      await AuthServices.signup(username, password);
      history.push("/hospital");
    } catch (err) {
      setState({
        isOpen: true,
        message: "User is Already taken"
      });
      console.log("err", err);
    } finally {
    }
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div>
      <Header title="Register" />
      <Snackbar
        errorMessage={state.message}
        isOpen={state.isOpen}
        variant={state.variant}
        handleClose={() => setState({ isOpen: false })}
      />
      <div>
        <Container className={classes.Container} maxWidth="md">
          <div className={classes.SingUp}>
            <div className={classes.SignUpContent}>
              <div className={classes.SignUpForm}>
                <form className={classes.SignUpForm}>
                  <div className={classes.SignUpFormInput}>
                    <Typography variant="h3" className={classes.FormTitle}>
                      Register
                    </Typography>
                    <TextField
                      autoFocus
                      error={hasError("username")}
                      helperText={
                        hasError("username")
                          ? formState.errors.username[0]
                          : null
                      }
                      className={classes.TextField}
                      id="input-with-icon-AcccountCircle"
                      fullWidth
                      name="username"
                      onChange={handleChange}
                      size="medium"
                      placeholder="Username Or Email"
                      type="email"
                      required
                      value={formState.values.username || ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonAddIcon style={{ color: "#222222" }} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      error={hasError("password")}
                      className={classes.TextField}
                      id="input-with-icon-Lock"
                      placeholder="Password"
                      name="password"
                      fullWidth
                      helperText={
                        hasError("password")
                          ? formState.errors.password[0]
                          : null
                      }
                      type="password"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password || ""}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon
                              style={{
                                color: "#222222"
                              }}
                            />
                          </InputAdornment>
                        )
                      }}
                    />
                    <div className={classes.Button}>
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="primary"
                        className={classes.SignUpButton}
                        disabled={!formState.isValid}>
                        Register
                      </Button>
                    </div>
                    <div className={classes.links}>
                      <Link
                        className={classes.link}
                        onClick={() => history.push("/login")}>
                        Already Have An Account..
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
              <div className={classes.signUpImage}>
                <figure>
                  <img
                    src="./images/signup-image.png"
                    alt="signin Referecence Pages"
                  />
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Layout;
