export const apiConfig = {
  BASE_URL: process.env.REACT_APP_API_URL , 
  endpoints: {
    banners: "/contentData/banners",        
    products: "/contentData/products", 
    bestsellers: "/contentData/bestsellers",     
    categories: "/categories",
    auth: "/auth",   
    counter: "/counter",
    deleteID: "/deleteID",
    orders: "/orders",
    months: "/totalMonths/",
    update: "/updateData",
    lastOrder:"/lastOrder",
    login:"/login",
    editBanner:"/contentEdit/banner",
    intventoryEdit: "/contentEdit/inventory/",
    cards: "/contentdata/cards",
    editCards:"/contentEdit/cards"


  },
};