import { Box, FormControl, FormHelperText, Input, InputLabel, TextField, Button } from '@mui/material';
import React from 'react';
import AuthInput from './AuthInput';
import { useAuth } from '../../AuthContextProvider';

export default function Login() {
  const {login} = useAuth();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  function onLogin() {
    login(username, password)
  }
  return (
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      
        <AuthInput id="username" label="Username" onChange={(event) => setUsername(event.target.value)}/>
        <AuthInput id="password" label="Password" type='password' onChange={(event) => setPassword(event.target.value)}/>
        <Button onClick={onLogin} variant='contained' color='primary'>Login</Button>
      
    </Box>
  )
}