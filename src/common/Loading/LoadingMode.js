import { BallTriangle } from "react-loading-icons";
import Lottie from "react-lottie";
import animationMode2 from "../../assets/loading-mode2.json";
import animationMode3 from "../../assets/loading-mode3.json";
import animationMode1 from "../../assets/loading-mode1.json";
import "./style.css";
import { AppContext } from "../../context/AppProvider";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
function LoadingMode({ isLoadingMode, mode, isLoadigFromHome }) {
    const [remove, setRemove] = useState(false);
    const { mobileMode } = useContext(AppContext);
    const getMode = (modeCurent) => {
        switch (modeCurent) {
            case "1":
                return animationMode1;
            case "2":
                return animationMode2;
            case "3":
                return animationMode3;

            default:
                return animationMode1;
        }
    };
    const getModeSpeed = (modeCurent) => {
        switch (modeCurent) {
            case "1":
                return 1.5;
            case "2":
                return 2.4;
            case "3":
                return 1.6;

            default:
                return 1;
        }
    };
    const defaultOptions = {
        loop: !(mode.toString() === "2" || mode.toString() === "3"),
        autoplay: true,
        animationData: getMode(mode.toString()),
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    useEffect(() => {
        setTimeout(
            () => {
                setRemove(true);
            },
            isLoadigFromHome ? 1800 : 1
        );

        return () => {};
    }, []);

    return (
        <div className="loading-wrapper-mode container" style={{ display: remove ? "none" : "flex", opacity: isLoadingMode ? 1 : 0, position: "absolute", height: "100%" }}>
            <Lottie
                options={defaultOptions}
                height={mobileMode ? (mode.toString() === "3" ? 130 : 150) : mode.toString() === "3" ? 190 : 230}
                width={mobileMode ? (mode.toString() === "3" ? 130 : 150) : mode.toString() === "3" ? 190 : 230}
                speed={getModeSpeed(mode.toString())}
            />
            <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, left: 0 }}></div>
        </div>
    );
}
export default LoadingMode;
