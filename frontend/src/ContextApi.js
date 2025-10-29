import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { apiConfig } from "./config/apiConfig"


export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [counter, setCounter] = useState();
  const [token, setToken] = useState("");
  const [lastOrder, setLastOrder] = useState([]);
  const [sales, setSales] = useState({});
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [editAbleData, setEditAbleData] = useState();
  const [table, setTable] = useState("Products");
  const [inventoryTable, setInventoryTable] = useState([]);
  const [rowSelectionModelOrders, setRowSelectionModelOrders] = useState([]);
  const [bannerData, setBannerData] = useState({});
  const [user, setUser] = useState({})
  const [flagHeader, setFlagHeader] = useState(null);
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,     
    page: 1,
    pageSize: 5,
  }); 
  const [tableOrders, setTableOrders] = useState("new");
  const [flagOrders, setFlagOrders] = useState(false);
  const [which, setWhich] = useState("Products");

  const apiReq = async (url, flagHeader, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: flagHeader ? {
          ...options.headers,
          "Content-type": "application/json",
        } : formData
      });
      if (response.status === 401) {
        const refeshResponse = await fetch(`${apiConfig.BASE_URL}/refresh`, {
          method: "POST",
          credentials: "include"

        });
        if (refeshResponse.ok) {
          return apiReq(url, options);
        } else {
          window.location.href = "/"
          throw new Error('Session exired');
        }
      }
      if (!response.ok) {
        throw new Error("API request failed");
      }
      return response.json()
    } catch (error) {
      console.error("API error: ", error);
      throw error;
    }
  };

  let formData = new FormData();
  const fetchInventory = async () => {
    const endpoint = table === "Products"
      ? apiConfig.endpoints.products
      : apiConfig.endpoints.bestsellers;

    try {
      const data = await apiReq(`${apiConfig.BASE_URL}${endpoint}`);
      setInventoryTable(table === "Products"
        ? data.contentData.products
        : data.contentData.bestseller
      );
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const fetchMonths = async (month) => {
    try {
      const data = await apiReq(
        `${apiConfig.BASE_URL}${apiConfig.endpoints.months}${month}`
      );
      setSales((prevSales) => ({ ...prevSales, [month]: data[month] }));
    } catch (error) {
      console.error(`Error fetching ${month}`, error);
    }
  };

  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const fetchData = async () => {
    for (const month of months) {
      await fetchMonths(month);
    }
  };
  const orderFinishProcess = async (rowSelectionModelOrders) => {
    try {
      await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.orders}`, true, {
        method: "POST",
        body: JSON.stringify({ rowSelectionModelOrders }),
      });
    } catch (error) {
      console.error("Error moving data to another table", error);
    }
  };

  const fetchCounter = async () => {
    try {
      const data = await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.counter}`)
  
      setCounter(data.counterOp);
    } catch (error) {
      console.error("Error fetching counter");
    }
  }

  const fetchAllOrders = async () => {
    try {
      const json = await apiReq(
        `${apiConfig.BASE_URL}${apiConfig.endpoints.orders}?page=${pageState.page}&pageSize=${pageState.pageSize}&type=${tableOrders}`
      );
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: json.orders,
        total: json.total,
    
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setPageState((old) => ({ ...old, isLoading: false }));
    }
  };

  const postIdForDelete = async (selectionModel, flagOrders) => {
    try {
      if (flagOrders) {
        await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.deleteID}`, true, {
          method: "POST",
          body: JSON.stringify({ rowSelectionModel: selectionModel, table }),
        });
      } else {
        console.log("orders", rowSelectionModelOrders, tableOrders)
        await apiReq(`${apiConfig.BASE_URL}${apiConfig.endpoints.deleteID}`, true, {
          method: "POST",
          body: JSON.stringify({ rowSelectionModelOrders: selectionModel, tableOrders }),
        });
      }
    } catch (error) {
      console.error("Error sending delete request", error);
    }
  };

  const fetchLastOrder = async () => {
    try {
      const data = await apiReq(
        `${apiConfig.BASE_URL}${apiConfig.endpoints.lastOrder}`
      );
      setLastOrder(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  const logOut = async () => {
    try {
      await fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.logout}`, {
        method: "POST",
        credentials: "include"
      });

      setUser(null)

      window.location.href = "/";
    } catch(error) {
      console.error('Logout error:', error ); 
    }
   
  }


  return (
    <MyContext.Provider
      value={{
        counter,
        token,
        fetchCounter,
        setToken,
        lastOrder,
        postIdForDelete,
        rowSelectionModel,
        setRowSelectionModel,
        table,
        setTable,
        editAbleData,
        setEditAbleData,
        sales,
        fetchInventory,
        inventoryTable,
        setInventoryTable,
        rowSelectionModelOrders,
        setRowSelectionModelOrders,
        orderFinishProcess,
        fetchAllOrders,
        pageState,
        setPageState,
        tableOrders,
        setTableOrders,
        flagOrders,
        setFlagOrders,
        bannerData,
        setBannerData,
        which,
        setWhich,
        fetchLastOrder,
        fetchData,
        formData,
        user,
        setUser,
        apiReq,
        flagHeader,
        setFlagHeader,
        logOut
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};