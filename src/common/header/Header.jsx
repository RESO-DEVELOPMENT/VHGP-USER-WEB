import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import Head from "./Head";
import "./Header.css";
import Navbar from "./Navbar";

const Header = ({ CartItem }) => {
    const { isHeaderHome } = useContext(AppContext);
    return <>{isHeaderHome ? <Head /> : <Navbar />}</>;
};

export default Header;
