import { Container, Paper, Typography, Box, Tab, Tabs, Button, styled } from "@mui/material"
import React, { createContext, useContext, useState } from "react"
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "../../AuthContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function LoginRegisterTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Login"/>
          <Tab label="Register"/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Login />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Register />
      </CustomTabPanel>
    </>
  )
}

const LogoutButtonStyle = styled('button')(({ theme }) => ({
  background: 'transparent',
  border: 'none',
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontSize: '.875rem',

  '&:hover': {
    
    textDecoration: `underline ${theme.palette.primary.main}`,
    
  }
}))

export function LogoutButton(){
  const {logout} = useAuth()

  return <LogoutButtonStyle onClick={logout}>Logout</LogoutButtonStyle>
}

function WelcomePlayLogout() {
  const {logout} = useAuth()
  const navigate = useNavigate();

  function play(){
    navigate('/game')
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} padding={"2rem"} height={"100%"}>
      <Typography variant="h5">Welcome Back!</Typography>
      <Typography variant="h5">Phibo</Typography>
      <Button 
        onClick={play} 
        variant='contained' 
        color='primary' 
        size="large" 
        style={{ padding: '1rem 5rem', fontSize: '1.5rem', marginTop: '2rem', marginBottom: 'auto' }}
      >
        Play
      </Button>   
      <LogoutButton />
    </Box>
  )
}

export default function AuthComponent() {

  const { isLoggedIn } = useAuth();

  return (
  <Paper style={{width: '350px', height: '380px', alignSelf: 'center'}}>
    {isLoggedIn ? <WelcomePlayLogout /> : <LoginRegisterTab />}
  </Paper>
  )
}

