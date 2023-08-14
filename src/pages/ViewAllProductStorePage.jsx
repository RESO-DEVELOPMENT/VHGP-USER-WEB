import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getListProductByStoreId } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import { AppContext } from "../context/AppProvider";

export const ViewAllProductStorePage = () => {
  const {
    setHeaderInfo,
    menuIdProvider,
    modeType,
    mobileMode,
    mode,
    deliveryDate,
  } = useContext(AppContext);
  const [isLoadingCircle, setIsLoadingCircle] = useState(true);
  const [products, setProducts] = useState(null);
  const [title, setTitle] = useState("");
  const [building, setBuilding] = useState("");
  const [storeDes, setStoreDes] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");

  const [img, setImg] = useState("");
  let location = useLocation();
  let history = useHistory();
  useEffect(() => {
    let modeId = location.pathname.trim().split("/")[2];
    console.log(menuIdProvider);
    if (menuIdProvider === "0") {
      history.push(`/mode/${modeId}`);
    } else {
      console.log(menuIdProvider);
      let storeId = location.pathname.trim().split("/")[4];
      setIsLoadingCircle(true);
      getListProductByStoreId(menuIdProvider, storeId, 1, 100)
        .then((res) => {
          if (res.data) {
            const category = res.data;
            const productList = category.listProducts || [];
            const title = category.name;
            setTitle(title);
            setStoreDes(category.description);
            const image = category.image;
            setImg(image);
            setBuilding(category.location);
            setCloseTime(category.closeTime);
            setOpenTime(category.openTime);
            setProducts(productList);
            setHeaderInfo({
              isSearchHeader: false,
              title: "Chi tiết cửa hàng",
            });
            setIsLoadingCircle(false);
          } else {
            setIsLoadingCircle(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsLoadingCircle(false);
          setProducts([]);
        });
    }

    return () => {
      setIsLoadingCircle(false);
    };
  }, [history, location.pathname, menuIdProvider, setHeaderInfo]);

  useEffect(() => {
    if (!isLoadingCircle) {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    } else {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {};
  }, [isLoadingCircle]);
  return (
    <div>
      <Loading isLoading={isLoadingCircle} />
      <div
        className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}
      ></div>
      <div
        className="store-wrapper"
        style={{ height: storeDes !== null && storeDes !== "" ? 500 : 450 }}
      >
        <div
          className="store-image-background"
          style={{
            backgroundImage: `url(${img})`,
          }}
        >
          <div className="store-name">
            <h3 style={{ paddingBottom: 0 }}> {title}</h3>
            {storeDes !== null && storeDes !== "" ? (
              <span
                className="store-building max-line-2"
                style={{ ppaddingBottom: 5, lineHeight: 1.5 }}
              >
                {storeDes}
              </span>
            ) : (
              ""
            )}

            <span className="store-building" style={{ paddingTop: 5 }}>
              <i
                className="fa-solid fa-location-dot"
                style={{ color: "var(--primary)", paddingRight: 7 }}
              ></i>
              <span>{building}</span>
            </span>
            <span className="store-building" style={{}}>
              <i
                className="fa-regular fa-clock"
                style={{ color: "var(--primary)", paddingRight: 7 }}
              ></i>
              <span>
                Giờ mở cửa: {openTime} | Giờ đóng cửa: {closeTime}
              </span>
            </span>

            <span className="store-building" style={{ color: "green" }}>
              <i
                className="fa-solid fa-clock-rotate-left"
                style={{ color: "green", paddingRight: 7 }}
              ></i>
              <span>
                {mode === "3" ? `Ngày giao hàng: ${deliveryDate}` : modeType}
              </span>
            </span>
          </div>
        </div>
      </div>
      {products?.length > 0 && (
        <ProductList
          data={[...products] || []}
          filter={2}
          packDes={mode !== "1"}
          reLoad={() => {}}
          menuName={deliveryDate}
        />
      )}
      {products?.length === 0 && (
        <section className="shop" style={{ padding: "25px 0 40px 0" }}>
          <div className="container center_flex">
            <div
              className="contentWidth  center_flex"
              style={{ marginLeft: 0, flexDirection: "column", gap: 10 }}
            >
              <img
                src="/images/empty-food.png"
                style={{ width: mobileMode ? 50 : 80, paddingBottom: 10 }}
                alt=""
              />
              <span style={{ fontSize: mobileMode ? 16 : 20, fontWeight: 600 }}>
                Không có sản phẩm nào!
              </span>
              <span
                style={{
                  fontSize: mobileMode ? 14 : 16,
                  fontWeight: "lighter",
                  textAlign: "center",
                  padding: "0 50px",
                }}
              >
                Hiện không có sản phẩm nào, Bạn vui lòng quay lại vào lúc khác.
              </span>
            </div>
          </div>
        </section>
      )}
      {/* {!isLoadingCircle && <ProductGrid data={products || []} label={title || ""} cateId={""} labelImg={img || IMAGE_NOTFOUND} isViewAll={false} />} */}
    </div>
  );
};
