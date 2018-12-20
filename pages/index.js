import fetch from "isomorphic-unfetch";
import Layout from "../components/pageLayouts/layout_tategaki";
import AdaptiveContainer from "../components/paseSections/adaptiveContainer";
import { getText } from "../utils/textService";
import { colors } from "../components/colors";
const Index = props => (
    <div>
        <Layout>
            {/* <AdaptiveContainer>
                <div
                    style={{
                        width: "55px",
                        height: "320px",
                        backgroundColor: "rgba(200,200,45,0.5)",
                        marginRight: "200px"
                    }}
                />
            </AdaptiveContainer> */}
            <div className="right-intro-container">
                <h1 className="tategaki-dense">{getText("myname")}</h1>
            </div>
            <div>
                
            </div>
        </Layout>
        <style jsx>
            {`
                h1 {
                    font-size: 3rem;
                }
                .tategaki {
                    -webkit-writing-mode: vertical-rl;
                    -ms-writing-mode: tb-rl;
                    writing-mode: vertical-rl;
                }
                .tategaki-dense {
                    -webkit-writing-mode: vertical-rl;
                    -ms-writing-mode: tb-rl;
                    writing-mode: vertical-rl;
                    letter-spacing:-12px;
                }
                .right-intro-container {
                    background-color: ${colors.middlePurple};
                    height: 100vh;
                    width:50vw;
                    box-shadow: 100px 300px -500px red;
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
