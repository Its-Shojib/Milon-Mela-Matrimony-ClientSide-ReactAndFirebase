import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const StripePromese = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
import Section_Title from './../../Shared-Compo/Section_Title';

const Checkout = () => {
    let userBiodata = useLoaderData();

    return (
        <div className="min-h-[calc(100vh-140px)] py-1">
            <Helmet><title>Milon Mela | Checkout</title></Helmet>
            <Section_Title title={'Please Checkout'} subTitle={'to see details'}></Section_Title>
            <div className="w-10/12 mx-auto">
                <Elements stripe={StripePromese}>
                    <CheckoutForm userBiodata={userBiodata}></CheckoutForm>
                </Elements>
            </div>
        </div>
    )
}
export default Checkout;