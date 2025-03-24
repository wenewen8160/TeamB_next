
export const API_SERVER = `http://localhost:3001`;
// export const API_SERVER = `http://172.23.53.146:3001`;

// 頭貼的路
export const AVATAR_PATH = `${API_SERVER}/registered/api`;

// 取得所有報名資料 GET
export const ACTIVITY_LIST = `${API_SERVER}/registered/api`;

// 取得單筆報名資料
// `${API_SERVER}/address-book/api/${ab_id}`
export const ACTIVITY_ITEM_GET = `${API_SERVER}/registered/api`;


// 新增報名 POST
export const ACTIVITY_ADD_POST = `${API_SERVER}/registered/api`;

// 刪除報名 DELETE
// `${API_SERVER}/address-book/api/${ab_id}`
export const ACTIVITY_DELETE = `${API_SERVER}/registered/api`;

// 修改報名 PUT
// `${API_SERVER}/address-book/api/${ab_id}`
export const ACTIVITY_ITEM_PUT = `${API_SERVER}/registered/api`;



// JWT 登入
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`;
