import { colors } from "../colors";
import Avatar from "../avatar";
import { getText } from "../../utils/textService";
import Router from "next/router";
const NavigationBar = ({ keepNavOpened }) => (
    <div className="outerContainer">
        <div className="setContainer">
            <Avatar size={42} border={false} />
            {renderButton(getText("title_home"), () => Router.push("/"))}
        </div>
        <div className="setContainer">
            {renderButton(getText("btn_archive"))}
            {renderButton(getText("btn_tag"))}
            {renderButton(getText("btn_lab"))}
            {renderButton(getText("btn_about"))}
        </div>
        <style jsx>
            {`
                .outerContainer {
                    width: 100%;
                    position: fixed;
                    height: 4rem;
                    z-index: 9999;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: ${!!keepNavOpened ? "0" : colors.imoPink};
                    top: ${!!keepNavOpened ? "0" : "-3rem"};
                    transition: 0.4s;
                    padding-left: 4%;
                    padding-right: 4%;
                    padding-bottom: ${!!keepNavOpened ? "0" : "1rem"};
                }
                .outerContainer:hover {
                    padding-bottom: 0;
                    top: 0px;
                    background: ${!!keepNavOpened ? "none" : "#FFFFFF"};
                }
                .setContainer {
                    display: flex;
                    padding: 0 12px;
                    align-items: center;
                }
            `}
        </style>
    </div>
);
const renderButton = (title, action) => {
    return (
        <div onClick={action}>
            <p className="title">{title}</p>
            <style jsx>
                {`
                    .title {
                        font-size: 1.2rem;
                        font-weight: bold;
                        margin: 0 0 0 12px;
                        color: ${colors.imoPink};
                        justify: end;
                        cursor: pointer;
                        transition: 0.3s;
                    }
                    .title:hover {
                        color: ${colors.imoBlue};
                    }
                `}
            </style>
        </div>
    );
};

export default NavigationBar;
