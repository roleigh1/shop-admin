import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { apiConfig } from "./config/apiConfig"
const counterURL = process.env.REACT_APP_API_COUNTER;
const shopItemsURL = process.env.REACT_APP_API_CONTENTDATA
const lastOrderURL = process.env.REACT_APP_API_LASTORDER;

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
  const [rowSelectionModelOrders, setRowSelectionModelOrders] = useState();
  const [bannerData, setBannerData] = useState({});
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 1000,
  });
  const [tableOrders, setTableOrders] = useState("new");
  const [flagOrders, setFlagOrders] = useState(false);

  const [which, setWhich] = useState("Products");


  let formData = new FormData();
  const fetchInventory = () => {

    if (table === "Products") {
      fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.products}`, {
        method: "GET",
       headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setInventoryTable(data.contentData.products);
        });
    } else {
      fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.bestsellers}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }

      }
      )
        .then((res) => res.json())
        .then((data) => {
          setInventoryTable(data.contentData.bestseller);
        });
    }
  };

  const fetchMonths = async (month) => {
    try {
      const response = await fetch(
        `${apiConfig.BASE_URL}${apiConfig.endpoints.months}${month}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      const data = await response.json();
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
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ finishOrderId: rowSelectionModelOrders }),
    };
    fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.orders}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("res recived", data);
      })
      .catch((error) => {
        console.error("Error moving data to another table", error);
      });
  };

  const updateData = async () => {

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ editAbleData, table }),
    };
    fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.update}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("res recived", data);
      })
      .catch((error) => {
        console.error("Error updating data", error);
      });
  };

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(
        `${apiConfig.BASE_URL}${apiConfig.endpoints.orders}?page=${pageState.page}&pageSize=${pageState.pageSize}&type=${tableOrders}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      );
      const json = await response.json();
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
  const postIdForDelete = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    };
    if (flagOrders) {
      options.body = JSON.stringify({ rowSelectionModelOrders, tableOrders });
    } else {
      options.body = JSON.stringify({ rowSelectionModel, table });
    }
    fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.deleteID}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("res recived", data);

        console.log(options);
      })
      .catch((error) => {
        console.error("Error sending req", error);
      });
  };

  const fetchCounter = () => {
    axios
      .get(`${apiConfig.BASE_URL}${apiConfig.endpoints.counter}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setCounter(response.data.counterOp);
      })
      .catch((error) => {
        console.error("Error fetching counter", error);
      });
  };





  const fetchLastOrder = () => {
    fetch(`${apiConfig.BASE_URL}${apiConfig.endpoints.lastOrder}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setLastOrder(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  return (
    <MyContext.Provider
      value={{
        counter,
        token,
        setToken,
        lastOrder,
        postIdForDelete,
        rowSelectionModel,
        setRowSelectionModel,
        table,
        setTable,
        editAbleData,
        setEditAbleData,
        updateData,
        sales,
        fetchCounter,
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
        formData
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