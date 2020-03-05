import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.0), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: theme.spacing() * 2,
    padding: theme.spacing() * 5,
    marginTop: theme.spacing() * 7,
    [theme.breakpoints.only("xs")]: {
      marginTop: 0,
      boxShadow: "none"
    }
  },
  Docicon: {
    textAlign: "Center"
  },
  icondoctor: {
    height: theme.spacing() * 40,
    width: theme.spacing() * 40,
    [theme.breakpoints.only("xs")]: {
      height: theme.spacing() * 30,
      width: theme.spacing() * 30,
    }
  }
}));

export default useStyles;
