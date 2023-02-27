import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar } from '@mui/material';

import { useRef, useState } from 'react'
import Image from 'next/image';
import MKButton from './MKButton';


export default function Carousel() {
  const [open, setOpen] = React.useState(false);
  console.log("dioajsdjiaoisodias")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUploading(false);
    setImgUrl("")
    setSelectedImage("")
    setSelectedFile()
    // window.location.reload();
  };

const [imgUrl, setImgUrl] = useState(null);
const [progresspercent, setProgresspercent] = useState(0);

const onSend = async (downloadURL) =>{
   
}

const [uploading, setUploading] = useState(false);
const [selectedImage, setSelectedImage] = useState("");
const [selectedFile, setSelectedFile] = useState();



const handleSubmit = (e) => {
    setUploading(true)
    e.preventDefault()
   
}



  return (
    <div>
  
        <MKButton onClick={handleClickOpen}  variant="outlined" color="info" size="small">
            Add photo to gallery
        </MKButton>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Change your profile photo"}
          </DialogTitle>
        <DialogContent>
            
          <Button onClick={handleClickOpen}>
            
            </Button>

                <div className="max-w-4xl mx-auto p-20 space-y-6">
                    <label>
                    
                        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                       
                        </div>
                    </label>
                
                </div>

                    

          <DialogContentText id="alert-dialog-description">
            Choose a photo to add
          </DialogContentText>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          
          
          {/* <button
                        // onClick={handleUpload}
                        disabled={uploading}
                        style={{ opacity: uploading ? ".5" : "1" }}
                        className="bg-red-600 p-3 w-32 text-center rounded text-white"
                    >
                    </button> */}
          <Button onClick={handleSubmit} autoFocus disabled={uploading}>
            {uploading ? "Uploading.." : "Upload"}
          </Button>


        </DialogActions>
      </Dialog>
    </div>
  );
}