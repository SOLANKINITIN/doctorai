import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Container: {
    background: "#fff",
    margin: "0 auto",
    boxShadow: "-5px 15px 16.83px 17px rgba(0, 0, 0, 0.05)",
    borderRadius: theme.spacing() * 2,
    marginTop: theme.spacing() * 7,
    [theme.breakpoints.only("xs")]: {
      boxShadow: "none"
    }
  },
  SignUpContent: {
    display: "flex",
    padding: "75px 0px",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "relative",
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "28px 0px"
    },
    [theme.breakpoints.only("sm")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "28px 0px"
    }
  },
  FormTitle: {
    marginBottom: theme.spacing() * 5,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    letterSpacing: 2,
    color: "#333333",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center"
    }
  },
  TextField: {
    marginBottom: theme.spacing() * 5
  },
  SignUpForm: {
    width: "100%"
  },
  SignUpFormInput: {
    // width: "50%",
    overflow: "hidden",
    marginRight: "30px",
    marginLeft: "50px",
    [theme.breakpoints.only("xs")]: {
      marginRight: "15px",
      marginLeft: "15px"
    }
  },
  SignUpButton: {
    borderRadius: theme.spacing() * 1,
    fontSize: "1rem",
    letterSpacing: "1px",
    color: "#fff",
    marginBottom: "0.3rem",
    background: "#7563FF",
    "&:hover": {
      background: "#4031ea"
    }
  },

  links: {
    marginTop: theme.spacing() * 2
  },
  link: {
    listStyle: "none",
    display: "block",
    fontFamily: "Poppins, sans-serif",
    cursor: "pointer",
    fontSize: "0.9rem",
    color: "black"
  }
}));

export default useStyles;
