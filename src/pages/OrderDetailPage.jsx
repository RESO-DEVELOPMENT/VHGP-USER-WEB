import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getOrderDetail } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { getStatusColor, getStatusName, STATUS_ORDER } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const OrderDetailPage = () => {
    const { setIsHeaderOrder, mobileMode, setHeaderInfo, mode } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [orderInfo, setOrderInfo] = useState({});
    const [productOrder, setproductOrder] = useState([]);
    const [statusOrder, setStatusOrder] = useState([]);
    let location = useLocation();
    useEffect(() => {
        let doc = document.getElementById("main");
        doc.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        let orderId = location.pathname.trim().split("/")[2];
        setIsLoadingCircle(true);
        setIsHeaderOrder(false);
        getOrderDetail(orderId)
            .then((res) => {
                if (res.data) {
                    const order = res.data;
                    setOrderInfo(order);
                    setproductOrder(order.listProInMenu || []);
                    setStatusOrder(order.listStatusOrder || []);
                    setIsLoadingCircle(false);
                } else {
                }
            })
            .catch((error) => {
                console.log(error);
            });

        setTimeout(() => {
            setIsLoadingCircle(false);
        }, 500);
        setHeaderInfo({ isSearchHeader: false, title: "Chi tiết đơn hàng" });
    }, [setIsHeaderOrder, setHeaderInfo, location]);
    let history = useHistory();

    const getTimeOrder = (time) => {
        let result = time.split(" ");
        if (result && result[1]) {
            result = result[1];
            return result;
        } else {
            return "--";
        }
    };
    const getStatusCancel = (statusList) => {
        let cancel = false;
        for (let index = 0; index < statusList.length; index++) {
            const element = statusList[index];
            if (element && element.name === STATUS_ORDER[4].compare) {
                cancel = true;
            }
        }
        return cancel;
    };
    const getOpacity = (status) => {
        let opacity = 0;
        if (status && status.name) {
            if (status.name === STATUS_ORDER[0].compare || status.name === STATUS_ORDER[1].compare || status.name === STATUS_ORDER[2].compare || status.name === STATUS_ORDER[3].compare) {
                opacity = 1;
            } else {
                opacity = 0.3;
            }
        } else {
            opacity = 0.3;
        }
        return opacity;
    };
    const validStatus = (status) => {
        let statusTime = "--";
        if (status && status.name) {
            if (status.name === STATUS_ORDER[0].compare || status.name === STATUS_ORDER[1].compare || status.name === STATUS_ORDER[2].compare || status.name === STATUS_ORDER[3].compare) {
                statusTime = getTimeOrder(statusOrder[0].time);
            }
        }
        return statusTime;
    };
    return (
        <>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            <section className="" style={{ paddingTop: 70, paddingBottom: 70 }}>
                <div className="container non-radius" style={{ borderRadius: 10, padding: 0, background: "#fff" }}>
                    <div style={{ flexDirection: "column" }} className="f_flex">
                        <div className="" style={{ display: "block" }}>
                            <div className="order-wrapper order-detail-container" style={{ flex: 0.35 }}>
                                <div className="f_flex order-detail-adrress">
                                    <i style={{ color: "var(--primary)", lineHeight: 1.3, fontSize: 12 }} className="fa-solid fa-circle"></i>
                                    <div className="flex-collumn">
                                        <span>Mã đơn hàng:</span>
                                        <span> {orderInfo.id} </span>
                                    </div>
                                </div>
                                <div className="f_flex order-detail-adrress" style={{ marginTop: 15 }}>
                                    <i style={{ color: "var(--primary)", lineHeight: 1.3 }} className="fa-regular fa-clock"></i>
                                    <div className="flex-collumn">
                                        <span>Ngày đặt hàng:</span>
                                        <span> {orderInfo?.time?.split(" ")[0]} </span>
                                    </div>
                                </div>
                                <div className="f_flex order-detail-adrress" style={{ marginTop: 15 }}>
                                    <i style={{ color: "var(--primary)", lineHeight: 1.3 }} className="fa-solid fa-location-dot"></i>
                                    <div className="flex-collumn">
                                        <span>Địa chỉ nhận hàng:</span>
                                        <span>Building {orderInfo.buildingName} Vinhomes Green Park</span>
                                    </div>
                                </div>
                            </div>
                            {<div style={{ height: "10px", background: "#f6f9fc" }}></div>}
                            <div className="order-wrapper" style={{ flex: 0.65 }}>
                                <h3 style={{ fontSize: mobileMode ? "1rem" : "1.3rem", display: "flex", alignItems: "center", gap: 20 }}>
                                    Tiến độ
                                    {getStatusCancel(statusOrder) && (
                                        <div className="center_flex" style={{ background: getStatusColor("5"), borderRadius: "20px", padding: "7px 18px" }}>
                                            <span className="order-store-status" style={{ fontSize: 15 }}>
                                                {getStatusName("5")}
                                            </span>
                                        </div>
                                    )}
                                </h3>
                                <div className="f_flex" style={{ gap: 20 }}>
                                    <div className="f_flex" style={{ gap: 13, padding: "30px 10px 10px 10px", flexDirection: "column", alignItems: "center" }}>
                                        <div style={{ opacity: getOpacity(statusOrder[0]) }}>
                                            <i className="fa-regular fa-circle-dot" style={{ color: "var(--primary)" }}></i>
                                        </div>
                                        <div className="line" style={{ opacity: getOpacity(statusOrder[1]) }}></div>
                                        <div style={{ opacity: getOpacity(statusOrder[1]) }}>
                                            <i className="fa-regular fa-circle-dot" style={{ color: "var(--primary)" }}></i>
                                        </div>
                                        <div className="line" style={{ opacity: getOpacity(statusOrder[2]) }}></div>
                                        <div style={{ opacity: getOpacity(statusOrder[2]) }}>
                                            <i className="fa-regular fa-circle-dot" style={{ color: "var(--primary)" }}></i>
                                        </div>
                                        <div className="line" style={{ opacity: getOpacity(statusOrder[3]) }}></div>
                                        <div style={{ opacity: getOpacity(statusOrder[3]) }}>
                                            <i className="fa-regular fa-circle-dot" style={{ color: "var(--primary)" }}></i>
                                        </div>
                                    </div>
                                    <div className="f_flex" style={{ gap: 25, padding: "10px 10px", flexDirection: "column" }}>
                                        <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[0]) }}>
                                            <img src="/images/orders.png" alt="" style={{ width: 38, height: 38 }} />
                                            <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                <span className="status-info-time">{validStatus(statusOrder[0])}</span>
                                                <span className="status-info-name">Đặt hàng thành công</span>
                                            </div>
                                        </div>
                                        <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[1]) }}>
                                            <img src="/images/confirm-order.png" alt="" style={{ width: 42, height: 42 }} />
                                            <div className="f_flex" style={{ flexDirection: "column" }}>
                                                <span className="status-info-time">{validStatus(statusOrder[1])}</span>
                                                <span className="status-info-name">Đang chuẩn bị</span>
                                            </div>
                                        </div>
                                        <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[2]) }}>
                                            <img src="/images/delivery.png" alt="" style={{ width: 38, height: 38 }} />
                                            <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                <span className="status-info-time">{validStatus(statusOrder[2])}</span>
                                                <span className="status-info-name">Đang giao</span>
                                            </div>
                                        </div>
                                        <div className="f_flex status-icon" style={{ opacity: getOpacity(statusOrder[3]) }}>
                                            <img src="/images/yes.png" alt="" style={{ width: 38, height: 38 }} />
                                            <div className="f_flex" style={{ flexDirection: "column", paddingLeft: 4 }}>
                                                <span className="status-info-time">{validStatus(statusOrder[3])}</span>
                                                <span className="status-info-name">Hoàn thành</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {<div style={{ height: "10px", background: "#f6f9fc" }}></div>}
                            <div className="order-wrapper" style={{ padding: "", flex: 0.65 }}>
                                <div>
                                    <div className="order-store">
                                        <span className="order-store-title">{orderInfo.storeName}</span>
                                        <div className="f_flex" style={{ gap: 15 }}></div>
                                    </div>
                                    {productOrder.map((item, index) => {
                                        return (
                                            <div className="order" key={index} style={{}}>
                                                <div className="" style={{}}>
                                                    <span className="order-text-count">{item.quantity}x</span>
                                                </div>
                                                <div style={{ flex: 1, flexDirection: "column" }} className="f_flex">
                                                    <span className="order-text-name">{item.productName}</span>
                                                    {/* <span className="order-text-cate">Nước Uống</span> */}
                                                </div>
                                                <div>
                                                    <span className="order-text-price" style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                        {item.price?.toLocaleString()}
                                                        <span style={{ fontSize: mobileMode ? "0.8rem" : "0.9rem", fontWeight: 500 }}>₫</span>
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {<div style={{ height: "10px", background: "#f6f9fc" }}></div>}
                        <div className="" style={{ display: "block" }}>
                            <div style={{ flex: 0.65, background: "#f6f9fc" }}></div>
                            {/* {mobileMode ? "" : <div style={{ width: "10px", background: "#f6f9fc" }}></div>} */}
                            <div className="order-wrapper order-detail-container" style={{ flex: 0.35 }}>
                                <h3 style={{ fontSize: mobileMode ? "1.1rem" : "1.3rem", paddingBottom: 10 }}>Chi tiết thanh toán</h3>

                                {/* <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Mã đơn hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {orderInfo.id || "--"}
                                        </span>
                                    </div>
                                </div> */}
                                <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Hình thức thanh toán:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {orderInfo.paymentName || "--"}
                                        </span>
                                    </div>
                                </div>
                                <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Hình thức giao hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {"--"}
                                        </span>
                                    </div>
                                </div>
                                <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Người giao hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {"--"}
                                        </span>
                                    </div>
                                </div>
                                <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Liên hệ người giao hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {"--"}
                                        </span>
                                    </div>
                                </div>
                                <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Tổng tiền hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10, display: "flex", alignItems: "center", gap: 3 }}>
                                            {(orderInfo.total - orderInfo.shipCost).toLocaleString() || "--"}
                                            <span style={{ fontSize: mobileMode ? "0.8rem" : "0.9rem", fontWeight: 500 }}>₫</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="order-detail-total" style={{ paddingBottom: 15 }}>
                                    <div className="order-detail-total-titlte">
                                        Phí vận chuyển:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10, display: "flex", alignItems: "center", gap: 3 }}>
                                            {orderInfo.shipCost?.toLocaleString() || "--"}
                                            <span style={{ fontSize: mobileMode ? "0.8rem" : "0.9rem", fontWeight: 500 }}>₫</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="order-detail-total" style={{ borderTop: "1px solid rgb(230, 230, 230)", paddingTop: 15 }}>
                                    <div className="order-detail-total-titlte">
                                        <span style={{ fontWeight: 700, color: "#000", fontSize: mobileMode ? "16px" : "18px" }}>Tổng cộng:</span>
                                        <span
                                            className="order-detail-text-price"
                                            style={{ fontWeight: 700, marginLeft: 10, color: "#000", fontSize: mobileMode ? "16px" : "18px", display: "flex", gap: 3 }}
                                        >
                                            {orderInfo.total?.toLocaleString() || "--"}
                                            <span style={{ fontSize: mobileMode ? "0.9rem" : ".95rem", fontWeight: 700 }}>₫</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container" style={{ marginTop: 10, padding: "0 10px" }}>
                    <div
                        onClick={() => {
                            history.push(`/mode/${mode}`);
                        }}
                        style={{ textAlign: "center", width: "100%", height: 50, borderRadius: "0.5rem", alignItems: "center" }}
                        className="center_flex btn-hover "
                    >
                        <span style={{ fontWeight: 600, fontSize: mobileMode ? 16 : 18 }}>Tiếp tục mua hàng</span>
                    </div>
                </div>
            </section>
        </>
    );
};
