import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { Button, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PropTypes from 'prop-types';

let CheckOutForm = ({ userBiodata }) => {
    let [payError, setPayError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    let [clientSecret, setClientSecet] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { register } = useForm();
    let { user } = useAuth()

    const { data: myBiodata = [], refetch } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/checkout/${user?.email}`);
            return res.data;
        }
    })

    useEffect(() => {
        axiosSecure.post('/create-payment-intent',)
            .then(res => {
                console.log(res.data?.clientSecret);
                setClientSecet(res.data.clientSecret)
            })
    }, [axiosSecure])

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        let card = elements.getElement(CardElement);
        if (!card) {
            return;
        }
        let { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('error :', error);
            setPayError(error.message)
        } else {
            console.log('PaymentMethod :', paymentMethod);
            setPayError('')
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm error :', confirmError);
        } else {
            console.log('Payment intent :', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    price: 500,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    status: 'pending'
                }

                axiosSecure.post('/payment', payment)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                        if (res.data?.paymentResult?.insertedId) {
                            Swal.fire({
                                position: "top-middle",
                                icon: "success",
                                title: "Thank you for the taka paisa",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }

        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-10">
                    <div className="flex-1">
                        <label className="label">
                            <span className="font-semibold">Contact Bio-Id</span>
                        </label>
                        <Input
                            type="text"
                            label={`Biodata Id: ${userBiodata?.bioId}`}
                            {...register('userBioId')}
                            className="w-full text-xl"
                            readOnly
                        />
                    </div>
                    <div className="flex-1">
                        <label className="label">
                            <span className="font-semibold">My Bio-Id</span>
                        </label>
                        <Input
                            type="text"
                            label={`Biodata Id: ${myBiodata?.bioId}`}
                            {...register('partnerName')}
                            className="w-full"
                            readOnly />
                    </div>
                </div>
                <div className="flex gap-10 my-5">
                    <div className="flex-1">
                        <label className="label">
                            <span className="font-semibold">My Email</span>
                        </label>
                        <Input
                            type="text"
                            label={myBiodata?.email}
                            {...register('partnerName')}
                            className="w-full"
                            readOnly />
                    </div>
                </div>
                <div>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '18px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#255255255255',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <Button className="my-5" type="submit">
                        Pay
                    </Button>
                    <p className="text-red-500">{payError}</p>
                    {
                        transactionId && <p>Tranxaction Id: {transactionId}</p>
                    }
                </div>
            </form>
        </div>
    )
}
CheckOutForm.propTypes = {
    userBiodata: PropTypes.node,
}
const StripePromese = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Checkout = () => {

    let userBiodata = useLoaderData();

    return (
        <div className="min-h-[calc(100vh-140px)]">
            <Helmet><title>Milon Mela | Checkout</title></Helmet>
            <h1 className="text-red-900 text-3xl text-center font-bold py-10">Please Checkout</h1>
            <div className="w-10/12 mx-auto">
                <Elements stripe={StripePromese}>
                    <CheckOutForm userBiodata={userBiodata}></CheckOutForm>
                </Elements>

            </div>
            <div>

            </div>
        </div>
    )
}
export default Checkout;