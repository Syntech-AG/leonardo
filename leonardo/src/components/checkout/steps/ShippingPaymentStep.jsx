import React, { useState } from "react";
import { useCheckout } from "../store/CheckoutProvider";
import SummarySidebar from "../components/SummarySidebar";
import { RadioCard, Input } from "../components/FormControls";
import { formatCHF } from "../../../js-components/currency";

const METHODS = [
  {
    id: "dhl",
    label: "DHL Express",
    cost: 0,
    eta: "20. Juli – 03. August",
    right: "Kostenloser Versand",
  },
  {
    id: "fedex",
    label: "FedEx",
    cost: 25,
    eta: "20. Juli – 03. August",
    right: "CHF 25.00",
  },
  {
    id: "express",
    label: "Express-Versand",
    cost: 35,
    eta: "20. Juli – 03. August",
    right: "CHF 35.00",
  },
];

export default function ShippingPaymentStep() {
  const { state, dispatch } = useCheckout();
  const [shippingId, setShippingId] = useState(
    state.shipping?.methodId || "dhl"
  );
  const [payMethod, setPayMethod] = useState(state.payment?.method || "card");
  const [card, setCard] = useState({ name: "", number: "", exp: "", cvc: "" });

  const chooseShip = (m) => {
    setShippingId(m.id);
    dispatch({
      type: "SET_SHIPPING",
      payload: { methodId: m.id, label: m.label, cost: m.cost, eta: m.eta },
    });
  };

  const validCard =
    payMethod !== "card" ||
    (card.name &&
      /^\d{12,19}$/.test(card.number.replace(/\s+/g, "")) &&
      /^\d{2}\/\d{2}$/.test(card.exp) &&
      /^\d{3,4}$/.test(card.cvc));

  const next = () => {
    if (payMethod === "card") {
      // Tokenize with your PSP here, store only token/last4/brand
      dispatch({
        type: "SET_PAYMENT",
        payload: {
          method: "card",
          token: "tok_demo",
          brand: "VISA",
          last4: card.number.slice(-4),
        },
      });
    } else {
      dispatch({ type: "SET_PAYMENT", payload: { method: "paypal" } });
    }
    dispatch({ type: "SET_STEP", step: 3 });
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-8">
        <section className="rounded border border-gray-200 bg-white p-4 md:p-6">
          <h4 className="mb-4 text-base font-semibold">VERSANDSERVICE</h4>
          <div className="space-y-3">
            {METHODS.map((m) => (
              <RadioCard
                key={m.id}
                name="shipping"
                checked={shippingId === m.id}
                onChange={() => chooseShip(m)}
                title={m.label}
                subtitle={`Voraussichtliche Lieferzeit: ${m.eta}`}
                right={m.cost ? formatCHF(m.cost) : m.right}
              />
            ))}
          </div>
        </section>

        <section className="rounded border border-gray-200 bg-white p-4 md:p-6">
          <h4 className="mb-4 text-base font-semibold">ZAHLMETHODEN</h4>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <RadioCard
              name="pay"
              checked={payMethod === "card"}
              onChange={() => setPayMethod("card")}
              title="Kreditkarte"
              subtitle="Sie können alle Kreditkartenmarken nutzen."
            />
            <RadioCard
              name="pay"
              checked={payMethod === "paypal"}
              onChange={() => setPayMethod("paypal")}
              title="Paypal"
              subtitle="Geben Sie Ihre PayPal-Konto-E-Mail-Adresse ein."
            />
          </div>

          {payMethod === "card" && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Kartenname"
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
              <Input
                label="Kartennummer"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
                placeholder="•••• •••• •••• ••••"
              />
              <Input
                label="Ablaufdatum"
                value={card.exp}
                onChange={(e) => setCard({ ...card, exp: e.target.value })}
                placeholder="MM/JJ"
              />
              <Input
                label="CVC"
                value={card.cvc}
                onChange={(e) => setCard({ ...card, cvc: e.target.value })}
              />
            </div>
          )}
        </section>

        <div className="flex gap-3">
          <button
            onClick={() => dispatch({ type: "SET_STEP", step: 1 })}
            className="rounded border border-gray-300 px-4 py-2 text-sm"
          >
            Zurück
          </button>
          <button
            onClick={next}
            disabled={!validCard}
            className="rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Überprüfen Sie Ihre Bestellung
          </button>
        </div>
      </div>

      <SummarySidebar
        totals={state.meta.totals}
        items={state.cart.items}
        ctaText="Überprüfen Sie Ihre Bestellung"
        onCta={() => validCard && next()}
        disabled={!validCard}
      />
    </div>
  );
}
