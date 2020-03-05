import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import clsx from 'clsx';

const InputComponent = ({ Icon,style, ...rest }) => {
  const InputProps = Boolean(Icon) ? {
    startAdornment: (
      <InputAdornment position="start">
        <Icon style={{ color: "#7563FF" }} />
      </InputAdornment>
    )
  } : {};
  return (
    <TextField
      {...rest}
      fullWidth
      InputProps={{ ...InputProps }}
      style={{marginTop:10,marginBottom:10,...style}}
    />
  )
}

export default InputComponent;