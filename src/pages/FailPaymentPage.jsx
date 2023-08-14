import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

const FailPaymentPage = () => {
    const { setIsHeader, mobileMode } = useContext(AppContext);
    let history = useHistory();
    useEffect(() => {
        setIsHeader(false);
        window.history.replaceState(null, "", "/");

        return () => {
            setIsHeader(true);
        };
    }, []);

    return (
        <div>
            <div className="center_flex" style={{ padding: 30, border: "1px solid #eaedf1" }}>
                <img src="/images/logovnpay.svg" alt="" />
            </div>
            <div className="center_flex" style={{ paddingTop: 70, flexDirection: "column", gap: 10, margin: mobileMode ? "15px 15px" : "15px 200px" }}>
                <img src="/images/error.svg" alt="" />
                <span style={{ color: "#c91d1d", fontSize: 22, lineHeight: 1.4, fontWeight: 500 }}>Thông báo</span>
                <span style={{ textAlign: "center", fontSize: 16 }}>Thanh toán thất bại. Quý khách vui lòng thực hiện lại giao dịch</span>

                <button
                    onClick={() => {
                        history.push("/");
                    }}
                    type="button"
                    style={{
                        textAlign: "center",
                        height: mobileMode ? 45 : 45,
                        borderRadius: "0.5rem",
                        alignItems: "center",
                        width: "100%",
                        background: "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                        color: "#fff",
                    }}
                    className="center_flex checkout-btn"
                >
                    <span style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}>{"Thanh toán lại"}</span>
                </button>
            </div>
        </div>
    );
};

export default FailPaymentPage;
