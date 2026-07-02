import React from 'react'
import Hero from '../../components/hero/Hero'
import History from '../../components/history/History'
import Info from '../../components/info/Info'
import Catalog from '../catalog/Catalog'
import AnimeCard from '../../components/animeCard/AnimeCard'

const Home = () => {
    return (
        <>
            <Hero />
            <Info />
            {/* <AnimeCard /> */}
            <Catalog embedded />
            <History />
        </>
    )
}

export default Home
