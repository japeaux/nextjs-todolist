import { TextField, Button, Box, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment } from '@mui/material'
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef } from 'react'
import { Form, FormSpy } from 'react-final-form'
import { useAuth } from '../Auth'
import { db } from '../firebase'
import FormButton from '../pages/modules/form/FormButton'
import { TodoContext } from '../pages/TodoContext'

const TodoForm = () => {

    const inputAreaRef = useRef();
    const {currentUser} = useAuth()

    const {showAlert, todo, setTodo} = useContext(TodoContext)

    // const [title, setTitle] = React.useState('Cat in the Hat');
    // const [details, setDetail] = React.useState('Cat in the Hat');
    // const [cost, setCost] = React.useState(20);


    // const [sent, setSent] = React.useState(false);
    // const [alertType, setAlertType] = React.useState("success")
    // const [alertMessage, setAlertMessage] = React.useState("")
    // const [open,setOpen] =  React.useState(false)

    const router = useRouter()


    const onSubmit = async () =>{
      console.log(todo)
      // if(todo?.hasOwnProperty('timestamp')){
      //     //update
      //   const docRef  = doc(db,"todo",todo.id)
      //   const todoUpdated = {...todo, timestamp:serverTimestamp()}
      //   updateDoc(docRef,todoUpdated)
      //   setTodo({title:'', details:''})
      //   showAlert('info',`Todo with id ${todo.id} updated successfully`)

      // }else{
        const collectionRef = collection(db,"todo")
        const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), displayName:currentUser.displayName, photoURL:currentUser.photoURL })

        setTodo({title:'', details:''})
        showAlert('success',`New request has been added successfully`)
        router.push('/dashboard')
      //}

      
    }

    const validate = (values) => {
      // const errors = required(['title', 'details', 'cost'], values);
  
      // if (!errors.email) {
      //   const emailError = email(values.email);
      //   if (emailError) {
      //     errors.email = emailError;
      //   }
      // }
  
      // return errors;
    };

    // useEffect(()=>{
    //   const checkIfClickedOutside = e => {
    //     if(!inputAreaRef.current.contains(e.target)){
    //       console.log('Outside input area')
    //       setTodo({title:'',details:''})
    //     }else{
    //       console.log('Inside input area')
    //     }
    //   }
    //   document.addEventListener("mousedown",checkIfClickedOutside)
    //   return ()=>{
    //     document.removeEventListener("mousedown",checkIfClickedOutside)
    //   }
    
    // },[])

  return (
    <div ref={inputAreaRef}>

        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ onSubmit: handleSubmit2, submitting }) => (
            <Box component="form" onSubmit={handleSubmit2} noValidate sx={{ mt: 6 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
              
                  <TextField
                    required
                    id="outlined-required"
                    label="Title"
                    value={todo.title}
                    onChange={e=>setTodo({...todo,title:e.target.value})}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  {/* <Field
                      autoFocus
                      component={RFTextField}
                      disabled={submitting || sent}
                      autoComplete="cost"
                      fullWidth
                      label="Cost"
                      name="cost"
                      required
                    /> */}

                  <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Cost"
                      type="number"
                      value={todo.cost}
                      onChange={e=>setTodo({...todo,cost:e.target.value})}
                    />
                  </FormControl>

            
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                id="outlined-multiline-static"
                label="Description of job"
                multiline
                rows={10}
                value = {todo.details}
                onChange={e=>setTodo({...todo,details:e.target.value})}
              />
                  </FormControl>
             
              {/* <Field
   
                component={RFTextField}
                disabled={submitting || sent}
                fullWidth
                label="Description"
                margin="normal"
                name="description"
                required
              /> */}
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback error sx={{ mt: 2 }}>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              {/* <FormButton
                sx={{ mt: 3, mb: 2 }}
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Post'}
              </FormButton> */}
            </Box>
          )}
        </Form>


      {/* <pre>{JSON.stringify(todo,null,'\t')}</pre> */}
        {/* <TextField label = "title" margin="normal" fullWidth
        value={todo.title}
        onChange={e=>setTodo({...todo,title:e.target.value})}/>
        <TextField label = "details" multiline maxRows={4} fullWidth
        value = {todo.details}
        onChange={e=>setTodo({...todo,details:e.target.value})}/> */}
        <Button sx={{ mt: 3, mb: 2 }} fullWidth color="secondary" variant = "contained" onClick={onSubmit}>POST
            
        </Button>
    </div>
  )
}

export default TodoForm