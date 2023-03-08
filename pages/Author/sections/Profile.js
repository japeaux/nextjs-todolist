// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "../../../components/MKBox";
import MKAvatar from "../../../components/MKAvatar";
import MKButton from "../../../components/MKButton";
import MKTypography from "../../../components/MKTypography";

// Images
import imgBack from '../../../public/assets/16.png'
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Auth";
import ButtonUploadFile from "../../../components/storage/ButtonUploadFile";
import ButtonUploadPic from "../../../components/storage/ButtonUploadPic";
import ButtonUploadBanner from "../../../components/storage/ButtonUploadBanner";
import { Box, TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import MKInput from "../../../components/MKInput";






function Profile({user}) {
  //const {  currentUser } = useAuth()
  const [profilePicture, setProfilePicture] = useState("/assets/16.png")




  useEffect(()=>{
    if(user?.photoURL){
      setProfilePicture(user?.photoURL)
    }
    //console.log("useruseruseruser", user)
    if(user){
      getAge(user.birthday)
     
    }
  })

  const [userAge, setUserAge] = useState("success")
  const [editBio, setEditBio] = useState(true)
  const [bio, setBio] = useState(user?.description)

  // const onSave=()=>{
  //   console.log("idajsiod")
  // }

  const onSave = async () =>{
    console.log(bio)
    // const collectionRef = collection(db,"done")
    // const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id,  userName:currentUser.displayName, photoURL:currentUser.photoURL, status:"esperando"})
    const docRef  = doc(db,"users", user.id)
    const userUpdated = {...user, description:bio}
    await updateDoc(docRef,userUpdated)
    setEditBio(true)
  }



  const onCancel=()=>{
    setEditBio(!editBio)
  }

  const onStartEdit=()=>{
    setEditBio(!editBio)
    setBio(user.description)
  }

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    setUserAge(age)
  }

   
  return (
    <MKBox component="section" py={{ xs: 6, sm: 8 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">

          <MKBox mt={{ xs: -16, md: -30 }} textAlign="center">
            
            <ButtonUploadBanner  photoURL={user?.bannerPhotoURL} />


{/* 
        <div class="gallery">
          <img src="https://picsum.photos/id/1040/300/300" alt="a house on a mountain"/>
          <img src="https://picsum.photos/id/106/300/300" alt="sime pink flowers"/>
          <img src="https://picsum.photos/id/136/300/300" alt="big rocks with some trees"/>
          <img src="https://picsum.photos/id/1039/300/300" alt="a waterfall, a lot of tree and a great view from the sky"/>
          <img src="https://picsum.photos/id/110/300/300" alt="a cool landscape"/>
          <img src="https://picsum.photos/id/1047/300/300" alt="inside a town between two big buildings"/>
          <img src="https://picsum.photos/id/1057/300/300" alt="a great view of the sea above the mountain"/>
        </div> */}
            
            <div className="hexagon3"><img src={profilePicture} width="500" height="500" /></div>
            
            <ButtonUploadPic photoURL={user?.photoURL} />
           
          </MKBox>
          <Grid container justifyContent="center" py={-60}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <MKTypography variant="h3"> {user?.displayName}, {userAge}</MKTypography>

                {/* <MKButton variant="outlined" color="info" size="small">
                  Message
                </MKButton> */}
              </MKBox>
              {/* <Grid container spacing={3} mb={3}>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    323&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    Posts
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    3.5k&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    Followers
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    260&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" color="text">
                    Following
                  </MKTypography>
                </Grid>
              </Grid> */}
              <Grid container spacing={2} mb={0}>
              

                    {editBio?(<>

                      <p className="css-fix">{}</p>

                      <MKTypography variant="body2" fontWeight="light" color="text"  >
                      
                        About me: <br/> <br/>
                        {user?.description}
                      
                      </MKTypography>

                      
                        
                      <MKButton variant="outlined" color="info" size="small" onClick={onStartEdit}>
                        Edit about me
                      </MKButton>

                    </>):(<>
                    
                      <MKInput
                          variant="standard"
                          label="Edit about me"
                          placeholder="Write something about yourself for people know you better"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          multiline
                          rows={10}
                          value = {bio}
                          onChange={e=>setBio(e.target.value)}
                        />
                        
                      <MKButton variant="outlined" color="info" size="small" onClick={onCancel}>
                        Cancel
                      </MKButton>
                      <MKButton variant="outlined" color="info" size="small" onClick={onSave}>
                        Save
                      </MKButton> 
                    </>)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
