'use client'

import React from 'react'

const PaginationCustom = (props) => {
  const { paginationCount, activePagination, paginationHandler } = props

  const paginationHandlerProps = (number) => {
    paginationHandler(number)
  }

  let isPageNumberOutOfRange

  const pageNumbers = [...new Array(paginationCount)].map((_, index) => {
    const pageNumber = index + 1
    const isPageNumberFirst = pageNumber === 1
    const isPageNumberLast = pageNumber === paginationCount
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - activePagination) <= 1

    if (isPageNumberFirst || isPageNumberLast || isCurrentPageWithinTwoPageNumbers) {
      isPageNumberOutOfRange = false
      return (
        <div key={pageNumber} aria-current="page" className={`relative cursor-pointer z-10 inline-flex items-center px-2 py-2 text-sm font-semibold ${pageNumber === activePagination ? "text-[#FFCC00]" : "text-white"}`}
          onClick={() => paginationHandlerProps(pageNumber)}>
          {pageNumber}
        </div>

      )
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true
      return (
        <span className="relative inline-flex items-center px-2 py-2 text-sm font-semibold text-white">...</span>
      )
    }

    return null
  })

  return (paginationCount > 1 &&
    <nav className="flex justify-center" aria-label="Pagination">
      <div onClick={() => activePagination == 1 ? '' : paginationHandler(activePagination - 1)}
        className={`relative inline-flex items-center rounded-l-md px-1 py-2 text-white ${activePagination == 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <span className="sr-only">Previous</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>
      </div>
      {pageNumbers}
      <div onClick={() => activePagination == paginationCount ? '' : paginationHandler(activePagination + 1)}
        className={`relative inline-flex items-center rounded-r-md px-1 py-2 text-white ${activePagination == paginationCount ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <span className="sr-only">Next</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
          <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>
      </div>
    </nav>
  )
}

export default PaginationCustom