import { Avatar, Box, Container, IconButton, Typography } from '@mui/material'
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react'

import TodoList from '../components/TodoList'
import { TodoContext } from '../TodoContext'

import { useAuth } from '../Auth';

import { verifyIdToken } from '../firebaseAdmin';
import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import nookies from 'nookies'

import {useRouter} from 'next/router'

import AppInsideBar from '../components/modules/views/AppInsideBar';
import withRoot from '../components/modules/withRoot';
import Toolbar from '../components/modules/components/Toolbar';
import AppFooter from '../components/modules/views/AppFooter';
import AppForm from '../components/modules/views/AppForm';



function Home({todosProps}) {
  const {currentUser} = useAuth()
  const [open,setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [todo, setTodo] = useState({title:'',details:''})

  // useEffect(()=>{
  //   console.log(todosProps)
  // },[])

  const showAlert = (type,msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }

  const router = useRouter();

  const OpenChat = async (e) =>{
      e.stopPropagation();
      router.push(`/Chat`)
  }


  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
       <AppForm>
        <Container maxWidth="sm">
         

          <Box sx={{display:'flex', justifyContent:'space-between'}} mt={1}>
            
          </Box>
        
          <TodoList  todosProps={todosProps}/>

        </Container>

      </AppForm>
      
      <AppFooter />
    </TodoContext.Provider>
    
    )
}

export default withRoot(Home)

export async function getServerSideProps(context){
  try{
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const { email } = token;
    const collectionRef = collection(db, "todo")
    const q = query(collectionRef,orderBy("timestamp", "desc"));
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
