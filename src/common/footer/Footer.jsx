import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import "./style.css";

const Footer = () => {
  const { mobileMode, isHeaderHome } = useContext(AppContext);
  const [isActiveFirst, setIsActiveFirst] = useState(false);
  const [isActiveSecond, setIsActiveSecond] = useState(false);
  const [isActiveThird, setIsActiveThird] = useState(false);
  return (
    <>
      <footer
        className="mobile"
        style={{ display: isHeaderHome ? "block" : "none", paddingBottom: 80 }}
      >
        <div className="background container grid4 back-white">
          <div className="center_flex">
            <div className="footer-logo">
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src="/images/logo_2.png"
                alt=""
              />
            </div>
          </div>
          <div className="box">
            {/* <h1 style={{ color: "var(--primary)" }}>Cộng Đồng Chung Cư</h1> */}
            <p>Tải ứng dụng nhận ngay các ưu đãi chỉ dành riêng cho bạn.</p>
            <div
              className="icon f_flex"
              style={{ justifyContent: "center", gap: 15, padding: 10 }}
            >
              <div className=" centen_flex footer-icon">
                <img src="/images/appstore.png" alt="" />
              </div>
              <div className=" centen_flex footer-icon">
                <img src="/images/chplay.png" alt="" />
              </div>
            </div>
          </div>

          <div
            className="center_flex"
            style={{ gap: 20 }}
            onClick={() => setIsActiveFirst(!isActiveFirst)}
          >
            <h2>Về Chúng Tôi</h2>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          <div
            className={`box  footer-title ${
              isActiveFirst ? "activeFooter" : ""
            }`}
          >
            {/* {!mobileMode && <h2>Về Chúng Tôi</h2>} */}
            <ul>
              <li>Hỏi và đáp</li>
              <li>Giới thiệu</li>
              <li>Liên hệ</li>
              <li>Điều khoản dịch vụ</li>
              <li>Chính sách bảo mật</li>
            </ul>
          </div>

          <div
            className="center_flex"
            style={{ gap: 20 }}
            onClick={() => setIsActiveSecond(!isActiveSecond)}
          >
            <h2>Chăm Sóc Khách Hàng</h2>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          <div
            className={`box ${"footer-title "} ${
              isActiveSecond ? "activeFooter" : ""
            }`}
          >
            <ul>
              {/* {!mobileMode && <h2>Chăm Sóc Khách Hàng</h2>} */}
              <li>Tổng Đài Hỗ Trợ </li>
              <li>Hướng dẫn đặt hàng </li>
              <li>Theo dõi đơn hàng của bạn </li>
              <li>Tra hàng & Hoàn tiền </li>
            </ul>
          </div>

          <div
            className="center_flex"
            style={{ gap: 20 }}
            onClick={() => setIsActiveThird(!isActiveThird)}
          >
            <h2>Liên Hệ Với Chúng Tôi</h2>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          <div
            className={`box ${"footer-title "} ${
              isActiveThird ? "activeFooter" : ""
            }`}
          >
            <ul>
              {/* {!mobileMode && <h2>Liên Hệ Với Chúng Tôi</h2>} */}
              <li>Vinhomes Grand Park Quận 9 – Thành Phố Thủ Đức </li>
              <li>Email: support.help@gmail.com</li>
              <li>Hotline: +1900 0069</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
