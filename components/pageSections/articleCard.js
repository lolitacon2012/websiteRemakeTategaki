import { colors } from "../colors";
import { getText } from "../../utils/textService";
import Router from "next/router";
const ArticleCard = ({ data }) => (
    <div className="container">
        {!!data.image && <div className="image-container" />}
        <div className="outerContainer tategaki">
            <div className="timeTagContainer">
                <p className="timetext">{data.time}</p>
                <div className="tagContainer">
                    {data.tags.map(t => {
                        return (
                            <p
                                className="tag"
                                key={t.toString() + Math.random()}
                            >
                                {t}
                            </p>
                        );
                    })}
                </div>
            </div>
            <div
                className="titleContainer"
                onClick={() =>
                    Router.push({
                        pathname: "/article",
                        query: { id: data.id }
                    })
                }
            >
                <h2>{data.title}</h2>
            </div>
            <p className="abstract">{data.abstract}</p>
        </div>
        <style jsx>
            {`
                .outerContainer {
                    width: auto;

                    display: flex;
                    justify-content: space-between;
                    align-items: start;

                    flex-direction: column;
                    flex: 1;
                }
                .timeTagContainer {
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row;
                    padding: 0;
                    margin: 0;
                    align-items: center;
                }
                .timetext {
                    font-weight: normal;
                    font-size: 1rem;
                    color: ${colors.darkGray};
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
                    margin: 1rem 0;
                    letter-spacing: 2px;
                }
                .tag:hover {
                    color: ${colors.imoPink};
                    opacity: 1;
                }
                h2 {
                    margin: 0 1rem;
                    padding: 1rem 0.8rem;
                    font-size: 2.6rem;
                    letter-spacing: 4px;
                    font-weight: lighter;
                    cursor: pointer;
                    border-radius: 10px;
                    transition: 0.3s;
                }
                h2:hover {
                    background: ${colors.imoPink};
                    color: #ffffff;
                }
                .titleContainer {
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    margin: 0;
                    min-width: 6rem;
                }
                .image-container {
                    width: 30rem;
                    flex: 0.6;
                    border-radius: 10px;
                    background-image: url(${data.image});
                    background-repeat: no-repeat;
                    background-size: cover;
                    margin-bottom: 2rem;
                }
                p {
                    line-height: 2rem;
                    font-size: 1.2rem;
                    letter-spacing: 1.66px;
                    cursor: pointer;
                }
                .container {
                    height: 70%;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    padding: 0 12px 0 48px;
                    margin: 0 36px;
                }
            `}
        </style>
    </div>
);

export default ArticleCard;
