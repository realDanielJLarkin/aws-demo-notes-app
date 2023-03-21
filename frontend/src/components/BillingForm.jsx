import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useFormFields } from '../lib/hooksLib'
import LoaderButton from './LoaderButton'
import Form from 'react-bootstrap/Form'
import './BillingForm.css'

function BillingForm({ isLoading, onSubmit }) {
    const stripe = useStripe()
    const elements = useElements()
    const [fields, setFields] = useFormFields({
        name: '',
        storage: '',
    })
    const [isProcessing, setIsProcessing] = useState(false)
    const [isCardComplete, setIsCardComplete] = useState(false)

    isLoading = isProcessing || isLoading

    function validateForm() {
        return (
            stripe &&
            elements &&
            fields.name !== '' &&
            fields.storage !== '' &&
            isCardComplete
        )
    }

    async function handleSubmitClick(event) {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsProcessing(true)

        const cardElement = elements.getElement(CardElement)
        const { token, error } = await stripe.createToken(cardElement)

        setIsProcessing(false)

        onSubmit(fields.storage, { token, error })
    }

    return (
        <Form className="BillingForm" onSubmit={handleSubmitClick}>
            <Form.Group size="lg" controlId="storage">
                <Form.Label>Storage</Form.Label>
                <Form.Control min="0" type="number" value={fields.storage} onChange={setFields} placeholder="Number of notes to store" />
            </Form.Group>
            <hr />
            <Form.Group size="lg" controlId="name">
                <Form.Label>Cardholder&apos;s name</Form.Label>
                <Form.Control type="text" value={fields.name} onChange={setFields} placeholder="Name on the card"
                />
            </Form.Group>
            <Form.Label>Credit Card Info</Form.Label>
            <CardElement className="card-field" onChange={(e) => setIsCardComplete(e.complete)}
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            fontWeight: "400",
                            color: "#495057",
                            fontFamily: "'Open Sans', sans-serif",
                        },
                    },
                }}
            />
            <LoaderButton block="true" size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()} >
                Purchase
            </LoaderButton>
        </Form>
    )
}

export default BillingForm