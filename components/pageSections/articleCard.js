import { colors } from "../colors";
import { getText } from "../../utils/textService";
const ArticleCard = ({ data }) => (
    <div className="outerContainer">
        <div className="timeTagContainer">
            <p className="tategaki timetext">{data.time}</p>
            <div className="tagContainer">
                {data.tags.map(t => {
                    return <p className="tategaki tag">{t}</p>;
                })}
            </div>
        </div>
        <div className="titleContainer">
            <h2 className="tategaki">{data.title}</h2>
            {!!data.image && <div className="image-container" />}
        </div>
        <div className="abstractContainer">
            <p className="tategaki">{data.abstract}</p>
        </div>
        <style jsx>
            {`
                .outerContainer {
                    width: auto;
                    height: 66%;
                    padding: 0 12px 0 48px;
                    display: flex;
                    justify-content: space-between;
                    align-items: start;
                    margin: 0 36px;
                    flex-direction: row-reverse;
                }
                .timeTagContainer {
                    height: 100%;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    padding: 0;
                    margin: 0;
                    align-items: center;
                }
                .timetext {
                    font-weight: lighter;
                    font-size: 0.8rem;
                    color: ${colors.gray};
                }
                .tag {
                    font-weight: bolder;
                    font-size: 1rem;
                    opacity: 0.65;
                    color: ${colors.imoBlue};
                    cursor: pointer;
                    transition: 0.3s;
                    margin: 1rem 0;
                }
                .tag:hover {
                    color: ${colors.imoPink};
                    opacity: 1;
                }
                h2 {
                    margin: 0 1rem;
                    padding: 1rem 0.8rem;
                    font-size: 2.4rem;
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
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0;
                    margin: 0;
                    min-width: 6rem;
                }
                .image-container {
                    border-radius: 100%;
                    width: 6rem;
                    height: 6rem;
                    background-image: url(${data.image});
                    background-repeat: no-repeat;
                    background-size: cover;
                    margin-bottom: 1rem;
                }
                p {
                    line-height: 2rem;
                    font-size: 1.2rem;
                    letter-spacing: 1.66px;
                    cursor: pointer;
                }
            `}
        </style>
    </div>
);

export default ArticleCard;
