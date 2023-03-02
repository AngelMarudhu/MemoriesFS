import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const GeneralInput = ({
  name,
  handleChange,
  label,
  half,
  autoFocus,
  type,
  handleShowPassword,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        label={label}
        variant='outlined'
        fullWidth
        required
        autoFocus={autoFocus}
        onChange={(e) => handleChange(e)}
        type={type}
        inputProps={
          name === 'Password' && {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={handleSubmit}>
                  {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      ></TextField>
    </Grid>
  );
};

export default GeneralInput;
