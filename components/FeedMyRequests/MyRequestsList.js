import { Grid } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Auth'
import { db } from '../../firebase'
import MyRequestItemList from './MyRequestItemList'

const MyRequestList = ({todosProps}) => {

    const [todos, setTodos] = useState(JSON.parse(todosProps))
    const {currentUser} = useAuth()
    useEffect(()=>{
      setTodos(JSON.parse(todosProps))
      console.log(todos.idUser)
    },[])

    useEffect(()=>{
        const collectionRef = collection(db, "todo")
        const q = query(collectionRef, where("email","==",currentUser?.email),orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            setTodos(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        return unsubscribe;
    },[])
    
    return (
        <div>
            {todos.map((todo, index) => (
                <Grid item xs={2} sm={4} md={4} key={index} >
                    <MyRequestItemList key={todo.id}
                        id={todo.id} 
                        title={todo.title}
                        details={todo.details}
                        timestamp={todo.timestamp}
                        photoURL={todo.photoURL} 
                        displayName={todo.displayName}
                        email={todo.email}
                        idUser={todo.idUser}/>
                </Grid>
            ))}
        </div>
    )
}

export default MyRequestList
