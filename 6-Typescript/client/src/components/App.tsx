import React, { FC, Fragment } from "react";
import Header from "./Header";
import MainBody from "./MainBody";
import "../styles/styles.css";
const App: FC = () => {
    return (
        <Fragment>
            <Header />
            <MainBody />
        </Fragment>
    );
};

export default App;
