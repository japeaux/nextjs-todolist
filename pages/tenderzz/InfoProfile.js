// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKButton from "../../components/MKButton";
import MKTypography from "../../components/MKTypography";

// Images
import { useEffect, useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import MKInput from "../../components/MKInput";






function InfoProfile({user}) {
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
              


                      <p className="css-fix">{}</p>

                      <MKTypography variant="body2" fontWeight="light" color="text"  >
                      
                        About me: <br/>
                      
                      </MKTypography>
                      
                      <MKTypography variant="body1" fontWeight="light" color="text"  >
                      
                        {user?.description}
                      
                      </MKTypography>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default InfoProfile;
