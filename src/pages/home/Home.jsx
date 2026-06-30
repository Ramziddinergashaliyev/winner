import React, { Fragment } from 'react'
import Hero from '../../components/hero/Hero'
import Texnalogy from '../../components/texnalogy/Texnalogy'
import History from '../../components/history/History'
import Info from '../../components/info/Info'
import Catalog from '../catalog/Catalog'

const Home = () => {
    return (
        <>
            <Hero />
            <Texnalogy />
            <Catalog />
            <Info />
            <History />
        </>
    )
}

export default Home