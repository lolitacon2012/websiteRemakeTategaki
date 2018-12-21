import Head from "next/head";
import { isMobile } from "react-device-detect";
import font from "../../build/fonts/SourceHanSerifCN-Light.woff";
import { colors } from "../colors";
import { debounce } from "../../utils/debounce";
import anime from "animejs";
import Disqus from "disqus-react";
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
        this.handleForegroundCanvas = this.handleForegroundCanvas.bind(this);
        this.renderDisqusComment = this.renderDisqusComment.bind(this);
    }
    componentDidMount() {
        this.handleScrollViewportChange();
        window.addEventListener("resize", this.handleScrollViewportChange);
        window.addEventListener("scroll", this.handleScroll);
        this.handleForegroundCanvas();
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
        console.log({
            fakeContentHeight: this.state.fakeContentHeight,
            offSetY,
            "window.innerWidth": window.innerWidth,
            "window.innerHeight": window.innerHeight,
            topOffset: isEnd
                ? offSetY - this.state.fakeContentHeight - window.innerHeight
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
    handleForegroundCanvas() {
        var canvasEl = document.getElementById("foregroundCanvas");
        if (canvasEl) {
            var ctx = canvasEl.getContext("2d");
            var numberOfParticules = 15;
            var pointerX = 0;
            var pointerY = 0;
            var tap = "mouseup";
            var colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

            var setCanvasSize = debounce(() => {
                canvasEl.width = window.innerWidth * 2;
                canvasEl.height = window.innerHeight * 2;
                canvasEl.style.width = window.innerWidth + "px";
                canvasEl.style.height = window.innerHeight + "px";
                canvasEl.getContext("2d").scale(2, 2);
            }, 500);

            var render = anime({
                duration: Infinity,
                update: function() {
                    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
                }
            });

            document.addEventListener(
                tap,
                function(e) {
                    if (
                        e.target.id !== "sidebar" &&
                        e.target.id !== "toggle-sidebar" &&
                        e.target.nodeName !== "A" &&
                        e.target.nodeName !== "IMG"
                    ) {
                        render.play();
                        updateCoords(e);
                        animateParticules(pointerX, pointerY);
                    }
                },
                false
            );

            setCanvasSize();
            window.addEventListener("resize", setCanvasSize, false);
        }
        function updateCoords(e) {
            pointerX =
                (e.clientX || e.touches[0].clientX) -
                canvasEl.getBoundingClientRect().left;
            pointerY =
                e.clientY ||
                e.touches[0].clientY - canvasEl.getBoundingClientRect().top;
        }
        function setParticuleDirection(p) {
            var angle = (anime.random(0, 360) * Math.PI) / 180;
            var value = anime.random(50, 180);
            var radius = [-1, 1][anime.random(0, 1)] * value;
            return {
                x: p.x + radius * Math.cos(angle),
                y: p.y + radius * Math.sin(angle)
            };
        }
        function createParticule(x, y) {
            var p = {};
            p.x = x;
            p.y = y;
            p.color = colors[anime.random(0, colors.length - 1)];
            p.radius = anime.random(16, 32);
            p.endPos = setParticuleDirection(p);
            p.draw = function() {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                ctx.fillStyle = p.color;
                ctx.fill();
            };
            return p;
        }
        function renderParticule(anim) {
            for (var i = 0; i < anim.animatables.length; i++) {
                anim.animatables[i].target.draw();
            }
        }

        function animateParticules(x, y) {
            //var circle = createCircle(x, y);
            var particules = [];
            for (var i = 0; i < numberOfParticules; i++) {
                particules.push(createParticule(x, y));
            }
            anime.timeline().add({
                targets: particules,
                x: function(p) {
                    return p.endPos.x;
                },
                y: function(p) {
                    return p.endPos.y;
                },
                radius: 0.1,
                duration: anime.random(1200, 1800),
                easing: "easeOutExpo",
                update: renderParticule
            });
        }
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
                        <div className="foreground-canvas-container">
                            <canvas id="foregroundCanvas" />
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
                            overflow-x: hidden;
                            margin: 0;
                            width: 100%;
                            font-family: "Source Serif TC min";
                            background-color: ${colors.lightYellow};
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
                            height: 100vh;
                            overflow-y: hidden;
                            top: 0;
                            bottom: 0;
                            z-index: 9992;
                            background-color: #ff0000;
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
                        .foreground-canvas-container {
                            position: fixed;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            top: 0;
                            width: 100vw;
                            height: 100vh;
                            z-index: 9990;
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
