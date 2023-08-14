// import React from "react";
// import { useState } from "react";
// import { useContext } from "react";
// import { useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import { LOCALSTORAGE_USER_LOGIN } from "../constants/Variable";
// import { AppContext } from "../context/AppProvider";

// export const LoginPage = () => {
//     const { setIsHeaderOrder, setHeaderInfo, setisCartMain, setAuth, auth } = useContext(AppContext);
//     const [phone, setPhone] = useState("");
//     let history = useHistory();
//     useEffect(() => {
//         if (auth.isLogin) {
//             history.push("/");
//         }
//     }, [auth.isLogin, history]);
//     useEffect(() => {
//         setIsHeaderOrder(false);
//         setHeaderInfo({ isSearchHeader: false, title: "Đăng nhập" });
//         setisCartMain(false);
//     }, [setIsHeaderOrder, setHeaderInfo, setisCartMain]);

//     const handleLogin = () => {
//         if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_LOGIN))) {
//             localStorage.setItem(LOCALSTORAGE_USER_LOGIN, JSON.stringify([]));
//             // setUserInfo({});
//             // history.push("/");
//         } else {
//             setAuth({ userId: "1", isLogin: true, userPhone: phone });
//             localStorage.setItem(LOCALSTORAGE_USER_LOGIN, JSON.stringify({ userId: "1", isLogin: true, userPhone: phone }));
//         }
//         history.push("/checkout");
//     };
//     return (
//         <section className="background back-white" style={{ paddingTop: 90, height: "100vh" }}>
//             <div className="container login-wrapper" style={{ borderRadius: 10, background: "#fff" }}>
//                 <div className="limiter">
//                     <div className="center_flex" style={{ flexDirection: "column" }}>
//                         <div className="" style={{ padding: "15px 0" }}>
//                             <span className="login-logo">Cộng Đồng Chung Cư </span>
//                         </div>
//                         <div className="" style={{}}>
//                             <span className="login-hello">___ Xin Chào ___</span>
//                         </div>
//                         <div className="f_flex login-text" style={{ flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "30px 0", gap: 5 }}>
//                             <span>Gửi mã xác nhận</span>
//                             <span>Có thể bỏ qua nếu không nhận được OTP</span>
//                             <span>sau vài giây</span>
//                         </div>
//                         <div>
//                             <input
//                                 onChange={(e) => {
//                                     setPhone(e.target.value);
//                                 }}
//                                 type="number"
//                                 value={phone}
//                                 placeholder="Số điện thoại"
//                                 style={{ border: "1px solid rgb(200,200,200)", width: " 300px", borderRadius: 4, padding: "10px 10px", lineHeight: "1rem", fontSize: "1rem", marginBottom: 20 }}
//                             />
//                         </div>
//                         <div>
//                             {phone.length > 8 && phone.length < 12 ? (
//                                 <button
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         handleLogin();
//                                     }}
//                                     style={{
//                                         flex: 1,
//                                         padding: 18,
//                                         width: 180,
//                                         fontSize: "1rem",
//                                         cursor: "pointer",
//                                         fontWeight: 700,
//                                         borderRadius: 10,
//                                         background: "var(--primary)",
//                                         textTransform: "uppercase",
//                                         transition: "0.5s all",
//                                     }}
//                                 >
//                                     Gửi mã OTP
//                                 </button>
//                             ) : (
//                                 <button
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                     }}
//                                     style={{
//                                         flex: 1,
//                                         padding: 18,
//                                         width: 180,
//                                         fontSize: "1rem",
//                                         cursor: "pointer",
//                                         fontWeight: 700,
//                                         borderRadius: 10,
//                                         background: "#f5f5f5",
//                                         color: "rgba(0,0,0,.25)",
//                                         textTransform: "uppercase",
//                                         transition: "0.5s all",
//                                     }}
//                                 >
//                                     Gửi mã OTP
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
