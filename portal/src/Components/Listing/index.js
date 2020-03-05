import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';
import { getFormattedString } from 'Helper';
import useStyles from './style';

const Listing = (props) => {
    const classes = useStyles();

    const { data, keys, limit } = props;

    if (limit && (data.data || []).length >= limit) {
        data.data = (data.data || []).slice(0, limit);
    }

    if (data.loading) {
        return (
            <div>
                Loading Data...
            </div>
        )
    }

    if (!data.loading && data.error) {
        return (
            <div>
                Something Went Wrong....
            </div>
        )
    }
    
    return (
        <div>
        <Table>
            <TableHead>
                <TableRow>
                    {Object.values(keys || {}).map((element, key) => (
                        <TableCell key={key}>
                            {getFormattedString(element)}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {(data.data || []).map((element, index) => (
                    <TableRow className={classes.listContainer} onClick={()=>props.onClick?props.onClick(element):()=>{}}>
                        {Object.keys(keys || {}).map((d, key) => (
                            <TableCell key={key}>{getFormattedString(element[d])}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        {!data.loading && data.data && !data.data.length && (
            <Typography style={{textAlign:'center'}} color="textSecondary" variant="body1">No Data found</Typography>
        )}
        </div>
    )
}

export default Listing;