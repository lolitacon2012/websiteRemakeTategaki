import Head from "next/head";
import { isMobile } from "react-device-detect";
import font from "../../build/fonts/SourceHanSerifCN-Light.woff";
import Disqus from "disqus-react";
import NavigationBar from "../pageSections/navigationBar";
class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.realContainer = React.createRef();
        this.wrapperContainer = React.createRef();
        this.state = {
            contentRightOffset: 0,
            fakeContentHeight: 0,
            contentTopOffset: 0
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollViewportChange = this.handleScrollViewportChange.bind(
            this
        );
        this.renderDisqusComment = this.renderDisqusComment.bind(this);
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
        const isEnd =
            this.state.fakeContentHeight - offSetY <= window.innerHeight;
        this.setState({
            contentRightOffset: isEnd
                ? window.innerHeight - this.state.fakeContentHeight
                : 0 - offSetY,
            contentTopOffset: isEnd
                ? 0 -
                  offSetY -
                  window.innerHeight +
                  this.state.fakeContentHeight
                : 0
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
    renderDisqusComment() {
        const disqusShortname = "kannagi-moe";
        const disqusConfig = {
            // url: this.props.disqusConfig.url,
            // identifier: this.props.disqusConfig.id,
            // title: this.props.disqusConfig.title,
            url: "https://kannagi.moe",
            identifier: "test_homepage",
            title: "test_homepage"
        };
        return (
            <div className="article">
                <h1>ArticleTitleHere</h1>
                <Disqus.CommentCount
                    shortname={disqusShortname}
                    config={disqusConfig}
                >
                    Comments
                </Disqus.CommentCount>
                <p>ArticleBodyHere</p>
                <Disqus.DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                />
            </div>
        );
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
                {!!this.props.renderNav && <NavigationBar />}
                {!isMobile && (
                    <div>
                        <div
                            className="real-container"
                            ref={this.realContainer}
                            style={{
                                right: this.state.contentRightOffset,
                                top: this.state.contentTopOffset
                            }}
                        >
                            <div className="children-container-extend-to-screen-width">
                                {this.props.children}
                            </div>
                        </div>
                        <div
                            className="fake-container"
                            style={{ height: this.state.fakeContentHeight }}
                        />
                        <div className="postfix-container">
                            {this.props.renderComment &&
                                this.renderDisqusComment()}
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
                            font-family: 'Source Serif TC min';
                            src: url('${font}') format('woff');
                        }
                        html,
                        body {
                            -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
                            overflow-x: hidden;
                            margin: 0;
                            width: 100%;
                            -webkit-font-smoothing: subpixel-antialiased;
                            font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei', sans-serif;
                            {/* font-family: "Source Serif TC min"; */}
                        }
                        .tategaki {
                    -webkit-writing-mode: vertical-rl;
                    -ms-writing-mode: tb-rl;
                    writing-mode: vertical-rl;
                }
*, *:before, *:after {
  -webkit-box-sizing: inherit;
  -moz-box-sizing: inherit;
  box-sizing: inherit;
  }
                    `}
                </style>
                <style jsx>
                    {`
                        .real-container {
                            position: fixed;
                            height: 100vh;
                            overflow-y: hidden;
                            top: 0;
                            bottom: 0;
                            z-index: 9992;
                        }
                        .mobile-container {
                            display: flex;
                            flex-direction: column-reverse;
                            width: 100vw;
                        }
                        .fake-container {
                            pointer-events: none;
                        }
                        .children-container-extend-to-screen-width {
                            display: flex;
                            flex-direction: row;
                            min-width: 100vw;
                            height: 100vh;
                            justify-content: flex-end;
                        }
                        .postfix-container {
                            width: 100vw;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Layout;
