

export default function Background({className ="",children}) {
    return ( 
        <div >
            <div className={`backgroundInsert bg-[#ebeceb] rounded-lg ${className}`}>         
                 {children}
            </div>
         </div>
    )
}