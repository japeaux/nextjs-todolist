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


//import TextField from "../../../assets/theme/components/form/textField";



// const HEXAGON_MASK = `
//   M378.3,150.1c-14-31.2-30.3-61.2-48.7-89.7l-6-9.1c-7.3-11.2-16.9-20.7-28.1-27.5c-11.1-6.9-23.6-11.1-36.5-12.1l-10.5-0.9
//   c-32.4-2.8-64.9-2.8-97.4,0l-10.5,0.9c-12.9,1-25.3,5.2-36.5,12.1S83.5,40.1,76.2,51.4l-6,9.2C51.7,89,35.5,119,21.5,150.2
//   l-4.5,10.1c-5.6,12.4-8.4,25.9-8.4,39.7c0,13.7,2.8,27.3,8.4,39.7l4.5,10.1c14,31.2,30.3,61.2,48.7,89.7l6,9.2
//   c7.3,11.3,17,20.7,28.1,27.6c11.2,6.9,23.7,11,36.5,12.1l10.5,0.9c32.4,2.8,64.9,2.8,97.4,0l10.5-0.9c12.9-1.1,25.3-5.2,36.5-12.1
//   c11.2-6.9,20.8-16.4,28.1-27.6l6-9.2c18.5-28.5,34.7-58.5,48.7-89.7l4.5-10.1c5.5-12.4,8.4-25.9,8.4-39.7s-2.8-27.3-8.4-39.7
//   L378.3,150.1z
// `;





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

  // const canvasRef = useRef(null);
  // const [imageUrl, setImageUrl] = useState();
  // const [generatedImageData, setGeneratedImageData] = useState();

  // function drawImage(
  //   canvasRef,
  //   imageUrl
  // ) {
  //   const mask = new Path2D(HEXAGON_MASK);

  //   if (canvasRef.current) {
  //     const ctx = canvasRef.current.getContext("2d");

  //     if (ctx && imageUrl) {
  //       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  //       const image = new Image();
  //       image.src = imageUrl;
  //       // Fix https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
  //        image.crossOrigin = "Anonymous";
  //       image.onload = () => {
  //         ctx.clip(mask);
  //         ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 400, 400);
  //         // https://stackoverflow.com/questions/7717851/save-file-javascript-with-file-name
  //         const imageUri = canvasRef.current
  //           ?.toDataURL("image/png")
  //           .replace("image/png", "image/octet-stream");
  //         setGeneratedImageData(imageUri);
  //       };
  //     }
  //   }
  // }

  // useEffect(() => {
  //   console.log(imageUrl)
  //   if (imageUrl) {
  //     drawImage(canvasRef, imageUrl);
  //   }
  // }, [canvasRef, imageUrl]);


  // useEffect(() => {
  //   const mask = new Path2D(HEXAGON_MASK);

  //   if (canvasRef.current) {
  //     const ctx = canvasRef.current.getContext("2d");

  //     if (ctx) {
  //       ctx.fillStyle = "white";
  //       ctx.fill(mask);
  //     }
  //   }
  // }, [canvasRef]);



 
   
  return (
    <MKBox component="section" py={{ xs: 6, sm: 8 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">

          <MKBox mt={{ xs: -16, md: -30 }} textAlign="center">
            
            <ButtonUploadBanner  photoURL={user?.bannerPhotoURL} />


        
            
        {/* <Box p={10}>
          <canvas ref={canvasRef} width={400} height={400} />
        </Box> */}
           
            {/* <MKAvatar src={profilePicture} alt="userProfile" size="xxxl" shadow="xxxl"  /> */}

            {/* <div class="hex">
              <div class="hex-title">
                Simple title
              </div>
              <div class="hex-hide"></div>
              <div class="hex-img">
                <img src={profilePicture}/>
              </div>
            </div> */}

{/* <div class="hexagon hexagon1"><div class="hexagon-in1"><div class="hexagon-in2"></div></div></div> */}
{/* 
<div class="hexagon hexagon2"><div class="hexagon-in1"><div class="hexagon-in2"></div></div></div> */}

{/* <div class="hexagon dodecagon"><div class="hexagon-in1"><div class="hexagon-in2"></div></div></div>
            
<div class="hex">
       <div></div>
</div> */}
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

                      <p class="css-fix">{}</p>

                      <MKTypography variant="body1" fontWeight="light" color="text"  >
                      
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
