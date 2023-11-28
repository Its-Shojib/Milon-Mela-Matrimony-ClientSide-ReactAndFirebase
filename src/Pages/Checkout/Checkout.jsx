import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const StripePromese = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);

const Checkout = () => {
    let userBiodata = useLoaderData();

    return (
        <div className="min-h-[calc(100vh-140px)]">
            <Helmet><title>Milon Mela | Checkout</title></Helmet>
            <h1 className="text-red-900 text-3xl text-center font-bold py-10">Please Checkout</h1>
            <div className="w-10/12 mx-auto">
                <Elements stripe={StripePromese}>
                    <CheckoutForm userBiodata={userBiodata}></CheckoutForm>
                </Elements>
            </div>
        </div>
    )
}
export default Checkout;