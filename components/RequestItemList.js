import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import moment from 'moment/moment';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

import { collection, getDocs,  orderBy, query, where  } from 'firebase/firestore';
import nookies from 'nookies'
import { db } from '../firebase';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RequestItemList({id, timestamp, title, details, displayName, email}) {
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

  



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const router = useRouter();

  const seeMore = async (id,e) =>{
    e.stopPropagation();
    router.push(`/requests/${id}`)
  }



  return (
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }} mt={3}>
    <Card sx={{ maxWidth: 600 }} mt={3}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={photoURL}/>
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


      {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {details}
        </Typography>


      </CardContent>

      <CardActions disableSpacing>
        {/* <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}


        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {details}
          </Typography>
{/*          
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
    </Box>
  );
}

