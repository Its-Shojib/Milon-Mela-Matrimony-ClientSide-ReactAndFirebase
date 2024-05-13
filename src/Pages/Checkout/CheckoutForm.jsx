import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Button, Input } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ userBiodata }) => {

    let [payError, setPayError] = useState('');
    const [transactionId, setTransactionId] = useState('');
    let [clientSecret, setClientSecet] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    let { user } = useAuth();
    let goto = useNavigate();
    let axiosSecure = useAxiosSecure();

    let totalPrice = 500;

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                setClientSecet(res.data.clientSecret)
            })
    }, [axiosSecure, totalPrice])

    const { data: myBiodata = [] } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/biodata/checkout/${user?.email}`);
            return res.data;
        }
    });

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
                    userEmail: user?.email,
                    userName: myBiodata.Name || user?.displayName,
                    transactionId: paymentIntent.id,
                    price: totalPrice,
                    reqBioId: userBiodata.bioId,
                    reqName: userBiodata.Name,
                    status: 'pending',
                    reqEmail: 'pending',
                    reqPhone: 'pending'
                }
                // console.log(payment);
                axiosSecure.post('/payment', payment)
                    .then(res => {
                        if (res.data?.insertedId) {
                            Swal.fire({
                                position: "top-middle",
                                icon: "success",
                                title: "Requested Successfull",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        goto('/dashboard/my-req-contacts')
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
                            label={myBiodata ? `Biodata Id: ${myBiodata?.bioId}`:'Please Update your Biodata ASAP'}
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
                            label={myBiodata?.email || user?.email}
                            className="w-full"
                            readOnly />
                    </div>
                </div>
                <div>
                    <CardElement className="mt-8"
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
                    <Button className="my-5 block mx-auto" type="submit" disabled={!stripe || !clientSecret}>
                        Confirm Payment
                    </Button>
                    <p className="text-red-500">{payError}</p>
                    {
                        transactionId && <p className="text-green-600">Tranxaction Id: {transactionId}</p>
                    }
                </div>
            </form>
        </div>
    )
}

CheckoutForm.propTypes = {
    userBiodata: PropTypes.object,
}
export default CheckoutForm;