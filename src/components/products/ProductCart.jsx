import React, { useContext, useEffect, useImperativeHandle, useState } from "react";
import { useHistory } from "react-router-dom";
import { checkOutOfMenu, checkOutOfStore } from "../../constants/Cart";
import { IMAGE_NOTFOUND, LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ProductCart = React.forwardRef(({ product, openRodal, index, openRodalOutOfStore }, ref) => {
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
    const { setCart1, setCart2, setCart3, menuIdProvider, setisCartMain1, setisCartMain2, setisCartMain3, mode, openRodalOutOfMenu, deliveryDate } = useContext(AppContext);
    const [productRodalQuantity, setProductRodalQuantity] = useState(0);
    const [isProductCart, setisProductCart] = useState(true);

    const [pro, setPro] = useState({});
    let history = useHistory();
    useEffect(() => {
        let newProduct = { ...product, quantityCart: 0 };
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
            setCart1([]);
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
            setCart2([]);
        }
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
            setCart3([]);
        }
        let CartList = [];
        if (mode === "1") {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
        } else if (mode === "2") {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
        } else {
            CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
        }
        for (let index = 0; index < CartList.length; index++) {
            if (CartList[index].id === newProduct.id) {
                newProduct = { ...newProduct, quantityCart: CartList[index].quantityCart };
            }
        }

        setPro({ ...newProduct });
        return () => {};
    }, [product, setCart1, setCart2, setCart3]);

    useEffect(() => {
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
            if (item.id === product.id) {
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
    }, [product]);
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
                setProductRodalQuantity(productRodalQuantity + 1);
                localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));

                setisCartMain3(true);
                setCart3(carts);
                localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...carts]));
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
                setProductRodalQuantity(1);
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
            <div className="box" key={pro.id} style={{ width: 150 }}>
                <div className="product mtop" style={{ margin: 5 }}>
                    <div
                        className="img"
                        onClick={() => {
                            history.push(`/mode/${mode}/product/${product.id}`);
                        }}
                    >
                        <img
                            src={product.image || IMAGE_NOTFOUND}
                            alt=""
                            style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "0.5rem",
                            }}
                        />
                    </div>
                    {/* </Link> */}
                    <div className="product-details" style={{ lineHeight: "1.4em" }}>
                        <span style={{ fontSize: 12, color: "#666" }}>{pro.storeName}</span>

                        <h3
                            style={{ fontSize: 14, cursor: "pointer", fontWeight: 600, lineHeight: 1.5 }}
                            onClick={() => {
                                // setIsHeader(false);
                                history.push(`/mode/${mode}/product/${product.id}`);
                            }}
                        >
                            {pro.name}
                        </h3>

                        <div className="price">
                            <h4 style={{ fontSize: 16, lineHeight: 1.5, display: "flex", alignItems: "center", gap: 3 }}>
                                {product.pricePerPack?.toLocaleString()}
                                <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>₫</span>
                            </h4>
                        </div>
                        <div className="" style={{ paddingBottom: "0" }}>
                            {isProductCart ? (
                                <div className="center_flex cart-quantity" style={{ width: " 100%", boxShadow: "0 4px 5px rgb(0 0 0 / 13%)", minWidth: "unset" }}>
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
                                <div className="center_flex cart-quantity" style={{ width: " 100%", minWidth: "unset" }}>
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
                        {/* <div className="price">
                            <span style={{ color: "#666", fontSize: 14 }}>{product.weight} </span>
                            <button onClick={() => AddCart(product)}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
});

// export default ProductCart;
