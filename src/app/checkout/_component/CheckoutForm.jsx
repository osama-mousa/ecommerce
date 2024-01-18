'use client'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';


const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }
        const handleError = (error) => {
            const messageContainer = document.querySelector('#error-message');
            messageContainer.textContent = error.message;
            submitBtn.disabled = false;
        }

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({
                amount: amount
            })
        })
        const clientSecret = await res.json()
        const result = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payment-confirm",
            },
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='mx-32 md:mx-[320px] mt-12'>
                <PaymentElement />
                <button className='bg-primary text-white p-2 rounded-md w-full my-4'>Submit</button>
            </div>
        </form>
    );
};

export default CheckoutForm;