import { Grid } from '@mui/material'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase'
import RequestItemList from './RequestItemList'

const TodoList = ({todosProps}) => {

    const [todos, setTodos] = useState(JSON.parse(todosProps))

    useEffect(()=>{
      setTodos(JSON.parse(todosProps))
      console.log(todos.idUser)
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
        <div>
            {todos.map((todo, index) => (
                    <RequestItemList key={todo.id}
                        id={todo.id} 
                        title={todo.title}
                        details={todo.details}
                        timestamp={todo.timestamp}
                        photoURL={todo.photoURL} 
                        displayName={todo.displayName}
                        email={todo.email}
                        idUser={todo.idUser}/>
            ))}
        </div>
    )
}

export default TodoList
