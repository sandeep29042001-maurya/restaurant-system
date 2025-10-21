import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // ✅ Update if backend runs on a different port
});



// User APIs
export const registerUser = (data) => API.post("/users/register", data);
export const loginUser = (data) => API.post("/users/login", data);
export const getAllUsers = () => API.get("/users");

// // Categories
export const getCategories = () => API.get("/categories");
export const addCategory = (data) => API.post("/categories", data);
export const deletCategoriesById =(id) => API.delete(`/categories/${id}`);


// Food
export const getAllFood = () => API.get("/food");
export const searchFood = (name) => API.get(`/food/search?name=${name}`);
export const getFoodByCategory = (id) => API.get(`/food/category/${id}`);
export const addFood = (data) => API.post("/food", data);
export const updateFood = (id, data) => API.put(`/food/${id}`, data);
export const deleteFood = (id) => API.delete(`/food/${id}`);
export const getFoodById = (id) => API.get(`food/${id}`);



// Cart
export const addToCart = (data) => API.post("/cart/add", data);
export const getCart = (userId) => API.get(`/cart/${userId}`);
export const updateCart = (id, quantity) => API.put(`/cart/${id}?quantity=${quantity}`);
export const deleteCart = (id) => API.delete(`/cart/${id}`);

// Orders
export const placeOrder = (userId) => API.post(`/orders/${userId}`);
export const getOrders = (userId) => API.get(`/orders/${userId}`);

export const updateOrderStatus = (orderId, status) =>
  API.put(`/orders/${orderId}/status?status=${status}`);

export const getAllOrders = () => API.get("/orders");

