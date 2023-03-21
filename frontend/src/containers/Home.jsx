import { useState, useEffect } from 'react'
import { useAppContext } from '../lib/contextLib'
import { API } from 'aws-amplify'
import { onError } from '../lib/errorLib'
import { LinkContainer } from 'react-router-bootstrap'
import { BsPencilSquare } from 'react-icons/bs'
import ListGroup from 'react-bootstrap/ListGroup'
import "./Home.css"

function Home() {
    const [notes, setNotes] = useState([])
    const { isAuthenticated } = useAppContext()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function onLoad() {
            if (!isAuthenticated) {
                return
            }

            try {
                const notes = await loadNotes()
                setNotes(notes)
            } catch (error) {
                onError(error)
            }

            setIsLoading(false)
        }

        onLoad()

    }, [isAuthenticated])

    function loadNotes() {
        return API.get('notes', '/notes')
    }

    function renderNotesList() {
        return (
            <>
                <LinkContainer to="/notes/new">
                    <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                        <BsPencilSquare size={17} />
                        <span className="ms-2 fw-bold">Create a new note</span>
                    </ListGroup.Item>
                </LinkContainer>
                {notes.map(({ noteId, content, createdAt }) => (
                    <LinkContainer key={noteId} to={`/notes/${noteId}`}>
                        <ListGroup.Item action className="text-nowrap text-truncate">
                            <span className="fw-bold">{content.trim().split("\n")[0]}</span>
                            <br />
                            <span className="text-muted">
                                Created: {new Date(createdAt).toLocaleString()}
                            </span>
                        </ListGroup.Item>
                    </LinkContainer>
                ))}
            </>
        )
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A note taking app</p>
            </div>
        )
    }

    function renderNotes() {
        return (
            <div className="notes">
                <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
                <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
            </div>
        )
    }

    return (
        <div className='Home'>
            {isAuthenticated ? renderNotes() : renderLander()}
        </div>
    )
}

export default Home