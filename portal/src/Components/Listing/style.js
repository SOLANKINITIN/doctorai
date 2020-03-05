import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    listContainer: {
        '&:hover': {
          backgroundColor: theme.palette.grey[200],
          cursor: 'pointer',
        }
      }
}));

export default useStyles;
