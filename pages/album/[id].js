import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp,  onSnapshot, orderBy, query, where  } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import Link from 'next/link'
import AppInsideBar from '../../components/modules/views/AppInsideBar'
import withRoot from '../../components/modules/withRoot'
import { useAuth } from '../../Auth'
import { useRouter } from 'next/router'
import Answers from '../../components/Answers'
import Head from 'next/head'
import Carousel from '../../components/Carousel'
import { Box } from '@mui/system'


const AlbumPhotos = ({imageProps, id}) => {
    console.log( id)
    const image =JSON.parse(imageProps)
    const router = useRouter()
    console.log(image)
  
    const {currentUser} = useAuth()

    // React.useEffect(()=>{
    //     console.log("ID", id)
    //     const collectionRef2 = collection(db, "requests")
    //     const conditions = [orderBy("timestamp", "desc")]


    //             conditions.push(where("idTodo","==",id));
                

    //             // conditions.push(where("status","==",'esperando']));
                

    //     const q = query(collectionRef2, ...conditions);
    //     const unsubscribe = onSnapshot(q,(querySnapshot)=>{
    //       setAnswers(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
    //     })
    //     console.log(answers, "412")
    //     return unsubscribe;
    // },[])





    const onHandle = async () =>{
        console.log("todo")
        setSent(true)
        //   const collectionRef = collection(db,"todo")
        //   const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp()})
  
        //   setTodo({title:'', details:''})
        //   showAlert('success',`New request has been added successfully`)
        //   router.push('/dashboard')
 
        
      }
    

  return (

    <>
        <Head>
            <title>My Photos</title>
       
        </Head>
        <main className="mx-auto max-w-[1960px] p-4">
            {/* <Carousel/> */}
            <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center 100%',
                    backgroundImage: `url(${image?.picURL})`,
                  }}

                 
                  
                />
        </main>
    </>
    
  )
}

export default withRoot(AlbumPhotos)

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db,'album'));
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

    const docRef = doc(db,'album',id)
    const docSnap = await getDoc(docRef)

    return {
        props : { imageProps: JSON.stringify(docSnap.data()), id:id || null
                 }
    }
}


