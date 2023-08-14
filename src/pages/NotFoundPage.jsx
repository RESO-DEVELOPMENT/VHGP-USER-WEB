import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const NotFoundPage = () => {
    const { setIsHeaderOrder, mobileMode, setHeaderInfo } = useContext(AppContext);

    let history = useHistory();

    useEffect(() => {
        setHeaderInfo({ isSearchHeader: false });
        setIsHeaderOrder(false);
    }, [setIsHeaderOrder]);

    return (
        <div style={{}}>
            <img src="/images/error-404.jpg" style={{ width: "100%", padding: mobileMode ? "100px 50px 0px 50px " : "100px 150px 0px 150px" }} alt="" />
            <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn center_flex" style={{ width: "unset" }} onClick={() => history.push("/")}>
                    <div className="login100-form-bgbtn"></div>
                    <button
                        onClick={() => {}}
                        type="button"
                        style={{
                            textAlign: "center",
                            width: 250,
                            height: mobileMode ? 45 : 50,
                            borderRadius: "0.5rem",
                            alignItems: "center",
                            background: "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                            color: "#fff",
                        }}
                        className="center_flex checkout-btn"
                    >
                        <span style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>{"Quay lại trang chủ"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
