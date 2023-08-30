import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import Rodal from "rodal";
import {
  Login,
  SignUp,
  addAddressBuilding,
  deleteAddressBuilding,
  getAccountBuilding,
  getApartment,
  postAccountBuilding,
  setDefaultAddress,
} from "../../apis/apiService";
import {
  LOCALSTORAGE_USER_ID,
  LOCALSTORAGE_USER_LOGIN,
  LOCALSTORAGE_USER_NAME,
} from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

const Head = () => {
  const {
    userInfo,
    setUserInfo,
    setVisiblePopupInfo,
    visiblePopupInfo,
    mobileMode,
    mode,
    setMode,
    setIsOpenDrawer,
    areaProvider,
    isLogin,
    isOpenLogin,
    setIsOpenSignup,
    isOpenSignup,
    setIsOpenLogin,
    setIsLogin,
    isConfirm,
    setIsConfirm,
    contentIsConfirm,
    setContentIsConfirm,
    listAddress,
    setListAddress,
    openSelectAddress,
    setOpenSelectAddress,
  } = useContext(AppContext);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [area, setArea] = useState("");
  const [apartment, setApartment] = useState("");
  const [apartmentList, setApartmentList] = useState([]);
  const [buldingList, setBuldingList] = useState([]);
  // const [user, setUser] = useState({});
  const [isValidFullName, setIsValidFullname] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidPhoneRegex, setIsValidPhoneRegex] = useState(true);
  const [isValidBuilding, setIsValidBuilding] = useState(false);
  const [isValidArea, setIsValidArea] = useState(false);
  const [isValidApartment, setIsValidApartment] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isValidLogin, setIsValidLogin] = useState("0");
  // 0 is oke, 1 is... , 2 is...

  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidSignup, setIsValidSignup] = useState("0");
  const [defaulAddressID, setDefaulAddressID] = useState(-1);
  const [cloneIdDeleteAddress, setCloneIdDeleteAddress] = useState(-1);
  // const [indexDefaultAddress, setIndexDefaultAddress] = useState(-1);
  let cloneIdDefaultAddress;

  let history = useHistory();
  const openDrawer = () => {
    setIsOpenDrawer(true);
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };

  useEffect(() => {
    if (listAddress.length >= 1 && isLogin) {
      const foundDefaultIDaddress = listAddress.findIndex(
        (value) => value.isDefault === 1
      );
      if (foundDefaultIDaddress !== -1) {
        cloneIdDefaultAddress =
          listAddress[foundDefaultIDaddress].accountBuildId;
        setDefaulAddressID(cloneIdDefaultAddress);
      }
    }
  }, [listAddress]);
  useEffect(() => {
    // setUser(userInfo);
    setFullName(userInfo.fullName || "");
    setPhone(userInfo.phone || "");
    setBuilding(userInfo.building || "");
    setApartment(userInfo.apartment || "");
    setArea(userInfo.area || "");
    setMode(0);
  }, [setMode, userInfo]);
  useEffect(() => {
    if (area) {
      getApartment(area.value)
        .then((res) => {
          if (res.data) {
            const apart = res.data;
            setApartmentList(apart.listCluster);

            if (apartment) {
              for (let index = 0; index < apart.listCluster.length; index++) {
                const element = apart.listCluster[index];
                if (element.id === apartment.value) {
                  setBuldingList(element.listBuilding);
                }
              }
            }
          } else {
            setApartmentList([]);
          }
        })
        .catch((error) => {
          console.log(error);
          setApartmentList([]);
        });
    }
  }, [apartment, area]);

  const optionsBuilding = buldingList.map((building) => {
    return { value: building.id, label: building.name };
  });
  const optionsApartment = apartmentList.map((building) => {
    return { value: building.id, label: building.name };
  });
  const optionArea = areaProvider.map((area) => {
    return { value: area.id, label: area.name };
  });

  useEffect(() => {
    if (!visiblePopupInfo) {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {};
  }, [visiblePopupInfo]);
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
      // if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME))) {
      //   localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
      //   setUserInfo({});
      // } else {
      if (isLogin) {
        const bodyaddBuilding = {
          accountId: JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_ID)),
          buildingId: building.value,
          isDefault: 0,
          soDienThoai: phone,
          name: fullName,
        };

        addAddressBuilding(bodyaddBuilding)
          .then((res) => {
            setVisiblePopupInfo(false);
            handleGetAccountBuilding();
            setOpenSelectAddress(true);
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        setVisiblePopupInfo(false);
        localStorage.setItem(
          LOCALSTORAGE_USER_NAME,
          JSON.stringify({
            fullName,
            phone,
            building,
            area,
            apartment,
          })
        );
        setUserInfo({ fullName, phone, building, area, apartment });
        // }
        if (mode === 1 || mode === 2 || mode === 3) {
          history.push(`/mode/${mode}`);
        }
      }
    }
  };
  const handleGetAccountBuilding = () => {
    getAccountBuilding(
      1,
      10,
      JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_ID))
    ).then((resBuilding) => {
      if (resBuilding.status === 200) {
        setListAddress(resBuilding.data);
        setOpenSelectAddress(true);
      }
    });
  };
  const handleAddress = (IDaccountBuilding) => {
    const foundindex = listAddress.findIndex(
      (value) => value.accountBuildId == IDaccountBuilding
    );
    const defaultData = listAddress[foundindex];
    // setFullName(defaultData.name);
    // setPhone(defaultData.soDienThoai);
    // setArea({ value: defaultData.areaId, label: defaultData.areaName });
    // setApartment({
    //   value: defaultData.clusterId,
    //   label: defaultData.clusterName,
    // });
    // setBuilding({
    //   value: defaultData.buildingId,
    //   label: defaultData.buildingName,
    // });
    const user = {
      fullName: defaultData.name,
      phone: defaultData.soDienThoai,
      building: {
        value: defaultData.buildingId,
        label: defaultData.buildingName,
      },
      area: { value: defaultData.areaId, label: defaultData.areaName },
      apartment: {
        value: defaultData.clusterId,
        label: defaultData.clusterName,
      },
    };
    setUserInfo(user);
    localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify(user));

    if (defaultData.accountBuildId !== defaulAddressID) {
      setDefaultAddress(defaultData.accountBuildId).catch((error) => {
        console.log(error);
      });
    }
  };

  const handleLogin = (res) => {
    console.log(res);
    if (res.status === 200 && res.data.roleId === "2") {
      setIsValidLogin("0");
      localStorage.setItem(
        LOCALSTORAGE_USER_LOGIN,
        JSON.stringify(JSON.stringify(true))
      );
      localStorage.setItem(LOCALSTORAGE_USER_ID, JSON.stringify(res.data.id));

      setIsLogin(true);
      setIsOpenLogin(false);

      // get information
      handleGetAccountBuilding();
    } else if (res.status === 200 && res.data.roleId !== "2") {
      setIsValidLogin("2");
      // ko dc phép vào cái trang này rồi....
    } else {
      // Wrong information sign-up
      setIsValidLogin("1");
    }
  };

  function validatePhoneNumber(input_str) {
    const length = input_str.length;

    if ((length > 8) & (length < 12)) return true;
    else return false;
  }
  console.log(defaulAddressID);
  console.log(cloneIdDefaultAddress);
  return (
    <>
      <Rodal
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
        width={mobileMode ? 350 : 400}
        visible={visiblePopupInfo}
        onClose={() => {
          setVisiblePopupInfo(false);
          if (isLogin) {
            setOpenSelectAddress(true);
          }
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
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                {isLogin ? "Thêm địa chỉ mới" : "Nơi nhận"}
              </span>
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
                  // khi set lại Area thì 2 cái sau phải reset lại,.....
                  setArea(e);

                  if (e.label !== area.label) {
                    setApartment("");
                    setBuilding("");
                    setBuldingList([]);
                  }
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
                placeholder="Cụm tòa nhà"
                onChange={(e) => {
                  setApartment(e);

                  if (apartment.label !== e.label) {
                    setBuilding("");
                  }
                  // for (let index = 0; index < apartmentList.length; index++) {
                  //   const element = apartmentList[index];
                  //   if (element.id === e.value) {
                  //     setBuldingList(element.listBuilding);
                  //   }
                  // }
                  const foundIndexApartmentList = apartmentList.findIndex(
                    (element) => {
                      return element.id === e.value;
                    }
                  );
                  setBuldingList(
                    apartmentList[foundIndexApartmentList].listBuilding
                  );
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
                <span>Số điện thoại không hợp lệ</span>
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
                height: 45,
              }}
              onClick={(e) => {
                e.preventDefault();
                setVisiblePopupInfo(false);
                if (isLogin) {
                  setOpenSelectAddress(true);
                }
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
                height: 45,
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Rodal>
      <Rodal
        height={300}
        width={mobileMode ? 350 : 400}
        visible={isOpenLogin}
        onClose={() => {
          setIsOpenLogin(false);
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
              <span style={{ fontSize: 16, fontWeight: 700 }}>Đăng nhập</span>
            </div>
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Tài khoản <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              style={{
                border: "1px solid ",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
            />
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Mật khẩu <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              style={{
                border: "1px solid ",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
            />

            <span style={{ fontSize: "14px", color: "red" }}>
              {isValidLogin === "1" ? "Thông tin đăng nhập không đúng" : ""}
              {isValidLogin === "2"
                ? "Bạn không được phép đăng nhập hệ thống này"
                : ""}
            </span>
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
                setIsOpenLogin(false);
              }}
            >
              Đóng
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                Login(userName, password).then((res) => {
                  handleLogin(res);
                });
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
      <Rodal
        height={465}
        width={mobileMode ? 350 : 400}
        visible={isOpenSignup}
        onClose={() => {
          setIsOpenSignup(false);
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
              <span style={{ fontSize: 16, fontWeight: 700 }}>Đăng ký</span>
            </div>
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Họ và tên đầy đủ{" "}
                <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <input
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              type="text"
              style={{
                border: "1px solid ",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
            />
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Tài khoản <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>

            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              type="text"
              style={{
                border: "1px solid ",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
            />
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Mật khẩu <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              style={{
                border: "1px solid ",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
            />
            <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>
                Xác nhận mật khẩu{" "}
                <span style={{ color: "red", fontSize: 14 }}> *</span>
              </span>
            </div>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              style={{
                border: "1px solid ",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
            />

            <span style={{ fontSize: "14px", color: "red" }}>
              {isValidSignup === "0" ? "Vui lòng nhập đẩy đủ thông tin" : ""}
              {isValidSignup === "1" ? "Mật khẩu xác nhận không khớp" : ""}
            </span>
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
                setIsOpenSignup(false);
              }}
            >
              Đóng
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Login(userName, password).then((res) => {
                //   handleLogin(res);
                // });
                if (
                  fullName == "" ||
                  userName == "" ||
                  confirmPassword == "" ||
                  password == ""
                ) {
                  setIsValidSignup("0");
                } else if (password === confirmPassword) {
                  SignUp(userName, password, fullName, null).then((res) => {
                    setIsOpenSignup(false);
                    setContentIsConfirm(
                      `Bạn đã đăng ký tài khoản ${res.data} thành công`
                    );
                    setIsConfirm(true);
                  });

                  // (username, pass, name, imageUrl)
                } else {
                  setIsValidSignup("1");
                }
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
      <Rodal
        height={500}
        width={mobileMode ? 350 : 400}
        visible={openSelectAddress}
        onClose={() => {
          if (defaulAddressID >= 0) {
            handleAddress(defaulAddressID);
          }
          setOpenSelectAddress(false);
        }}
        style={{ borderRadius: 10 }}
      >
        <div
          style={{
            borderBottom: "1px solid rgb(220,220,220)",
            paddingBottom: "10px",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700 }}>Chọn địa chỉ</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "calc(90% + 20px) ",
            maxHeight: "calc(90% + 20px) ",
          }}
        >
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexDirection: "column",
              flexGrow: "1",
              gap: "15px",
              overflowY: listAddress.length > 5 ? "scroll" : null,
              padding: mobileMode ? "0px 12px 40px" : "0px 20px 50px",
            }}
          >
            {listAddress.map((value) => {
              return (
                <>
                  <label
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "15px",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="radio"
                        name="address"
                        tabIndex={value.accountBuildId}
                        defaultChecked={value.isDefault === 1 ? true : false}
                        onClick={(e) => {
                          // e.preventDefault();
                          cloneIdDefaultAddress = e.target.tabIndex;
                        }}
                      />
                      <div style={{ flexGrow: "1" }}>
                        <p>
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {value.name}
                          </span>
                          <span>| {value.soDienThoai}</span>
                        </p>
                        <p>
                          {value.buildingName}, {value.areaName} Vinhomes GP
                        </p>
                      </div>
                      <button
                        id={value.accountBuildId}
                        style={{
                          background: "none",
                          padding: "4px",
                          cursor: "pointer",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          if (e.target.id != defaulAddressID) {
                            setCloneIdDeleteAddress(e.target.id);
                            setContentIsConfirm(
                              "Bạn có muốn xóa địa chỉ này không ?"
                            );
                          } else {
                            setContentIsConfirm(
                              "Bạn không thể xóa địa chỉ mặc định"
                            );
                          }
                          setIsConfirm(true);
                        }}
                      >
                        <i
                          className="fa-solid fa-x"
                          id={value.accountBuildId}
                        ></i>
                      </button>
                    </div>

                    <button
                      style={{
                        width: "100px",
                        lineHeight: "30px",
                        background: "none",
                        fontSize: "16px",
                        border: "1px solid var(--primary) ",
                        borderRadius: "4px",
                        display: `${value.isDefault === 1 ? "block" : "none"}`,
                      }}
                    >
                      Mặc định
                    </button>
                  </label>
                </>
              );
            })}
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
                background: "black",
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

                setVisiblePopupInfo(true);
                setOpenSelectAddress(false);
              }}
            >
              Thêm địa chỉ mới
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                // set Defaut

                if (cloneIdDefaultAddress >= 0) {
                  handleAddress(cloneIdDefaultAddress);
                } else if (defaulAddressID >= 0) {
                  handleAddress(defaulAddressID);
                }
                setOpenSelectAddress(false);
              }}
              onChange={(e) => {
                e.preventDefault();
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
      <Rodal
        height={200}
        width={mobileMode ? 350 : 400}
        visible={isConfirm}
        onClose={() => {
          setIsConfirm(false);
        }}
        style={{ borderRadius: 10 }}
      >
        <div
          style={{
            borderBottom: "1px solid rgb(220,220,220)",
            paddingBottom: "10px",
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700 }}>Xác nhận</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <p
            style={{ fontSize: "20px", textAlign: "center", marginTop: "8px" }}
          >
            {contentIsConfirm}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
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
                setIsConfirm(false);
              }}
            >
              Đóng
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();

                if (
                  contentIsConfirm === "Bạn có muốn xóa địa chỉ này không ?"
                ) {
                  deleteAddressBuilding(Number(cloneIdDeleteAddress))
                    .then((res) => {
                      if (cloneIdDeleteAddress == defaulAddressID) {
                        setDefaulAddressID(undefined);
                      }
                      handleGetAccountBuilding();
                    })
                    .finally(setIsConfirm(false));
                } else if (contentIsConfirm === "Bạn có muốn đăng xuất ?") {
                  localStorage.clear();
                  setIsLogin(false);
                  setUserInfo([]);
                  history.push("/");
                  setIsConfirm(false);
                } else {
                  setIsConfirm(false);
                }
                // set Defaut
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
      <section
        className="search container"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgb(247, 143, 43) 0%, rgba(255, 175, 76, 1) 100%)",
        }}
      >
        <div
          className="container f_flex "
          style={{ padding: "15px", flexDirection: "column" }}
        >
          <div style={{ padding: "0 0 5px 0", color: "#fff", fontWeight: 600 }}>
            <span>Giao đến:</span>
          </div>
          <div className="c_flex" style={{ gap: 20 }}>
            <div className="search-box f_flex">
              <i
                className="fa-solid fa-location-dot"
                style={{ color: "var(--primary)" }}
              ></i>
              <input
                type="text"
                placeholder="Nhập địa chỉ giao hàng"
                onClick={(e) => {
                  e.preventDefault();
                  isLogin
                    ? // ? handleGetAccountBuilding()
                      setOpenSelectAddress(true)
                    : setVisiblePopupInfo(true);
                  // test
                }}
                disabled={visiblePopupInfo}
                value={
                  userInfo.building
                    ? ` ${userInfo.building.label}  `
                    : "Nhập địa chỉ nhận hàng nhanh"
                }
                readOnly={true}
                style={{
                  borderTopRightRadius: "50%",
                  borderBottomRightRadius: "50%",
                  cursor: "pointer",
                }}
              />
            </div>
            <div>
              <i
                className="fas fa-bars cusor"
                onClick={() => {
                  openDrawer();
                }}
                style={{ fontSize: 25, color: "#fff", flex: 1 }}
              ></i>
            </div>
          </div>
          <div className="header-home-container">
            <div className="heaader-home-img">
              <img src="/images/home-removebg.png" alt="" />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <span style={{ textTransform: "uppercase" }}>VHGP.NET</span>

              <p>Dịch vụ tiện ích giao hàng tận nơi cho cư dân </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
