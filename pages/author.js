/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "../components/MKBox";

// // Material Kit 2 React examples
// import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Author page sections
import Profile from "./Author/sections/Profile";
import Posts from "./Author/sections/Posts";
import Contact from "./Author/sections/Contact";
import Footer from "./Author/sections/Footer";

// // Routes
// import routes from "routes";

// Images
// import bgImage from "/bg2.jpg";
import { useAuth } from "../Auth";
import { useEffect, useState } from "react";
import AppInsideBar from "../components/modules/views/AppInsideBar";
import Gallery from "./Author/sections/Gallery";
import ProductCategories from "../components/modules/views/ProductCategories";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import nookies from 'nookies'
import withRoot from "../components/modules/withRoot";

import { TodoContext } from '../TodoContext'
import { verifyIdToken } from "../firebaseAdmin";


function Author({todosProps}) {

  const {  currentUser } = useAuth()
  const [bgImage, setBgImage] = useState("")

  useEffect(()=>{
    handleClose()
    if(currentUser?.bannerPhotoURL){
      setBgImage(currentUser?.bannerPhotoURL)
    }else{
      setBgImage("/bg2.jpg")
    }
    console.log("foas", todosProps)
  },[currentUser])

  
  // const [images, setImages] = useState()
  // let aux
  // useEffect(()=>{
  //  //   console.log("ID", id)
  //     const collectionRef2 = collection(db, "album")
  //     const conditions = [orderBy("timestamp", "desc")]
  //     // conditions.push(where("idTodo","==",id));
  //     // conditions.push(where("status","==",'esperando']));
            
  //     const q = query(collectionRef2, ...conditions);
  //     const unsubscribe = onSnapshot(q,(querySnapshot)=>{
  //      aux =  querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()}))
  //      setImages(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
  //      console.log(aux, images)
  //     })
  //     return unsubscribe;
  // },[])


  const handleClose = () => {
    //console.log("autho", currentUser)
    // getAge(currentUser.birthday)
  };

  


  return (
    <>
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
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
            {/* <Profile user = {currentUser} /> */}
            {/* <Posts /> */}
            {/* <ProductCategories images={images} /> */}
            {/* <Gallery /> */}
          </Card>
          {/* <Contact /> */}
          {/* <Footer /> */}
        </MKBox>
    </TodoContext.Provider>

    </>
  );
}

export default withRoot(Author);

// export async function getServerSideProps(context){
//   try{
//     const cookies = nookies.get(context)
//     const token = await verifyIdToken(cookies.token)
//     const { id } = token;
    
//     const collectionRef = collection(db, "album")
//     const conditions = [orderBy("timestamp", "desc")]        
//     const q = query(collectionRef, ...conditions);
//     const querySnapshot = await getDocs(q)
//     let images = []
//     querySnapshot.forEach((doc)=>{
//       images.push({...doc.data(), id:doc.id, timestamp: doc.data().timestamp?.toDate().getTime()})
//     })
//     return {
//       props: {
//         imagesProps: JSON.stringify(images) || [],
//       }
//     }
//   } catch(error){
//     return { props:{}}
//   }
// }


export async function getServerSideProps(context){
  try{
    const cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    const { email } = token;
    const collectionRef = collection(db, "todo")
    const q = query(collectionRef,orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q)
    let todos = []
    querySnapshot.forEach((doc)=>{
      todos.push({...doc.data(), id:doc.id, timestamp: doc.data().timestamp.toDate().getTime()})
    })
    return {
      props: {
        todosProps: JSON.stringify(todos) || [],
      }
    }
  } catch(error){
    return { props:{}}
  }
}

