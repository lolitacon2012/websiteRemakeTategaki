import Head from 'next/head';
import Navbar from './navbar';

const Layout = (props) => (
  <div>
    <Head>
      <title>Kannagi Peekumii</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/united/bootstrap.min.css"/>
    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;