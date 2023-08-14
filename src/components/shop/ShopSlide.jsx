import React, { useContext, useEffect, useRef, useState } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { ShopCart } from "./ShopCart";

export const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
};

export const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );
};
export const ShopSlide = ({
  filtter,
  label,
  data,
  cateId,
  isLoading,
  reLoad,
}) => {
  const { setMode } = useContext(AppContext);

  const [slideShow, setslideShow] = useState(1);
  const itemsRef = useRef([]);
  useEffect(() => {
    // son
    setMode("1");

    if (data.length > 5) {
      setslideShow(5);
    } else {
      setslideShow(1);
    }

    return () => {};
  }, [data, slideShow]);

  return (
    <>
      <section
        className="shop product-slide"
        style={{ padding: "0px 0px 0px 0px" }}
      >
        <div className="container d_flex">
          <div className="contentWidth" style={{ marginLeft: 0 }}>
            <div style={{}}>
              <div
                className="f_flex"
                style={{
                  padding: "15px 15px 15px 15px",
                  alignItems: "center",
                  gap: 10,
                  background: "rgb(246, 249, 252)",
                }}
              >
                <h3 style={{ color: "rgb(100, 100, 100)", fontSize: 16 }}>
                  {label}
                </h3>
                <div
                  className="heading-right  "
                  style={{
                    display: label ? "block" : "none",
                    color: "rgb(100, 100, 100)",
                  }}
                  onClick={() => {}}
                ></div>
              </div>
              <div
                className="shop-slide"
                style={{ padding: "15px 15px 15px 15px" }}
              >
                <ScrollContainer
                  className="schedule-category"
                  horizontal={true}
                  style={{
                    width: "100%",
                    gridTemplateColumns: "repeat(9, 1fr)",
                    display: "grid",
                    gridGap: 10,
                    overflow: "auto",
                  }}
                >
                  {data.map((value, index) => {
                    if (index < 8) {
                      return (
                        <ShopCart
                          ref={(el) => (itemsRef.current[index] = el)}
                          index={index}
                          product={value}
                          key={index}
                        />
                      );
                    }
                  })}
                  {slideShow > 3 && (
                    <div className="view-all-btn" style={{}}>
                      <div
                        className="center_flex "
                        style={{
                          flexDirection: "column",
                          height: 150,
                          width: 70,
                        }}
                      >
                        <div
                          className="center_flex cusor view-all-btn"
                          onClick={() => {
                            // history.push(`/mode/${mode}/${filtter}/${cateId}`);
                            alert("123123DF");
                          }}
                          style={{
                            borderRadius: 50,
                            border: "1px solid rgb(220,220,220)",
                            width: 45,
                            height: 45,
                          }}
                        >
                          <i
                            className="fa-solid fa-chevron-right"
                            style={{ fontSize: 18 }}
                          ></i>
                        </div>
                        <span
                          style={{ fontSize: 14, paddingTop: 5 }}
                          onClick={() => {
                            // history.push(`/mode/${mode}/${filtter}/${cateId}`);
                            alert("123123DF");
                          }}
                          className="cusor"
                        >
                          Xem thêm
                        </span>
                      </div>
                    </div>
                  )}
                </ScrollContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
