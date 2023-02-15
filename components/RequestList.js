import { Grid } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth'
import { db } from '../firebase'
import RequestItem from './RequestItem'

const RequestList = ({todosProps}) => {
    const [myrequests, setMyrequests] = useState([])
    const {currentUser} = useAuth()

    useEffect(()=>{
      //console.log(todosProps)
      if(todosProps){
        setMyrequests(JSON.parse(todosProps))
      }
      
    },[])

    useEffect(()=>{
        const collectionRef = collection(db, "todo")
        const q = query(collectionRef, where("email","==",currentUser?.email),orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
          setMyrequests(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        console.log(myrequests, "124123412434")
        return unsubscribe;
    },[])
  return (
    // <div>
    //     {todos.map(todo => <Todo key={todo.id}
    //        id={todo.id} 
    //        title={todo.title}
    //        details={todo.details}
    //        timestamp={todo.timestamp} />)}
    // </div>

    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    {myrequests.map((todo, index) => (
      <Grid item xs={2} sm={4} md={4} key={index}>
        <RequestItem key={todo.id}
           id={todo.id} 
           title={todo.title}
           details={todo.details}
           timestamp={todo.timestamp} />
      </Grid>
    ))}
    </Grid>


  )
}

export default RequestList
