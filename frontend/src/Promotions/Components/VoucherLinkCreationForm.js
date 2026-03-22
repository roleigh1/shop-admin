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
import moment from "moment";


export default function LinkCreationForm() {

    const [vouchers, setVouchers] = useState([]);
    const { apiReq } = useMyContext(MyProvider);
    const [createLinkFromData, setCreateLinkFromData] = useState({
        voucherId: "",
        bannerColor: "",
        validityFrom: null,
        validityTill: null,
        bannerContent: "",
        bannerHeadline: "",
        bannerText: "",
    });

    const [linkCreated, setLinkCreated] = useState("");
    const CheckBoxData = [
        { value: "default", label: "default" },
        { value: "green", label: "green" },
        { value: "blue", label: "blue" },
    ];
    const bannerContent = [
        { value: "default", label: "default" },
        { value: "custom", label: "custom" },
    ];
    const fetchVouchers = async () => {
        try {
            const res = await apiReq(`${apiConfig.BASE_URL + apiConfig.endpoints.vouchers}`);
            setVouchers(res.data);
        } catch (err) {
            console.error("Error fetching vouchers:", err);
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const createLink = await apiReq(`${apiConfig.BASE_URL + apiConfig.endpoints.voucherLinkCreation}`, true,
                {
                    method: "POST",
                    body: JSON.stringify(createLinkFromData)
                }
            )
            if (createLink) {
                setCreateLinkFromData({
                    voucher: "",
                    bannerColor: "",
                    validityFrom: null,
                    validityTill: null,
                    bannerContent: "",
                    bannerHeadline: "",
                    bannerText: "",
                })
                setLinkCreated(createLink.voucherLink.url);
            }
        
        } catch (err) {
            console.error("Error creating voucher Link", err);
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="flex flex-row pt-5 justify-center">
                    <div className="flex flex-col ">
                        <h2 className="text-sm font-medium pb-5">Generated Voucher Link</h2>
                        <FormControl className="">
                            <InputLabel id="voucher-label">Choose Voucher</InputLabel>
                            <Select
                                label="voucher-label"
                                className="w-[10rem] h-[2.4rem]"
                                onOpen={fetchVouchers}
                                value={createLinkFromData.voucherId}
                                onChange={(e) =>
                                    setCreateLinkFromData((prev) => ({
                                        ...prev,
                                        voucherId: e.target.value,
                                    }))
                                }
                                sx={{ top: 10 }}
                                required
                            >
                                {vouchers.length > 0 ? (
                                    vouchers.map((voucher) => (
                                        <MenuItem key={voucher.id} value={voucher.id}>
                                            {voucher.decryptedCode}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem value="" disabled>
                                        No vouchers available
                                    </MenuItem>
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
                                    required={createLinkFromData.bannerContent === ""}
                                    checked={createLinkFromData.bannerColor === option.value}
                                    onChange={() => setCreateLinkFromData((prev) => ({
                                        ...prev,
                                        bannerColor: option.value
                                    }))}
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
                                        className="rounded-md bg-[#ebeceb] border-gray-400"
                                        selected={createLinkFromData.validityFrom}
                                        required
                                        onChange={(date) => {
                                            const formattedDate = moment(date).format("YYYY-MM-DD");
                                            setCreateLinkFromData((prev) => ({
                                                ...prev,
                                                validityFrom: formattedDate
                                            }));
                                           
                                        }}
                                    />

                                </div>
                                <div className="flex flex-row gap-1 w-full pl-3 h-[2rem]">
                                    <label className="text-xs opacity-40">Till:</label>
                                    <DatePicker
                                        className="rounded-md bg-[#ebeceb] border-gray-400"
                                        selected={createLinkFromData.validityTill}
                                        required
                                        onChange={(date) => {

                                            const formattedDate = moment(date).format("YYYY-MM-DD");

                                            setCreateLinkFromData((prev) => ({
                                                ...prev,
                                                validityTill: formattedDate
                                            }));
                                           
                                        }}
                                    />
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
                                    required={createLinkFromData.bannerColor === ""}
                                    control={<Checkbox />}
                                    label={option.label}
                                    checked={createLinkFromData.bannerContent === option.value}
                                    onChange={() => setCreateLinkFromData((prev) => ({
                                        ...prev,
                                        bannerContent: option.value
                                    }))}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-2">
                            <TextField value={createLinkFromData.bannerHeadline} onChange={(e) => setCreateLinkFromData((prev) => ({ ...prev, bannerHeadline: e.target.value }))} required label="Headline" disabled={createLinkFromData.bannerContent === "default"} />
                            <TextField onChange={(e) => setCreateLinkFromData((prev) => ({ ...prev, bannerText: e.target.value }))} value={createLinkFromData.bannerText} required label="Text" minRows={4} multiline disabled={createLinkFromData.bannerContent === "default"} />
                        </div>
                    </div>
                </div>
                <div className="mt-5 text-center" >
            

                </div>
                <div className="flex flex-col gap-2 justify-center items-center pb-5 pt-5">
                    <div className="flex flex-row">
                        <div className="bg-gray-300 rounded w-[40rem] h-[2rem] flex flex-col items-center justify-center" >
                            <span className="text-xs ">
                                {linkCreated}
                            </span>
                        </div>
                    </div>
                    <Button noValidate type="submit" variant="outlined" className="w-[8rem] h-[2rem]">
                        Generate
                    </Button>
                </div>
            </form>
        </div >
    )
}