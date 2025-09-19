import React, { useState } from "react";
import { useCheckout } from "../store/CheckoutProvider";
import SummarySidebar from "../components/SummarySidebar";
import { Input, Select } from "../components/FormControls";

export default function CustomerStep() {
  const { state, dispatch } = useCheckout();
  const c = state.customer;

  const [local, setLocal] = useState(c);
  const set = (k) => (e) => setLocal((s) => ({ ...s, [k]: e.target.value }));

  const valid =
    local.firstName &&
    local.lastName &&
    /\S+@\S+\.\S+/.test(local.email) &&
    local.address1 &&
    local.zip &&
    local.country;

  const saveAndNext = () => {
    dispatch({ type: "SET_CUSTOMER", payload: local });
    dispatch({ type: "SET_STEP", step: 2 });
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded border border-gray-200 bg-white p-4 md:p-6">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Ihre Informationen
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name"
            value={local.firstName}
            onChange={set("firstName")}
            autoComplete="given-name"
          />
          <Input
            label="Nachname"
            value={local.lastName}
            onChange={set("lastName")}
            autoComplete="family-name"
          />
          <div className="md:col-span-2">
            <Input
              label="Straßenadresse"
              value={local.address1}
              onChange={set("address1")}
              autoComplete="address-line1"
            />
          </div>
          <Select
            label="Land / Region"
            value={local.country}
            onChange={set("country")}
          >
            <option>Schweiz</option>
            <option>Deutschland</option>
            <option>Österreich</option>
          </Select>
          <Input
            label="Postleitzahl"
            value={local.zip}
            onChange={set("zip")}
            autoComplete="postal-code"
          />
          <Input
            label="E-Mail"
            type="email"
            value={local.email}
            onChange={set("email")}
            autoComplete="email"
          />
          <Input
            label="Telefonnummer"
            value={local.phone}
            onChange={set("phone")}
            autoComplete="tel"
          />
          <div className="md:col-span-2">
            <Input
              label="Nachricht"
              value={local.message || ""}
              onChange={set("message")}
              placeholder="Alles, was Sie uns mitteilen möchten..."
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => dispatch({ type: "SET_STEP", step: 0 })}
            className="rounded border border-gray-300 px-4 py-2 text-sm"
          >
            Zurück
          </button>
          <button
            onClick={saveAndNext}
            disabled={!valid}
            className="rounded bg-yellow-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            Weiter zu Versand & Zahlung
          </button>
        </div>
      </div>

      <SummarySidebar
        totals={state.meta.totals}
        items={state.cart.items}
        ctaText="Weiter zu Versand & Zahlung"
        onCta={() => valid && saveAndNext()}
        disabled={!valid}
      />
    </div>
  );
}
