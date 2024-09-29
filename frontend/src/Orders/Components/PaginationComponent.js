import React from 'react';

const Pagination = ({ pageState, setPageState }) => {
  const totalPages = Math.ceil(pageState.total / pageState.pageSize);
  const currentPage = pageState.page;

  // Berechne den Start- und Endwert für die Anzeige der Seiten
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 2);

  const result = [...Array(endPage - startPage + 1).keys()].map(i => startPage + i);

  const goToPage = (page) => {
    setPageState((oldState) => ({
      ...oldState,
      page: page,
    }));
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200bg-gray-200 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium"> {(currentPage - 1) * pageState.pageSize + 1}</span> to
            <span className="font-medium"> {Math.min(currentPage * pageState.pageSize, pageState.total)}</span> of
            <span className="font-medium"> {pageState.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {result.map((number) => (
              <button
                key={number}
                onClick={() => goToPage(number)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === number
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200'
                } focus:z-20 focus:outline-offset-0`}
              >
                {number}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
