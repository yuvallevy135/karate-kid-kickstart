import React from "react";

interface CardProps {
    className: string;
    children:
        | boolean
        | React.ReactChild
        | React.ReactFragment
        | React.ReactPortal
        | null
        | undefined;
}
const Card = (props: CardProps) => {
    const classes = "card " + props.className;

    return <div className={classes}>{props.children}</div>;
};

export default Card;
