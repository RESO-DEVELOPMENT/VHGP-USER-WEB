import { useContext } from "react";
import Lottie from "react-lottie";
import animation from "../../assets/loading-circle.json";
import { AppContext } from "../../context/AppProvider";
import "./style.css";
function LoadingMain({ isLoading, mode }) {
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
        <div className="loading-wrapper container" style={{ display: isLoading ? "flex" : "none" }}>
            <Lottie options={defaultOptions} height={mobileMode ? 220 : 270} width={mobileMode ? 220 : 270} speed={1} />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}></div>
        </div>
    );
}
export default LoadingMain;
