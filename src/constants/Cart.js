import { LOCALSTORAGE_CART_NAME1, LOCALSTORAGE_CART_NAME2, LOCALSTORAGE_CART_NAME3 } from "./Variable";

export const checkOutOfMenu = (menuIdProvider, mode) => {
    if (mode === "1") {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
        }
        const CartList1 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));

        if (CartList1.length > 0) {
            if (menuIdProvider === CartList1[0].menuId) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    } else if (mode === "2") {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
        }
        const CartList2 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));

        if (CartList2.length > 0) {
            if (menuIdProvider === CartList2[0].menuId) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    } else {
        if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
            localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
        }
        const CartList3 = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));

        if (CartList3.length > 0) {
            if (menuIdProvider === CartList3[0].menuId) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    }
};
export const checkOutOfStore = (product, mode) => {
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME1, JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME2, JSON.stringify([]));
    }
    if (!JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3))) {
        localStorage.setItem(LOCALSTORAGE_CART_NAME3, JSON.stringify([]));
    }
    let CartList = [];
    if (mode === "1") {
        CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME1));
    } else if (mode === "2") {
        CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME2));
    } else {
        CartList = JSON.parse(localStorage.getItem(LOCALSTORAGE_CART_NAME3));
    }

    if (CartList.length > 0) {
        if (CartList[0].storeId === product.storeId) {
            return false;
        } else {
            return true;
        }
    }
    return false;
};
