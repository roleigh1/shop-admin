import { useState, useEffect } from "react";
import CreationForm from "./VoucherCreationForm";
import LinkCreationForm from "./VoucherLinkCreationForm";


export default function VoucherAttechment() {
    
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

            <div>
                <CreationForm />
            </div>
            <hr className="border-gray-300 mt-5 w-[95%]" />

            
            <div> 
                <LinkCreationForm /> 
            </div>

        </div >
    );
}
