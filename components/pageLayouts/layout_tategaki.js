import Head from "next/head";
import { isMobile } from "react-device-detect";
import font from "../../build/fonts/SourceHanSerifCN-Light.woff";
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.realContainer = React.createRef();
        this.wrapperContainer = React.createRef();
        this.state = {
            contentRightOffset: 0,
            fakeContentHeight: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollViewportChange = this.handleScrollViewportChange.bind(
            this
        );
    }
    componentDidMount() {
        this.handleScrollViewportChange();
        window.addEventListener("resize", this.handleScrollViewportChange);
        window.addEventListener("scroll", this.handleScroll);
    }
    handleScroll() {
        const doc = document.documentElement;
        const top =
            (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        const offSetY = top;
        this.setState({
            contentRightOffset: 0 - offSetY
        });
        this.handleScrollViewportChange();
    }
    handleScrollViewportChange() {
        const contentWidth = this.realContainer.current.offsetWidth;
        const contentOverflowWidth = contentWidth - window.innerWidth;
        const scrollableWidth =
            contentOverflowWidth > 0 ? contentOverflowWidth : 0;
        const fakeContentHeight = window.innerHeight + scrollableWidth;
        this.setState({
            fakeContentHeight
        });
    }
    render() {
        return (
            <div style={{}}>
                <Head>
                    <title>Kannagi Peekumii</title>
                    <meta
                        name="viewport"
                        content="width=device-width, height=device-height initial-scale=1.0, shrink-to-fit=no"
                    />
                    <meta charSet="UTF-8" />
                </Head>
                {!isMobile && (
                    <div>
                        <div
                            className="real-container"
                            ref={this.realContainer}
                            style={{ right: this.state.contentRightOffset }}
                        >
                            {this.props.children}
                        </div>
                        <div
                            className="fake-container"
                            style={{ height: this.state.fakeContentHeight }}
                        />
                    </div>
                )}
                {isMobile && (
                    <div className="mobile-wrapper-container">
                        <div
                            className="mobile-container"
                            ref={this.realContainer}
                        >
                            {this.props.children}
                        </div>
                    </div>
                )}
                <style jsx global>
                    {`
                        @font-face {
                            font-family: 'Source Serif TC min';
                            src: url('${font}') format('woff');
                        }
                        html,
                        body {
                            overflow-x: hidden;
                            margin: 0;
                            width: 100%;
                            font-family: "Source Serif TC min";
                        }
                        ::-webkit-scrollbar {
                            width: 0px;  /* remove scrollbar space */
                            background: transparent;  /* optional: just make scrollbar invisible */
                        }
                    `}
                </style>
                <style jsx>
                    {`
                        .real-container {
                            position: fixed;
                            display: flex;
                            flex-direction: row;
                            height: 100vh;
                            overflow-y: hidden;
                            top: 0;
                            bottom: 0;
                        }
                        .mobile-container {
                            display: flex;
                            flex-direction: column-reverse;
                            width: 100vw;
                        }
                        .fake-container {
                            pointer-events: none;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Layout;
