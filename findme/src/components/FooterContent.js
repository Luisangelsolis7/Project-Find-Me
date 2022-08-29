import React from "react";
import "../CSS/FooterStyling.css";

export default class FooterContent extends React.Component {
    render() {
        return (
            <>
                <footer className="footer">
                    <div className="container">
                        <span className="text-muted">Aurora University &copy;{new Date().getUTCFullYear()}</span>
                    </div>
                </footer>
            </>
        );
    }
}
