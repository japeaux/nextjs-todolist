import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '../components/modules/components/Markdown';
import Typography from '../components/modules/components/Typography';
import AppAppBar from '../components/modules/views/AppAppBar';
import AppFooter from '../components/modules/views/AppFooter';
import withRoot from '../components/modules/withRoot';
// import terms from '../pages/modules/views/positivy.md';

function Positivity() {
  return (
    <React.Fragment>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
          Positivity
          </Typography>
          {/* <Markdown>{terms}</Markdown> */}
        </Box>
      </Container>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Positivity);