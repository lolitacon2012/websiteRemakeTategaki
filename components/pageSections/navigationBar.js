import { colors } from "../colors";
import Avatar from "../avatar";
import { getText } from "../../utils/textService";
const NavigationBar = () => (
    <div className="outerContainer">
        <div className="setContainer">
            <Avatar size={42} border={false} />
            {renderButton(getText("title_home"))}
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
                    top: 0;
                    z-index: 9999;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 0.75rem;
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
                        font-weight: bolder;
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
