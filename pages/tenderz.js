import { useEffect, useState } from 'react'
import { useAuth } from '../Auth';
import {useRouter} from 'next/router'

import withRoot from '../components/modules/withRoot';
import AppFooter from '../components/modules/views/AppFooter';

import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../components/MKBox";

// // Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Author page sections
import Profile from "./Author/sections/Profile";
import Contact from "./Author/sections/Contact";

// // Routes
// import routes from "routes";

// Images
// import bgImage from "/bg2.jpg";
// import Gallery from "./Author/sections/Gallery";
// import ProductCategories from "../components/modules/views/ProductCategories";
import PhotoAlbum from './Author/sections/PhotoAlbum';



function Tenderz() {
  const {currentUser} = useAuth()
  const [bgImage, setBgImage] = useState("")

  useEffect(()=>{
   
    if(currentUser?.bannerPhotoURL){
      setBgImage(currentUser?.bannerPhotoURL)
    }else{
      setBgImage("/bg2.jpg")
    }
    
  },[currentUser])
  const router = useRouter();

  const OpenChat = async (e) =>{
      e.stopPropagation();
      router.push(`/Chat`)
  }
  
  //router.reload()



  return (
    <>
     <MKBox bgColor="black"   minHeight="135rem">
          <MKBox
            minHeight="35rem"
            width="100%"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.8),
                  rgba(gradients.dark.state, 0.8)
                )}, url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              placeItems: "center",
            }}
          />
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 20 },
              mt: -22,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Profile user = {currentUser} />
            {/* <Posts /> */}
            <PhotoAlbum id={currentUser?.id} />
          </Card>
        
        </MKBox>
      
      <AppFooter />
    </>
      
    )
}

export default withRoot(Tenderz)