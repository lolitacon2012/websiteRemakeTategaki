import Head from "next/head";
import { isMobile } from "react-device-detect";
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
    }
    handleScroll() {
        const offSetY = this.wrapperContainer.current.scrollTop;
        this.setState({
            contentRightOffset: 0 - offSetY
        });
        this.handleScrollViewportChange();
    }
    handleScrollViewportChange() {
        const contentWidth = this.realContainer.current.offsetWidth;
        const contentOverflowWidth =
            contentWidth - document.documentElement.clientWidth;
        const scrollableWidth =
            contentOverflowWidth > 0 ? contentOverflowWidth : 0;
        const fakeContentHeight =
            document.documentElement.clientHeight + scrollableWidth;
        this.setState({
            fakeContentHeight
        });
    }
    render() {
        return (
            <div>
                <Head>
                    <title>Kannagi Peekumii</title>
                    <meta
                        name="viewport"
                        content="width=device-width, height=device-height initial-scale=1.0, shrink-to-fit=no"
                    />
                    <meta charSet="utf-8" />
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
                            ref={this.wrapperContainer}
                            className="wrapper-container"
                            onScroll={this.handleScroll}
                        >
                            <div
                                style={{ height: this.state.fakeContentHeight }}
                            />
                        </div>
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
                        html,
                        body {
                            height: 100%;
                            overflow: hidden;
                            margin: 0;
                            width: 100%;
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
                        .wrapper-container {
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            overflow: scroll;
                        }
                        .mobile-container {
                            display: flex;
                            flex-direction: column-reverse;
                            width: 100vw;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Layout;
