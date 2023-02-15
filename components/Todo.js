import {  Card, CardContent, IconButton, ListItem, ListItemText, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import React, { useContext } from 'react'
import { TodoContext } from '../TodoContext';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import {useRouter} from 'next/router'
import { Box } from '@mui/system';


const Todo = ({id, timestamp, title, details}) => {

  const router = useRouter();

  const seeMore = async (id,e) =>{
    e.stopPropagation();
    console.log
    router.push(`/requests/${id}`)

  }


  return (
    <>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }} mt={3}>

        <Card sx={{minWidth:275, boxShadow:3, maxWidth:500}}  style={{backgroundColor:'#fafafa'}}>

          <CardContent >
            <IconButton
                  onClick={e=>seeMore(id,e)}
                >
              {/* <Avatar sx={{ width: 56, height: 56 , alignItems:'center', alignSelf:'center'}} src={photoURL} /> */}
           
            <Typography variant="h5" gutterBottom marked="center" align="center" >
              {title}
            </Typography>
            </IconButton>

            <Typography variant="h3" gutterBottom marked="center" align="center">
              {/* {userName} */}
            </Typography>

            <Typography variant="body2" align="center">
              {moment(timestamp).format("MMM Do, YYYY")}
            </Typography>

            <Typography variant="h5" gutterBottom marked="center" align="center" >
              {details}
            </Typography>

          </CardContent>
        </Card>


            {/* <ListItem onClick={()=>setTodo({id, timestamp, title, details})}
                sx={{mt:1, boxShadow:3}}
                style={{backgroundColor:'#FAFAFA'}}
                secondaryAction={
                  <>
                    <IconButton  onClick={e=>seeMore(id,e)}>
                      <MoreVertIcon />
                    </IconButton>
                  </>
                }>
                  <ListItemText 
                  primary={title}
                  secondary={moment(timestamp).format("MMM Do, YYYY")}
                  
                  />
          </ListItem> */}
      </Box>
    </>
   
  )
}

export default Todo