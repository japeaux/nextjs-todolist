
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/modules/components/Typography';
import AppAppBar from '../components/modules/views/AppAppBar';

import BeeTenderzForm from '../components/modules/views/BeeTenderzForm';
import { email, required } from '../components/modules/form/validation';
import RFTextField from '../components/modules/form/RFTextField';
import FormButton from '../components/modules/form/FormButton';
import FormFeedback from '../components/modules/form/FormFeedback';
import withRoot from '../components/modules/withRoot';
import { useAuth } from '../Auth';
import { useRouter } from 'next/router'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Alert, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Snackbar } from '@mui/material';
import { useState } from 'react';


function Register() {
  const [sent, setSent] = useState(false);
  const {  signup, setUserFrom, sendEmailForVerification, sendEmailToVerify, getUserInfos } = useAuth()
  const router = useRouter()


  const [value, setValue] = useState('client');

  const handleChange = (event) => {
    setValue(event.target.value);
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





  //const [birthday, setBirthday] = React.useState();

  const validate = (values) => {
    const errors = required(['displayName', 'email', 'password','birthday'], values);

    if (!errors.email) {
      const emailError = email(values.email);
      if (emailError) {
        errors.email = emailError;
      }
    }

    return errors;
  };

  const handleSubmit = async (values) => {
    // e.preventDefault()
    // const data = new FormData(e.currentTarget);
    try {
       await signup(values.email, values.password, values.birthday, values.displayName).then((userCredential) => {
        // Signed in 
        console.log("userCredential", userCredential)
        const usersRef = collection(db,"users");
        const userData = {
          displayName:values.displayName,
          email:values.email,
          lastSeen:serverTimestamp(),
          photoURL:null,
          description:null,
          birthday:values.birthday,
          emailVerificado:false,
          typeOfUser:value,
          contaVerificada:false,
      }
    
      addDoc(usersRef,userData)
      //  setUserFrom(userData)
      sendEmailForVerification()
       //sendEmailToVerify(userData)
      // getUserInfos()
        // ...
      })
        showAlert('success',`We have send you an email for verification`)
        router.push('/login')
    } catch (err) {
      console.log("err", err)
      if(err.code == "auth/email-already-in-use"){
        showAlert('error',`Email already in use`)
    }
    }

  }




  return (
    <>
      <AppAppBar />
      <BeeTenderzForm>
      <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center"  color="primary">
            Register
          </Typography>
          <Typography variant="body2" align="center"  color="primary">
            <Link href="/login/" underline="always">
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={handleSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="given-name"
                    fullWidth
                    label="Username"
                    name="displayName"
                    required
                    color="primary"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                    <Field
                    component={RFTextField}
                    disabled={submitting || sent}
                    autoComplete="birthday"
                    fullWidth
                    label="Birthday"
                    name="birthday"
                    required
                    type='date'
                  />
                </Grid>
              </Grid>

        
               
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="new-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group"  color="primary">I want to:</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                  color="primary"
                >
                  <FormControlLabel value="client" control={<Radio />} label={<Typography component="body1" variant="h5"  sx={{ fontSize: 14 }}  color="primary">Be a Member</Typography>}/>
                  <FormControlLabel value="model" control={<Radio />} label={<Typography component="body1" variant="h5"  sx={{ fontSize: 14 }}  color="primary">Be a Model for BeeTenderz</Typography>}/>
                </RadioGroup>
              </FormControl>


              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </Box>
          )}
        </Form>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
            <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
              {alertMessage}
            </Alert>
          </Snackbar>


      </BeeTenderzForm>
      
    </>
  );
}

export default withRoot(Register);