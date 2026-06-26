import React, { Fragment } from 'react'
import Hero from '../../components/hero/Hero'
import Texnalogy from '../../components/texnalogy/Texnalogy'
import History from '../../components/history/History'
import Info from '../../components/info/Info'

const Home = () => {
    return (
        <>
            <Hero />
            <Texnalogy />
            <Info />
            <History />
        </>
    )
}

export default Home