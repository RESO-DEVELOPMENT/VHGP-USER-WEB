import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Rodal from "rodal";
import { getMenuByMode, getProductDetail } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { checkOutOfMenu, checkOutOfStore } from "../constants/Cart";
import {
  IMAGE_NOTFOUND,
  LOCALSTORAGE_CART_NAME1,
  LOCALSTORAGE_CART_NAME2,
  LOCALSTORAGE_CART_NAME3,
  LOCALSTORAGE_MODE,
} from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const FoodDetailPage = () => {
  const {
    setCart1,
    setCart2,
    setCart3,
    mobileMode,
    setHeaderInfo,
    setisCartMain1,
    setisCartMain2,
    setisCartMain3,
    menuIdProvider,
    mode,
    modeType,
    deliveryDate,
    setMenuIdProvider,
  } = useContext(AppContext);
  const [isLoadingCircle, setIsLoadingCircle] = useState(true);
  const [product, setProduct] = useState({});
  const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
  const [visiblePopupOutOfStore, setVisiblePopupOutOfStore] = useState(false);
  const [visiblePopupOutOfMenu, setVisiblePopupOutOfMenu] = useState(false);
  const [productRodalQuantity, setProductRodalQuantity] = useState(0);
  const [isProductCart, setisProductCart] = useState(true);
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    let modeId = location.pathname.trim().split("/")[2];
    getMenuByMode(modeId).then((rs) => {
      const menu = rs.data;
      setMenuIdProvider(menu.id);
      console.log("Menu", menu.id);
      if (menuIdProvider === "0" && menu.id === "0" && mode !== "3") {
        history.push(`/mode/${modeId}`);
      } else {
        setHeaderInfo({ isSearchHeader: false, title: "Chi tiết sản phẩm" });
        setIsLoadingCircle(true);
        let productId = location.pathname.trim().split("/")[4];
        if (productId) {
          getProductDetail(productId)
            .then((res) => {
              if (res.data) {
                const product = res.data;
                let newProduct = { ...product, quantityCart: 0 };
                if (mode === "1") {
                  if (
                    !JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))
                  ) {
                    localStorage.setItem(
                      LOCALSTORAGE_CART_NAME1,
                      JSON.stringify([])
                    );
                    setCart1([]);
                  } else {
                    const CartList1 = JSON.parse(
                      localStorage.getItem(LOCALSTORAGE_CART_NAME1)
                    );
                    for (let index = 0; index < CartList1.length; index++) {
                      if (CartList1[index].id === newProduct.id) {
                        newProduct = {
                          ...newProduct,
                          quantityCart: CartList1[index].quantityCart,
                        };
                      }
                    }
                  }
                } else if (mode === "2") {
                  if (
                    !JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))
                  ) {
                    localStorage.setItem(
                      LOCALSTORAGE_CART_NAME2,
                      JSON.stringify([])
                    );
                    setCart2([]);
                  } else {
                    const CartList2 = JSON.parse(
                      localStorage.getItem(LOCALSTORAGE_CART_NAME2)
                    );
                    for (let index = 0; index < CartList2.length; index++) {
                      if (CartList2[index].id === newProduct.id) {
                        newProduct = {
                          ...newProduct,
                          quantityCart: CartList2[index].quantityCart,
                        };
                      }
                    }
                  }
                } else if (mode === "3") {
                  if (
                    !JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))
                  ) {
                    localStorage.setItem(
                      LOCALSTORAGE_CART_NAME3,
                      JSON.stringify([])
                    );
                    setCart3([]);
                  } else {
                    const CartList3 = JSON.parse(
                      localStorage.getItem(LOCALSTORAGE_CART_NAME3)
                    );
                    for (let index = 0; index < CartList3.length; index++) {
                      if (CartList3[index].id === newProduct.id) {
                        newProduct = {
                          ...newProduct,
                          quantityCart: CartList3[index].quantityCart,
                        };
                      }
                    }
                  }
                }
                setProduct({ ...newProduct });

                setIsLoadingCircle(false);
              } else {
                setProduct({});
                setIsLoadingCircle(false);
              }
            })
            .catch((error) => {
              console.log(error);
              setProduct({});
              setIsLoadingCircle(false);
            });
        }
      }
    });

    return () => {};
  }, [
    history,
    location,
    setCart1,
    setCart2,
    setCart3,
    setHeaderInfo,
    setIsLoadingCircle,
  ]);

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
  }, [menuIdProvider, product]);

  useEffect(() => {
    if (!isLoadingCircle) {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {};
  }, [isLoadingCircle]);
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
    localStorage.setItem(
      LOCALSTORAGE_CART_NAME1,
      JSON.stringify([...newCarts])
    );
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
    localStorage.setItem(
      LOCALSTORAGE_CART_NAME2,
      JSON.stringify([...newCarts])
    );
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
    localStorage.setItem(
      LOCALSTORAGE_CART_NAME3,
      JSON.stringify([...newCarts])
    );
  };

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
    localStorage.setItem(
      LOCALSTORAGE_CART_NAME1,
      JSON.stringify([...newCarts])
    );
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
    localStorage.setItem(
      LOCALSTORAGE_CART_NAME2,
      JSON.stringify([...newCarts])
    );
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
    localStorage.setItem(
      LOCALSTORAGE_CART_NAME3,
      JSON.stringify([...newCarts])
    );
  };

  const AddCartOutOfStore = () => {
    if (mode === "1") {
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
      }
      const carts = [
        {
          ...product,
          quantityCart: 1,
          menuId: menuIdProvider,
        },
      ];
      setVisiblePopupOutOfStore(false);
      setisProductCart(true);
      setProductRodalQuantity(1);
      setCart1(carts);
      localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([...carts]));
    } else if (mode === "2") {
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
      }
      const carts = [
        {
          ...product,
          quantityCart: 1,
          menuId: menuIdProvider,
        },
      ];
      setVisiblePopupOutOfStore(false);
      setisProductCart(true);
      setProductRodalQuantity(1);
      setCart2(carts);
      localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([...carts]));
    } else {
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
      }
      const carts = [
        {
          ...product,
          quantityCart: 1,
          menuId: menuIdProvider,
        },
      ];

      setVisiblePopupOutOfMenu(false);
      setVisiblePopupOutOfStore(false);
      setisProductCart(true);
      setProductRodalQuantity(1);
      setCart3(carts);
      localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([...carts]));
    }
    // reLoad();
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
    if (mode === "1") {
      const CartList1 = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_CART_NAME1)
      );
      if (!checkOutOfStore(product, mode)) {
        const carts = [
          ...CartList1,
          {
            ...product,
            quantityCart: 1,
            menuId: menuIdProvider,
            menuName: deliveryDate,
          },
        ];
        setisProductCart(true);
        setisCartMain1(true);
        setProductRodalQuantity(productRodalQuantity + 1);
        setCart1(carts);
        localStorage.setItem(
          LOCALSTORAGE_CART_NAME1,
          JSON.stringify([...carts])
        );
        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
      } else {
        setVisiblePopupOutOfStore(true);
      }
    } else if (mode === "3") {
      const CartList3 = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_CART_NAME3)
      );
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
          localStorage.setItem(
            LOCALSTORAGE_CART_NAME3,
            JSON.stringify([...carts])
          );
          localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
        } else {
          setVisiblePopupOutOfStore(true);
        }
      } else {
        setVisiblePopupOutOfMenu(true);
      }
    } else {
      const CartList2 = JSON.parse(
        localStorage.getItem(LOCALSTORAGE_CART_NAME2)
      );
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
        localStorage.setItem(
          LOCALSTORAGE_CART_NAME2,
          JSON.stringify([...carts])
        );
        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(mode));
      } else {
        setVisiblePopupOutOfStore(true);
      }
    }
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

    let newCarts = CartList?.filter((item) => item.id !== product.id);
    if (mode === "1") {
      setCart1([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME1,
        JSON.stringify([...newCarts])
      );
      if (newCarts.length === 0) {
        setisCartMain1(false);
      }
    } else if (mode === "2") {
      setCart2([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME2,
        JSON.stringify([...newCarts])
      );
      if (newCarts.length === 0) {
        setisCartMain2(false);
      }
    } else {
      setCart3([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME3,
        JSON.stringify([...newCarts])
      );
      if (newCarts.length === 0) {
        setisCartMain3(false);
      }
    }
    setVisiblePopupQuantity(false);
    setisProductCart(false);
    setProductRodalQuantity(0);
  };
  return (
    <>
      <Loading isLoading={isLoadingCircle} />
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
          <div
            style={{
              paddingBottom: "10px",
              textAlign: "center",
              paddingTop: 12,
            }}
          >
            <span
              style={{
                fontSize: mobileMode ? 17 : 18,
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              Bạn muốn đặt món ở cửa hàng này?
            </span>
          </div>
          <div style={{ padding: "0px 0 0px 0", textAlign: "center" }}>
            <span
              className=""
              style={{
                fontSize: mobileMode ? 15 : 16,
                fontWeight: "lighter",
                textAlign: "center",
                color: "grey",
              }}
            >
              Nhưng những món bạn đã chọn từ cửa hàng trước sẽ bị xóa khỏi giỏ
              hàng nhé.
            </span>
          </div>

          <div
            className="f_flex rodal-delet-cart"
            style={{
              width: " 100%",
              justifyContent: "space-between",
              paddingTop: 20,
              gap: 10,
            }}
          >
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
                AddCartOutOfStore();

                // setisProductCartRodal(false);
                // setIsOpenRodal(false);
                // deleteCartItem();
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
          <div
            style={{
              paddingBottom: "10px",
              textAlign: "center",
              paddingTop: 12,
            }}
          >
            <span
              style={{
                fontSize: mobileMode ? 17 : 18,
                fontWeight: 700,
                color: "var(--primary)",
              }}
            >
              Bạn muốn đặt món ở vào ngày này?
            </span>
          </div>
          <div style={{ padding: "0px 0 0px 0", textAlign: "center" }}>
            <span
              className=""
              style={{
                fontSize: mobileMode ? 15 : 16,
                fontWeight: "lighter",
                textAlign: "center",
                color: "grey",
              }}
            >
              Nhưng những món bạn đã chọn từ ngày trước sẽ bị xóa khỏi giỏ hàng
              nhé.
            </span>
          </div>

          <div
            className="f_flex rodal-delet-cart"
            style={{
              width: " 100%",
              justifyContent: "space-between",
              paddingTop: 20,
              gap: 10,
            }}
          >
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
                AddCartOutOfStore();
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
          <span style={{ fontSize: 16, fontWeight: 700 }}>
            Bạn có chắc muốn xóa
          </span>
        </div>
        <div style={{ padding: "10px 0 5px 0", textAlign: "center" }}>
          <span
            className="cart-quantity-name"
            style={{
              fontSize: 20,
              fontWeight: 700,
              textAlign: "center",
              color: "rgb(82, 182, 91)",
            }}
          >
            {product.name}
          </span>
        </div>

        <div
          className="f_flex rodal-delet-cart"
          style={{
            width: " 100%",
            justifyContent: "space-between",
            paddingTop: 20,
            gap: 10,
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              setVisiblePopupQuantity(false);
            }}
            style={{
              flex: 1,
              padding: 14,
              fontSize: "16px",
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
              fontSize: "16px",
              height: 45,
              cursor: "pointer",
              fontWeight: 700,
              borderRadius: 10,
              background:
                "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
              color: "#fff",
              transition: "0.3s all",
              WebkitTransition: "0.3s all",
            }}
          >
            OK
          </button>
        </div>
      </Rodal>
      <div
        className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}
      ></div>
      {!isLoadingCircle && product && (
        <section
          className=""
          style={{
            paddingTop: 60,
            paddingBottom: 0,
            background: "#fff",
            transition: "1s all",
            WebkitTransition: "1s all",
          }}
        >
          <div
            className="container non-radius"
            style={{ borderRadius: 0, height: "100%" }}
          >
            <div
              className="d_flex food-detail"
              style={{
                padding: "10px 25px",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className="food-detail-left" style={{}}>
                <img src={product.image || IMAGE_NOTFOUND} alt="" />
              </div>
              <div className="food-detail-right">
                {/* <div className="rate" style={{ color: "#e94560", marginBottom: 10 }}>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star" style={{ color: "rgb(102, 102, 102)" }}></i>
                            </div> */}
                <h3 style={{ fontSize: 20 }}>{product.name}</h3>
                <div
                  style={{
                    color: "var(--primary)",
                    fontSize: "24px",
                    marginTop: 10,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {product.pricePerPack?.toLocaleString()}
                  <span style={{ fontSize: "1.2rem" }}>₫</span>
                </div>

                <h4
                  style={{
                    marginBottom: 15,
                    fontSize: mobileMode ? 14 : 16,
                    fontWeight: 400,
                    color: "#666",
                  }}
                >
                  {product.packDescription}
                </h4>
                <h4
                  style={{
                    marginBottom: 15,
                    fontSize: mobileMode ? 14 : 15,
                    fontWeight: 500,
                    color: "#4db856",
                    textTransform: "uppercase",
                  }}
                >
                  {mode === "3" ? "Giao hàng vào " + deliveryDate : modeType}
                </h4>
                <div
                  className="d_flex food-detail-info"
                  style={{
                    justifyContent: "start",
                    padding: "10px 0 10px 0",
                    gap: 15,
                    borderTop: "1px solid rgb(230,230,230)",
                    borderBottom: "1px solid rgb(230,230,230)",
                  }}
                >
                  <div
                    className="food-detail-shop"
                    style={{ width: 70, height: 70 }}
                    onClick={() => {}}
                  >
                    <img
                      onClick={() => {
                        history.push(`/mode/${mode}/store/${product.storeId}`);
                      }}
                      width={"100%"}
                      height={"100%"}
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                        cursor: "pointer",
                      }}
                      src={
                        product.storeImage ||
                        "https://cdn-icons-png.flaticon.com/512/123/123403.png"
                      }
                      alt=""
                    />
                  </div>
                  <div style={{}} className="center_flex">
                    <h4
                      onClick={() => {
                        history.push(`/mode/${mode}/store/${product.storeId}`);
                      }}
                      style={{
                        fontSize: mobileMode ? 16 : 16,
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      {product.storeName}
                    </h4>
                    <span
                      style={{
                        color: "rgb(160,160,160)",
                        fontWeight: 400,
                        fontSize: 15,
                      }}
                    >
                      {product.slogan}
                    </span>
                  </div>
                </div>
                {product.description !== "" && (
                  <p
                    style={{
                      color: "#666666",
                      padding: "20px 0",
                      fontSize: "15px",
                    }}
                  >
                    {product.description}
                  </p>
                )}
                <div className="" style={{ paddingBottom: 15, paddingTop: 15 }}>
                  {isProductCart ? (
                    <div
                      className="center_flex cart-quantity"
                      style={{
                        width: " 100%",
                        boxShadow: "0 4px 5px rgb(0 0 0 / 13%)",
                      }}
                    >
                      <div
                        style={{
                          color:
                            productRodalQuantity > 0 ? "" : "rgba(0,0,0,.25)",
                        }}
                        className="center_flex cart-quantity-minus"
                        onClick={() => {
                          if (productRodalQuantity > 1) {
                            if (mode === "1") {
                              decreaseQtyCart1(product.id);
                            } else if (mode === "2") {
                              decreaseQtyCart2(product.id);
                            } else {
                              decreaseQtyCart3(product.id);
                            }
                          } else {
                            setVisiblePopupQuantity(true);
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
                      >
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="center_flex cart-quantity"
                      style={{ width: " 100%" }}
                    >
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
                <table>
                  <tbody>
                    <tr className="">
                      <td className="food-detail-label">Loại Thực Phẩm: </td>
                      <td>
                        <div className="cusor" style={{}}>
                          <span className="food-detail-text" style={{}}>
                            {product.productCategory}
                          </span>
                        </div>
                      </td>
                    </tr>

                    <tr className="">
                      <td className="food-detail-label">Đóng Gói: </td>
                      <td className="food-detail-text">
                        {product.packNetWeight
                          ? product.packNetWeight + " " + product.unit
                          : "Không có"}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="food-detail-label">Tối Thiểu: </td>
                      <td className="food-detail-text">
                        {product.minimumQuantity
                          ? product.minimumQuantity + " " + product.unit
                          : "Không có"}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="food-detail-label">Tối Đa: </td>
                      <td className="food-detail-text">
                        {product.maximumQuantity
                          ? product.maximumQuantity + " " + product.unit
                          : "Không có"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* <section className="shop background">
                <div className="container">
                    <div className="heading d_flex">
                        <div className="heading f_flex">
                            <h1 style={{ marginTop: 3 }}>Sẩn Phẩm Tương Tự</h1>
                        </div>
                        <div className="heading-right row">
                            <span>Xem tất cả</span>
                            <i className="fa-solid fa-caret-right"></i>
                        </div>
                    </div>
                    <RecommendProduct />
                </div>
            </section> */}
    </>
  );
};
