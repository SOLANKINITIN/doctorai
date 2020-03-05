import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({

    container: {
        display: "flex",
        minHeight: "90vh",
        justifyContent: "center",
        alignItems: "Center",
        overflow: "hidden",
    },
    root: {
        padding: theme.spacing() * 3,
        maxWidth: 350,
        boxShadow: "-5px 15px 16.83px 17px rgba(0, 0, 0, 0.05)",
        borderRadius: theme.spacing() * 2,
    },
    avatar: {
        margin: "0 auto",
        height: 150,
        width: 150,
        marginBottom: theme.spacing() * 2
    },
    TextField: {
        marginTop: theme.spacing() * 3
    }



}))
export default useStyles;