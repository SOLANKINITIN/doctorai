import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  hospitalInfo: {
    padding: theme.spacing() * 3
  },
  hospitalsection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  hospitalImage: {
    height: theme.spacing() * 25,
    width: theme.spacing() * 25,
    borderRadius: theme.spacing() * 12.5,
    marginBottom: theme.spacing() * 2
  },
  categorysection: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    paddingTop: theme.spacing() * 3,
    paddingBottom: theme.spacing() * 3,
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      flexDirection: "column"
    }
  },
  doctors: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap:'wrap',
    [theme.breakpoints.only("xs")]: {
      display: "flex",
      flexDirection: "column"
    },
    padding: theme.spacing() * 4
  },
  doctorImage: {
    height: theme.spacing() * 24,
    width: theme.spacing() * 24,
    borderRadius: theme.spacing() * 12,
    marginBottom: theme.spacing() * 3
  }
}));

export default useStyles;
