import { Button, Grid } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth'
import { db } from '../../firebase'
import PendingItem from './PendingItem'

const PendingList = ({todosProps}) => {
    const [myrequests, setMyrequests] = useState([])
    const {currentUser} = useAuth()

    useEffect(()=>{
      console.log(todosProps)
      if(todosProps){
        setMyrequests(JSON.parse(todosProps))
      }
      
    },[])

    useEffect(()=>{
        const collectionRef = collection(db, "pending")
        const q = query(collectionRef, where("email","==",currentUser?.email),orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
          setMyrequests(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        console.log(myrequests, "pending")
        return unsubscribe;
    },[])


    const onSend = async () =>{
      console.log(myrequests, "pending")

    }
  


  return (

    <div>
      {myrequests.map((todo, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <PendingItem key={todo.id}
            id={todo.id} 
            title={todo.title}
            details={todo.details}
            timestamp={todo.timestamp} />
        </Grid>
      ))}
    </div>
    


  )
}

export default PendingList
