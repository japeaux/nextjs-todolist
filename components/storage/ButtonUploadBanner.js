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
import { doc, updateDoc } from 'firebase/firestore';
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
  };

const [imgUrl, setImgUrl] = useState(null);
const [progresspercent, setProgresspercent] = useState(0);

const onSend = async (downloadURL) =>{
    console.log("pending", downloadURL)
    // const collectionRef = collection(db,"done")
    // const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id,  userName:currentUser.displayName, photoURL:currentUser.photoURL, status:"esperando"})
    const docRef  = doc(db,"users", currentUser.id)
    const todoUpdated = {...currentUser, bannerPhotoURL:downloadURL}
    await updateDoc(docRef,todoUpdated)
}

const [uploading, setUploading] = useState(false);
const [selectedImage, setSelectedImage] = useState("");
const [selectedFile, setSelectedFile] = useState();


const handleSubmit = (e) => {
    setUploading(true)
    e.preventDefault()
    const file = selectedFile
    if (!file) return;
    const storageRef = ref(storage, `banner/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

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
            onSend(downloadURL)
            handleClose()
        });
        }
    );
}



  return (
    <div>
      {/* <Button onClick={handleClickOpen} style={{ position: 'relative',
      
            top:-100,
           
            height:100, 
            backgroundColor:"transrent", 
            width:100, 
            alignItems: 'center',
            justifyContent: 'center',
            }}> Edit Profile Pic */}
        {/* <Avatar sx={{ width: 90, height: 90 , alignItems:'center', alignSelf:'center'}} src={photoURL}/> */}
{/* 
        <img
              src={`${photoURL}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${photoURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt="mds"
              width="100%" height="100%"
            /> */}

      {/* </Button> */}
      <MKButton onClick={handleClickOpen}  variant="outlined" color="info" size="small" style={{left:"-30vw", top:100}}>
                  Edit Banner Pic
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
                            // <img src={selectedImage} alt="" />
                            <Avatar sx={{ width: 80, height: 80 , alignItems:'center', alignSelf:'center'}} src={selectedImage}/>
                        ) : (
                            <Avatar sx={{ width: 80, height: 80 , alignItems:'center', alignSelf:'center'}} src={currentUser?.bannerPhotoURL}/>
                        )}
                        </div>
                    </label>
                  
                    <div className="mt-20 flex flex-col space-y-3">
                        {/* {dirs.map((item) => (
                        <Link key={item} href={"/images/" + item}>
                            <a className="text-blue-500 hover:underline">{item}</a>
                        </Link>
                        ))} */}
                    </div>
                    </div>

                    

          <DialogContentText id="alert-dialog-description">
            Choose a new banner photo
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