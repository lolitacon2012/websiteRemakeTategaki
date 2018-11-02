import fetch from "isomorphic-unfetch";
import Layout from "../components/pageLayouts/layout_tategaki";
import AdaptiveContainer from "../components/paseSections/adaptiveContainer";
import { getText } from "../utils/textService";
const Index = props => (
    <div>
        <Layout>
            {/* <div className="reversed-column">
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
            </div> */}

            <AdaptiveContainer>
                <p>天地玄黄　宇宙洪荒</p>
                <p />
                <p>右通広内　左達承明</p>
            </AdaptiveContainer>
            <AdaptiveContainer>
                <h1>
                    <ruby>
                        千<rt>せん</rt>字<rt>じ</rt>文<rt>もん</rt>
                    </ruby>
                </h1>
            </AdaptiveContainer>
            <AdaptiveContainer>
                <div
                    style={{
                        width: "55px",
                        height: "320px",
                        backgroundColor: "rgba(200,200,45,0.5)",
                        marginRight: "200px"
                    }}
                />
            </AdaptiveContainer>
        </Layout>
        <style jsx>
            {`
                .tategaki-container {
                    padding: 20px;
                    background: red;
                }
                .tategaki-outer-container {
                }
                .reversed-column {
                    -webkit-writing-mode: vertical-rl;
                    -ms-writing-mode: tb-rl;
                    writing-mode: vertical-rl;
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
