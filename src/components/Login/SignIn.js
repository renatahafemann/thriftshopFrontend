
import React, {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Kid's thrift store
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    green: {
      main: '#008b8b',
      contrastText: '#FFF'            
    },
  },
});


export default function SignIn({onLogin}) {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState(''); 
    const [authenticated, setAuthenticated ] = useState(false);    
    
    let handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          let res = await fetch("/clients/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
          });
          
          const data = await res.json();
          if (res.status === 200) {                       
            const clientId = data.id;  
            const firstName = data.firstName;        
            onLogin({email, clientId, firstName});
            setAuthenticated(true);
            
          } else {            
            setEmailError(data.message);              
          }
        } catch (err) {
          console.log(err);
        }
      };

    let checkError = async (e) => {
        e.preventDefault();

        try {
          let res = await fetch("/verification/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify({               
                email: email,
                password: password,
            }),
          });
          const data = await res.json();
            if(data.fieldErrors) {
              data.fieldErrors.forEach(fieldError => {
                if(fieldError.field === 'email'){
                  setEmailError(fieldError.message);            
                }   
                if(fieldError.field === 'password'){
                  setPasswordError(fieldError.message);
                }               
              });
            } else {     
              handleSubmit(e);       
            }          
        }
         catch (err) {
          console.log(err);
        }
      };

      if(authenticated){
        return <Navigate replace to="/"/>;
      } else{

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="themeColor">
            Sign in
          </Typography>
          <Box component="form" onSubmit={checkError} sx={{ mt: 1 }}>
          { emailError ? <span style={{ color: 'red', fontSize: '12px'}}>{emailError}</span> : '' }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="green"
              type="text"
              value={email}
              onChange={(e) => {setEmail(e.target.value); setEmailError('')}}
            />
            { passwordError ? <span style={{ color: 'red', fontSize: '12px'}}>{passwordError}</span> : '' }
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              color="green"
              id="password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
            />
            <Button
              type="submit"
              fullWidth
              color="green"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item className="themeColor">
                <Link href="/signup" variant="body2" >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )};
}
