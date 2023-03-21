import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { LinkContainer } from 'react-router-bootstrap'
import { AppContext } from './lib/contextLib'
import { onError } from './lib/errorLib'
import Navbar from 'react-bootstrap/Navbar'
import Routes from './Routes'
import Nav from 'react-bootstrap/Nav'

import './App.css';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      await Auth.currentSession()
      setIsAuthenticated(true)
    } catch (error) {
      if (error !== 'No current user') {
        onError(error)
      }
    }
    setIsAuthenticating(false)
  }

  async function handleLogout() {
    await Auth.signOut()
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
          <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav accessKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link >Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link >Login</Nav.Link>
                  </LinkContainer>
                </>
              )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  )
}

export default App;
