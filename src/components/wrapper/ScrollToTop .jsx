import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ children, location: { pathname } }) => {
    useEffect(() => {
        document.getElementById("main").scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [pathname]);

    return children || null;
};

export default withRouter(ScrollToTop);
