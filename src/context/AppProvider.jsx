import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getAreas, getOrdersbyPhone } from "../apis/apiService";
import {
  LOCALSTORAGE_CART_NAME1,
  LOCALSTORAGE_CART_NAME2,
  LOCALSTORAGE_CART_NAME3,
  LOCALSTORAGE_HiSTORY_SEARCH,
  LOCALSTORAGE_MODE,
  LOCALSTORAGE_ORDER,
  LOCALSTORAGE_USER_LOGIN,
  LOCALSTORAGE_USER_NAME,
} from "../constants/Variable";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [listProducts, setlistProducts] = useState([]);
  const [mode, setMode] = useState("1");
  const [menuIdProvider, setMenuIdProvider] = useState("0");
  const [modeType, setModeType] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [menuOrder, setMenuOrder] = useState(1);
  const [mobileMode, setMobileMode] = useState(
    window.innerWidth < 700 ? true : false
  );
  const [Cart1, setCart1] = useState([]);
  const [Cart2, setCart2] = useState([]);
  const [Cart3, setCart3] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadigFromHome, setisLoadigFromHome] = useState(true);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  const [openDeleteCart, setOpenDeleteCart] = useState(false);
  const [isCartFooter, setIsCartFooter] = useState(false);
  const [isHeaderHome, setIsHeaderHome] = useState(false);
  const [isHeader, setIsHeader] = useState(true);
  const [opentModalSuccess, setOpentModalSuccess] = useState(false);
  const [orderIdSuccess, setorderIdSuccess] = useState("");
  const [opentModalError, setOpentModalError] = useState(false);
  const [messError, setMessError] = useState(null);
  const [isHeaderOrder, setIsHeaderOrder] = useState(false);
  const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
  const [isLoadingMain, setisLoadingMain] = useState(true);
  const [isCartMain1, setisCartMain1] = useState(true);
  const [isCartMain2, setisCartMain2] = useState(true);
  const [isCartMain3, setisCartMain3] = useState(true);
  const [headerInfo, setHeaderInfo] = useState({});
  const [keySearch, setKeySearch] = useState("");
  const [isSearchSubmit, setIsSearchSubmit] = useState(false);
  const [categoriesInMenu, setCategoriesInMenu] = useState([]);
  const [apartmentProvider, setApartmentProvider] = useState([]);
  const [areaProvider, setAreaProvider] = useState([]);
  const [buildings, setBuildings] = useState([]);
  const [orderDrawer, setOrdersDrawer] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [contentIsConfirm, setContentIsConfirm] = useState("");
  // const [auth, setAuth] = useState({});
  let location = useLocation();
  let history = useHistory();
  // const { productItems } = Data;
  useEffect(() => {
    getOrdersbyPhone(1, 100, userInfo.phone)
      .then((res) => {
        console.log(res);
        if (res.data) {
          setOrdersDrawer(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setAreaProvider([]);
        setisLoadingMain(false);
      });
  }, [userInfo.phone]);

  useEffect(() => {
    getAreas(1, 100)
      .then((res) => {
        if (res.data) {
          const area = res.data;
          setAreaProvider(area);
          setisLoadingMain(false);
        } else {
          setAreaProvider([]);
          setisLoadingMain(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setAreaProvider([]);
        setisLoadingMain(false);
      });
  }, [location.pathname]);

  useEffect(() => {
    // if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_ORDER))) {
    //   localStorage.setItem(LOCALSTORAGE_ORDER, JSON.stringify([]));
    // } else {
    //   const order = JSON.parse(localStorage.getItem(LOCALSTORAGE_ORDER));
    //   setOrdersDrawer(order);
    // }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE))) {
      // setAuth({ userId: "", isLogin: false, userPhone: "" });
      // localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify({ userId: "", isLogin: false, userPhone: "" }));
    } else {
      const Mode = JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE));
      setMode(Mode);
      switch (Mode) {
        case "1":
          setModeType("Giao nhanh 30 phút");
          break;
        case "2":
          setModeType("Giao hàng trong ngày");
          break;
        case "3":
          setModeType("Đặt hàng 3 - 5 ngày");
          break;

        default:
          setModeType("");
          break;
      }
    }

    let modeId = location.pathname.trim().split("/")[2];
    if (
      location.pathname.trim().split("/") &&
      location.pathname.trim().split("/")[1] === "mode"
    ) {
      setMode(modeId);
      switch (modeId) {
        case "1":
          setModeType("Giao nhanh 30 phút");
          break;
        case "2":
          setModeType("Giao hàng trong ngày");
          break;
        case "3":
          setModeType("Đặt hàng 3 - 5 ngày");
          break;

        default:
          setModeType("");
          break;
      }
    }
  }, [location.pathname]);
  useEffect(() => {
    // if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_MODE))) {
    //     localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify(""));
    // }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME))) {
      localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
      setUserInfo({});
      history.push("/");
      // Khi vào ko có thì set vậy lun, luôn có key....
      // push đó là khi mà ko có thì nó ra trang chủ thoy
    } else {
      // có user thì mới có thẻ là đã đăng nhập ko thì auto chưa
      const user = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME));
      if (Object.keys(user).length === 0) {
        history.push("/");
      } else {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_LOGIN))) {
          setIsLogin(false);
        } else {
          setIsLogin(true);
        }
      }
      setUserInfo(user);

      // có user ngon :V
    }
    // chỉ để làm user thoy

    // xem đăng nhập chưa ?
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_HiSTORY_SEARCH))) {
      localStorage.setItem(
        LOCALSTORAGE_HiSTORY_SEARCH,
        JSON.stringify({ mode_1: [], mode_2: [], mode_3: [] })
      );
    } else {
      // const search = JSON.parse(localStorage.getItem(LOCALSTORAGE_HiSTORY_SEARCH));
      // setUserInfo(user);
    }
    return () => {};
  }, [history]);

  // useEffect(() => {
  //     if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_LOGIN))) {
  //         setAuth({ userId: "", isLogin: false, userPhone: "" });
  //         localStorage.setItem(LOCALSTORAGE_USER_LOGIN, JSON.stringify({ userId: "", isLogin: false, userPhone: "" }));
  //     } else {
  //         const auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_LOGIN));
  //         setAuth({ ...auth });
  //     }
  //     return () => {};
  // }, [history]);

  useEffect(() => {
    const checkout = location.pathname.trim().split("/")[1];
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
      localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
      setCart1([]);
      setisCartMain1(false);
    }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
      localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
      setCart2([]);
      setisCartMain2(false);
    }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
      localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
      setCart3([]);
      setisCartMain3(false);
    }

    const CartList1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
    const CartList2 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
    const CartList3 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
    if (checkout !== "" && checkout !== "order") {
      if (mode === "1") {
        if (CartList1.length === 0) {
          setisCartMain1(false);
        } else if (CartList1.length > 0) {
          setisCartMain1(true);
          if (CartList1[0] && CartList1[0].menuName) {
            setDeliveryDate(CartList1[0].menuName);
          }
          setCart1(CartList1);
        }
      } else if (mode === "2") {
        if (CartList2.length === 0) {
          setisCartMain2(false);
        } else if (CartList2.length > 0) {
          setisCartMain2(true);
          if (CartList2[0] && CartList2[0].menuName) {
            setDeliveryDate(CartList2[0].menuName);
          }
          setCart2(CartList2);
        }
      } else if (mode === "3") {
        if (CartList3.length === 0) {
          setisCartMain3(false);
        } else if (CartList3.length > 0) {
          setisCartMain3(true);
          // if (CartList3[0] && CartList3[0].menuName) {
          //     setDeliveryDate(CartList3[0].menuName);
          // }
          setCart3(CartList3);
        }
      }
    } else {
      setisCartMain1(false);
      setisCartMain2(false);
      setisCartMain3(false);
    }
    if (checkout === "checkout") {
      if (mode === "1") {
        if (CartList1.length === 0) {
          history.push("/");
        }
      } else if (mode === "2") {
        if (CartList2.length === 0) {
          history.push("/");
        }
      } else if (mode === "3") {
        if (CartList3.length === 0) {
          history.push("/");
        }
      }

      setCart1([...CartList1]);
      setCart2([...CartList2]);
      setCart3([...CartList3]);
    }
  }, [history, location, mode]);

  return (
    <AppContext.Provider
      value={{
        listProducts,
        setlistProducts,
        Cart1,
        setCart1,
        Cart2,
        setCart2,
        Cart3,
        setCart3,
        mobileMode,
        setMobileMode,
        isOpenDrawer,
        setIsOpenDrawer,
        mode,
        setMode,
        buildings,
        setBuildings,
        isHeaderOrder,
        setIsHeaderOrder,
        menuOrder,
        setMenuOrder,
        userInfo,
        setUserInfo,
        visiblePopupInfo,
        setVisiblePopupInfo,
        isHeaderHome,
        setIsHeaderHome,
        headerInfo,
        setHeaderInfo,
        isCartMain1,
        setisCartMain1,
        isCartMain2,
        setisCartMain2,
        isCartMain3,
        setisCartMain3,
        // auth,
        // setAuth,
        orderDrawer,
        setOrdersDrawer,
        areaProvider,
        setAreaProvider,
        apartmentProvider,
        setApartmentProvider,
        menuIdProvider,
        setMenuIdProvider,
        isCartFooter,
        setIsCartFooter,
        isLoadingMain,
        setisLoadingMain,
        opentModalSuccess,
        setOpentModalSuccess,
        opentModalError,
        setOpentModalError,
        openDeleteCart,
        setOpenDeleteCart,
        modeType,
        setModeType,
        categoriesInMenu,
        setCategoriesInMenu,
        keySearch,
        setKeySearch,
        isSearchSubmit,
        setIsSearchSubmit,
        messError,
        setMessError,
        orderIdSuccess,
        setorderIdSuccess,
        deliveryDate,
        setDeliveryDate,
        isHeader,
        setIsHeader,
        isLoadigFromHome,
        setisLoadigFromHome,
        isLogin,
        setIsLogin,
        isOpenSignup,
        setIsOpenSignup,
        isOpenLogin,
        setIsOpenLogin,
        isConfirm,
        setIsConfirm,
        contentIsConfirm,
        setContentIsConfirm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
