import { Grid } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth'
import { db } from '../firebase'
import RequestItemList from './RequestItemList'
import Todo from './Todo'

const TodoList = ({todosProps}) => {
    const [todos, setTodos] = useState([])
    const {currentUser} = useAuth()

    useEffect(()=>{
      //console.log(todosProps)
      setTodos(JSON.parse(todosProps))
    },[])

    useEffect(()=>{
        const collectionRef = collection(db, "todo")
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
            setTodos(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
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
  <div>
    {/* <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {todos.map((todo, index) => (
        <Grid item xs={2} sm={1} md={4} key={index}>
          <Todo key={todo.id}
            id={todo.id} 
            title={todo.title}
            details={todo.details}
            timestamp={todo.timestamp} />
        </Grid>
      ))}
      </Grid> */}

<div>
    {todos.map((todo, index) => (
      <Grid item xs={2} sm={4} md={4} key={index} >
        <RequestItemList key={todo.id}
            id={todo.id} 
            title={todo.title}
            details={todo.details}
            timestamp={todo.timestamp}
            photoURL={todo.photoURL} 
            displayName={todo.displayName}
            email={todo.email}/>
      </Grid>
    ))}
    </div>
  </div>
   


  )
}

export default TodoList
