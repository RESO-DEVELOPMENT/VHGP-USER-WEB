import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import Rodal from "rodal";
import Select from "react-dropdown-select";
import {
  LOCALSTORAGE_USER_ID,
  LOCALSTORAGE_USER_LOGIN,
  LOCALSTORAGE_USER_NAME,
} from "../../constants/Variable";
export const DrawerContent = () => {
  const {
    isLogin,
    setIsLogin,
    setIsOpenDrawer,
    isOpenDrawer,
    userInfo,
    orderDrawer,
    setIsOpenLogin,
    setIsOpenSignup,
  } = React.useContext(AppContext);
  let history = useHistory();

  return (
    <>
      <div className="drawer__wrapper">
        <div
          className="drawer__wrapper__item"
          style={{ justifyContent: "start", gap: 10 }}
        >
          <img
            src="/images/account.png"
            alt=""
            style={{ width: 44, height: 44, borderRadius: 50 }}
          />
          <div className="f_flex" style={{ flexDirection: "column", gap: 5 }}>
            <span>{userInfo.fullName ? userInfo.fullName : ""}</span>
            <span>{userInfo.phone ? "+" + userInfo.phone : ""}</span>
          </div>
        </div>
        {isLogin === true ? (
          <Link
            to={"/"}
            onClick={() => {
              setIsOpenDrawer(false);
              setIsLogin(false);
              localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
              localStorage.setItem(
                LOCALSTORAGE_USER_LOGIN,
                JSON.stringify(false)
              );
              localStorage.setItem(LOCALSTORAGE_USER_ID, JSON.stringify([]));
              window.location.reload();
            }}
          >
            <div
              className="drawer__wrapper__item"
              style={{ justifyContent: "start", gap: 10 }}
            >
              <div
                className="center_flex"
                style={{
                  background: "#66bb6a",
                  color: "#fff",
                  width: 27,
                  height: 27,
                  borderRadius: 50,
                }}
              >
                <i
                  style={{ fontSize: 13, marginLeft: 2 }}
                  class="fa-solid fa-right-to-bracket"
                ></i>
              </div>
              <h4>Đăng xuất</h4>
            </div>
          </Link>
        ) : (
          <>
            <Link
              to={"/"}
              onClick={() => {
                setIsOpenDrawer(false);
                setIsOpenLogin(true);
              }}
            >
              <div
                className="drawer__wrapper__item"
                style={{ justifyContent: "start", gap: 10 }}
              >
                <div
                  className="center_flex"
                  style={{
                    background: "#66bb6a",
                    color: "#fff",
                    width: 27,
                    height: 27,
                    borderRadius: 50,
                  }}
                >
                  <i
                    style={{ fontSize: 13, marginLeft: 2 }}
                    class="fa-solid fa-user"
                  ></i>
                </div>
                <h4>Đăng nhập</h4>
              </div>
            </Link>
            <Link
              to={"/"}
              onClick={() => {
                setIsOpenDrawer(false);
                setIsOpenSignup(true);
              }}
            >
              <div
                className="drawer__wrapper__item"
                style={{ justifyContent: "start", gap: 10 }}
              >
                <div
                  className="center_flex"
                  style={{
                    background: "#66bb6a",
                    color: "#fff",
                    width: 27,
                    height: 27,
                    borderRadius: 50,
                  }}
                >
                  <i
                    class="fa-solid fa-user-plus"
                    style={{ fontSize: 13, marginLeft: 2 }}
                  ></i>
                </div>
                <h4>Đăng ký</h4>
              </div>
            </Link>
          </>
        )}
        <Link to={"/"} onClick={() => setIsOpenDrawer(false)}>
          <div
            className="drawer__wrapper__item"
            style={{ justifyContent: "start", gap: 10 }}
          >
            <div
              className="center_flex"
              style={{
                background: "#66bb6a",
                color: "#fff",
                width: 27,
                height: 27,
                borderRadius: 50,
              }}
            >
              <i
                style={{ fontSize: 13, marginLeft: 2 }}
                className="fa-solid fa-list-ul"
              ></i>
            </div>
            <h4>Thực đơn</h4>
          </div>
        </Link>
        <Link to={"/order"} onClick={() => setIsOpenDrawer(false)}>
          <div
            className="drawer__wrapper__item"
            style={{ justifyContent: "start", gap: 10 }}
          >
            <div
              className="center_flex"
              style={{
                background: "#66bb6a",
                color: "#fff",
                width: 27,
                height: 27,
                borderRadius: 50,
              }}
            >
              <img
                src="/images/order.svg"
                alt=""
                style={{ width: 27, height: 27, borderRadius: 50 }}
              />
            </div>
            <h4>Theo dõi đơn hàng</h4>
          </div>
        </Link>

        {orderDrawer.length > 0 && (
          <>
            <div style={{ padding: "20px 10px 10px 10px" }}>
              <span style={{ fontWeight: 700 }}>
                Bạn có{" "}
                <span style={{ color: "var(--primary)" }}>
                  {orderDrawer?.length || "0"}
                </span>{" "}
                đơn hàng{" "}
              </span>
            </div>
            {orderDrawer.map((item, index) => {
              return (
                <div
                  className="box cusor"
                  key={index}
                  style={{ width: "100%", padding: "0px 5px 7px 5px" }}
                  onClick={() => {
                    history.push(`/order/${item.id}`);
                    setIsOpenDrawer(false);
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
                          {item.total?.toLocaleString()}
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
          </>
        )}
      </div>
    </>
  );
};
