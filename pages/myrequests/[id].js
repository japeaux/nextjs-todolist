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

const MyResquests = ({todoProps, id}) => {
    //console.log( id)
    const todo =JSON.parse(todoProps)
    const router = useRouter()

    const [sent, setSent] = React.useState(false);
    const [todo2, setTodo] = React.useState({title:'',details:'', cost:0})
    const {currentUser} = useAuth()

    const [answers, setAnswers] = React.useState([])
    const userName =  "Lucas"

    React.useEffect(()=>{
        console.log("ID", id)
        const collectionRef2 = collection(db, "requests")
        const conditions = [orderBy("timestamp", "desc")]


                conditions.push(where("idTodo","==",id));
                

                // conditions.push(where("status","==",'esperando']));
                

        const q = query(collectionRef2, ...conditions);
        const unsubscribe = onSnapshot(q,(querySnapshot)=>{
          setAnswers(querySnapshot.docs.map(doc=>({...doc.data(), id:doc.id, timestamp:doc.data().timestamp?.toDate().getTime()})))
        })
        console.log(answers, "412")
        return unsubscribe;
    },[])





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
        console.log("todo", todo, id)
        setSent(false)
          const collectionRef = collection(db,"requests")
          const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), idTodo:id,  userName:currentUser.displayName, photoURL:currentUser.photoURL, status:"esperando"})
  
          //showAlert('success',`New request has been added successfully`)
         // router.push('/myrequest')
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

                       
                          <CardActions>
                          <Link href="/dashboard">
                              <Button size="small">Back to home</Button>
                          </Link>
                      </CardActions>
  

                </Card>

                {/* {isLoading ? (
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color={SAVEBIKING.ORANGE} />
                        </View>
                    ) : ()} */}
                        

             

            </Grid>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {answers.map((answers, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <Answers key={answers.id}
                    id={answers.id} 
                    idUser={answers.idUser} 
                    title={answers.title}
                    details={answers.details}
                    userName={answers.userName}
                    timestamp={answers.timestamp}
                    photoURL={answers.photoURL} 
                    status = {answers.status} />
                </Grid>
                ))}
                </Grid>

                

        </Grid>
    </>
    
  )
}

export default withRoot(MyResquests)

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
        props : { todoProps: JSON.stringify(docSnap.data()), id:id || null
                 }
    }
}


