import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";
import { ProductCart } from "./ProductCart";

export const ProductGrid = ({ filtter, label, data, labelImg, cateId, isLoading, isViewAll }) => {
    const { mode, mobileMode } = useContext(AppContext);

    let history = useHistory();
    return (
        <>
            <section className="shop" style={{ padding: "85px 15px 0px 15px" }}>
                <div className="container d_flex">
                    <div className="contentWidth" style={{ marginLeft: 0 }}>
                        <div style={{ marginBottom: 20 }}>
                            <div className="heading d_flex" style={{ alignItems: "center" }}>
                                <div className="heading-left  center_flex"></div>
                                {isViewAll &&
                                    (isLoading ? (
                                        <Skeleton height={43} width={110} borderRadius={8} style={{ margin: 0 }} />
                                    ) : (
                                        <div className="heading-right  " style={{ display: label ? "block" : "none" }} onClick={() => history.push(`/mode/${mode}/${filtter}/${cateId}`)}>
                                            <span>Xem tất cả</span>
                                            <i className="fa-solid fa-caret-right"></i>
                                        </div>
                                    ))}
                            </div>
                            {data.length > 0 ? (
                                <div className="product-content  grid6">
                                    {data.length > 0 &&
                                        data.map((item, index) => {
                                            if (mobileMode && index > 6) {
                                                return true;
                                            }
                                            return isLoading ? (
                                                <div style={{ margin: 6 }}>
                                                    <Skeleton height={272} key={index} borderRadius={8} style={{ margin: 0 }} />
                                                </div>
                                            ) : (
                                                <ProductCart product={item} key={index} />
                                            );
                                        })}
                                </div>
                            ) : (
                                <section className="shop" style={{ background: "#f6f9fc", padding: "50px 0 40px 0" }}>
                                    <div className="container collumn_flex" style={{ width: "300px" }}>
                                        <section className="shop" style={{ padding: "25px 0 40px 0" }}>
                                            <div className="container center_flex">
                                                <div className="contentWidth  center_flex" style={{ marginLeft: 0, flexDirection: "column", gap: 10 }}>
                                                    <img src="/images/empty-food.png" style={{ width: mobileMode ? 50 : 80, paddingBottom: 10 }} alt="" />
                                                    <span style={{ fontSize: mobileMode ? 16 : 20, fontWeight: 600 }}>Không có sản phẩm nào!</span>
                                                    <span style={{ fontSize: mobileMode ? 14 : 16, fontWeight: "lighter", textAlign: "center", padding: "0 50px" }}>
                                                        Hiện không có sản phẩm nào, Bạn vui lòng quay lại vào lúc khác.
                                                    </span>
                                                </div>
                                            </div>
                                        </section>

                                        <div style={{ textAlign: "center", marginTop: 0, height: 50, borderRadius: "0.5rem", alignItems: "center" }} className="center_flex cusor">
                                            <span
                                                onClick={() => {
                                                    history.goBack();
                                                }}
                                                style={{ fontWeight: 700, fontSize: 16, color: "var(--primary)" }}
                                            >
                                                Quay lại
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>
                        {isViewAll && mobileMode && !isLoading && (
                            <div
                                style={{ textAlign: "center", margin: "0 5px", height: 45, borderRadius: "0.5rem", alignItems: "center", border: "1px solid var(--secondary)" }}
                                className="center_flex "
                                onClick={() => history.push(`/mode/${mode}/${filtter}/${cateId}`)}
                            >
                                <span onClick={() => {}} style={{ fontWeight: 600, fontSize: 15, color: "var(--secondary)" }}>
                                    Xem thêm sản phẩm
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
