import React, { useEffect } from 'react'
import Header from 'Components/Header'
import useStyles from './style';
import { useSelector } from 'react-redux';
import { selectOrderByType } from 'Store/selectors';
import { Listing } from 'Components';

import {fetchOrderByType} from 'Store/action';
import { AuthServices } from 'Services';
const Layout = () => {
    const classes = useStyles();
    const orders = useSelector(selectOrderByType);
    
    useEffect(()=>{
        fetchOrderByType((AuthServices._auth||{})._id);
    },[]);

    return (
        <div className={classes.root}>
            <Header />
            <Listing data={orders} keys={{
                patientName:'Patient Name',
                hospitalName:'Hospital Name',
                hospitalAddress:'Hospital Address',
                orderStatus:'Order Status',
                verificaionCode:'Verification Code'
            }}/>
        </div>
    )
}
export default Layout