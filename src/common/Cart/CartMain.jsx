import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppProvider";

export const CartMain = () => {
    const { Cart1, Cart2, Cart3, mode } = useContext(AppContext);
    let history = useHistory();
    const render = () => {
        if (mode === "1") {
            return (
                <section className=" container cart-main-wrapper">
                    <div className="container cart-main-container ">
                        <div className="">
                            <div
                                className="cart-main-item"
                                onClick={() => {
                                    history.push(`/mode/${1}/checkout`);
                                }}
                            >
                                <i className="fa-solid fa-cart-shopping" style={{ fontSize: 25, flex: 1 }}></i>
                                <span>{Cart1.length === 0 ? "0" : Cart1.length}</span>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else if (mode === "2") {
            return (
                <section className=" container cart-main-wrapper">
                    <div className="container cart-main-container ">
                        <div className="">
                            <div
                                className="cart-main-item"
                                onClick={() => {
                                    history.push(`/mode/${2}/checkout`);
                                }}
                            >
                                <i className="fa-solid fa-cart-shopping" style={{ fontSize: 25, flex: 1 }}></i>
                                <span>{Cart2.length === 0 ? "0" : Cart2.length}</span>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return (
                <section className=" container cart-main-wrapper">
                    <div className="container cart-main-container ">
                        <div className="">
                            <div
                                className="cart-main-item"
                                onClick={() => {
                                    history.push(`/mode/${3}/checkout`);
                                }}
                            >
                                <i className="fa-solid fa-cart-shopping" style={{ fontSize: 25, flex: 1 }}></i>
                                <span>{Cart3.length === 0 ? "0" : Cart3.length}</span>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    };
    return <>{render()}</>;
};
