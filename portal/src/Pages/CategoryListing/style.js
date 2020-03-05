import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing() * 2
  },
  addbutton: {
    textAlign: "right",
    margin: "1rem 1rem"
  },

  button: {
    margin: "0.36rem"
  },
}));

export default useStyles;
