const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../.env")
});
const crypto = require("crypto");
const SECRET = process.env.VOUCHER_SECRET;
const ENC_KEY = process.env.VOUCHER_ENC_KEY;



function hashVoucher(code) {
    return crypto
        .createHash("sha256")
        .update(code + SECRET)
        .digest("hex");
}


function encryptVoucher(code) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-128-ccm", Buffer.from(ENC_KEY, "hex"), iv, { authTagLength: 16 });

    const encrypted = Buffer.concat([
        cipher.update(code, "utf8"),
        cipher.final()
    ]);

    const tag = cipher.getAuthTag();

    let result = {

        content: encrypted.toString("hex"),
        iv: iv.toString("hex"),
        tag: tag.toString("hex")
    };
    return result;
}
function decryptVoucher(encrypteObj) {
    const decipher = crypto.createDecipheriv(
        "aes-128-ccm",
        Buffer.from(ENC_KEY, "hex"),
        Buffer.from(encrypteObj.iv, "hex"),
        { authTagLength: 16 }
    );

    decipher.setAuthTag(Buffer.from(encrypteObj.tag, "hex"));

    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(encrypteObj.content, "hex")),
        decipher.final()
    ]);

    return decrypted.toString("utf8");
}
module.exports = { hashVoucher, encryptVoucher, decryptVoucher };