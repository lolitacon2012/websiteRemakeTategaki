import { colors } from "../colors";
import Avatar from "../avatar";
import { getText } from "../../utils/textService";
import Router from "next/router";
import { isMobile } from "react-device-detect";
const NavigationBar = ({ keepNavOpened }) => (
    <div className="outerContainer">
        {!isMobile && <div className="setContainer">
            <Avatar size={42} border={false} />
            {renderButton(getText("title_home"), () => Router.push("/"))}
        </div>}
        <div className="setContainer">
            {!!isMobile && renderButton(getText("btn_home"))}
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
                    height: ${!!isMobile ? `2.8rem` : '4rem'};
                    z-index: 9999;
                    display: flex;
                    justify-content: ${!!isMobile ? `space-around` : 'space-between'};
                    align-items: center;
                    background: ${!!isMobile && colors.imoPink};
                    top: ${!!keepNavOpened ? "0" : "-3rem"};
                    transition: 0.4s;
                    padding-left: 4%;
                    padding-right: 4%;
                    padding-bottom: ${!!keepNavOpened ? "0" : "1rem"};
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
                        font-size: ${!!isMobile ? '1rem' : '1.2rem'};
                        font-weight: bold;
                        margin: 0 6px;
                        color: ${!!isMobile ? colors.white : colors.imoPink};
                        justify: 'end';
                        cursor: pointer;
                        transition: 0.3s;
                    }
                    .title:hover {
                        color: ${!isMobile && colors.imoBlue};
                    }
                `}
            </style>
        </div>
    );
};

export default NavigationBar;
