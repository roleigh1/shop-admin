
const { Voucher } = require("../models/models");
const { v4: uuidv4 } = require("uuid");

const codeGen = () => {
    return uuidv4().slice(0, 9).toUpperCase();

}
const createVoucher = async (req, res) => {
    try {
        const voucherData = req.body;
        let uniCode;
        let exists = false;
        let fullCode;

        const validityFromDate = new Date(
            parseInt(voucherData.validityFrom.year),
            parseInt(voucherData.validityFrom.month) - 1,
            parseInt(voucherData.validityFrom.day)
        );

        const validityTillDate = new Date(
            parseInt(voucherData.validityTill.year),
            parseInt(voucherData.validityTill.month) - 1,
            parseInt(voucherData.validityTill.day)
        );
        while (!exists) {
            uniCode = codeGen();
            exists = await Voucher.findOne({ code: uniCode });
        }
        if (voucherData.vouchertype === "product") {
            fullCode = uniCode + voucherData.product + "-" + voucherData.value;
        } else {
            fullCode = uniCode + voucherData.vouchertype + "-" + voucherData.value;
        }

        const createdVoucher = await Voucher.create({
            code: fullCode,
            vouchertype: voucherData.vouchertype,
            discountedgroup:
                voucherData.vouchertype === "product"
                    ? voucherData.product
                    : "NON",
            value: voucherData.value,
            validityfrom: validityFromDate,
            validitytill: validityTillDate,
        });

        return res.status(201).json({
            message: "Voucher created",
            code: fullCode,
            voucher: createdVoucher
        });

    } catch (err) {
        console.error("Creating voucher failed", err);
        res.json({ error: "Creating voucher failed", err });
    }

}
module.exports = {
    createVoucher
}