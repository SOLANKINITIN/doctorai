import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    cabbooking: {
        height: '100vh'
    },
    cabcontent: {
        display: 'flex',
        height: '85vh',
        justifyContent: 'Center',
        alignItems: 'Center'
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: theme.spacing() * 1,
        position: 'relative'
    },
    Otptitle: {
        fontSize: '1rem',
        marginBottom: theme.spacing() * 2,
        position: 'relative'
    },

    container: {
        margin: '0 auto',
        maxWidth: '25rem',
        boxShadow: '-5px 15px 16.83px 17px rgba(0, 0, 0, 0.05)',
        borderRadius: theme.spacing() * 2,
        padding: '2.5rem',
        marginTop: theme.spacing() * 7,
        [theme.breakpoints.only('xs')]: {
            boxShadow: 'none'
        }
    },

    cabtextfield: {
        margin: '1rem 0px',
        width: '100%'
    },
    thumnaiimages: {
        cursor: 'pointer',
        color: '#7563FF'
    },
    icon: {
        color: '#7563FF'
    },
    CabbookButton: {
        marginTop: '2rem',
        background: '#7563FF',
        color: '#fff'
    },
    taxiicon: {
        textAlign: 'center',
        margin: '0px auto'
    },
    icontaxi: {
        marginTop: theme.spacing() * 9,
        marginRight: theme.spacing() * 10,
        height: '300px',
        borderRadius: '50%',
        width: '300px',
        [theme.breakpoints.only('xs')]: {
            marginRight: 0,
            height: '200px',
            width: '200px'
        }
    }
}));

export default useStyles