import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./components/wrapper/ScrollToTop ";
import AppProvider from "./context/AppProvider";
import 'rodal/lib/rodal.css';
import 'react-loading-skeleton/dist/skeleton.css'
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ScrollToTop>
                <AppProvider>
                    <App />
                </AppProvider>
            </ScrollToTop>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
