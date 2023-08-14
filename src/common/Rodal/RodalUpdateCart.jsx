import React from "react";
import { useContext } from "react";
import Rodal from "rodal";
import { AppContext } from "../../context/AppProvider";

const RodalUpdateCart = ({ visiblePopupQuantity, setVisiblePopupQuantity, productRodal, mode, productRodalQuantity, decreaseQty, increaseQty, updateCart, deleteCartItem }) => {
    const { mobileMode } = useContext(AppContext);
    return (
        <Rodal
            height={280}
            width={mobileMode ? 320 : 350}
            visible={visiblePopupQuantity}
            onClose={() => {
                setVisiblePopupQuantity(false);
            }}
            style={{ borderRadius: 10 }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ borderBottom: "1px solid rgb(220,220,220)", paddingBottom: "10px" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Cập nhật giỏ hàng</span>
                </div>

                <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
                    <span className="cart-quantity-name" style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {productRodal.name + (mode === "3" ? " - " + productRodal.packDes : "")}
                    </span>
                </div>
                <div style={{ padding: "0px 0 10px 0", textAlign: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)", display: "flex", gap: 3, justifyContent: "center" }}>
                        {productRodal.pricePerPack?.toLocaleString()}
                        <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>₫</span>
                    </span>
                </div>

                <div className="center_flex ">
                    <div className="center_flex cart-quantity" style={{ width: " 100%" }}>
                        <div
                            style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)" }}
                            className="center_flex cart-quantity-minus"
                            onClick={() => {
                                if (productRodalQuantity > 0) {
                                    decreaseQty(productRodal.id);
                                }
                            }}
                        >
                            <i className="fa-solid fa-minus"></i>
                        </div>
                        <div className="center_flex cart-quantity-text">
                            <span>{productRodalQuantity}</span>
                        </div>
                        <div className="center_flex cart-quantity-plus" onClick={() => increaseQty(productRodal.id)}>
                            <i className="fa-solid fa-plus"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className="f_flex " style={{ width: " 100%", justifyContent: "space-between", paddingTop: 15, gap: 15 }}>
                {productRodalQuantity > 0 ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            updateCart(productRodal?.id);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: mobileMode ? "15px" : "16px",
                            cursor: "pointer",
                            height: 45,
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                            color: "#fff",
                        }}
                    >
                        Cập nhật giỏ hàng
                    </button>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            deleteCartItem(productRodal?.id);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: mobileMode ? "15px" : "16px",
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            height: 45,
                            background: "var(--red)",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        Xóa
                    </button>
                )}
            </div>
        </Rodal>
    );
};

export default RodalUpdateCart;
