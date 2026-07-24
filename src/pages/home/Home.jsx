import React from 'react'
import Hero from '../../components/hero/Hero'
import History from '../../components/history/History'
import Info from '../../components/info/Info'
import Catalog from '../catalog/Catalog'
import AnimeCard from '../../components/animeCard/AnimeCard'
import Purpose from '../../components/purpose/Purpose'

const Home = () => {
    return (
        <>
            <Hero />
            <Info />
            <Catalog embedded />
            <AnimeCard />
            <History />
            <Purpose />
        </>
    )
}

export default Home
