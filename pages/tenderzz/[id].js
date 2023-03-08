import { Button, Card, CardActions, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import Link from 'next/link'
import AppInsideBar from '../../components/modules/views/AppInsideBar'
import withRoot from '../../components/modules/withRoot'
import { useRouter } from 'next/router'
import MKBox from '../../components/MKBox'
import { useEffect } from 'react'
import { useState } from 'react'
import Profile from '../Author/sections/Profile'
import InfoProfile from './InfoProfile'
import PicsAlbum from './PicsAlbum'
import AppFooter from '../../components/modules/views/AppFooter'
import PersonalRequest from './PersonalRequest'

const Tenderzz = ({userProps, id}) => {
    const [bgImage, setBgImage] = useState("")


    console.log( id, userProps)
    console.log(userProps.bannerPhotoURL,userProps.photoURL)
    const user =JSON.parse(userProps)
    const router = useRouter()
    const backimg = user.bannerPhotoURL
    const profilePicture = user.photoURL




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
                    )}, url(${backimg})`,
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
                    <InfoProfile user = {user} />
                    {/* <Posts /> */}
                    {/* <ProductCategories imagesProps={imagesProps} /> */}
                    {/* <Album imagesProps={imagesProps} /> */}
                    {/* <PhotoAlbum imagesProps={imagesProps} /> */}
                    <PicsAlbum id={user.id}/>
                </Card>
                <PersonalRequest />
                {/* <Footer /> */}
                </MKBox>
            
            <AppFooter />
            </>
      );
}

export default withRoot(Tenderzz)

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db,'users'));
    const paths = snapshot.docs.map(doc=>{
        return {
            params:{ id:doc.id.toString() }
        }
    })

    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async (context) =>{
    const id = context.params.id;

    const docRef = doc(db,'users',id)
    const docSnap = await getDoc(docRef)

    return {
        props : { userProps: JSON.stringify(docSnap.data()), id:id || null}
    }
}