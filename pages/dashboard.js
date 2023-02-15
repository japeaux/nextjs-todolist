import { Avatar, Box, Container, IconButton, Typography } from '@mui/material'
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { auth, db } from '../firebase';
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { TodoContext } from './TodoContext'

import UploadFile from '../components/storage/UploadFile';

import { useAuth } from '../Auth';

import { verifyIdToken } from '../firebaseAdmin';
import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import nookies from 'nookies'

import Layout from '../components/Layout'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import {useRouter} from 'next/router'

import * as XLSX from "xlsx";
import AppInsideBar from './modules/views/AppInsideBar';
import withRoot from './modules/withRoot';
import Toolbar from './modules/components/Toolbar';
import AppFooter from './modules/views/AppFooter';
import AppForm from './modules/views/AppForm';



function Home({todosProps}) {
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

  const router = useRouter();

  const OpenChat = async (e) =>{
      e.stopPropagation();
      router.push(`/Chat`)
  }


  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
       <AppForm>
       <AppInsideBar />
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
