import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useHistory, useLocation } from "react-router-dom";
import { getListSearchByKey, getMenuByMode } from "../apis/apiService";
import Loading from "../common/Loading/Loading";
import ShopList from "../components/shop/ShopList";
import { hanldeSaveSearchHistory } from "../constants/Caculator";
import { LOCALSTORAGE_HiSTORY_SEARCH } from "../constants/Variable";
import { AppContext } from "../context/AppProvider";

export const SearchPage = () => {
    const { setHeaderInfo, keySearch, mobileMode, isSearchSubmit, setIsSearchSubmit, menuIdProvider, mode, setKeySearch, setMenuIdProvider } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(false);
    const [listAll, setListAll] = useState(null);
    const [listSearch, setListSearch] = useState(null);
    const [tabActive, setTabActive] = useState(0);
    const [searchHistory, setSearchHistory] = useState([]);
    let history = useHistory();
    let location = useLocation();

    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        document.getElementById("main").style.overflow = "hidden";
        getMenuByMode(modeId)
            .then((res) => {
                const menu = res.data;
                setMenuIdProvider(menu.id);
            })
            .catch((error) => {
                console.log(error);
            });

        // if (menuIdProvider === "0") {
        //     history.push(`/mode/${modeId}`);
        // }
        setHeaderInfo({ isSearchHeader: true, title: "" });
        return () => {
            // setHeaderInfo({});
        };
    }, [setHeaderInfo]);

    useEffect(() => {
        let modeId = location.pathname.trim().split("/")[2];
        const param = new URL(window.location.href).searchParams.get("keyword");
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_HiSTORY_SEARCH))) {
            localStorage.setItem(LOCALSTORAGE_HiSTORY_SEARCH, JSON.stringify({ mode_1: [], mode_2: [], mode_3: [] }));
        }
        const historySearch = JSON.parse(localStorage.getItem(LOCALSTORAGE_HiSTORY_SEARCH));
        switch (modeId) {
            case "1":
                setSearchHistory(historySearch.mode_1);
                break;
            case "2":
                setSearchHistory(historySearch.mode_2);
                break;
            case "3":
                setSearchHistory(historySearch.mode_3);
                break;

            default:
                break;
        }
        if (param !== null && param !== "") {
            console.log("search: " + param);
            setIsLoadingCircle(true);
            setKeySearch(param);
            getListSearchByKey(param, menuIdProvider, 1, 100)
                .then((res) => {
                    if (res.data) {
                        const data = res.data;
                        setListAll(data);
                        document.getElementById("main").style.overflow = "auto";
                        setListSearch(tabActive === 0 ? data.store : data.product);
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    } else {
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setListAll([]);
                    setListSearch([]);
                    setIsLoadingCircle(false);
                    setIsSearchSubmit(false);
                });
        } else {
            console.log("else");
            if (isSearchSubmit && keySearch !== "") {
                setIsLoadingCircle(true);
                getListSearchByKey(keySearch, menuIdProvider, 1, 100)
                    .then((res) => {
                        if (res.data) {
                            const data = res.data;
                            setListAll(data);
                            document.getElementById("main").style.overflow = "auto";
                            setListSearch(tabActive === 0 ? data.store : data.product);
                            setIsLoadingCircle(false);
                            setIsSearchSubmit(false);
                        } else {
                            setIsLoadingCircle(false);
                            setIsSearchSubmit(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setListAll([]);
                        setListSearch([]);
                        setIsLoadingCircle(false);
                        setIsSearchSubmit(false);
                    });
            } else if (isSearchSubmit && keySearch === "") {
                setIsSearchSubmit(false);
                setListAll(null);
                setListSearch(null);
            }
        }

        return () => {};
    }, [isSearchSubmit, menuIdProvider, setIsSearchSubmit]);

    return (
        <div>
            <Loading isLoading={isLoadingCircle} />
            <div className={`loading-spin ${!isLoadingCircle && "loading-spin-done"}`}></div>

            {listAll !== null ? (
                <>
                    <div style={{ background: "rgb(246, 249, 252)", width: "100%", paddingTop: mobileMode ? 115 : 130, paddingBottom: 15, paddingLeft: 15, display: "flex", gap: 15 }}>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 0 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(0);
                                setIsLoadingSkeleton(true);
                                setTimeout(() => {
                                    setIsLoadingSkeleton(false);

                                    setListSearch(listAll.store);
                                }, 300);
                            }}
                        >
                            <span>Nhà hàng</span>
                        </div>
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "10px",
                                border: "1px solid rgb(204, 204, 204)",
                                width: mobileMode ? 120 : 130,
                                height: 40,
                                color: "rgb(128, 128, 128)",
                                fontSize: mobileMode ? 14 : 16,
                            }}
                            className={`center_flex cusor ${tabActive === 1 ? "active-search" : ""}`}
                            onClick={() => {
                                setTabActive(1);
                                setIsLoadingSkeleton(true);
                                setTimeout(() => {
                                    setIsLoadingSkeleton(false);
                                    setListSearch(listAll.product);
                                }, 300);
                            }}
                        >
                            <span>Món ăn</span>
                        </div>
                    </div>
                    {listSearch !== null && listSearch.length === 0 && !isLoadingSkeleton && (
                        <div className="not-found-search container" style={{ height: mobileMode ? "calc(100% - 250px)" : "calc(90% - 185px)" }}>
                            <div className="center_flex" style={{ flexDirection: "column", gap: 20 }}>
                                <img src="https://cdn-icons-png.flaticon.com/512/954/954591.png" alt="" />
                                <span style={{ fontSize: 18, fontWeight: "lighter" }}>Không tìm thấy kết quả nào</span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                searchHistory.length > 0 && (
                    <div style={{ paddingTop: mobileMode ? 115 : 130, paddingLeft: 15 }}>
                        <span style={{ fontWeight: 600 }}>Lịch sử tìm kiếm</span>
                        <div style={{ display: "flex", flexWrap: "wrap", paddingTop: 15 }}>
                            {searchHistory.map((item) => {
                                return (
                                    <div
                                        onClick={() => {
                                            setKeySearch(item);
                                            setIsSearchSubmit(true);
                                            let modeId = location.pathname.trim().split("/")[2];
                                            history.replace(`/mode/${modeId}/search?keyword=${item}`);
                                            hanldeSaveSearchHistory(modeId, item);
                                        }}
                                        style={{
                                            cursor: "pointer",
                                            fontSize: 15,
                                            padding: "8px 14px",
                                            background: "rgb(245,245,245)",
                                            color: "rgb(100,100,100)",
                                            borderRadius: 20,
                                            marginRight: 10,
                                            marginBottom: 10,
                                        }}
                                    >
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )
            )}

            {!isLoadingSkeleton && <ShopList data={listSearch !== null && listSearch} tabActive={tabActive} />}
            {/* <div className={`loading-spin ${!isLoadingSkeleton && "loading-spin-done"}`} style={{ top: mobileMode ? 170 : 190 }}></div> */}
            <div
                className={`${!isLoadingSkeleton && "loading-spin-done"}`}
                style={{
                    position: "absolute",
                    top: mobileMode ? 160 : 180,
                    right: 0,
                    left: 0,
                    background: "#fff",
                    zIndex: 99,
                    // opacity: isLoadingSkeleton ? 1 : 0,
                    // transition: "0.3s all",
                }}
            >
                {[1, 2, 3, 4, 5, 6].map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={{
                                transition: "0.5s all",
                                margin: "0 15px",
                                padding: "15px 0",
                                display: "flex",
                                gap: 15,
                                justifyContent: "space-between",
                                borderBottom: "1px solid #f0f0f0",
                            }}
                        >
                            <div style={{ display: "flex", gap: 15 }}>
                                <Skeleton height={mobileMode ? 80 : 100} width={mobileMode ? 80 : 100} borderRadius={8} />
                                <div style={{ display: "flex", gap: 5, flexDirection: "column", paddingTop: 5 }}>
                                    <Skeleton height={19} width={150} borderRadius={5} />
                                    <Skeleton height={18} width={70} borderRadius={5} />
                                    <Skeleton height={18} width={130} borderRadius={5} />
                                </div>
                            </div>
                            {/* <Skeleton height={22} width={100} borderRadius={5} /> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
