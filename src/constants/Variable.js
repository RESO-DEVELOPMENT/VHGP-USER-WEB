export const LOCALSTORAGE_CART_NAME1 = "Cart1";
export const LOCALSTORAGE_CART_NAME2 = "Cart2";
export const LOCALSTORAGE_CART_NAME3 = "Cart3";
export const LOCALSTORAGE_USER_NAME = "User";
export const LOCALSTORAGE_HiSTORY_SEARCH = "Search";
// export const LOCALSTORAGE_USER_LOGIN = "Auth";
export const LOCALSTORAGE_MODE = "Mode";
export const LOCALSTORAGE_ORDER = "Order";
export const CATE_FITLER = "cate";
export const STORE_FILTER = "store";
export const IMAGE_NOTFOUND = "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Ftopic-2.webp?alt=media&token=54a5086f-f2ea-4009-9479-28624019703e";
export const IMAGE_NOTFOUND_v2 = "https://cdn.dribbble.com/users/1078347/screenshots/2787652/category_not_found.png";

export const PAYMENT = [
    {
        paymentName: "Tiền mặt",
        paymentDescription: "Tiền mặt",
        paymentIcon: "Thanh toán tiền mặt khi nhận hàng",
        paymentId: "1",
    },
    {
        paymentName: "Momo",
        paymentDescription: "Thanh toán qua MoMo",
        paymentIcon: "",
        paymentId: "1",
    },
];
const statusType = [
    {
        id: 0,
        value: "Mới",
        class: "status-create",
    },
    // {
    //     id: 1,
    //     value: "Cửa hàng xác nhận",
    //     class: "status-create",
    // },
    // {
    //     id: 2,
    //     value: "Chưa có tài xế",
    //     class: "status-shiper",
    // },
    {
        id: 3,
        value: "Tài xế đã nhận",
        class: "status-processing",
    },
    {
        id: 7,
        value: "Đang lấy hàng",
        class: "status-processing",
    },
    {
        id: 8,
        value: "Đang giao ",
        class: "status-processing",
    },
    // {
    //     id: 4,
    //     value: "Đang Giao",
    //     class: "status-processing",
    // },
    {
        id: 5,
        value: "Hoàn Thành",
        class: "status-success",
    },
    {
        id: 6,
        value: "Đã Hủy",
        class: "status-cancel",
    },

    {
        id: 9,
        value: "Của hàng hủy",
        class: "status-cancel",
    },
    {
        id: 10,
        value: "Tài xế hủy",
        class: "status-cancel",
    },
    {
        id: 11,
        value: "Khách hàng hủy",
        class: "status-cancel",
    },
    {
        id: 12,
        value: "Tự động hủy",
        class: "status-cancel",
    },
];
export const STATUS_ORDER = [
    {
        id: 0,
        statusName: "Đặt Hàng Thành Công",
        // color: "rgba(0,0,0,.4)",
        img: "",
    },
    {
        id: 1,
        statusName: "Đang Xử Lý",
        // color: "rgba(0,0,0,.4)",
        img: "",
    },
    {
        id: 2,
        statusName: "Đang Xử Lý",
        // color: "rgba(0,0,0,.4)",
        img: "",
    },
    {
        id: 3,
        statusName: "Tài Xế Nhận Đơn",
        // color: "#077E8C",
        img: "",
    },
    {
        id: 4,
        statusName: "Đang Giao",
        // color: "#52b65b",
        img: "",
    },
    {
        id: 5,
        statusName: "Hoàn Thành",
        // color: "#e94560",
        img: "",
    },
    {
        id: 6,
        statusName: "Đã Hủy",
        // color: "#e94560",
        img: "",
    },
    {
        id: 7,
        statusName: "Đang Lấy Hàng",
        // color: "#e94560",
        img: "",
    },
    {
        id: 8,
        statusName: "Đang Lấy Hàng",
        // color: "#e94560",
        img: "",
    },
    {
        id: 9,
        statusName: "Đang giao",
        // color: "#e94560",
        img: "",
    },
    {
        id: 10,
        statusName: "Đã Hủy Do Hết Thời Gian",
        // color: "#e94560",
        img: "",
    },
    {
        id: 11,
        statusName: "Cửa Hàng Hủy Đơn",
        // color: "#e94560",
        img: "",
    },
    {
        id: 12,
        statusName: "Tài Xế Hủy Đơn",
        // color: "#e94560",
        img: "",
    },
    {
        id: 13,
        statusName: "Khách Hàng Hủy Đơn",
        // color: "#e94560",
        img: "",
    },
];

export const getStatusName = (id) => {
    let statusName = "";
    STATUS_ORDER.map((item) => {
        if (id === item.id) {
            statusName = item.statusName;
        }
    });
    return statusName;
};
export const getStatusColor = (id) => {
    let color = "";
    STATUS_ORDER.map((item) => {
        if (id === item.id) {
            color = item.color;
        }
    });
    return color;
};
export const getStatusImg = (id) => {
    let img = "";
    STATUS_ORDER.map((item) => {
        if (id === item.id) {
            img = item.img;
        }
    });
    return img;
};

export const Mdata = [
    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://www.highlandscoffee.com.vn/vnt_upload/weblink/Summer_Tea__website_banner2000x640_Tra_Yi_hYng.jpg",
    },
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fbanner_sale.jpg?alt=media&token=7d19e5a3-9cbf-44e7-902d-bb532651362f",
    },
    {
        id: 3,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2F193452567_232982721923561_7074968439565756507_n.jpg?alt=media&token=81a1f170-ee5a-472f-b47a-31decc0760fc",
    },
];

export const Mdata2 = [
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2Fslider_1.webp?alt=media&token=b61c0b1c-cdb9-4376-a4d4-954dc4a562d6",
    },
    {
        id: 3,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fsection_banner_2.jpg?alt=media&token=8b1e5d93-a71e-42e4-935c-79071d44f2a0",
    },

    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://salt.tikicdn.com/cache/w830/ts/tmp/d3/b9/a9/26ecee15b4f1b63e5ff92b621226f000.jpg",
    },
];
export const Mdata3 = [
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fslide_2.png?alt=media&token=fda857ed-3c7f-469d-9e51-927a28207085",
    },
    // {
    //     id: 3,
    //     title: "50% Off For Your First Shopping",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
    //     cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/banner%2Fsection_banner_2.jpg?alt=media&token=8b1e5d93-a71e-42e4-935c-79071d44f2a0",
    // },

    // {
    //     id: 2,
    //     title: "50% Off For Your First Shopping",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
    //     cover: "https://salt.tikicdn.com/cache/w830/ts/tmp/d3/b9/a9/26ecee15b4f1b63e5ff92b621226f000.jpg",
    // },
];

export const banner = [
    {
        id: 1,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2Fvinid-highlandcofffee-750x422.png?alt=media&token=ce734032-2d0e-46f9-a931-2ced9b55d2c7",
    },
    {
        id: 2,
        title: "50% Off For Your First Shopping",
        desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
        cover: "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/icon%2FSagano-tmdt-bach-hoa-online-01.jpg?alt=media&token=db23cb1f-86ab-44a1-8231-30fdba04fc47",
    },
    // {
    //     id: 3,
    //     title: "50% Off For Your First Shopping",
    //     desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quis lobortis consequat eu, quam etiam at quis ut convallis.",
    //     cover: "https://minhvumedia.vn/wp-content/uploads/banner-khai-truong-nha-hang-min.jpg",
    // },
];
