import React from "react";
import Slider from "react-slick";
import { SampleNextArrow, SamplePrevArrow } from "../flashDeals/FlashCard";
import Pdata from "./Pdata";

export const RecommendProduct = () => {
    const { shopItems } = Pdata;
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    return (
        <>
            <Slider {...settings}>
                {shopItems.map((productItems) => {
                    return (
                        <div className="box" key={productItems.id}>
                            <div className="product mtop">
                                <div className="img">
                                    <img style={{ width: "100%" }} src={productItems.cover} alt="" />
                                </div>
                                <div className="product-details">
                                    <span style={{ fontSize: 15, color: "#666" }}>{productItems.shop}</span>
                                    <h4>{productItems.name}</h4>
                                    {/* <div className="rate">
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                    </div> */}
                                    <div className="price">
                                        <h4>{productItems.price}.000đ </h4>
                                        <button
                                            onClick={() => {
                                                // addToCart(productItems);
                                                // increment();
                                            }}
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </>
    );
};
