import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Typography from '../../../components/modules/components/Typography';
import { useEffect } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useState } from 'react';
import { Grid } from '@mui/material';
import ButtonUploadAlbum from "../../../components/storage/ButtonUploadAlbum";
import { useRouter } from 'next/router';
import Carousel from '../../../components/Carousel';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const ImageBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: '#000',
  opacity: 0.5,
  transition: theme.transitions.create('opacity'),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
  padding: 0,
  borderRadius: 0,
  height: '40vh',
  [theme.breakpoints.down('md')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover': {
    zIndex: 1,
  },
  '&:hover .imageBackdrop': {
    opacity: 0.15,
  },
  '&:hover .imageMarked': {
    opacity: 0,
  },
  '&:hover .imageTitle': {
    border: '4px solid currentColor',
  },
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  '& .imageMarked': {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function Album({imagesProps}) {

  const [images, setImages] = useState(JSON.parse(imagesProps))
  const router = useRouter()
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    setImages(JSON.parse(imagesProps))
    //window.location.reload(false);
    console.log(images)
  },[])

  
  const seeMore = async (image,e) =>{
    e.stopPropagation();
    console.log(image)
    router.push(`/album/${image.id}`)
  }

  const handleClickOpen = () => {
    console.log("asdfs", open)
    setOpen(!open);
  };

  const handleClose = () => {
   
    setOpen(false);
    console.log("doijaoisjdjoasjodi", open)
  };




  return (
    <Container component="section" sx={{ mt: 0, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        For all tastes and all desires
      </Typography>
      <ButtonUploadAlbum />
      <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap' }}>
          {images.map((image, index) => (
                <ImageIconButton
                key={image.id}
                style={{
                   width: "33%",
                }}
                // onClick={e=>seeMore(image,e)}
                onClick={handleClickOpen}
              >

                
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                width={1620} height={1720}
                            >
                              <DialogTitle id="alert-dialog-title">
                                {"Change your profile photo"}
                              </DialogTitle>
                            <DialogContent>
                          

                                   
                                    <Box
                                          sx={{
                                            position: 'absolute',
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center 40%',
                                            backgroundImage: `url(${image?.picURL})`,
                                          }}
                                        />
                                        

                                        

                              <DialogContentText id="alert-dialog-description">
                                Choose a photo to add
                              </DialogContentText>
                              
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Close</Button>
                              
                              
                        
                           


                            </DialogActions>
                          </Dialog>
                          
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 40%',
                    backgroundImage: `url(${image.picURL})`,
                  }}

                 
                  
                />
                <ImageBackdrop className="imageBackdrop" />
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'common.white',
                  }}
                >
                  <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    className="imageTitle"
                  >
                    {/* {image.title} */}
                    <div className="imageMarked" />
                  </Typography>
                </Box>
              </ImageIconButton>
          ))}
      
      </Box>
    </Container>
  );
}
