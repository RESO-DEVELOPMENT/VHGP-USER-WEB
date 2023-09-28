import moment from "moment/moment";
import "moment/locale/vi";
import React, { useContext, useEffect, useState } from "react";
import BallTriangle from "react-loading-icons/dist/esm/components/ball-triangle";
import { useHistory, useLocation, Link } from "react-router-dom";
import { getOrderDetail,postFeedback } from "../apis/apiService";
import { AppContext } from "../context/AppProvider";
import Lottie from "react-lottie";
import animation from "../../src/assets/loading-circle.json";
import Rodal from "rodal";
const OrderLookupPage = () => {
  const {
    setHeaderInfo,
    mobileMode,
    setIsHeaderOrder,
    setisCartMain1,
    setisCartMain2,
    setisCartMain3,
    orderDrawer,
    isOpenFeedback,
    setIsOpenFeedback,
  } = useContext(AppContext);
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [isCancelOrder, setIsCancelOrder] = useState(true);
  const [isCancelButtonOrder, setIsCancelButtonOrder] = useState(true);
  const [visiblePopupCancel, setVisiblePopupCancel] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [statusCanCelName, setStatusCanCelName] = useState("");
  const [productOrder, setproductOrder] = useState([]);
  const [torerender, setTorerender] = useState(1);
  let history = useHistory();
  const statusMain = [
    {
      statusName: "Đặt hàng thành công",
      time: "---",
      id: 1,
      active: true,
    },
    {
      statusName: "Đang xử lý",
      time: "---",
      id: 2,
      active: false,
    },
    {
      statusName: "Tài xế nhận đơn",
      time: "---",
      id: 3,
      active: false,
    },
    {
      statusName: "Lấy hàng thành công",
      time: "---",
      id: 4,
      active: false,
    },
    {
      statusName: "Đang giao",
      time: "---",
      id: 5,
      active: false,
    },
    {
      statusName: "Hoàn thành",
      time: "---",
      id: 6,
      active: false,
    },
  ];
  const [statusOrderUser, setStatusOrderUser] = useState(statusMain);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const feedback = {
    description: comment,
    rating: rating
  }


  const submitFeedback = () => {
    postFeedback(orderId,feedback)
          .then((res) => {
            setIsOpenFeedback(false)
          })
          .catch((res) => {
            console.log(res);
          });
  };

  let location = useLocation();
  useEffect(() => {
    setisCartMain1(false);
    setisCartMain2(false);
    setisCartMain3(false);

    setHeaderInfo({ isSearchHeader: false, title: "Đơn hàng của bạn" });

    return () => {};
  }, []);

  useEffect(() => {
    let doc = document.getElementById("main");
    let orderIdUrl = location.pathname.split("/")[2];

    // if (location.state) {
    //     let { orderId } = location.state;
    //     setOrderId(orderId);
    //     handleSubmit(orderId);
    // } else
    if (orderIdUrl) {
      console.log(orderIdUrl);
      setOrderId(orderIdUrl);
      handleSubmit(orderIdUrl);
    }
    console.log("load");
    doc.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // setHeaderInfo({ isSearchHeader: false, title: "Chi tiết đơn hàng" });
  }, [location.pathname]);
  const handleSubmit = (id) => {
    setisCartMain1(false);
    setisCartMain2(false);
    setisCartMain3(false);
    setOrderInfo(null);
    setIsLoadingCircle(true);
    getOrderDetail(id)
      .then((res) => {
        if (res.data) {
          const order = res.data;
          setOrderInfo(order);
          setproductOrder(order.listProInMenu || []);
          if (order.listStatusOrder) {
            handleSetStatusList(order.listStatusOrder, statusMain);
            getStatusCancel(order.listStatusOrder);
            setStatusCanCelName(getStatusCancelName(order.listStatusOrder));
          }
          setIsLoadingCircle(false);
          setNotFound(false);

          history.replace(`/order/${order.id}`);
        } else {
          setNotFound(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setNotFound(true);
        setIsLoadingCircle(false);
        setOrderInfo({});
      });
  };
  const getTimeOrder = (time) => {
    moment.locale("vi");
    let result = moment(time).format("LT");
    return result;
  };
  const getFullTimeOrder = (timeOrder) => {
    moment.locale("vi");
    let date = moment(timeOrder).format("l");
    let time = moment(timeOrder).format("LT");
    return time + ", " + date;
  };
  const getDateOrder = (time) => {
    moment.locale("vi");
    let result = moment(time).format("l");
    return result;
  };
  const handleSetStatusList = (listStatus, statusMain) => {
    let newStatus = statusMain;
    listStatus.map((item, index) => {
      if (item.status === 0) {
        newStatus[0].active = true;
        newStatus[0].time = getTimeOrder(item.time);
      }
      if (item.status === 1 || item.status === 2) {
        newStatus[1].active = true;
        newStatus[1].time = getTimeOrder(item.time);
      }
      if (item.status === 3) {
        setIsCancelButtonOrder(false);
        newStatus[2].active = true;
        newStatus[2].time = getTimeOrder(item.time);
      }
      if (item.status === 4 || item.status === 7 || item.status === 8) {
        console.log("479");
        setIsCancelButtonOrder(false);
        newStatus[3].active = true;
        newStatus[3].time = getTimeOrder(item.time);
      }
      if (item.status === 9) {
        console.log("9");
        setIsCancelButtonOrder(false);
        newStatus[4].active = true;
        newStatus[4].time = getTimeOrder(item.time);
      }
      if (item.status === 5) {
        newStatus[5].active = true;
        newStatus[5].time = getTimeOrder(item.time);
      }
      if (
        item.status !== 6 ||
        item.status !== 10 ||
        item.status !== 11 ||
        item.status !== 12 ||
        item.status !== 13
      ) {
        setIsCancelOrder(false);
      }
    });
    setStatusOrderUser(newStatus);
  };
  const getStatusCancel = (statusList) => {
    for (let index = 0; index < statusList.length; index++) {
      const element = statusList[index];
      if (
        element.status === 6 ||
        element.status === 10 ||
        element.status === 11 ||
        element.status === 12 ||
        element.status === 13
      ) {
        setIsCancelOrder(true);
        return;
      }
    }
  };
  const getStatusCancelName = (statusList) => {
    for (let index = 0; index < statusList.length; index++) {
      const element = statusList[index];
      switch (element.status) {
        case 6:
          return "Đã Hủy";

        case 10:
          return "Hủy Đơn Do Hết Thời Gian";

        case 11:
          return "Cửa Hàng Hủy Đơn";
        case 12:
          return "Tài Xế Hủy Đơn";
        case 13:
          return "Khách Hàng Hủy Đơn";

        default:
      }
    }
  };

  const getDurationByMode = (duration, modeId, timeCreated) => {
    if (duration) {
      if (modeId === "1") {
        let timeStart = moment(timeCreated).add(20, "minutes").format("LT");
        let timeEnd = moment(timeCreated).add(30, "minutes").format("LT");
        return timeStart + " - " + timeEnd;
      } else if (modeId === "2") {
        let time = moment(timeCreated).format("l");
        return duration.fromHour + " - " + duration.toHour + ", " + time;
      } else if (modeId === "3") {
        return (
          duration.fromHour +
          " - " +
          duration.toHour +
          ", " +
          moment(duration.dayfilter).format("l")
        );
      }
    } else {
      return "---";
    }
  };

  const getStatusOrderTitle = (
    statusList,
    statusName,
    statusPayment,
    orderDuration,
    modeId,
    timeCreated
  ) => {
    let result = "";
    for (let index = 0; index < statusList.length; index++) {
      const element = statusList[index];
      if (
        element.status === 6 ||
        element.status === 10 ||
        element.status === 11 ||
        element.status === 12 ||
        element.status === 13
      ) {
        let statusDescription = "---";
        if (element.status === 6 || element.status === 10) {
          statusDescription = (
            <span style={{ color: "rgba(233, 69, 96, 1)" }}>
              Đơn hàng đã được hủy vào lúc{" "}
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(233, 69, 96, 1)",
                }}
              >
                {getFullTimeOrder(element.time)}
              </span>
            </span>
          );
        } else if (element.status === 11) {
          statusDescription = (
            <span style={{ color: "rgba(233, 69, 96, 1)" }}>
              Đơn hàng đã được nhà hàng hủy vào lúc{" "}
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(233, 69, 96, 1)",
                }}
              >
                {getFullTimeOrder(element.time)}
              </span>
            </span>
          );
        } else if (element.status === 12) {
          statusDescription = (
            <span style={{ color: "rgba(233, 69, 96, 1)" }}>
              Đơn hàng đã được tài xế hủy vào lúc{" "}
              <span
                style={{
                  textDecoration: "underline",
                  fontSize: 15,
                  fontWeight: 500,
                  color: "rgba(233, 69, 96, 1)",
                }}
              >
                {getFullTimeOrder(element.time)}
              </span>
            </span>
          );
        } else if (element.status === 13) {
          if (statusPayment === 0 || statusPayment === 1) {
            statusDescription = (
              <span>
                Đơn hàng đã được hủy vào lúc{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(233, 69, 96, 1)",
                  }}
                >
                  {getFullTimeOrder(element.time)}
                </span>
              </span>
            );
          } else if (statusPayment === 2) {
            statusDescription = (
              <span style={{ color: "rgba(233, 69, 96, 1)" }}>
                Đơn hàng đã hủy do thanh toán thất bại vào lúc{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(233, 69, 96, 1)",
                  }}
                >
                  {getFullTimeOrder(element.time)}
                </span>
              </span>
            );
          }
        }
        result = (
          <div
            className="f_flex order-detail-adrress"
            style={{
              marginTop: 15,
              gap: 20,
              background: "rgba(233, 69, 96, 0.1)",
              padding: mobileMode ? "15px" : "15px 40px",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/6911/6911990.png"
              alt=""
              style={{ width: 40, height: 40, opacity: 0.8 }}
            ></img>
            <div className="flex-collumn">
              <span style={{ color: "rgba(233, 69, 96, 1)" }}>Đơn đã hủy</span>
              {statusDescription}
            </div>
          </div>
        );
      } else if (
        element.status === 0 ||
        element.status === 1 ||
        element.status === 2 ||
        element.status === 3 ||
        element.status === 4 ||
        element.status === 7 ||
        element.status === 8 ||
        element.status === 9
      ) {
        let statusDescription = "---";
        if (
          (element.status === 0 || element.status === 1) &&
          statusName === 1 &&
          statusPayment === 0
        ) {
          statusDescription = (
            <>
              <span style={{ color: "rgba(255, 170, 76, 1)" }}>
                Chờ thanh toán
              </span>
              <span style={{ color: "rgba(255, 170, 76, 1)" }}>
                Đơn hàng của bạn chưa thanh toán. Vui lòng thanh toán đơn hàng.{" "}
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "rgba(255, 170, 76, 1)",
                  }}
                  onClick={() => {
                    window.location.href = `https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/ByOrderId/payment?orderId=${orderId}`;
                  }}
                >
                  Thanh toán ngay
                </span>
              </span>
            </>
          );
        } else {
          statusDescription = (
            <>
              <span style={{ color: "rgba(255, 170, 76, 1)" }}>
                Đang giao hàng
              </span>
              <span style={{ color: "rgba(255, 170, 76, 1)" }}>
                Đơn hàng sẽ được giao vào{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "rgba(255, 170, 76, 1)",
                  }}
                >
                  {getDurationByMode(orderDuration, modeId, timeCreated)}
                </span>
              </span>
            </>
          );
        }
        result = (
          <div
            className="f_flex order-detail-adrress"
            style={{
              marginTop: 15,
              gap: 20,
              background: "rgba(255, 170, 76, 0.1)",
              padding: mobileMode ? "15px" : "15px 40px",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/754/754854.png"
              alt=""
              style={{ width: 35, height: 35, opacity: 0.7 }}
            ></img>
            <div className="flex-collumn">{statusDescription}</div>
          </div>
        );
      } else if (element.status === 5) {
        result = (
          <div
            className="f_flex order-detail-adrress"
            style={{
              marginTop: 15,
              gap: 20,
              background: "rgba(48, 181, 102, 0.1)",
              padding: mobileMode ? "15px" : "15px 40px",
              alignItems: "center",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3502/3502601.png"
              alt=""
              style={{ width: 40, height: 40, opacity: 0.8 }}
            ></img>

            <div className="flex-collumn" style={{}}>
              <span style={{ color: "rgba(48, 181, 102, 1)" }}>
                Giao hàng thành công
              </span>
              <span style={{ color: "rgba(48, 181, 102, 1)" }}>
                Đơn hàng đã được giao vào lúc{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    fontSize: mobileMode ? 14 : 15,
                    fontWeight: 500,
                    color: "rgba(48, 181, 102, 1)",
                  }}
                >
                  {getFullTimeOrder(element.time)}
                </span>
              </span>
            </div>
          </div>
        );
        break;
      }
    }

    return result;
  };

  const getPaymentStatusName = (paymentStatus) => {
    switch (paymentStatus) {
      case 0:
        return "Chưa thanh toán";
      case 1:
        return "Đã thanh toán";
      case 2:
        return "Thanh toán thất bại";

      default:
        return "---";
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <section
      className="background back-white"
      style={{ paddingTop: 70, paddingBottom: 80 }}
    >
      <Rodal
        height={mobileMode ? 300 : 330}
        width={mobileMode ? 350 : 400}
        visible={visiblePopupCancel}
        showCloseButton={false}
        onClose={() => {
          setVisiblePopupCancel(false);
        }}
        style={{ borderRadius: 10 }}
      >
        <div className="modal-delete-cart">
          <div
            className="modal-delete-cart-img"
            style={{ width: "25%", padding: "20px 0" }}
          >
            <img
              className=""
              src="https://cdn-icons-png.flaticon.com/512/9136/9136133.png"
              alt=""
            />
          </div>
          <div
            style={{ textAlign: "center" }}
            className="modal-delete-cart-title"
          >
            <span style={{}}>Bạn muốn hủy đơn hàng?</span>
          </div>
          <div
            style={{ textAlign: "center" }}
            className="modal-delete-cart-content"
          >
            <span className="" style={{ fontWeight: 400 }}>
              Vui lòng liên hệ qua Hotline{" "}
              <span style={{ fontWeight: 700 }}>+1900 0069</span> để xác nhận
              hủy đơn
            </span>
          </div>
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
              setVisiblePopupCancel(false);
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
            Đồng ý
          </button>
        </div>
      </Rodal>

      <Rodal
        height={370}
        width={mobileMode ? 350 : 400}
        visible={isOpenFeedback}
        showCloseButton={false}
        onClose={() => {
          setIsOpenFeedback(false);
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
              <h2>Đánh giá sản phẩm</h2>
            </div>
          </div>

          <div>
            <p>Chọn đánh giá sao:</p>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: star <= rating ? "orange" : "gray",
                  }}
                >
                  ☆
                </span>
              ))}
            </div>
            <div>
              <p>Nhận xét của bạn:</p>
              <textarea
                rows="4"
                cols="50"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Viết nhận xét của bạn tại đây..."
                style={{ outline: "none" }}
              />
            </div>
          </div>

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
                height: 45,
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsOpenFeedback(false);
              }}
            >
              Đóng
            </button>
            <button
              onClick={(e) => {
                submitFeedback();
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
                height: 45,
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Rodal>

      <div className="center_flex">
        <div className="order-lookup-wrapper">
          <div
            className="c_flex"
            style={{
              alignItems: "center",
              width: "100%",
              gap: 10,
              padding: "0 15px",
            }}
          >
            <input
              placeholder="Nhập mã đơn hàng của bạn cần theo dõi"
              style={{ flex: 1, borderRadius: 5 }}
              value={orderId || ""}
              onChange={(e) => {
                setOrderId(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  setIsCancelButtonOrder(true);
                  handleSubmit(orderId);
                }
              }}
            />
            <button
              onClick={() => {
                setIsCancelButtonOrder(true);
                handleSubmit(orderId);
              }}
              type="button"
              style={{
                textAlign: "center",
                width: mobileMode ? 50 : 180,
                height: mobileMode ? 50 : 50,
                borderRadius: "0.5rem",
                alignItems: "center",
                background:
                  "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                color: "#fff",
                cursor: "pointer",
              }}
              className="center_flex "
            >
              {" "}
              {mobileMode ? (
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ fontSize: 18 }}
                ></i>
              ) : (
                <span
                  style={{ fontWeight: 700, fontSize: mobileMode ? 14 : 16 }}
                >
                  {"Theo dõi đơn hàng"}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      {isLoadingCircle && (
        <div
          className="center_flex"
          style={{ display: "flex", paddingTop: 100 }}
        >
          {/* <BallTriangle stroke="var(--primary)" /> */}
          <Lottie
            options={defaultOptions}
            height={mobileMode ? 220 : 270}
            width={mobileMode ? 220 : 270}
            speed={0.8}
          />
        </div>
      )}
      {notFound && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 15,
            paddingTop: 50,
          }}
        >
          <img
            src="/images/notfound.svg"
            alt=""
            style={{ width: mobileMode ? 80 : 100 }}
          />
          <span style={{ color: "rgb(149, 155, 164)", fontSize: 15 }}>
            Không tìm thấy đơn hàng nào!
          </span>
        </div>
      )}
      {!isLoadingCircle && orderInfo && orderInfo?.id && !notFound && (
        <>
          <div style={{ height: "20px", background: "#f6f9fc" }}></div>
          <div className="center_flex">
            <div className="order-lookup-content">
              <div
                className="container non-radius"
                style={{ borderRadius: 10, padding: 0, background: "#fff" }}
              >
                <div style={{ flexDirection: "column" }} className="f_flex">
                  <div className="" style={{ display: "block" }}>
                    {/* {orderInfoComponent()} */}
                    {getStatusOrderTitle(
                      orderInfo.listStatusOrder,
                      orderInfo.paymentName,
                      orderInfo.paymentStatus,
                      {
                        dayfilter: orderInfo.dayfilter,
                        fromHour: orderInfo.fromHour,
                        toHour: orderInfo.toHour,
                      },
                      orderInfo.modeId,
                      orderInfo.time
                    )}
                    <div
                      className="order-wrapper order-detail-container"
                      style={{ flex: 0.35 }}
                    >
                      {/* <h3 style={{ fontSize: mobileMode ? "1rem" : "1.3rem" }}>Thông tin giao hàng</h3> */}
                      {/* <div className="f_flex order-detail-adrress" style={{ marginTop: 15, gap: 11 }}>
                                                <i style={{ color: "var(--primary)", lineHeight: 2, fontSize: 14 }} className="fa-solid fa-truck"></i>
                                                <div className="flex-collumn">
                                                    <span>Đang giao hàng</span>
                                                    <span>
                                                        Đơn hàng sẽ được giao vào <span style={{ textDecoration: "underline", fontSize: 15, fontWeight: 600 }}>16:30 - 18:00, 08-08-2022 </span>
                                                    </span>
                                                </div>
                                            </div> */}

                      <div
                        className="f_flex order-detail-adrress"
                        style={{ marginTop: 15, gap: 15 }}
                      >
                        <i
                          style={{
                            color: "var(--primary)",
                            lineHeight: 2,
                            fontSize: 12,
                          }}
                          className="fa-solid fa-circle"
                        ></i>
                        <div className="flex-collumn">
                          <span>Mã đơn hàng:</span>
                          <span> {orderInfo.id} </span>
                        </div>
                      </div>
                      <div
                        className="f_flex order-detail-adrress"
                        style={{ marginTop: 15, gap: 11 }}
                      >
                        <i
                          style={{ color: "var(--primary)", lineHeight: 2 }}
                          className="fa-regular fa-clock"
                        ></i>
                        <div className="flex-collumn">
                          <span>Ngày đặt hàng:</span>
                          <span> {getDateOrder(orderInfo?.time)} </span>
                        </div>
                      </div>
                      <div
                        className="f_flex order-detail-adrress"
                        style={{ marginTop: 15 }}
                      >
                        <i
                          style={{ color: "var(--primary)", lineHeight: 2 }}
                          className="fa-solid fa-location-dot"
                        ></i>
                        <div className="flex-collumn">
                          <span>Địa chỉ nhận hàng:</span>
                          <span>Tòa {orderInfo.buildingName} </span>
                        </div>
                      </div>
                    </div>
                    {
                      <div
                        style={{ height: "10px", background: "#f6f9fc" }}
                      ></div>
                    }
                    <div className="order-wrapper" style={{ flex: 0.65 }}>
                      <h3
                        style={{
                          fontSize: mobileMode ? "1rem" : "1.3rem",
                          display: "flex",
                          alignItems: "center",
                          gap: 20,
                        }}
                      >
                        Tiến độ
                        {isCancelOrder && (
                          <div
                            className="center_flex"
                            style={{
                              background: "#e94560",
                              borderRadius: "20px",
                              padding: "7px 18px",
                            }}
                          >
                            <span
                              className="order-store-status"
                              style={{ fontSize: 15 }}
                            >
                              {statusCanCelName}
                            </span>
                          </div>
                        )}
                        {!isCancelOrder &&
                          orderInfo.paymentName === 1 &&
                          orderInfo.paymentStatus === 0 && (
                            <div
                              className="center_flex"
                              style={{
                                background: "#e94560",
                                borderRadius: "20px",
                                padding: "7px 18px",
                              }}
                            >
                              <span
                                className="order-store-status"
                                style={{ fontSize: 15 }}
                              >
                                {"Chưa thanh toán"}
                              </span>
                            </div>
                          )}
                      </h3>
                      <div className="f_flex" style={{ gap: 15 }}>
                        <div
                          className="f_flex"
                          style={{
                            gap: 9,
                            padding: mobileMode
                              ? "26px 10px 10px 10px"
                              : "24px 10px 10px 10px",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              opacity: statusOrderUser[0].active ? 1 : 0.3,
                            }}
                            className="order-icon-dot"
                          >
                            <i
                              className="fa-regular fa-circle-dot"
                              style={{
                                color: "#1cc461",
                                boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)",
                                borderRadius: "50%",
                              }}
                            ></i>
                          </div>
                          <div
                            className="line"
                            style={{
                              opacity: statusOrderUser[1].active ? 1 : 0.3,
                            }}
                          ></div>
                          <div
                            style={{
                              opacity: statusOrderUser[1].active ? 1 : 0.3,
                            }}
                            className="order-icon-dot"
                          >
                            <i
                              className="fa-regular fa-circle-dot"
                              style={{
                                color: "#1cc461",
                                boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)",
                                borderRadius: "50%",
                              }}
                            ></i>
                          </div>
                          <div
                            className="line"
                            style={{
                              opacity: statusOrderUser[2].active ? 1 : 0.3,
                            }}
                          ></div>
                          <div
                            style={{
                              opacity: statusOrderUser[2].active ? 1 : 0.3,
                            }}
                            className="order-icon-dot"
                          >
                            <i
                              className="fa-regular fa-circle-dot"
                              style={{
                                color: "#1cc461",
                                boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)",
                                borderRadius: "50%",
                              }}
                            ></i>
                          </div>
                          <div
                            className="line"
                            style={{
                              opacity: statusOrderUser[3].active ? 1 : 0.3,
                            }}
                          ></div>
                          <div
                            style={{
                              opacity: statusOrderUser[3].active ? 1 : 0.3,
                            }}
                            className="order-icon-dot"
                          >
                            <i
                              className="fa-regular fa-circle-dot"
                              style={{
                                color: "#1cc461",
                                boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)",
                                borderRadius: "50%",
                              }}
                            ></i>
                          </div>
                          <div
                            className="line"
                            style={{
                              opacity: statusOrderUser[4].active ? 1 : 0.3,
                            }}
                          ></div>
                          <div
                            style={{
                              opacity: statusOrderUser[4].active ? 1 : 0.3,
                            }}
                            className="order-icon-dot"
                          >
                            <i
                              className="fa-regular fa-circle-dot"
                              style={{
                                color: "#1cc461",
                                boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)",
                                borderRadius: "50%",
                              }}
                            ></i>
                          </div>
                          <div
                            className="line"
                            style={{
                              opacity: statusOrderUser[5].active ? 1 : 0.3,
                            }}
                          ></div>
                          <div
                            style={{
                              opacity: statusOrderUser[5].active ? 1 : 0.3,
                            }}
                            className="order-icon-dot"
                          >
                            <i
                              className="fa-regular fa-circle-dot"
                              style={{
                                color: "#1cc461",
                                boxShadow: "0 0 0 2px rgb(27 196 97 / 30%)",
                                borderRadius: "50%",
                              }}
                            ></i>
                          </div>
                        </div>
                        <div
                          className="f_flex"
                          style={{
                            gap: 25,
                            padding: "10px 10px",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            className="f_flex status-icon"
                            style={{
                              opacity: statusOrderUser[0].active ? 1 : 0.3,
                            }}
                          >
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/3338/3338721.png"
                              alt=""
                              style={{ width: 38, height: 38 }}
                            />
                            <div
                              className="f_flex"
                              style={{
                                flexDirection: "column",
                                paddingLeft: 4,
                              }}
                            >
                              <span className="status-info-time">
                                {statusOrderUser[0].time}
                              </span>
                              <span className="status-info-name">
                                {statusOrderUser[0].statusName}
                              </span>
                            </div>
                          </div>
                          <div
                            className="f_flex status-icon"
                            style={{
                              opacity: statusOrderUser[1].active ? 1 : 0.3,
                            }}
                          >
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/3338/3338637.png"
                              alt=""
                              style={{ width: 38, height: 38 }}
                            />
                            <div
                              className="f_flex"
                              style={{ flexDirection: "column" }}
                            >
                              <span className="status-info-time">
                                {statusOrderUser[1].time}
                              </span>
                              <span className="status-info-name">
                                {statusOrderUser[1].statusName}
                              </span>
                            </div>
                          </div>
                          <div
                            className="f_flex status-icon"
                            style={{
                              opacity: statusOrderUser[2].active ? 1 : 0.3,
                            }}
                          >
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/3338/3338690.png"
                              alt=""
                              style={{ width: 38, height: 38 }}
                            />
                            <div
                              className="f_flex"
                              style={{ flexDirection: "column" }}
                            >
                              <span className="status-info-time">
                                {statusOrderUser[2].time}
                              </span>
                              <span className="status-info-name">
                                {statusOrderUser[2].statusName}
                              </span>
                            </div>
                          </div>
                          <div
                            className="f_flex status-icon"
                            style={{
                              opacity: statusOrderUser[3].active ? 1 : 0.3,
                            }}
                          >
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/3338/3338686.png"
                              alt=""
                              style={{ width: 38, height: 38 }}
                            />
                            <div
                              className="f_flex"
                              style={{
                                flexDirection: "column",
                                paddingLeft: 4,
                              }}
                            >
                              <span className="status-info-time">
                                {statusOrderUser[3].time}
                              </span>
                              <span className="status-info-name">
                                {statusOrderUser[3].statusName}
                              </span>
                            </div>
                          </div>
                          <div
                            className="f_flex status-icon"
                            style={{
                              opacity: statusOrderUser[4].active ? 1 : 0.3,
                            }}
                          >
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/3338/3338599.png"
                              alt=""
                              style={{ width: 38, height: 38 }}
                            />
                            <div
                              className="f_flex"
                              style={{
                                flexDirection: "column",
                                paddingLeft: 4,
                              }}
                            >
                              <span className="status-info-time">
                                {statusOrderUser[4].time}
                              </span>
                              <span className="status-info-name">
                                {statusOrderUser[4].statusName}
                              </span>
                            </div>
                          </div>
                          <div
                            className="f_flex status-icon"
                            style={{
                              opacity: statusOrderUser[5].active ? 1 : 0.3,
                            }}
                          >
                            <img
                              src="https://cdn-icons-png.flaticon.com/512/3338/3338590.png"
                              alt=""
                              style={{ width: 38, height: 38 }}
                            />
                            <div>
                              <div
                                className="f_flex"
                                style={{
                                  flexDirection: "column",
                                  paddingLeft: 4,
                                }}
                              >
                                <span className="status-info-time">
                                  {statusOrderUser[5].time}
                                </span>
                                <span className="status-info-name">
                                  {statusOrderUser[5].statusName}
                                </span>
                              </div>

                              <Link
                                onClick={() => {
                                  if(statusOrderUser[5].active){
                                    setIsOpenFeedback(true);
                                  }
                                }}
                              >
                                <button
                                  className="feedback"
                                  style={{
                                    padding: "7px 15px",
                                    cursor: "pointer",
                                    background: "#3333",
                                    borderRadius: "5px",                                 
                                  }}
                                >
                                  Đánh giá
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {
                      <div
                        style={{ height: "10px", background: "#f6f9fc" }}
                      ></div>
                    }
                    <div
                      className="order-wrapper"
                      style={{ padding: "", flex: 0.65 }}
                    >
                      <div>
                        <div className="order-store">
                          <span className="order-store-title">
                            {orderInfo.storeName}
                          </span>
                          <div className="f_flex" style={{ gap: 15 }}></div>
                        </div>
                        {productOrder.map((item, index) => {
                          return (
                            <div className="order" key={index} style={{}}>
                              <div className="" style={{}}>
                                <span className="order-text-count">
                                  {item.quantity}x
                                </span>
                              </div>
                              <div
                                style={{ flex: 1, flexDirection: "column" }}
                                className="f_flex"
                              >
                                <span className="order-text-name">
                                  {item.productName}
                                </span>
                                {/* <span className="order-text-cate">Nước Uống</span> */}
                              </div>
                              <div>
                                <span
                                  className="order-text-price"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                  }}
                                >
                                  {item.price?.toLocaleString()}
                                  <span
                                    style={{
                                      fontSize: mobileMode
                                        ? "0.8rem"
                                        : "0.9rem",
                                      fontWeight: 500,
                                    }}
                                  >
                                    ₫
                                  </span>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {
                    <div
                      style={{ height: "10px", background: "#f6f9fc" }}
                    ></div>
                  }
                  <div className="" style={{ display: "block" }}>
                    <div style={{ flex: 0.65, background: "#f6f9fc" }}></div>
                    {/* {mobileMode ? "" : <div style={{ width: "10px", background: "#f6f9fc" }}></div>} */}
                    <div
                      className="order-wrapper order-detail-container"
                      style={{ flex: 0.35 }}
                    >
                      <h3
                        style={{
                          fontSize: mobileMode ? "1rem" : "1.3rem",
                          paddingBottom: 10,
                        }}
                      >
                        Chi tiết thanh toán
                      </h3>

                      {/* <div className="order-detail-total">
                                    <div className="order-detail-total-titlte">
                                        Mã đơn hàng:
                                        <span className="order-detail-total-text" style={{ fontWeight: 400, marginLeft: 10 }}>
                                            {orderInfo.id || "--"}
                                        </span>
                                    </div>
                                </div> */}
                      <div className="order-detail-total">
                        <div className="order-detail-total-titlte">
                          Hình thức thanh toán:
                          <span
                            className="order-detail-total-text center_flex"
                            style={{ fontWeight: 400, marginLeft: 10, gap: 10 }}
                          >
                            <img
                              src={`${
                                orderInfo.paymentName === 0
                                  ? "/images/money.png"
                                  : "/images/vnpay.png"
                              }`}
                              alt=""
                              style={{ width: 30 }}
                            />
                            {orderInfo.paymentName === 0
                              ? "Tiền mặt"
                              : "VN Pay"}
                          </span>
                        </div>
                      </div>
                      {orderInfo.paymentName === 1 && (
                        <div
                          className="order-detail-total"
                          style={{ padding: "5px 0 5px 0" }}
                        >
                          <div className="order-detail-total-titlte">
                            Trạng thái:
                            <span
                              className="order-detail-total-text"
                              style={{ fontWeight: 400, marginLeft: 10 }}
                            >
                              {getPaymentStatusName(orderInfo.paymentStatus)}
                            </span>
                          </div>
                        </div>
                      )}
                      {orderInfo.listShipper.length > 0 &&
                        (orderInfo.listShipper[1] ? (
                          <>
                            <div className="order-detail-total">
                              <div className="order-detail-total-titlte">
                                Người giao hàng:
                                <span
                                  className="order-detail-total-text"
                                  style={{ fontWeight: 400, marginLeft: 10 }}
                                >
                                  {orderInfo.listShipper[1].shipperName || "--"}
                                </span>
                              </div>
                            </div>
                            <div className="order-detail-total">
                              <div className="order-detail-total-titlte">
                                Liên hệ người giao hàng:
                                <span
                                  className="order-detail-total-text"
                                  style={{ fontWeight: 400, marginLeft: 10 }}
                                >
                                  {orderInfo.listShipper[1].phone || "--"}
                                </span>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="order-detail-total">
                              <div className="order-detail-total-titlte">
                                Người lấy hàng:
                                <span
                                  className="order-detail-total-text"
                                  style={{ fontWeight: 400, marginLeft: 10 }}
                                >
                                  {orderInfo.listShipper[0].shipperName || "--"}
                                </span>
                              </div>
                            </div>
                            <div className="order-detail-total">
                              <div className="order-detail-total-titlte">
                                Liên hệ người lấy hàng:
                                <span
                                  className="order-detail-total-text"
                                  style={{ fontWeight: 400, marginLeft: 10 }}
                                >
                                  {orderInfo.listShipper[0].phone || "--"}
                                </span>
                              </div>
                            </div>
                          </>
                        ))}

                      <div className="order-detail-total">
                        <div className="order-detail-total-titlte">
                          Tổng tiền hàng:
                          <span
                            className="order-detail-total-text"
                            style={{
                              fontWeight: 400,
                              marginLeft: 10,
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            {orderInfo.total.toLocaleString() || "--"}
                            <span
                              style={{
                                fontSize: mobileMode ? "0.8rem" : "0.9rem",
                                fontWeight: 500,
                              }}
                            >
                              ₫
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="order-detail-total">
                        <div className="order-detail-total-titlte">
                          Phí vận chuyển:
                          <span
                            className="order-detail-total-text"
                            style={{
                              fontWeight: 400,
                              marginLeft: 10,
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                            }}
                          >
                            {orderInfo.shipCost.toLocaleString()}
                            <span
                              style={{
                                fontSize: mobileMode ? "0.8rem" : "0.9rem",
                                fontWeight: 500,
                              }}
                            >
                              ₫
                            </span>
                          </span>
                        </div>
                      </div>
                      {/* {orderInfo.serviceId === "1" ? (
                        <div
                          className="order-detail-total"
                          style={{ paddingBottom: 15 }}
                        >
                          <div className="order-detail-total-titlte">
                            Phí dịch vụ:
                            <span
                              className="order-detail-total-text"
                              style={{
                                fontWeight: 400,
                                marginLeft: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              {orderInfo.serviceId === "1" ? 10 : 0 || "--"}.000
                              <span
                                style={{
                                  fontSize: mobileMode ? "0.8rem" : "0.9rem",
                                  fontWeight: 500,
                                }}
                              >
                                ₫
                              </span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="order-detail-total"
                          style={{ paddingBottom: 15 }}
                        >
                          <div className="order-detail-total-titlte">
                            Phí dịch vụ:
                            <span
                              className="order-detail-total-text"
                              style={{
                                fontWeight: 400,
                                marginLeft: 10,
                                display: "flex",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              {"0"}
                              <span
                                style={{
                                  fontSize: mobileMode ? "0.8rem" : "0.9rem",
                                  fontWeight: 500,
                                }}
                              >
                                ₫
                              </span>
                            </span>
                          </div>
                        </div>
                      )} */}
                      <div
                        className="order-detail-total"
                        style={{
                          borderTop: "1px solid rgb(230, 230, 230)",
                          paddingTop: 15,
                          paddingBottom: 50,
                        }}
                      >
                        <div className="order-detail-total-titlte">
                          <span
                            style={{
                              fontWeight: 700,
                              color: "#000",
                              fontSize: mobileMode ? "16px" : "18px",
                            }}
                          >
                            Tổng cộng:
                          </span>
                          <span
                            className="order-detail-text-price"
                            style={{
                              fontWeight: 700,
                              marginLeft: 10,
                              color: "#000",
                              fontSize: mobileMode ? "16px" : "18px",
                              display: "flex",
                              gap: 3,
                            }}
                          >
                            {(
                              orderInfo.total + orderInfo.shipCost
                            ).toLocaleString() || "--"}
                            <span
                              style={{
                                fontSize: mobileMode ? "0.9rem" : ".95rem",
                                fontWeight: 700,
                              }}
                            >
                              ₫
                            </span>
                          </span>
                        </div>
                      </div>

                      {orderInfo.paymentName === 1 &&
                        orderInfo.paymentStatus === 0 && (
                          <button
                            onClick={() => {
                              window.location.href = `https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/ByOrderId/payment?orderId=${orderId}`;
                            }}
                            type="button"
                            // disabled={isLoadingOrder || (mode !== "1" && !hour)}
                            style={{
                              textAlign: "center",
                              width: "100%",
                              height: mobileMode ? 45 : 50,
                              borderRadius: "0.5rem",
                              alignItems: "center",
                              background:
                                "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
                              color: "#fff",
                            }}
                            className="center_flex checkout-btn"
                          >
                            <span
                              style={{
                                fontWeight: 700,
                                fontSize: mobileMode ? 15 : 18,
                              }}
                            >
                              {"Thanh toán lại"}
                            </span>
                          </button>
                        )}
                      {orderInfo.paymentStatus === 0 && isCancelButtonOrder && (
                        <button
                          onClick={() => {
                            setVisiblePopupCancel(true);
                          }}
                          type="button"
                          // disabled={isLoadingOrder || (mode !== "1" && !hour)}
                          style={{
                            textAlign: "center",
                            width: "100%",
                            height: mobileMode ? 45 : 50,
                            borderRadius: "0.5rem",
                            alignItems: "center",
                            background: "#fff",
                            border: "1px solid rgb(200, 200, 200)",
                            color: "rgb(80, 80, 80)",
                          }}
                          className="center_flex checkout-btn"
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: mobileMode ? 15 : 18,
                            }}
                          >
                            {"Hủy đơn hàng"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 15,
          marginTop: "20px",
          padding: " 0px 50px",
        }}
      >
        {orderDrawer.map((item, index) => {
          return (
            <div
              className="box cusor"
              key={index}
              style={{ width: "100%", padding: "0px 5px 7px 5px" }}
              onClick={() => {
                history.replace(`/order/${item.id}`);
              }}
            >
              <div className="product mtop" style={{ margin: 5 }}>
                <div
                  className="order-wrapper f_flex"
                  style={{
                    justifyContent: "space-between",
                    padding: "5px",
                    margin: 0,
                  }}
                >
                  <div className="f_flex order-info" style={{ gap: 15 }}>
                    <div
                      className="order-store cusor"
                      style={{ justifyContent: "flex-start" }}
                    >
                      <span
                        className="order-store-title"
                        style={{ fontSize: "15px", paddingBottom: 0 }}
                      >
                        #{item.id}
                      </span>
                      <span
                        className="order-store-time"
                        style={{ fontSize: "14px" }}
                      >
                        {item.storeName}
                      </span>
                    </div>
                  </div>
                  <div
                    className="f_flex order-status-wrapper"
                    style={{ flexDirection: "column", gap: 10, width: 115 }}
                  >
                    <span
                      className="order-store-title"
                      style={{ display: "flex", gap: 3, fontSize: "16px" }}
                    >
                      {(item.total + item.shipCost).toLocaleString()}
                      <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        ₫
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OrderLookupPage;
