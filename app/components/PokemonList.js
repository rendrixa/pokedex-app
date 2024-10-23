'use client'

import React, { useEffect, useState } from 'react'
import { encryptApiKey, encryptDefault } from '../lib/helpers'
import { getData } from '../lib/repository'
import PaginationCustom from './Pagination/PaginationCustom'

const PokemonList = () => {
  const totalList = 28
  const [isLoading, setIsLoading] = useState(true)
  const [dataListPokemon, setDataListPokemon] = useState([])
  const [alertMsg, setAlertMsg] = useState('')
  const [textSearch, setTextSearch] = useState('')
  const [activePagination, setActivePagination] = useState(1)

  const apiGetPokemon = async () => {
    const url = encryptDefault(`api/v2/pokemon?limit=1000&offset=0`)
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
    console.log('hitApi', hitApi)
  }

  const handleFilter = (el) => {
    if (textSearch?.length > 0) {
      return el?.name?.toLowerCase().includes(textSearch?.toLowerCase())
    }

    return el
  }

  useEffect(() => {
    apiGetPokemon()
  }, [])

  return (
    <section className='beranda pt-4 pb-5'>
      <h2 className='text-center my-5 font-bold text-[24px] md:text-[40px]'>POKEDEX APP</h2>
      <div className='mt-10 mb-4 flex justify-center'>
        <input type='text' className='border-2 w-full md:w-1/3 border-[#0075BE] text-[#0075BE] rounded-md p-2 focus:outline-none' onChange={(e) => setTextSearch(e.target.value)} name='namePokemon' autoComplete='off' placeholder='Search pokemon name' />
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
              <div key={idx} className="uppercase border-2 border-[#0075BE] bg-[#FFCC00] text-[#0075BE] font-bold text-center shadow rounded-md px-4 py-5 w-full cursor-pointer hover:border-[#FFCC00] hover:bg-[#0075BE] hover:text-[#FFCC00]">
                {item?.name}
              </div>
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