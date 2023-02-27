import { AuthProvider } from '../Auth'
import Layout from '../components/Layout'
import '../styles/globals.css'

import {AuthContextProvider} from "../Auth"
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import AppInsideBar from '../components/modules/views/AppInsideBar';
import { ThemeProvider } from '@mui/material'
import theme from "../assets/theme";

// function MyApp({ Component, pageProps }) {
//   return (
//     <AuthProvider>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </AuthProvider>
  
//   )
// }

// export default MyApp


const noAuthRequired = ['/', '/login', '/register']

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return ( 
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
            {noAuthRequired.includes(router.pathname)?(
              <Component {...pageProps} />
            ) : (
              <ProtectedRoute>
                    <AppInsideBar />
                    <Component {...pageProps} />
                
              </ProtectedRoute>
            )}

          </AuthContextProvider>
    </ThemeProvider>
   
   
  )
}

export default MyApp
