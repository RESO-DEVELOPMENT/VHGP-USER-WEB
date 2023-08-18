import React from "react";
import { useContext } from "react";
import Rodal from "rodal";
import { LOCALSTORAGE_USER_NAME } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
export const RodalNote = ({
  visiblePopupNote,
  setVisiblePopupNote,
  setNote,
  note,
  fullName,
  phone,
  building,
  area,
  apartment,
}) => {
  const { mobileMode, isLogin, setUserInfo, userInfo } = useContext(AppContext);
  return (
    <Rodal
      // height={isValidFullName || isValidPhone || isValidBuilding || isValidApartment || isValidArea ? (mobileMode ? 620 : 650) : mobileMode ? 500 : 540}
      height={mobileMode ? 170 : 200}
      // height={mobileMode ? 535 : 575}
      width={mobileMode ? 350 : 400}
      visible={visiblePopupNote}
      onClose={() => {
        setVisiblePopupNote(false);
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
          <div className="rodal-title" style={{ padding: "10px 0 10px 0" }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>
              Lưu ý đặc biệt
            </span>
          </div>
          <div className="rodal-title" style={{ width: " 100%" }}>
            <input
              onChange={(e) => {
                setNote(e.target.value);
              }}
              value={note}
              type="text"
              style={{
                border: "1px solid rgb(200,200,200)",
                width: " 100%",
                borderRadius: 4,
                padding: "10px 10px",
                lineHeight: "1rem",
                fontSize: "1rem",
              }}
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
              setVisiblePopupNote(false);
            }}
          >
            Đóng
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              // handleSubmit();
              setUserInfo({ fullName, phone, building, note, area, apartment });
              localStorage.setItem(
                LOCALSTORAGE_USER_NAME,

                JSON.stringify({
                  fullName,
                  phone,
                  building,
                  area,
                  note,
                  apartment,
                })
              );
              setVisiblePopupNote(false);
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
  );
};
