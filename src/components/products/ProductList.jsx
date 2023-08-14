import React, { useContext, useEffect, useRef, useState } from "react";
import Rodal from "rodal";
import { LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import { ProductItem } from "./ProductItem";

export const ProductList = ({ data, filter, packDes, reLoad, store, menuName }) => {
    const { setCart1, setCart2, setCart3, mobileMode, setisCartMain1, setisCartMain2, setisCartMain3, menuIdProvider, mode, deliveryDate } = useContext(AppContext);
    const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
    const [visiblePopupOutOfStore, setVisiblePopupOutOfStore] = useState(false);
    const [visiblePopupOutOfMenu, setVisiblePopupOutOfMenu] = useState(false);
    const [productRodal, setProductRodal] = useState({});
    const [indexRodal, setIndexRodal] = useState({});
    const itemsRef = useRef([]);

    const hanldeRodal = (child) => {
        setVisiblePopupQuantity(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };

    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, data.length);
    }, [data]);
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
                menuName: deliveryDate,
            },
        ];
        if (mode === "1") {
            setCart1(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...carts]));
            setisCartMain1(true);
        } else if (mode === "2") {
            setCart2(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...carts]));
            setisCartMain2(true);
            reLoad();
        } else {
            setCart3(carts);
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...carts]));
            setisCartMain3(true);
            reLoad();
        }
        setVisiblePopupOutOfStore(false);
        setVisiblePopupOutOfMenu(false);
        itemsRef.current[indexRodal].isQuantity();
        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
    };
    const hanldeRodalOutOfStore = (child) => {
        setVisiblePopupOutOfStore(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };
    const hanldeRodalOutOfMenu = (child) => {
        setVisiblePopupOutOfMenu(child.rodal);
        setProductRodal(child.product);
        setIndexRodal(child.index);
    };
    return (
        <>
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

                    <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setVisiblePopupOutOfStore(false);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: mobileMode ? 15 : 16,
                                height: 45,
                                cursor: "pointer",
                                fontWeight: 700,
                                borderRadius: 8,
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
                                fontSize: mobileMode ? 15 : 16,
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
                            Tiếp tục
                        </button>
                    </div>
                </div>
            </Rodal>
            <Rodal
                height={mobileMode ? 160 : 165}
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
                        {productRodal.name}
                    </span>
                </div>

                <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setVisiblePopupQuantity(false);
                        }}
                        style={{
                            flex: 1,
                            padding: 14,
                            fontSize: "1em",
                            cursor: "pointer",
                            fontWeight: 700,
                            borderRadius: 10,
                            background: "#aab2bd",
                            height: 45,
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
                            cursor: "pointer",
                            fontWeight: 700,
                            height: 45,
                            borderRadius: 10,
                            background: "var(--primary)",
                            color: "#fff",
                            transition: "0.3s all",
                            WebkitTransition: "0.3s all",
                        }}
                    >
                        Đồng ý
                    </button>
                </div>
            </Rodal>
            <Rodal
                height={mobileMode ? 310 : 330}
                width={mobileMode ? 350 : 400}
                visible={visiblePopupOutOfMenu}
                onClose={() => {
                    setVisiblePopupOutOfMenu(false);
                }}
                style={{ borderRadius: 10 }}
            >
                <div className="modal-delete-cart">
                    <div className="modal-delete-cart-img">
                        <img className="" src="/images/delete-cart.jpg" alt="" />
                    </div>
                    <div style={{ paddingBottom: "10px", textAlign: "center", paddingTop: 12 }}>
                        <span style={{ fontSize: mobileMode ? 17 : 18, fontWeight: 700, color: "var(--primary)" }}>Bạn muốn đặt món ở vào ngày này?</span>
                    </div>
                    <div style={{ padding: "0px 0 0px 0", textAlign: "center" }}>
                        <span className="" style={{ fontSize: mobileMode ? 15 : 16, fontWeight: "lighter", textAlign: "center", color: "grey" }}>
                            Nhưng những món bạn đã chọn từ ngày trước sẽ bị xóa khỏi giỏ hàng nhé.
                        </span>
                    </div>

                    <div className="f_flex rodal-delet-cart" style={{ width: " 100%", justifyContent: "space-between", paddingTop: 20, gap: 10 }}>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setVisiblePopupOutOfMenu(false);
                            }}
                            style={{
                                flex: 1,
                                padding: 14,
                                fontSize: mobileMode ? 15 : 16,
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
                                fontSize: mobileMode ? 15 : 16,
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
            <div className="product-list-wrapper" style={{ paddingTop: 0, paddingBottom: 0, background: "#fff", transition: "0.5s all" }}>
                {filter === 2 && (
                    <div className="container-padding f_flex" style={{ alignItems: "end" }}>
                        <span style={{ padding: "15px 15px 10px 15px", fontWeight: 700, fontSize: 16, color: "rgb(100, 100, 100)" }}>Dành cho bạn</span>
                    </div>
                )}
                <div className="back-white c_flex" style={{ padding: "10px 15px", alignItems: "self-start", flexDirection: "column" }}>
                    {data.map((item, index) => {
                        let isBorderBottom = true;
                        if (index === data.length - 1 || data.length === 0) {
                            isBorderBottom = false;
                        }
                        return (
                            <ProductItem
                                store={store}
                                packDes={packDes}
                                ref={(el) => (itemsRef.current[index] = el)}
                                product={item}
                                index={index}
                                openRodalOutOfStore={(e) => hanldeRodalOutOfStore(e)}
                                openRodalOutOfMenu={(e) => hanldeRodalOutOfMenu(e)}
                                openRodal={(e) => hanldeRodal(e)}
                                key={index}
                                menuName={menuName}
                                filter={filter}
                                isBorderBottom={isBorderBottom}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};
