import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getListOrder } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { getStatusColor, getStatusName, IMAGE_NOTFOUND_v2 } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const OrderPage = () => {
    const { setIsHeaderOrder, setHeaderInfo, setisCartMain, isCartMain } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(true);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        setIsLoadingCircle(true);
        setisCartMain(false);
        setHeaderInfo({ isSearchHeader: false, title: "Lịch sử mua hàng" });
        getListOrder("1", 1, 100)
            .then((res) => {
                if (res.data) {
                    const order = res.data;
                    setOrders(order);
                    setIsLoadingCircle(false);
                } else {
                }
            })

            .catch((error) => {
                console.log(error);
            });
        return () => {
            setIsHeaderOrder(false);
        };
    }, [setIsHeaderOrder, setHeaderInfo, setisCartMain, isCartMain]);

    const getCountOrderDone = (orders) => {
        let count = 0;
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].statusId === "4" || orders[index].statusId === "5") {
                count = count + 1;
            }
        }
        return count;
    };
    const getListOrderPending = (orders) => {
        let newOrders = [];
        newOrders = orders.filter((item) => item.statusId === "1" || item.statusId === "2" || item.statusId === "3");
        return newOrders;
    };
    const getListOrderDone = (orders) => {
        let newOrders = [];
        newOrders = orders.filter((item) => item.statusId === "4" || item.statusId === "5");
        return newOrders;
    };
    const getCountOrderPending = (orders) => {
        let count = 0;
        for (let index = 0; index < orders.length; index++) {
            if (orders[index].statusId === "1" || orders[index].statusId === "2" || orders[index].statusId === "3") {
                count = count + 1;
            }
        }
        return count;
    };
    let history = useHistory();
    return (
        <>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>
            <section className="background back-white" style={{ paddingTop: 80, paddingBottom: 80 }}>
                <div className="container non-radius" style={{ borderRadius: 10 }}>
                    <div style={{ flexDirection: "column" }} className="f_flex">
                        {getListOrderPending(orders).length > 0 && (
                            <div className="order-title" style={{ padding: "5px 15px 5px 15px" }}>
                                <span>
                                    Bạn có <span style={{ color: "var(--primary)" }}>{getCountOrderPending(orders)}</span> đơn hàng
                                </span>
                            </div>
                        )}
                        {getListOrderPending(orders).map((item, index) => {
                            return (
                                <div className="order-wrapper f_flex" key={index} style={{ justifyContent: "space-between" }}>
                                    <div className="f_flex order-info" style={{ alignItems: "center", gap: 15 }}>
                                        <div className="order-img-wrapper">
                                            <img src={IMAGE_NOTFOUND_v2} alt="" />
                                        </div>
                                        <div className="order-store cusor" onClick={() => history.push(`/order/${item.id}`)}>
                                            <span className="order-store-title">{item.storeName} </span>
                                            <span className="order-store-time">{item.time}</span>
                                            <span className="order-store-btn">
                                                Xem chi tiết
                                                <div>
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="f_flex order-status-wrapper" style={{ flexDirection: "column", gap: 10 }}>
                                        <div className="center_flex" style={{ background: getStatusColor(item.statusId), borderRadius: "20px", padding: "7px 13px" }}>
                                            <span className="order-store-status">{getStatusName(item.statusId)}</span>
                                        </div>
                                        <span className="order-store-title" style={{ display: "flex", gap: 3 }}>
                                            {item.total?.toLocaleString()}
                                            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        {getListOrderPending(orders).length > 0 && <div style={{ height: 35, width: "100%" }}></div>}
                        <div className="order-title" style={{ padding: "15px 15px 5px 15px" }}>
                            <span>Đơn hàng đã hoàn thành {"(" + getCountOrderDone(orders) + ")"}</span>
                        </div>
                        {getListOrderDone(orders).map((item, index) => {
                            return (
                                <div className="order-wrapper f_flex" key={index} style={{ justifyContent: "space-between" }}>
                                    <div className="f_flex order-info" style={{ alignItems: "center", gap: 15 }}>
                                        <div className="order-img-wrapper">
                                            <img src={IMAGE_NOTFOUND_v2} alt="" />
                                        </div>
                                        <div className="order-store cusor" onClick={() => history.push(`/order/${item.id}`)}>
                                            <span className="order-store-title">{item.storeName} </span>
                                            <span className="order-store-time">{item.time}</span>
                                            <span className="order-store-btn">
                                                Xem chi tiết
                                                <div>
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="f_flex order-status-wrapper" style={{ flexDirection: "column", gap: 10 }}>
                                        <div className="center_flex" style={{ background: getStatusColor(item.statusId), borderRadius: "20px", padding: "7px 13px" }}>
                                            <span className="order-store-status">{getStatusName(item.statusId)}</span>
                                        </div>
                                        <span className="order-store-title" style={{ display: "flex", gap: 3 }}>
                                            {item.total?.toLocaleString()}
                                            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};
