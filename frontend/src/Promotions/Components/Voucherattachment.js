import { useState } from "react";
export default function VoucherAttechment() {
    const [activeButton, setActiveButton] = useState(false);
    const buttons = [
        { id: "total", label: "total shopping basket" },
        { id: "product", label: "Product-related" },
        { id: "shipping", label: "Free Shipping" },
    ];

    return (
        <div className="Form-container">
            <div id="headline" className="flex flex-row justify-center pt-4 gap-1" >
                <h1 className="  text-2xl ">
                    Voucher attachment
                </h1>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            </div>
            <div className="divider mr-5">
                <h2 className="text-lg font-medium pl-5 pt-5">
                    Select voucher type
                </h2>
                <form>

                    <div className="discount-btns flex flex-row gap-3 mt-2 ml-5">
                        {buttons.map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => setActiveButton(btn.id)}
                                className={`${activeButton === btn.id
                                    ? "bg-[oklch(87%_0_0)] text-white"
                                    : "bg-white hover:bg-gray-100"
                                    } text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow`}
                            >
                                {btn.label}
                            </button>
                        ))}

                    </div>
                    <p className="opacity-40 font-light pl-5 pt-3">Please choose a Voucher-type</p>
                </form>
            </div>



        </div >
    );
}