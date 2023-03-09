import * as React from 'react';
import Typography from '../components/modules/components/Typography';
import AppForm from '../components/modules/views/AppForm';
import { email, required } from '../components/modules/form/validation';
import withRoot from '../components/modules/withRoot';
import AppInsideBar from '../components/modules/views/AppInsideBar';
import { Alert, Snackbar } from '@mui/material';
import TodoForm from '../components/TodoForm';
import { TodoContext } from '../TodoContext'
import { useState } from 'react'
import BeeTenderzForm from '../components/modules/views/BeeTenderzForm';
import CreateForm from '../components/CreateRequest/CreateForm';


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

  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
    
      <AppInsideBar />
      
      
      <BeeTenderzForm>
        
          <Typography variant="h3" gutterBottom marked="center" align="center" color="primary">
            Create a new request
          </Typography>
          <Typography variant="body2" align="center" color="primary">
            When creating a request BeeTenderz will lock the cost of the request for security and once the model send the file it will deducted from the account, if you cancel the request create BeeTenderz will refund your tokens. 
          </Typography>
        
        <CreateForm/>


        {/* <TodoForm/> */}

      </BeeTenderzForm>
        
      
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
        <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>


     
    </TodoContext.Provider>
  );
}

export default withRoot(Request)