import React, { useState } from "react";
import useStyles from "./style";
import Header from "Components/Header";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import { InputComponent } from "Components";
import { handleError } from "Store/helper";
import { addCab } from "Store/action";
import { useHistory } from "react-router-dom";

const Layout = () => {
  const classes = useStyles();
  const history = useHistory();
  const [cabOtp, setcabOtp] = useState();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleAddCab = async () => {
    try {
      setSubmitting(true);

      if (!cabOtp) {
        return setSubmitting(false);
      }
      await addCab({ cabOtp });
      history.push("/");
    } catch (err) {
      handleError(err);
    } finally {
      // Reset State
      setSubmitting(false);
    }
  };

  return (
    <div className={classes.cabbooking}>
      <Header title="Cab booking" />
      <div className={classes.cabcontent}>
        <Container className={classes.container} maxWidth="sm">
          <Typography variant="h6" align="center" className={classes.title}>
            Verify and Book Cab
          </Typography>
          <Typography variant="h3" align="center" className={classes.Otptitle}>
            Enter the OTP send to your mobile 9773416906
          </Typography>
          <form>
            <InputComponent
              placeholder="Enter 6 digit OTP"
              Icon={VpnKeyIcon}
              value={cabOtp}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCab}
              style={{ marginTop: 20 }}
              disabled={isSubmitting}
              fullWidth>
              {isSubmitting ? "Booking Cab...." : "Book Now"}
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};
export default Layout;
