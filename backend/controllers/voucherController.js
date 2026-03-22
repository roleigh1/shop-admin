const { Voucher, VoucherLink } = require("../models/models");
const crypto = require("crypto");
const { Op, col } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { hashVoucher, encryptVoucher, decryptVoucher } = require("../cryptoVoucher/cryptoHelper.js");



const codeGen = () => {
    return uuidv4().slice(0, 9).toUpperCase();
}
const generateRedeemToken = () => {
    return crypto.randomBytes(9).toString("hex");
}
const createVoucher = async (req, res) => {
    try {
        const voucherData = req.body;
        let uniCode;
        let exists = false;
        let fullCode;
        while (!exists) {
            uniCode = codeGen();
            if (voucherData.vouchertype === "product") {
                fullCode = uniCode + voucherData.product + "-" + voucherData.value;
            } else {
                fullCode = uniCode + voucherData.vouchertype + "-" + voucherData.value;
            }
            const hashedCode = hashVoucher(fullCode);
            const foundVoucher = await Voucher.findOne({ where: { hashedcode: hashedCode } });
            if (!foundVoucher) {
                exists = true;
            }
        }
        const createdVoucher = await Voucher.create({
            hashedcode: hashVoucher(fullCode),
            codeEncrypted: JSON.stringify(encryptVoucher(fullCode)),
            vouchertype: voucherData.vouchertype,
            maxredemptions: voucherData.maxredemptions,
            discountedgroup:
                voucherData.vouchertype === "product"
                    ? voucherData.product
                    : "NON",
            value: voucherData.value,
            currentredemptions: 0, 

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
const getVouchers = async (req, res) => {
    try {
        const encryptedVoucher = await Voucher.findAll({
            where: {
             
                currentredemptions: { [Op.lt]: col("maxredemptions") }
            },
            attributes: ["id", "codeEncrypted"]
        });

        const decryptedVouchers = encryptedVoucher.map(v => {
            const { id, codeEncrypted} = v.toJSON();
            const encryptedObj = JSON.parse(codeEncrypted);
            const decryptedCode = decryptVoucher(encryptedObj);

            return {
                id,
                decryptedCode,
        

            };
        });

        res.json({
            message: "data",
            data: decryptedVouchers
        });

    } catch (error) {
        console.error("Error decrypting voucher:", error);
        res.status(500).json({ error: "Error decrypting voucher" });
    }
};


const voucherLinkCreation = async (req, res) => {
    try {
        const voucherLinkData = req.body;
        const token = generateRedeemToken()
        const url = `${process.env.FRONTEND_BASE_URL}/redeem?voucher=${token}`;


        const voucherLink = await VoucherLink.create({
            url: url,
            redeemToken: token,
            validityfrom: voucherLinkData.validityFrom,
            validitytill: voucherLinkData.validityTill,
            voucherId: voucherLinkData.voucherId,
            bannerContent: voucherLinkData.bannerContent,
            bannerHeadline: voucherLinkData.bannerContent === "default" ? "NON" : voucherLinkData.bannerHeadline,
            bannerText: voucherLinkData.bannerContent === " default" ? "NON" : voucherLinkData.bannerText,
            bannerColor: voucherLinkData.bannerColor
        })
        res.status(200).json({
            message: "Voucher Link created",
            voucherLink
        })

    } catch (err) {
        console.error("Creating voucher Link failed", err);
    }
}
const postController = async (req) => {
    const voucherOperation = req.query.type;
    if (voucherOperation === "voucherCreation") {
        createVoucher(req);
    } else {
        voucherLinkCreation();
    }

}
module.exports = {
    createVoucher,
    voucherLinkCreation,
    getVouchers

}