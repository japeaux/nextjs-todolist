// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../../components/MKBox";
import MKInput from "../../components/MKInput";
import MKButton from "../../components/MKButton";
import MKTypography from "../../components/MKTypography";
import { useState } from "react";
import { Alert, Button, IconButton, Input, Snackbar } from "@mui/material";
import categorias from '../../data/categoriesNames.json'
import CloseIcon from '@mui/icons-material/Close';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Auth";

// Images


function PersonalRequest() {



  const [bgImage, setBgImage] = useState("/assets/16.png")
  const [listCat, setListCat] = useState([])
  const [chooseCat, setChooseCat] = useState([])
  const {currentUser} = useAuth()

  function findChange(Arr) {
    let pattern = new RegExp(Arr, 'i');
    let resultSet = categorias.filter(item => item.categoryName.match(pattern) && Arr != '').map(item => item.categoryName);
    const output =resultSet.map(name => ({name}));
    setListCat(output)
  }

  const ChooseCat = (cat) => {
    console.log(cat,"cat",chooseCat)
    if(chooseCat.length<3){
        setChooseCat([...chooseCat,cat])
        if(chooseCat.length == 0){
          setTodo({...todo, category1:cat})
        }
        if(chooseCat.length == 1){
          setTodo({...todo, category2:cat})
        }
        if(chooseCat.length == 2){
          setTodo({...todo, category3:cat})
        }
    }
  };

  const removeCat = (index) =>{
    console.log(index)
      // const name = e.target.getAttribute("name")
    setChooseCat(chooseCat.filter(item => item !== index));
    if(chooseCat.length == 0){
      setTodo({...todo, category1:''})
    }
    if(chooseCat.length == 1){
      setTodo({...todo, category2:''})
    }
    if(chooseCat.length == 2){
      setTodo({...todo, category3:''})
    }
  }

  const [input, setInput] = useState('')

  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [open, setOpen] = useState(false)

  const [todo, setTodo] = useState({title:'',details:'', cost:0, category1:'', category2:'', category3:''})


  const onSubmit = async () =>{

    if(chooseCat.length<1){
      showAlert('error',`Choose at least 1 category for the request`)
    }else{
      setTodo({...todo, category1:chooseCat[0], category2:chooseCat[1], category3:chooseCat[2]})

      if(todo.cost<=0){
        showAlert('error',`The request must have a reasonable price for the model to do it`)
      }else{
        if(!todo.details){
          showAlert('error',`Don´t forget to write what kind of request do you want the model to do`)
        }else{
          const collectionRef = collection(db,"pending")
          const docRef = await addDoc(collectionRef, {...todo, email:currentUser.email ,timestamp: serverTimestamp(), displayName:currentUser.displayName, photoURL:currentUser.photoURL, idUser:currentUser.id, status:'esperando', type:'custom' })
          setTodo({title:'', details:'', cost:0, category1:'', category2:'', category3:''})
          setInput('')
          setListCat([])
          setChooseCat([])
          showAlert('success',`New request has been sent successfully`)
        }
      }
     
    }

    
  }
  const showAlert = (type,msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  return (
    <MKBox component="section" py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container item>
          <MKBox
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={5}
                position="relative"
                px={0}
                sx={{
                  backgroundImage: ({
                    palette: { gradients },
                    functions: { rgba, linearGradient },
                  }) =>
                    `${linearGradient(
                      rgba(gradients.dark.main, 0.8),
                      rgba(gradients.dark.state, 0.8)
                    )}, url(${bgImage})`,
                  backgroundSize: "cover",
                }}
              >
                <MKBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <MKBox py={6} pr={6} pl={{ xs: 6, sm: 12 }} my="auto">
                    <MKTypography variant="h3" color="white" mb={1}>
                      Request me 
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      Fill up the form and tell the model what kind of fetish do you want the model to do.
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      The model will see the request and if she wants to do it, she will have to accept it and send the work for you.
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      Once you receive the material, we send the money to the model.
                    </MKTypography>

             
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid item xs={12} lg={7}>
                <MKBox component="form" p={2} method="post">
                  <MKBox px={3} py={{ xs: 2, sm: 6 }}>
                    <MKTypography variant="h2" mb={1}>
                      Ask me directly
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mb={2}>
                      You can make a request directly to a model
                    </MKTypography>
                  </MKBox>
                  <MKBox pt={0.5} pb={3} px={3}>
                    <Grid container>
                      <Grid item xs={12} pr={1} mb={6}>
                          
                            {chooseCat?.map((choose, index)=>(
                             <Button onClick={()=>removeCat(choose)} sx={{ boxShadow:2,  margin: 2 ,p:1  }} key={index}>
                                <MKTypography variant="body2" color="text">
                                  {choose}  
                                </MKTypography>
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="default"
                                    size="small"
                                  > 
                                    <CloseIcon />
                                  </IconButton>
                              </Button>
                            ))} 

                            <MKInput
                                variant="standard"
                                label="Category"
                                placeholder="Choose at least 1 category for the request"
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value = {input}
                                onChange={( e ) => {
                                  setInput(e.target.value)  
                                  findChange(e.target.value)
                              }}
                            />

                            {listCat.map((list, index)=>(
                              <Button onClick={()=>ChooseCat(list.name)} key={index}>
                                <MKTypography variant="body2" color="text" mb={1}>
                                  {list.name}
                                </MKTypography>
                              </Button>
                            ))} 

                      </Grid>
                      <Grid item xs={12} pr={1} mb={6}>
                        <MKInput
                          variant="standard"
                          label="Cost"
                          placeholder="How much to pay for the request"
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          type="number"
                          value={todo.cost}
                          onChange={e=>setTodo({...todo,cost:e.target.value})}

                        />
                      </Grid>
                      <Grid item xs={12} pr={1} mb={6}>
                        <MKInput
                          variant="standard"
                          label="Your request"
                          placeholder="I want you to..."
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          multiline
                          rows={6}

                          value = {todo.details}
                          onChange={e=>setTodo({...todo,details:e.target.value})}

                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      md={6}
                      justifyContent="flex-end"
                      textAlign="right"
                      ml="auto"
                    >
                      <MKButton color="info" onClick={onSubmit}>
                        Send Request
                      </MKButton>
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
                
        
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'bottom', horizontal:'center'}}>
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>



      </Container>
    </MKBox>
  );
}

export default PersonalRequest;
