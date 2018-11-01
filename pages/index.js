import fetch from "isomorphic-unfetch";
import Layout from "../components/pageLayouts/layout_tategaki";

import Prices from "../components/prices";

const Index = props => (
    <div>
        <Layout>
            <div className="reversed-column">
                <p>Area 1</p>
            </div>
            <div className="reversed-column">
                <p>Area 2</p>
            </div>
            <div className="reversed-column">
                <p>Area 333333</p>
            </div>
            <div className="reversed-column">
                <p>Area 333333</p>
            </div>
            <div className="reversed-column">
                <p>Area 333333</p>
            </div>
            <div className="reversed-column">
                <p>Area 333333</p>
            </div>
        </Layout>
        <style jsx>
            {`
                .tategaki-container {
                }
                .tategaki-outer-container {
                }
                .reversed-column {
                    flex: 1;
                    width: 500px;
                }
            `}
        </style>
    </div>
);

// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
//   const data = await res.json();

//   return {
//     bpi: data.bpi
//   };
// }

export default Index;
