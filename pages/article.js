import fetch from "isomorphic-unfetch";
import Layout from "../components/pageLayouts/layout_tategaki";
import AdaptiveContainer from "../components/pageSections/adaptiveContainer";
import Avatar from "../components/avatar";
import { getText } from "../utils/textService";
import { colors } from "../components/colors";
import { renderArticle, getArticleMeta } from "../utils/articleService";
import { withRouter } from 'next/router'
class Article extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const data = getArticleMeta(this.props.router.query.id);
        return (
            <div>
                <Layout renderComment={false} renderNav={true} keepNavOpened={true}>
                    <div className="outer-container">
                    <div className="inner-container">
                    
        <div className="titleContainer tategaki">
            {data.title}
        </div>
        <div className="timeTagContainer tategaki">
            <p className="timetext">{data.time}</p>
            <div className="tagContainer">
                {data.tags.map(t => {
                    return <p className="tag" key={t.toString() + Math.random()}>{t}</p>;
                })}
            </div>
        </div>
                    {renderArticle(this.props.router.query.id)}
                    <div className="footer-container">
                    
                    </div>
                    </div>
                    </div>
                </Layout>
                <style jsx>
                    {`
                    .titleContainer{
                        font-size: 3rem;
                        letter-spacing: 10px;
                        padding: 0;
                        font-weight:lighter;
                    }
                    .timeTagContainer {
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    padding: 0 2rem 0 10rem;
                    margin: 0;
                    align-items: center;
                }
                .timetext {
                    font-weight: normal;
                    font-size: 1rem;
                    color: ${colors.darkGray};
                    margin: 0 0 0.5rem 0;
                }
                .tagContainer {
                    display: flex;
                }
                .tag {
                    font-weight: bolder;
                    font-size: 1rem;
                    opacity: 0.65;
                    color: ${colors.imoBlue};
                    cursor: pointer;
                    transition: 0.3s;
                    margin: 0.5rem 0;
                    letter-spacing: 2px;
                }
                .tag:hover {
                    color: ${colors.imoPink};
                }
                    .outer-container {
                            height: 100%;
                            display: flex;
                            align-items: center;
                            padding: 0 15rem;
                        }
                        .inner-container {
                            height: 70%;
                            display: flex;
                            flex-direction: row-reverse;
                            flex:1;
                        }
                    `}
                </style>
            </div>
        )
    }
}

// Index.getInitialProps = async function() {
//   const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
//   const data = await res.json();

//   return {
//     bpi: data.bpi
//   };
// }

export default withRouter(Article);
