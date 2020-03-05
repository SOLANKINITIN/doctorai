import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  Container: {
    background: "#fff",
    margin: "0 auto",
    boxShadow: "-5px 15px 16.83px 17px rgba(0, 0, 0, 0.05)",
    borderRadius: theme.spacing() * 2,
    marginTop: theme.spacing() * 7,
    marginBottom: theme.spacing() * 7,
    [theme.breakpoints.only("xs")]: {
      boxShadow: "none"
    }
  },

  fileUpload: {
    width: "100%",
    marginBottom: theme.spacing() * 5,
    [theme.breakpoints.only("xs")]: {
      width: "1oo%"
    }
  },

  TextField: {
    marginBottom: theme.spacing() * 3
  },
  HospitalForm: {
    width: "100%"
  },

  HospitalIconContent: {
    textAlign: "center",
    margin: "0px auto"
  },
  thumnaiimages: {
    cursor: "pointer",
    color: "#7563FF"
  },
  iconhospital: {
    height: "90px",
    borderRadius: "50%",
    width: "90px",
    [theme.breakpoints.only("xs")]: {
      marginRight: 0,
      height: "120px",
      width: "120px"
    }
  },
  title: {
    fontSize: "1.3rem",
    marginBottom: theme.spacing() * 2,
    position: "relative",
    marginTop: "-1rem"
  },
  hospitalButton: {
    marginTop: theme.spacing() * 3,
    marginBottom: theme.spacing() * 3,
  },
}));

export default useStyles;
