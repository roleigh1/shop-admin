import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MyProvider, useMyContext } from "../../ContextApi";
import Button from "@mui/material/Button";
import { typeConfig } from "../../config/typeconfig";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { apiConfig } from "../../config/apiConfig";
export default function CreationForm() {
    const { fetchInventory, pageStateInventory, apiReq } = useMyContext(MyProvider);
    const [generatedVoucherCode, setGeneratedVaucherCode] = useState("");
    const [createVoucherFormData, setCreateVoucherFormData] = useState({
        vouchertype: "",
        product: "",
        category: "",
        maxredemptions: "",
        value: "",
        validityFrom: null,
        validityTill: null,
    });
    const [data, setData] = useState([]);
    const buttons = [
        { id: "total", label: "total shopping basket" },
        { id: "product", label: "Product-related" },
        { id: "category", label: "Category-related" },
    ];
    useEffect(() => {
        fetchInventory({ pageSize: 1000 });
    }, []);
    useEffect(() => {
        const names = pageStateInventory.data?.map((item) => item.name);
        setData(names);
    }, [pageStateInventory]);


    const handleChangeCreate = (e) => {
        const { name, value } = e.target;
        setCreateVoucherFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const voucherData = Object.entries(createVoucherFormData).reduce((acc, [key, value]) => {
            if (value !== "") {
                acc[key] = value
            }
            return acc;
        }, {})
        try {
            const res = await apiReq(`${apiConfig.BASE_URL + apiConfig.endpoints.voucherCreation}`, true, {
                method: "POST",
                body: JSON.stringify(voucherData)
            })
            if (res) {
                setCreateVoucherFormData({
                    vouchertype: "",
                    product: "",
                    category: "",
                    maxredemptions: null,
                    value: "",
                    validityFrom: null,
                    validityTill: null,
                });
                setGeneratedVaucherCode(res.code);
                setTimeout(() => setGeneratedVaucherCode(""), 10000)
            }
        } catch (err) {
            console.error("Error creating Voucher", err);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="divider px-5 w-full">
                <h2 className="text-sm font-medium pl-5">Select voucher type</h2>
                <div className="discount-btns flex flex-row gap-2 pl-5 mt-2">
                    <input
                        type="hidden"
                        name="vouchertype"
                        value={createVoucherFormData.vouchertype}
                        required
                    />
                    {buttons.map((btn) => (
                        <button
                            type="button"
                            key={btn.id}
                            onClick={() =>
                                setCreateVoucherFormData((prev) => ({
                                    ...prev,
                                    vouchertype: btn.id,
                                }))
                            }
                            className={`${createVoucherFormData.vouchertype === btn.id
                                ? "bg-[oklch(87%_0_0)]"
                                : "bg-white hover:bg-gray-100"
                                } border border-gray-400 rounded shadow text-xs flex items-center justify-center w-[4rem] lg:h-[3rem] lg:w-[8rem]`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
                <p className="opacity-40 font-light pl-5 text-xs pt-3">Please choose a Voucher-type</p>
                <hr className="border-gray-300 mt-2 w-[95%]" />

                <div
                    className={`mt-5 ml-5 ${createVoucherFormData.vouchertype === "total"
                        ? "opacity-60"
                        : "opacity-100"
                        }`}
                >

                    <div className="flex items-center justify-between mb-3 pr-10">
                        <h2 className="text-sm font-medium w-[15rem]">
                            Choose Category or Product
                        </h2>

                        <h2 className="text-sm font-medium">
                            Max redemptions
                        </h2>
                    </div>

                    <div className="flex flex-row">

                        <div className="flex flex-row gap-4 pt-3">
                            <FormControl>
                                <InputLabel id="product-label">Product</InputLabel>
                                <Select
                                    labelId="product-label"
                                    name="product"
                                    value={createVoucherFormData.product}
                                    onChange={handleChangeCreate}
                                    label="Product"
                                    sx={{ top: 10 }}
                                    required={createVoucherFormData.vouchertype === "product"}
                                    disabled={
                                        createVoucherFormData.vouchertype === "total" ||
                                        createVoucherFormData.vouchertype === "category"
                                    }
                                    className={`${createVoucherFormData.vouchertype === "category"
                                        ? "opacity-70"
                                        : "opacity-100"
                                        } h-[2rem] w-[8rem]`}
                                >
                                    {data?.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className="w-[7rem] h-[3rem]">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    label="Category"
                                    name="category"

                                    value={createVoucherFormData.category}
                                    onChange={handleChangeCreate}
                                    required={createVoucherFormData.vouchertype === "category"}
                                    disabled={
                                        createVoucherFormData.vouchertype === "total" ||
                                        createVoucherFormData.vouchertype === "product"
                                    }
                                    sx={{ top: 10 }}
                                    className={`${createVoucherFormData.vouchertype === "product"
                                        ? "opacity-70"
                                        : "opacity-100"
                                        } h-[2rem] w-[8rem]`}
                                >
                                    {typeConfig.selectTypesVoucherCategory.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div className="flex flex-col items-center justify-start w-full pt-3">
                            <TextField
                                type="number"
                                variant="outlined"
                                size="small"
                                value={createVoucherFormData.maxredemptions ?? ""}
                                name="maxredemptions"

                                required
                                onChange={handleChangeCreate}
                                className="h-[2rem] w-[5rem]"
                            />
                        </div>
                    </div>

                    <span className="opacity-40 text-xs pt-2 block">
                        Select the product or category for the discounted voucher.
                    </span>
                </div>
                <hr className="border-gray-300 mt-2 w-[95%]" />

                <div className="flex lg:flex-row flex-col gap-10 lg:gap-2 mt-3 lg:justify-center lg:items-start">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-sm font-medium">Voucher value (%)</h2>
                        <TextField
                            label="Value"
                            variant="outlined"
                            size="small"
                            type="number"
                            value={createVoucherFormData.value}
                            name="value"
                            required
                            onChange={handleChangeCreate}
                            className="h-[2rem] w-[5rem] relative top-2"
                        />
                        <p className="opacity-40 text-xs relative top-6">Please enter the value without %</p>
                    </div>

                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h2 className="font-medium text-sm">Voucher validity</h2>
                        <div className="flex flex-row gap-1">
                            <label className="text-xs opacity-40">From:</label>

                            <DatePicker
                                className="rounded-md bg-[#ebeceb] border-gray-400  focus-within:border-blue-400 focus-within:outline-2 "
                                selected={createVoucherFormData.validityFrom}
                                onChange={(date) =>
                                    setCreateVoucherFormData((prev) => ({
                                        ...prev,
                                        validityFrom: date,
                                    }))
                                } />

                        </div>
                        <div className="flex flex-row gap-1 ml-2">
                            <label className="text-xs opacity-40">Till:</label>

                            <DatePicker
                                className="rounded-md bg-[#ebeceb] border-gray-400 focus-within:border-blue-400 focus-within:outline-2  "
                                selected={createVoucherFormData.validityTill}
                                onChange={(date) =>
                                    setCreateVoucherFormData((prev) => ({
                                        ...prev,
                                        validityTill: date,
                                    }))
                                }
                            />
                        </div>
                    </div>
                </div>
                <hr className="border-gray-300 mt-5 w-[95%]" />
                <div className="flex justify-center items-center flex-col gap-5">
                    <h2 className="text-sm font-medium mt-5">Generate Voucher</h2>
                    <div className="flex justify-center items-center flex-col gap-4">
                        <div className="flex flex-row justify-center gap-1">
                            <div className="bg-gray-300 rounded flex flex-row w-[12rem] justify-center items-center h-[2rem]" >
                                <span className="text-center">
                                    {generatedVoucherCode}
                                </span>
                            </div>


                        </div>
                        <span className="text-xs opacity-40">Click the button to generate the voucher with the selected options.</span>
                        <Button variant="outlined" noValidate type="submit" className="w-[8rem] h-[2rem]">
                            Generate
                        </Button>
                    </div>
                </div>
            </form >
        </div>
    )

}
