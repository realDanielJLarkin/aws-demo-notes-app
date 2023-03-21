import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../lib/contextLib'
import { useFormFields } from '../lib/hooksLib'
import { onError } from '../lib/errorLib'
import Form from 'react-bootstrap/Form'
import LoaderButton from '../components/LoaderButton'
import './Login.css'

function Login() {

    const navigate = useNavigate()
    const { setIsAuthenticated } = useAppContext()
    const [isLoading, setIsLoading] = useState(false)
    const [fields, handleFieldChange] = useFormFields({
        email: '',
        password: ''
    })

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setIsLoading(true)

        try {
            await Auth.signIn(fields.email, fields.password)
            setIsAuthenticated(true)
            navigate('/')
        } catch (error) {
            onError(error)
            setIsLoading(false)
        }
    }

    return (
        <div className='Login'>
            <Form onSubmit={handleSubmit}>
                <Form.Group size='lg' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control autoFocus type='email' value={fields.email} onChange={handleFieldChange} />
                </Form.Group>
                <Form.Group size='lg' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={fields.password} onChange={handleFieldChange} />
                </Form.Group>
                <LoaderButton block='true' size='lg' type='submit' isLoading={isLoading} disabled={!validateForm()}>Login</LoaderButton>
            </Form>
        </div>
    )
}

export default Login