
import { useEffect, useState } from 'react'

import { useAuth } from '../../Auth';
import {useRouter} from 'next/router'

import withRoot from '../../components/modules/withRoot';
import BeeTenderzForm from '../../components/modules/views/BeeTenderzForm';
import { Grid } from '@mui/material';
import MKBox from '../../components/MKBox';
import MKTypography from '../../components/MKTypography';
import MKInput from '../../components/MKInput';
import MKButton from '../../components/MKButton';
import Image from 'next/image';


function VerifyAcc() {

  

  const [bgImage, setBgImage] = useState("/assets/16.png")

  const {currentUser} = useAuth()
  const [open,setOpen] = useState(false)
  const [alertType, setAlertType] = useState("success")
  const [alertMessage, setAlertMessage] = useState("")
  const [todo, setTodo] = useState({title:'',details:''})


  const showAlert = (type,msg) => {
    setAlertType(type)
    setAlertMessage(msg)
    setOpen(true)
  }

  const router = useRouter();

  const [input, setInput] = useState('')




  return (
    <>
       <BeeTenderzForm>
       <MKBox
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={2}>
            
              <Grid item xs={12} lg={7}>
                <MKBox component="form" p={2} method="post">
                  <MKBox px={3} py={{ xs: 2, sm: 6 }}>
                    <MKTypography variant="h2" mb={1}>
                     
                    </MKTypography>
                    <MKTypography variant="body1" color="text" mb={2}>
                      Complete you account
                    </MKTypography>
                  </MKBox>
                  <MKBox pt={0.5} pb={3} px={3}>
                    <Grid container>
                      <Grid item xs={12} pr={1} mb={6}>
             

                            <MKInput
                                variant="standard"
                                label="Country"
                                placeholder=""
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value = {input}
                                onChange={( e ) => {
                                  setInput(e.target.value)  
                                  findChange(e.target.value)
                              }}
                            />


                      </Grid>
                      <Grid item xs={12} pr={1} mb={6}>
                        <MKInput
                          variant="standard"
                          label="Genre"
                          placeholder=""
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
                          label="Real Name"
                          placeholder="Like in the id card"
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
                      <MKButton color="info">
                        Create Request
                      </MKButton>
                    </Grid>
                  </MKBox>
                </MKBox>
              </Grid>

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
                      Confirm your identity
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      To confirm you account and identity we need you to upload 2 photos.
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      First one is a valid id card 
                    </MKTypography>
                    <Image src="/docs/doc.svg" height={250} width={400}/>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      Second one is a photo of yourself holding  your id card and a sign writen by hand ´BeeTenderz´ and the date.
                    </MKTypography>
                    <Image src="/docs/selfieDoc.svg" height={550} width={400}/>
                  
                    
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      UPLOAD
                    </MKTypography>
                  
             
                  </MKBox>
                </MKBox>
              </Grid>

            </Grid>
          </MKBox>

      </BeeTenderzForm>
      
    </>
    
    )
}

export default withRoot(VerifyAcc)

