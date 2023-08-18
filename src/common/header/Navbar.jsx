import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import Rodal from "rodal";
import { getApartment } from "../../apis/apiService";
import { hanldeSaveSearchHistory } from "../../constants/Caculator";
import { LOCALSTORAGE_USER_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

const Navbar = () => {
  // Toogle Menu
  const {
    userInfo,
    setIsOpenDrawer,
    headerInfo,
    setVisiblePopupInfo,
    visiblePopupInfo,
    setUserInfo,
    mobileMode,
    setKeySearch,
    areaProvider,
    setIsSearchSubmit,
    keySearch,
  } = useContext(AppContext);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [building, setBuilding] = useState("");
  const [area, setArea] = useState("");
  const [apartment, setApartment] = useState("");
  const [apartmentList, setApartmentList] = useState([]);
  const [buldingList, setBuldingList] = useState([]);
  const [isValidFullName, setIsValidFullname] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidBuilding, setIsValidBuilding] = useState(false);
  const [isValidArea, setIsValidArea] = useState(false);
  const [isValidApartment, setIsValidApartment] = useState(false);
  const [isValidPhoneRegex, setIsValidPhoneRegex] = useState(true);
  let history = useHistory();
  let location = useLocation();
  const openDrawer = () => {
    setIsOpenDrawer(true);
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };
  useEffect(() => {
    setFullName(userInfo.fullName || "");
    setPhone(userInfo.phone || "");
    setBuilding(userInfo.building || "");
    setApartment(userInfo.apartment || "");
    setArea(userInfo.area || "");
  }, [userInfo]);

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
      setVisiblePopupInfo(false);
      if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_USER_NAME))) {
        localStorage.setItem(LOCALSTORAGE_USER_NAME, JSON.stringify([]));
        setUserInfo({});
      } else {
        localStorage.setItem(
          LOCALSTORAGE_USER_NAME,
          JSON.stringify({ fullName, phone, building, area, apartment })
        );
        setUserInfo({ fullName, phone, building, area, apartment });
      }
    }
  };
  function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
  }
  const optionsBuilding = buldingList.map((building) => {
    return { value: building.id, label: building.name };
  });
  const optionsApartment = apartmentList.map((building) => {
    return { value: building.id, label: building.name };
  });
  const optionArea = areaProvider.map((area) => {
    return { value: area.id, label: area.name };
  });

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
                height: 45,
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
                height: 45,
              }}
            >
              OK
            </button>
          </div>
        </div>
      </Rodal>
      <section className="header-white container ">
        <div
          className="container header-main"
          style={{
            padding: "10px 15px 10px 15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "self-start",
            flexDirection: "column",
          }}
        >
          <div
            className="c_flex"
            style={{ width: "100%", justifyContent: "space-between" }}
          >
            <div className="c_flex header-white-container">
              <div>
                <i
                  onClick={() => {
                    history.goBack();
                  }}
                  className="fa-solid fa-chevron-left header-white-icon-back"
                ></i>
              </div>
              <div
                className="f_flex cusor"
                style={{ flexDirection: "column", gap: 2 }}
                onClick={() => {
                  headerInfo &&
                    headerInfo.isSearchHeader &&
                    setVisiblePopupInfo(true);
                }}
              >
                {headerInfo && headerInfo.isSearchHeader ? (
                  <>
                    <span style={{ fontSize: 14, marginLeft: 5 }}>
                      Giao đến:
                    </span>
                    <div className="c_flex">
                      <div className="header-white-img">
                        <img src="/images/location.png" alt="" />
                      </div>
                      <h4 className="header-white-building">
                        {userInfo.building
                          ? ` ${userInfo.building.label} `
                          : ``}
                      </h4>
                    </div>
                  </>
                ) : (
                  <div className="header-label" style={{ padding: 10 }}>
                    <h4 style={{ fontSize: 18 }}>{headerInfo.title}</h4>
                  </div>
                )}
              </div>
            </div>
            <div>
              <i
                className="fas fa-bars"
                onClick={() => {
                  openDrawer();
                }}
                style={{ fontSize: 25, color: "#000", flex: 1 }}
              ></i>
            </div>
          </div>
          {headerInfo && headerInfo.isSearchHeader && (
            <div className="search-header f_flex" style={{ width: " 100%" }}>
              <i
                className="fa-solid fa-magnifying-glass cusor"
                onClick={() => {
                  if (keySearch !== "") {
                    let modeId = location.pathname.trim().split("/")[2];
                    history.replace(
                      `/mode/${modeId}/search?keyword=${keySearch}`
                    );
                    setIsSearchSubmit(true);
                    hanldeSaveSearchHistory(modeId, keySearch);
                  }
                }}
              ></i>
              <input
                value={keySearch}
                onChange={(e) => {
                  if (e.target.value === "") {
                    let modeId = location.pathname.trim().split("/")[2];
                    history.replace(`/mode/${modeId}/search`);
                    setIsSearchSubmit(true);
                    document.getElementById("main").style.overflow = "hidden";
                  }
                  setKeySearch(e.target.value);
                }}
                onClick={() => {
                  let modeId = location.pathname.trim().split("/")[2];
                  let search = location.pathname.trim().split("/")[3];
                  if (search !== "search") {
                    history.push(`/mode/${modeId}/search`);
                  }
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter" && keySearch !== "") {
                    event.preventDefault();
                    event.target.blur();
                    let modeId = location.pathname.trim().split("/")[2];
                    history.replace(
                      `/mode/${modeId}/search?keyword=${keySearch}`
                    );
                    setIsSearchSubmit(true);
                    hanldeSaveSearchHistory(modeId, keySearch);
                  }
                }}
                placeholder="Tìm món ăn hoặc nhà hàng"
                type="text"
                style={{
                  width: " 100%",
                  borderRadius: 4,
                  padding: "8px 10px",
                  lineHeight: "1rem",
                  fontSize: "1rem",
                }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Navbar;
