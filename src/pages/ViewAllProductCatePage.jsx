import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
import { getListProductByCateId, getListStoreByCate } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import { ProductList } from "../components/products/ProductList";
import { AppContext } from "../context/AppProvider";
import ShopList from "../components/shop/ShopList";

export const ViewAllProductCatePage = () => {
  const { setHeaderInfo, menuIdProvider, mobileMode, mode, categoriesInMenu } =
    useContext(AppContext);
  const [isLoadingCircle, setIsLoadingCircle] = useState(false);
  const [products, setProducts] = useState(null);
  const [stores, setStores] = useState(null);
  let location = useLocation();
  let history = useHistory();

  const getListStoreByCateId = (menuId, cateId) => {
    console.log("get list store");
    getListStoreByCate(menuId, cateId, 1, 100)
      .then((res) => {
        if (res.data) {
          const storeData = res.data;
          const storeList = storeData || [];
          let { categoryName } = location.state;
          if (categoryName) {
            setStores(storeList);
            setHeaderInfo({ isSearchHeader: false, title: categoryName });
          }
          setIsLoadingCircle(false);
        } else {
          setIsLoadingCircle(false);
          setStores([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setStores([]);
        setIsLoadingCircle(false);
      });
  };

  useEffect(() => {
    let modeId = location.pathname.trim().split("/")[2];
    console.log(modeId);
    if (menuIdProvider === "0") {
      history.push(`/mode/${modeId}`);
      console.log("back");
    } else {
      let cateId = location.pathname.trim().split("/")[4];
      setIsLoadingCircle(true);
      if (mode === "1") {
        getListStoreByCateId(menuIdProvider, cateId);
        // setIsLoadingCircle(false);
      } else if (mode === "2" || mode === "3") {
        getListProductByFilter(menuIdProvider, cateId);
      }
    }
    return () => {
      setIsLoadingCircle(false);
      setHeaderInfo({});
    };
  }, [location.pathname, setHeaderInfo, menuIdProvider]);
  //

  const getListProductByFilter = (menuId, cateId) => {
    console.log("get list product");
    getListProductByCateId(menuId, cateId, 1, 100)
      .then((res) => {
        if (res.data) {
          const category = res.data;
          const productList = category.listProducts || [];
          const title = category.name;
          setProducts(productList);
          setHeaderInfo({ isSearchHeader: false, title: title });
          setIsLoadingCircle(false);
        } else {
          setIsLoadingCircle(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setProducts([]);
        setIsLoadingCircle(false);
      });
  };
  const hanldeReLoad = () => {
    let cateId = location.pathname.trim().split("/")[4];
    getListProductByFilter(menuIdProvider, cateId);
  };
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      width: mobileMode ? 150 : 170,
      borderRadius: "8px",
      padding: "0 5px",
      fontSize: mobileMode ? 14 : 16,
    }),
    menuList: (styles) => ({
      ...styles,
    }),
  };
  const filterStyles = {
    control: (styles) => ({
      ...styles,
      width: mobileMode ? 160 : 170,
      borderRadius: "8px",
      padding: "0 5px",
      fontSize: mobileMode ? 14 : 16,
    }),
    menuList: (styles) => ({
      ...styles,
    }),
  };
  useEffect(() => {
    console.log(isLoadingCircle);
    if (!isLoadingCircle) {
      console.log("on");
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";
    } else {
      console.log("offf");
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => {};
  }, [isLoadingCircle]);

  const optionsBuilding = categoriesInMenu?.map((item) => {
    return { value: item.id, label: item.name };
  });
  const optionsFiltter = [
    { id: 1, name: "Khuyến mãi" },
    { id: 2, name: "Quán mở cửa" },
  ].map((item) => {
    return { value: item.id, label: item.name };
  });
  const sortFiltter = [
    { id: 1, name: "Bán chạy nhất" },
    { id: 2, name: "A - Z" },
    { id: 3, name: "Z - A" },
  ].map((item) => {
    return { value: item.id, label: item.name };
  });
  return (
    <div style={{ background: "rgb(246, 249, 252)", height: "100%" }}>
      <Loading isLoading={isLoadingCircle} />
      <div
        className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}
      ></div>
      <div
        style={{
          padding: "75px 15px 15px 15px",
          gap: 10,
          width: "100%",
          display: "flex",
          overflow: "auto",
        }}
      >
        <div style={{}} className="center_flex cusor filter-select-cate">
          {/* <i className="fa-solid fa-utensils" style={{ fontSize: 14 }}></i> */}
          <Select
            options={optionsFiltter}
            placeholder="Lọc nhanh"
            isSearchable={false}
            onChange={(e) => {}}
            styles={colourStyles}
            menuPosition="fixed"
          />
        </div>
        <div style={{}} className="center_flex cusor filter-select-cate">
          {/* <i className="fa-solid fa-utensils" style={{ fontSize: 14 }}></i> */}
          <Select
            options={sortFiltter}
            placeholder="Sắp xếp theo"
            isSearchable={false}
            onChange={(e) => {}}
            styles={filterStyles}
            menuPosition="fixed"
          />
        </div>
        <div style={{}} className="center_flex cusor filter-select-cate">
          {/* <i className="fa-solid fa-utensils" style={{ fontSize: 14 }}></i> */}
          <Select
            options={categoriesInMenu.length > 0 ? optionsBuilding : null}
            placeholder="Danh mục"
            menuPosition="fixed"
            isSearchable={true}
            onChange={(e) => {
              setIsLoadingCircle(true);
              if (mode === "1") {
                getListStoreByCate(menuIdProvider, e.value, 1, 100)
                  .then((res) => {
                    if (res.data) {
                      const storeData = res.data;
                      const storeList = storeData || [];
                      setStores(storeList);
                      setHeaderInfo({ isSearchHeader: false, title: e.label });
                      setIsLoadingCircle(false);
                    } else {
                      setIsLoadingCircle(false);
                      setStores([]);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    setStores([]);
                    setIsLoadingCircle(false);
                  });
              } else {
                getListProductByCateId(menuIdProvider, e.value, 1, 100)
                  .then((res) => {
                    if (res.data) {
                      const category = res.data;
                      const productList = category.listProducts || [];
                      const title = category.name;
                      setProducts(productList);
                      setHeaderInfo({ isSearchHeader: false, title: title });
                      setIsLoadingCircle(false);
                    } else {
                      setIsLoadingCircle(false);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    setProducts([]);
                    setIsLoadingCircle(false);
                  });
              }
            }}
            styles={colourStyles}
          />
        </div>
      </div>
      <div style={{ background: "#fff", height: "calc(100% - 130px)" }}>
        {mode === "1" && (
          <ShopList
            data={stores !== null ? stores : []}
            isStore={true}
            tabActive={0}
            // filter={1}
            // reLoad={() => {
            //     hanldeReLoad();
            // }}
          />
        )}
        {(mode === "2" || mode === "3") && (
          <ProductList
            data={products !== null ? products : []}
            filter={1}
            packDes={true}
            store={true}
            reLoad={() => {
              hanldeReLoad();
            }}
          />
        )}
        {(stores?.length === 0 || products?.length === 0) && (
          <section className="shop" style={{ padding: "50px 0 40px 0" }}>
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
                <span
                  style={{ fontSize: mobileMode ? 16 : 20, fontWeight: 600 }}
                >
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
                  Hiện không có sản phẩm nào, Bạn vui lòng quay lại vào lúc
                  khác.
                </span>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* {!isLoadingCircle && <ProductGrid data={products || []} label={title || ""} cateId={""} labelImg={img || IMAGE_NOTFOUND} isViewAll={false} />} */}
    </div>
  );
};
