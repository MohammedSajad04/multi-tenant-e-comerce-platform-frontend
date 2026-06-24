import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { X } from "lucide-react";

function PlanSelectionPage() {

const navigate = useNavigate();
const [subscription, setSubscription] =
    useState(null);


useEffect(() => {
    fetchSubscription();
}, []);


const fetchSubscription = async () => {

    try {
        const response = await api.get(
    "tenants/subscription/"
        );

        console.log(
            "SUBSCRIPTION DATA:",
            response.data
        );

        setSubscription(
            response.data.subscription
        );
            } catch (error) {
                console.log(error);
            }
    };


const startTrial = async () => {

    try {
        await api.post(
            "tenants/start-trial/"
        );
        alert(
            "Trial Activated Successfully"
        );
        navigate("/dashboard");
    } catch (error) {
        alert(
            error?.response?.data?.error ||
            "Trial Failed"
        );
    }
};

const buyPlan = async (plan) => {

    try {

        const response = await api.post(
            "tenants/create-payment/",
            {
                plan
            }
        );

        const options = {

            key: response.data.key,

            amount: response.data.amount,

            currency: "INR",

            name: "SaaS Platform",

            description: `${plan} Subscription`,

            order_id: response.data.order_id,

            handler: async function (paymentResponse) {

                try {

                    await api.post(
                        "tenants/verify-payment/",
                        {
                            payment_id:
                                response.data.payment_id,

                            razorpay_payment_id:
                                paymentResponse.razorpay_payment_id,

                            razorpay_order_id:
                                paymentResponse.razorpay_order_id,

                            razorpay_signature:
                                paymentResponse.razorpay_signature,
                        }
                    );

                    alert(
                        "Subscription Activated Successfully"
                    );

                    navigate("/subscription");

                } catch (error) {

                    console.log(error);

                    alert(
                        "Payment Verification Failed"
                    );
                }
            },

            theme: {
                color: "#000000"
            }
        };

        const razorpay = new window.Razorpay(
            options
        );

        razorpay.open();

    } catch (error) {

        console.log(error);

        alert(
            error?.response?.data?.error ||
            "Payment Creation Failed"
        );
    }
};

if (!subscription) {

    return (
        <div className="pricing-shell relative grid min-h-screen place-items-center px-5 text-white">
            Loading...
        </div>
    );
}

const planFeatures = [
    "Product management",
    "Orders management",
    "Customer management",
    "Analytics dashboard",
];

return (

    <div className="pricing-shell relative flex min-h-screen items-center justify-center px-5 py-10 md:px-10">

        <div className="relative z-10 w-full max-w-7xl">

            <button
                onClick={() => navigate("/")}
                className="absolute right-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-emerald-400/60 bg-black/40 text-emerald-100 hover:bg-emerald-400 hover:text-black"
                aria-label="Close plans"
            >
                <X size={20} />
            </button>

            <div className="mx-auto mb-14 max-w-3xl text-center">
                <p className="mb-4 text-sm tracking-[0.32em] text-emerald-300/80">
                    SAAS MEMBERSHIP
                </p>
                <h1 className="text-4xl font-medium leading-tight text-white md:text-6xl">
                    Choose Your Favorite Package.
                </h1>
                <p className="mt-5 text-sm leading-7 text-white/48 md:text-base">
                    Select the plan that fits your company workflow and activate your workspace.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/30 bg-black/30 px-5 py-2 text-sm text-white/75">
                    <span>Monthly</span>
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(0,220,129,0.9)]"></span>
                    <span>Yearly</span>
                </div>
            </div>

            <div className="grid gap-7 md:grid-cols-3 md:items-start">

                <div className="pricing-card rounded-xl p-7 md:mt-11">

                    <h2 className="mb-5 text-2xl font-normal text-white/85">
                        Monthly
                    </h2>

                    <div className="pricing-divider mb-7"></div>

                    <h1 className="mb-4 text-5xl font-light tracking-tight text-white">
                        Rs.499
                    </h1>

                    {!subscription.is_trial_used && (
                        <p className="mb-5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                            First Month Free Trial
                        </p>
                    )}

                    <ul className="mb-8 space-y-4 text-sm leading-6 text-white/70">
                        {planFeatures.map((feature) => (
                            <li
                                key={feature}
                                className="flex gap-3"
                            >
                                <span className="pricing-check">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {!subscription.is_trial_used && (
                        <button
                            onClick={startTrial}
                            className="pricing-action mb-3 w-full rounded-md py-4 text-sm font-medium"
                        >
                            Start Trial
                        </button>
                    )}

                    <button
                        onClick={() =>
                            buyPlan(
                                "monthly"
                            )
                        }
                        className="pricing-action w-full rounded-md py-4 text-sm font-medium"
                    >
                        Buy Monthly
                    </button>

                </div>

                <div className="pricing-card pricing-card-featured rounded-xl p-7">

                    <h2 className="mb-5 text-2xl font-normal text-white/85">
                        6 Months
                    </h2>

                    <div className="pricing-divider mb-7"></div>

                    <h1 className="mb-4 text-5xl font-light tracking-tight text-white">
                        Rs.2499
                    </h1>

                    <ul className="mb-8 space-y-4 text-sm leading-6 text-white/70">
                        {[...planFeatures, "Priority support"].map((feature) => (
                            <li
                                key={feature}
                                className="flex gap-3"
                            >
                                <span className="pricing-check">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() =>
                            buyPlan(
                                "six_month"
                            )
                        }
                        className="pricing-action w-full rounded-md py-4 text-sm font-medium"
                    >
                        Buy 6 Months
                    </button>

                </div>

                <div className="pricing-card rounded-xl p-7 md:mt-11">

                    <h2 className="mb-5 text-2xl font-normal text-white/85">
                        Yearly
                    </h2>

                    <div className="pricing-divider mb-7"></div>

                    <h1 className="mb-4 text-5xl font-light tracking-tight text-white">
                        Rs.4999
                    </h1>

                    <ul className="mb-8 space-y-4 text-sm leading-6 text-white/70">
                        {[...planFeatures, "Priority support", "Best value"].map((feature) => (
                            <li
                                key={feature}
                                className="flex gap-3"
                            >
                                <span className="pricing-check">✓</span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <button
                        onClick={() =>
                            buyPlan(
                                "yearly"
                            )
                        }
                        className="pricing-action w-full rounded-md py-4 text-sm font-medium"
                    >
                        Buy Yearly
                    </button>

                </div>

            </div>

        </div>

    </div>
);


}

export default PlanSelectionPage;
