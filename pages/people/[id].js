import { Avatar, Button,  CardActions,  Typography } from '@mui/material'
import {  collection, doc, getDoc, getDocs,  } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import AppInsideBar from '../modules/views/AppInsideBar'
import withRoot from '../modules/withRoot'
import { useRouter } from 'next/router'
import AppForm from '../modules/views/AppForm'


const People = ({userProps, id}) => {
    console.log( id)
    const user =JSON.parse(userProps)
    const router = useRouter()
  

    const onBack = () =>{
        router.back()
    }
  


  return (

    <>
     <AppInsideBar />
     <AppForm>
        <React.Fragment>
            <CardActions>=
                        <Button size="small" onClick={onBack}>Back</Button>=
                </CardActions>
    
            <Avatar sx={{ width: 56, height: 56 , alignItems:'center', alignSelf:'center'}} src={user.photoURL}/>
            <Typography variant="h3" gutterBottom marked="center" align="center">
            {user?.displayName}
            </Typography>

            <Typography variant="body2" align="center">
    
            </Typography>

            <Typography variant="h5" gutterBottom marked="center" align="center">
            {user?.description}
            </Typography>

        </React.Fragment>
        
      </AppForm>
    </>
    
  )
}

export default withRoot(People)

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
    console.log("id", id)
    const docRef = doc(db,'users',id)
    const docSnap = await getDoc(docRef)

    return {
        props : { userProps: JSON.stringify(docSnap.data()), id:id || null}
    }
}