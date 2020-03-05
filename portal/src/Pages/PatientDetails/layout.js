import React, { useState } from "react";
import useStyle from "./style";
import {
  Card,
  Container,
  CardContent,
  Avatar,
  Typography,
  InputAdornment,
  TextField,
  Button
} from "@material-ui/core";
import Header from "Components/Header";
import LockIcon from "@material-ui/icons/Lock";

const Layout = () => {
  const classes = useStyle();
  const [password, setPassword] = useState("");

  return (
    <div className={classes.patientpage}>
      <Header title="Patient" />
      <Container className={classes.container} maxWidth="lg">
        <Card className={classes.root}>
          <CardContent>
            <div>
              <Avatar src="/broken-image.jpg" className={classes.avatar} />
              <Typography
                variant="h5"
                align="center"
                style={{ marginBottom: "1rem" }}>
                Jone Doe
              </Typography>
              <TextField
                className={classes.TextField}
                id="input-with-icon-Lock"
                placeholder="Old Password"
                fullWidth
                type="password"
                onChange={e => setPassword(e.target.value)}
                // onChange={e => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        style={{
                          color: "#7563FF"
                        }}
                      />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                className={classes.TextField}
                id="input-with-icon-Lock"
                placeholder="New Password"
                fullWidth
                type="password"
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon
                        style={{
                          color: "#7563FF"
                        }}
                      />
                    </InputAdornment>
                  )
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "2rem" }}>
                  Update
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
export default Layout;
