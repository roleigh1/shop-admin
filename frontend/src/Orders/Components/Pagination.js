import { useMyContext } from "../../ContextApi";
import { useEffect,useState } from "react";
export default function Pagination() {
const [numPages,setNumPages] = useState(0);
 const {pageState,setPageState} = useMyContext(); 
 const [showingResults, setShowingResults] = useState({
  first: 0,
  last : 5
 })
 useEffect(() => {
  setNumPages(Math.ceil(pageState.total / pageState.pageSize));

 },[pageState.total, pageState.pageSize]); 
 useEffect(() => {
  const first = (pageState.page -1) * pageState.pageSize + 1; 
  const last = Math.min(first + pageState.pageSize -1 , pageState.total); 
  setShowingResults({first,last}); 
 },[pageState.page, pageState.total, pageState.pageSize]); 

  const handlePrev =(e) => {
    e.preventDefault(); 
    if(pageState.page > 1){
      setPageState((old) => ({
        ...old,
        page:old.page -1 
      }));
      
    }
  }
  const handleNext = (e) => {
    e.preventDefault(); 
    if(pageState.page < numPages){
    setPageState((old)=> ({
        ...old,
        page:old.page + 1
    })); 
    
    }

  }
  return (
    <div className=" border-t border-gray-200 px-4 py-3 sm:px-6  ">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden mt-3">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between ">
        <div className="mt-3">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">{showingResults.first}</span> to{" "}
            <span className="font-medium">{showingResults.last}</span> of{" "}
            <span className="font-medium">{pageState.total}</span> results
          </p>
        </div>

        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            {/* Previous Button */}
            <a
             disabled={pageState.page === 0}
             onClick={handlePrev}
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </a>

          <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {pageState.page}
            </a>

            {/* Next Button */}
            <a
            
              onClick={handleNext}
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="size-5"
              >
                <path
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );


}