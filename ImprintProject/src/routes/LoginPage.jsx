
import { SiAnki } from "react-icons/si";

import pic from "/Images/imprintLogo.jpg"
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log("Logged in");
  };

  return (
        <>
        <div className="random">
          
    <header className="loginHeader">

<div className="ankiLogo">
  <div className='NamePart'>
    <div className="ankiNameLogin">Anki Web</div>

    <SiAnki size={24}/>
  </div>
  <div>

  </div>
</div>
<div className="signUp">

<button type="button" class="btn btn-primary">Sign Up</button>
</div>
</header>
<div className="login-container">
<div className="login-left">
<img 
 src={pic}
 alt="Login Illustration" 
 className="login-image" 
/>
</div>
<div className="login-right">
<Box>
 <Typography variant="h4" gutterBottom className="login-title">
   Login
 </Typography>
 <div className="loginInfo">
   Log into your existing Account
 </div>
 <TextField
   label="Email"
   variant="outlined"
   fullWidth
   value={email}
   onChange={(e) => setEmail(e.target.value)}
   margin="normal"
   className="login-field"
 />
 <TextField
   label="Password"
   type="password"
   variant="outlined"
   fullWidth
   value={password}
   onChange={(e) => setPassword(e.target.value)}
   margin="normal"
   className="login-field"
 />
 <Button
   variant="contained"
   color="primary"
   onClick={handleLogin}
   fullWidth
   className="login-button"
 >
   Login
 </Button>

 <div className="ResetPass">
   <a href="#">Reset Password</a>
 </div>
</Box>
</div>
</div>
        </div>
    </>
  );
};

export default LoginPage;
