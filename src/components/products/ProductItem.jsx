import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkOutOfMenu, checkOutOfStore } from "../../constants/Cart";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ProductItem = React.forwardRef(({ product, openRodal, index, filter, packDes, openRodalOutOfStore, openRodalOutOfMenu, isBorderBottom, store, menuName }, ref) => {
    useImperativeHandle(ref, () => ({
        resetQuantity() {
            setisProductCart(false);
            setProductRodalQuantity(0);
        },
        isQuantity() {
            setisProductCart(true);
            setProductRodalQuantity(1);
        },
    }));
    let history = useHistory();

    const { setCart1, setCart2, setCart3, setisCartMain1, setisCartMain2, setisCartMain3, mode, menuIdProvider, mobileMode, setDeliveryDate, deliveryDate } = useContext(AppContext);
    const [productRodalQuantity, setProductRodalQuantity] = useState(0);
    const [isProductCart, setisProductCart] = useState(true);

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        }
        let CartList = [];
        if (mode === "1") {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
        } else if (mode === "2") {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
        } else {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
        }
        let include = false;
        CartList?.map((item) => {
            if (item.id === product.id && menuIdProvider === item.menuId) {
                setProductRodalQuantity(item.quantityCart);
                include = true;
                return;
            }
        });
        if (include) {
            setisProductCart(true);
        } else {
            setisProductCart(false);
        }
        return () => {};
    }, [product, menuIdProvider]);

    const decreaseQtyCart1 = (id) => {
        setProductRodalQuantity(productRodalQuantity - 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        }
        const CartList1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
        let newCarts = CartList1?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart - 1;
            }
            return item;
        });
        setCart1([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...newCarts]));
    };
    const decreaseQtyCart2 = (id) => {
        setProductRodalQuantity(productRodalQuantity - 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        }
        const CartList2 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
        let newCarts = CartList2?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart - 1;
            }
            return item;
        });
        setCart2([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...newCarts]));
    };
    const decreaseQtyCart3 = (id) => {
        setProductRodalQuantity(productRodalQuantity - 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        }
        const CartList3 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
        let newCarts = CartList3?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart - 1;
            }
            return item;
        });
        setCart3([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...newCarts]));
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

        if (mode === "3") {
            const CartList3 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
            if (!checkOutOfMenu(menuIdProvider, mode)) {
                if (!checkOutOfStore(product, mode)) {
                    const carts = [
                        ...CartList3,
                        {
                            ...product,
                            quantityCart: 1,
                            menuId: menuIdProvider,
                            menuName: deliveryDate,
                        },
                    ];
                    setisProductCart(true);
                    setisCartMain3(true);
                    setProductRodalQuantity(productRodalQuantity + 1);
                    setCart3(carts);
                    localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...carts]));
                    localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
                } else {
                    openRodalOutOfStore({ rodal: true, product: product, index });
                }
            } else {
                openRodalOutOfMenu({ rodal: true, product: product, index });
            }
        } else if (mode === "1") {
            const CartList1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
            if (!checkOutOfStore(product, mode)) {
                const carts = [
                    ...CartList1,
                    {
                        ...product,
                        quantityCart: 1,
                        menuId: menuIdProvider,
                    },
                ];
                setisProductCart(true);
                setisCartMain1(true);
                setCart1(carts);
                setProductRodalQuantity(productRodalQuantity + 1);
                localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
                localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...carts]));
            } else {
                openRodalOutOfStore({ rodal: true, product: product, index });
            }
        } else {
            const CartList2 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
            if (!checkOutOfStore(product, mode)) {
                const carts = [
                    ...CartList2,
                    {
                        ...product,
                        quantityCart: 1,
                        menuId: menuIdProvider,
                    },
                ];
                setisProductCart(true);
                setisCartMain2(true);
                setProductRodalQuantity(productRodalQuantity + 1);
                setCart2(carts);
                localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
                localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...carts]));
            } else {
                openRodalOutOfStore({ rodal: true, product: product, index });
            }
        }
    };

    const increaseQtyCart1 = (id) => {
        setProductRodalQuantity(productRodalQuantity + 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        }
        const CartList1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
        let newCarts = CartList1?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart + 1;
            }
            return item;
        });
        setCart1([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...newCarts]));
    };
    const increaseQtyCart2 = (id) => {
        setProductRodalQuantity(productRodalQuantity + 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        }
        const CartList2 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
        let newCarts = CartList2?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart + 1;
            }
            return item;
        });
        setCart2([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...newCarts]));
    };
    const increaseQtyCart3 = (id) => {
        setProductRodalQuantity(productRodalQuantity + 1);
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        }
        const CartList3 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
        let newCarts = CartList3?.map((item) => {
            if (item.id === product.id) {
                item.quantityCart = item.quantityCart + 1;
            }
            return item;
        });
        setCart3([...newCarts]);
        localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...newCarts]));
    };
    return (
        <>
            <div key={product.id} className="c_flex" style={{ borderBottom: isBorderBottom ? "1px solid #f0f0f0" : "none", width: "100%", padding: "12px 0px", alignItems: "flex-start" }}>
                <div className="product-list-info">
                    <div
                        className="product-list-img"
                        onClick={() => {
                            setDeliveryDate(menuName);
                            history.push(`/mode/${mode}/product/${product.id}`, { valid: true });
                        }}
                        style={{ fontWeight: 500, cursor: "pointer" }}
                    >
                        <img src={product.image || IMAGE_NOTFOUND} alt="" />
                    </div>
                    <div className="product-list-name">
                        <span
                            onClick={() => {
                                setDeliveryDate(menuName);
                                history.push(`/mode/${mode}/product/${product.id}`, { valid: true });
                            }}
                            style={{ fontWeight: 600, cursor: "pointer" }}
                        >
                            {product.name}
                        </span>
                        {store && (
                            <span
                                onClick={() => {
                                    setDeliveryDate(menuName);
                                    history.push(`/mode/${mode}/product/${product.id}`, { valid: true });
                                }}
                                style={{ fontWeight: 500, cursor: "pointer", fontSize: 12, color: "rgb(102, 102, 102)" }}
                            >
                                {product.storeName}
                            </span>
                        )}

                        {/* <span style={{ fontSize: 13, color: "rgb(110,110,150)" }}>{product.storeName} </span> */}
                        <div className="" style={{ paddingBottom: "0" }}>
                            {isProductCart ? (
                                <div className="center_flex cart-quantity" style={{ width: " 100%", boxShadow: "0 4px 5px rgb(0 0 0 / 13%)" }}>
                                    <div
                                        style={{ color: productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)" }}
                                        className="center_flex cart-quantity-minus"
                                        onClick={() => {
                                            if (productRodalQuantity > 1) {
                                                if (mode === "1") {
                                                    decreaseQtyCart1(1);
                                                } else if (mode === "2") {
                                                    decreaseQtyCart2(1);
                                                } else {
                                                    decreaseQtyCart3(1);
                                                }
                                            } else {
                                                openRodal({ rodal: true, product: product, index });
                                            }
                                        }}
                                    >
                                        <i className="fa-solid fa-minus"></i>
                                    </div>
                                    <div className="center_flex cart-quantity-text">
                                        <span>{productRodalQuantity}</span>
                                    </div>
                                    <div
                                        className="center_flex cart-quantity-plus"
                                        onClick={() => {
                                            if (mode === "1") {
                                                increaseQtyCart1(product.id);
                                            } else if (mode === "2") {
                                                increaseQtyCart2(product.id);
                                            } else {
                                                increaseQtyCart3(product.id);
                                            }
                                        }}
                                        style={{}}
                                    >
                                        <i className="fa-solid fa-plus"></i>
                                    </div>
                                </div>
                            ) : (
                                <div className="center_flex cart-quantity" style={{ width: " 100%" }}>
                                    <div
                                        className="center_flex cart-quantity-add"
                                        onClick={() => {
                                            AddCart();
                                        }}
                                    >
                                        Thêm
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="product-list-price" style={{ alignItems: "flex-end", display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "flex", gap: 3, fontSize: mobileMode ? "15px" : "16px" }}>
                        {product.pricePerPack?.toLocaleString()}
                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                    </span>
                    {packDes && (
                        <span
                            onClick={() => {
                                history.push(`/mode/${mode}/product/${product.id}`, { valid: true });
                            }}
                            style={{ fontWeight: 500, cursor: "pointer", fontSize: 12, color: "rgb(102, 102, 102)" }}
                        >
                            {product.packDes !== "" ? product.packDes : product.unit}
                        </span>
                    )}
                </div>
            </div>
        </>
    );
});
