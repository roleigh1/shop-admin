
const { create } = require("node:domain");
const { Voucher } = require("../models/models");
const { v4: uuidv4 } = require("uuid");

const codeGen = () => {
    return uuidv4().slice(0, 9).toUpperCase();

}
const createVoucher = async (req, res) => {
    try {
        const voucherData = req.body;
        console.log(voucherData);
        res.json({ ok: true });
        let uniCode;
        let exists = true;
        let fullCode;
        let createdVoucher;
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
        while (exists) {
            uniCode = codeGen();
            exists = await Voucher.findOne({ uniCode });
        }
        if (voucherData.voucherType === "product") {
            fullCode = uniCode + voucherData.product + "-" + voucherData.value;
            createdVoucher = await Voucher.create({
                code: fullCode,
                vouchertype: voucherData.vouchertype,
                discountedgroup: voucherData.product,
                value: voucherData.value,
                validityfrom: validityFromDate,
                validitytill: validityTillDate,
            })
            res.json({message: createdVoucher.code}); 
        } else {
            fullCode = uniCode + voucherData.vouchertype + "-" + voucherData.value;
             createdVoucher = await Voucher.create({
                code: fullCode,
                vouchertype: voucherData.vouchertype,
                discountedgroup: "NON" ,
                value: voucherData.value,
                validityfrom: validityFromDate,
                validitytill: validityTillDate,
            })
                res.json({message: createdVoucher.code}); 
        }

    } catch (err) {
        console.error("Creating voucher failed", err);
    }

}
module.exports = {
    createVoucher
}