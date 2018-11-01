import fetch from "isomorphic-unfetch";
import Layout from "../components/pageLayouts/layout_tategaki";

import Prices from "../components/prices";

const Index = props => (
    <div>
        <Layout>
            <div className="reversed-column">
                <p>Area 6</p>
            </div>
            <div className="reversed-column">
                <p>Area 5</p>
            </div>
            <div className="reversed-column">
                <p>Area 4</p>
            </div>
            <div className="reversed-column">
                <p>Area 3</p>
            </div>
            <div className="reversed-column">
                <p>Area 2</p>
            </div>
            <div className="reversed-column">
                <p>
                    真草千字文　勅員外散騎侍郎周興嗣次韻。 天地玄黄。宇宙洪荒。
                    天地は玄黄、宇宙は洪荒なり。
                </p>
            </div>
        </Layout>
        <style jsx>
            {`
                .tategaki-container {
                }
                .tategaki-outer-container {
                }
                .reversed-column {
                    writing-mode: vertical-rl;
                    -ms-writing-mode: tb-rl;
                    flex: 1;
                    border: 10px solid #392827;
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
