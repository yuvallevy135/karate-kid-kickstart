import React, { FC } from "react";
import "./ErrorModal.css";
import "./Card.css";
import Card from "./Card";
import CustomeButton from "../CustomeButton/CustomeButton";

interface ErrorModalProps {
    title: string;
    message: string;
    onClickErrorHandler: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({
    title,
    message,
    onClickErrorHandler,
}) => {
    return (
        <div className="backdrop">
            <Card className={"modal"}>
                <header className="header">
                    <h2>{title}</h2>
                </header>
                <div className="content">
                    <p>{message}</p>
                </div>
                <footer className="actions">
                    <CustomeButton
                        className={"cancel-button"}
                        icon={""}
                        onClickHandler={onClickErrorHandler}
                        text={"Cancel"}
                    ></CustomeButton>
                </footer>
            </Card>
        </div>
    );
};

export default ErrorModal;
