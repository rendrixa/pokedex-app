import React from 'react'
import PokemonList from '../components/PokemonList'

export const metadata = {
  title: 'Pokedex - App',
  description: 'Pokedex - App',
}

const Index = async () => {
  return (
    <section className='container px-5 mx-auto'>
      <PokemonList />
    </section>
  )
}

export default Index