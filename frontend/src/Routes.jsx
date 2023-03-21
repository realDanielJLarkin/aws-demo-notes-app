import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home'

import React from 'react'
import NotFound from './containers/NotFound'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NewNote from './containers/NewNote'
import Note from './containers/Note'

function Links() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/notes/new' element={<NewNote />} />
            <Route path='/notes/:id' element={<Note />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Links