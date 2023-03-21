import { Route, Routes } from 'react-router-dom'
import Home from './containers/Home'
import NotFound from './containers/NotFound'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NewNote from './containers/NewNote'
import Note from './containers/Note'
import Settings from './containers/Settings'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import UnauthenticatedRoute from './components/UnauthenticatedRoute'

function Links() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
            <Route path='/signup' element={<UnauthenticatedRoute><Signup /></UnauthenticatedRoute>} />
            <Route path='/notes/new' element={<AuthenticatedRoute><NewNote /></AuthenticatedRoute>} />
            <Route path='/notes/:id' element={<AuthenticatedRoute><Note /></AuthenticatedRoute>} />
            <Route path='/settings' element={<AuthenticatedRoute><Settings /></AuthenticatedRoute>} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Links