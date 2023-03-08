import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar } from '@mui/material';

import { useRef, useState } from 'react'
import { db, storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAuth } from '../../Auth';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Image from 'next/image';
import MKButton from '../MKButton';


export default function ButtonUploadBanner() {
  const [open, setOpen] = React.useState(false);
  const {currentUser} = useAuth()

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

const onSend = async (downloadURL, width, height) =>{

    console.log("pending", height, width,downloadURL)
    const collectionRef = collection(db,"album")
    const docRef = await addDoc(collectionRef, { user_id:currentUser.id ,timestamp: serverTimestamp(), src:downloadURL, height:height, width:width})
    // const docRef  = doc(db,"users", currentUser.id)
    // const todoUpdated = {...currentUser, bannerPhotoURL:downloadURL}
    // await updateDoc(docRef,todoUpdated)
}

const [uploading, setUploading] = useState(false);
const [selectedImage, setSelectedImage] = useState("");
const [selectedFile, setSelectedFile] = useState();

function imageSize(url) {
  const img = document.createElement("img");

  const promise = new Promise((resolve, reject) => {
    img.onload = () => {
      // Natural size is the actual image size regardless of rendering.
      // The 'normal' `width`/`height` are for the **rendered** size.
      const width  = img.naturalWidth;
      const height = img.naturalHeight; 

      // Resolve promise with the width and height
      resolve({width, height});
    };

    // Reject promise on error
    img.onerror = reject;
  });

  // Setting the source makes it start downloading and eventually call `onload`
  img.src = url;

  return promise;
}



const handleSubmit = (e) => {
    setUploading(true)
    e.preventDefault()
    const file = selectedFile
    if (!file) return;
    const storageRef = ref(storage, `${currentUser.id}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    //console.log(selectedImage)
   
    //console.log(file)
      

    uploadTask.on("state_changed",
        (snapshot) => {
        const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
        console.log(progress)
        },
        (error) => {
        alert(error);
        },
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      
            console.log("downloadURL",downloadURL);
            setUploading(false)
            setImgUrl(downloadURL)
            imageSize(selectedImage).then(data=>{
              onSend(downloadURL, data.width, data.height)
            })
            handleClose()
        });
        }
    );
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
                {/* <Avatar sx={{ width: 56, height: 56 , alignItems:'center', alignSelf:'center'}} src={imgUrl}/>
              
                */}
                {/* <form onSubmit={handleSubmit} className='form'>
                    <input type='file' />
                    <button type='submit'>Upload</button>
                </form> */}
            </Button>

                <div className="max-w-4xl mx-auto p-20 space-y-6">
                    <label>
                        <input
                        type="file"
                        hidden
                        onChange={({ target }) => {
                            if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                            }
                        }}
                        />
                        <div className="w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                        {selectedImage ? (
                        
                            <Avatar sx={{ width: 80, height: 80 , alignItems:'center', alignSelf:'center'}} src={selectedImage}/>
                        ) : (
                            <Avatar sx={{ width: 80, height: 80 , alignItems:'center', alignSelf:'center'}} src={currentUser?.bannerPhotoURL}/>
                        )}
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