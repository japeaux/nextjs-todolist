
import * as React from 'react';
import Typography from '../components/modules/components/Typography';
import AppForm from '../components/modules/views/AppForm';
import withRoot from '../components/modules/withRoot';
import { useAuth } from '../Auth';
import AppInsideBar from '../components/modules/views/AppInsideBar';
import ButtonUploadFile from '../components/storage/ButtonUploadFile';
import { Grid, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';

const Profile = () => {

  const {  currentUser } = useAuth()
  const [userAge, setUserAge] = React.useState("success")


  React.useEffect(()=>{
    handleClose()
  },[])

  const handleClose = () => {
    console.log(currentUser)
    getAge(currentUser.birthday)
  };

  const StartEdit = () => {
    console.log(currentUser)
  };

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    setUserAge(age)
  }


  return (
   
    <React.Fragment>
      <AppInsideBar />
      <AppForm>
        <Grid container spacing={2}>


          <Grid item xs={6} md={6}>
            <ButtonUploadFile photoURL={currentUser?.photoURL} />
         
          </Grid>


          <Grid item xs={6} md={4}>
            
            <IconButton  onClick={e=>StartEdit()}>
              <HomeIcon />
            </IconButton>


            <Grid item xs={6} md={4}>

              <Typography variant="h3" gutterBottom  align="center">
                {userAge}
              </Typography>

            </Grid>


            <Grid item xs={6} md={8}>
            </Grid>
          
          
          
          </Grid>


         
        </Grid>

        <React.Fragment>
            
           
           

          
          
            <Typography variant="h3" gutterBottom marked="center" align="center">
              {currentUser?.displayName}
            </Typography>

            <Typography variant="body2" >
              Bio
            </Typography>

            <Typography variant="h5" gutterBottom marked="center" align="center">
              {currentUser?.description}
            </Typography>




        </React.Fragment>
        
      </AppForm>
  
    </React.Fragment>

  );
}

export default withRoot(Profile)