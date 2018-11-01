import Head from "next/head";
import { isMobile } from "react-device-detect";
import font from "../../assets/fonts/NotoSerifCJKjp-Light.otf";
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
        console.log(font);
        console.log("YESYESYES");
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
            <div style={{}}>
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
                    @font-face {
  font-family: 'Noto Serif Japanese';
                    src: url('${font}') format('opentype');
}

                        html,
                        body {
                            height: 100%;
                            overflow: hidden;
                            margin: 0;
                            width: 100%;
                            font-family: "Noto Serif Japanese", "Helvetica", "Tahoma", "Arial",
                                "Microsoft YaHei", "微软雅黑", "SimSun", "宋体",
                                "STXihei", "冬青体", "华文细黑", "Heiti", "黑体",
                                sans-serif;
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
