
import { auth, db } from '../firebase';
import { useEffect, useState } from 'react'
import { useAuth } from '../Auth';

import { verifyIdToken } from '../firebaseAdmin';
import { collection, getDocs,  orderBy, query, where, onSnapshot  } from 'firebase/firestore';
import nookies from 'nookies'
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



function Tenderz({imagesProps}) {
  const {currentUser} = useAuth()
  const [open,setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [todo, setTodo] = useState({title:'',details:''})
  const [bgImage, setBgImage] = useState("")

  useEffect(()=>{
   
    if(currentUser?.bannerPhotoURL){
      setBgImage(currentUser?.bannerPhotoURL)
    }else{
      setBgImage("/bg2.jpg")
    }
    
  },[currentUser])

  const showAlert = (type,msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }

  const router = useRouter();

  const OpenChat = async (e) =>{
      e.stopPropagation();
      router.push(`/Chat`)
  }
  
  //router.reload()



  return (
    <>
     <MKBox bgColor="black">
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
            <PhotoAlbum imagesProps={imagesProps} />
          </Card>
          <MKBox component="section" py={{ xs: 0, lg: 6 }}>
            
                <MKBox
                  width="100%"
                  bgColor="white"
                  borderRadius="xl"
                  shadow="xl"
                  mb={6}
                  sx={{ overflow: "hidden" }}
                >
                
                </MKBox>
              
          </MKBox>
        </MKBox>
      
      <AppFooter />
    </>
      
    )
}

export default withRoot(Tenderz)

export async function getServerSideProps(context){
  try{
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const { id } = token;
    const collectionRef = collection(db, "album")
    const q = query(collectionRef,orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q)
    let todos = []
    querySnapshot.forEach((doc)=>{
      todos.push({...doc.data(), id:doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
    })
    return {
      props: {
        imagesProps: JSON.stringify(todos) || [],
      }
    }
  } catch(error){
    return { props:{}}
  }
}