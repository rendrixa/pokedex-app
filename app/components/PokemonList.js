'use client'

import React, { useEffect, useState } from 'react'
import { encryptApiKey, encryptDefault } from '../lib/helpers'
import { getData } from '../lib/repository'
import PaginationCustom from './Pagination/PaginationCustom'
import Link from 'next/link'

const PokemonList = () => {
  const totalList = 28
  const [isLoading, setIsLoading] = useState(true)
  const [dataListPokemon, setDataListPokemon] = useState([])
  const [alertMsg, setAlertMsg] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [activePagination, setActivePagination] = useState(1)

  const apiGetPokemon = async (param) => {
    const url = encryptDefault(`api/v2/${param}?limit=1000&offset=0`)
    const hitApi = await getData(url, {
      guid: "",
      data: {
        key: encryptApiKey("RendrixApp"),
      }
    })

    if (hitApi?.code == 0) {
      setDataListPokemon(hitApi?.data)
    } else {
      setAlertMsg(hitApi?.info)
    }
    setIsLoading(false)
  }

  const handleFilter = (el) => {
    if (textSearch?.length > 0) {
      return el?.name?.toLowerCase().includes(textSearch?.toLowerCase())
    }
    return el
  }

  useEffect(() => {
    apiGetPokemon('pokemon')
  }, [])

  return (
    <section className='beranda pt-4 pb-5'>
      <Link href="/" className='my-5 font-black text-[24px] md:text-[40px]'>POKEDEX APP</Link>
      <div className='mt-10 mb-2 flex max-sm:flex-col md:items-center justify-between gap-[15px]'>
        <h3 className='font-semibold text-2xl'>List Pokemon</h3>
        <input type='text' className='border-2 w-full md:w-1/3 border-[#FFCC00] rounded-md p-2 shadow-md focus:outline-none' value={textSearch} onChange={(e) => { setTextSearch(e.target.value); setActivePagination(1) }} name='namePokemon' autoComplete='off' placeholder={`Search pokemon name`} />
      </div>
      <div className='mb-5'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mt-5'>
          {isLoading ?
            [...Array(totalList)]?.map(idx => (
              <div key={idx} className="border shadow rounded-md px-4 py-5 max-w-sm w-full mx-auto">
                <div className="animate-pulse flex justify-center">
                  <div className="h-6 w-3/4 bg-slate-300 rounded" />
                </div>
              </div>
            )) : dataListPokemon?.results?.filter(fil => handleFilter(fil))?.slice(activePagination * totalList - totalList, activePagination * totalList)?.length > 0 &&
            dataListPokemon?.results?.filter(fil => handleFilter(fil))?.slice(activePagination * totalList - totalList, activePagination * totalList)?.map((item, idx) => (
              <Link href={`/${item?.name}`} key={idx} className="uppercase border-2 border-[#0075BE] bg-[#FFCC00] text-[#0075BE] font-bold text-center shadow rounded-md px-4 py-5 w-full cursor-pointer hover:border-[#FFCC00] hover:bg-[#0075BE] hover:text-[#FFCC00]">
                {item?.name}
              </Link>
            ))
          }
        </div>
        {dataListPokemon?.results?.filter(fil => handleFilter(fil))?.slice(activePagination * totalList - totalList, activePagination * totalList)?.length == 0 &&
          <h2 className='text-center font-bold mt-4 text-[22px]'>{alertMsg || 'Data not found'}</h2>
        }
      </div>
      <PaginationCustom
        paginationCount={dataListPokemon?.results?.filter((el) => handleFilter(el)).length > 0 ? Math.ceil((dataListPokemon?.results?.filter((el) => handleFilter(el)).length || 0) / totalList) : 0}
        activePagination={activePagination}
        totalData={dataListPokemon?.results?.filter((el) => handleFilter(el)).length}
        totalList={totalList}
        paginationHandler={(page) => setActivePagination(page)} />
    </section>
  )
}

export default PokemonList