import fetch from "isomorphic-unfetch";
import Layout from "../components/pageLayouts/layout_tategaki";
import ArticleCard from "../components/pageSections/articleCard";
import AdaptiveContainer from "../components/pageSections/adaptiveContainer";
import Avatar from "../components/avatar";
import { getText } from "../utils/textService";
import { colors } from "../components/colors";
const Index = props => (
    <div className="outer-container">
        <Layout renderComment={false} renderNav={true}>
            <div className="articles-container">
                <ArticleCard
                    data={{
                        title: "这是一个测试用标题",
                        time: "二零一八年 十二月 二十九日",
                        tags: ["标签", "标签", "标签"],
                        abstract:
                            "2016 几乎一整年没有更新过博客，平时都在忙些什么呢？空闲时候偶尔会有一些奇怪想法，但大多数都在一开始就被否定，原因是觉得根本没有用处，造轮子是需要花时间的。如果的确有实际需要而没有特别好的现成品，我就会很兴奋，想马上就去实现，想比别人做的更好，更简单易用。希望以后依然能这样一直保持好奇与创作冲动，不枉自己喜欢过的那些电影，听过的音乐，还有一切美好。",
                        image: undefined
                    }}
                />
                <ArticleCard
                    data={{
                        title: "这是一个测试用标题",
                        time: "二零一八年 十二月 二十九日",
                        tags: ["标签", "标签", "标签"],
                        abstract:
                            "2016 几乎一整年没有更新过博客，平时都在忙些什么呢？空闲时候偶尔会有一些奇怪想法，但大多数都在一开始就被否定，原因是觉得根本没有用处，造轮子是需要花时间的。如果的确有实际需要而没有特别好的现成品，我就会很兴奋，想马上就去实现，想比别人做的更好，更简单易用。希望以后依然能这样一直保持好奇与创作冲动，不枉自己喜欢过的那些电影，听过的音乐，还有一切美好。",
                        image: "/static/image/test_image.jpg"
                    }}
                />
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
                    font-size: 3rem;
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
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: auto;
                    min-width: 30vw;
                    max-width: 40vw;
                    padding: 0;
                    -moz-box-shadow: inset 36px 0 32px -32px #888888;
                    -webkit-box-shadow: inset 36px 0 32px -32px #888888;
                    box-shadow: inset 36px 0 32px -32px #888888;
                }
                .articles-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: auto;
                    padding: 0 5vw;
                }
                .firstCharBlackBg::first-letter {
                    background: #000000;
                    color: #ffffff;
                    padding-top: 0.8rem;
                    border-radius: 10px;
                }
                .titleName {
                    margin-bottom: 9vh;
                }
                .avatarContainer {
                    margin-bottom: 4vh;
                }
                .sakuraImage {
                    width: 10vw;
                    min-width: 200px;
                    height: auto;
                    position: absolute;
                    bottom: 2vh;
                    right: 1vw;
                    z-index: -1;
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
