import {  Avatar, Button, Card, CardActions, CardContent, IconButton, ListItem, ListItemText, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment'
import React, { useContext } from 'react'
import { TodoContext } from '../TodoContext';
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {useRouter} from 'next/router'
import { Box } from '@mui/system';
import { useAuth } from '../Auth';
const Answers = ({id, timestamp, title, details, userName, idUser,photoURL, status}) => {

  const [request, setRequest] = React.useState({id:id, userName:userName, idUser:idUser, photoURL:photoURL, status:status,  title:title, details:details})
  const router = useRouter();
  const {currentUser} = useAuth()
  const deleteTodo = async (id,e) =>{
    e.stopPropagation();
    const docRef =  doc(db,"todo",id)
    await deleteDoc(docRef);
    showAlert('error', `Todo with id ${id} deleted successfully`)
  }

  const seeMore = async (id,e) =>{
    e.stopPropagation();
    
    router.push(`/people/${id}`)

  }
  const seePerson = async (idUser,e) =>{
    e.stopPropagation();
    console.log(idUser)
   router.push(`/people/${idUser}`)

  }

  const onSend = async () =>{
    console.log("todo", request, id)

      const docRef  = doc(db,"requests",id)
      const todoUpdated = {...request, status:"esperando"}
      updateDoc(docRef,todoUpdated)

      


    // setSent(false)
      const collectionRef = collection(db,"pending")
      await addDoc(collectionRef, {...request, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id,  userName:currentUser.displayName, photoURL:currentUser.photoURL, status:"esperando"})

      //showAlert('success',`New request has been added successfully`)
     // router.push('/myrequest')
  }




  return (
    <>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>

          <Card sx={{minWidth:275, boxShadow:3, maxWidth:500}}
                    style={{backgroundColor:'#fafafa'}}>

                    <CardContent >
                      <IconButton
                            onClick={e=>seePerson(idUser,e)}
                          >
                        <Avatar sx={{ width: 45, height: 45 , alignItems:'center', alignSelf:'center'}} src={photoURL} />
                      </IconButton>

                      <Typography variant="h5" gutterBottom marked="center" align="center">
                      {userName}
                      </Typography>

                      <Typography variant="body2" align="center">
                      {moment(timestamp).format("MMM Do, YYYY")}
                      </Typography>

                      <Typography variant="body2" gutterBottom marked="center" align="center" >
                        {details}
                    </Typography>

                    </CardContent>

                       
                          {/* <CardActions>
                          <Link href="/dashboard">
                              <Button size="small">Back to home</Button>
                          </Link>
                      </CardActions> */}
                 {!status ? (
                          <CardActions>
                              <Button size="small">No thank you</Button>
                          
  
                              <Button size="small" onClick={onSend}>Hire</Button>
                      
  
                      </CardActions>
                ):(
                  <Typography variant="body2" align="center">
                    {status}
                  </Typography>
                )}


                </Card>


        {/* <ListItem onClick={e=>seePerson(idUser,e)}
          sx={{mt:1, boxShadow:3}}
          style={{backgroundColor:'#FAFAFA'}}
          >
            <Avatar sx={{ width: 56, height: 56 , alignItems:'center', alignSelf:'center'}} src={photoURL}/>
              <Typography variant="h3" gutterBottom marked="center" align="center">
              {userName}
              </Typography>

              <Typography variant="body2" align="center">
              {moment(timestamp).format("MMM Do, YYYY")}
              </Typography>

           


        </ListItem> */}

               
              

      </Box>
    </>
   
  )
}

export default Answers