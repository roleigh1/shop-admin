import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  GET_COUNTER,
  GET_LASTORDER,
  GET_TOTAL,
  GET_INVENTORY_TABLE,
  POST_FINISH_ORDER,
  POST_UPDATE_DATA,
  GET_ALL_ORDERS,
  GET_BANNER_DATA,
  GET_CARDS_DATA,
} from "./config/apiPaths";
const api_Host = process.env.REACT_APP_API_HOST;

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [counter, setCounter] = useState();
  const [token] = useState("");
  const [lastOrder, setLastOrder] = useState([]);
  const [sales, setSales] = useState({});
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [editAbleData, setEditAbleData] = useState();
  const [table, setTable] = useState("Products");
  const [inventoryTable, setInventoryTable] = useState([]);
  const [rowSelectionModelOrders, setRowSelectionModelOrders] = useState();
  const [flagInsertItem, setFlagInsertItem] = useState(false);
  const [bannerData, setBannerData] = useState({});
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [tableOrders, setTableOrders] = useState("new");
  const [flagOrders, setFlagOrders] = useState(false);
  const [cardsData, setCardsData] = useState({});
  const [which, setWhich] = useState("Products");
  const [choosenCards, setChoosenCards] = useState("");

  let formData = new FormData();
  console.log(`${api_Host}${GET_INVENTORY_TABLE}`);
  const fetchInventory = () => {
    const endpoint = table === "Products" ? "products" : "bestseller";
    fetch(`${api_Host}${GET_INVENTORY_TABLE}${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        setInventoryTable(data[endpoint]);
      });
  };

  const fetchMonths = async (month) => {
    try {
      const response = await fetch(`${api_Host}${GET_TOTAL}${month}`);
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
  const fetchAllOrders = async () => {
    setPageState((old) => ({
      ...old,
      isLoading: true,
    }));
    const url = `${api_Host}${GET_ALL_ORDERS}?page=${pageState.page}&pageSize=${pageState.pageSize}&type=${tableOrders}`;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const json = await response.json();
      console.log("called")
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: json.orders,
        total: json.total,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      setPageState((old) => ({
        ...old,
        isLoading: false,
      }));
    }
  };
  const orderFinishProcess = async (rowSelectionModelOrders) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ finishOrderId: rowSelectionModelOrders }),
    };
    fetch(`${api_Host}${POST_FINISH_ORDER}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("res recived", data);
        fetchAllOrders()
      })
      .catch((error) => {
        console.error("Error moving data to another table", error);
      });
  };

  const updateData = async () => {
    console.log("Updated Data", editAbleData, "From", table);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ editAbleData, table }),
    };
    fetch(`${api_Host}${POST_UPDATE_DATA}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("res recived", data);
      })
      .catch((error) => {
        console.error("Error updating data", error);
      });
  };

  
  const fetchCounter = () => {
    axios
      .get(`${api_Host}${GET_COUNTER}`)
      .then((response) => {
        setCounter(response.data.counterOp);
        console.log(counter);
      })
      .catch((error) => {
        console.error("Error fetching counter", error);
      });
  };

  const fetchEditBanners = () => {
    axios
      .get(`${api_Host}${GET_BANNER_DATA}`)
      .then((response) => {
        setBannerData(response.data.contentData.banners);
      })
      .catch((error) => {
        console.error("Error fetching content data", error);
      });
  };

  const fetchEditCards = () => {
    axios
      .get(`${api_Host}${GET_CARDS_DATA}`)
      .then((response) => {
        setCardsData(response.data.contentData.cards);
      })
      .catch((error) => {
        console.log(error, "Error fetching Cards data");
      });
  };

  useEffect(() => {
    fetchData();

    const fetchLastOrder = () => {
      fetch(`${api_Host}${GET_LASTORDER}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setLastOrder(data);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    };
    fetchLastOrder();
  }, []);

  return (
    <MyContext.Provider
      value={{
        counter,
        token,
        lastOrder,
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
        fetchEditBanners,
        fetchEditCards,
        cardsData,
        choosenCards,
        setChoosenCards,
        formData,
        setCardsData,
        flagInsertItem,
        setFlagInsertItem,
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
