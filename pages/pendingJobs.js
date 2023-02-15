import {  Container } from '@mui/material'
import { db } from '../firebase';
import { useState } from 'react'

import { TodoContext } from '../TodoContext'


import { useAuth } from '../Auth';

import { verifyIdToken } from '../firebaseAdmin';
import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import nookies from 'nookies'

import AppInsideBar from '../components/modules/views/AppInsideBar';
import withRoot from '../components/modules/withRoot';
import AppFooter from '../components/modules/views/AppFooter';
import AppForm from '../components/modules/views/AppForm';
import PendingList from '../components/PendingList';



function PendingJobs({todosProps}) {
  const {currentUser} = useAuth()
  const [open,setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [todo, setTodo] = useState({title:'',details:''})


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
      
      <AppForm>
      
        <Container maxWidth="sm">
          
          <AppInsideBar />
        
          <PendingList  todosProps={todosProps}/>

        </Container>

      </AppForm>
      
      <AppFooter />
    </TodoContext.Provider>
    
    )
}

export default withRoot(PendingJobs)

export async function getServerSideProps(context){
  try{
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const { email } = token;
    const collectionRef = collection(db, "pending")
    const q = query(collectionRef, where("email","==",email),orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q)
    let todos = []
    querySnapshot.forEach((doc)=>{
      todos.push({...doc.data(), id:doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
    })
    return {
      props: {
        todosProps: JSON.stringify(todos) || [],
      }
    }
  } catch(error){
    return { props:{}}
  }
}
