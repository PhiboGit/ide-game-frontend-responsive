import { Box, FormControl, FormHelperText, Input, InputLabel, TextField, Button } from '@mui/material';
import React from 'react';
import AuthInput from './AuthInput';
import { useAuth } from '../../AuthContextProvider';

export default function Login() {
  const {login} = useAuth();

  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      
        <AuthInput id="username" label="Username"/>
        <AuthInput id="password" label="Password"/>
        <Button onClick={login} variant='contained' color='primary'>Login</Button>
      
    </Box>
  )
}