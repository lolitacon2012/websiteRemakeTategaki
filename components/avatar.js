import { colors } from "./colors";

const Avatar = ({ size, border }) => (
    <div className="outerContainer">
        <img src="/static/image/avatar.jpg" alt="My avatar" />
        <style jsx>
            {`
                .outerContainer {
                    width: ${size}px;
                    height: ${size}px;
                    overflow: hidden;
                    border-radius: ${size}px;
                    border: ${!!border
                        ? "3px solid " + colors.imoPink
                        : "none"};
                    box-shadow: ${!!border
                        ? "0px 0px 10px " + colors.imoPink
                        : "none"};
                    transition: 0.3s;
                }
                .outerContainer:hover {
                    border: ${!!border
                        ? "3px solid " + colors.imoBlue
                        : "none"};
                    box-shadow: ${!!border
                        ? "0px 0px 150px " + colors.imoBlue
                        : "none"};
                    -ms-transform: rotate(-20deg); /* IE 9 */
                    -webkit-transform: rotate(-20deg); /* Safari 3-8 */
                    transform: rotate(-20deg);
                    left: 20px;
                }
                img {
                    width: ${size}px;
                    height: ${size}px;
                }
            `}
        </style>
    </div>
);

export default Avatar;
