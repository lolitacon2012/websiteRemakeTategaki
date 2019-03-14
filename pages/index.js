import Layout from "../components/pageLayouts/layout_tategaki";
import ArticleCard from "../components/pageSections/articleCard";
import Avatar from "../components/avatar";
import { getText } from "../utils/textService";
import { colors } from "../components/colors";
import { isMobile } from "react-device-detect";
import { getArticleList } from "../utils/articleService";
const Index = props => (
    <div className="outer-container">
        <Layout renderComment={false} renderNav={true} keepNavOpened={true}>
            <div className="articles-container">
                {getArticleList(5).map(data => {
                    return <ArticleCard data={data} key={data.id} />;
                })}
            </div>
            <div className="right-intro-container">
                <img className="sakuraImage" src="/static/image/sakura.png" />
                <h1 className="tategaki firstCharBlackBg titleName">
                    {getText("myNameTitle")}
                </h1>
                <div className="avatarContainer">
                    <Avatar size={85} border={true} />
                </div>
                <p>
                    <q>In principio erat verbum.</q>
                </p>
            </div>
        </Layout>
        <style jsx>
            {`
                h1 {
                    font-size: ${isMobile ? "2.4rem" : "3rem"};
                    font-weight: 100;
                    letter-spacing: 1rem;
                }
                q {
                    font-size: 1.5rem;
                    font-weight: 300;
                    font-style: italic;
                    color: ${colors.gray};
                }
                .right-intro-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: ${isMobile ? "flex-start" : "center"};
                    align-items: center;
                    height: ${isMobile ? "auto" : "100vh"};
                    width: 100vw;
                    padding: 0;
                    padding-bottom: ${isMobile ? "4rem" : "0"};
                }
                .articles-container {
                    display: flex;
                    flex-direction: ${isMobile ? "column" : "row"};
                    justify-content: center;
                    align-items: center;
                    height: ${isMobile ? "auto" : "100vh"};
                    width: ${isMobile ? "100vw" : "auto"};
                    padding: ${isMobile ? "4vh" : "0"} ${isMobile ? "0" : "5vw"};
                }
                .firstCharBlackBg::first-letter {
                    background: #000000;
                    color: #ffffff;
                    padding-top: ${isMobile ? "0.6rem" : "0.75rem"};
                    border-radius: 10px;
                }
                .titleName {
                    margin-bottom: ${isMobile ? "2vh" : "7vh"};
                    margin-top: ${isMobile ? "6rem" : "0"};
                }
                .avatarContainer {
                    margin-bottom: 3.5vh;
                }
                .sakuraImage {
                    width: 10vw;
                    min-width: 160px;
                    height: auto;
                    position: absolute;
                    bottom: 2vh;
                    right: 1vw;
                    z-index: -1;
                    opacity: 1;
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
