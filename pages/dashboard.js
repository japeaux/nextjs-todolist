import { Avatar, Box, Container, Grid, IconButton, Typography } from '@mui/material'
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react'

// import TodoList from '../components/TodoList'
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
import BeeTenderzForm from '../components/modules/views/BeeTenderzForm';

import RequestList from '../components/FeedHome/RequestsList'
import TopModels from '../components/FeedHome/TopModels';
import MKBox from '../components/MKBox';
import MKTypography from '../components/MKTypography';
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
       <BeeTenderzForm>
          
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <RequestList  todosProps={todosProps}/>
            </Grid>

            <Grid item xs={4}>
              <TopModels/>
            </Grid>
          </Grid>

          {/* <TodoList  todosProps={todosProps}/> */}


      </BeeTenderzForm>
      
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
