import Head from 'next/head'
import withRoot from '../components/modules/withRoot'
import Home2 from './Home'

 function Home() {
  return (
    <div >
      <Head>
        <title>Side request of</title>
        <meta name="description" content="Oi" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Home2/>

    </div>
  )
}
export default withRoot(Home)
