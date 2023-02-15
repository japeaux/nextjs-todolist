import * as React from 'react';
import Typography from './modules/components/Typography';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import withRoot from './modules/withRoot';
import AppInsideBar from './modules/views/AppInsideBar';
import { Alert, Snackbar } from '@mui/material';
import TodoForm from '../components/TodoForm';
import { TodoContext } from './TodoContext'
import { useState } from 'react'


const Request = () => {
  
  //const [birthday, setBirthday] = React.useState();
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [open, setOpen] = useState(false)

  const validate = (values) => {
    const errors = required(['title', 'details', 'cost'], values);

    return errors;
  };

  // const handleSubmit = (values) => {
  //   //setSent(true);
  //   console.log(values)

  // };
  const [todo, setTodo] = useState({title:'',details:'', cost:0})

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

export default withRoot(Request)