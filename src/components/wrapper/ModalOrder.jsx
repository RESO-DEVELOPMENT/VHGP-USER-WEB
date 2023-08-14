import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import { AppContext } from "../../context/AppProvider";
import "./style.css";
export const SuccessModal = () => {
    let history = useHistory();
    const { mobileMode, opentModalSuccess, setOpentModalSuccess, orderIdSuccess } = useContext(AppContext);
    return (
        <div className="modal-success-wrapper">
            <Rodal
                height={mobileMode ? 400 : 450}
                width={mobileMode ? 350 : 400}
                visible={opentModalSuccess}
                showCloseButton={false}
                onClose={() => {
                    setOpentModalSuccess(false);
                    history.replace("/");
                }}
                style={{ borderRadius: 10, padding: 20 }}
            >
                <div class="main-container">
                    <img src="https://i.pinimg.com/564x/86/fb/cd/86fbcdecb33bba33c132c46b6a53506a.jpg" alt="" />
                    <div class="check-container">
                        <div class="check-background">
                            <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 25L27.3077 44L58.5 7" stroke="white" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="check-shadow"></div>
                    </div>
                </div>
                <div className="modal-success">
                    {/* <div className="modal-success-img">
                    <img className="" src="/images/success.jpg" alt="" />
                </div> */}

                    <div className="modal-success-title">
                        <p>Đặt hàng thành công!</p>
                    </div>
                    {/* <span>Đơn hàng sẽ đến với bạn sớm thôi.</span> */}
                    <span>
                        Mã đơn hàng của bạn là{" "}
                        <span
                            className="modal-success-id"
                            onClick={() => {
                                navigator.clipboard.writeText(orderIdSuccess);
                            }}
                        >
                            {orderIdSuccess}
                        </span>
                    </span>
                    <span style={{ paddingTop: 5 }}>Bạn có thể dùng nó để theo dõi đơn hàng của mình. </span>
                </div>
                <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", padding: "20px", gap: 15 }}>
                    <button
                        className="modal-order-success-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            history.replace(`/order/${orderIdSuccess}`);
                            setOpentModalSuccess(false);
                        }}
                        style={{ flex: 1, padding: 12, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, height: 45, color: "#fff" }}
                    >
                        Xem đơn hàng
                    </button>
                </div>
            </Rodal>
        </div>
    );
};

export const ErrorModal = () => {
    const { mobileMode, opentModalError, setOpentModalError, messError } = useContext(AppContext);
    return (
        <Rodal
            height={mobileMode ? 300 : 320}
            width={mobileMode ? 350 : 400}
            visible={opentModalError}
            showCloseButton={false}
            onClose={() => {
                setOpentModalError(false);
            }}
            style={{ borderRadius: 10 }}
        >
            <div className="modal-success">
                <div className="modal-success-img" style={{ width: "45%", padding: "10px 0" }}>
                    <img className="" src="/images/error.png" alt="" />
                </div>
                <div className="modal-success-title">
                    <p style={{ color: "rgb(237, 55, 116)" }}>Oops...!</p>
                </div>
                <span>{messError ? messError : "Đã xảy ra lỗi gì đó. Vui lòng thử lại sau."}</span>
            </div>
            <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", gap: 15 }}>
                <button
                    onClick={(e) => {
                        e.preventDefault();

                        setOpentModalError(false);
                    }}
                    style={{ flex: 1, padding: 12, fontSize: "1rem", cursor: "pointer", fontWeight: 700, borderRadius: 10, background: "rgb(237, 55, 116)", height: 45, color: "#fff" }}
                >
                    Đóng
                </button>
            </div>
        </Rodal>
    );
};
