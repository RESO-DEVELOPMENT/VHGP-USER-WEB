import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Slider from "react-slick";
import { banner } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";
import { ShopSlide } from "../components/shop/ShopSlide";
import {
  getListStoreCategory,
  getListStoreInMenuByMode,
  getMenuByMode,
  getMenuByModeGroupBy,
  getMenuMode3,
} from "../apis/apiService";
import {
  ProductSlide,
  SampleNextArrow,
  SamplePrevArrow,
} from "../components/products/ProductSlide";
import Skeleton from "react-loading-skeleton";
import {
  CATE_FITLER,
  IMAGE_NOTFOUND,
  LOCALSTORAGE_CART_NAME1,
  LOCALSTORAGE_CART_NAME2,
  Mdata,
  Mdata2,
  Mdata3,
} from "../constants/Variable";

const HomePage = ({ productItems, shopItems }) => {
  const {
    userInfo,
    setIsHeaderHome,
    setVisiblePopupInfo,
    mobileMode,
    setMode,
    setisCartMain1,
    setisCartMain2,
    setisCartMain3,
    Cart1,
    Cart2,
    Cart3,
    mode,
    setMenuIdProvider,
    setisLoadigFromHome,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [menuCategory, setMenuCategory] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const [listStore, setListStore] = useState([]);
  let history = useHistory();
  const [filtter, setFilter] = useState(CATE_FITLER);
  const settingCaategory = {
    dots: true,
    infinite: false,
    slidesToShow: menuCategory?.length <= 6 ? menuCategory?.length : 6,
    slidesToScroll: menuCategory?.length <= 6 ? menuCategory?.length : 6,
    autoplay: false,
    swipeToSlide: false,
    swipe: false,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
          swipe: true,
          nextArrow: "",
          prevArrow: "",
          rows: 2,
        },
      },
    ],
  };
  const settingBanner = {
    dots: !mobileMode,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };
  const hanldeViewAll = (cateId, categoryName) => {
    if (userInfo.building && userInfo.fullName && userInfo.phone) {
      setMode("2");
      // history.push(`/mode/${mode}/${filtter}/${cateId}`, {
      history.push(`/mode/2/${filtter}/${cateId}`, {
        categoryName: categoryName,
      });
    } else {
      setVisiblePopupInfo(true);
    }
  };

  // cho cate
  const getMenu = (menu, filtter, pageInd, size) => {
    getMenuByModeGroupBy(menu, filtter, pageInd, size)
      .then((res) => {
        if (res.data) {
          const menu = res.data;
          // setMenuIdProvider(menu.id);
          setMenuCategory([
            ...menu.listCategoryStoreInMenus,
            {
              id: "999",
              name: "Xem theem",
              image: "/images/load_more_icon.png",
            },
          ]);
        } else {
          setMenuCategory([]);
        }
        setIsLoadingPage(false);
        setIsLoadingProduct(false);
      })
      .catch((error) => {
        console.log(error);
        setMenuCategory([]);
      });
    getListStoreInMenuByMode(1, 1, 8).then((rs) => {
      if (rs.data) {
        setListStore(rs.data);
      }
    });
    // get menu by mode 2 De lay cai Menuprovider cho mon ngon gan ban

    getMenuByMode(mode).then((rs) => {
      const menu = rs.data;
      setMenuIdProvider(menu.id);
      console.log(menu.id);
    });
  };

  //// cho mon ngon gan ban
  useEffect(() => {
    // son

    getMenu("2", filtter, 1, 7);
    setMode("1");
    //s on
    setisLoadigFromHome(false);
    setIsLoading(true);
    setIsHeaderHome(true);
    setisCartMain1(false);
    setisCartMain2(false);
    setisCartMain3(false);
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => {
      setIsHeaderHome(false);
      if (Cart1?.length > 0) {
        setisCartMain1(true);
      }
      if (Cart2?.length > 0) {
        setisCartMain2(true);
      }
      if (Cart3?.length > 0) {
        setisCartMain3(true);
      }
    };
  }, [
    Cart1,
    Cart2,
    Cart3,
    setIsHeaderHome,
    setisCartMain1,
    setisCartMain2,
    setisCartMain3,
  ]);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: mobileMode ? 1 : 2,
    slidesToScroll: 1,
    autoplay: false,

    appendDots: (dots) => {
      return <ul style={{ margin: "0px" }}>{dots}</ul>;
    },
  };

  return (
    <>
      <div
        className={`loading-spin ${!isLoading && "loading-spin-done"}`}
      ></div>
      <div className="container" style={{ background: "var(--primary)" }}>
        <section
          className="background container back-white home-menu"
          style={{ padding: "30px 15px 50px 15px" }}
        >
          <div
            className="f_flex"
            style={{ gap: 15, width: "100%", flexWrap: "wrap" }}
          >
            <div
              style={{}}
              className="home-menu-item"
              onClick={() => {
                setMode("1");
                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                  setVisiblePopupInfo(false);
                  history.push(`/mode/${1}`, { home: true });
                  setisLoadigFromHome(true);
                } else {
                  setVisiblePopupInfo(true);
                }
              }}
            >
              <div className="home-menu-item-icon">
                <img src="./images/icons/hamburger.png" alt="" />
              </div>
              <span>Gọi món</span>
            </div>
            <div
              style={{}}
              className="home-menu-item"
              onClick={() => {
                setMode("2");

                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                  setVisiblePopupInfo(false);
                  history.push(`/mode/${2}`, { home: true });
                  setisLoadigFromHome(true);
                } else {
                  setVisiblePopupInfo(true);
                }
              }}
            >
              <div className="home-menu-item-icon">
                <img src="./images/icons/groceries.png" alt="" />
              </div>
              <span>Giao hàng</span>
            </div>
            <div
              style={{}}
              className="home-menu-item"
              onClick={() => {
                setMode("3");
                if (userInfo.building && userInfo.fullName && userInfo.phone) {
                  setVisiblePopupInfo(false);
                  history.push(`/mode/${3}`, { home: true });
                  setisLoadigFromHome(true);
                } else {
                  setVisiblePopupInfo(true);
                }
              }}
            >
              <div className="home-menu-item-icon">
                <img src="./images/icons/food-delivery.png" alt="" />
              </div>
              <span>Đặt Hàng</span>
            </div>
          </div>
          <section
            className="TopCate"
            style={{
              width: "100%",
              marginTop: "20px",
              marginBottom: `${mobileMode ? "20px" : "30px"}`,
            }}
          >
            <div className="container">
              <Slider {...settingBanner}>
                {Mdata.map((value, index) => {
                  return (
                    <>
                      <div
                        className="box product"
                        key={index}
                        style={{
                          padding: 0,
                          background: "none",
                          borderRadius: "0.5rem",
                          boxShadow: "none",
                          margin: 0,
                          transition: "1s all",
                        }}
                      >
                        <div
                          className="slide-img"
                          style={{
                            borderRadius: "0.5rem",
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={value.cover}
                            alt=""
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                              borderRadius: "0.5rem",
                            }}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </Slider>
            </div>
          </section>

          {/* <section className="TopCate  " style={{ width: "100%" }}>
                        <div className="container" style={{ padding: 0 }}>
                            <Slider {...settings}>
                                {banner.map((value, index) => {
                                    return (
                                        <>
                                            <div
                                                className=""
                                                key={index}
                                                style={{
                                                    padding: mobileMode ? "30px 0" : "30px 5px 0 5px",
                                                    background: "none",
                                                    boxShadow: "none",
                                                    margin: 0,
                                                    borderRadius: "0.5rem",
                                                    transition: "1s all",
                                                    WebkitTransition: "1s all",
                                                }}
                                            >
                                                <div className="slide-img" style={{ borderRadius: 5, height: 200 }}>
                                                    <img src={value.cover} alt="" style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "0.5rem" }} />
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                            </Slider>
                        </div>
                    </section> */}

          {/* <div className="mt-5" style={{ padding: "20px 20px" }}>
              {isLoadingPage ? (
                <Skeleton
                  borderRadius={5}
                  height={122}
                  style={{ marginBottom: 5 }}
                />
              ) : mode !== "3" && menuCategory && menuCategory?.length > 0 ? (
                <div className="cateogry-menu">
                  <Slider {...settingCaategory}>
                    {menuCategory &&
                      menuCategory.map((cate, index) => {
                        if (index > 6) {
                          if (index === 7) {
                            return (
                              <div key={index} className="cateogry-menu-wrapper ">
                                <div
                                  className="cateogry-menu-img"
                                  // onClick={() => hanldeViewAll(999, "Xem thêm")}
                                >
                                  <img
                                    src={
                                      "/images/load_more_icon.png" ||
                                      "https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg"
                                    }
                                    alt=""
                                  />
                                </div>
                                <span className="cateogry-menu-text">
                                  Xem thêm
                                </span>
                              </div>
                            );
                          }
                        } else
                          return (
                            <div key={index} className="cateogry-menu-wrapper ">
                              <div
                                className="cateogry-menu-img"
                                onClick={() => {
                                  hanldeViewAll(cate.id, cate.name);
                                }}
                              >
                                <img
                                  src={
                                    cate.image ||
                                    "https://thumbs.dreamstime.com/b/vietnamese-pho-soup-illustration-97217112.jpg"
                                  }
                                  alt=""
                                />
                              </div>
                              <span className="cateogry-menu-text">
                                {cate.name}
                              </span>
                            </div>
                          );
                      })}
                  </Slider>
                </div>
              ) : (
                ""
              )}
            </div> */}

          {/* // mon ngon gan ban  */}
          <div
            className="preview_store_mode_2"
            style={{ marginTop: "20px" }}
            onClick={() => {}}
          >
            {!isLoadingPage &&
            !isLoadingProduct &&
            listStore.length > 0 === true ? (
              <ShopSlide
                key={111}
                filtter={filtter}
                data={[...listStore] || []}
                label="Quán ngon gần bạn"
                cateId="9999"
                reLoad={() => {}}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
