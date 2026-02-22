import { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { MyProvider, useMyContext } from "../../ContextApi";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { typeConfig } from "../../config/typeconfig";



export default function VoucherAttechment() {
    const { fetchInventory, pageStateInventory, apiReq } = useMyContext(MyProvider);
    const [selected, setSelected] = useState(null);
    const [data, setData] = useState([]);
    const [generatedVoucherCode, setGeneratedVaucherCode ] = useState(""); 
    const [createVoucherFormData, setCreateVoucherFormData] = useState({
        vouchertype: "",
        product: "",
        category: "",
        value: "",
        validityFrom: {
            day: "",
            month: "",
            year: "",
        },
        validityTill: {
            day: "",
            month: "",
            year: "",
        },
    });
    const [createLinkFromData, setCreateLinkFromData] = useState({
        voucher: "",
        bannerColor: "",
        validityFrom: {
            day: "",
            month: "",
            year: "",
        },
        validityTill: {
            day: "",
            month: "",
            year: "",
        },
        bannerHeadline: "",
        bannerText: "",
    });
    const dateFields = ["day", "month", "year"];
    const buttons = [
        { id: "total", label: "total shopping basket" },
        { id: "product", label: "Product-related" },
        { id: "category", label: "Category-related" },
    ];

    const CheckBoxData = [
        { value: "default", label: "default" },
        { value: "green", label: "green" },
        { value: "red", label: "red" },
    ];

    const bannerContent = [
        { value: "default", label: "default" },
        { value: "custom", label: "custom" },
    ];

    useEffect(() => {
        fetchInventory({ pageSize: 1000 });
    }, []);


    useEffect(() => {
        const names = pageStateInventory.data?.map((item) => item.name);
        console.log(names);
        setData(names);
    }, [pageStateInventory]);


    const handleChangeCreate = (e) => {
        const { name, value } = e.target;
        setCreateVoucherFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    const handleDateChange = (type, field) => (e) => {
        const value = e.target.value;

        setCreateVoucherFormData((prev) => ({
            ...prev,
            [type]: {
                ...prev[type],
                [field]: value,
            },
        }));
    };
    const handleSubmit = async(e) => {
        e.preventDefault();

       const voucherData = Object.entries(createVoucherFormData).reduce((acc,[key,value]) => {
            if(value !== ""){
                acc[key] = value
            }
            return acc;
        },{})

        try{
            const res = await apiReq(`http://localhost:3131/api/voucherCreation`, true, {
            method: "POST",
            body: JSON.stringify(voucherData)
        })
            console.log(res); 
        } catch (err){
            console.error("Error creating Voucher", err);
        }

    };

    return (
        <div className="Form-container">
            <div id="headline" className="flex flex-row justify-center pt-4 gap-1">
                <h1 className="text-lg font-medium">Voucher attachment</h1>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
                        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round"></path>
                    </g>
                </svg>
            </div>


            <form onSubmit={handleSubmit} className="divider px-5 w-full">


                <h2 className="text-sm font-medium pl-5">Select voucher type</h2>
                <div className="discount-btns flex flex-row gap-2 pl-5 mt-2">
                    {/* Hidden required field für Browser-Validation */}
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

                <div className={`mt-5 ml-5 ${createVoucherFormData.vouchertype === "total" ? "opacity-60" : "opacity-100"}`}>
                    <h2 className="text-sm font-medium mr-5">Choose Category or Product</h2>
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
                                disabled={createVoucherFormData.vouchertype === "total" || createVoucherFormData.vouchertype === "category"}
                                className={`${createVoucherFormData.vouchertype === "category" ? "opacity-70" : "opacity-100"} h-[2rem] w-[8rem]`}
                            >
                                {data?.map((item) => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
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
                                disabled={createVoucherFormData.vouchertype === "total" || createVoucherFormData.vouchertype === "product"}
                                sx={{ top: 10 }}
                                className={`${createVoucherFormData.vouchertype === "product" ? "opacity-70" : "opacity-100"} h-[2rem] w-[8rem]`}
                            >
                                {typeConfig.selectTypesVoucherCategory.map((option) => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <span className="opacity-40 text-xs pt-2">Select the product or category for the discounted voucher.</span>
                </div>
                <hr className="border-gray-300 mt-2 w-[95%]" />

                <div className="flex lg:flex-row flex-col gap-10 lg:gap-2 mt-3 lg:justify-center lg:items-start">
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h2 className="text-sm font-medium">Voucher value (%)</h2>
                        <TextField
                            label="Value"
                            variant="outlined"
                            size="small"
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

                            {dateFields.map((field, index) => (
                                <TextField
                                    key={field}
                                    size="small"
                                    required
                                    value={createVoucherFormData.validityFrom[field]}
                                    onChange={handleDateChange("validityFrom", field)}
                                    className={`h-[2rem] ${index === 2 ? "w-[4rem]" : "w-[3rem]"
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex flex-row gap-1 ml-2">
                            <label className="text-xs opacity-40">Till:</label>

                            {dateFields.map((field, index) => (
                                <TextField
                                    key={field}
                                    size="small"
                                    required
                                    value={createVoucherFormData.validityTill[field]}
                                    onChange={handleDateChange("validityTill", field)}
                                    className={`h-[2rem] ${index === 2 ? "w-[4rem]" : "w-[3rem]"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <hr className="border-gray-300 mt-5 w-[95%]" />
                <div className="flex justify-center items-center flex-col gap-5">
                    <h2 className="text-sm font-medium mt-5">Generate Voucher</h2>
                    <div className="flex justify-center items-center flex-col gap-4">
                        <div className="flex flex-row justify-center gap-1">
                            <div className="bg-gray-300 rounded w-[10rem] h-[2rem]" />

                            <svg fill="#000000" className="w-[2rem] h-[2rem] cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M8,7 L8,8 L6.5,8 C5.67157288,8 5,8.67157288 5,9.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 C14.3284271,20 15,19.3284271 15,18.5 L15,17 L16,17 L16,18.5 C16,19.8807119 14.8807119,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,9.5 C4,8.11928813 5.11928813,7 6.5,7 L8,7 Z M16,4 L10.5,4 C9.67157288,4 9,4.67157288 9,5.5 L9,14.5 C9,15.3284271 9.67157288,16 10.5,16 L17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,7 L16.5,7 C16.2238576,7 16,6.77614237 16,6.5 L16,4 Z M20,6.52797748 L20,14.5 C20,15.8807119 18.8807119,17 17.5,17 L10.5,17 C9.11928813,17 8,15.8807119 8,14.5 L8,5.5 C8,4.11928813 9.11928813,3 10.5,3 L16.4720225,3 C16.6047688,2.99158053 16.7429463,3.03583949 16.8535534,3.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 Z M17,6 L18.2928932,6 L17,4.70710678 L17,6 Z" />
                                </g>
                            </svg>
                        </div>
                        <span className="text-xs opacity-40">Click the button to generate the voucher with the selected options.</span>
                        <Button variant="outlined" noValidate type="submit" className="w-[8rem] h-[2rem]">
                            Generate
                        </Button>
                    </div>
                </div>
            </form >
            <hr className="border-gray-300 mt-5 w-[95%]" />

            <div className="flex flex-row pt-5 justify-center">
                <div className="flex flex-col ">
                    <h2 className="text-sm font-medium">Generated Voucher Link</h2>

                    <FormControl className="w-[7rem] h-[3rem] pt-5">
                        <InputLabel>Choose Voucher</InputLabel>
                        <Select
                            label="Choose Voucher"

                            value={createLinkFromData.voucher}
                            onChange={(e) =>
                                setCreateLinkFromData((prev) => ({
                                    ...prev,
                                    voucher: e.target.value,
                                }))
                            }
                            sx={{ top: 10 }}
                            required
                            className="h-[2rem] w-[8rem]"
                        >
                            <MenuItem value="default">default</MenuItem>
                            <MenuItem value="option1">option 1</MenuItem>
                            <MenuItem value="option2">option 2</MenuItem>
                        </Select>
                    </FormControl>

                    <span className="text-sm">Banner color</span>
                    <div className="flex flex-row">
                        {CheckBoxData.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={<Checkbox />}
                                label={option.label}

                                required
                                checked={selected === option.value}
                                onChange={() => setSelected(option.value)}
                            />
                        ))}
                    </div>
                    <hr className="border-gray-300 w-[45%]" />

                    <div className="flex flex-col gap-4">
                        <h2 className="text-sm font-medium pt-5">Validity</h2>
                        <div className="flex flex-col gap-4 pt-3">
                            <div className="gap-1 flex flex-row w-full h-[2rem]">
                                <label className="text-xs opacity-40">From:</label>
                                <TextField  variant="outlined" size="small" sx={{ width: 45, height: 45 }} />
                                <TextField variant="outlined" size="small" sx={{ width: 45, height: 45 }} />
                                <TextField variant="outlined" size="small" sx={{ width: 45, height: 45 }} />
                            </div>
                            <div className="flex flex-row gap-1 w-full pl-3 h-[2rem]">
                                <label className="text-xs opacity-40">Till:</label>
                                <TextField variant="outlined" size="small" sx={{ width: 45, height: 45 }} />
                                <TextField variant="outlined" size="small" sx={{ width: 45, height: 45 }} />
                                <TextField variant="outlined" size="small" sx={{ width: 45, height: 45 }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <span>Banner content</span>
                    <div className="flex flex-row">
                        {bannerContent.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                control={<Checkbox />}
                                label={option.label}
                                required
                                checked={selected === option.value}
                                onChange={() => setSelected(option.value)}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextField label="Headline" />
                        <TextField label="Text" minRows={4} multiline />
                    </div>
                </div>
            </div>


            <div className="flex flex-col gap-2 justify-center items-center pb-5 pt-5">
                <div className="flex flex-row">
                    <div className="bg-gray-300 rounded w-[25rem] h-[2rem] pt-5" />

                    <svg fill="#000000" className="w-[2rem] h-[2rem] cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M8,7 L8,8 L6.5,8 C5.67157288,8 5,8.67157288 5,9.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 C14.3284271,20 15,19.3284271 15,18.5 L15,17 L16,17 L16,18.5 C16,19.8807119 14.8807119,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,9.5 C4,8.11928813 5.11928813,7 6.5,7 L8,7 Z M16,4 L10.5,4 C9.67157288,4 9,4.67157288 9,5.5 L9,14.5 C9,15.3284271 9.67157288,16 10.5,16 L17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,7 L16.5,7 C16.2238576,7 16,6.77614237 16,6.5 L16,4 Z M20,6.52797748 L20,14.5 C20,15.8807119 18.8807119,17 17.5,17 L10.5,17 C9.11928813,17 8,15.8807119 8,14.5 L8,5.5 C8,4.11928813 9.11928813,3 10.5,3 L16.4720225,3 C16.6047688,2.99158053 16.7429463,3.03583949 16.8535534,3.14644661 L19.8535534,6.14644661 C19.9641605,6.25705373 20.0084195,6.39523125 20,6.52797748 Z M17,6 L18.2928932,6 L17,4.70710678 L17,6 Z" />
                        </g>
                    </svg>
                </div>
                <Button type="submit" variant="outlined" className="w-[8rem] h-[2rem]">
                    Generate
                </Button>
            </div>


        </div >
    );
}
