import Head from "next/head";
import { isMobile } from "react-device-detect";
import font from "../../build/fonts/SourceHanSerifCN-Light.woff";
import { colors } from "../colors";
import { debounce } from "../../utils/debounce";
import anime from "animejs";
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
        this.drawBackgroundCanvas = this.drawBackgroundCanvas.bind(this);
        this.handleForegroundCanvas = this.handleForegroundCanvas.bind(this);
    }
    componentDidMount() {
        this.handleScrollViewportChange();
        window.addEventListener("resize", this.handleScrollViewportChange);
        window.addEventListener("scroll", this.handleScroll);
        this.drawBackgroundCanvas();
        this.handleForegroundCanvas();
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
    handleForegroundCanvas() {
        var canvasEl = document.getElementById("foregroundCanvas");
        if (canvasEl) {
            var ctx = canvasEl.getContext("2d");
            var numberOfParticules = 30;
            var pointerX = 0;
            var pointerY = 0;
            // var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown'
            // Fixed the mobile scroll
            var tap = "mousedown";
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

        function createCircle(x, y) {
            var p = {};
            p.x = x;
            p.y = y;
            p.color = "#F00";
            p.radius = 0.1;
            p.alpha = 0.5;
            p.lineWidth = 6;
            p.draw = function() {
                ctx.globalAlpha = p.alpha;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
                ctx.lineWidth = p.lineWidth;
                ctx.strokeStyle = p.color;
                ctx.stroke();
                ctx.globalAlpha = 1;
            };
            return p;
        }

        function renderParticule(anim) {
            for (var i = 0; i < anim.animatables.length; i++) {
                anim.animatables[i].target.draw();
            }
        }

        function animateParticules(x, y) {
            var circle = createCircle(x, y);
            var particules = [];
            for (var i = 0; i < numberOfParticules; i++) {
                particules.push(createParticule(x, y));
            }
            anime
                .timeline()
                .add({
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
                })
                .add({
                    targets: circle,
                    radius: anime.random(80, 160),
                    lineWidth: 0,
                    alpha: {
                        value: 0,
                        easing: "linear",
                        duration: anime.random(600, 800)
                    },
                    duration: anime.random(1200, 1800),
                    easing: "easeOutExpo",
                    update: renderParticule,
                    offset: 0
                });
        }
    }
    drawBackgroundCanvas() {
        const pointSet = [];
        const c = document.getElementById("backgroundCanvas");
        const canvasWidth = Math.max(
            window.innerWidth,
            this.realContainer.current.offsetWidth
        );
        c.width = canvasWidth;
        c.height = window.innerHeight;
        const ctx = c.getContext("2d");
        //generate curve sets
        const stepLength = 1500;
        const curveScope = 2000;
        let currentX = canvasWidth + stepLength;
        ctx.beginPath();
        while (currentX > 0 - stepLength) {
            const switchDirection = Math.random(1) > 0.5;
            const startTop = Math.random(2) > 0.6;
            const endTop = Math.random(3) > 0.6;
            const sameSide = startTop == endTop;
            let x0 = currentX + (Math.random(4) * curveScope - curveScope / 2);
            let x2 =
                currentX -
                curveScope +
                (Math.random(5) * curveScope - curveScope / 2);
            if (sameSide) {
                if (!switchDirection) {
                    x0 += 500;
                    x2 -= 500;
                } else {
                    x2 += 500;
                    x0 -= 500;
                }
            }
            const x1 = (x0 + x2) / 2;
            const midPointDiffX = ((Math.random() - 0.5) * x1) / 1.3;
            const midPointDiffY =
                ((Math.random() - 0.5) * window.innerHeight) / 1.5;
            if (Math.abs(x2 - x0) < 900) {
                continue;
            }
            currentX -= stepLength;
            pointSet.push({
                x0: switchDirection ? x2 : x0,
                y0: startTop ? 0 : window.innerHeight,
                x1: sameSide ? x1 : x1 + midPointDiffX,
                y1: sameSide
                    ? startTop && endTop
                        ? window.innerHeight
                        : 0
                    : midPointDiffY + window.innerHeight / 2,
                x2: switchDirection ? x0 : x2,
                y2: endTop ? 0 : window.innerHeight
            });
        }

        const gradient = ctx.createRadialGradient(75, 50, 5, 9, 60, 100);

        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("1", "blue");
        ctx.shadowBlur = 1;
        ctx.shadowColor = colors.middlePink;
        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.middlePink;
        pointSet.forEach(p => {
            const { x0, x1, x2, y0, y1, y2 } = p;
            ctx.strokeStyle = colors.middlePink;
            ctx.moveTo(x0, y0);
            ctx.quadraticCurveTo(x1, y1, x2, y2);
            ctx.stroke();
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
                        <div className="foreground-canvas-container">
                            <canvas id="foregroundCanvas" />
                        </div>
                        <div className="top-purple-pannel" />
                        <div className="bottom-purple-pannel" />
                        <div
                            className="real-container"
                            ref={this.realContainer}
                            style={{ right: this.state.contentRightOffset }}
                        >
                            <div className="background-canvas-container">
                                <canvas id="backgroundCanvas">
                                    Your browser does not support the HTML5
                                    canvas tag.
                                </canvas>
                            </div>
                            <div className="children-container-extend-to-screen-width">
                                {this.props.children}
                            </div>
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
                        .children-container-extend-to-screen-width {
                            display: flex;
                            flex-direction: row;
                            min-width: 100vw;
                            height: 100vh;
                            background-color: ${colors.lightYellow};
                            justify-content: flex-end;
                            padding-top: 128px;
                            padding-bottom: 128px;
                        }
                        .background-canvas-container {
                            position: absolute;
                        }
                        .top-purple-pannel {
                            position: fixed;
                            left: 0;
                            right: 0;
                            top: 0;
                            width: 100vw;
                            height: 128px;
                            background-color: ${colors.middlePurple};
                            z-index: 9997;
                        }
                        .bottom-purple-pannel {
                            position: fixed;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            width: 120vw;
                            height: 128px;
                            background-color: ${colors.middlePurple};
                            z-index: 9998;
                        }
                        .foreground-canvas-container {
                            position: fixed;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            top: 0;
                            width: 100vw;
                            height: 100vh;
                            z-index: 9999;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Layout;
