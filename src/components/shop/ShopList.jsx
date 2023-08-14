import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { IMAGE_NOTFOUND } from "../../constants/Variable";
import { AppContext } from "../../context/AppProvider";
import "../products/style.css";
const ShopList = ({ data, tabActive }) => {
    const { mode } = useContext(AppContext);
    let history = useHistory();
    return (
        <div className="product-list-wrapper" style={{}}>
            <div className=" c_flex" style={{ padding: "0px 15px", alignItems: "self-start", flexDirection: "column" }}>
                {data.length > 0 &&
                    data.map((item, index) => {
                        let isBorderBottom = true;
                        if (data.length === 0 || index === data.length - 1) {
                            isBorderBottom = false;
                        }
                        return (
                            <div className="shop-item-wrapper f_flex " key={index} style={{ border: !isBorderBottom && "none" }}>
                                <div
                                    className="shop-item cusor"
                                    onClick={() => {
                                        if (tabActive === 0) {
                                            history.push(`/mode/${mode}/store/${item.id}`);
                                        } else {
                                            history.push(`/mode/${mode}/product/${item.id}`);
                                        }
                                    }}
                                >
                                    <img src={item.image || IMAGE_NOTFOUND} alt="" />
                                </div>
                                <div
                                    className="f_flex cusor"
                                    style={{ flexDirection: "column", gap: 5, flex: 1 }}
                                    onClick={() => {
                                        if (tabActive === 0) {
                                            history.push(`/mode/${mode}/store/${item.id}`);
                                        } else {
                                            history.push(`/mode/${mode}/product/${item.id}`);
                                        }
                                    }}
                                >
                                    <span className="shop-item-title">{item.name}</span>
                                    <span className="shop-item-building">{item.building || item.pricePerPack?.toLocaleString()}</span>
                                    <span className="shop-item-category">{item.storeCategory || item.storeName}</span>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ShopList;
