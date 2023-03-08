import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '../components/Button';
import Typography from '../components/Typography';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 100,
  my: 4,
  zIndex: 2,
};

function ProductHowItWorks() {
  const [alignment, setAlignment] = React.useState('client');

  const handleChange = (event, newAlignment) => {
    console.log(newAlignment)
    setAlignment(newAlignment);
  };



  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: '#E9AB17', overflow: 'hidden' , color:'white'}}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="bgbee.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4"component="h2" sx={{ mb: 4 , zIndex: 2}} color="primary" >
          How it works
        </Typography>

        <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="client" sx={{
              "&.MuiToggleButtonGroup-grouped": {
                borderRadius: "0px !important",
                mx: 0,
                border: "0px solid lightgrey !important",
                color:'white'
              }
            }}>Client</ToggleButton>
          <ToggleButton value="model" sx={{
              "&.MuiToggleButtonGroup-grouped": {
                borderRadius: "0px !important",
                mx: 0,
                border: "0px solid lightgrey !important"
              }
            }}>Model</ToggleButton>
        </ToggleButtonGroup>
        <div>

          {alignment == 'model' ? (<>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>1.</Box>
                  <Box
                    component="img"
                    src="/intro/find.svg"
                    alt="suitcase"
                    sx={image}
                  />
                  <Typography variant="h5" align="center" color="secondary" sx={{ zIndex: 2}}>
                    Find a request that wants to do it and apply for it.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>2.</Box>
                  <Box
                    component="img"
                    src="/intro/selfie.svg"
                    alt="graph"
                    sx={image}
                  />
                  <Typography variant="h5" align="center"   color="secondary" sx={{ zIndex: 2}}>
                    Once the model is choosen, the model creates the content.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>3.</Box>
                  <Box
                    component="img"
                    src="/intro/upload.svg"
                    alt="clock"
                    sx={image}
                  />
                  <Typography variant="h5" align="center" color="secondary" sx={{ zIndex: 2}}>
                    Sends the desired request to the client and gets paid.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>) : (<>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>1.</Box>
                  <Box
                    component="img"
                    src="/intro/create.svg"
                    alt="suitcase"
                    sx={image}
                  />
                  <Typography variant="h5" align="center" color="secondary" sx={{ zIndex: 2}}>
                    Creates a request of the fetish desired.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>2.</Box>
                  <Box
                    component="img"
                    src="/intro/choose.svg"
                    alt="graph"
                    sx={image}
                  />
                  <Typography variant="h5" align="center"   color="secondary" sx={{ zIndex: 2}}>
                    Chooses the models that agreed on doing the request.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={item}>
                  <Box sx={number}>3.</Box>
                  <Box
                    component="img"
                    src="/intro/files.svg"
                    alt="clock"
                    sx={image}
                  />
                  <Typography variant="h5" align="center" color="secondary" sx={{ zIndex: 2}}>
                    Receives the files from the models.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>)}
         
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          component="a"
          href="/register"
          sx={{ mt: 8 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
  );
}

export default ProductHowItWorks;