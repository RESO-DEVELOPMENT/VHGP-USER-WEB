import React, { useContext } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { useHistory } from "react-router-dom";
import { IMAGE_NOTFOUND, LOCALSTORAGE_MODE } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";

const DurationList = ({ data }) => {
    const { mobileMode, setMenuIdProvider, setDeliveryDate, mode } = useContext(AppContext);
    let history = useHistory();
    return (
        data.length > 0 &&
        data.map((item, ind) => {
            if (item.listStores?.length > 0) {
                return (
                    <>
                        <div key={ind} style={{ width: "100%", padding: "25px 15px 10px 15px", background: "rgb(246, 249, 252)" }} className="c_flex">
                            <div
                                className="center_flex duration-title"
                                onClick={() => {
                                    localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify("3"));
                                    setMenuIdProvider(item.id);
                                    setDeliveryDate(item.name);
                                    history.push(`/mode/${"3"}/schedule`, { day: item.id, menuName: item.name });
                                }}
                            >
                                <span className="duration-title">{item.name}</span>
                                <i className="fa-solid fa-chevron-right " style={{ fontSize: 14, marginTop: 2, marginLeft: 15 }}></i>
                            </div>
                            {mobileMode && (
                                <div
                                    onClick={() => {
                                        localStorage.setItem(LOCALSTORAGE_MODE, JSON.stringify("3"));
                                        setMenuIdProvider(item.id);
                                        setDeliveryDate(item.name);
                                        history.push(`/mode/${"3"}/schedule`, { day: item.id });
                                    }}
                                >
                                    <span className="view-all-btn" style={{ fontSize: 15, fontWeight: 500, color: "rgb(150,150,150)" }}>
                                        Xem thêm
                                    </span>
                                </div>
                            )}
                        </div>

                        <div style={{ backgroundColor: "#fff" }} className="duration-grid">
                            <div className="shop-slide" style={{}}>
                                <ScrollContainer
                                    className="schedule-category"
                                    horizontal={true}
                                    style={{ width: "100%", gridTemplateColumns: "repeat(9, 1fr)", display: "grid", gridGap: 10, overflow: "auto" }}
                                >
                                    {item.listStores.map((shop, index) => {
                                        if (index < 8) {
                                            return (
                                                <div className="box" key={index} style={{ width: mobileMode ? 120 : 135 }}>
                                                    <div className="product mtop" style={{ margin: 0, padding: "0", boxShadow: "none" }}>
                                                        {/* <Link to="/food-detail"> */}
                                                        <div
                                                            className="img shop-item-image"
                                                            onClick={() => {
                                                                setMenuIdProvider(item.id);
                                                                history.push(`/mode/${mode}/store/${shop.id}`);
                                                                setDeliveryDate(item.name);
                                                            }}
                                                        >
                                                            <img
                                                                src={shop.image || IMAGE_NOTFOUND}
                                                                alt=""
                                                                style={{
                                                                    height: "100%",
                                                                    width: "100%",
                                                                    borderRadius: "0.5rem",
                                                                    objectFit: "cover",
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="product-details" style={{ lineHeight: "1.4em", marginTop: 8 }}>
                                                            <h3
                                                                style={{ fontSize: 14, cursor: "pointer", fontWeight: 700, lineHeight: 1.5 }}
                                                                onClick={() => {
                                                                    history.push(`/mode/${mode}/store/${shop.id}`);
                                                                    setDeliveryDate(item.name);
                                                                }}
                                                            >
                                                                {shop.name}
                                                            </h3>
                                                            <h3 style={{ fontSize: 12, cursor: "pointer", fontWeight: 400, lineHeight: 1.5 }} onClick={() => {}}>
                                                                {shop.building}
                                                            </h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}

                                    {item.listStores.length > 5 && (
                                        <div className="view-all-btn" style={{}}>
                                            <div className="center_flex " style={{ flexDirection: "column", height: 150, width: 70 }}>
                                                <div
                                                    className="center_flex cusor view-all-btn"
                                                    onClick={() => {
                                                        // history.push(`/mode/${mode}/${filtter}/${cateId}`);
                                                    }}
                                                    style={{ borderRadius: 50, border: "1px solid rgb(220,220,220)", width: 45, height: 45 }}
                                                >
                                                    <i className="fa-solid fa-chevron-right" style={{ fontSize: 18 }}></i>
                                                </div>
                                                <span
                                                    style={{ fontSize: 14, paddingTop: 5 }}
                                                    onClick={() => {
                                                        // history.push(`/mode/${mode}/${filtter}/${cateId}`);
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
                    </>
                );
            }
        })
    );
};

export default DurationList;
