import axios from "axios";

// const BASE_URL = "https://deliveryvhgp-webapi.azurewebsites.net/api/v1/";
const BASE_URL = "https://api.vhgp.net/api/v1/";
// const BASE_URL_CORAL_PARK = "https://api.vhgp.net/api/v2/";
const PRODUCT = "products";
const MENU = "menus";
const ORDER = "orders";
const CATEGORY = "category-management";
const STORE = "stores";
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/filter?modeId=1&gb=cate?page=1&pageSize=10
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/filter?modeId=1&gb=cate&page=1&pageSize=10
export const getMenuByModeGroupBy = (modeId, groupBy, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/filter?modeId=${modeId}&gb=${groupBy}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/now/categoies?modeId=1
export const getMenuByMode = (modeId) => {
  return axios.get(`${BASE_URL}${MENU}/now/categoies?modeId=${modeId}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/now/storeCategories?modeId=1&storeCateSize=1&storeSize=20
export const getListStoreCategory = (modeId, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/now/storeCategories?modeId=${modeId}&storeCateSize=${page}&storeSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/stores/filterByCate?cateId=1&page=1&pageSize=10
export const getListStoreByCate = (menuId, cateId, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/${menuId}/${STORE}/filterByCate?cateId=${cateId}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/now/stores?modeId=1&page=1&pageSize=20
export const getListStoreInMenuByMode = (modeId, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/now/stores?modeId=${modeId}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/ByMenuId/keySearch?KeySearch=c&menuId=1&pageIndex=1&pageSize=10
export const getListSearchByKey = (key, menuId, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/ByMenuId/keySearch?KeySearch=${key}&menuId=${menuId}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/products/p1
export const getProductDetail = (id) => {
  return axios.get(`${BASE_URL}${PRODUCT}/${id}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products/byCategoryId?categoryId=4&page=1&pageSize=10
export const getListProductByCateId = (menuId, cateId, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/${menuId}/${PRODUCT}/byCategoryId?categoryId=${cateId}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products/byStoreId?storeId=s4&page=1&pageSize=10
export const getListProductByStoreId = (menuId, storeId, page, size) => {
  return axios.get(
    `${BASE_URL}${MENU}/${menuId}/${PRODUCT}/byStoreId?storeId=${storeId}&page=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings?pageIndex=1&pageSize=20
export const getBuildings = (page, size) => {
  return axios.get(`${BASE_URL}buildings?pageIndex=${page}&pageSize=${size}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas?pageIndex=1&pageSize=20
export const getAreas = (page, size) => {
  return axios.get(`${BASE_URL}areas?pageIndex=${page}&pageSize=${size}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas?pageIndex=1&pageSize=20
export const getApartment = (areaId) => {
  return axios.get(`${BASE_URL}areas/ByAreaId?areaId=${areaId}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/1/customers?pageIndex=1&pageSize=20
export const getListOrder = (userId, page, size) => {
  return axios.get(
    `${BASE_URL}${ORDER}/${userId}/customers?pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
// https://api.vhgp.net/api/v1/orders/CDCC-000060
export const getOrderbyID = (id) => {
  return axios.get(`${BASE_URL}${ORDER}/{id}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders
export const postOrder = (order) => {
  return axios.post(`${BASE_URL}${ORDER}`, order, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/1
export const putOrder = (order) => {
  return axios.put(`${BASE_URL}${ORDER}/${order.orderId}`, order, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/9a552a0b-aea5-4327-97bc-d27fdb960179
export const getOrderDetail = (orderId) => {
  return axios.get(`${BASE_URL}${ORDER}/${orderId}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/now/mode3?pageSize=20
export const getMenuMode3 = (size) => {
  return axios.get(`${BASE_URL}${MENU}/now/mode3?pageSize=${size}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/mode3/55c40c76-f71b-4f13-8270-fba0cbcfb812/stores?page=1&pageSize=20&searchBy=4757550b-8142-4b00-9e59-d3287744ded8
export const getProductMenuMode3 = (menuId, cateId, page, size) => {
  let url = "";
  if (cateId !== "") {
    url = `&searchBy=${cateId}`;
  }
  return axios.get(
    `${BASE_URL}${MENU}/mode3/${menuId}/stores?page=${page}&pageSize=${size}${url}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/ByMenuId?menuId=13c699e4-7e19-4ecb-ac99-1df0661f0e61&pageIndex=1&pageSize=20
export const getTimeDurationList = (menuId, page, size) => {
  return axios.get(
    `${BASE_URL}${ORDER}/ByMenuId?menuId=${menuId}&pageIndex=${page}&pageSize=${size}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/orders/ByOrderId?orderId=0
export const getUrlOrderPayment = (orderId) => {
  return axios.get(`${BASE_URL}${ORDER}/ByOrderId?orderId=${orderId}`, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/menuId?menuId=1
export const getShipcostByMenu = (menuId) => {
  return axios.get(
    `${BASE_URL}menu-management/${MENU}/menuId?menuId=${menuId}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
// https://api.vhgp.net/api/v1/account-management/accounts/login?id=nguyenhoan20032003%40gmail.com&pass=1234564
export const Login = (id, pass) => {
  return axios.get(
    `${BASE_URL}account-management/accounts/login?id=${id}&pass=${pass}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
// https://api.vhgp.net/api/v1/account-building?pageIndex=1&pageSize=10&AccountId=endy
export const getAccountBuilding = (index, size, id) => {
  return axios.get(
    `${BASE_URL}account-building?pageIndex=${index}&pageSize=${size}&AccountId=${id}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
// https://api.vhgp.net/api/v1/account-building
export const postAccountBuilding = (body) => {
  return axios.post(`${BASE_URL}account-building`, body, {
    Accept: "application/json",
    "Content-Type": "application/json",
  });
};
// https://api.vhgp.net/api/v1/order-management/orders/search-phone?pageIndex=1&pageSize=100&phone=0374814009
export const getOrdersbyPhone = (index, size, phone) => {
  return axios.get(
    // order-management/orders/search-phone?pageIndex=1&pageSize=100&phone=0374814009
    `${BASE_URL}order-management/orders/search-phone?pageIndex=${index}&pageSize=${size}&phone=${phone}`,
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  );
};
