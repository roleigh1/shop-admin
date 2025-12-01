import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { MyProvider, useMyContext } from "../../ContextApi";
import "./tableStyle.css";
import Pagination from "../../Pagination/Pagination";

export default function InventoryTable() {

  const {
    table,
    setTable,
    rowSelectionModel,
    setRowSelectionModel,
    postIdForDelete,
    fetchInventory,
    pageStateInventory,
    setPageStateInventory,

  } = useMyContext(MyProvider);

  useEffect(() => {
    fetchInventory();

  }, [table]);
  useEffect(() => {
    fetchInventory();
  }, [pageStateInventory.page, pageStateInventory.pageSize]);
  const header = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", type: "number", width: 90 },
    { field: "unit", headerName: "Unit", width: 90 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "firstImage", headerName: "1.ImageURL", width: 800 },
    { field: "secondImage", headerName: "2.ImageURL", width: 800 },
    { field: "thirdImage", headerName: "3.ImageURL", width: 800 },
    { field: "fourthImage", headerName: "4.ImageURL", width: 800 },
    { field: "description", headerName: "Description", width: 1000 },
  ];
  const pageState = pageStateInventory;
  const inventoryData = pageState.data;
  const handleChange = (event) => {
    const newTable = event.target.value;

    setTable(newTable);
  };

  const handleRefreshTable = () => {
    setRowSelectionModel([]);
    fetchInventory();
  };

  const handleDelete = async () => {


    await postIdForDelete(rowSelectionModel, true);
    fetchInventory()
    setRowSelectionModel([]);
  };
  const handleAllRowSelections = () => {
    setRowSelectionModel((prev) => {
      if (prev.length === inventoryData.length) {
        return [];
      } else {
        return inventoryData.map(item => item.id);
      }
    })
  };
  const handleRowSelection = (event) => {
    const value = Number(event.target.value);

    setRowSelectionModel((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  }
  useEffect(() => {
    setPageStateInventory((old) => ({ ...old, page: 1 }));
  }, []);
  return (
    <div className="flex flex-col justify-center h-[500] w-[100%] pt-4">
      <div className="flex flex-row items-center gap-2">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Table</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={table}
            label="table"
            onChange={handleChange}
          >
            <MenuItem value={"bestsellers"}>Bestseller</MenuItem>
            <MenuItem value={"products"}>Products</MenuItem>
          </Select>
        </FormControl>
        <svg
          className="refresh"

          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 30 30"
          onClick={handleRefreshTable}

        >
          <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
        </svg>

        <svg
          className="text-gray-800 cursor-pointer "
          onClick={handleDelete}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
          width="24"
          height="24"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      </div>
      <div>

        <div className="border  border-gray-200 rounded-lg  dark:border-neutral-700 overflow-auto h-[26rem] w-full">
          <table className=" divide-y divide-gray-200 dark:divide-neutral-700  m-auto">
            <thead className="bg-gray-50 dark:bg-neutral-700">
              <tr>
                <th scope="col" className="py-3 ps-4">
                  <div className="flex items-center h-5">
                    <input
                      id="hs-table-checkbox-all"
                      type="checkbox"
                      onChange={handleAllRowSelections}
                      checked={inventoryData.length > 0 &&
                        rowSelectionModel.length === inventoryData.length}
                      className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    />
                    <label htmlFor="hs-table-checkbox-all" className="sr-only">
                      Checkbox
                    </label>
                  </div>
                </th>
                {header.map((data) => {
                  return (
                    <th
                      scope="col"
                      key={data.field}
                      className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 "
                    >
                      {data.headerName}
                    </th>

                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {inventoryData.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 ps-4">
                    <div className="flex items-center h-5">
                      <input
                        id={`hs-table-checkbox-${item.id}`}
                        onChange={handleRowSelection}
                        value={item.id}
                        checked={rowSelectionModel.includes(item.id)}
                        type="checkbox"
                        className="border-gray-200 rounded-sm text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                      <label
                        htmlFor={`hs-table-checkbox-${item.id}`}
                        className="sr-only"
                      >
                        Checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.firstImage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.secondImage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.thirdImage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.thirdImage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.fourthImage}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination pageState={pageState} setPageState={setPageStateInventory} />



      </div>
    </div>
  );
}
