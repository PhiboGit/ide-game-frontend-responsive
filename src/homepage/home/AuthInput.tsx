import React from 'react';
import { Box, FormControl, FormHelperText, Input, InputLabel, TextField, Button, styled } from '@mui/material';
import { TextFieldProps } from '@mui/material';


const AuthInputStyle = styled(TextField)(({ theme }) => ({
  
}))

export default function AuthInput({...props}: TextFieldProps) {
  return (
    <AuthInputStyle 
      variant='filled' 
      size='small' 
      inputProps={{style: {fontSize: '.875rem'}}} 
      InputLabelProps={{style: {fontSize: '.875rem'}}} 
      {...props} />
  )
}