import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import Rodal from "rodal";
import {
  getApartment,
  getShipcostByMenu,
  getTimeDurationList,
  postOrder,
} from "../apis/apiService";
import { CountDown } from "../common/Cart/CountDown";
import "../common/Cart/style.css";
import Loading from "../common/Loading/Loading";
import { RodalNote } from "../common/Rodal/RodalNote";
import RodalPayment from "../common/Rodal/RodalPayment";
import RodalUpdateCart from "../common/Rodal/RodalUpdateCart";
import { hanldeGetTime, validatePhoneNumber } from "../constants/Caculator";
import {
  IMAGE_NOTFOUND,
  LOCALSTORAGE_CART_NAME1,
  LOCALSTORAGE_CART_NAME2,
  LOCALSTORAGE_CART_NAME3,
  LOCALSTORAGE_MODE,
  LOCALSTORAGE_ORDER,
  LOCALSTORAGE_USER_NAME,
} from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

const Cart = ({}) => {
  const {
    Cart1,
    Cart2,
    Cart3,
    setCart1,
    setCart2,
    setCart3,
    setHeaderInfo,
    setIsHeaderOrder,
    mobileMode,
    setisCartMain1,
    setisCartMain2,
    setisCartMain3,
    userInfo,
    setUserInfo,
    areaProvider,
    menuIdProvider,
    modeType,
    setMenuIdProvider,
    mode,
    setMode,
    setMessError,
    setOrdersDrawer,
    setorderIdSuccess,
    setOpentModalError,
    setOpentModalSuccess,
  } = useContext(AppContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [CartList, setCartList] = useState([]);
  const [visiblePopupInfo, setVisiblePopupInfo] = useState(false);
  const [visiblePopupQuantity, setVisiblePopupQuantity] = useState(false);
  const [visiblePopupComfirm, setVisiblePopupComfirm] = useState(false);
  const [visiblePopupNote, setVisiblePopupNote] = useState(false);
  const [visiblePopupPayment, setVisiblePopupPayment] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [area, setArea] = useState("");
  const [apartment, setApartment] = useState("");
  const [optionTime, setOptionTime] = useState([]);
  const [hour, setHour] = useState("");
  const [apartmentList, setApartmentList] = useState([]);
  const [buldingList, setBuldingList] = useState([]);
  const [productRodal, setProductRodal] = useState("");
  const [productRodalQuantity, setProductRodalQuantity] = useState(1);
  const [isValidFullName, setIsValidFullname] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidBuilding, setIsValidBuilding] = useState(false);
  const [isLoadingOrder, setisLoadingOrder] = useState(false);
  const [isLoadingWhite, setisLoadingWhite] = useState(true);
  const [isValidPhoneRegex, setIsValidPhoneRegex] = useState(true);
  const [storeName, setStoreName] = useState("");
  const [service, setService] = useState("2");
  const [deliveryDateCart, setDeliveryDate] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const [paymentType, setPaymentType] = useState(0);
  const [isValidArea, setIsValidArea] = useState(false);
  const [isValidApartment, setIsValidApartment] = useState(false);
  const [note, setNote] = useState("");
  const [shipCost, setShipCost] = useState(0);

  let date = new Date();
  let location = useLocation();
  useEffect(() => {
    let modeId = location.pathname.split("/")[2];
    let total = 0;
    let menuIdCart = 0;
    if (modeId && (modeId === "1" || modeId === "2" || modeId === "3")) {
      if (modeId === "1") {
        Cart1?.map((item) => {
          return (total = item.pricePerPack * item.quantityCart + total);
        });
        if (Cart1 && Cart1?.length > 0) {
          setMenuIdProvider(Cart1[0].menuId);
          menuIdCart = Cart1[0].menuId;
        }
        setTotalPrice(total);
        setCartList(Cart1);
      } else if (modeId === "2") {
        Cart2?.map((item) => {
          return (total = item.pricePerPack * item.quantityCart + total);
        });
        if (Cart2 && Cart2?.length > 0) {
          setMenuIdProvider(Cart2[0].menuId);
          menuIdCart = Cart2[0].menuId;
        }
        setTotalPrice(total);
        setCartList(Cart2);
      } else {
        Cart3?.map((item) => {
          return (total = item.pricePerPack * item.quantityCart + total);
        });
        if (Cart3 && Cart3?.length > 0) {
          setMenuIdProvider(Cart3[0].menuId);
          menuIdCart = Cart3[0].menuId;
        }
        setTotalPrice(total);
        setCartList(Cart3);
      }
      // let menuId = "13c699e4-7e19-4ecb-ac99-1df0661f0e61";
      if (area) {
        Promise.all([
          getTimeDurationList(menuIdProvider, 1, 100),
          getApartment(area.value),
          getShipcostByMenu(menuIdCart),
        ])
          .then((res) => {
            if (res.length > 0) {
              const duration = res[0].data;
              const apart = res[1].data;
              const menuShipcost = res[2].data;
              setApartmentList(apart.listCluster);
              if (apartment) {
                for (let index = 0; index < apart.listCluster.length; index++) {
                  const element = apart.listCluster[index];
                  if (element.id === apartment.value) {
                    setBuldingList(element.listBuilding);
                  }
                }
              }
              if (menuShipcost) {
                setShipCost(menuShipcost.shipCost);
              }
              if (duration) {
                let optionsHours = [];
                if (mode === "2") {
                  duration.forEach((hour) => {
                    if (parseInt(hour.fromHour) >= date.getHours() + 1) {
                      optionsHours.push({
                        value: hour.id,
                        label: hour.fromHour + " - " + hour.toHour,
                      });
                    }
                  });
                } else if (mode === "3") {
                  duration.forEach((hour) => {
                    optionsHours.push({
                      value: hour.id,
                      label: hour.fromHour + " - " + hour.toHour,
                    });
                  });
                }

                setOptionTime(optionsHours);
              }

              setTimeout(() => {
                document.getElementById("main").style.overflow = "hidden";
                setisLoadingWhite(false);
              }, 300);
            } else {
              setApartmentList([]);
              setisLoadingWhite(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setApartmentList([]);
            setisLoadingWhite(false);
          });
      }
    }
  }, [Cart1, Cart2, Cart3, apartment, area]);
  useEffect(() => {
    let modeId = location.pathname.split("/")[2];

    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
      localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
      localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
      localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
    }
    if (modeId && (modeId === "1" || modeId === "2" || modeId === "3")) {
      setMode(modeId);
      let CartList = [];
      if (modeId === "1") {
        CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
      } else if (modeId === "2") {
        CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
      } else {
        CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
      }
      if (CartList.length === 0) {
        if (modeId === "1") {
          history.push("/mode/1");
        } else if (modeId === "2") {
          history.push("/mode/2");
        } else if (modeId === "3") {
          history.push("/mode/3");
        } else {
          history.push("/");
        }
      } else {
        setStoreName(CartList[0].storeName);
        setDeliveryDate(CartList[0].menuName);
      }
    }
    setisLoadingWhite(true);

    document.getElementById("main").scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    return () => {
      document.getElementById("main").style.overflow = "auto";
    };
  }, [location.pathname, mode]);
  const handleSubmit = () => {
    let isValid = true;
    if (
      fullName.length === 0 ||
      phone.length === 0 ||
      !building?.value ||
      !validatePhoneNumber(phone)
    ) {
      isValid = false;
    }
    if (!fullName && fullName.length === 0) {
      setIsValidFullname(true);
    } else {
      setIsValidFullname(false);
    }
    if (!phone && phone.length === 0) {
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
    if (!building && building.length === 0) {
      setIsValidBuilding(true);
    } else {
      setIsValidBuilding(false);
    }
    if (!apartment && apartment.length === 0) {
      setIsValidApartment(true);
    } else {
      setIsValidApartment(false);
    }
    if (!area && area.length === 0) {
      setIsValidArea(true);
    } else {
      setIsValidArea(false);
    }
    if (validatePhoneNumber(phone)) {
      setIsValidPhoneRegex(true);
    } else {
      setIsValidPhoneRegex(false);
    }
    if (isValid) {
      setUserInfo({ fullName, phone, building, note, area, apartment });
      localStorage.setItem(
        LOCALSTORAGE_USER_NAME,
        JSON.stringify({ fullName, phone, building, area, note, apartment })
      );
      setVisiblePopupInfo(false);
    }
  };

  useEffect(() => {
    // let menuId = "13c699e4-7e19-4ecb-ac99-1df0661f0e61";

    // if (area) {
    //     Promise.all([getTimeDurationList(menuId, 1, 100), getApartment(area.value)])
    //         .then((res) => {
    //             if (res.length > 0) {
    //                 const duration = res[0].data;
    //                 const apart = res[1].data;
    //                 setApartmentList(apart.listCluster);
    //                 if (apartment) {
    //                     for (let index = 0; index < apart.listCluster.length; index++) {
    //                         const element = apart.listCluster[index];
    //                         if (element.id === apartment.value) {
    //                             setBuldingList(element.listBuilding);
    //                         }
    //                     }
    //                 }
    //                 if (duration) {
    //                     let optionsHours = [];
    //                     if (mode === "2") {
    //                         duration.forEach((hour) => {
    //                             if (parseInt(hour.fromHour) >= date.getHours() + 1) {
    //                                 optionsHours.push({ value: hour.id, label: hour.fromHour + " - " + hour.toHour });
    //                             }
    //                         });
    //                     } else if (mode === "3") {
    //                         duration.forEach((hour) => {
    //                             optionsHours.push({ value: hour.id, label: hour.fromHour + " - " + hour.toHour });
    //                         });
    //                     }

    //                     setOptionTime(optionsHours);
    //                 }

    //                 setTimeout(() => {
    //                     document.getElementById("main").style.overflow = "hidden";
    //                     setisLoadingWhite(false);
    //                 }, 400);
    //             } else {
    //                 setApartmentList([]);
    //                 setisLoadingWhite(false);
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setApartmentList([]);
    //             setisLoadingWhite(false);
    //         });
    // }
    return () => {
      document.getElementById("main").style.overflow = "auto";
    };
  }, [userInfo]);
  const optionsBuilding = buldingList.map((building) => {
    return { value: building.id, label: building.name };
  });
  const optionsApartment = apartmentList.map((building) => {
    return { value: building.id, label: building.name };
  });
  const optionArea = areaProvider.map((area) => {
    return { value: area.id, label: area.name };
  });
  let history = useHistory();
  const hanldeOrder = () => {
    setisLoadingOrder(true);
    let productOrders = CartList.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantityCart.toString(),
        price: item.pricePerPack,
      };
    });

    let order = {
      id: "",
      phoneNumber: phone,
      total: totalPrice,
      storeId: CartList.length > 0 && CartList[0].storeId,
      menuId: menuIdProvider,
      buildingId: building.value,
      note: note,
      fullName: fullName,
      modeId: mode,
      serviceId: service,
      deliveryTimeId: mode === "1" ? "1" : hour.value,
      orderDetail: [...productOrders],
      payments: [
        {
          type: paymentType,
        },
      ],
    };

    postOrder(order)
      .then((res) => {
        if (res.data) {
          const { statusCode } = res.data;
          const { message } = res.data;
          setorderIdSuccess(res.data.data.id);
          if (statusCode === "Fail") {
            setMessError(message);
            setOpentModalError(true);
            setisLoadingOrder(false);
          } else {
            // let orderId = "";
            // if (res.data.data) {
            // const { id } = res.data.data;
            // orderId = id;

            // const newOrder = res.data.data;
            // if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_ORDER))) {
            //   localStorage.setItem(LOCALSTORAGE_ORDER, JSON.stringify([]));
            // } else {
            //   const orderLocal = JSON.parse(
            //     localStorage.getItem(LOCALSTORAGE_ORDER)
            //   );
            //   setOrdersDrawer([...orderLocal, newOrder]);
            //   localStorage.setItem(
            //     LOCALSTORAGE_ORDER,
            //     JSON.stringify([...orderLocal, newOrder])
            //   );
            // }
            // }
            // setorderIdSuccess(orderId);

            if (mode === "1") {
              localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
              setCart1([]);
            } else if (mode === "2") {
              localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
              setCart2([]);
            } else {
              localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
              setCart3([]);
            }
            setOpentModalSuccess(true);
            setisLoadingOrder(false);
            if (paymentType === 1) {
              // window.location.href = `https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/ByOrderId/payment?orderId=${orderId}`;
            }
          }
        }
      })
      .catch((error) => {
        setMessError(null);
        console.log(error);
        setOpentModalError(true);
        setisLoadingOrder(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setisLoadingOrder(false);
    }, 100);
    // setUser(userInfo);
    setFullName(userInfo.fullName || "");
    setPhone(userInfo.phone || "");
    setBuilding(userInfo.building || "");
    setNote(userInfo.note || "");
    setApartment(userInfo.apartment || "");
    setArea(userInfo.area || "");
  }, [userInfo]);

  useEffect(() => {
    setIsHeaderOrder(false);
    setHeaderInfo({ isSearchHeader: false, title: "Đơn hàng của bạn" });
    setisCartMain1(false);
    setisCartMain2(false);
    setisCartMain3(false);
    return () => {
      if (CartList.length > 0) {
        setisCartMain1(true);
        setisCartMain2(true);
        setisCartMain3(true);
      }
    };
  }, [
    setIsHeaderOrder,
    setHeaderInfo,
    setisCartMain1,
    setisCartMain2,
    setisCartMain3,
    CartList,
  ]);

  // Tăng số lượng sản phẩm trong giỏ hàng
  const increaseQty = (id) => {
    setProductRodalQuantity(productRodalQuantity + 1);
  };

  // Giảm số lượng sản phẩm trong giỏ hàng
  const decreaseQty = (id) => {
    setProductRodalQuantity(productRodalQuantity - 1);
  };
  const updateCart = (id) => {
    let newCarts = [];
    newCarts = CartList?.map((item) => {
      if (item.id === id) {
        item.quantityCart = productRodalQuantity;
      }
      return item;
    });
    if (mode === "1") {
      setCart1([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME1,
        JSON.stringify([...newCarts])
      );
    } else if (mode === "2") {
      setCart2([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME2,
        JSON.stringify([...newCarts])
      );
    } else {
      setCart3([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME3,
        JSON.stringify([...newCarts])
      );
    }
    setVisiblePopupQuantity(false);
  };
  const deleteCartItem = (id) => {
    let newCarts = CartList?.filter((item) => item.id !== id);
    // let newProduts = listProducts?.filter((item) => item.id !== id);
    // Cập nhật lại danh sách sản phẩm hiện tại với số lượng vừa được cập nhật
    // setlistProducts([...newProduts]);
    if (mode === "1") {
      setCart1([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME1,
        JSON.stringify([...newCarts])
      );
    } else if (mode === "2") {
      setCart2([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME2,
        JSON.stringify([...newCarts])
      );
    } else {
      setCart3([...newCarts]);
      localStorage.setItem(
        LOCALSTORAGE_CART_NAME3,
        JSON.stringify([...newCarts])
      );
    }
    setisLoadingOrder(false);
    setVisiblePopupQuantity(false);
  };

  return (
    <>
      <div
        className={`loading-spin ${
          isLoadingWhite === false ? "loading-spin-done" : ""
        }`}
      ></div>
      <Rodal
        // height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea ? (mobileMode ? 620 : 650) : mobileMode ? 500 : 540}
        height={
          isValidFullName ||
          isValidPhone ||
          isValidBuilding ||
          isValidApartment ||
          isValidArea ||
          !isValidPhoneRegex
            ? mobileMode
              ? 550
              : 590
            : mobileMode
            ? 500
            : 540
        }
        // height={mobileMode ? 535 : 575}
        width={mobileMode ? 350 : 400}
        visible={visiblePopupInfo}
        onClose={() => {
          setVisiblePopupInfo(false);
          // setIsValid(true);
          setIsValidBuilding(false);
          setIsValidFullname(false);
          setIsValidPhone(false);
        }}
        style={{ borderRadius: 10 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <div
              style={{
                borderBottom: "1px solid rgb(220,220,220)",
                paddingBottom: "10px",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 700 }}>Nơi nhận</span>
            </div>
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Khu vực <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <div className={`${isValidArea && "error-select"}`}>
              <Select
                options={optionArea}
                placeholder="Khu vực"
                onChange={(e) => {
                  setArea(e);
                  setApartment("");
                  setBuilding("");
                  setBuldingList([]);
                  // setApartmentList([]);
                }}
                value={area}
              />
            </div>

            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Cụm tòa nhà
                <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <div className={`${isValidApartment && "error-select"}`}>
              <Select
                options={optionsApartment}
                placeholder="Tòa nhà"
                onChange={(e) => {
                  setApartment(e);
                  setBuilding("");
                  for (let index = 0; index < apartmentList.length; index++) {
                    const element = apartmentList[index];
                    if (element.id === e.value) {
                      setBuldingList(element.listBuilding);
                    }
                  }
                }}
                value={apartment}
              />
            </div>

            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Building (Tòa nhà)
                <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <div className={`${isValidBuilding && "error-select"}`}>
              <Select
                options={optionsBuilding}
                placeholder="Tòa nhà"
                onChange={(e) => setBuilding(e)}
                value={building}
              />
            </div>

            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Tên người nhận
                <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <div className="rodal-title" style={{ width: " 100%" }}>
              <input
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                value={fullName}
                type="text"
                style={{
                  border: !isValidFullName
                    ? "1px solid rgb(200,200,200)"
                    : "1px solid red",
                  width: " 100%",
                  borderRadius: 4,
                  padding: "10px 10px",
                  lineHeight: "1rem",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Số điện thoại nhận hàng
                <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <div className="rodal-title" style={{ width: " 100%" }}>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="number"
                style={{
                  border: !isValidPhone
                    ? "1px solid rgb(200,200,200)"
                    : "1px solid red",
                  width: " 100%",
                  borderRadius: 4,
                  padding: "10px 10px",
                  lineHeight: "1rem",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>
          {(isValidFullName ||
            isValidPhone ||
            isValidBuilding ||
            isValidApartment ||
            isValidArea ||
            !validatePhoneNumber) && (
            <div className="input-validate-form">
              <span>Vui lòng điền đủ thông tin</span>
            </div>
          )}
          {!(
            isValidFullName ||
            isValidPhone ||
            isValidBuilding ||
            isValidApartment ||
            isValidArea
          ) &&
            !isValidPhoneRegex && (
              <div className="input-validate-form">
                <span>Số điện thoại không hơp lệ</span>
              </div>
            )}
          <div
            className="f_flex rodal-delet-cart"
            style={{
              width: " 100%",
              justifyContent: "space-between",
              paddingTop: 5,
              gap: 15,
            }}
          >
            <button
              style={{
                flex: 1,
                padding: 14,
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: 700,
                borderRadius: 10,
                height: 50,
              }}
              onClick={(e) => {
                e.preventDefault();
                setVisiblePopupInfo(false);
              }}
            >
              Đóng
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              style={{
                flex: 1,
                padding: 14,
                fontSize: "1rem",
                cursor: "pointer",
                fontWeight: 700,
                borderRadius: 10,
                background: "var(--primary)",
                color: "#fff",
                height: 50,
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Rodal>
      <RodalNote
        apartment={apartment}
        area={area}
        building={building}
        fullName={fullName}
        note={note}
        phone={phone}
        setNote={setNote}
        setVisiblePopupNote={setVisiblePopupNote}
        visiblePopupNote={visiblePopupNote}
      />
      <RodalPayment
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        setVisiblePopupPayment={setVisiblePopupPayment}
        visiblePopupPayment={visiblePopupPayment}
      />

      <RodalUpdateCart
        decreaseQty={decreaseQty}
        deleteCartItem={deleteCartItem}
        increaseQty={increaseQty}
        mode={mode}
        productRodal={productRodal}
        productRodalQuantity={productRodalQuantity}
        setVisiblePopupQuantity={setVisiblePopupQuantity}
        updateCart={updateCart}
        visiblePopupQuantity={visiblePopupQuantity}
      />
      <Rodal
        height={310}
        width={mobileMode ? 350 : 400}
        visible={visiblePopupComfirm}
        showCloseButton={false}
        onClose={() => {
          setVisiblePopupComfirm(false);
        }}
        style={{ borderRadius: 10 }}
      >
        <div
          style={{
            padding: "5px 0 10px 0",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            className=""
            style={{
              fontSize: mobileMode ? 18 : 20,
              fontWeight: 700,
              textAlign: "center",
              color: "rgb(82, 182, 91)",
            }}
          >
            Đơn hàng sẽ được gửi đi trong
          </span>
          <span
            className=""
            style={{
              fontSize: mobileMode ? 18 : 20,
              fontWeight: 700,
              textAlign: "center",
              color: "rgb(82, 182, 91)",
            }}
          >
            {visiblePopupComfirm ? (
              <CountDown
                callbackOrder={() => {
                  hanldeOrder();
                  setVisiblePopupComfirm(false);
                }}
              />
            ) : (
              ""
            )}{" "}
            giây...
          </span>
        </div>
        <div style={{ padding: "5px 0" }}>
          <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>
            Địa chỉ giao hàng:
          </span>
          <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}>
            {" "}
            Building {userInfo.building?.label} Vinhomes Grand Park
          </span>
        </div>
        <div style={{ padding: "5px 0" }}>
          <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>
            Thời gian giao hàng dự kiến:{" "}
          </span>
          <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400 }}>
            {
              mode === "1" ? hanldeGetTime() : hour.label
              // + ", " + deliveryDateCart
            }
          </span>
        </div>
        <div style={{ padding: "5px 0", display: "flex", gap: 5 }}>
          <span style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 600 }}>
            Tổng tiền đơn hàng:
          </span>
          <span
            className="center_flex"
            style={{ fontSize: mobileMode ? 14 : 17, fontWeight: 400, gap: 3 }}
          >
            {" " +
              (
                totalPrice +
                shipCost +
                (service === "1" ? 10000 : 0)
              ).toLocaleString()}
            <span style={{ fontSize: "15px" }}>{"₫"}</span>
          </span>
        </div>
        <div
          className="f_flex rodal-delet-cart"
          style={{
            width: " 100%",
            justifyContent: "space-between",
            paddingTop: 20,
            gap: 15,
          }}
        >
          <button
            style={{
              flex: 1,
              padding: 14,
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: 700,
              borderRadius: 10,
              background: "rgb(220,220,220)",
            }}
            onClick={(e) => {
              e.preventDefault();
              setVisiblePopupComfirm(false);
            }}
          >
            Quay lại
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              hanldeOrder();
              setVisiblePopupComfirm(false);
            }}
            style={{
              flex: 1,
              padding: 14,
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: 700,
              borderRadius: 10,
              background: "var(--primary)",
              color: "#fff",
            }}
          >
            Đồng ý
          </button>
        </div>
      </Rodal>
      <Loading isLoading={isLoadingOrder} opacity={0.7} />
      <Loading isLoading={isLoadingWhite} opacity={1} />
      <div id="cart-main" className="" style={{}}>
        <div className="cart-main" style={{}}>
          <section className="cart-items" style={{}}>
            <div className="">
              <div style={{ margin: "15px 15px 5px 15px" }}>
                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>
                  Giao đến
                </span>
              </div>
              <div className="checkout-content">
                <div className="checkout-content-item">
                  <h2>
                    {userInfo.building?.label || ""}
                    {", " + userInfo.area?.label} Vinhomes GP
                  </h2>
                </div>
                <div className="checkout-content-item">
                  <span>Được giao từ</span>
                  <span style={{ fontWeight: 600 }}>{storeName}</span>
                </div>
                {mode === "3" ? (
                  <div className="checkout-content-item">
                    <span>Ngày giao hàng</span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#4db856",
                        textTransform: "uppercase",
                      }}
                    >
                      {deliveryDateCart}
                    </span>
                  </div>
                ) : (
                  <div className="checkout-content-item">
                    <span>Hình thúc giao hàng</span>
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#4db856",
                        textTransform: "uppercase",
                      }}
                    >
                      {modeType}
                    </span>
                  </div>
                )}
                <div className="checkout-content-item">
                  <span>
                    {mode === "1"
                      ? "Thời gian giao dự kiến"
                      : "Khung giờ giao hàng"}
                  </span>
                  {mode === "1" ? (
                    <span>{hanldeGetTime()}</span>
                  ) : (
                    <div style={{ width: "200px", paddingTop: 5 }}>
                      <Select
                        options={optionTime.length > 0 ? optionTime : []}
                        placeholder={`${
                          optionTime.length > 0
                            ? "Chọn khung giờ"
                            : "Không có khung giờ phù hợp"
                        } `}
                        onChange={(e) => {
                          setHour(e);
                        }}
                        isSearchable={false}
                        value={hour}
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            width: optionTime.length > 0 ? 200 : 280,
                          }),
                          menuList: (styles) => ({
                            ...styles,
                          }),
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="c_flex" style={{ margin: "15px 15px 5px 15px" }}>
                <span style={{ color: "rgba(0,0,0,.4)", fontWeight: 700 }}>
                  Thông tin người nhận
                </span>
                <span
                  onClick={() => {
                    setVisiblePopupInfo(true);
                    setFullName(userInfo.fullName || "");
                    setPhone(userInfo.phone || "");
                    // setBuilding(userInfo.building || "");
                    setIsValidBuilding(false);
                    setIsValidFullname(false);
                    setIsValidPhone(false);
                  }}
                  style={{
                    color: "#1890ff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: 15,
                  }}
                >
                  Thay đổi
                </span>
              </div>
              <div
                className="checkout-content"
                onClick={() => {
                  setVisiblePopupNote(true);
                  // setFullName(userInfo.fullName || "");
                  // setPhone(userInfo.phone || "");
                  // setBuilding(userInfo.building || "");
                  // setIsValidBuilding(false);
                  // setIsValidFullname(false);
                  // setIsValidPhone(false);
                }}
              >
                <div
                  className="f_flex checkout-content-icon-wrapper"
                  style={{ alignItems: "center", gap: 15 }}
                >
                  <div className="checkout-content-icon">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  <div className="checkout-content-item">
                    <span>Tên người nhận</span>
                    <h4>{userInfo.fullName}</h4>
                  </div>
                </div>
                <div
                  className="f_flex checkout-content-icon-wrapper"
                  style={{ alignItems: "center", gap: 15 }}
                >
                  <div className="checkout-content-icon">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div className="checkout-content-item">
                    <span>Số điện thoại nhận hàng</span>
                    <h4>{userInfo.phone}</h4>
                  </div>
                </div>
                <div
                  className="f_flex checkout-content-icon-wrapper"
                  style={{ alignItems: "center", gap: 15 }}
                >
                  <div className="checkout-content-icon">
                    <i className="fa-regular fa-clipboard"></i>
                  </div>
                  <div className="checkout-content-item">
                    <span>Lưu ý đặc biệt</span>
                    <h4>
                      {userInfo.note?.length > 0 ? userInfo.note : "Không có"}
                    </h4>
                  </div>
                </div>
              </div>
              <div style={{ margin: "15px 15px 5px 15px" }}>
                <span
                  style={{
                    color: "rgba(0,0,0,.4)",
                    fontWeight: 700,
                    fontSize: mobileMode ? 14 : 16,
                  }}
                >
                  Tóm tắt đơn hàng
                </span>
              </div>
              <div className="checkout-content">
                {[...CartList].map((item, index) => (
                  <div className="checkout-product-cart" key={index}>
                    <div className="c_flex" style={{ gap: 10 }}>
                      <div className="checkout-product-image">
                        <img
                          src={item.image || IMAGE_NOTFOUND}
                          alt=""
                          style={{ borderRadius: "0.5rem" }}
                        />
                      </div>
                      <div
                        className="center_flex checkout-product-quantity-count"
                        onClick={() => {
                          setVisiblePopupQuantity(true);

                          setProductRodalQuantity(item.quantityCart);
                          setProductRodal(item);
                        }}
                      >
                        <span>{item.quantityCart}x</span>
                      </div>
                      <div className="checkout-product-info">
                        <div className="checkout-product-name">{item.name}</div>
                        {mode === "3" && (
                          <p
                            className="cusor"
                            style={{
                              fontSize: 13,
                              color: "rgb(102, 102, 102)",
                              fontWeight: 500,
                            }}
                          >
                            {item.packDes}
                          </p>
                        )}
                        <div className="checkout-product-quantity">
                          <div
                            className="cartControl "
                            onClick={() => {
                              setVisiblePopupQuantity(true);
                              setProductRodal(item);
                              setProductRodalQuantity(item.quantityCart);
                            }}
                          >
                            <p className="cusor">Chỉnh sửa</p>

                            {/* <button className="desCart" onClick={() => decreaseQty(item.id)}>
                                                    <i className="fa-solid fa-minus"></i>
                                                </button>
                                                <span>{item.quantityCart}</span>
                                                <button className="incCart" onClick={() => increaseQty(item.id)}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </button> */}
                          </div>
                          {/* <div>-</div>
                                        <div>1</div>
                                        <div>+</div> */}
                        </div>
                      </div>
                    </div>
                    <div className="checkout-product-price">
                      <span
                        style={{
                          display: "flex",
                          gap: 3,
                          fontSize: mobileMode ? 14 : 16,
                        }}
                      >
                        {item.pricePerPack.toLocaleString()}
                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                          ₫
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
                {mode === "1" && (
                  <div
                    className="c_flex"
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      background: "rgb(245,245,245)",
                      padding: "10px 10px 10px 10px",
                      borderRadius: 3,
                      gap: 15,
                      opacity: service === "2" ? 0.6 : 1,
                      transition: "0.3s all",
                      display: "none",
                    }}
                  >
                    <label
                      for="service"
                      className="c_flex cusor"
                      style={{ gap: 5 }}
                    >
                      <div style={{ marginRight: 10 }}>
                        <input
                          checked={false}
                          type="checkbox"
                          className="myinput"
                          id="service"
                          name="service"
                          value={service}
                          // checked={service === 1}
                        />
                      </div>

                      <div
                        className=""
                        style={{
                          width: mobileMode ? 35 : 45,
                        }}
                      >
                        <img
                          src={
                            "https://cdn-icons-png.flaticon.com/512/2844/2844235.png"
                          }
                          alt=""
                          style={{ borderRadius: "0.5rem" }}
                        />
                      </div>

                      <div className="checkout-product-info" style={{}}>
                        <div
                          className="checkout-product-name"
                          style={{ fontWeight: 600 }}
                        >
                          {"Hỏa tốc"}
                        </div>
                        <p
                          className="cusor"
                          style={{
                            color: "rgb(120,120,120)",
                            fontSize: mobileMode ? 12 : 14,
                            fontWeight: 500,
                            paddingTop: mobileMode ? 2 : 5,
                          }}
                        >
                          {
                            "Đơn hàng của bạn đang được ưu tiên để tài xế giao sớm nhất."
                          }
                        </p>
                      </div>
                    </label>
                    <div className="checkout-product-price">
                      <span
                        style={{
                          display: "flex",
                          gap: 3,
                          fontSize: mobileMode ? 14 : 16,
                        }}
                      >
                        {(10000).toLocaleString()}
                        <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                          ₫
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div className="c_flex">
                  <span style={{ fontSize: mobileMode ? 14 : 16 }}>
                    Tiền hàng
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      display: "flex",
                      gap: 3,
                      fontSize: mobileMode ? 14 : 16,
                    }}
                  >
                    {CartList.length > 0 ? totalPrice.toLocaleString() : 0}
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      ₫
                    </span>
                  </span>
                </div>
                <div className="c_flex">
                  <span style={{ fontSize: mobileMode ? 14 : 16 }}>
                    Phí giao hàng
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      display: "flex",
                      fontSize: mobileMode ? 14 : 16,
                      gap: 3,
                    }}
                  >
                    {shipCost?.toLocaleString()}
                    <span style={{ fontSize: 15, fontWeight: 600 }}>₫</span>
                  </span>
                </div>
                {/* <div className="c_flex">
                  <span style={{ fontSize: mobileMode ? 14 : 16 }}>
                    Phí dịch vụ hỏa tốc
                  </span>
                  <span
                    style={{
                      fontWeight: 600,
                      display: "flex",
                      fontSize: mobileMode ? 14 : 16,
                      gap: 3,
                    }}
                  >
                    {service === "1" ? "10.000" : 0}
                    <span style={{ fontSize: 15, fontWeight: 600 }}>₫</span>
                  </span>
                </div> */}
              </div>
            </div>
          </section>
          <section className="header-white container cart-footer" style={{}}>
            <div
              className="container checkout-container"
              style={{ padding: "", display: "flex", flexDirection: "column" }}
            >
              <div className=" " style={{}}>
                <div className="f_flex" style={{ flexDirection: "row" }}>
                  <div
                    className="checkout-text-payment"
                    style={{ padding: 0 }}
                    onClick={() => {
                      setVisiblePopupPayment(true);
                    }}
                  >
                    {paymentType === 0 ? (
                      <>
                        <img src="/images/money.png" alt="" />
                        <span>{"Tiền mặt"}</span>
                      </>
                    ) : (
                      <>
                        <img
                          src="/images/vnpay.png"
                          alt=""
                          style={{ width: 25 }}
                        />
                        <span>{"VN PAY"}</span>
                      </>
                    )}
                    <i className="fa-solid fa-angle-right"></i>
                  </div>
                </div>
                <div
                  className="c_flex"
                  style={{ flexDirection: "row", gap: 2, width: "100%" }}
                >
                  <div
                    className="f_flex"
                    style={{ flexDirection: "column", gap: 2 }}
                  >
                    <div className="checkout-text" style={{ padding: 0 }}>
                      <span style={{ fontSize: mobileMode ? 15 : 18 }}>
                        Tổng cộng:
                      </span>
                    </div>
                    {mode !== "1" && !hour && (
                      <div
                        className="checkout-text-require"
                        style={{ padding: 0 }}
                      >
                        <span>Chưa chọn khung giờ giao hàng</span>
                      </div>
                    )}
                  </div>
                  <div className="checkout-text-price">
                    <span
                      style={{ display: "flex", gap: 3, alignItems: "center" }}
                    >
                      {(
                        totalPrice +
                        shipCost +
                        (service === "1" ? 10000 : 0)
                      ).toLocaleString()}
                      <span style={{ fontSize: "1rem", fontWeight: 700 }}>
                        ₫
                      </span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const Mode = JSON.parse(
                      localStorage.getItem(LOCALSTORAGE_MODE)
                    );
                    setVisiblePopupComfirm(true);
                  }}
                  type="button"
                  disabled={isLoadingOrder || (mode !== "1" && !hour)}
                  style={{
                    textAlign: "center",
                    width: "100%",
                    height: mobileMode ? 45 : 50,
                    borderRadius: "0.5rem",
                    alignItems: "center",
                    background:
                      isLoadingOrder || (mode !== "1" && !hour)
                        ? "#f5f5f5"
                        : "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                    color: mode !== "1" && !hour ? "rgb(150,150,150)" : "#fff",
                  }}
                  className="center_flex checkout-btn"
                >
                  <span
                    style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}
                  >
                    {"Đặt hàng"}
                  </span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Cart;
