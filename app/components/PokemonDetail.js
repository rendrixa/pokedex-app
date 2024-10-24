'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const PokemonDetail = (props) => {
  const { dataContent, namaSlug } = props
  const [selectFilter, setSelectFilter] = useState('stats')

  return (
    <section className='detail pt-4 pb-5'>
      <Link href="/" className='my-5 font-black text-[24px] md:text-[40px]'>POKEDEX APP</Link>
      {dataContent?.code === '0' ?
        <>
          <div className='max-w-[700px] mx-auto bg-[#FFCC00] mt-8 py-5 px-3 md:p-5 rounded-md shadow-md md:border-4 md:border-[#0075BE]'>
            <h2 className='capitalize text-center text-2xl font-bold'>{dataContent?.data?.name}</h2>
            <div className='m-5 w-[300px] h-[300px] relative mx-auto'>
              <Image src={dataContent?.data?.sprites?.other['official-artwork']?.front_default} priority fill className="object-contain transition-opacity opacity-0 duration-[1s]"
                onLoadingComplete={(image) => image.classList.remove("opacity-0")} alt={`photo ${namaSlug}`} />
            </div>
            <div className='flex items-center justify-between gap-4 max-sm:flex-col'>
              <h2 className='capitalize text-center text-lg font-bold'>Weight {dataContent?.data?.weight}</h2>
              <select className='border rounded-md p-2 focus:outline-0' value={selectFilter} onChange={(e) => setSelectFilter(e.target.value)} >
                <option value="stats">Statistics</option>
                <option value="types">Types</option>
                <option value="abilities">Ability</option>
              </select>
            </div>
            <div className='my-5'>
              {selectFilter === 'stats' ? dataContent?.data?.stats?.length > 0 &&
                dataContent?.data?.stats?.map(item => (
                  <div key={item?.stat?.name} className='flex gap-5 items-center justify-between mb-2'>
                    <div className='w-full h-5 rounded-md bg-gray-100 shadow-md relative'>
                      <div className={`${item?.base_stat ? `w-[${item?.base_stat}%]` : 'w-0'} bg-[#0075BE] rounded-md px-2 flex gap-2 items-center justify-between absolute top-0 left-0 bottom-0`} style={{ width: `${item?.base_stat > 100 ? 100 : item?.base_stat || 0}%` }}>
                        <h3 className='capitalize text-nowrap font-bold text-white'>{item?.stat?.name}</h3>
                        <h3 className='capitalize text-nowrap font-bold text-white'>{item?.base_stat || 0}</h3>
                      </div>
                    </div>
                  </div>
                ))
                : selectFilter === 'types' ? dataContent?.data?.types?.length > 0 &&
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {dataContent?.data?.types?.map(item => (
                      <div key={item?.type?.name} className="uppercase border-2 border-[#0075BE] bg-[#0075BE] text-white flex items-center justify-center font-bold text-center shadow rounded-md px-4 py-5 w-full">
                        {item?.type?.name}
                      </div>))}
                  </div>
                  : selectFilter === 'abilities' && dataContent?.data?.abilities?.length > 0 &&
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {dataContent?.data?.abilities?.map(item => (
                      <div key={item?.ability?.name} className="uppercase border-2 border-[#0075BE] bg-[#0075BE] text-white flex items-center justify-center font-bold text-center shadow rounded-md px-4 py-5 w-full">
                        {item?.ability?.name}
                      </div>
                    ))}
                  </div>
              }
            </div>
          </div>
          <div className='text-center mt-5'>
            <Link href="/" className='py-2 px-10 rounded border border-[#0075BE] text-[#0075BE] bg-white shadow hover:bg-gray-100'>Kembali</Link>
          </div>
        </>
        :
        <div className='text-center mt-16'>
          <h2 className='text-center font-bold my-5 pt-16 text-[22px]'>Data not found</h2>
          <Link href="/" className='py-2 px-10 rounded border border-[#0075BE] text-[#0075BE] bg-white shadow hover:bg-gray-100'>Kembali</Link>
        </div>
      }
    </section>
  )
}

export default PokemonDetail