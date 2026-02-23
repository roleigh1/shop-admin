import crypto from "crypto";

const SECRET = process.env.VOUCHER_SECRET; 
const ENC_KEY = process.env.VOUCHER_ENC_KEY; 

export function hashVoucher(code){
    return crypto
    .createHash("sha256")
    .update(code + SECRET)
    .digest("hex"); 
}


export function encryptVoucher(code){
    const iv = crypto.randomBytes(12); 
    const cipher = crypto.createCipheriv("aes-128-ccm", Buffer.from(ENC_KEY,"hex"), iv); 

    const encrypted = Buffer.concat([
        cipher.update(code, "utf8"), 
        cipher.final()
    ]); 

    const tag = cipher.getAuthTag(); 

    return {
        content:encrypted.toString("hex"),
        iv: iv.toString("hex"),
        tag: tag.toString("hex")
    }; 
}
