import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment/moment';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import { db } from '../../firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, CardActions, Link } from '@mui/material';


export default function RequestItem({id, timestamp, title, details, displayName, email, idUser, cost, category1, category2, category3}) {
  const [expanded, setExpanded] = useState(false);
  const [photoURL, setPhotoURL] = useState()
  
  const [sent, setSent] = useState(false);


  useEffect(()=>{
    async function fetchPhotoURL(){
      const usersRef = collection(db,"users");
      const q = query(usersRef, where("email","==",email));
      const querySnapshot = await getDocs(q);    
      let aux = querySnapshot.docs.map(doc=>({...doc.data(),id:doc.id}))
      if(aux.length>0){
        setPhotoURL(aux[0].photoURL)
      }
    }
    fetchPhotoURL()
  },[])


  const deleteTodo = async (id,e) =>{
    e.stopPropagation();
    const docRef =  doc(db,"todo",id)
    await deleteDoc(docRef);
    showAlert('error', `Todo with id ${id} deleted successfully`)
  }




  const router = useRouter();

  const seeMore = async (id,e) =>{
    e.stopPropagation();
    router.push(`/myrequests/${id}`)
  }

  const onHandle = async () =>{
    console.log("todo")
    setSent(true)
    
  }

  const seeTender = async () =>{
    console.log(idUser, "idUseridUseridUseridUseridUser")
    router.push(`/tenderzz/${idUser}`)
   // console.log("className", idUser, displayName)
  }

  const onSend = async () =>{
    console.log(currentUser.id)
    console.log("todo", todo, id)
    setSent(false)
      const collectionRef = collection(db,"requests")
      const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id, userName:currentUser.displayName, idUser:currentUser.id, photoURL:currentUser.photoURL})

      setTodo({ details:''})
      //showAlert('success',`New request has been added successfully`)
      router.push('/dashboard')

  }



  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }} mt={3}mb={10}>
    <Card sx={{ maxWidth: 600 }} mt={3} mb={10}>
      <CardHeader
        avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={photoURL}/>
        <div style={{ position: 'relative',
            left: '',
            top: '',
            cursor: "pointer",
            }}   onClick={seeTender}>
                 <div className="hexagon hexagon1">
                    <div className="hexagon-in1">
                        <div className="hexagon-in2" style={{backgroundImage: `url(${photoURL})`,  backgroundSize: 'cover',}}>
                        </div>
                    </div>
                </div>
        </div>
        

        }
        title={displayName}
        subheader= {moment.unix(timestamp.seconds).format("MMM Do, YYYY")}
      />
       

        <CardContent>
            <Typography variant="h5" >
            ${cost} 
            </Typography>
            <Typography variant="h5" >
                {category1} {category2}  {category3} 
            </Typography>


        </CardContent>


      <CardContent>
        <Typography variant="body2" color="text.secondary"  sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp:6,
        }}>
          {details}
        </Typography>


      </CardContent>
                    
                    
                    {!sent && (
                            <CardActions>
                            <Link href="/dashboard">
                                <Button size="small">Back to home</Button>
                            </Link>
    
                                <Button size="small" onClick={onHandle}>I want to do it</Button>
                        
    
                        </CardActions>
                    )}
                    


                        {sent && (
                            <>
                            <TextField
                            id="outlined-multiline-static"
                            label="Write something to get to job"
                            multiline
                            rows={10}
                            fullWidth
                            value = {todo2.details}
                            onChange={e=>setTodo({...todo2,details:e.target.value})}
                        />
                        <CardActions>
                            <Link href="/dashboard">
                                <Button size="small">Cancel</Button>
                            </Link>
    
                                <Button size="small" onClick={onSend}>Send it</Button>
                        
    
                        </CardActions>
                            </>
                        
                    )}

    
    </Card>
    </Box>
  );
}

