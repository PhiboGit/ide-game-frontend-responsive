import React from 'react';
import { Box, FormControl, FormHelperText, Input, InputLabel, TextField, Button, styled } from '@mui/material';
import { TextFieldProps } from '@mui/material';
import AuthInput from './AuthInput';
import { useAuth } from '../../AuthContextProvider';



export default function Register() {
  const {register} = useAuth();

  const [characterName, setCharacterName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  function onRegister() {
    if (password !== passwordConfirm) {
      console.log("Passwords don't match")
      return
    } 
    register(characterName, username, password)
  }
  return (
    
    <Box display={"flex"} flexDirection={"column"} gap={"1rem"}>
      
        <AuthInput id="character" label="Character name" onChange={(event) => setCharacterName(event.target.value)}/>
        <AuthInput id="username" label="Username / Login name" onChange={(event) => setUsername(event.target.value)}/>
        <AuthInput id="password" type='password' label="Password" onChange={(event) => setPassword(event.target.value)}/>
        <AuthInput id="password-confirm" type='password' label="Password Confirmation" onChange={(event) => setPasswordConfirm(event.target.value)}/>
        <Button variant='contained' color='primary' onClick={onRegister} >Register</Button>
      
    </Box>
  )
}