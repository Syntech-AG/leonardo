import React, { useState } from "react";
import { useCheckout } from "../store/CheckoutProvider";
import SummarySidebar from "../components/SummarySidebar";

export default function ReviewStep() {
  const { state, dispatch } = useCheckout();
  const [agree, setAgree] = useState(false);

  const placeOrder = async () => {
    // Post to backend, get order id
    // await api.post('/orders', state)
    // const orderId = 'ABC123';
    const orderId = "ABC123";
    dispatch({ type: "SET_STEP", step: 4 });
    // Optionally store order id in state or navigate to /order/:id/track
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-8">
        <section className="rounded border border-gray-200 bg-white p-4 md:p-6">
          <h4 className="mb-4 text-base font-semibold">VERSANDINFORMATIONEN</h4>
          <div className="space-y-2 text-sm text-gray-800">
            <div>
              {state.customer.firstName} {state.customer.lastName}
            </div>
            <div>{state.customer.address1}</div>
            <div>
              {state.customer.zip} {state.customer.city}{" "}
              {state.customer.country}
            </div>
            <div>
              {state.customer.email} · {state.customer.phone}
            </div>
          </div>
        </section>

        <section className="rounded border border-gray-200 bg-white p-4 md:p-6">
          <h4 className="mb-4 text-base font-semibold">ZAHLMETHODEN</h4>
          <div className="text-sm text-gray-800">
            {state.payment.method === "card"
              ? `Kreditkarte •••• ${state.payment.last4 || ""}`
              : "PayPal"}
          </div>
        </section>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>Ich bestätige, dass alle Angaben korrekt sind.</span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "SET_STEP", step: 2 })}
            className="rounded border border-gray-300 px-4 py-2 text-sm"
          >
            Zurück
          </button>
          <button
            onClick={placeOrder}
            disabled={!agree}
            className="rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Bestellung bestätigen
          </button>
        </div>
      </div>

      <SummarySidebar
        totals={state.meta.totals}
        items={state.cart.items}
        ctaText="Bestellung bestätigen"
        onCta={() => agree && placeOrder()}
        disabled={!agree}
      />
    </div>
  );
}
