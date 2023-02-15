
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import withRoot from './modules/withRoot';
import TextField from '@mui/material/TextField';
import { useAuth } from '../Auth';
import { useRouter } from 'next/router'
import AppInsideBar from './modules/views/AppInsideBar';
import { Alert, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Snackbar } from '@mui/material';
import TodoForm from '../components/TodoForm';
import { TodoContext } from './TodoContext'

const request = () => {
  const [sent, setSent] = React.useState(false);
  const {  signup } = useAuth()
  const router = useRouter()
  const [data, setData] = React.useState({
    email: '',
    password: '',
  })
  //const [birthday, setBirthday] = React.useState();
  const [alertType, setAlertType] = React.useState("success")
  const [alertMessage, setAlertMessage] = React.useState("")
  const [open,setOpen] =  React.useState(false)

  const validate = (values) => {
    const errors = required(['title', 'details', 'cost'], values);

    return errors;
  };

  // const handleSubmit = (values) => {
  //   //setSent(true);
  //   console.log(values)

  // };
  const [todo, setTodo] = React.useState({title:'',details:'', cost:0})

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


  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  




  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
    <React.Fragment>
      <AppInsideBar />
      
      
      <AppForm>
        
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Create a new request
          </Typography>
          <Typography variant="body2" align="center">
   
          </Typography>
        </React.Fragment>
        
        <TodoForm/>

      </AppForm>
        
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>


     
    </React.Fragment>
    </TodoContext.Provider>
  );
}

export default withRoot(request)