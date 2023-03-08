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


export default function MyRequestItemList({id, timestamp, title, details, displayName, email, idUser}) {
  const [expanded, setExpanded] = React.useState(false);
  const [photoURL, setPhotoURL] = React.useState()
  

  React.useEffect(()=>{
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


  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }} mt={3}>
    <Card sx={{ maxWidth: 600 }} mt={3}>
      <CardHeader
        avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={photoURL}/>
        <div style={{ position: 'relative',
            left: '-100px',
            top: '-20px',
            cursor: "pointer",
            }}  >
                 <div className="hexagon hexagon1">
                    <div className="hexagon-in1">
                        <div className="hexagon-in2" style={{backgroundImage: `url(${photoURL})`,  backgroundSize: 'cover',}}>
                        </div>
                    </div>
                </div>
        </div>
        

        }
        action={
          <IconButton
          onClick={e=>seeMore(id,e)}
        >
            <MoreVertIcon />
          </IconButton>
        }
        title={displayName}
        subheader= {moment(timestamp).format("MMM Do, YYYY")}
      />
       

        <CardContent>
            <Typography variant="h5" >
            {title}
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

    
    </Card>
    </Box>
  );
}

