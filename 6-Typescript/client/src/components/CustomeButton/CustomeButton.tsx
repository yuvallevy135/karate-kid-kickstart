import React, { FC, FormEvent } from "react";
import Icon from "../Icon";
import "../../styles/styles.css";

const Button: FC<{
    className: string;
    icon: string;
    buttonType?: "submit" | "reset" | "button";
    text?: string;
    dataHook?: string;

    onClickHandler: (e: FormEvent<HTMLButtonElement>) => void;
}> = ({ className, icon, buttonType, onClickHandler, text, dataHook }) => {
    return (
        <button
            className={className}
            type={buttonType || "button"}
            onClick={onClickHandler}
            data-hook={dataHook}
        >
            {text}
            {icon != "" ? <Icon className={icon}></Icon> : <></>}
        </button>
    );
};

export default Button;
