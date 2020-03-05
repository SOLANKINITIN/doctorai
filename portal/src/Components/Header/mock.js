import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import LocalHospital from '@material-ui/icons/LocalHospital';

export const UserRoutes = [
    {
        title:'Home',
        icon:<HomeIcon />,
        url:'/',
    },
    {
        title:'Neary by Hospital',
        icon:<LocalHospital />,
        url:'/hospital',
    },
]