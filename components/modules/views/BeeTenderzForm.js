import * as React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '../components/Paper';
import MKBox from '../../MKBox';
import Card from "@mui/material/Card";
import bgImage from "../../../public/bg2.jpg";
import AppFooter from './AppFooter';

function BeeTenderzForm(props) {
  const { children } = props;

  return (
    <MKBox bgColor="black">
           <MKBox
            minHeight="85rem"
            width="100%"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                `${linearGradient(
                  rgba(gradients.dark.main, 0.9),
                  rgba(gradients.dark.state, 0.00009)
                )},  url(/bgbee.png)`,

                // backgroundImage: 'url(/assets/16.png)',

              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "grid",
              placeItems: "center",
            }}
          />
            <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 20 },
              mt: -152,
              mb: 4,
              backgroundColor: ({ palette: { black }, functions: { rgba } }) => rgba(black.main, 0.6),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
             {children}
         
          </Card>
          <AppFooter />
    </MKBox>
  );
}

BeeTenderzForm.propTypes = {
  children: PropTypes.node,
};

export default BeeTenderzForm;