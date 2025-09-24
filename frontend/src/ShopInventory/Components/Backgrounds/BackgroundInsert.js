import PropTypes from "prop-types"; 

export default function BackgroundInset({children}) {
    return ( 
        <div >
            <div className="backgroundInsert bg-[#ebeceb] rounded-lg w-[20rem] h-[40rem] mt-20">         
                 {children}
            </div>
         </div>
    )
}
BackgroundInset.propTypes = {
    children: PropTypes.node.isRequired,
  };
    