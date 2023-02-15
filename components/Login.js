import { Button, Grid } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

import { useRouter } from 'next/router'

const Login = () => {
  const router = useRouter()
    const loginWithGoogle = () =>{
        signInWithPopup(auth,provider)
    }

    const SignUp=()=>{
      router.push(`/register`)
      console.log("doasdiojajiodjiaosjiodjioas")

  }




  return (
    <Grid 
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{minHeight:'100vh'}}>

      <Button variant="contained" onClick={SignUp}>Sign  up</Button>

      <Button variant="contained" startIcon={<GoogleIcon />} onClick={loginWithGoogle}>Sign in Google</Button>
    </Grid>
  )
}

export default Login