import { useRef, useState } from 'react'
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const UploadFile = () =>{
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const router = useRouter()
    const onSend = async () =>{
      console.log("pending", imgUrl)
      // const collectionRef = collection(db,"done")
      // const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id,  userName:currentUser.displayName, photoURL:currentUser.photoURL, status:"esperando"})
      router.back()
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        console.log(e.target[0]?.files[0])
        if (!file) return;
        const storageRef = ref(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImgUrl(downloadURL)
            });
          }
        );
      }
    
      return (
        <div className="App">
          <form onSubmit={handleSubmit} className='form'>
            <input type='file' />
            <button type='submit'>Upload</button>
          </form>
          {
            !imgUrl &&
            <div className='outerbar'>
              <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
            </div>
          }
          {
            imgUrl &&
            <img src={imgUrl} alt='uploaded file' height={200} />
          }
           {
            imgUrl &&
            <Button onClick={onSend}>Send</Button>
          }

          
        </div>
      );
}

export default UploadFile