import { db } from '../firebase';
import { useState } from 'react'

import { TodoContext } from '../TodoContext'


import { useAuth } from '../Auth';

import { verifyIdToken } from '../firebaseAdmin';
import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import nookies from 'nookies'

import withRoot from '../components/modules/withRoot';
import PendingList from '../components/FeedPendingJobs/PendingList';
import BeeTenderzForm from '../components/modules/views/BeeTenderzForm';



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
    // <TodoContext.Provider value={{showAlert, todo, setTodo}}>
      
    //   <AppForm>
      
    //     <Container maxWidth="sm">
          
    //       <AppInsideBar />
        
    //       <PendingList  todosProps={todosProps}/>

    //     </Container>

    //   </AppForm>
      
    //   <AppFooter />
    // </TodoContext.Provider>
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
      <BeeTenderzForm>
        <PendingList  todosProps={todosProps}/>
        
        {/* <TodoList  todosProps={todosProps}/> */}

    </BeeTenderzForm>
    
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
