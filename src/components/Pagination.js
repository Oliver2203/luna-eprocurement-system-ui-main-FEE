import React from 'react';

function Pagination({ totalPages, searchParams, setSearchParams }) {
  let pages = [];

  const currentPage = searchParams.get('page') || 1;

  const handlePreviousPage = () => {
    if (Number(currentPage) !== 1) {
      setSearchParams({ ...searchParams, page: Number(currentPage) - 1 });
    }
  };

  const handleNextPage = () => {
    if (Number(currentPage) !== totalPages) {
      setSearchParams({ ...searchParams, page: Number(currentPage) + 1 });
    }
  };

  const setCurrentPage = (page) => {
    setSearchParams({ ...searchParams, page });
  };

  if (totalPages <= 1 || currentPage > totalPages) {
    return null;
  }

  for (let i = 1; i <= totalPages; ++i) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="flex p-4 gap-3 border border-solid border-gray-50 rounded-md">
        <button
          className={
            'flex items-center justify-center w-[35px] h-[35px] border border-solid border-gray-50 rounded-md ' +
            (Number(currentPage) === 1 && 'opacity-50 cursor-default')
          }
          onClick={handlePreviousPage}
        >
          <img src="/images/icons/arrow.svg" alt="" className="w-[7px] rotate-180" />
        </button>
        {pages.map((page, idx) => {
          return (
            <button
              key={idx}
              className={
                'flex items-center justify-center w-[35px] h-[35px] border border-solid rounded-md ' +
                (Number(currentPage) === page ? 'text-white bg-primary border-primary' : 'border-gray-50 text-mainText')
              }
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          );
        })}
        <button
          className={
            'flex items-center justify-center w-[35px] h-[35px] border border-solid border-gray-50 rounded-md ' +
            (Number(currentPage) === totalPages && 'opacity-50 cursor-default')
          }
          onClick={handleNextPage}
        >
          <img src="/images/icons/arrow.svg" alt="" className="w-[7px]" />
        </button>
      </div>
    </div>
  );
}

export default React.memo(Pagination);
