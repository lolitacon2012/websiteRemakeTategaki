import { isMobile } from "react-device-detect";
const AdaptiveContainer = ({ children, forceHorizontal }) => (
    <div className="outerContainer">
        <div
            className={
                forceHorizontal || isMobile
                    ? "innerContainer-horizontal"
                    : "innerContainer-vertical"
            }
        >
            {children}
        </div>
        <style jsx>
            {`
                .outerContainer {
                    padding: 4px;
                }
                .innerContainer-vertical {
                    -webkit-writing-mode: vertical-rl;
                    -ms-writing-mode: tb-rl;
                    writing-mode: vertical-rl;
                    padding: 80px;
                }
                .innerContainer-horizontal {
                    padding: 8px 0 8px 0;
                }
            `}
        </style>
    </div>
);

export default AdaptiveContainer;
