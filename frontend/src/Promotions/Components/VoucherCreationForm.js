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
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

export default function CreationForm() {
    const { fetchInventory, pageStateInventory, apiReq } = useMyContext(MyProvider);
    const [generatedVoucherCode, setGeneratedVaucherCode] = useState("");
    const [createVoucherFormData, setCreateVoucherFormData] = useState({
        vouchertype: "",
        product: "",
        category: "",
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
        console.log(names);
        setData(names);
    }, [pageStateInventory]);

}
