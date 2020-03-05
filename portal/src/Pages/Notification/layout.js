import React from 'react';
import useStyles from './style'
import Header from 'Components/Header'

const Layout = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Header title="Notification" />
            Notificaiton Page
         </div>
    )
}

export default Layout