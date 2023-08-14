import React, { useContext, useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useHistory } from "react-router-dom";
import Rodal from "rodal";
import { LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import { ProductCart } from "./ProductCart";

export const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="next">
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
};
export const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="control-btn" onClick={onClick}>
            <button className="prev">
                <i className="fa-solid fa-arrow-left"></i>
            </button>
        </div>
    );
};
export const ProductSlide = ({ filtter, label, data, labelImg, cateId, isLoading, isViewAll, reLoad }) => {
    const { setCart1, setCart2, setCart3, setisCartMain1, setisCartMain2, setisCartMain3, mobileMode, mode, menuIdProvider } = useContext(AppContext);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupOutOfStore, setVisiblePopupOutOfStore] = useState(false);
    const [productRodal, setProductRodal] = useState({});
    const [indexRodal, setIndexRodal] = useState({});
    const [slideShow, setslideShow] = useState(1);
    const itemsRef = useRef([]);
    useEffect(() => {
        if (data.length > 5) {
            setslideShow(5);
        } else {
            setslideShow(1);
        }

        return () => {};
    }, [data, slideShow]);

    const hanldeRodalQuantity = (child) => {
        setVisiblePopupQuantity(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };
    const hanldeRodalOutOfStore = (child) => {
        setVisiblePopupOutOfStore(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };

    const AddCart = () => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        }
        const carts = [
            {
                ...productRodal,
                quantityCart: 1,
                menuId: menuIdProvider,
            },
        ];

        setVisiblePopupOutOfStore(false);
        itemsRef.current[indexRodal].isQuantity();
        if (mode === "1") {
            setCart1(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...carts]));
        } else if (mode === "2") {
            setCart2(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...carts]));
        } else {
            setCart3(carts);

            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...carts]));
        }
        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));

        reLoad();
    };
    const deleteCartItem = () => {
        let CartList = [];
        if (mode === "1") {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
        } else if (mode === "2") {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
        } else {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
        }
        let newCarts = CartList?.filter((item) => item.id !== productRodal.id);
        if (mode === "1") {
            setCart1([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...newCarts]));
            if (newCarts.length === 0) {
                setisCartMain1(false);
            }
        } else if (mode === "2") {
            setCart2([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...newCarts]));
            if (newCarts.length === 0) {
                setisCartMain2(false);
            }
        } else {
            setCart3([...newCarts]);
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...newCarts]));
            if (newCarts.length === 0) {
                setisCartMain3(false);
            }
        }
        setVisiblePopupQuantity(false);
        itemsRef.current[indexRodal].resetQuantity();
        setProductRodal({});
    };

    let history = useHistory();
    return (
        <>
            <Rodal
                height={170}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupQuantity}
                onClose={() => {
                    setVisiblePopupQuantity(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div style={{ paddingBottom: "10px", textAlign: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700 }}>Bạn có chắc muốn xóa</span>
                </div>
                <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
                    <span className="cart-quantity-name" style={{ fontSize: 20, fontWeight: 700, textAlign: "center", color: "rgb(82, 182, 91)" }}>
                        {productRodal?.name}
                    </span>
                </div>

                <div className="f_flex " style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupQuantity(false);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1em",
                            height: 45,
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "#aab2bd",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        Không
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();

                            deleteCartItem();
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1em",
                            height: 45,
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        OK
                    </button>
                </div>
            </Rodal>
            <Rodal
                height={mobileMode ? 310 : 330}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupOutOfStore}
                onClose={() => {
                    setVisiblePopupOutOfStore(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div className="modal-delete-cart">
                    <div className="modal-delete-cart-img">
                        <img className="" src="/images/delete-cart.jpg" alt="" />
                    </div>
                    <div style={{ paddingBottom: "10px", textAlign: "center", paddingTop: 12 }}>
                        <span style={{ fontSize: mobileMode ? 17 : 18, fontWeight: 700, color: "var(--primary)" }}>Bạn muốn đặt món ở cửa hàng này?</span>
                    </div>
                    <div style={{ padding: "0px 0 0px 0", textAlign: "center" }}>
                        <span className="" style={{ fontSize: mobileMode ? 15 : 16, fontWeight: "lighter", textAlign: "center", color: "grey" }}>
                            Nhưng những món bạn đã chọn từ cửa hàng trước sẽ bị xóa khỏi giỏ hàng nhé.
                        </span>
                    </div>

                    <div className="f_flex" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setVisiblePopupOutOfStore(false);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: "1.1em",
                                height: 45,
                                cursor: "pointer",
                                fontWeight: 700,
                                borderRadius: 10,
                                background: "#aab2bd",
                                color: "#fff",
                                transition: "0.3s all",
                                WebkitTransition: "0.3s all",
                            }}
                        >
                            Hủy
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                AddCart();
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: "1.1em",
                                height: 45,
                                cursor: "pointer",
                                fontWeight: 700,
                                borderRadius: 10,
                                background: "var(--primary)",
                                color: "#fff",
                                transition: "0.3s all",
                                WebkitTransition: "0.3s all",
                            }}
                        >
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </Rodal>
            <section className="shop product-slide" style={{ padding: "0px 0px 0px 0px" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{}}>
                            <div className="f_flex" style={{ padding: "30px 15px 15px 15px", alignItems: "center", gap: 10, background: "rgb(246, 249, 252)" }}>
                                <div className="product-slide-image" style={{ width: 40, height: 40, borderRadius: 50, marginLeft: 5 }}>
                                    <img style={{ borderRadius: 50, objectFit: "cover", width: "100%", height: "100%" }} src={labelImg} alt="" />
                                </div>
                                <div
                                    className="heading-right center_flex"
                                    onClick={() => {
                                        history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                    }}
                                >
                                    <h3>{label}</h3>
                                    <div className="heading-right  " style={{ display: label ? "block" : "none" }}>
                                        {/* <span>Xem tất cả</span> */}
                                        <i className="fa-solid fa-chevron-right" style={{ fontSize: 18, marginTop: 5, marginLeft: 15 }}></i>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: "15px 15px 15px 15px" }}>
                                <ScrollContainer className="schedule-category" horizontal={true} style={{ width: "100%", gridTemplateColumns: "repeat(9, 1fr)", display: "grid", overflow: "auto" }}>
                                    {data.map((value, index) => {
                                        if (index < 8) {
                                            return (
                                                <ProductCart
                                                    ref={(el) => (itemsRef.current[index] = el)}
                                                    index={index}
                                                    openRodalOutOfStore={(e) => hanldeRodalOutOfStore(e)}
                                                    openRodal={(e) => hanldeRodalQuantity(e)}
                                                    product={value}
                                                    key={index}
                                                />
                                            );
                                        }
                                    })}
                                    {slideShow > 3 && (
                                        <div className="view-all-btn" style={{}}>
                                            <div className="center_flex " style={{ flexDirection: "column", height: 250, width: 70, marginLeft: 15 }}>
                                                <div
                                                    className="center_flex cusor view-all-btn"
                                                    onClick={() => {
                                                        history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                                    }}
                                                    style={{ borderRadius: 50, border: "1px solid rgb(220,220,220)", width: 45, height: 45 }}
                                                >
                                                    <i className="fa-solid fa-chevron-right" style={{ fontSize: 18 }}></i>
                                                </div>
                                                <span
                                                    style={{ fontSize: 14, paddingTop: 5 }}
                                                    onClick={() => {
                                                        history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                                    }}
                                                    className="cusor"
                                                >
                                                    Xem thêm
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </ScrollContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
