
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../components/modules/components/Typography';
import AppFooter from '../components/modules/views/AppFooter';
import AppAppBar from '../components/modules/views/AppAppBar';
import AppForm from '../components/modules/views/AppForm';
import { email, required } from '../components/modules/form/validation';
import RFTextField from '../components/modules/form/RFTextField';
import FormButton from '../components/modules/form/FormButton';
import FormFeedback from '../components/modules/form/FormFeedback';
import withRoot from '../components/modules/withRoot';
import TextField from '@mui/material/TextField';
import { useAuth } from '../Auth';
import { useRouter } from 'next/router'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';


function Register() {
  const [sent, setSent] = React.useState(false);
  const {  signup, setUserFrom, sendEmailForVerification, sendEmailToVerify, getUserInfos } = useAuth()
  const router = useRouter()
  const [data, setData] = React.useState({
    email: '',
    password: '',
  })


  const [value, setValue] = React.useState('client');

  const handleChange = (event) => {
    setValue(event.target.value);
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
        alert("We have send you an email for verification")
       router.push('/login')
    } catch (err) {
      console.log("err", err)
      if(err.code == "auth/email-already-in-use"){
        alert("Email already in use")
    }
    }

  }




  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Register
          </Typography>
          <Typography variant="body2" align="center">
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
                <FormLabel id="demo-controlled-radio-buttons-group">I want to:</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel value="client" control={<Radio />} label="Be a Member" />
                  <FormControlLabel value="model" control={<Radio />} label="Be a Model for EPM " />
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
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Register);