import { useContext } from "react";
import { BallTriangle } from "react-loading-icons";
import Lottie from "react-lottie";
import animation from "../../assets/loading-circle.json";
import { AppContext } from "../../context/AppProvider";
import "./style.css";
function Loading({ isLoading, opacity }) {
    const { mobileMode } = useContext(AppContext);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="loading-wrapper container" style={{ display: isLoading ? "flex" : "none", opacity: opacity }}>
            {/* <BallTriangle stroke="var(--primary)" /> */}
            <Lottie options={defaultOptions} height={mobileMode ? 220 : 270} width={mobileMode ? 220 : 270} speed={0.8} />
        </div>
    );
}
export default Loading;
