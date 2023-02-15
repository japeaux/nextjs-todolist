import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material'
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore'
import React from 'react'
import { db } from '../../firebase'
import Link from 'next/link'
import AppInsideBar from '../modules/views/AppInsideBar'
import withRoot from '../modules/withRoot'
import { useAuth } from '../../Auth'
import { useRouter } from 'next/router'


const Detail = ({todoProps, id}) => {
    console.log( id)
    const todo =JSON.parse(todoProps)
    const router = useRouter()

    const [sent, setSent] = React.useState(false);
    const [todo2, setTodo] = React.useState({title:'',details:'', cost:0})
    const {currentUser} = useAuth()

    const onHandle = async () =>{
        console.log("todo")
        setSent(true)
        //   const collectionRef = collection(db,"todo")
        //   const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp()})
  
        //   setTodo({title:'', details:''})
        //   showAlert('success',`New request has been added successfully`)
        //   router.push('/dashboard')
 
        
      }
      const onSend = async () =>{
        console.log(currentUser.id)
        console.log("todo", todo, id)
        setSent(false)
          const collectionRef = collection(db,"requests")
          const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id, userName:currentUser.displayName, idUser:currentUser.id, photoURL:currentUser.photoURL})
  
          setTodo({ details:''})
          //showAlert('success',`New request has been added successfully`)
          router.push('/dashboard')
 
      }
  


  return (

    <>
     <AppInsideBar />
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{minHeight : '100vh'}}>
            <Grid item xs={3}>
                <Card sx={{minWidth:275, boxShadow:3, maxWidth:500}}
                    style={{backgroundColor:'#fafafa'}}>

                    <CardContent>
                        <Typography variant='h5' component="div">
                            {todo.title}
                        </Typography>
                        <Typography variant='h5' component="div">
                            $ {todo.cost}
                        </Typography>
                        <Typography sx={{mb:1.5}} color="text.secondary">
                            {todo.details}
                        </Typography>
                    </CardContent>

                       
                    {!sent && (
                          <CardActions>
                          <Link href="/dashboard">
                              <Button size="small">Back to home</Button>
                          </Link>
  
                              <Button size="small" onClick={onHandle}>I want to do it</Button>
                      
  
                      </CardActions>
                )}
                  


                    {sent && (
                        <>
                          <TextField
                        id="outlined-multiline-static"
                        label="Write something to get to job"
                        multiline
                        rows={10}
                        fullWidth
                        value = {todo2.details}
                        onChange={e=>setTodo({...todo2,details:e.target.value})}
                    />
                    <CardActions>
                          <Link href="/dashboard">
                              <Button size="small">Cancel</Button>
                          </Link>
  
                              <Button size="small" onClick={onSend}>Send it</Button>
                      
  
                      </CardActions>
                        </>
                      
                )}

                </Card>

                {/* {isLoading ? (
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color={SAVEBIKING.ORANGE} />
                        </View>
                    ) : ()} */}
                        

             

            </Grid>

        </Grid>
    </>
    
  )
}

export default withRoot(Detail)

export const getStaticPaths = async () => {
    const snapshot = await getDocs(collection(db,'todo'));
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

    const docRef = doc(db,'todo',id)
    const docSnap = await getDoc(docRef)

    return {
        props : { todoProps: JSON.stringify(docSnap.data()), id:id || null}
    }
}