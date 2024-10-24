import PokemonDetail from '@/app/components/PokemonDetail'
import { encryptApiKey, encryptDefault } from '@/app/lib/helpers'
import { getData } from '@/app/lib/repository'
import React from 'react'

export const generateMetadata = async ({ params: { slug } }) => {
  const namaSlug = slug

  return {
    title: `${namaSlug.charAt(0).toUpperCase() + namaSlug.slice(1)} | Pokedex - App`,
    description: `${namaSlug.charAt(0).toUpperCase() + namaSlug.slice(1)} | Pokedex - App`,
    keywords: `${namaSlug.charAt(0).toUpperCase() + namaSlug.slice(1)} | Pokedex - App`,
  }
}

const Index = async ({ params: { slug } }) => {
  const namaSlug = slug
  const url = encryptDefault(`api/v2/pokemon/${namaSlug}`)
  const hitApi = await getData(url, {
    guid: "",
    data: {
      key: encryptApiKey("RendrixApp"),
    }
  })
  return (
    <section className='container px-5 mx-auto'>
      <PokemonDetail dataContent={hitApi} namaSlug={namaSlug} />
    </section>
  )
}

export default Index