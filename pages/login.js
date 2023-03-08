
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useAuth } from '../Auth';
import { useRouter } from 'next/router'

import imgBack from '../public/ico.svg'

import Image from "next/image";
import AppAppBar from '../components/modules/views/AppAppBar';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
      BeeTenderz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function SignInSide() {
  const {  login, currentUser } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    if(checked){
      try {
        console.log(data.get('email'),"dosodjso")
        await login( data.get('email'), data.get('password'))
        .then((userCredential) => {
          // Login 
          console.log(userCredential,"userCredential")
          console.log("is verifi", userCredential.user.emailVerified)

          if(userCredential.user.emailVerified){
            router.push('/dashboard')
          }else{
            showAlert('error',`Verify your email to confirm your account`)
          }
          
        })
  
       
      } catch (err) {
        console.log("err", err)
      }
    }else{
      showAlert('error',`You must be older than 18 years old to access this site`)
    }
    
  }

  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    console.log(checked)
  };

  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [open, setOpen] = useState(false)

  const showAlert = (type,msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }

  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  React.useEffect(()=>{
    console.log("currentUser?.email", currentUser?.email,currentUser)
    if(currentUser?.email){
      router.push('/dashboard')
    }
  },[])
  
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/assets/beetenderzz.svg)',
          
             backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      
       
          {/* <Image
            src={imgBack}
            alt="Picture of the author"
          /> */}
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ backgroundColor:'#111'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'white' }}>
       
                  
              <Image
                src={imgBack}
                alt="Picture of the author"
              />

              
            </Avatar>
            <Typography component="h1" variant="h5" color="primary"> 
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                color="primary"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="primary"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary"  
                onChange={handleChange}/>}
                label={<Typography component="body1" variant="h5"  sx={{ fontSize: 14 }}  color="primary">I am 18 years of age or older</Typography>}
                color="primary"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="secondary"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2" color="primary">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} color="primary"/>
            </Box>
          </Box>

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
            <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>

          
        </Grid>
      </Grid>
    </>
  );
}