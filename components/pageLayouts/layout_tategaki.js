import Head from "next/head";
import { isMobile } from "react-device-detect";
import font from "../../build/fonts/SourceHanSerifCN-Light.woff";
import { colors } from "../colors";
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
    }
    componentDidMount() {
        this.handleScrollViewportChange();
        window.addEventListener("resize", this.handleScrollViewportChange);
        window.addEventListener("scroll", this.handleScroll);
        this.drawBackgroundCanvas();
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
    drawBackgroundCanvas() {
        const c = document.getElementById("backgroundCanvas");
        const canvasWidth = Math.max(
            window.innerWidth,
            this.realContainer.current.offsetWidth
        );
        c.width = canvasWidth;
        c.height = window.innerHeight;
        const ctx = c.getContext("2d");
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = colors.middlePink;
        //generate curve sets
        const stepLength = 400;
        const curveScope = 800;
        let currentX = canvasWidth + stepLength;
        ctx.beginPath();
        let switched = false;
        let noSwitch = 0;
        let forceSwitch = false;
        while (currentX > 0 - stepLength) {
            const x0 =
                currentX + (Math.random() * curveScope - curveScope / 2) / 1.1;
            const x1 = x0 - stepLength / 2;
            const x2 =
                currentX -
                curveScope +
                (Math.random() * curveScope - curveScope / 2) / 1.1;
            const switchDirection = Math.random() > 0.5;
            if (noSwitch > 2) {
                forceSwitch = true;
                noSwitch = 0;
                switched = false;
            } else {
                if (switched == switchDirection) {
                    noSwitch++;
                } else {
                    noSwitch = 0;
                }
            }
            switched = switchDirection;
            ctx.moveTo(switchDirection || forceSwitch ? x1 : x0, 0);
            ctx.quadraticCurveTo(
                x1,
                window.innerHeight / 2,
                switchDirection || forceSwitch ? x0 : x2,
                window.innerHeight
            );
            ctx.stroke();
            currentX -= stepLength;
        }
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
                            z-index: 9999;
                        }
                        .bottom-purple-pannel {
                            position: fixed;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            width: 120vw;
                            height: 128px;
                            background-color: ${colors.middlePurple};
                            z-index: 9999;
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Layout;
