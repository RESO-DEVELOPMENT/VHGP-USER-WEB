import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import {
  IMAGE_NOTFOUND,
  LOCALSTORAGE_CART_NAME,
  LOCALSTORAGE_CART_NAME1,
  LOCALSTORAGE_CART_NAME2,
  LOCALSTORAGE_CART_NAME3,
  LOCALSTORAGE_MODE,
} from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

export const ShopCart = React.forwardRef(({ product }, ref) => {
  useImperativeHandle(ref, () => ({}));
  const {
    setCart1,
    setCart2,
    userInfo,
    setCart3,
    mode,
    mobileMode,
    setVisiblePopupInfo,
  } = useContext(AppContext);
  const [productRodalQuantity, setProductRodalQuantity] = useState(0);
  const [isShopCart, setisShopCart] = useState(true);

  const [pro, setPro] = useState({});
  let history = useHistory();
  useEffect(() => {
    let newProduct = { ...product, quantityCart: 0 };
    if (mode === "1") {
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        setCart1([]);
      } else {
        const CartList = JSON.parse(
          localStorage.getItem(LOCALSTORAGE_CART_NAME1)
        );
        for (let index = 0; index < CartList.length; index++) {
          if (CartList[index].id === newProduct.id) {
            newProduct = {
              ...newProduct,
              quantityCart: CartList[index].quantityCart,
            };
          }
        }
      }
      setPro({ ...newProduct });
      // Test
    } else if (mode === "2") {
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        setCart1([]);
      } else {
        const CartList = JSON.parse(
          localStorage.getItem(LOCALSTORAGE_CART_NAME2)
        );
        for (let index = 0; index < CartList.length; index++) {
          if (CartList[index].id === newProduct.id) {
            newProduct = {
              ...newProduct,
              quantityCart: CartList[index].quantityCart,
            };
          }
        }
      }
      setPro({ ...newProduct });
    } else {
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        setCart1([]);
      } else {
        const CartList = JSON.parse(
          localStorage.getItem(LOCALSTORAGE_CART_NAME3)
        );
        for (let index = 0; index < CartList.length; index++) {
          if (CartList[index].id === newProduct.id) {
            newProduct = {
              ...newProduct,
              quantityCart: CartList[index].quantityCart,
            };
          }
        }
      }
      setPro({ ...newProduct });
    }

    return () => {};
  }, [product, setCart1, setCart2, setCart3]);

  return (
    <>
      <div
        className="box"
        key={pro.id}
        style={{ width: mobileMode ? 120 : 135 }}
      >
        <div
          className="product mtop"
          style={{ margin: 0, padding: "0", boxShadow: "none" }}
        >
          {/* <Link to="/food-detail"> */}
          <div
            className="img shop-item-image"
            onClick={() => {
              // setIsHeader(false);
              // history.push(`/menu/${menu}/${product.id}`);
              // if (userInfo.building && userInfo.fullName && userInfo.phone) {
              history.push(`/mode/${mode}/store/${pro.id}`);
              // } else {
              //   setVisiblePopupInfo(true);
              // }
            }}
          >
            {/* <span className="discount">{item.discount}% Off</span> */}
            <img
              src={pro.image || IMAGE_NOTFOUND}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "0.5rem",
                objectFit: "cover",
              }}
            />
          </div>
          {/* </Link> */}
          <div
            className="product-details"
            style={{ lineHeight: "1.4em", marginTop: 8 }}
          >
            <h3
              style={{
                fontSize: 14,
                cursor: "pointer",
                fontWeight: 700,
                lineHeight: 1.5,
              }}
              onClick={() => {
                history.push(`/mode/${mode}/store/${pro.id}`);
              }}
            >
              {pro.name}
            </h3>
            <h3
              style={{
                fontSize: 12,
                cursor: "pointer",
                fontWeight: 400,
                lineHeight: 1.5,
              }}
              onClick={() => {
                // setIsHeader(false);
                // history.push(`/menu/${menu}/${product.id}`);
              }}
            >
              {pro.building}
            </h3>

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

// export default ShopCart;
