import { LOCALSTORAGE_HiSTORY_SEARCH } from "./Variable";

export const caculatorSale = (salePercent, price) => {
    return price - (salePercent / 100) * price;
};
export const caculatorVND = (price) => {
    if (price !== null && price !== undefined) {
        var x = price.toLocaleString("it-IT", { style: "currency", currency: "VND" });
        return x.split("VND")[0] ? x.split("VND")[0].trim() : x;
    } else {
        return price;
    }
};

export const hanldeGetTime = () => {
    let date = new Date();
    let hour = date.getHours();
    let resStart = hour + 1200;
    let resEnd = hour + 1800;
    var datesStart = new Date(Date.now() + resStart * 1000);
    var datesEnd = new Date(Date.now() + resEnd * 1000);
    var hoursStart = datesStart.getHours();
    var hoursEnd = datesEnd.getHours();
    var minutesStart = "0" + datesStart.getMinutes();
    var minutesEnd = "0" + datesEnd.getMinutes();
    var formattedStartTime = hoursStart + ":" + minutesStart.substr(-2);
    var formattedEndTime = hoursEnd + ":" + minutesEnd.substr(-2);

    return formattedStartTime + " - " + formattedEndTime;
};

export const validatePhoneNumber = (input_str) => {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
};

export const getHourFromDouble = (number) => {
    if (Number.isInteger(number)) {
        return number;
    } else {
        var decNumber = (number + "").split(".")[1];
        var intNumber = (number + "").split(".")[0];
        intNumber = parseInt(intNumber);
        decNumber = parseInt(decNumber);
        decNumber = decNumber / 60;
        return intNumber + decNumber;
    }
};

export const hanldeSaveSearchHistory = (modeId, keySearch) => {
    let listSearch = [];
    const historySearch = JSON.parse(localStorage.getItem(LOCALSTORAGE_HiSTORY_SEARCH));
    switch (modeId) {
        case "1":
            if (!historySearch.mode_1.includes(keySearch)) {
                if (historySearch.mode_1.length > 9) {
                    historySearch.mode_1.pop();
                }
                listSearch = [keySearch, ...historySearch.mode_1];

                localStorage.setItem(LOCALSTORAGE_HiSTORY_SEARCH, JSON.stringify({ ...historySearch, mode_1: listSearch }));
            }
            break;
        case "2":
            if (!historySearch.mode_2.includes(keySearch)) {
                if (historySearch.mode_2.length > 9) {
                    historySearch.mode_2.pop();
                }
                listSearch = [keySearch, ...historySearch.mode_2];

                localStorage.setItem(LOCALSTORAGE_HiSTORY_SEARCH, JSON.stringify({ ...historySearch, mode_2: listSearch }));
            }
            break;
        case "3":
            if (!historySearch.mode_3.includes(keySearch)) {
                if (historySearch.mode_3.length > 9) {
                    historySearch.mode_3.pop();
                }
                listSearch = [keySearch, ...historySearch.mode_3];
                localStorage.setItem(LOCALSTORAGE_HiSTORY_SEARCH, JSON.stringify({ ...historySearch, mode_3: listSearch }));
            }
            break;
        default:
            break;
    }
};
