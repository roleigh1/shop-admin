import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { apiConfig } from "../../config/apiConfig";
import { useMyContext, MyProvider } from "../../ContextApi";

export default function LinkCreationForm() {
    const [selected, setSelected] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const { apiReq } = useMyContext(MyProvider);
    const [createLinkFromData, setCreateLinkFromData] = useState({
        voucher: [],
        bannerColor: "",
        validityFrom: null,
        validityTill: null,
        bannerHeadline: "",
        bannerText: "",
    });
    const CheckBoxData = [
        { value: "default", label: "default" },
        { value: "green", label: "green" },
        { value: "red", label: "red" },
    ];

    const bannerContent = [
        { value: "default", label: "default" },
        { value: "custom", label: "custom" },
    ];
    const fetchVouchers = async () => {
        try {
            const res = await apiReq(`${apiConfig.BASE_URL + apiConfig.endpoints.vouchers}`);

            setVouchers(res.decryptedData);
        } catch (err) {
            console.error("Error fetching vouchers:", err);
        }
    }
    useEffect(() => {
        setInterval(() => {
            fetchVouchers();
        }, 1000)
        console.log(vouchers);
    }, []);
    return (
        <div>
            <div className="flex flex-row pt-5 justify-center">
                <div className="flex flex-col ">
                    <h2 className="text-sm font-medium pb-5">Generated Voucher Link</h2>

                    <FormControl className="">
                        <InputLabel id="voucher-label">Choose Voucher</InputLabel>
                        <Select
                            label="voucher-label"
                            className="w-[10rem] h-[2.4rem]   "
                            multiple


                            value={createLinkFromData.voucher}
                            onChange={(e) =>
                                setCreateLinkFromData((prev) => ({
                                    ...prev,
                                    voucher: e.target.value,
                                }))
                            }
                            sx={{ top: 10 }}
                            required

                        >
                            {vouchers.length > 0 ? (
                                vouchers.map((voucher, index) => (
                                    <MenuItem multiple key={index} value={voucher}>{voucher}</MenuItem>
                                ))
                            ) : (
                                <MenuItem value="" disabled>No vouchers available</MenuItem>
                            )}
                        </Select>



                    </FormControl>

                    <span className="text-sm pt-5">Banner color</span>
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

                                <DatePicker
                                    className="rounded-md  bg-[#ebeceb] border-gray-400  focus-within:border-blue-400 focus-within:outline-2 "
                                    selected={createLinkFromData.validityFrom}
                                    onChange={(date) =>
                                        setCreateLinkFromData((prev) => ({
                                            ...prev,
                                            validityFrom: date,
                                        }))
                                    } />

                            </div>
                            <div className="flex flex-row gap-1 w-full pl-3 h-[2rem]">
                                <label className="text-xs opacity-40">Till:</label>
                                <DatePicker
                                    className="rounded-md bg-[#ebeceb] border-gray-400  focus-within:border-blue-400 focus-within:outline-2 "
                                    selected={createLinkFromData.validityFrom}
                                    onChange={(date) =>
                                        setCreateLinkFromData((prev) => ({
                                            ...prev,
                                            validityFrom: date,
                                        }))
                                    } />
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
    )
}