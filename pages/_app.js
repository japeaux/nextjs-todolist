import { AuthProvider } from '../Auth'
import Layout from '../components/Layout'
import '../styles/globals.css'

import {AuthContextProvider} from "../Auth"
import { useRouter } from 'next/router'
import ProtectedRoute from '../components/ProtectedRoute'
import AppInsideBar from '../components/modules/views/AppInsideBar';

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
   
  )
}

export default MyApp
