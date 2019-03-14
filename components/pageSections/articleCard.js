import { colors } from "../colors";
import { getText } from "../../utils/textService";
import Router from "next/router";
import { isMobile } from "react-device-detect";

class ArticleCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentWidth: 0,
        }
        this.contentFullWidth = React.createRef();
        this.handleScrollViewportChange = this.handleScrollViewportChange.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleScrollViewportChange);
        this.handleScrollViewportChange();
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.handleScrollViewportChange);
    }
    handleScrollViewportChange() {
        if(isMobile){
            return;
        }
        const contentWidth = this.contentFullWidth.current.offsetWidth;
        this.setState({
            contentWidth
        })
    }
    render() {
        const {data} = this.props;
        return (
            
    <div className="container">
    {!!data.image && <div className="image-container" />}
    <div className={`${!isMobile && "tategaki"} outerContainer`} style={{ width: this.state.contentWidth }}>
        <div ref={this.contentFullWidth}>
        {isMobile && (<hr/>)}
        {!isMobile && (<div className="timeTagContainer">
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
        </div>)}
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
        {!!isMobile && (<div className="timeTagContainer">
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
        </div>)}
    </div>
    <style jsx>
        {`
            hr {
                border-top: 1px dashed ${colors.lightGray};
            }
            .outerContainer {
                display: inline-block;
                justify-content: center;
                flex-direction: ${isMobile ? 'row' : 'column'};
                flex: 1;
            }
            .timeTagContainer {
                height: ${isMobile ? 'auto' : '100%'};
                width: ${isMobile ? '100%' : 'auto'};
                display: flex;
                flex-direction: row;
                padding: 0;
                margin: 0;
                align-items: center;
            }
            .timetext {
                font-size: 1rem;
                color: ${colors.darkGray};
                flex: 2.5;
            }
            .tagContainer {
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
            }
            .tag {
                font-size: 1rem;
                opacity: 0.7;
                color: ${colors.darkGreen};
                cursor: pointer;
                transition: 0.3s;
                margin: 0.8rem 0.5rem 0 0;
                letter-spacing: 2px;
            }
            .tag:hover {
                color: ${colors.imoPink};
                opacity: 1;
            }
            h2 {
                margin: ${isMobile ? "0" : "0 1rem"};
                padding: ${isMobile ? "0" : "1rem 0.8rem"};
                font-size: ${isMobile ? '2rem' : '2.5rem'};
                letter-spacing: ${isMobile ? "1px" : "4px"};
                font-weight: ${isMobile ? "border" : "lighter"};
                cursor: pointer;
                border-radius: 10px;
                transition: 0.3s;
            }
            h2:hover {
                background: ${colors.imoPink};
                color: #ffffff;
            }
            .titleContainer {
                padding: 0;
                margin: ${ isMobile ? '3rem 0' : '0'};
                min-width: 6rem;
                display: flex;
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
                font-size: 1rem;
                letter-spacing: ${isMobile ? '1px' : '1.66px'};
                cursor: pointer;
            }
            .container {
                height: ${isMobile ? 'auto' : '70%'};
                width: ${isMobile ? '100%' : 'auto'};
                display: flex;
                align-items: center;
                flex-direction: ${isMobile ? 'row' : 'column'};
                padding: ${isMobile ? "16px" : "0 12px 0 48px"};
                margin: ${isMobile ? "12px" : "0 36px"};
            }
        `}
    </style>
</div>
)
    }
}


export default ArticleCard;
