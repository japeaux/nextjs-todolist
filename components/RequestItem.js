import {  IconButton, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import React, { useContext } from 'react'
import { TodoContext } from '../pages/TodoContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {useRouter} from 'next/router'
import { Box } from '@mui/system';
const RequestItem = ({id, timestamp, title, details}) => {

  const {showAlert, setTodo} = useContext(TodoContext)
  const router = useRouter();
  const deleteTodo = async (id,e) =>{
    e.stopPropagation();
    const docRef =  doc(db,"todo",id)
    await deleteDoc(docRef);
    showAlert('error', `Todo with id ${id} deleted successfully`)
  }

  const seeMore = async (id,e) =>{
    e.stopPropagation();
    
    router.push(`/myrequests/${id}`)

  }


  return (
    <>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
      <ListItem onClick={()=>setTodo({id, timestamp, title, details})}
          sx={{mt:1, boxShadow:3}}
          style={{backgroundColor:'#FAFAFA'}}
          secondaryAction={
            <>
              {/* <IconButton onClick={e=>deleteTodo(id,e)}>
                <DeleteIcon />
              </IconButton> */}
              <IconButton  onClick={e=>seeMore(id,e)}>
                <MoreVertIcon />
              </IconButton>
            </>
          }>
            <ListItemText 
            primary={title}
            secondary={moment(timestamp).format("MMM Do, YYYY")}
            
            />
    </ListItem>
      </Box>
    </>
   
  )
}

export default RequestItem