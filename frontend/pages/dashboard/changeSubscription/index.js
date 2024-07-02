import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardPage from "../index";
import api from "@/redux/api";
import LoadingButton from "@/SharedComponents/LoadingButton";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";

const availablePlans = ["Free Trial", "Standard", "Premium", "Enterprise"];
const planIds = {
  "Free Trial": "0",
  Standard: "price_1PJzycDkbP4624n0VXTy80p3",
  // Premium: "price_1PKGSSDkbP4624n0eyq8GOc4",
  // Enterprise: "price_1PJztODkbP4624n0RA5qRhlG",
};

const stripePromise = loadStripe(
  "pk_test_51M72laDkbP4624n05FSQvjEw3jsUR5miGKMoWijyM5QWQeqG4wjNih3f3KMp67OG8SkNX6heXv8bkBM1ukOSvc5L00HuEG8XUG"
);

const ChangeSubscription = () => {
  const router = useRouter();
  const loggedInUser =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("userToken"));

  const [updateUser, { isLoading, isSuccess, error }] =
    api.adminApis.useUpdateUserMutation();

  const [cancelSubscription, { isLoading: isCancelLoading }] =
    api.adminApis.useCancelSubscriptionMutation();

  const [currentPlan, setCurrentPlan] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (loggedInUser) {
      setCurrentPlan(loggedInUser.subscription);
      setSelectedPlan(loggedInUser.subscription);
      setAmount(planIds[loggedInUser.subscription]);
    }
  }, []);

  const handlePlanChange = (e) => {
    const newPlan = e.target.value;
    setSelectedPlan(newPlan);
    setAmount(planIds[newPlan]);
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: planIds[selectedPlan], quantity: 1 }],
      mode: "subscription",
      successUrl: `${window.location.origin}/dashboard/changeSubscription?success=true&plan=${selectedPlan}`,
      cancelUrl: `${window.location.origin}/dashboard/changeSubscription`,
    });

    if (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const success = query.get("success");
    const plan = query.get("plan");

    if (success && plan) {
      const updatedUser = {
        ...loggedInUser,
        subscription: plan,
      };
      updateUser({
        userId: loggedInUser._id,
        updatedUser: { subscription: plan },
      }).then(() => {
        localStorage.setItem("userToken", JSON.stringify(updatedUser));
        setCurrentPlan(plan);
        setSelectedPlan(plan);
      });
      router.push("/dashboard/changeSubscription");
    }
  }, [router.query, loggedInUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handlePayment();
    } catch (error) {
      console.error("Error updating subscription:", error.message);
    }
  };
  const showConfirmationDialog = () => {
    return new Promise((resolve) => {
      const confirmToast = toast(
        (t) => (
          <span>
            Are you sure you want to cancel your subscription?
            <div className="mt-2 flex justify-around">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </span>
        ),
        {
          duration: Infinity,
        }
      );
    });
  };

  const handleCancelSubscription = async () => {
    const confirmed = await showConfirmationDialog();

    if (!confirmed) {
      return;
    }
    try {
      await cancelSubscription(loggedInUser._id).unwrap();
      setCurrentPlan("Free Trial");
      setSelectedPlan("Free Trial");
      const updatedUser = {
        ...loggedInUser,
        subscription: "Free Trial",
      };
      localStorage.setItem("userToken", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error canceling subscription:", error.message);
    }
  };
  return (
    <DashboardPage>
      <section className="m-5 lg:m-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-700 text-xs leading-4 tracking-widest uppercase">
                  Current Plan
                </p>
                <p className="text-md leading-5 mt-1">{currentPlan}</p>
              </div>
              <button
                onClick={handleCancelSubscription}
                type="button"
                className={`mt-4 rounded-md px-6 font-medium shadow-md py-2 ${
                  isCancelLoading ? "bg-[#CAE5F1]" : "bg-[#00A0DF] text-white"
                }`}
                disabled={isCancelLoading}
              >
                {isCancelLoading ? "Canceling..." : "Cancel Subscription"}
              </button>
            </div>
            <div>
              <label
                htmlFor="subscription"
                className="block text-neutral-700 text-xs leading-4 tracking-widest uppercase"
              >
                Select New Plan
              </label>
              <select
                id="subscription"
                name="subscription"
                value={selectedPlan}
                onChange={handlePlanChange}
                className="text-neutral-500 w-full text-md leading-5 placeholder:text-neutral-400 border mt-1 px-3 py-2 rounded-md"
              >
                {availablePlans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row items-center gap-3 mt-3 ml-auto">
              <LoadingButton
                type="submit"
                loading={isLoading}
                success={isSuccess}
                successText="Successful!"
                className="rounded-md bg-[#00A0DF] px-6 font-medium shadow-md py-1.5 text-white"
              >
                Update Subscription
              </LoadingButton>
              <button
                onClick={() => router.back()}
                type="button"
                className="rounded-md px-6 font-medium shadow-md py-1.5 bg-zinc-200 text-zinc-600"
              >
                Cancel
              </button>
            </div>
            {error && <div className="text-red-500 mt-2">{error.message}</div>}
          </div>
        </form>

        <div className="mt-6 flex gap-8">
          <Link href="/PricingDetail">
            <p className="text-neutral-700 text-sm underline leading-4 tracking-wides">
              View Plans
            </p>
          </Link>
          <Link href="/contact-us">
            <p className="text-neutral-700 text-sm leading-4 underline tracking-wides">
              Contact Us
            </p>
          </Link>
        </div>
      </section>
    </DashboardPage>
  );
};

export default ChangeSubscription;
