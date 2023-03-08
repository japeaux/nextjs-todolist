import * as React from 'react';
import Button from '../components/Button';
import Typography from '../components/Typography';
import ProductHeroLayout from './ProductHeroLayout';

const backgroundImage = "/assets/16.png";
 
export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
   
      <Typography color="inherit" align="center" variant="h2" marked="center" sx={{mt:10, zIndex:2}}>
        Find your model
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } , zIndex:2}}
      >
        Enjoy searching for the perfect model to make your fetish come true.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/register"
       
        sx={{ minWidth: 200 ,zIndex:4}}
      >
        Register
      </Button>
      
      <Typography variant="body2" color="inherit" sx={{ mt: 2,  zIndex:2 }}>
        Discover the experience
      </Typography>
    </ProductHeroLayout>
  );
}