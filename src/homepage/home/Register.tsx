import React from 'react';
import { Box, FormControl, FormHelperText, Input, InputLabel, TextField, Button, styled } from '@mui/material';
import { TextFieldProps } from '@mui/material';
import AuthInput from './AuthInput';



export default function Register() {
  return (
    
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      
        <AuthInput id="character" label="Character name"/>
        <AuthInput id="username" label="Username / Login name"/>
        <AuthInput id="password" type='password' label="Password"/>
        <AuthInput id="password-confirm" type='password' label="Password Confirmation"/>
        <Button variant='contained' color='primary'>Register</Button>
      
    </Box>
  )
}