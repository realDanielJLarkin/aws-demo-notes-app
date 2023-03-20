import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home'

import React from 'react'
import NotFound from './containers/NotFound'

function Links() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Links