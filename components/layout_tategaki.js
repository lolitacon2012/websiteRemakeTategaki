import Head from 'next/head';
import Navbar from './navbar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Kannagi Peekumii</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/united/bootstrap.min.css"/>
    </Head>
    <div className="container-tategaki-outer">

<div className="container-tategaki">
      {props.children}
    </div>
    <Navbar isBottom/>
    </div>
    <style jsx>{`
      .container-tategaki-outer {
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      .container-tategaki{
        flex: 1;
      }
    `}</style>
  </div>
);

export default Layout;